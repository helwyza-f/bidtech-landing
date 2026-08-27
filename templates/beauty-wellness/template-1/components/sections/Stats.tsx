"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { siteConfig } from "@/data/site";

export function Stats() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 30,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        delay: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "grid grid-cols-2",
        "overflow-hidden rounded-2xl",
        "border border-black/5",
        "bg-[#f7f5f1]/95",
        "text-[#0b0b0b]",
        "shadow-[0_24px_80px_rgba(0,0,0,0.18)]",
        "backdrop-blur-xl",
        "md:grid-cols-4",
      ].join(" ")}
    >
      {siteConfig.stats.map((stat, index) => (
        <div
          key={stat.label}
          className={[
            "relative flex min-h-[110px]",
            "flex-col items-center justify-center",
            "px-4 py-5 text-center",
            "md:min-h-[125px]",
          ].join(" ")}
        >
          {index !== 0 && (
            <div className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-black/10 md:block" />
          )}

          <strong className="font-heading text-3xl font-bold tracking-[-0.06em] sm:text-4xl lg:text-5xl">
            {stat.value}
          </strong>

          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55 sm:text-xs">
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}