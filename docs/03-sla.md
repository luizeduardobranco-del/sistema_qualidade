# SLA (Modelo Operacional)

Etapas alvo (MVP):

- `RespostaInicial`
- `Investigacao`
- `Execucao`
- `Total`

Mecânica:

- Ao criar RNC: inicia SLA de `Total` e de `RespostaInicial`.
- Ao concluir a resposta inicial: encerra `RespostaInicial` e inicia `Investigacao`.
- Ao concluir investigação (definiu causa raiz + plano RACP): encerra `Investigacao` e inicia `Execucao`.
- Ao concluir todas as ações + validação: encerra `Execucao` e encerra `Total` (RNC encerrada).

Registros:

- Cada início/fim de etapa grava uma linha em `sla_log` (`inicio`, `fim`, `status`).
- O atraso é identificado quando `fim` é maior que o prazo previsto (prazo calculado) ou quando a etapa ainda está aberta e `now()` ultrapassa o prazo.

Pendências para parametrização:

- Definir prazos (em horas) por etapa e por gravidade (ou global).

## Politica (inicial)

Valores informados (SLA de `RespostaInicial`: ciencia da ocorrencia + iniciar tratativas):

- Critica: 2 horas
- Alta: 6 horas
- Media: 12 horas
- Baixa: 24 horas

Implementacao no banco:

- Configuracao em `sla_config` (por `gravidade` e `etapa`)
- Calculo de vencimento via funcao `sla_due_at(inicio, gravidade, etapa)`
- View `rnc_sla_resposta_inicial_atual` para identificar atrasos do SLA de resposta inicial em aberto
