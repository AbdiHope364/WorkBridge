import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/applications",
  "/messages",
  "/payments",
];

export function middleware(request: NextRequest) {
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has("workbridge_session");

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("next", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/applications/:path*",
    "/messages/:path*",
    "/payments/:path*",
  ],
};
