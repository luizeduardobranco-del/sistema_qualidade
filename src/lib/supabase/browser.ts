import { createBrowserClient } from "@supabase/ssr";

// Usa createBrowserClient do @supabase/ssr para que a sessão
// seja armazenada em COOKIES (e não em localStorage).
// Isso é obrigatório para que o middleware do servidor consiga
// ler a sessão e autenticar o usuário corretamente.
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

  return createBrowserClient(url, anonKey);
}

