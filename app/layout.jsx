// app/layout.jsx
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Centro de Educação Infantil Cirandinha — Aprender Brincando",
  description:
    "Educação infantil do maternal ao 2º período com acolhimento, rotina segura e trilhas semanais de aprendizado.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* favicon: se existir /public/favicon.ico, este link funciona;
           se preferir, crie /app/icon.png (512x512) que o Next usa automático */}
        <link rel="icon" href="/favicon.ico" />
        {/* IMPORTANT: Script agora dentro do HEAD, não como filho direto de <html> */}
        <Script id="strip-ext-attrs" strategy="beforeInteractive">
          {`
            try{
              const badAttrs = ["data-cip-id","data-new-gr-c-s-check-loaded","data-gr-ext-installed"];
              const all = document.querySelectorAll("*");
              for (const el of all){
                for (const a of badAttrs){
                  if (el.hasAttribute && el.hasAttribute(a)) el.removeAttribute(a);
                }
              }
            }catch(e){}
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
