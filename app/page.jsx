"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import CircularMascotNav from "../components/CircularMascotNav";
import LeadStickyBar from "../components/LeadStickyBar";
import EffectsClient from "../components/EffectsClient";

const ManualCarousel = dynamic(() => import("../components/ManualCarousel"), { ssr: false, loading: () => <div style={{height:360}} /> });
const KidsCalendar   = dynamic(() => import("../components/KidsCalendar"), { ssr: false });
const WhatsAppWidget = dynamic(() => import("../components/WhatsAppWidget"), { ssr: false });

const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" />
  </svg>
);

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // encolhe o header ao rolar e marca item ativo
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('nav.primary a'));
    const sections = [
      { id: "sobre" }, { id: "metodo" }, { id: "estrutura" }, { id: "contato" }
    ];

    const onScroll = () => {
      const scrolled = window.scrollY > 4;
      headerRef.current?.classList.toggle("scrolled", scrolled);

      // ativa pill do item conforme seção visível
      const y = window.scrollY + 120;
      let active = null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.offsetTop;
        if (y >= top) active = s.id;
      }
      links.forEach(a => {
        const href = a.getAttribute("href") || "";
        a.classList.toggle("is-active", href === `#${active}`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imagens = Array.from({ length: 10 }, (_, i) => `/galeria/${i + 1}.jpg`);

  const eventos = {
    "2025-09-10": [{ title: "Aula de Música", color: "#7c3aed" }],
    "2025-09-12": [
      { title: "Dia do Brinquedo", color: "#f59e0b" },
      { title: "Comemoração Set", color: "#10b981" },
    ],
    "2025-09-22": [{ title: "Reunião Pais", color: "#ef4444" }],
    "2025-09-30": [{ title: "Passeio ao Parque", color: "#06b6d4" }],
  };

  return (
    <>
      <EffectsClient />
      <CircularMascotNav />

      <header ref={headerRef} className="hoverable">
        <div className="container nav">
          <div className="brand">
            <Image
              src="/logo.jpg"
              alt="Logo Centro de Educação Infantil Cirandinha"
              width={36}
              height={36}
              style={{ borderRadius: 10, height: "auto", width: "auto" }}
              loading="eager"
              priority
            />
            <div>
              <h1>Centro de Educação Infantil Cirandinha</h1>
              <small>45 anos guiando pelo melhor caminho</small>
            </div>
          </div>

          <nav className="primary" aria-label="Principal">
            <ul role="list">
              <li><a href="#sobre" className="hoverable">Sobre</a></li>
              <li><a href="#metodo" className="hoverable">Metodologia</a></li>
              <li><a href="#estrutura" className="hoverable">Estrutura</a></li>
              <li><a href="#contato" className="hoverable">Matrículas</a></li>
            </ul>
          </nav>

          <div className="top-phone">
            <a href="tel:+553100000000">Ligar: (31) 0000-0000</a>
          </div>

          <button
            className="burger"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((s) => !s)}
          >
            <span />
          </button>
        </div>

        <nav className={`mobileMenu ${menuOpen ? "open" : ""}`} aria-label="Menu mobile">
          <div className="container">
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#metodo" onClick={() => setMenuOpen(false)}>Metodologia</a>
            <a href="#estrutura" onClick={() => setMenuOpen(false)}>Estrutura</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Matrículas</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="container hero-inner">
            <div>
              <div className="kicker">Educação infantil com acolhimento e propósito</div>
              <h2 className="title" data-bullet-target>
                Do maternal ao 2º período: rotina segura, trilhas semanais e parceria com a família — para aprender com alegria.
              </h2>
              <ul className="benefit-list">
                <li><span className="li-dot" /> Horários flexíveis (integral e meio período)</li>
                <li><span className="li-dot" /> Trilhas de leitura, matemática e movimento</li>
                <li><span className="li-dot" /> Comunicação próxima com devolutivas</li>
              </ul>
              <div className="cta">
                <a href="#contato" className="btn btn-primary hoverable" data-confetti>Ver horários (PDF)</a>
                <a href="#visita" className="btn btn-ghost hoverable">Agendar visita guiada</a>
              </div>
              <p className="note-muted"><IconCheck className="inline-ico" /> Vagas limitadas por turma. Retorno em até 1 dia útil.</p>
            </div>

            <div className="hero-art hoverable" aria-label="Crianças com camisa da escola">
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src="/camisa.jpg"
                  alt="Crianças com camisa da escola"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover", borderRadius: "18px" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="lead-sticky"><LeadStickyBar /></div>

        <section id="sobre">
          <div className="container">
            <h3 className="section-title" data-bullet-target>Por que o Cirandinha?</h3>
            <div className="grid-3">
              <div className="card hoverable reveal">
                <span className="badge">Acolhimento que educa</span>
                <p>Ambiente afetivo e intencional, com rotina previsível, combinados claros e estímulos para autonomia.</p>
              </div>
              <div className="card hoverable reveal">
                <span className="badge">Família por perto</span>
                <p>Registros de conquistas e conversas periódicas. Orientação nas transições (ex.: desfralde) para caminharmos juntos.</p>
              </div>
              <div className="card hoverable reveal">
                <span className="badge">Segurança e transparência</span>
                <p>Equipe experiente, espaços adaptados e políticas claras sobre telas, hábitos e convivência.</p>
              </div>
            </div>

            <div className="metrics-band hoverable reveal" aria-label="Nossos números">
              <div><strong>45+</strong><span>Anos de história</span></div>
              <div><strong>98%</strong><span>Famílias satisfeitas</span></div>
              <div><strong>1:6</strong><span>Média educador:crianças</span></div>
            </div>
          </div>
        </section>

        <section className="mc-section alt">
          <div className="container">
            <h2 className="section-title">Nossa Galeria</h2>
            <ManualCarousel images={imagens} interval={2500} />
          </div>
        </section>

        <section className="section section-calendar">
          <div className="container">
            <h2 className="section-title">Calendário da Escola</h2>
            <KidsCalendar initialYear={2025} initialMonth={9} events={eventos} />
          </div>
        </section>

        <section id="metodo" style={{ background:"var(--bg-soft)" }}>
          <div className="container">
            <h3 className="section-title" data-bullet-target>Metodologia que vira rotina feliz</h3>
            <div className="grid-3">
              <div className="card hoverable reveal"><h4>Trilhas semanais</h4><p>Atividades mãos na massa de <strong>Leitura</strong>, <strong>Matemática</strong> e <strong>Movimento</strong> — aprender fazendo.</p></div>
              <div className="card hoverable reveal"><h4>Progressão visível</h4><p>Selos não competitivos a cada nova habilidade e devolutivas para a família acompanharem o caminho.</p></div>
              <div className="card hoverable reveal"><h4>Dias que viram história</h4><p>Sábado letivo, colônia de férias, dança e projetos que unem emoção, convivência e desenvolvimento.</p></div>
            </div>

            <div className="cta-strip hoverable reveal" style={{ marginTop:"1rem" }}>
              <strong>Quer ver de perto?</strong>
              <a href="#visita" className="btn btn-primary" data-confetti>Agendar visita guiada</a>
            </div>
          </div>
        </section>

        <section id="estrutura">
          <div className="container">
            <h3 className="section-title" data-bullet-target>Estrutura para cuidar e desenvolver</h3>
            <div className="grid-3">
              <div className="card hoverable reveal"><h4>Integral e meio período</h4><p>Rotina equilibrada entre cuidados, alimentação, descanso e atividades pedagógicas.</p></div>
              <div className="card hoverable reveal"><h4>Ambientes lúdicos</h4><p>Salas seguras e coloridas, inspiradas na roda/estrela, incentivando cooperação e criatividade.</p></div>
              <div className="card hoverable reveal"><h4>Comunicação contínua</h4><p>Informativos, registros e canais diretos para alinharmos expectativas, hábitos e combinados.</p></div>
            </div>
          </div>
        </section>

        <section id="visita" style={{ background:"var(--bg-soft)"}}>
          <div className="container">
            <h3 className="section-title" data-bullet-target>Agende uma visita guiada</h3>
            <div className="card hoverable reveal">
              <p>Conheça a equipe, os espaços e a rotina (30–40 min). Você sai com a <strong>tabela de horários e valores</strong>.</p>
              <a href="#contato" className="btn btn-primary" data-confetti>Reservar horário</a>
            </div>
          </div>
        </section>

        <section id="contato">
          <div className="container">
            <h3 className="section-title reveal" data-bullet-target>Receba o guia (PDF)</h3>
            <div className="card hoverable reveal">
              <form onSubmit={(e)=>{ e.preventDefault(); alert("Obrigado! Enviaremos o guia e a proposta por WhatsApp/e-mail."); }}>
                <div className="form-row">
                  <label>Nome do responsável
                    <input required name="nome" placeholder="Seu nome completo"/>
                  </label>
                  <label>WhatsApp
                    <input required name="tel" placeholder="(31) 9 0000-0000"/>
                  </label>
                </div>
                <div className="form-row">
                  <label>Idade da criança
                    <input name="idade" placeholder="Ex.: 3 anos"/>
                  </label>
                  <label>Período desejado
                    <select name="periodo">
                      <option>Integral</option><option>Manhã</option><option>Tarde</option>
                    </select>
                  </label>
                </div>
                <label className="consent">
                  <input type="checkbox" defaultChecked aria-label="Autoriza envio por WhatsApp e e-mail"/>
                  <span>Enviar por WhatsApp e e-mail o guia da escola (PDF)</span>
                </label>
                <div className="cta" style={{marginTop:".8rem"}}>
                  <button className="btn btn-primary hoverable" data-confetti>Receber guia</button>
                  <a className="btn btn-ghost hoverable" target="_blank" rel="noopener"
                    href="https://wa.me/553100000000?text=Olá!%20Quero%20receber%20o%20guia%20e%20agendar%20uma%20visita.">
                    Falar no WhatsApp
                  </a>
                </div>
                <p className="note-muted">Retornamos em até 1 dia útil. Seus dados são usados apenas para contato sobre matrículas.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div className="brand-inv">
            <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
              <Image
                src="/logo.jpg"
                alt="Logo Cirandinha"
                width={36}
                height={36}
                style={{ borderRadius: 10, height: "auto", width: "auto" }}
                loading="lazy"
              />
              <div><strong>Centro de Educação Infantil Cirandinha</strong><br/><small>Maternal ao 2º período • Contagem/MG</small></div>
            </div>
            <p className="legal">© 2025 Cirandinha. Todos os direitos reservados.</p>
          </div>
          <div>
            <p><a href="mailto:contato@cirandinha.com">contato@cirandinha.com</a><br/>WhatsApp: (31) 00000-0000</p>
          </div>
        </div>
      </footer>

      <WhatsAppWidget />
    </>
  );
}
