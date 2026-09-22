"use client";

import type { PillCardData } from "../hero-data";
import { HeroIcon } from "../hero-icons";

export function PillCard({ data }: { data: PillCardData }) {
  const isCardVariant = data.variant === "card";

  if (isCardVariant) {
    return (
      <div className="flex w-38 sm:w-48 flex-col items-center justify-center gap-1.5 sm:gap-2 text-center rounded-xl sm:rounded-2xl border border-green-100 bg-white px-3 py-2.5 sm:px-4 sm:py-3 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
        <span className="flex size-7 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
          <HeroIcon name={data.icon} className="size-4 sm:size-5 text-zinc-700" />
        </span>
        <span className="text-[11px] sm:text-xs font-semibold leading-tight text-slate-700">
          {data.label}
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-max items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full border border-green-100 bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
      <span className="flex size-6 sm:size-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
        <HeroIcon name={data.icon} className="size-3.5 sm:size-5 text-zinc-700" />
      </span>
      <span>{data.label}</span>
    </div>
  );
}
