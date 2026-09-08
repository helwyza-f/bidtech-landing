"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { TimelineMilestone } from "@/lib/data/about";

type TimelineTabsProps = {
  timeline: TimelineMilestone[];
  /** Kelas tinggi area gambar — beda konteks (homepage vs halaman /tentang) butuh proporsi beda. */
  heightClassName?: string;
};

/**
 * Story bertahun dengan tab pilihan manual (bukan auto-scroll paksa).
 * Dipakai bersama oleh AboutSection (homepage) dan halaman /tentang
 * supaya kedua tempat konsisten dan tidak duplikasi logic.
 */
export function TimelineTabs({
  timeline,
  heightClassName = "h-[60vh] min-h-[360px] sm:h-[65vh] lg:h-[70vh] lg:max-h-[720px]",
}: TimelineTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const active = timeline[activeIndex];

  return (
    <div>
      {/* Tab tahun — user pilih sendiri, tidak ada auto-scroll paksa */}
      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1 sm:mb-6">
        {timeline.map((milestone, i) => (
          <button
            key={milestone.year}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 rounded-pill px-4 py-2 text-sm font-bold transition-colors ${
              i === activeIndex
                ? "bg-brand text-white"
                : "border border-line bg-background text-muted hover:border-brand/30 hover:text-foreground"
            }`}
          >
            {milestone.year}
          </button>
        ))}
      </div>

      {/* Satu area gambar tetap, konten berganti sesuai tab aktif */}
      <div className={`relative w-full overflow-hidden rounded-panel bg-brand-soft ${heightClassName}`}>
        <AnimatePresence mode="sync">
          <motion.div
            key={active.year}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={active.image}
              alt={active.title}
              fill
              sizes="(min-width: 1240px) 1192px, 100vw"
              className="object-cover"
              priority={activeIndex === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.year}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-display text-3xl italic text-white sm:text-4xl">{active.year}</span>
              <h3 className="mt-1.5 text-base font-bold text-white sm:text-lg">{active.title}</h3>
              <p className="mt-1 max-w-[50ch] text-xs leading-relaxed text-white/75 sm:text-sm">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}