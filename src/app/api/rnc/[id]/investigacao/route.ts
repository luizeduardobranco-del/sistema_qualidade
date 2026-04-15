import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/route";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseRouteClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid_json" }, { status: 400 });

  const rncId = Number(params.id);
  if (!Number.isFinite(rncId)) return NextResponse.json({ error: "invalid_id" }, { status: 400 });

  const payload = {
    rnc_id: rncId,
    causa_raiz: (body as any).causa_raiz ?? null,
    metodo: (body as any).metodo ?? null,
    classificacao_causa: (body as any).classificacao_causa ?? null
  };

  const { data, error } = await supabase.from("rnc_investigacao").upsert(payload, { onConflict: "rnc_id" }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ investigacao: data });
}
