# Escopo do MVP (Fase 1)

Inclui:

- CRUD de RNC (criar/listar/detalhar/atualizar) com evidências
- Investigação (causa raiz + método)
- RACP (várias ações por RNC, com prazo/status/custo)
- SLA básico (registrar tempo por etapa, identificar atraso, % cumprimento)
- Dashboard simples (KPIs essenciais + filtros básicos)
- Relatório PDF (RNC + investigação + ações + evidências)

Fora do MVP (Fases 2/3):

- Alertas automáticos (email/WhatsApp) e filas de notificação
- Dashboard avançado (filtros SaaS complexos, tempo real refinado)
- Multiempresa (SaaS/tenancy)
- Portal do cliente e app mobile

Definições de pronto (MVP):

- Toda RNC tem um status coerente com o fluxo.
- Toda etapa inicia/finaliza com registro no `sla_log`.
- Não é possível encerrar sem validação.
- Gravidade Alta/Crítica exige pelo menos 1 ação RACP.

