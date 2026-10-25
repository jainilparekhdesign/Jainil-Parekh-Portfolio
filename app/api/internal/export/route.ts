import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized } from "@/lib/internal-auth";
import { getAllEvents, type RawEvent } from "@/lib/analytics-db";

const COLUMNS: (keyof RawEvent)[] = [
  "event_type",
  "path",
  "referrer",
  "session_id",
  "country",
  "city",
  "duration_ms",
  "campaign",
  "device_type",
  "created_at",
];

function csvEscape(value: string | number | null) {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await getAllEvents();
  const lines = [COLUMNS.join(",")];
  for (const event of events) {
    lines.push(COLUMNS.map((col) => csvEscape(event[col])).join(","));
  }
  const csv = lines.join("\n");
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="analytics-export-${date}.csv"`,
    },
  });
}
