"use client";

import Image from "next/image";
import CircularMascotNav from "../components/CircularMascotNav";
import WhatsAppWidget from "../components/WhatsAppWidget";
import LeadStickyBar from "../components/LeadStickyBar";
import EffectsClient from "../components/EffectsClient";

/* SVGs simples (sem emojis) */
const IconSparkles=(p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M5 3l1.3 3.9L10 8l-3.7 1.1L5 13l-1.3-3.9L0 8l3.7-1.1L5 3zm9 1l1.6 4.6L20 10l-4.4 1.4L14 16l-1.6-4.6L8 10l4.4-1.4L14 4zm6 8l.9 2.7L23 16l-2.1.3L20 19l-.9-2.7L16 16l2.1-.3.9-2.7z"/></svg>);
const IconChat   =(p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4 4h16a2 2 0 012 2v9a2 2 0 01-2 2H8l-4 3V6a2 2 0 012-2z"/></svg>);
const IconShield =(p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-4z"/></svg>);
const IconFireworks=(p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M11 2h2v5h-2zM18.36 5.64l1.41 1.41-3.54 3.54-1.41-1.41zM2 11h5v2H2zM5.64 5.64L10 10.01 8.59 11.42 5.05 7.88zM18.36 18.36L14.82 14.8l1.41-1.41 3.54 3.54zM11 17h2v5h-2zM7.05 14.82l-1.41 1.41 3.54 3.54 1.41-1.41z"/></svg>);

export default function Page(){
  return (
    <>
      <EffectsClient/>
      <CircularMascotNav/>

      <header className="hoverable">
        <div className="container nav">
          <div className="brand">
            <Image src="/logo.jpg" alt="Logo Centro de Educação Infantil Cirandinha" width={54} height={54}/>
            <div>
              <h1>Centro de Educação Infantil Cirandinha</h1>
              <small>Há 45 anos guiando pelo melhor caminho</small>
            </div>
          </div>
          <nav aria-label="Primária">
            <ul>
              <li><a href="#sobre" className="hoverable">Sobre</a></li>
              <li><a href="#metodo" className="hoverable">Metodologia</a></li>
              <li><a href="#estrutura" className="hoverable">Estrutura</a></li>
              <li><a href="#contato" className="hoverable">Matrículas</a></li>
              <li><a href="#" className="hoverable">Aluno</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="hero">
          <div className="container hero-inner">
            <div>
              <div className="kicker">Aprender brincando</div>
              <h2 className="title" data-pin-target>
                Acolhimento, diversão e descobertas{" "}
                <span style={{background:"linear-gradient(90deg,var(--blue),var(--green))", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent"}}>
                  do maternal ao 2º período
                </span>.
              </h2>
              <p className="subtitle">
                Cada momento é pensado para estimular a imaginação, o tamanho do coração e a coragem de ser quem se é — com parceria ativa da família.
              </p>
              <div className="cta">
                <a href="#contato" className="btn btn-primary hoverable" data-confetti>Agendar visita</a>
                <a href="#metodo" className="btn btn-ghost hoverable">Como funciona</a>
              </div>
              <p style={{marginTop:".6rem", color:"var(--muted)", fontSize:".95rem"}}>
                Já estamos de volta. Garanta a vaga do seu filho — matrículas abertas.
              </p>
            </div>
            <div className="hero-art hoverable" aria-label="Crianças com camisa da escola">
              <div style={{position:"relative", width:"100%", height:"100%"}}>
                <Image
                  src="/camisa.jpg"
                  alt="Crianças com camisa da escola"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{objectFit:"cover", borderRadius:"18px"}}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="lead-sticky"><LeadStickyBar/></div>

        {/* SOBRE */}
        <section id="sobre">
          <div className="container">
            <h3 className="section-title" data-pin-target>Sobre o Cirandinha</h3>
            <div className="grid-3">
              <div className="card hoverable reveal">
                <span className="badge"><span className="ico blue"><IconSparkles/></span>Acolhedora e divertida</span>
                <p>Educação infantil acolhedora, divertida e repleta de aprendizado — com dias iluminados pelos sorrisos das crianças.</p>
              </div>
              <div className="card hoverable reveal">
                <span className="badge"><span className="ico orange"><IconChat/></span>Escuta ativa</span>
                <p>Respeitamos tempos, olhares e jeitos de cada criança para construir autonomia e vínculos fortes com a família.</p>
              </div>
              <div className="card hoverable reveal">
                <span className="badge"><span className="ico green"><IconShield/></span>Parceria nas transições</span>
                <p>Do desfralde às novas rotinas, acompanhamos com orientação afetiva e comunicação próxima.</p>
              </div>
            </div>
          </div>
        </section>

        {/* METODOLOGIA */}
        <section id="metodo" style={{ background:"var(--bg-soft)" }}>
          <div className="container">
            <h3 className="section-title" data-pin-target>Metodologia gamificada</h3>
            <div className="grid-3">
              <div className="card hoverable reveal">
                <h4>Trilhas e desafios</h4>
                <p>Missões semanais de <strong>Leitura</strong>, <strong>Matemática</strong> e <strong>Movimento</strong> — para aprender fazendo.</p>
                <div className="achievements">
                  <span className="token">Leitura</span><span className="token">Massinha & Música</span><span className="token">Faz-de-conta</span>
                </div>
              </div>
              <div className="card hoverable reveal">
                <h4>Progressão visível</h4>
                <p>Selos não competitivos a cada nova habilidade; a família acompanha por registros e devolutivas.</p>
                <div className="progress" aria-label="Progresso médio de turma"><div></div></div>
                <p className="badge"><span className="ico green"><IconShield/></span>Limites saudáveis de telas</p>
              </div>
              <div className="card hoverable reveal">
                <h4>Dias que viram história</h4>
                <p>Sábado letivo, colônia de férias, dança e muita brincadeira: experiências que juntam alegria e aprendizado.</p>
                <p className="badge"><span className="ico red"><IconFireworks/></span>Confete ao concluir desafios</p>
              </div>
            </div>

            <div className="cta-strip hoverable reveal" style={{ marginTop:"1rem" }}>
              <strong>Quer ver tudo de perto? Agende uma visita.</strong>
              <a href="#contato" className="btn btn-primary" data-confetti>Quero conhecer</a>
            </div>
          </div>
        </section>

        {/* ESTRUTURA */}
        <section id="estrutura">
          <div className="container">
            <h3 className="section-title" data-pin-target>Nossa estrutura</h3>
            <div className="grid-3">
              <div className="card hoverable reveal"><h4>Integral e meio período</h4><p>Rotina equilibrada entre cuidados, alimentação, descanso e atividades mãos na massa.</p></div>
              <div className="card hoverable reveal"><h4>Ambientes lúdicos</h4><p>Salas seguras, coloridas e inspiradas na roda/estrela da nossa marca.</p></div>
              <div className="card hoverable reveal"><h4>Comunicação com famílias</h4><p>Informativos e conversas contínuas para alinharmos limites e hábitos que fortalecem o desenvolvimento.</p></div>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" style={{ background:"var(--bg-soft)" }}>
          <div className="container">
            <h3 className="section-title" data-pin-target>Matrículas & Contato</h3>
            <div className="card hoverable reveal">
              <form onSubmit={(e)=>{ e.preventDefault(); alert("Obrigado! Em breve entraremos em contato."); }}>
                <div style={{display:"grid", gap:".8rem", gridTemplateColumns:"1fr 1fr"}}>
                  <label>Nome<br/><input required name="nome" style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #d0d7e2"}}/></label>
                  <label>Telefone<br/><input required name="tel" style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #d0d7e2"}}/></label>
                </div>
                <label style={{display:"block",marginTop:".8rem"}}>Mensagem<br/><textarea rows={4} style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #d0d7e2"}} placeholder="Quero saber sobre horários, mensalidades, colônia de férias..."></textarea></label>
                <button className="btn btn-primary hoverable" data-confetti style={{marginTop:".8rem"}}>Garanta a vaga</button>
              </form>
            </div>
            <p style={{marginTop:.6+"rem",color:"var(--muted)"}}>
              Acompanhe nosso dia a dia no Instagram: <a href="https://www.instagram.com/ceic_contagem/" target="_blank" rel="noopener">@ceic_contagem</a>
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div className="brand-inv">
            <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
              <Image src="/logo.jpg" alt="Logo Cirandinha" width={48} height={48} style={{ borderRadius: "10px" }}/>
              <div><strong>Centro de Educação Infantil Cirandinha</strong><br/><small>Maternal ao 2º período • Contagem/MG</small></div>
            </div>
            <p className="legal">© 2025 Cirandinha. Todos os direitos reservados. Protótipo educacional.</p>
          </div>
          <div>
            <p><a href="mailto:contato@cirandinha.com">contato@cirandinha.com</a><br/>WhatsApp: (31) 00000-0000</p>
          </div>
        </div>
      </footer>

      <WhatsAppWidget/>
    </>
  );
}
