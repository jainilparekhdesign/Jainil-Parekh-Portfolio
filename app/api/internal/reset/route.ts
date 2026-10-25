import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized } from "@/lib/internal-auth";
import { resetEvents } from "@/lib/analytics-db";

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await resetEvents();
  return NextResponse.json({ ok: true });
}
