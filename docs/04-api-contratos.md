# Contratos de API (Proposta MVP)

Observação: endpoints sugeridos para API Routes (Next.js). Contratos definitivos podem evoluir.

## RNC

- `GET /api/rnc`: lista com filtros (status, gravidade, area, cliente, periodo)
- `POST /api/rnc`: cria RNC (inicia SLA)
- `GET /api/rnc/:id`: detalhe completo (inclui investigação, ações, SLA, evidências)
- `PATCH /api/rnc/:id`: atualiza campos básicos e status (com validações de regra)
- `POST /api/rnc/:id/encerrar`: encerra (validação obrigatória)

## Investigação

- `POST /api/rnc/:id/investigacao`: cria/atualiza investigação (causa, método, classificação)

## RACP

- `GET /api/rnc/:id/racp`: lista ações
- `POST /api/rnc/:id/racp`: cria ação
- `PATCH /api/racp/:id`: atualiza status/prazo/responsável/custo

## Evidências

- `POST /api/rnc/:id/evidencias`: cria upload (presigned) + registra metadata
- `DELETE /api/evidencias/:id`: remove registro (e opcionalmente arquivo)

## PDF

- `GET /api/rnc/:id/relatorio`: gera PDF de relatório (server-side)

## Dashboard

- `GET /api/dashboard/kpis`: KPIs com filtros (area/cliente/gravidade/periodo)
- `GET /api/dashboard/series`: séries temporais (abertas/fechadas, SLA, custos)
