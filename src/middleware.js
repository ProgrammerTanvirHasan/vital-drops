import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = cookies(request).get("next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
