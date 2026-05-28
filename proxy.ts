import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;

  // Logged in user should not access auth pages
  if (
    token?.hasAccount &&
    (pathname === "/" || pathname.startsWith("/auth"))
  ) {
    return NextResponse.redirect(
      new URL("/dashboard/videos", req.url)
    );
  }

  // Unauthenticated user cannot access dashboard
  if (!token?.hasAccount && 
    (pathname.startsWith("/dashboard") || pathname.startsWith("/account"))) {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/dashboard/:path*",
    "/account"
  ],
};