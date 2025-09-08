export function burstConfetti(x, y, amount = 28) {
  if (typeof document === "undefined") return;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const qty = Math.max(12, Math.min(amount, isMobile ? 20 : amount));

  const root = document.body;
  for (let i = 0; i < qty; i++) {
    const c = document.createElement("div");
    Object.assign(c.style, {
      position: "fixed",
      left: x + "px",
      top: y + "px",
      width: "4px",
      height: "4px",
      borderRadius: "2px",
      background: `hsl(${(Math.random() * 360) | 0}deg 90% 60%)`,
      pointerEvents: "none",
      zIndex: 1000,
      willChange: "transform, opacity",
    });
    root.appendChild(c);

    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 4 + 2;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;
    const rot = (Math.random() * 360 - 180) | 0;

    c.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx * 20}px,${dy * 20}px) rotate(${rot}deg)`, opacity: 0 }
      ],
      { duration: 600 + Math.random() * 300, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
    ).onfinish = () => c.remove();
  }
}
