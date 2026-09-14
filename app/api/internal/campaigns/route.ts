import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized } from "@/lib/internal-auth";
import { upsertCampaign } from "@/lib/analytics-db";

const CODE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateCode(length = 7) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { companyName?: string }
    | null;

  const companyName = body?.companyName?.trim();

  if (!companyName) {
    return NextResponse.json({ error: "Invalid company name" }, { status: 400 });
  }

  const campaign = await upsertCampaign(generateCode(), companyName);
  return NextResponse.json({ campaign });
}
