"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function ManualCarousel({
  images = [],
  interval = 3000,
  heightDesktop = 360,
  heightMobile = 240,
  ariaLabel = "Galeria de fotos",
}) {
  const [idx, setIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const timerRef = useRef(null);
  const slideWRef = useRef(0);
  const perView = useCardsPerView();
  const H = useMemo(
    () => (typeof window !== "undefined" && window.innerWidth <= 900 ? heightMobile : heightDesktop),
    [heightDesktop, heightMobile]
  );
  const windowSize = useMemo(() => perView + 2, [perView]);
  const visible = useMemo(() => {
    if (!images.length) return [];
    const base = mod(idx, images.length);
    const res = [];
    for (let i = -Math.floor(windowSize / 2); i < Math.ceil(windowSize / 2); i++) {
      const logical = base + i;
      const real = mod(logical, images.length);
      res.push({ real, logical: i });
    }
    return res;
  }, [images.length, idx, windowSize]);

  const next = useCallback(() => setIdx((i) => i + 1), []);
  const prev = useCallback(() => setIdx((i) => i - 1), []);

  useEffect(() => {
    const onVis = () => (document.hidden ? clearInterval(timerRef.current) : start());
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  const start = useCallback(() => {
    clearInterval(timerRef.current);
    if (!hovering && images.length > 1) timerRef.current = setInterval(next, interval);
  }, [hovering, interval, next, images.length]);
  useEffect(() => { start(); return () => clearInterval(timerRef.current); }, [start]);

  useEffect(() => {
    const c = canvasRef.current, p = wrapRef.current; if (!c || !p) return;
    const ctx = c.getContext("2d");
    let W, Hc, DPR;
    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, W, Hc);
      g.addColorStop(0, "#ffffff"); g.addColorStop(1, "#f7fbff");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, Hc);
    };
    const resize = () => {
      W = p.clientWidth; Hc = H; DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      c.style.width = W + "px"; c.style.height = Hc + "px";
      c.width = Math.round(W * DPR); c.height = Math.round(Hc * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); draw();
    };
    const ro = new ResizeObserver(resize); ro.observe(p); resize();
    return () => ro.disconnect();
  }, [H]);

  // drag/swipe
  const drag = useRef({ on: false, lastX: 0, vx: 0 });
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const down = (e) => { drag.current.on = true; drag.current.lastX = getX(e, el); };
    const move = (e) => { if (!drag.current.on) return; const x = getX(e, el); drag.current.vx = x - drag.current.lastX; drag.current.lastX = x; };
    const up   = () => { if (!drag.current.on) return; drag.current.on = false; if (Math.abs(drag.current.vx) > 4) setIdx(i => i + (drag.current.vx < 0 ? 1 : -1)); drag.current.vx = 0; };
    el.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });
    el.addEventListener("touchstart", (e) => down(e.touches[0]), { passive: true });
    window.addEventListener("touchmove", (e) => move(e.touches?.[0] ?? e), { passive: true });
    window.addEventListener("touchend", up, { passive: true });
    return () => {
      el.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", (e) => move(e.touches?.[0] ?? e));
      window.removeEventListener("touchend", up);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    const ro = new ResizeObserver(() => {
      const count = Math.max(1, track.childElementCount);
      slideWRef.current = track.clientWidth / count;
      const offset = -idx * slideWRef.current;
      track.style.transform = `translate3d(${offset}px,0,0)`;
    });
    ro.observe(track);
    return () => ro.disconnect();
  }, [idx]);
  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    const offset = -idx * (slideWRef.current || track.clientWidth / Math.max(1, track.childElementCount));
    track.style.transform = `translate3d(${offset}px,0,0)`;
  }, [idx]);

  const onMouseEnter = () => setHovering(true);
  const onMouseLeave = () => setHovering(false);

  if (!images.length) return null;

  return (
    <section className="mc-section" aria-label={ariaLabel}>
      <div
        className="mc-carousel mc-elevated"
        ref={wrapRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <canvas ref={canvasRef} className="mc-canvas" aria-hidden="true" />

        <div className="mc-viewport" style={{ height: `var(--mc-h, ${H}px)` }}>
          <ul className="mc-track" ref={trackRef} role="list">
            {visible.map(({ real, logical }, i) => {
              const scale = 1 - Math.min(Math.abs(logical) * 0.05, 0.12);
              const tilt = clamp(logical * 2.2, -6, 6);
              const isActive = logical === 0;
              return (
                <li
                  key={`${real}-${i}`}
                  className={`mc-slide ${isActive ? "is-active" : ""}`}
                  aria-hidden={!isActive}
                  style={{ width: `${100 / perView}%`, transform: `scale(${scale}) rotate(${tilt}deg)` }}
                >
                  <figure className="mc-card mc-polaroid">
                    <div className="mc-media">
                      <Image
                        src={images[real]}
                        alt={`Foto ${real + 1}`}
                        fill
                        sizes="(max-width: 900px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                        priority={false}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement?.classList?.add?.("is-fallback");
                        }}
                      />
                      <div className="mc-vignette" aria-hidden="true" />
                    </div>
                    <figcaption className="mc-caption">
                      <strong>Momentos CEIC</strong>
                      <span className="mc-chip">brincando</span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>

          <button className="mc-nav mc-prev" aria-label="Anterior" onClick={prev}>‹</button>
          <button className="mc-nav mc-next" aria-label="Próximo" onClick={next}>›</button>
        </div>

        <div className="mc-dots" role="tablist" aria-label="Posição do carrossel">
          {images.map((_, i) => {
            const isActive = (idx % images.length + images.length) % images.length === i;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                className={`mc-dot ${isActive ? "is-active" : ""}`}
                title={`Ir para foto ${i + 1}`}
                onClick={() => setIdx((curr) => curr - ((curr % images.length + images.length) % images.length) + i)}
              >
                <span className="mc-dot-ink" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function useCardsPerView() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const calc = () => setN(window.innerWidth <= 900 ? 1 : window.innerWidth <= 1200 ? 2 : 3);
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);
  return n;
}
const mod = (n, m) => ((n % m) + m) % m;
const getX = (e, el) => { const r = el.getBoundingClientRect(); return (e.clientX ?? 0) - r.left; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
