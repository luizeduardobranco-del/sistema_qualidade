# Sistema RNC + RACP + SLA + Dashboard

Este repositório contém a base do produto descrito no PRD: registro de Não Conformidades (RNC), ações corretivas/preventivas (RACP), controle de SLA por etapas, dashboard executivo e geração de relatório em PDF.

## Stack (alvo)

- Frontend: Next.js (App Router)
- Backend: API Routes (Next.js)
- Banco: PostgreSQL (Supabase)
- Storage: Supabase Storage (evidências)
- PDF: HTML -> PDF (server-side)
- Deploy: Vercel

## Estrutura do repositório

- `docs/`: especificações operacionais do MVP (fluxo, SLA, API, dashboard, PDF)
- `supabase/migrations/`: SQL de criação do schema inicial

## Primeiros passos (local)

1. Crie um projeto no Supabase e copie as credenciais.
2. Aplique a migration SQL do diretório `supabase/migrations/` no seu banco do Supabase (via SQL Editor).
3. (Quando for iniciar o frontend) instale Node.js LTS e rode o app Next.js (ainda não scaffoldado neste workspace por falta de `node/npm` no ambiente atual).

## Deploy (Vercel)

Sem instalar Node local, você pode usar a build cloud da Vercel. Passo a passo em `docs/07-deploy-vercel.md`.

## Auth + RLS

O MVP recomendado exige login e usa RLS no Supabase: `docs/08-auth-rls.md`.

## Próximo passo recomendado

Se você me confirmar:

- Política de SLA (horas por etapa e por gravidade) e se varia por cliente.
- Se terá multiempresa já no MVP (mesmo que “1 tenant”).

eu fecho o schema com `sla_config` + cálculos de prazo e já deixo a API do MVP desenhada com endpoints e validações.
