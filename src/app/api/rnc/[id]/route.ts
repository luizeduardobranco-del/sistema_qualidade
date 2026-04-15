import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/route";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseRouteClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const rncId = Number(params.id);
  if (!Number.isFinite(rncId)) return NextResponse.json({ error: "invalid_id" }, { status: 400 });

  const { data: rnc, error: rncError } = await supabase.from("rnc").select("*").eq("id", rncId).single();
  if (rncError) return NextResponse.json({ error: rncError.message }, { status: 404 });

  const [{ data: investigacao }, { data: acoes }, { data: evidencias }, { data: slaLogs }] = await Promise.all([
    supabase.from("rnc_investigacao").select("*").eq("rnc_id", rncId).maybeSingle(),
    supabase.from("racp").select("*").eq("rnc_id", rncId).order("prazo", { ascending: true }),
    supabase.from("evidencias").select("*").eq("rnc_id", rncId).order("created_at", { ascending: false }),
    supabase.from("sla_log").select("*").eq("rnc_id", rncId).order("inicio", { ascending: true })
  ]);

  return NextResponse.json({ rnc, investigacao, acoes: acoes ?? [], evidencias: evidencias ?? [], sla: slaLogs ?? [] });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseRouteClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const rncId = Number(params.id);
  if (!Number.isFinite(rncId)) return NextResponse.json({ error: "invalid_id" }, { status: 400 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid_json" }, { status: 400 });

  const patch: Record<string, any> = {};
  for (const key of ["titulo", "descricao", "cliente", "gravidade", "status", "area_responsavel_id", "responsavel_user_id"]) {
    if ((body as any)[key] !== undefined) patch[key] = (body as any)[key];
  }

  const { data, error } = await supabase.from("rnc").update(patch).eq("id", rncId).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ rnc: data });
}
