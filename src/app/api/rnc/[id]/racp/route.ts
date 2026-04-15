import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/route";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseRouteClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const rncId = Number(params.id);
  if (!Number.isFinite(rncId)) return NextResponse.json({ error: "invalid_id" }, { status: 400 });

  const { data, error } = await supabase.from("racp").select("*").eq("rnc_id", rncId).order("prazo", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ rnc_id: rncId, items: data ?? [] });
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseRouteClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid_json" }, { status: 400 });

  const rncId = Number(params.id);
  if (!Number.isFinite(rncId)) return NextResponse.json({ error: "invalid_id" }, { status: 400 });

  const tipo = (body as any).tipo;
  const descricao = (body as any).descricao;
  const prazo = (body as any).prazo;
  const responsavel_user_id = (body as any).responsavel_user_id ?? null;
  const custo = (body as any).custo ?? 0;

  if (!tipo || !descricao || !prazo) return NextResponse.json({ error: "missing_fields" }, { status: 400 });

  const { data, error } = await supabase
    .from("racp")
    .insert({ rnc_id: rncId, tipo, descricao, prazo, responsavel_user_id, custo })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ acao: data }, { status: 201 });
}
