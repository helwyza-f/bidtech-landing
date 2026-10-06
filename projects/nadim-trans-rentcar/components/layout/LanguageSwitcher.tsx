"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedPath, LANGUAGE_PREFERENCE_KEY, type Locale } from "@/lib/i18n";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function LanguageSwitcher({ mobile = false, onNavigate }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("language");

  const handleSelectLocale = (nextLocale: Locale) => {
    try {
      window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, nextLocale);
      const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
      const secureFlag = isHttps ? "; Secure" : "";
      document.cookie = `${LANGUAGE_PREFERENCE_KEY}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
    } catch {
      // Browser storage fallback
    }
    setIsOpen(false);
    onNavigate?.();

    const targetPath = getLocalizedPath(nextLocale, pathname);
    // Gunakan server-side set-locale endpoint agar Set-Cookie header HTTP valid di hosting
    // dan root layout (HTML lang & messages) ter-refresh sempurna
    const targetUrl = `/api/set-locale?locale=${nextLocale}&redirect=${encodeURIComponent(targetPath)}`;
    window.location.href = targetUrl;
  };

  const hrefFor = (nextLocale: Locale) => {
    return getLocalizedPath(nextLocale, pathname);
  };

  const options: Array<{ locale: Locale; label: string; code: string; currency: string }> = [
    { locale: "id", label: t("indonesian"), code: "ID", currency: "IDR (Rp)" },
    { locale: "en", label: t("english"), code: "EN", currency: "IDR (Rp)" },
    { locale: "en-sg", label: t("englishSg"), code: "SG", currency: "SGD (S$)" },
    { locale: "ms", label: t("melayu"), code: "MY", currency: "MYR (RM)" },
  ];

  const currentDisplayCode = locale === "en-sg" ? "SG" : locale === "ms" ? "MY" : locale.toUpperCase();

  return (
    <div className={`relative ${mobile ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={t("choose")}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:border-amber-400/60 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400/70 ${mobile ? "w-full py-3 text-sm" : ""}`}
      >
        <Globe2 className="h-4 w-4 text-amber-300" />
        <span>{currentDisplayCode}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className={`z-[60] overflow-hidden rounded-xl border border-white/15 bg-slate-950 shadow-2xl shadow-black/40 ${mobile ? "relative mt-2 w-full" : "absolute right-0 mt-2 w-60"}`}
        >
          {options.map((option) => {
            const targetPath = hrefFor(option.locale);
            const actionUrl = `/api/set-locale?locale=${option.locale}&redirect=${encodeURIComponent(targetPath)}`;
            return (
              <a
                key={option.locale}
                href={actionUrl}
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectLocale(option.locale);
                }}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10 ${locale === option.locale ? "bg-amber-500/15 text-amber-300" : "text-gray-200"}`}
              >
                <span className="w-7 text-xs font-black tracking-wider text-amber-400 flex-shrink-0">{option.code}</span>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="truncate">{option.label}</span>
                  <span className="text-[11px] text-amber-300/80 font-medium">{option.currency}</span>
                </div>
                {locale === option.locale && <Check className="h-4 w-4 text-amber-400 flex-shrink-0" />}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
