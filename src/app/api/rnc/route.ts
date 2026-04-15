import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/route";

export async function GET() {
  const supabase = createSupabaseRouteClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("rnc")
    .select("id,titulo,cliente,gravidade,status,custo,data_abertura,data_encerramento")
    .order("data_abertura", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = createSupabaseRouteClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid_json" }, { status: 400 });

  const titulo = (body as any).titulo;
  const descricao = (body as any).descricao;
  const cliente = (body as any).cliente;
  const gravidade = (body as any).gravidade;
  const area_responsavel_id = (body as any).area_responsavel_id ?? null;
  const responsavel_user_id = (body as any).responsavel_user_id ?? null;

  if (!titulo || !descricao || !cliente || !gravidade) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  // Garante que o usuário existe na tabela `usuarios` antes de criar a RNC.
  // Sem isso, a chave estrangeira created_by rejeita o insert.
  const userEmail = authData.user.email ?? "";
  const userName = authData.user.user_metadata?.name ?? userEmail.split("@")[0];
  await supabase.from("usuarios").upsert(
    { user_id: authData.user.id, nome: userName, email: userEmail },
    { onConflict: "user_id", ignoreDuplicates: true }
  );

  const { data: inserted, error: insertError } = await supabase
    .from("rnc")
    .insert({
      titulo,
      descricao,
      cliente,
      gravidade,
      status: "Aberta",
      area_responsavel_id,
      responsavel_user_id,
      created_by: authData.user.id,
    })
    .select("id,status,data_abertura")
    .single();

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 });

  // Inicia o clock de SLA de resposta inicial.
  await supabase.from("sla_log").insert({ rnc_id: inserted.id, etapa: "RespostaInicial" });

  return NextResponse.json(inserted, { status: 201 });
}
