"use client";
import Image from "next/image";

const PHONE = "553100000000"; // <<< TROQUE AQUI
const MSG = encodeURIComponent("Olá! Quero saber sobre vagas e horários 🙂");

export default function WhatsAppWidget() {
  const open = () => window.open(`https://wa.me/${PHONE}?text=${MSG}`, "_blank", "noopener,noreferrer");
  return (
    <div className="wa-wrap" role="complementary" aria-label="Contato WhatsApp">
      <div className="wa-box">
        <strong>Fale com a Cirandinha</strong>
        <p style={{ margin: "6px 0 0", color: "#4b5563", fontSize: ".95rem" }}>
          Resposta rápida em horário comercial. Clique para abrir o WhatsApp.
        </p>
      </div>
      <button className="wa-open" onClick={open} aria-label="Abrir WhatsApp">
        <Image src="/whatsapp.svg" alt="" width={22} height={22}/>
        Falar no WhatsApp
      </button>
    </div>
  );
}
