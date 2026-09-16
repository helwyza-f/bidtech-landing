"use client";

import type { MetricPanelCardData } from "../hero-data";

export function MetricPanelCard({ data }: { data: MetricPanelCardData }) {
  return (
    <div className="flex w-max flex-col items-center rounded-xl sm:rounded-2xl border border-green-100 bg-white px-3 py-2 sm:px-4 sm:py-3 shadow-[0_12px_35px_rgba(15,23,42,0.12)]">
      <p className="text-center text-[10px] sm:text-xs font-semibold leading-snug text-slate-500">
        {data.label}
      </p>
      <div className="mt-0.5 sm:mt-1 flex items-baseline justify-center gap-1.5 sm:gap-2">
        <span className="text-base sm:text-xl font-bold leading-none text-slate-950" data-metric-value>
          0
        </span>
        {data.metric.delta && (
          <span className="rounded-full bg-brand-primary/10 px-1.5 py-0.5 text-[9px] sm:text-[11px] font-semibold text-brand-primary">
            {data.metric.delta}
          </span>
        )}
      </div>
    </div>
  );
}
