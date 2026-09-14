import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized } from "@/lib/internal-auth";
import { createCampaign } from "@/lib/analytics-db";

const CODE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateCode(length = 7) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { companyName?: string; customCode?: string }
    | null;

  const companyName = body?.companyName?.trim();
  const customCode = body?.customCode?.trim();

  if (!companyName) {
    return NextResponse.json({ error: "Invalid company name" }, { status: 400 });
  }

  if (customCode) {
    const slug = slugify(customCode);
    if (!slug) {
      return NextResponse.json({ error: "Invalid link text" }, { status: 400 });
    }
    const campaign = await createCampaign(slug, companyName);
    if (!campaign) {
      return NextResponse.json(
        { error: "That link text is already taken — try another." },
        { status: 409 },
      );
    }
    return NextResponse.json({ campaign });
  }

  for (let attempt = 0; attempt < 5; attempt++) {
    const campaign = await createCampaign(generateCode(), companyName);
    if (campaign) return NextResponse.json({ campaign });
  }
  return NextResponse.json({ error: "Couldn't generate a link, try again." }, { status: 500 });
}
