import { NextRequest, NextResponse } from "next/server";

export const locales = ["fr", "ar", "en"] as const;
export const defaultLocale = "fr";
export const defaultCity = "casablanca";

const reservedSegments = ["login", "dashboard", "api"];

function getLocaleFromPath(pathname: string) {
  const seg = pathname.split("/")[1];
  return locales.includes(seg as (typeof locales)[number]) ? seg : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  const locale = getLocaleFromPath(pathname);

  if (!locale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/${defaultCity}${pathname}`;
    return NextResponse.redirect(url);
  }

  const rest = pathname.slice(`/${locale}`.length);
  const nextSegment = rest.split("/")[1];

  if (reservedSegments.includes(nextSegment)) {
    return NextResponse.next();
  }

  // Any non-empty segment here is treated as an attempted city slug and
  // passed through — middleware doesn't validate it against the database
  // (no DB access in Edge middleware without extra setup). If it's not a
  // real city, `requireCity()` in the page itself calls notFound() and
  // renders a normal 404. This means old pre-restructure links like
  // "/fr/properties" now 404 cleanly instead of auto-redirecting like
  // they did when "casablanca" was the only recognized slug — an
  // acceptable tradeoff since nothing is deployed/indexed yet.
  if (nextSegment) {
    return NextResponse.next();
  }

  // Bare locale only ("/fr") — inject the default city.
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}/${defaultCity}${rest}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
