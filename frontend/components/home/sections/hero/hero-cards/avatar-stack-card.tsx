"use client";

import Image from "next/image";

import type { AvatarStackCardData } from "../hero-data";

export function AvatarStackCard({ data }: { data: AvatarStackCardData }) {
  return (
    <div className="w-52 sm:w-68 rounded-xl sm:rounded-2xl border border-green-100 bg-white px-3 py-2 sm:px-4 sm:py-3 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
      <p className="text-center text-[10px] sm:text-xs font-semibold leading-snug text-slate-700">
        {data.label}
      </p>
      <div className="mt-1.5 sm:mt-2.5 flex items-center justify-center">
        <div className="flex -space-x-2 sm:-space-x-2.5">
          {data.avatarSrcs.map((src, i) => (
            <span
              key={src}
              className="relative size-9 sm:size-13 overflow-hidden rounded-full border-2 border-white bg-slate-100"
              style={{ zIndex: data.avatarSrcs.length - i }}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </span>
          ))}
        </div>
        <span className="relative z-0 -ml-1 flex size-9 sm:size-13 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[9px] sm:text-[11px] font-semibold text-slate-600">
          <span data-metric-value>0</span>
        </span>
      </div>
    </div>
  );
}
