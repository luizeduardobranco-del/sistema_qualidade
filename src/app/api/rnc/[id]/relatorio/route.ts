import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  // TODO: generate PDF (HTML -> PDF). For now returns JSON placeholder.
  return NextResponse.json({ rnc_id: Number(params.id), pdf: "not_implemented" });
}

