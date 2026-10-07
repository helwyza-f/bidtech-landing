"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  detectVisitorLocale,
  getLocalizedPath,
  LANGUAGE_PREFERENCE_KEY,
  LOCALES,
  type Locale,
} from "@/lib/i18n";

interface LocaleRedirectProps {
  locale: Locale;
  detectBrowserLocale?: boolean;
}

export default function LocaleRedirect({ locale, detectBrowserLocale = false }: LocaleRedirectProps) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
      const secureFlag = isHttps ? "; Secure" : "";

      // 1. Jika pengguna saat ini sedang berada di rute bahasa spesifik (misal /en, /en-sg, /ms),
      // maka rute tersebut adalah kehendak aktif pengguna. Sinkronkan preferensi lokal ke bahasa ini
      // dan JANGAN PERNAH dialihkan ke rute lain.
      if (locale !== "id" || pathname.startsWith("/en") || pathname.startsWith("/ms")) {
        window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, locale);
        document.cookie = `${LANGUAGE_PREFERENCE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
        return;
      }

      // 2. Jika berada di rute default (ID / tanpa prefix), cek apakah pengguna punya preferensi manual tersimpan
      const getCookieLocale = (): Locale | null => {
        if (typeof document === "undefined") return null;
        const match = document.cookie.match(new RegExp(`(?:^|; )${LANGUAGE_PREFERENCE_KEY}=([^;]*)`));
        const val = match ? decodeURIComponent(match[1]).trim().replace(/^["']|["']$/g, "").toLowerCase() : null;
        return (LOCALES as readonly string[]).includes(val as Locale) ? (val as Locale) : null;
      };

      const storedLocale =
        ((window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY) as Locale | null)?.toLowerCase() as Locale | null) ||
        getCookieLocale();

      // Jika pengguna pernah memilih bahasa selain ID, arahkan ke rute bahasa tersebut
      if (storedLocale && storedLocale !== "id" && (LOCALES as readonly string[]).includes(storedLocale)) {
        window.location.assign(getLocalizedPath(storedLocale, pathname));
        return;
      }

      // 3. Jika pengguna belum pernah memilih bahasa manual dan auto-detection diaktifkan (hanya pada root /)
      if (!detectBrowserLocale || storedLocale === "id") return;

      // Deteksi Instan (Timezone Sistem & Preferensi Bahasa Browser)
      const detectedLocale = detectVisitorLocale();
      if (detectedLocale !== "id") {
        window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, detectedLocale);
        document.cookie = `${LANGUAGE_PREFERENCE_KEY}=${detectedLocale}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
        window.location.assign(getLocalizedPath(detectedLocale, pathname));
        return;
      }

      // 4. Fallback Geo-IP Asynchronous (jika turis SG/MY dengan device non-lokal)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      fetch("https://api.country.is", { signal: controller.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          clearTimeout(timeoutId);
          if (!data || !data.country) return;
          const country = String(data.country).toUpperCase();

          let geoLocale: Locale | null = null;
          if (country === "SG") geoLocale = "en-sg";
          else if (country === "MY") geoLocale = "ms";

          if (geoLocale) {
            window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, geoLocale);
            document.cookie = `${LANGUAGE_PREFERENCE_KEY}=${geoLocale}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
            window.location.assign(getLocalizedPath(geoLocale, pathname));
          }
        })
        .catch(() => {
          // Gagal atau timeout; abaikan dengan aman
        });

      return () => clearTimeout(timeoutId);
    } catch {
      // Abaikan jika browser storage tidak tersedia
    }
  }, [detectBrowserLocale, locale, pathname]);

  return null;
}
