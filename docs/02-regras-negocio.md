# Regras de Negócio

1. RNC com gravidade `Alta` ou `Crítica` exige pelo menos 1 ação RACP para encerrar.
2. Não é permitido encerrar RNC sem etapa de validação concluída.
3. SLA vencido deve ser marcado como atraso e ficar visível em dashboard.
4. Ação RACP considerada não eficaz reabre a RNC (volta para `Investigacao` ou `RACP`, conforme decisão de processo).
5. Cada etapa do fluxo deve ter um responsável definido.
6. Evidências são associadas a uma RNC e devem ser rastreáveis.

Observação:

- No MVP, a política de SLA pode ser única (global) e evoluir para variar por cliente/gravidade.
- A política inicial de SLA Total por gravidade está documentada em `docs/03-sla.md`.
