import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  });

  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  const isAdmin = token?.role === "Admin";

  const protectedRoutes = [
    "/dashboard/bloodBanks",
    "/dashboard/addEvents",
    "/dashboard/viewAllBloodBank",
  ];

  if (!isAdmin && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/unauthorized`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/donor",
    "/bloodBanks",
    "/todaysBloodRequest",
  ],
};
