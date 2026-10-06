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

  // 0. Cek parameter override ?lang= jika ada
  const langQuery = request.nextUrl.searchParams.get("lang")?.toLowerCase();
  if (langQuery === "id" || langQuery === "en-sg" || langQuery === "ms" || langQuery === "en") {
    const url = request.nextUrl.clone();
    url.searchParams.delete("lang");
    if (langQuery === "id") {
      url.pathname = pathname.replace(/^\/(en-sg|ms|en)(\/|$)/, "/") || "/";
    } else {
      const cleanPath = pathname.replace(/^\/(en-sg|ms|en)(\/|$)/, "/") || "/";
      url.pathname = cleanPath === "/" ? `/${langQuery}` : `/${langQuery}${cleanPath}`;
    }
    const response = NextResponse.redirect(url);
    response.cookies.set(LANGUAGE_PREFERENCE_KEY, langQuery, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production" || request.nextUrl.protocol === "https:",
    });
    return response;
  }

  // 1. Cek preferensi cookie manual yang pernah disimpan pengguna
  const rawCookie = request.cookies.get(LANGUAGE_PREFERENCE_KEY)?.value;
  const storedLocale = rawCookie?.trim().replace(/^["']|["']$/g, "").toLowerCase();

  if (storedLocale) {
    if (storedLocale === "id") {
      // Jika pengguna memilih ID tapi membuka URL ber-prefix (misal /en-sg), arahkan ke rute ID
      if (
        pathname.startsWith("/en-sg") ||
        pathname.startsWith("/ms") ||
        pathname.startsWith("/en")
      ) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.replace(/^\/(en-sg|ms|en)(\/|$)/, "/") || "/";
        return NextResponse.redirect(url);
      }
      // Jika sudah di rute default (ID), izinkan langsung dan JANGAN PERNAH dialihkan ke SG/MY
      return NextResponse.next();
    }

    if (storedLocale === "en-sg" || storedLocale === "ms" || storedLocale === "en") {
      // Jika pengguna memilih bahasa asing tapi membuka rute non-prefix, alihkan ke bahasa pilihannya
      if (
        !pathname.startsWith("/en-sg") &&
        !pathname.startsWith("/ms") &&
        !pathname.startsWith("/en")
      ) {
        const url = request.nextUrl.clone();
        url.pathname = pathname === "/" ? `/${storedLocale}` : `/${storedLocale}${pathname}`;
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
  }

  // Jika sudah berada di rute bahasa spesifik, jangan lakukan auto-deteksi
  if (
    pathname.startsWith("/en-sg") ||
    pathname.startsWith("/ms") ||
    pathname.startsWith("/en")
  ) {
    return NextResponse.next();
  }

  // 2. Jika belum ada preferensi, auto-deteksi HANYA pada halaman utama (root /)
  if (pathname === "/") {
    const isHttps = process.env.NODE_ENV === "production" || request.nextUrl.protocol === "https:";
    const country = (
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      request.geo?.country ||
      ""
    ).toUpperCase();

    if (country === "SG") {
      const url = request.nextUrl.clone();
      url.pathname = "/en-sg";
      const response = NextResponse.redirect(url);
      response.cookies.set(LANGUAGE_PREFERENCE_KEY, "en-sg", {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
        secure: isHttps,
      });
      return response;
    }

    if (country === "MY") {
      const url = request.nextUrl.clone();
      url.pathname = "/ms";
      const response = NextResponse.redirect(url);
      response.cookies.set(LANGUAGE_PREFERENCE_KEY, "ms", {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
        secure: isHttps,
      });
      return response;
    }

    // 3. Cek Header Accept-Language browser (hanya jika negara bukan ID)
    if (country !== "ID") {
      const acceptLang = (request.headers.get("accept-language") || "").toLowerCase();
      if (acceptLang.includes("en-sg") || (acceptLang.includes("sg") && !acceptLang.includes("id"))) {
        const url = request.nextUrl.clone();
        url.pathname = "/en-sg";
        const response = NextResponse.redirect(url);
        response.cookies.set(LANGUAGE_PREFERENCE_KEY, "en-sg", {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
          sameSite: "lax",
          secure: isHttps,
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
        url.pathname = "/ms";
        const response = NextResponse.redirect(url);
        response.cookies.set(LANGUAGE_PREFERENCE_KEY, "ms", {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
          sameSite: "lax",
          secure: isHttps,
        });
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
