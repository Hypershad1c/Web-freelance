import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/fr", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
