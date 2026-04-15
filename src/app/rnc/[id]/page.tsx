import Link from "next/link";

export default function RncDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">
          <span>RNC #{id}</span>
          <span className="pill">detalhe</span>
        </div>
        <div className="actions">
          <Link className="btn" href="/rnc">
            Voltar
          </Link>
          <button className="btn primary" type="button">
            Gerar PDF
          </button>
        </div>
      </div>

      <div className="grid">
        <section className="card" style={{ gridColumn: "span 8" }}>
          <h2>Resumo (placeholder)</h2>
          <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
            <div className="actions">
              <span className="badge warn">Alta</span>
              <span className="badge">Investigacao</span>
              <span className="badge danger">SLA atrasado</span>
            </div>
            <div className="muted" style={{ lineHeight: 1.55 }}>
              Aqui entra titulo/descricao/cliente/area/responsavel, puxado de `GET /api/rnc/:id`.
            </div>
          </div>
        </section>

        <section className="card" style={{ gridColumn: "span 4" }}>
          <h2>Atalhos</h2>
          <div className="actions" style={{ marginTop: 10 }}>
            <button className="btn" type="button">
              Iniciar triagem
            </button>
            <button className="btn" type="button">
              Concluir investigacao
            </button>
            <button className="btn" type="button">
              Encerrar
            </button>
          </div>
          <div className="muted" style={{ marginTop: 10, fontSize: 12, lineHeight: 1.5 }}>
            Esses botoes vao chamar endpoints que controlam transicao de status + `sla_log`.
          </div>
        </section>

        <section className="card" style={{ gridColumn: "span 12" }}>
          <h2>Abas (MVP)</h2>
          <div className="muted" style={{ fontSize: 13, lineHeight: 1.55 }}>
            Investigacao | Acoes (RACP) | Evidencias | SLA | Auditoria
          </div>
        </section>
      </div>
    </div>
  );
}
