import { NextResponse, type NextRequest } from "next/server";
import { recordEvent, type EventInput } from "@/lib/analytics-db";

const VALID_TYPES = new Set<EventInput["type"]>([
  "pageview",
  "download_click",
  "duration",
]);

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | {
        type?: string;
        path?: string;
        referrer?: string;
        sessionId?: string;
        durationMs?: number;
      }
    | null;

  if (
    !body ||
    !body.type ||
    !VALID_TYPES.has(body.type as EventInput["type"]) ||
    !body.path ||
    !body.sessionId
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const country = request.headers.get("x-vercel-ip-country");
  const cityRaw = request.headers.get("x-vercel-ip-city");
  const city = cityRaw ? decodeURIComponent(cityRaw) : null;

  await recordEvent({
    type: body.type as EventInput["type"],
    path: body.path,
    referrer: body.referrer,
    sessionId: body.sessionId,
    country,
    city,
    durationMs: body.durationMs,
  });

  return NextResponse.json({ ok: true });
}
