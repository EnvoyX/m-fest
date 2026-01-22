import { auth } from "@/server/auth/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminRoles } from "@/constants/constants";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const protectedPaths = ["/dashboard", "/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    pathname === "/admin" &&
    session &&
    !adminRoles.includes(session.user.role as string)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/admin/:path*"],
};
