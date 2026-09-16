"use client";

import type { ChartPanelCardData } from "../hero-data";

export function ChartPanelCard({ data }: { data: ChartPanelCardData }) {
  return (
    <div className="flex w-38 sm:w-48 flex-col items-center rounded-xl sm:rounded-2xl border border-green-100 bg-white p-2 sm:p-3 shadow-[0_14px_40px_rgba(15,23,42,0.14)]">
      <p className="w-full text-center text-[10px] sm:text-xs font-semibold leading-snug text-slate-700">
        {data.label}
      </p>
      <svg viewBox="0 0 120 48" className="mt-1 sm:mt-2 h-9 sm:h-12 w-full">
        <polyline
          points="0,40 20,30 40,34 60,14 80,20 100,6 120,10"
          fill="none"
          stroke="#dc4c4c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
