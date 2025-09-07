"use client";
export default function LeadStickyBar(){
  const goWA = () =>
    window.open(
      "https://wa.me/553100000000?text=" + encodeURIComponent("Olá! Quero agendar uma visita 🙂"),
      "_blank","noopener"
    );
  return (
    <div className="lead-sticky" aria-hidden="false">
      <div className="inner">
        <span style={{ fontWeight: 900 }}>Matrículas abertas — garanta a vaga!</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a className="btn btn-ghost" href="#contato">Agendar visita</a>
          <button className="btn btn-primary" onClick={goWA}>Chamar no WhatsApp</button>
        </div>
      </div>
    </div>
  );
}
