import React from "react";
import { siteConfig } from "@/data/site";

export function TelemetryCards() {
  return (
    <div className="w-full mt-3.5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Primary Schedule */}
        <div className="telemetry-card p-3.5 sm:p-4 rounded-[2px] border border-zinc-300 dark:border-zinc-800/90 bg-white dark:bg-[#111113] flex items-center space-x-3 transition-colors shadow-sm dark:shadow-none will-change-transform">
          <div className="w-2.5 h-2.5 bg-[#D8F242] flex-shrink-0 animate-pulse" />
          <div className="min-w-0">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
              PRIMARY SCHEDULE
            </span>
            <span className="font-mono font-bold text-xs tracking-wider text-zinc-950 dark:text-white block mt-0.5">
              {siteConfig.schedule.primary}
            </span>
          </div>
        </div>

        {/* Card 2: Lab Location */}
        <div className="telemetry-card p-3.5 sm:p-4 rounded-[2px] border border-zinc-300 dark:border-zinc-800/90 bg-white dark:bg-[#111113] flex items-center justify-between transition-colors shadow-sm dark:shadow-none will-change-transform">
          <div className="min-w-0 pr-2">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
              LAB LOCATION
            </span>
            <span className="font-mono font-bold text-xs tracking-wider text-zinc-950 dark:text-white truncate block mt-0.5">
              JL. SENOPATI NO. 82, JAKSEL
            </span>
          </div>
          <a
            href={siteConfig.location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-black dark:hover:text-[#D8F242] transition-colors whitespace-nowrap"
          >
            [MAPS]
          </a>
        </div>

        {/* Card 3: Explore Cut Archives */}
        <a
          href="#layanan"
          className="telemetry-card group p-3.5 sm:p-4 rounded-[2px] border border-zinc-300 dark:border-zinc-800/90 bg-white dark:bg-[#111113] flex items-center justify-between transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm dark:shadow-none will-change-transform"
        >
          <span className="font-mono font-semibold text-xs tracking-wider uppercase text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white">
            EXPLORE CUT ARCHIVES
          </span>
          <span
            className="font-mono text-xs font-bold transition-transform group-hover:translate-y-0.5 text-black dark:text-[#D8F242]"
          >
            [ ↓ ]
          </span>
        </a>
      </div>
    </div>
  );
}
