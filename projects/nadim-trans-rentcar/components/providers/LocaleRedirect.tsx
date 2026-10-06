"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    try {
      // 1. Cek apakah ada preferensi manual yang pernah dipilih pengguna
      const storedLocale = window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY) as Locale | null;
      if (storedLocale && (LOCALES as readonly string[]).includes(storedLocale)) {
        if (storedLocale !== locale) {
          router.replace(getLocalizedPath(storedLocale, pathname));
        }
        return;
      }

      // 2. Jika tidak diaktifkan auto detection pada layout ini, selesai
      if (!detectBrowserLocale) return;

      // 3. Deteksi Instan (Timezone Sistem & Preferensi Bahasa Browser)
      const detectedLocale = detectVisitorLocale();
      if (detectedLocale !== locale) {
        window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, detectedLocale);
        document.cookie = `${LANGUAGE_PREFERENCE_KEY}=${detectedLocale}; path=/; max-age=31536000; SameSite=Lax`;
        router.replace(getLocalizedPath(detectedLocale, pathname));
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
          else if (country === "ID") geoLocale = "id";

          if (geoLocale && geoLocale !== locale) {
            window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, geoLocale);
            document.cookie = `${LANGUAGE_PREFERENCE_KEY}=${geoLocale}; path=/; max-age=31536000; SameSite=Lax`;
            router.replace(getLocalizedPath(geoLocale, pathname));
          }
        })
        .catch(() => {
          // Gagal atau timeout; abaikan dengan aman
        });

      return () => clearTimeout(timeoutId);
    } catch {
      // Abaikan jika browser storage tidak tersedia
    }
  }, [detectBrowserLocale, locale, pathname, router]);

  return null;
}
