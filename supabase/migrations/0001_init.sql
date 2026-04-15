-- MVP schema for RNC + RACP + SLA
-- Assumptions:
-- - Supabase Auth is enabled; `usuarios.user_id` references `auth.users(id)`.
-- - `pgcrypto` provides `gen_random_uuid()` (Supabase typically enables it).

create extension if not exists "pgcrypto";

do $$ begin
  create type gravidade_rnc as enum ('Baixa', 'Media', 'Alta', 'Critica');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type status_rnc as enum ('Aberta', 'Triagem', 'Investigacao', 'RACP', 'Execucao', 'Validacao', 'Encerrada', 'Reaberta');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type tipo_acao_racp as enum ('Corretiva', 'Preventiva');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type status_racp as enum ('Pendente', 'EmAndamento', 'Concluida', 'Cancelada', 'Atrasada', 'NaoEficaz');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type etapa_sla as enum ('RespostaInicial', 'Investigacao', 'Execucao', 'Total');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type status_sla as enum ('EmCurso', 'Concluido', 'Atrasado');
exception when duplicate_object then null;
end $$;

create table if not exists areas (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists funcoes (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists usuarios (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null,
  area_id uuid references areas(id) on delete set null,
  funcao_id uuid references funcoes(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists rnc (
  id bigint generated always as identity primary key,
  titulo text not null,
  descricao text not null,
  cliente text not null,
  gravidade gravidade_rnc not null,
  status status_rnc not null default 'Aberta',
  area_responsavel_id uuid references areas(id) on delete set null,
  responsavel_user_id uuid references usuarios(user_id) on delete set null,
  custo numeric(12,2) not null default 0,
  data_abertura timestamptz not null default now(),
  data_encerramento timestamptz null,
  created_by uuid references usuarios(user_id) on delete set null,
  updated_at timestamptz not null default now()
);

create index if not exists rnc_status_idx on rnc(status);
create index if not exists rnc_cliente_idx on rnc(cliente);
create index if not exists rnc_area_idx on rnc(area_responsavel_id);
create index if not exists rnc_abertura_idx on rnc(data_abertura);

create table if not exists rnc_investigacao (
  id bigint generated always as identity primary key,
  rnc_id bigint not null references rnc(id) on delete cascade,
  causa_raiz text null,
  metodo text null,
  classificacao_causa text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (rnc_id)
);

create table if not exists racp (
  id bigint generated always as identity primary key,
  rnc_id bigint not null references rnc(id) on delete cascade,
  tipo tipo_acao_racp not null,
  descricao text not null,
  responsavel_user_id uuid references usuarios(user_id) on delete set null,
  prazo timestamptz not null,
  status status_racp not null default 'Pendente',
  custo numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists racp_rnc_idx on racp(rnc_id);
create index if not exists racp_status_idx on racp(status);
create index if not exists racp_prazo_idx on racp(prazo);

create table if not exists sla_log (
  id bigint generated always as identity primary key,
  rnc_id bigint not null references rnc(id) on delete cascade,
  etapa etapa_sla not null,
  inicio timestamptz not null default now(),
  fim timestamptz null,
  status status_sla not null default 'EmCurso',
  created_at timestamptz not null default now()
);

create index if not exists sla_log_rnc_idx on sla_log(rnc_id);
create index if not exists sla_log_etapa_idx on sla_log(etapa);

create table if not exists evidencias (
  id bigint generated always as identity primary key,
  rnc_id bigint not null references rnc(id) on delete cascade,
  arquivo_url text not null,
  arquivo_nome text null,
  mime_type text null,
  tamanho_bytes bigint null,
  uploaded_by uuid references usuarios(user_id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists evidencias_rnc_idx on evidencias(rnc_id);

-- Minimal audit trail (optional but useful for MVP)
create table if not exists audit_log (
  id bigint generated always as identity primary key,
  entity text not null,
  entity_id text not null,
  action text not null,
  actor_user_id uuid references usuarios(user_id) on delete set null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_entity_idx on audit_log(entity, entity_id);

-- Updated_at helper
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists rnc_set_updated_at on rnc;
create trigger rnc_set_updated_at
before update on rnc
for each row execute function set_updated_at();

drop trigger if exists racp_set_updated_at on racp;
create trigger racp_set_updated_at
before update on racp
for each row execute function set_updated_at();

drop trigger if exists investigacao_set_updated_at on rnc_investigacao;
create trigger investigacao_set_updated_at
before update on rnc_investigacao
for each row execute function set_updated_at();

