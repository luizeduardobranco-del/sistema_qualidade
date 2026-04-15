import "./globals.css";

export const metadata = {
  title: "RNC / RACP / SLA",
  description: "Gestao de nao conformidades com acoes e SLA"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

