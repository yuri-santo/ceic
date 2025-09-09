import "./globals.css";

export const metadata = {
  title: "Centro de Educação Infantil Cirandinha — Aprender Brincando",
  description:
    "Educação infantil do maternal ao 2º período com acolhimento, rotina segura e trilhas semanais de aprendizado.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
