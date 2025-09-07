"use client";
import { useEffect, useState } from "react";

function WaIcon(props){
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...props}>
      <path fill="#25D366" d="M16 3C9.383 3 4 8.383 4 15c0 2.21.578 4.283 1.586 6.086L4 28l7.086-1.586C12.717 27.422 14.79 28 17 28c6.617 0 12-5.383 12-12S23.617 3 17 3h-1Z"/>
      <path fill="#fff" d="M22.7 19.6c-.2.6-1.1 1-1.6 1.1-.4.1-.9.1-1.5 0-2.6-.6-4.6-2.2-6.1-4.6-.5-.8-.9-1.7-1-2.7 0-.7.2-1.2.6-1.6.2-.2.4-.3.6-.3h.4c.1 0 .2 0 .3.2l1.1 2c.1.2.1.3 0 .5l-.4.6c-.1.2-.1.3 0 .5.4.7.9 1.4 1.5 2 .6.6 1.3 1.1 2 .1.2.3.2.5.1l.7-.4c.2-.1.4-.1.6 0l1.9 1.1c.2.1.2.2.2.4Z"/>
    </svg>
  );
}

export default function WhatsAppWidget(){
  const [closed, setClosed] = useState(false);

  useEffect(()=>{
    try{ setClosed(localStorage.getItem("waClosed")==="1"); }catch{}
  },[]);
  const close = ()=>{
    setClosed(true);
    try{ localStorage.setItem("waClosed","1"); }catch{}
  };

  const openWA = () =>
    window.open(
      "https://wa.me/553100000000?text=" + encodeURIComponent("Olá! Quero saber sobre horários e valores."),
      "_blank","noopener"
    );

  if (closed) return null;

  return (
    <div className="wa-wrap">
      {/* balão de texto (esconde no mobile via CSS) */}
      <div className="wa-box" role="status" aria-live="polite">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
          <div>
            <strong>Atendimento rápido</strong><br/>
            Fale com a Coordenação pelo WhatsApp.
          </div>
          <button onClick={close} aria-label="Fechar" style={{border:0,background:"transparent",cursor:"pointer",fontWeight:900}}>×</button>
        </div>
      </div>

      {/* botão compacto */}
      <button className="wa-open" onClick={openWA} aria-label="Abrir WhatsApp">
        <WaIcon width="20" height="20" />
        WhatsApp
      </button>
    </div>
  );
}
