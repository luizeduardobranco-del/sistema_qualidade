import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/route";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseRouteClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid_json" }, { status: 400 });

  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "invalid_id" }, { status: 400 });

  const patch: Record<string, any> = {};
  for (const key of ["tipo", "descricao", "prazo", "status", "responsavel_user_id", "custo"]) {
    if ((body as any)[key] !== undefined) patch[key] = (body as any)[key];
  }

  const { data, error } = await supabase.from("racp").update(patch).eq("id", id).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ acao: data });
}
