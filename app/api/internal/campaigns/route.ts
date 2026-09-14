import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized } from "@/lib/internal-auth";
import { upsertCampaign } from "@/lib/analytics-db";

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
    | { companyName?: string }
    | null;

  const companyName = body?.companyName?.trim();
  const slug = companyName ? slugify(companyName) : "";

  if (!companyName || !slug) {
    return NextResponse.json({ error: "Invalid company name" }, { status: 400 });
  }

  const campaign = await upsertCampaign(slug, companyName);
  return NextResponse.json({ campaign });
}
