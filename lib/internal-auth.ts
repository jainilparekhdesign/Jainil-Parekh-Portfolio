import type { NextRequest } from "next/server";

const COOKIE_NAME = "internal_session";

export function isAuthorized(request: NextRequest) {
  const expected = process.env.INTERNAL_DASHBOARD_TOKEN;
  const session = request.cookies.get(COOKIE_NAME)?.value;
  return Boolean(expected) && session === expected;
}
