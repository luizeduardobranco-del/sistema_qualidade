import { createClient } from "@supabase/supabase-js";

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  // Durante o build/prerender as variáveis podem não estar disponíveis.
  // O cliente é criado mesmo assim; o erro só aparecerá em runtime se
  // as variáveis realmente estiverem ausentes no servidor de produção.
  return createClient(url || "https://placeholder.supabase.co", anonKey || "placeholder");
}

