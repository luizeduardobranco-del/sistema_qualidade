# Chaves do Projeto

Projeto Supabase:

- URL do projeto (dashboard): https://supabase.com/dashboard/project/sxtddfoufkbqutsyuisl

## Vercel (Environment Variables)

Preencher na Vercel -> Project -> Settings -> Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL`
  - Origem: Supabase -> Settings -> API -> Project URL
  - Formato: `https://<project-ref>.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Origem: Supabase -> Settings -> API -> Project API keys -> `anon public`

## Observacoes de seguranca

- Nao salvar senhas/keys no repositorio.
- Nao usar `service_role` no frontend (nem em variaveis `NEXT_PUBLIC_*`).
- Senha do banco deve ficar apenas no Supabase/Vercel (server-side) ou em um gerenciador de senhas.

