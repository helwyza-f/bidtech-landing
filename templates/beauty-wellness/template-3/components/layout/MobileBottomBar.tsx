"use client";

import React, { useEffect, useState } from "react";

export function MobileBottomBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling past the top hero fold (e.g. 120px) to avoid redundancy with initial fold
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Quick Mobile Booking Action Bar"
      className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 dark:bg-[#0C0C0E]/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-4 py-2.5 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Left Telemetry Status */}
        <div className="flex items-center space-x-2 font-mono text-[11px] select-none min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#D8F242] inline-block animate-pulse flex-shrink-0" />
          <div className="truncate">
            <span className="text-zinc-950 dark:text-white font-bold tracking-wider uppercase">SENOPATI LAB</span>
            <span className="text-zinc-500 dark:text-zinc-400 block text-[9px] uppercase tracking-wider">LIVE ON DECK</span>
          </div>
        </div>

        {/* Right Action Button */}
        <a
          href="#reservasi"
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0E0E10] text-white dark:bg-white dark:text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors select-none"
        >
          <span>BOOK SEAT</span>
          <span className="font-bold">→</span>
        </a>
      </div>
    </aside>
  );
}
