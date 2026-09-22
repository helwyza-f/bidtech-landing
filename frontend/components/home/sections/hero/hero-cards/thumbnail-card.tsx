"use client";

import Image from "next/image";

import type { ThumbnailCardData } from "../hero-data";

export function ThumbnailCard({ data }: { data: ThumbnailCardData }) {
  return (
    <div className="w-52 sm:w-72 overflow-hidden rounded-xl sm:rounded-2xl border border-green-100 bg-white p-2 sm:p-2.5 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
      <p className="text-center text-[10px] sm:text-xs font-semibold leading-snug text-slate-700">
        {data.label}
      </p>
      <div className="relative mt-1.5 sm:mt-2 h-26 sm:h-36 overflow-hidden rounded-lg sm:rounded-xl bg-slate-900">
        <Image src={data.thumbnailSrc} alt="" fill className="object-cover" sizes="176px" />
        <span
          className="absolute inset-0 flex items-center justify-center bg-slate-900/45 text-base sm:text-xl font-bold text-white"
          data-metric-value
        >
          0
        </span>
      </div>
    </div>
  );
}
