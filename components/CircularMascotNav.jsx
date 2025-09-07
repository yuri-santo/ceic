// components/CircularMascotNav.jsx
"use client";
import Image from "next/image";

/* ORDEM da sua logo (topo → horário) #metodo #contato*/
export const MASCOTS_MAP = [
  { key: "amarelo",  src: "/mascotes/logo_amarelo.jpg",  label: "Início",      color: "yellow", target: "#inicio"         },
  { key: "verde",    src: "/mascotes/logo_verde.jpg",    label: "Sobre", color: "green",  target: "#sobre"                },
  { key: "vermelho", src: "/mascotes/logo_vermelho.jpg", label: "Metodologia",  color: "red",    target: "#metodo"        },
  { key: "laranja",  src: "/mascotes/logo_laranja.jpg",  label: "Estrutura",       color: "orange", target: "#estrutura"  },
  { key: "azul",     src: "/mascotes/logo_azul.jpg",     label: "Cantato",   color: "blue",   target: "#contato"          }
];

export default function CircularMascotNav(){
  return (
    <aside className="circSideNav" aria-label="Navegação por mascotes">
      <div className="panel">
        <div className="ring">
          {MASCOTS_MAP.map((it)=>(
            <a key={it.key} href={it.target} className="mascLink" data-key={it.key} aria-label={it.label}>
              <span className="bubble" data-color={it.color}>
                <Image src={it.src} alt={it.label} width={68} height={68}/>
              </span>
              <span className="hint">{it.label}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
