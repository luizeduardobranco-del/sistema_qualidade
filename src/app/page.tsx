import Link from "next/link";

export default function HomePage() {
  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">
          <span>RNC</span>
          <span className="pill">MVP scaffold</span>
        </div>
        <div className="actions">
          <Link className="btn" href="/login">
            Login
          </Link>
          <Link className="btn" href="/rnc">
            Lista de RNC
          </Link>
          <Link className="btn primary" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="grid">
        <section className="card" style={{ gridColumn: "span 12" }}>
          <h2>O que tem aqui agora</h2>
          <div className="muted">
            Base de schema Supabase + docs do MVP + telas iniciais. Proximo passo: integrar Supabase Auth e API Routes.
          </div>
        </section>
      </div>
    </div>
  );
}
