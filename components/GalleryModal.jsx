"use client";

import { useEffect, useRef, useState } from "react";

export default function CanvasCarousel({
  images = [],
  width = 360,
  height = 560,
  autoplayMs = 3800,
}) {
  const canvasRef = useRef(null);
  const [index, setIndex] = useState(0);
  const imgsRef = useRef([]);
  const rafRef = useRef(0);
  const playingRef = useRef(true);
  const drag = useRef({ active: false, startX: 0, vx: 0, x: 0 }); 

  useEffect(() => {
    let mounted = true;
    const loads = images.map(
      (src) =>
        new Promise((res) => {
          const im = new Image();
          im.onload = () => res(im);
          im.src = src;
        })
    );
    Promise.all(loads).then((arr) => {
      if (!mounted) return;
      imgsRef.current = arr;
      startLoop();
    });
    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [images.join("|")]);

  useEffect(() => {
    if (!images.length) return;
    const t = setInterval(() => {
      if (!playingRef.current) return;
      setIndex((i) => (i + 1) % images.length);
      drag.current.vx = -0.25; 
    }, autoplayMs);
    return () => clearInterval(t);
  }, [images.length, autoplayMs]);

  const startLoop = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const styleW = Math.min(900, canvasRef.current.parentElement.clientWidth);
    const phoneW = Math.min(styleW, 420); // 
    const phoneH = Math.round((phoneW / width) * height);
    canvasRef.current.style.width = phoneW + "px";
    canvasRef.current.style.height = phoneH + "px";
    canvasRef.current.width = phoneW * DPR;
    canvasRef.current.height = phoneH * DPR;
    ctx.scale(DPR, DPR);

    const cardW = phoneW;
    const cardH = phoneH;

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      drag.current.x += drag.current.vx;
      drag.current.vx *= 0.94;
      if (Math.abs(drag.current.vx) < 0.001) drag.current.vx = 0;

      if (drag.current.x <= -cardW / 2) {
        setIndex((i) => (i + 1) % images.length);
        drag.current.x += cardW;
      } else if (drag.current.x >= cardW / 2) {
        setIndex((i) => (i - 1 + images.length) % images.length);
        drag.current.x -= cardW;
      }
      ctx.clearRect(0, 0, phoneW, phoneH);
      const order = [-2, -1, 0, 1, 2];
      order.forEach((off) => {
        const slide = mod(index + off, images.length);
        const img = imgsRef.current[slide];
        if (!img) return;

        const baseX = (phoneW / 2) - cardW / 2 + drag.current.x + off * cardW;
        const centerX = baseX + cardW / 2;

        const dist = Math.abs(centerX - phoneW / 2) / (phoneW / 2); 
        const scale = 1 - Math.min(0.18, dist * 0.22);
        const tilt = clamp((centerX - phoneW / 2) / (phoneW / 2), -1, 1) * 6; 

        ctx.save();
        ctx.translate(centerX, phoneH / 2);
        ctx.rotate((tilt * Math.PI) / 180);
        ctx.scale(scale, scale);
        ctx.translate(-cardW / 2, -cardH / 2);
        roundRect(ctx, 0, 0, cardW, cardH, 18);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.shadowColor = "rgba(0,0,0,.18)";
        ctx.shadowBlur = 16;
        ctx.shadowOffsetY = 8;
        const r = contain(img.width, img.height, cardW, Math.round(cardH * 0.62));
        ctx.save();
        ctx.beginPath();
        roundRect(ctx, 0, 0, cardW, Math.round(cardH * 0.62), 18);
        ctx.clip();
        ctx.drawImage(img, (cardW - r.w) / 2, (Math.round(cardH * 0.62) - r.h) / 2, r.w, r.h);
        ctx.restore();
        ctx.shadowColor = "transparent";
        ctx.fillStyle = "#0f172a";
        ctx.font = "900 16px Nunito, system-ui, sans-serif";
        ctx.fillText(`Projeto & brincadeiras #${slide + 1}`, 12, cardH - 80);
        ctx.fillStyle = "#475569";
        ctx.font = "700 13px Nunito, system-ui, sans-serif";
        ctx.fillText("Rotina segura, alegria e descobertas.", 12, cardH - 56);
        drawChip(ctx, 12, cardH - 36, "⭐ Música");
        drawChip(ctx, 112, cardH - 36, "🎨 Artes");

        ctx.restore();
      });
    };

    cancelAnimationFrame(rafRef.current);
    loop();
  };

  // eventos
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onEnter = () => (playingRef.current = false);
    const onLeave = () => {
      playingRef.current = true;
    };
    const onDown = (e) => {
      playingRef.current = false;
      drag.current.active = true;
      drag.current.startX = getX(e, el);
    };
    const onMove = (e) => {
      if (!drag.current.active) return;
      const x = getX(e, el);
      drag.current.vx = (x - drag.current.startX) * 0.12;
      drag.current.startX = x;
    };
    const onUp = () => (drag.current.active = false);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", (e) => onDown(e.touches[0]), { passive: true });
    el.addEventListener("touchmove", (e) => onMove(e.touches[0]), { passive: true });
    el.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", (e) => onDown(e.touches[0]));
      el.removeEventListener("touchmove", (e) => onMove(e.touches[0]));
      el.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div className="canvas-carousel">
      <canvas ref={canvasRef} aria-label="Carrossel de fotos" />
      {/* Dots */}
      <div className="cc-dots" role="tablist" aria-label="Slides">
        {images.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={index === i}
            className={`cc-dot ${index === i ? "is-active" : ""}`}
            onClick={() => {
              setIndex(i);
              drag.current.vx = (i > index ? -1 : 1) * 0.35;
            }}
            title={`Ir para slide ${i + 1}`}
          >
            {index === i ? "⭐" : "⚪"}
          </button>
        ))}
      </div>
    </div>
  );
}

function mod(n, m) { return ((n % m) + m) % m; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function getX(e, el) { const r = el.getBoundingClientRect(); return e.clientX - r.left; }
function contain(srcW, srcH, dstW, dstH) {
  const r = Math.min(dstW / srcW, dstH / srcH);
  return { w: Math.round(srcW * r), h: Math.round(srcH * r) };
}
function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
function drawChip(ctx, x, y, text) {
  ctx.save();
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "rgba(242,140,44,.35)";
  ctx.lineWidth = 2;
  const padX = 10, padY = 6;
  ctx.font = "800 12px Nunito, system-ui, sans-serif";
  const w = Math.round(ctx.measureText(text).width) + padX * 2;
  const h = 24;
  roundRect(ctx, x, y - h + 4, w, h, 999);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#0f172a";
  ctx.fillText(text, x + padX, y - 8);
  ctx.restore();
}
