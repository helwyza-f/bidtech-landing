import { NextResponse, type NextRequest } from "next/server";
import { LANGUAGE_PREFERENCE_KEY, LOCALES, type Locale } from "@/lib/i18n";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const localeParam = (searchParams.get("locale") || "").toLowerCase() as Locale;
  const redirectTarget = searchParams.get("redirect");

  // Validasi locale agar selalu valid
  const targetLocale = (LOCALES as readonly string[]).includes(localeParam)
    ? localeParam
    : "id";

  // Ambil host dan protocol publik (dukung reverse proxy Nginx / Vercel / Cloudflare)
  const forwardedHost =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.host;
  const forwardedProto =
    request.headers.get("x-forwarded-proto") ||
    (request.url.startsWith("https") ? "https" : request.nextUrl.protocol.replace(":", ""));
  const isHttps = forwardedProto === "https" || process.env.NODE_ENV === "production";

  // Jika dipanggil dari client via background fetch (tanpa param redirect)
  if (!redirectTarget) {
    const jsonResponse = NextResponse.json({ success: true, locale: targetLocale });
    jsonResponse.cookies.set(LANGUAGE_PREFERENCE_KEY, targetLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: isHttps,
    });
    return jsonResponse;
  }

  // Jika dipanggil dengan redirect target, buat URL publik yang valid (bukan internal 127.0.0.1:3040)
  const safeRedirect = redirectTarget.startsWith("/") ? redirectTarget : "/";
  const publicBase = `${forwardedProto}://${forwardedHost}`;
  const redirectUrl = new URL(safeRedirect, publicBase);

  const response = NextResponse.redirect(redirectUrl);

  // Simpan preferensi bahasa ke HTTP cookie di level server
  response.cookies.set(LANGUAGE_PREFERENCE_KEY, targetLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: isHttps,
  });

  return response;
}
