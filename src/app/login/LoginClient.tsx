"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

function LoginForm() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      if (mode === "login") {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
      }

      window.location.assign(redirectTo);
    } catch (err: any) {
      setError(err?.message ?? "Falha ao autenticar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid">
      <section className="card" style={{ gridColumn: "span 6" }}>
        <h2>{mode === "login" ? "Entrar" : "Criar conta"}</h2>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
          </div>
          <div className="field">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error ? (
            <div className="muted" style={{ marginTop: 10, color: "rgba(255, 107, 107, 0.95)" }}>
              {error}
            </div>
          ) : null}
          <div className="actions" style={{ marginTop: 14 }}>
            <button className="btn primary" disabled={busy} type="submit">
              {busy ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar"}
            </button>
            <button
              className="btn"
              disabled={busy}
              type="button"
              onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))}
            >
              {mode === "login" ? "Criar conta" : "Já tenho conta"}
            </button>
          </div>
        </form>
      </section>

      <section className="card" style={{ gridColumn: "span 6" }}>
        <h2>Notas</h2>
        <div className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
          Para o MVP com RLS, recomendamos login obrigatório. O acesso é aplicado via middleware em rotas protegidas.
        </div>
      </section>
    </div>
  );
}

export default function LoginClient() {
  return (
    <Suspense fallback={<div className="muted" style={{ padding: 24 }}>Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
