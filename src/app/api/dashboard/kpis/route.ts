import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/route";

export async function GET() {
  const supabase = createSupabaseRouteClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const [{ count: abertas }, { count: fechadas }, { data: custos }, { data: slaAtrasos }] = await Promise.all([
    supabase.from("rnc").select("id", { count: "exact", head: true }).neq("status", "Encerrada"),
    supabase.from("rnc").select("id", { count: "exact", head: true }).eq("status", "Encerrada"),
    supabase.from("rnc").select("custo"),
    supabase.from("rnc_sla_resposta_inicial_atual").select("rnc_id,atrasado")
  ]);

  const custo_total = (custos ?? []).reduce((sum, row: any) => sum + Number(row.custo ?? 0), 0);
  const sla_resposta_inicial_atrasadas = (slaAtrasos ?? []).filter((r: any) => r.atrasado).length;

  return NextResponse.json({
    abertas: abertas ?? 0,
    fechadas: fechadas ?? 0,
    sla_resposta_inicial_atrasadas,
    custo_total
  });
}
