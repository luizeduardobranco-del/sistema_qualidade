# Deploy na Vercel (Sem Instalar Node Local)

Objetivo: subir um ambiente de teste (Preview/Production) usando a build cloud da Vercel.

## Opção A: Importar via GitHub (recomendado)

1. Crie um repositório no GitHub e envie este projeto (upload via web ou Git local em outra maquina).
   - Se for upload via web: `Add file` -> `Upload files` e envie tudo (exceto `.env`).
2. Na Vercel: `Add New...` -> `Project` -> `Import Git Repository`.
3. Framework preset: `Next.js` (a Vercel detecta automaticamente).
4. Configure variáveis de ambiente (Project Settings -> Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy.

Teste:

- Abra `/api/health` e verifique `{"ok":true,"service":"rnc-racp-sla"}`.

## Opção B: Upload Manual (Zip)

1. Faça upload do projeto via interface da Vercel (Deployments / Import).
2. Configure as mesmas variáveis de ambiente.
3. Deploy e valide `/api/health`.

## Observações importantes

- A Vercel vai rodar `npm install` e `npm run build` automaticamente.
- O schema do banco (Supabase) precisa estar aplicado antes das rotas reais (por enquanto as rotas ainda estao placeholder).
