import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized } from "@/lib/internal-auth";
import { deleteCampaign } from "@/lib/analytics-db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  await deleteCampaign(slug);
  return NextResponse.json({ ok: true });
}
