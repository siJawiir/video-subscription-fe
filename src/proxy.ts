import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const authPaths = ["/login", "/register"];
const publicPaths = ["/categories", "/videos", "/tags"];
const protectedPaths = ["/orders", "/video-access", "/cart"];
const adminPrefix = "/admin";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (authPaths.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(
        new URL(token.role === 0 ? "/admin" : "/", request.url)
      );
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    if (token?.role === 0) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!token || token.role !== 1) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const isAdminRoute = pathname.startsWith(adminPrefix);

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (token.role !== 0) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (token?.role === 0) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
