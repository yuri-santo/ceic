"use client";
import { useEffect } from "react";
import { MASCOTS_MAP } from "./CircularMascotNav";

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
  img.classList.remove("pin-pop"); void img.offsetWidth; img.classList.add("pin-pop");
}

function setActiveMascot(key){
  const links = document.querySelectorAll(".circSideNav .mascLink");
  links.forEach(a=>a.classList.toggle("active", a.dataset.key === key));
}

export default function EffectsClient(){
  useEffect(()=>{
    document.querySelectorAll(".reveal").forEach(el=>el.classList.add("will-reveal"));

    const io = new IntersectionObserver(
      (entries)=> entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("in"); }),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".will-reveal").forEach(el=>io.observe(el));

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
        injectBullet(best.target, map.key, img.getAttribute("src"));
        setActiveMascot(map.key);
      },{ threshold:[0.55, 0.8] });

      ["inicio","sobre","metodo","estrutura","contato"].forEach(id=>{
        const sec = document.getElementById(id);
        if(sec) sectionObserver.observe(sec);
      });

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
          }
        });
      });

      const start = document.getElementById("inicio");
      const startMap = byHash("#inicio");
      const startLink = startMap ? linkByKey(startMap.key) : null;
      const startImg  = startLink?.querySelector("img");
      if(start && startMap && startImg){
        injectBullet(start, startMap.key, startImg.getAttribute("src"));
        setActiveMascot(startMap.key);
      }
    }

    return ()=>{
      io.disconnect();
      sectionObserver?.disconnect();
    };
  },[]);

  return <div className="spotlight" aria-hidden="true"/>;
}
