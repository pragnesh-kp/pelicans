import { NextResponse } from "next/server";

// Quick first check: sends visitors with no login cookie to /admin/login.
// The admin layout then checks with the backend that the cookie is valid.
// (This file was called "middleware.js" in Next.js 15 and older.)
export function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (!token && pathname !== "/admin/login") {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
