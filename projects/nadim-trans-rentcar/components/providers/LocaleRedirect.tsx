"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLocalizedPath, LANGUAGE_PREFERENCE_KEY, type Locale } from "@/lib/i18n";

interface LocaleRedirectProps {
  locale: Locale;
  detectBrowserLocale?: boolean;
}

export default function LocaleRedirect({ locale, detectBrowserLocale = false }: LocaleRedirectProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    try {
      const storedLocale = window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
      if (storedLocale === "id" || storedLocale === "en") {
        if (storedLocale !== locale) {
          router.replace(getLocalizedPath(storedLocale, pathname));
        }
        return;
      }

      if (!detectBrowserLocale) return;

      const browserLocale = navigator.language.toLowerCase();
      if (browserLocale.startsWith("id")) return;

      router.replace(getLocalizedPath("en", pathname));
    } catch {
      // If storage or locale data is unavailable, safely keep the Indonesian default.
    }
  }, [detectBrowserLocale, locale, pathname, router]);

  return null;
}
