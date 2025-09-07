"use client";
import { useEffect } from "react";
import { burstConfetti } from "./Confetti";
import { MASCOTS_MAP } from "./CircularMascotNav";

export default function EffectsClient() {
  useEffect(() => {
    /* ===== spotlight + rastro + confete ===== */
    let colorIdx = 0;
    let idleTimer;
    let lastMouse = { x: innerWidth / 2, y: innerHeight / 2 };

    const setMouse = (x, y) => {
      document.documentElement.style.setProperty("--mx", x + "px");
      document.documentElement.style.setProperty("--my", y + "px");
    };

    const onMove = (e) => {
      lastMouse = { x: e.clientX, y: e.clientY };
      setMouse(e.clientX, e.clientY);

      const t = document.createElement("div");
      const colors = ["blue", "green", "yellow", "orange", "red"];
      const primary = document.documentElement.dataset.trailPrimary;
      const colorClass = primary || colors[colorIdx++ % colors.length];
      t.className = "trail " + colorClass;
      t.style.left = e.clientX - 5 + "px";
      t.style.top = e.clientY - 5 + "px";
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 420);

      resetIdle();
    };

    const onClick = (e) => {
      if (e.target.closest("[data-confetti]")) {
        burstConfetti(e.clientX, e.clientY, 120);
      }
    };

    const resetIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(
        () => burstConfetti(lastMouse.x, lastMouse.y, 55),
        5000
      );
    };

    addEventListener("pointermove", onMove);
    addEventListener("click", onClick);
    resetIdle();

    /* ===== reveal on scroll ===== */
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => en.isIntersecting && en.target.classList.add("in")),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    /* ===== docking estável (pin no canto superior direito da seção) ===== */
    let currentDockKey = null;
    let introTimer;

    const links = Array.from(document.querySelectorAll(".circSideNav .mascLink"));

    const getMapByHash = (hashId) => MASCOTS_MAP.find((m) => m.target === hashId);

    const clearDock = () => {
      if (!currentDockKey) return;
      const prevLink = links.find((a) => a.dataset.key === currentDockKey);
      prevLink?.classList.remove("docked");
      const prevPin = document.querySelector(`[data-pin-for='${currentDockKey}']`);
      prevPin?.remove();
      currentDockKey = null;
    };

    const createPin = (key, imgSrc, slotEl) => {
      if (!slotEl) return;
      const pin = document.createElement("img");
      pin.src = imgSrc;
      pin.alt = "Ícone da seção";
      pin.width = 32;
      pin.height = 32;
      pin.className = "pinned";
      pin.setAttribute("data-pin-for", key);
      slotEl.appendChild(pin); // pos abs pelo CSS
    };

    // anima fantasma até o slot
    const ghostFly = (fromEl, toEl) => {
      if (!fromEl || !toEl) return;
      const src = fromEl.getBoundingClientRect();
      const dst = toEl.getBoundingClientRect();
      const startX = src.left + src.width / 2;
      const startY = src.top + src.height / 2;
      const endX = dst.right - 16;     // canto superior direito
      const endY = dst.top + 16;

      const ghost = fromEl.cloneNode(true);
      ghost.style.position = "fixed";
      ghost.style.zIndex = "80";
      ghost.style.left = startX - 42 + "px";
      ghost.style.top = startY - 42 + "px";
      document.body.appendChild(ghost);

      ghost
        .animate(
          [
            { transform: `translate(0,0) scale(1)`, opacity: 1 },
            {
              transform: `translate(${endX - startX}px, ${endY - startY}px) scale(.55)`,
              opacity: 0.95
            }
          ],
          { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
        )
        .onfinish = () => ghost.remove();
    };

    const dockToSection = (sectionEl) => {
      if (!sectionEl?.id) return;
      const map = getMapByHash("#" + sectionEl.id);
      if (!map) return;

      if (currentDockKey === map.key) return;

      const link = links.find((a) => a.dataset.key === map.key);
      const bubble = link?.querySelector(".bubble");
      const img = link?.querySelector("img");
      const slot = sectionEl.querySelector(".section-pin");

      if (!link || !bubble || !img || !slot) return;

      clearDock();

      // cor do rastro
      const c = bubble.dataset.color;
      if (c) document.documentElement.dataset.trailPrimary = c;

      ghostFly(bubble, slot);

      // marca o slot do anel como vazio e fixa o pin
      link.classList.add("docked");
      createPin(map.key, img.getAttribute("src"), slot);
      currentDockKey = map.key;
    };

    // observa seções e doka a mais visível
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!vis) return;
        dockToSection(vis.target);
      },
      { threshold: [0.6, 0.85] }
    );

    ["inicio", "metodo", "contato", "sobre", "estrutura"].forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) sectionObserver.observe(sec);
    });

    // clique no mascote → scroll + docking
    links.forEach((a) => {
      a.addEventListener("click", (e) => {
        const to = a.getAttribute("href");
        const target = document.querySelector(to);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => dockToSection(target), 350);
      });
      a.addEventListener("mouseenter", () => {
        const c = a.querySelector(".bubble")?.dataset.color;
        if (c) document.documentElement.dataset.trailPrimary = c;
      });
    });

    // mascote inicial: sobe, fica alguns segundos, retorna
    const intro = () => {
      const inicio = document.getElementById("inicio");
      const map = getMapByHash("#inicio");
      if (!inicio || !map) return;
      const link = links.find((a) => a.dataset.key === map.key);
      const bubble = link?.querySelector(".bubble");
      const img = link?.querySelector("img");
      const slot = inicio.querySelector(".section-pin");
      if (!bubble || !img || !slot) return;

      // se já houve scroll para outra seção, não faz
      if (currentDockKey && currentDockKey !== map.key) return;

      ghostFly(bubble, slot);
      link.classList.add("docked");
      createPin(map.key, img.getAttribute("src"), slot);
      currentDockKey = map.key;

      // fica 8s e retorna, se ainda for o amarelo
      introTimer = setTimeout(() => {
        if (currentDockKey !== map.key) return;
        clearDock();
      }, 8000);
    };

    intro(); // executa na carga

    return () => {
      removeEventListener("pointermove", onMove);
      removeEventListener("click", onClick);
      if (idleTimer) clearTimeout(idleTimer);
      if (introTimer) clearTimeout(introTimer);
      io.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return <div className="spotlight" aria-hidden="true" />;
}
