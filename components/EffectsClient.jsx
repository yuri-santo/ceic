// components/EffectsClient.jsx
"use client";
import { useEffect } from "react";
import { MASCOTS_MAP } from "./CircularMascotNav";

/** cria (ou atualiza) a imagem-bullet antes do título da seção */
function injectBullet(sectionEl, key, src){
  if(!sectionEl) return;
  const title = sectionEl.querySelector("[data-bullet-target]") || sectionEl.querySelector("h2, h3, h4");
  if(!title) return;

  let img = title.querySelector(".bullet-img");
  if(!img){
    img = document.createElement("img");
    img.className = "bullet-img";
    img.width = 28; img.height = 28;
    title.prepend(img);
  }
  img.src = src;
  img.alt = "Ícone da seção";
  img.dataset.bulletFor = key;

  // animação "pop"
  img.classList.remove("pin-pop");
  void img.offsetWidth;
  img.classList.add("pin-pop");
}

/** destaca o mascote ativo no anel/barra (desktop) */
function setActiveMascot(key){
  const links = document.querySelectorAll(".circSideNav .mascLink");
  links.forEach(a=>a.classList.toggle("active", a.dataset.key === key));
}

export default function EffectsClient(){
  useEffect(()=>{
    // Marcar os elementos que podem animar com 'will-reveal'
    document.querySelectorAll(".reveal").forEach(el=>el.classList.add("will-reveal"));

    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries)=> entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("in"); }),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".will-reveal").forEach(el=>io.observe(el));

    // Spotlight + rastro leve (disable em mobile para poupar)
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    let colorIdx = 0;
    const colors = ["blue","green","yellow","orange","red"];
    const setMouse=(x,y)=>{ document.documentElement.style.setProperty("--mx",x+"px"); document.documentElement.style.setProperty("--my",y+"px"); };
    const onMove=(e)=>{ if(isMobile) return; setMouse(e.clientX,e.clientY);
      const t=document.createElement("div");
      const cls = document.documentElement.dataset.trailPrimary || colors[colorIdx++%colors.length];
      t.className="trail "+cls; t.style.left=e.clientX-4+"px"; t.style.top=e.clientY-4+"px";
      document.body.appendChild(t); setTimeout(()=>t.remove(),320);
    };
    window.addEventListener("pointermove", onMove);

    // Se os mascotes estiverem ocultos (mobile), não cria observadores de seção
    const mascotsVisible = !!document.querySelector(".circSideNav");
    const byHash = (hash)=> MASCOTS_MAP.find(m => m.target === hash);
    const linkByKey = (key)=> Array.from(document.querySelectorAll(".circSideNav .mascLink")).find(a=>a.dataset.key===key);

    let sectionObserver;
    if (mascotsVisible){
      sectionObserver = new IntersectionObserver((entries)=>{
        const best = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
        if(!best) return;
        const map = byHash("#"+best.target.id);
        if(!map) return;
        const link = linkByKey(map.key);
        const img  = link?.querySelector("img");
        if(!img) return;
        document.documentElement.dataset.trailPrimary = link.querySelector(".bubble")?.dataset.color || "";
        injectBullet(best.target, map.key, img.getAttribute("src"));
        setActiveMascot(map.key);
      },{ threshold:[0.55, 0.8] });

      ["inicio","sobre","metodo","estrutura","contato"].forEach(id=>{
        const sec = document.getElementById(id);
        if(sec) sectionObserver.observe(sec);
      });

      // clique nos mascotes (desktop)
      document.querySelectorAll(".circSideNav .mascLink").forEach(a=>{
        a.addEventListener("click",(e)=>{
          const targetSel = a.getAttribute("href");
          const sec = document.querySelector(targetSel);
          if(!sec) return;
          e.preventDefault();
          sec.scrollIntoView({ behavior:"smooth", block:"start" });
          const img = a.querySelector("img");
          if(img){
            injectBullet(sec, a.dataset.key, img.getAttribute("src"));
            setActiveMascot(a.dataset.key);
            document.documentElement.dataset.trailPrimary = a.querySelector(".bubble")?.dataset.color || "";
          }
        });
        a.addEventListener("mouseenter",()=>{
          const c = a.querySelector(".bubble")?.dataset.color;
          if(c) document.documentElement.dataset.trailPrimary = c;
        });
      });

      // estado inicial (desktop)
      const start = document.getElementById("inicio");
      const startMap = byHash("#inicio");
      const startLink = startMap ? linkByKey(startMap.key) : null;
      const startImg  = startLink?.querySelector("img");
      if(start && startMap && startImg){
        injectBullet(start, startMap.key, startImg.getAttribute("src"));
        setActiveMascot(startMap.key);
        document.documentElement.dataset.trailPrimary = startLink.querySelector(".bubble")?.dataset.color || "";
      }
    }

    return ()=>{
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      sectionObserver?.disconnect();
    };
  },[]);

  return <div className="spotlight" aria-hidden="true"/>;
}
