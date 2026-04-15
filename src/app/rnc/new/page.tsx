import Link from "next/link";

export default function RncNewPage() {
  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">
          <span>Nova RNC</span>
          <span className="pill">form</span>
        </div>
        <div className="actions">
          <Link className="btn" href="/rnc">
            Voltar
          </Link>
        </div>
      </div>

      <div className="grid">
        <section className="card" style={{ gridColumn: "span 7" }}>
          <h2>Cadastro (placeholder)</h2>
          <div className="field">
            <label>Titulo</label>
            <input placeholder="Ex: Falha na entrega..." />
          </div>
          <div className="field">
            <label>Cliente</label>
            <input placeholder="Nome do cliente" />
          </div>
          <div className="field">
            <label>Gravidade</label>
            <select defaultValue="Media">
              <option value="Baixa">Baixa</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Critica">Critica</option>
            </select>
          </div>
          <div className="field">
            <label>Descricao</label>
            <textarea placeholder="Descreva o ocorrido, impacto, contexto..." />
          </div>
          <div className="actions" style={{ marginTop: 14 }}>
            <button className="btn primary" type="button">
              Criar RNC
            </button>
            <span className="muted" style={{ fontSize: 12 }}>
              No MVP, este botao chamara `POST /api/rnc`.
            </span>
          </div>
        </section>

        <section className="card" style={{ gridColumn: "span 5" }}>
          <h2>Regras rapidas</h2>
          <div className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
            Gravidade Alta/Critica exige RACP para encerrar. O fluxo recomendado eh: Triagem -> Investigacao -> RACP ->
            Execucao -> Validacao -> Encerramento.
          </div>
        </section>
      </div>
    </div>
  );
}

