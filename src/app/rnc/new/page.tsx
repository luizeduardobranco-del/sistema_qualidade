"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RncNewPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [cliente, setCliente] = useState("");
  const [gravidade, setGravidade] = useState("Media");
  const [descricao, setDescricao] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!titulo.trim() || !cliente.trim() || !descricao.trim()) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/rnc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, cliente, gravidade, descricao }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erro ao criar RNC");

      router.push(`/rnc/${json.id}`);
    } catch (err: any) {
      setError(err.message ?? "Erro inesperado");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shell">
      <div className="topbar">
        <div className="brand">
          <span>Nova RNC</span>
          <span className="pill">form</span>
        </div>
        <div className="actions">
          <button className="btn" onClick={() => router.back()}>
            Voltar
          </button>
        </div>
      </div>

      <div className="grid">
        <section className="card" style={{ gridColumn: "span 7" }}>
          <h2>Cadastro</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Titulo *</label>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Falha na entrega..."
              />
            </div>
            <div className="field">
              <label>Cliente *</label>
              <input
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Nome do cliente"
              />
            </div>
            <div className="field">
              <label>Gravidade</label>
              <select value={gravidade} onChange={(e) => setGravidade(e.target.value)}>
                <option value="Baixa">Baixa</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Critica">Critica</option>
              </select>
            </div>
            <div className="field">
              <label>Descricao *</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o ocorrido, impacto, contexto..."
              />
            </div>
            {error && (
              <div className="muted" style={{ color: "rgba(255,107,107,0.95)", marginTop: 8 }}>
                {error}
              </div>
            )}
            <div className="actions" style={{ marginTop: 14 }}>
              <button className="btn primary" type="submit" disabled={busy}>
                {busy ? "Salvando..." : "Criar RNC"}
              </button>
            </div>
          </form>
        </section>

        <section className="card" style={{ gridColumn: "span 5" }}>
          <h2>Regras rapidas</h2>
          <div className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
            Gravidade Alta/Critica exige RACP para encerrar. O fluxo recomendado eh: Triagem &rarr; Investigacao &rarr; RACP
            &rarr; Execucao &rarr; Validacao &rarr; Encerramento.
          </div>
        </section>
      </div>
    </div>
  );
}
