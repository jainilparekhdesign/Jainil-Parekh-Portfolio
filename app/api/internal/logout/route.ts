import { NextResponse } from "next/server";

const COOKIE_NAME = "internal_session";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}
