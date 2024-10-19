import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;

  // If there's no auth token and the user is trying to access /admin
  if (!authToken && request.nextUrl.pathname.startsWith("/admin")) {
    // Don't redirect if they're already on the login page
    if (request.nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // If there is an auth token and the user is trying to access the login page
  if (authToken && request.nextUrl.pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin/login"],
};
