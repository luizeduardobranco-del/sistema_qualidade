// Componente de SERVIDOR — aqui o export dynamic é respeitado pelo Next.js.
// O formulário (cliente) é carregado via next/dynamic com ssr:false,
// o que impede qualquer tentativa de pré-renderização do código client-side.
import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const LoginClient = dynamic(() => import("./LoginClient"), { ssr: false });

export default function LoginPage() {
  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">
          <span>Acesso</span>
          <span className="pill">Supabase Auth</span>
        </div>
      </div>

      <LoginClient />
    </div>
  );
}
