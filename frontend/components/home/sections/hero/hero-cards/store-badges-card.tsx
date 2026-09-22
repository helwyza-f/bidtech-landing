"use client";

import { useLanguage } from "@/lib/i18n";

import type { StoreBadgesCardData } from "../hero-data";
import { AppStoreIcon, GooglePlayIcon } from "../hero-icons";

export function StoreBadgesCard({ data }: { data: StoreBadgesCardData }) {
  const { t } = useLanguage();

  return (
    <div className="w-48 sm:w-60 rounded-xl sm:rounded-2xl border border-green-100 bg-white px-3 py-2 sm:px-4 sm:py-3 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
      <p className="text-center text-[10px] sm:text-xs font-semibold leading-snug text-slate-700">
        {data.label}
      </p>
      <div className="mt-1.5 sm:mt-2.5 flex flex-col items-stretch gap-1 sm:gap-1.5">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-[11px] font-medium text-slate-700">
          <AppStoreIcon className="size-3 sm:size-3.5" />
          <span className="flex flex-col leading-tight">
            <span className="text-[8px] sm:text-[9px] text-slate-400">{t.heroShowcase.appStorePrefix}</span>
            <span className="font-semibold">App Store</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-[11px] font-medium text-slate-700">
          <GooglePlayIcon className="size-3 sm:size-3.5" />
          <span className="flex flex-col leading-tight">
            <span className="text-[8px] sm:text-[9px] text-slate-400">{t.heroShowcase.googlePlayPrefix}</span>
            <span className="font-semibold">Google Play</span>
          </span>
        </div>
      </div>
    </div>
  );
}
