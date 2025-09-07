"use client";
export default function LeadStickyBar(){
  const goWA = () =>
    window.open(
      "https://wa.me/553100000000?text=" + encodeURIComponent("Olá! Quero receber a tabela e agendar uma visita."),
      "_blank","noopener"
    );
  return (
    <div className="lead-sticky" aria-hidden="false">
      <div className="inner">
        <span style={{ fontWeight: 900 }}>Vagas limitadas por turma — garanta sua conversa com a Coordenação</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a className="btn btn-ghost" href="#contato">Receber tabela (PDF)</a>
          <button className="btn btn-primary" onClick={goWA}>Agendar visita</button>
        </div>
      </div>
    </div>
  );
}
