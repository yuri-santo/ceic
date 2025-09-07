"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Carrossel infinito, responsivo e multi-cards.
 * - 1 card (≤900px), 2 (≤1200px), 3 (desktop) — ou force com perView
 * - autoplay (pausa no hover e quando a aba não está visível)
 * - swipe (touch/pointer)
 * - loop real com “teleporte” nas pontas
 * - fallback visível se a imagem falhar (arquivo ausente)
 */
export default function ManualCarousel({
  images = [],
  height = 360,
  heightMobile = 240,
  fit = "contain",
  perView: forcedPerView,
  interval = 3800,
  ariaLabel = "Galeria de fotos",
}) {
  const base = images.slice(0, 10);
  if (!base.length) return null;

  // Triplica para loop
  const loop = [...base, ...base, ...base];
  const start = base.length;

  const [idx, setIdx] = useState(start);
  const [anim, setAnim] = useState(true);
  const [perView, setPerView] = useState(1);
  const [badSrc, setBadSrc] = useState({});
  const wrapRef = useRef(null);
  const timerRef = useRef(null);
  const touch = useRef({ x: 0, active: false });

  // Responsivo
  useEffect(() => {
    if (forcedPerView) { setPerView(forcedPerView); return; }
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 900) return 1;
      if (w <= 1200) return 2;
      return 3;
    };
    const apply = () => setPerView(compute());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [forcedPerView]);

  const next = () => setIdx(i => i + 1);
  const prev = () => setIdx(i => i - 1);

  // Teleporte nas pontas
  const onTransitionEnd = () => {
    if (idx >= start + base.length) {
      setAnim(false); setIdx(start);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    } else if (idx <= start - 1) {
      setAnim(false); setIdx(start + base.length - 1);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }
  };

  // Autoplay com pausa
  useEffect(() => {
    const stop = () => { if (timerRef.current) clearInterval(timerRef.current); };
    const startAuto = () => { timerRef.current = setInterval(next, interval); };

    const onVis = () => (document.hidden ? stop() : startAuto());
    const el = wrapRef.current;
    el?.addEventListener("mouseenter", stop);
    el?.addEventListener("mouseleave", startAuto);
    document.addEventListener("visibilitychange", onVis);

    startAuto();
    return () => { stop(); el?.removeEventListener("mouseenter", stop); el?.removeEventListener("mouseleave", startAuto); document.removeEventListener("visibilitychange", onVis); };
  }, [interval]);

  // Swipe
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const down = e => { touch.current = { x: (e.touches?.[0]?.clientX ?? e.clientX), active: true }; };
    const move = e => {
      if (!touch.current.active) return;
      const x = e.touches?.[0]?.clientX ?? e.clientX;
      const dx = x - touch.current.x;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : setIdx(i=>i-1); touch.current.active = false; }
    };
    const up = () => { touch.current.active = false; };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchmove", move, { passive: true });
    el.addEventListener("touchend", up);

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", up);
    };
  }, []);

  const slideW = 100 / perView;
  const markBad = (src) => setBadSrc(prev => ({ ...prev, [src]: true }));

  return (
    <section className="mc-section" aria-label={ariaLabel}>
      <div className="container">
        <div
          className="mc-carousel hoverable"
          ref={wrapRef}
          style={{ "--mc-h": `${height}px`, "--mc-hm": `${heightMobile}px` }}
        >
          <button className="mc-nav mc-prev" aria-label="Anterior" onClick={prev}>‹</button>

          <div className="mc-viewport">
            <div
              className="mc-track"
              style={{
                width: `${loop.length * slideW}%`,
                transform: `translateX(calc(${idx} * -${slideW}%))`,
                transition: anim ? "transform .5s cubic-bezier(.22,.8,.22,1)" : "none",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {loop.map((src, i) => {
                const isBad = !!badSrc[src];
                return (
                  <div className="mc-slide" key={`${i}-${src}`} style={{ width: `${slideW}%` }}>
                    {isBad ? (
                      <div className="mc-fallback">
                        <div className="mc-fallback-inner">Foto indisponível</div>
                      </div>
                    ) : (
                      <Image
                        src={src}
                        alt="Foto da escola"
                        fill
                        sizes="(max-width: 900px) 100vw, 70vw"
                        style={{ objectFit: fit, background: "#fff" }}
                        priority={i < 2}
                        onError={() => markBad(src)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button className="mc-nav mc-next" aria-label="Próximo" onClick={next}>›</button>
        </div>
      </div>
    </section>
  );
}
