import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "analytics_campaign";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set(COOKIE_NAME, code, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });
  return response;
}
