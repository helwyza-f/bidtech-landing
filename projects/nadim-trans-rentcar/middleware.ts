import { NextResponse, type NextRequest } from "next/server";
import { LANGUAGE_PREFERENCE_KEY } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lewati file statis, aset Next, gambar, favicon, dsb.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Jika sudah berada di rute bahasa spesifik, jangan alihkan
  if (
    pathname.startsWith("/en-sg") ||
    pathname.startsWith("/ms") ||
    pathname.startsWith("/en")
  ) {
    return NextResponse.next();
  }

  // 1. Cek preferensi cookie manual yang pernah disimpan pengguna
  const storedLocale = request.cookies.get(LANGUAGE_PREFERENCE_KEY)?.value;
  if (storedLocale) {
    if (storedLocale === "en-sg" || storedLocale === "ms" || storedLocale === "en") {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/" ? `/${storedLocale}` : `/${storedLocale}${pathname}`;
      return NextResponse.redirect(url);
    }
    // Jika preference 'id', tetap berada di rute default (tanpa prefix)
    return NextResponse.next();
  }

  // 2. Cek Header Geo-IP Server (didukung otomatis oleh Vercel, Cloudflare, dsb.)
  const country = (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.geo?.country ||
    ""
  ).toUpperCase();

  if (country === "SG") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en-sg" : `/en-sg${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(LANGUAGE_PREFERENCE_KEY, "en-sg", {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  if (country === "MY") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/ms" : `/ms${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(LANGUAGE_PREFERENCE_KEY, "ms", {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // 3. Cek Header Accept-Language browser
  const acceptLang = (request.headers.get("accept-language") || "").toLowerCase();
  if (acceptLang.includes("en-sg") || (acceptLang.includes("sg") && !acceptLang.includes("id"))) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en-sg" : `/en-sg${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(LANGUAGE_PREFERENCE_KEY, "en-sg", {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  if (
    acceptLang.startsWith("ms") ||
    acceptLang.includes("ms-my") ||
    acceptLang.includes("en-my") ||
    acceptLang.includes("-my")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/ms" : `/ms${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(LANGUAGE_PREFERENCE_KEY, "ms", {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
