export const metadata = {
  title: "Centro de Educação Infantil Cirandinha — Aprender Brincando",
  description:
    "CEIC Contagem — acolhimento, diversão e aprendizado. Maternal ao 2º período. Colônia de férias, sábado letivo, leitura, limites de telas e parceria com a família."
};
export const viewport = { themeColor: "#00A0E3" };

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
