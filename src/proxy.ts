import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminRoles } from "@/constants/constants";
import { auth } from "@/server/auth/auth";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const protectedPaths = ["/dashboard", "/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", encodeURI(pathname));
    const response = NextResponse.redirect(loginUrl);
    response.headers.set("x-middleware-next", "1");
    return response;
  }

  if (
    pathname === "/admin" &&
    session &&
    !adminRoles.includes(session.user.role as string)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
