-- Fix: policy provided is for initial response ("RespostaInicial"), not "Total".
-- This migration updates the SLA config seed and swaps the convenience view accordingly.

-- Remove previous TOTAL seed (if it was applied) to avoid confusion in MVP.
delete from sla_config where etapa = 'Total';

-- Upsert RespostaInicial SLA by gravidade (hours)
insert into sla_config (gravidade, etapa, prazo_horas)
values
  ('Baixa', 'RespostaInicial', 24),
  ('Media', 'RespostaInicial', 12),
  ('Alta', 'RespostaInicial', 6),
  ('Critica', 'RespostaInicial', 2)
on conflict (gravidade, etapa) do update set prazo_horas = excluded.prazo_horas;

-- Replace TOTAL convenience view with RespostaInicial convenience view for MVP.
drop view if exists rnc_sla_total_atual;

create or replace view rnc_sla_resposta_inicial_atual as
select
  r.id as rnc_id,
  r.gravidade,
  sl.id as sla_log_id,
  sl.inicio,
  sl.fim,
  sla_due_at(sl.inicio, r.gravidade, 'RespostaInicial'::etapa_sla) as vencimento,
  case
    when sl.fim is not null and sl.fim > sla_due_at(sl.inicio, r.gravidade, 'RespostaInicial'::etapa_sla) then true
    when sl.fim is null and now() > sla_due_at(sl.inicio, r.gravidade, 'RespostaInicial'::etapa_sla) then true
    else false
  end as atrasado
from rnc r
join sla_log sl
  on sl.rnc_id = r.id
 and sl.etapa = 'RespostaInicial'
where sl.fim is null;

