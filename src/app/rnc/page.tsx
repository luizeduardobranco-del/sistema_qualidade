import Link from "next/link";

const mock = [
  { id: 101, titulo: "Falha na entrega", cliente: "Cliente A", gravidade: "Alta", status: "Investigacao", sla: "Atrasado" },
  { id: 102, titulo: "Erro de sistema", cliente: "Cliente B", gravidade: "Media", status: "Triagem", sla: "Em dia" }
];

function SlaBadge({ value }: { value: string }) {
  const cls = value === "Atrasado" ? "badge danger" : "badge ok";
  return <span className={cls}>{value}</span>;
}

export default function RncListPage() {
  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">
          <span>RNC</span>
          <span className="pill">lista</span>
        </div>
        <div className="actions">
          <Link className="btn" href="/dashboard">
            Dashboard
          </Link>
          <Link className="btn primary" href="/rnc/new">
            Nova RNC
          </Link>
        </div>
      </div>

      <div className="grid">
        <section className="card" style={{ gridColumn: "span 12" }}>
          <h2>RNC recentes (mock)</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Cliente</th>
                <th>Gravidade</th>
                <th>Status</th>
                <th>SLA</th>
              </tr>
            </thead>
            <tbody>
              {mock.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link href={`/rnc/${r.id}`}>{r.id}</Link>
                  </td>
                  <td>{r.titulo}</td>
                  <td>{r.cliente}</td>
                  <td>
                    <span className={r.gravidade === "Alta" ? "badge warn" : "badge"}>{r.gravidade}</span>
                  </td>
                  <td>
                    <span className="badge">{r.status}</span>
                  </td>
                  <td>
                    <SlaBadge value={r.sla} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

