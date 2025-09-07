export function burstConfetti(x, y, amount = 90) {
  if (typeof document === "undefined") return;
  const root = document.body;
  for (let i = 0; i < amount; i++) {
    const c = document.createElement("div");
    Object.assign(c.style, {
      position: "fixed",
      left: x + "px",
      top: y + "px",
      width: "6px",
      height: "6px",
      borderRadius: "2px",
      background: `hsl(${Math.floor(Math.random() * 360)}deg 90% 60%)`,
      pointerEvents: "none",
      zIndex: 1000
    });
    root.appendChild(c);
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 6 + 2;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;
    const rot = Math.random() * 720 - 360;
    c.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx * 25}px,${dy * 25}px) rotate(${rot}deg)`, opacity: 0 }
      ],
      { duration: 800 + Math.random() * 400, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
    ).onfinish = () => c.remove();
  }
}
