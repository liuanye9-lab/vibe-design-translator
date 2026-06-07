// ============================================================
// Vibe Design Translator - Provider Status API
// ============================================================

import { NextResponse } from "next/server";
import { getProviderStatus } from "@/lib/connectors/provider-registry";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getProviderStatus());
}
