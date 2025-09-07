"use client";

import Image from "next/image";
import CircularMascotNav from "../components/CircularMascotNav";
import WhatsAppWidget from "../components/WhatsAppWidget";
import LeadStickyBar from "../components/LeadStickyBar";
import EffectsClient from "../components/EffectsClient";

/* Ícones (SVGs simples, sem emojis) */
const IconSparkles=(p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M5 3l1.3 3.9L10 8l-3.7 1.1L5 13l-1.3-3.9L0 8l3.7-1.1L5 3zm9 1l1.6 4.6L20 10l-4.4 1.4L14 16l-1.6-4.6L8 10l4.4-1.4L14 4zm6 8l.9 2.7L23 16l-2.1.3L20 19l-.9-2.7L16 16l2.1-.3.9-2.7z"/></svg>);
const IconChat   =(p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4 4h16a2 2 0 012 2v9a2 2 0 01-2 2H8l-4 3V6a2 2 0 012-2z"/></svg>);
const IconShield =(p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-4z"/></svg>);
const IconCheck  =(p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z"/></svg>);
const IconClock  =(p)=>(<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 1a11 11 0 100 22 11 11 0 000-22zm1 6h-2v6l5 3 .9-1.5-3.9-2.3V7z"/></svg>);

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
              <small>45 anos guiando pelo melhor caminho</small>
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
        {/* HERO — proposta de valor clara + CTAs específicos */}
        <section id="inicio" className="hero">
          <div className="container hero-inner">
            <div>
              <div className="kicker">Educação infantil com acolhimento e propósito</div>
              <h2 className="title" data-bullet-target>
                Aprender brincando — do maternal ao 2º período — com rotina segura,
                parceria com a família e limites saudáveis de telas.
              </h2>
              <ul className="benefit-list">
                <li><IconCheck className="li-ico"/> Horários flexíveis (integral e meio período)</li>
                <li><IconCheck className="li-ico"/> Trilhas semanais de leitura, matemática e movimento</li>
                <li><IconCheck className="li-ico"/> Comunicação próxima com devolutivas para a família</li>
              </ul>
              <div className="cta">
                <a href="#contato" className="btn btn-primary hoverable" data-confetti>Ver horários e valores</a>
                <a href="#visita" className="btn btn-ghost hoverable">Agendar visita guiada</a>
                <a href="https://wa.me/553100000000?text=Olá!%20Quero%20falar%20com%20a%20Coordenação" target="_blank" rel="noopener" className="btn btn-ghost hoverable">Falar com a Coordenação</a>
              </div>
              <p className="note-muted">
                <IconClock className="inline-ico"/> Vagas limitadas por turma. Resposta em até 1 dia útil.
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

        {/* SOBRE — benefícios tangíveis + prova social curta */}
        <section id="sobre">
          <div className="container">
            <h3 className="section-title" data-bullet-target>Por que o Cirandinha?</h3>
            <div className="grid-3">
              <div className="card hoverable reveal">
                <span className="badge"><span className="ico blue"><IconSparkles/></span> Acolhimento que educa</span>
                <p>Ambiente afetivo e intencional, com rotina previsível, combinados claros e estímulos para autonomia.</p>
              </div>
              <div className="card hoverable reveal">
                <span className="badge"><span className="ico orange"><IconChat/></span> Família por perto</span>
                <p>Registro de conquistas, conversas periódicas e orientação nas transições (ex.: desfralde) para caminharmos juntos.</p>
              </div>
              <div className="card hoverable reveal">
                <span className="badge"><span className="ico green"><IconShield/></span> Segurança e transparência</span>
                <p>Equipe experiente, espaços adaptados e políticas claras sobre telas, hábitos e convivência.</p>
              </div>
            </div>

            {/* Prova social simples */}
            <div className="social-proof">
              <div className="proof-item"><strong>45+</strong><span>anos de história</span></div>
              <div className="proof-item"><strong>98%</strong><span>famílias satisfeitas</span></div>
              <div className="proof-item"><strong>1:6</strong><span>média educador:crianças</span></div>
            </div>
          </div>
        </section>

        {/* METODOLOGIA — foco no valor e resultados */}
        <section id="metodo" style={{ background:"var(--bg-soft)" }}>
          <div className="container">
            <h3 className="section-title" data-bullet-target>Metodologia que vira rotina feliz</h3>
            <div className="grid-3">
              <div className="card hoverable reveal">
                <h4>Trilhas semanais</h4>
                <p>Atividades mãos na massa de <strong>Leitura</strong>, <strong>Matemática</strong> e <strong>Movimento</strong> — aprender fazendo, com alegria.</p>
                <div className="achievements">
                  <span className="token">Leitura</span><span className="token">Massinha & Música</span><span className="token">Faz-de-conta</span>
                </div>
              </div>
              <div className="card hoverable reveal">
                <h4>Progressão visível</h4>
                <p>Selos não competitivos a cada nova habilidade e devolutivas para a família acompanharem o caminho.</p>
                <div className="progress" aria-label="Progresso médio de turma"><div></div></div>
                <p className="badge"><span className="ico green"><IconShield/></span> Limites saudáveis de telas</p>
              </div>
              <div className="card hoverable reveal">
                <h4>Dias que viram história</h4>
                <p>Sábado letivo, colônia de férias, dança e projetos que unem emoção, convivência e desenvolvimento.</p>
                <p className="badge"><span className="ico blue"><IconSparkles/></span> Conquistas celebradas</p>
              </div>
            </div>

            <div className="cta-strip hoverable reveal" style={{ marginTop:"1rem" }}>
              <strong>Quer ver de perto?</strong>
              <a href="#visita" className="btn btn-primary" data-confetti>Agendar visita guiada</a>
            </div>
          </div>
        </section>

        {/* ESTRUTURA — argumentos práticos para os pais */}
        <section id="estrutura">
          <div className="container">
            <h3 className="section-title" data-bullet-target>Estrutura para cuidar e desenvolver</h3>
            <div className="grid-3">
              <div className="card hoverable reveal"><h4>Integral e meio período</h4><p>Rotina equilibrada entre cuidados, alimentação, descanso e atividades pedagógicas.</p></div>
              <div className="card hoverable reveal"><h4>Ambientes lúdicos</h4><p>Salas seguras e coloridas, inspiradas na nossa roda/estrela, que incentivam cooperação e criatividade.</p></div>
              <div className="card hoverable reveal"><h4>Comunicação contínua</h4><p>Informativos, registros e canais diretos para alinharmos expectativas, hábitos e combinados.</p></div>
            </div>
          </div>
        </section>

        {/* VISITA — micro-landing de conversão específica */}
        <section id="visita" style={{ background:"var(--bg-soft)"}}>
          <div className="container">
            <h3 className="section-title" data-bullet-target>Agende uma visita guiada</h3>
            <div className="card hoverable reveal">
              <p>Conheça a equipe, os espaços e a rotina. A visita dura cerca de 30–40 minutos e você sai com a <strong>tabela de horários e valores</strong>.</p>
              <a href="#contato" className="btn btn-primary" data-confetti>Quero reservar meu horário</a>
            </div>
          </div>
        </section>

        {/* CONTATO — formulário com incentivo + campos úteis */}
        <section id="contato">
          <div className="container">
            <h3 className="section-title" data-bullet-target>Receba a tabela + proposta (PDF)</h3>
            <div className="card hoverable reveal">
              <form onSubmit={(e)=>{ e.preventDefault(); alert("Obrigado! Enviamos a tabela e a proposta para seu e-mail/WhatsApp."); }}>
                <div style={{display:"grid",gap:".8rem",gridTemplateColumns:"1fr 1fr"}}>
                  <label>Responsável<br/><input required name="nome" placeholder="Seu nome completo" style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #d0d7e2"}}/></label>
                  <label>WhatsApp<br/><input required name="tel" placeholder="(31) 9 0000-0000" style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #d0d7e2"}}/></label>
                </div>
                <div style={{display:"grid",gap:".8rem",gridTemplateColumns:"1fr 1fr", marginTop:".8rem"}}>
                  <label>Criança (idade)<br/><input name="idade" placeholder="Ex.: 3 anos" style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #d0d7e2"}}/></label>
                  <label>Período desejado<br/>
                    <select name="periodo" style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #d0d7e2"}}>
                      <option>Integral</option><option>Manhã</option><option>Tarde</option>
                    </select>
                  </label>
                </div>
                <label style={{display:"block",marginTop:".8rem"}}>Mensagem (opcional)<br/>
                  <textarea rows={4} style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #d0d7e2"}} placeholder="Diga seus horários, dúvidas ou quando prefere a visita."></textarea>
                </label>
                <label style={{display:"flex",alignItems:"center",gap:8, marginTop:".8rem"}}>
                  <input type="checkbox" defaultChecked/> Enviar por WhatsApp e e-mail a tabela + proposta (PDF)
                </label>
                <div className="cta" style={{marginTop:".8rem"}}>
                  <button className="btn btn-primary hoverable" data-confetti>Receber tabela + proposta</button>
                  <a href="https://wa.me/553100000000?text=Olá!%20Quero%20receber%20a%20tabela%20e%20agendar%20uma%20visita." target="_blank" rel="noopener" className="btn btn-ghost hoverable">Falar no WhatsApp</a>
                </div>
                <p className="note-muted">Retornamos em até 1 dia útil. Seus dados são protegidos e usados apenas para contato sobre matrículas.</p>
              </form>
            </div>
            <p className="note-muted" style={{marginTop:".6rem"}}>
              Acompanhe nosso dia a dia no Instagram:{" "}
              <a href="https://www.instagram.com/ceic_contagem/" target="_blank" rel="noopener">@ceic_contagem</a>
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
            <p className="legal">© 2025 Cirandinha. Todos os direitos reservados.</p>
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
