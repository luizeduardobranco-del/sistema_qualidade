import Link from "next/link";

function KpiCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="card" style={{ gridColumn: "span 3" }}>
      <h2>{title}</h2>
      <div className="kpi">{value}</div>
      <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
        {hint}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">
          <span>Dashboard</span>
          <span className="pill">placeholder</span>
        </div>
        <div className="actions">
          <Link className="btn" href="/rnc">
            RNC
          </Link>
          <Link className="btn primary" href="/rnc/new">
            Nova RNC
          </Link>
        </div>
      </div>

      <div className="grid">
        <KpiCard title="Abertas" value="—" hint="Total de RNC em aberto" />
        <KpiCard title="Fechadas" value="—" hint="Total no periodo" />
        <KpiCard title="% SLA" value="—" hint="Cumprimento (Total)" />
        <KpiCard title="Custo" value="—" hint="Soma de custos" />

        <section className="card" style={{ gridColumn: "span 12" }}>
          <h2>Proximos passos</h2>
          <div className="muted">
            Conectar `GET /api/dashboard/kpis` e `GET /api/dashboard/series` para alimentar os cards e graficos.
          </div>
        </section>
      </div>
    </div>
  );
}

