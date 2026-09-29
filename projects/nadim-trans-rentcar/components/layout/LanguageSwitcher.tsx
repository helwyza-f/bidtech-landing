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

  const savePreference = (nextLocale: Locale) => {
    try {
      window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, nextLocale);
    } catch {
      // The selected route still works if browser storage is unavailable.
    }
    setIsOpen(false);
    onNavigate?.();
  };

  const hrefFor = (nextLocale: Locale) => {
    const href = getLocalizedPath(nextLocale, pathname);
    return href;
  };

  const options: Array<{ locale: Locale; label: string; code: string }> = [
    { locale: "id", label: t("indonesian"), code: "ID" },
    { locale: "en", label: t("english"), code: "EN" },
  ];

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
        <span>{locale.toUpperCase()}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className={`z-[60] overflow-hidden rounded-xl border border-white/15 bg-slate-950 shadow-2xl shadow-black/40 ${mobile ? "relative mt-2 w-full" : "absolute right-0 mt-2 w-52"}`}
        >
          {options.map((option) => (
            <Link
              key={option.locale}
              href={hrefFor(option.locale)}
              role="menuitem"
              onClick={() => savePreference(option.locale)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10 ${locale === option.locale ? "bg-amber-500/15 text-amber-300" : "text-gray-200"}`}
            >
              <span className="w-6 text-xs font-black tracking-wider text-amber-400">{option.code}</span>
              <span className="flex-1">{option.label}</span>
              {locale === option.locale && <Check className="h-4 w-4" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
