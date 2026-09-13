import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "internal_session";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/internal/login") {
    return NextResponse.next();
  }

  const expected = process.env.INTERNAL_DASHBOARD_TOKEN;
  const session = request.cookies.get(COOKIE_NAME)?.value;

  if (!expected || session !== expected) {
    const loginUrl = new URL("/internal/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/internal/:path*"],
};
