-- SLA policy/config (MVP)
-- This migration introduces configurable SLA hours by (gravidade, etapa).

create table if not exists sla_config (
  id bigint generated always as identity primary key,
  gravidade gravidade_rnc not null,
  etapa etapa_sla not null,
  prazo_horas integer not null check (prazo_horas > 0),
  created_at timestamptz not null default now(),
  unique (gravidade, etapa)
);

-- Seed (assumption at the time of writing):
-- - Provided policy was initially interpreted as SLA TOTAL, but later clarified as "RespostaInicial".
-- - The corrected seed lives in `0003_fix_sla_resposta_inicial.sql`.
insert into sla_config (gravidade, etapa, prazo_horas)
values
  ('Baixa', 'Total', 24),
  ('Media', 'Total', 12),
  ('Alta', 'Total', 12),
  ('Critica', 'Total', 2)
on conflict (gravidade, etapa) do update set prazo_horas = excluded.prazo_horas;

-- Helper: compute due_at for a given stage, based on config and start time.
create or replace function sla_due_at(p_inicio timestamptz, p_gravidade gravidade_rnc, p_etapa etapa_sla)
returns timestamptz
language sql
stable
as $$
  select p_inicio + make_interval(hours => sc.prazo_horas)
  from sla_config sc
  where sc.gravidade = p_gravidade
    and sc.etapa = p_etapa
  limit 1
$$;

-- Convenience view for current TOTAL SLA status per RNC (open log only).
create or replace view rnc_sla_total_atual as
select
  r.id as rnc_id,
  r.gravidade,
  sl.id as sla_log_id,
  sl.inicio,
  sl.fim,
  sla_due_at(sl.inicio, r.gravidade, 'Total'::etapa_sla) as vencimento,
  case
    when sl.fim is not null and sl.fim > sla_due_at(sl.inicio, r.gravidade, 'Total'::etapa_sla) then true
    when sl.fim is null and now() > sla_due_at(sl.inicio, r.gravidade, 'Total'::etapa_sla) then true
    else false
  end as atrasado
from rnc r
join sla_log sl
  on sl.rnc_id = r.id
 and sl.etapa = 'Total'
where sl.fim is null;
