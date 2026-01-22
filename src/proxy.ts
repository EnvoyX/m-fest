import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminRoles } from "@/constants/constants";
import type { Session } from "./server/auth/auth";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fetch the session via HTTP request instead of direct DB import
  // This prevents Prisma from loading in the Edge runtime
  const sessionResponse = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const sessionData = ((await sessionResponse.json()) as Session) || null;
  const session = sessionData?.session ? sessionData : null;

  const protectedPaths = [
    "/dashboard",
    "/dashboard/competitions",
    "/dashboard/team",
    "/dashboard/team/register",
    "/dashboard/documents",
    "/admin",
  ];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
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
