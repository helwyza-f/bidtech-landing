import { NextResponse, type NextRequest } from "next/server";
import { LANGUAGE_PREFERENCE_KEY, LOCALES, type Locale } from "@/lib/i18n";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const localeParam = (searchParams.get("locale") || "").toLowerCase() as Locale;
  const redirectTarget = searchParams.get("redirect") || "/";

  // Validasi locale agar selalu valid
  const targetLocale = (LOCALES as readonly string[]).includes(localeParam)
    ? localeParam
    : "id";

  // Pastikan target redirect aman (hanya path internal)
  const safeRedirect = redirectTarget.startsWith("/") ? redirectTarget : "/";

  const response = NextResponse.redirect(new URL(safeRedirect, request.url));

  // Simpan preferensi bahasa ke HTTP cookie di level server
  response.cookies.set(LANGUAGE_PREFERENCE_KEY, targetLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 tahun
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" || request.nextUrl.protocol === "https:",
  });

  return response;
}
