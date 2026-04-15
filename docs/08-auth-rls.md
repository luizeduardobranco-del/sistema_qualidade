# Auth + RLS (MVP)

Estrategia recomendada:

- Exigir login (Supabase Auth) desde o MVP.
- Usar `anon key` no app e aplicar permissoes via RLS no banco.
- Reservar `service_role` apenas para rotas/admin jobs confiaveis (server-side).

Implementacao neste repo:

- Middleware de protecao: `src/middleware.ts`
  - Publico: `/`, `/login`, `/api/health`
  - Protegido: demais rotas e APIs
- Login UI: `src/app/login/page.tsx`
- Clientes Supabase:
  - Browser: `src/lib/supabase/browser.ts`
  - Route handlers: `src/lib/supabase/route.ts`

Banco:

- RLS habilitado e politicas MVP em `supabase/migrations/0004_rls_policies.sql`

Nota:

- As politicas atuais sao permissivas (authenticated pode ler/escrever). O refinamento por area/role vem na fase seguinte.

