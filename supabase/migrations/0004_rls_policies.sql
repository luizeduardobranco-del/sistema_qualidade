-- Enable Row Level Security (RLS) and apply MVP policies.
-- Strategy (MVP):
-- - Require authentication for app routes.
-- - Allow authenticated users to read/write operational tables.
-- Tighten per-role/per-area policies later.

alter table areas enable row level security;
alter table funcoes enable row level security;
alter table usuarios enable row level security;
alter table rnc enable row level security;
alter table rnc_investigacao enable row level security;
alter table racp enable row level security;
alter table sla_log enable row level security;
alter table evidencias enable row level security;
alter table audit_log enable row level security;
alter table sla_config enable row level security;

-- Catalog tables: authenticated can read
drop policy if exists "areas_read_auth" on areas;
create policy "areas_read_auth" on areas for select to authenticated using (true);

drop policy if exists "funcoes_read_auth" on funcoes;
create policy "funcoes_read_auth" on funcoes for select to authenticated using (true);

drop policy if exists "usuarios_rw_auth" on usuarios;
create policy "usuarios_rw_auth" on usuarios for select to authenticated using (true);
create policy "usuarios_insert_auth" on usuarios for insert to authenticated with check (true);
create policy "usuarios_update_auth" on usuarios for update to authenticated using (true) with check (true);

-- Operational tables: authenticated can read/write (MVP)
drop policy if exists "rnc_rw_auth" on rnc;
create policy "rnc_select_auth" on rnc for select to authenticated using (true);
create policy "rnc_insert_auth" on rnc for insert to authenticated with check (true);
create policy "rnc_update_auth" on rnc for update to authenticated using (true) with check (true);

drop policy if exists "investigacao_rw_auth" on rnc_investigacao;
create policy "investigacao_select_auth" on rnc_investigacao for select to authenticated using (true);
create policy "investigacao_insert_auth" on rnc_investigacao for insert to authenticated with check (true);
create policy "investigacao_update_auth" on rnc_investigacao for update to authenticated using (true) with check (true);

drop policy if exists "racp_rw_auth" on racp;
create policy "racp_select_auth" on racp for select to authenticated using (true);
create policy "racp_insert_auth" on racp for insert to authenticated with check (true);
create policy "racp_update_auth" on racp for update to authenticated using (true) with check (true);

drop policy if exists "sla_log_rw_auth" on sla_log;
create policy "sla_log_select_auth" on sla_log for select to authenticated using (true);
create policy "sla_log_insert_auth" on sla_log for insert to authenticated with check (true);
create policy "sla_log_update_auth" on sla_log for update to authenticated using (true) with check (true);

drop policy if exists "evidencias_rw_auth" on evidencias;
create policy "evidencias_select_auth" on evidencias for select to authenticated using (true);
create policy "evidencias_insert_auth" on evidencias for insert to authenticated with check (true);
create policy "evidencias_delete_auth" on evidencias for delete to authenticated using (true);

drop policy if exists "audit_read_auth" on audit_log;
create policy "audit_read_auth" on audit_log for select to authenticated using (true);
create policy "audit_insert_auth" on audit_log for insert to authenticated with check (true);

drop policy if exists "sla_config_read_auth" on sla_config;
create policy "sla_config_read_auth" on sla_config for select to authenticated using (true);

