"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "motion/react";

const MILESTONES = [
  { label: "Jalur", targetId: "#program" },
  { label: "Kursus", targetId: "#kursus" },
  { label: "Metode", targetId: "#metode" },
  { label: "Bootcamp", targetId: "#bootcamp" },
  { label: "Karier", targetId: "#tentang" },
];

/**
 * Motif khas "Editorial Wayfinding": garis vertikal 1px yang tergambar
 * progresif mengikuti scroll seluruh halaman, dengan 5 milestone marker.
 * Hanya render di >=1280px (blueprint 5.5).
 */
export function RouteLine() {
  const progressRef = useRef<SVGLineElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !progressRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed left-6 top-0 z-30 hidden h-screen xl:block"
    >
      <svg width="2" height="100%" className="overflow-visible">
        <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--border)" strokeWidth="2" />
        <line
          ref={progressRef}
          x1="1"
          y1="0"
          x2="1"
          y2="100%"
          stroke="var(--primary)"
          strokeWidth="2"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={reduce ? 0 : 1}
        />
      </svg>

      <div className="absolute top-24 flex h-[calc(100%-12rem)] flex-col justify-between py-2">
        {MILESTONES.map((m) => (
          <span
            key={m.label}
            title={m.label}
            className="-ml-[3px] h-2 w-2 rounded-full bg-line ring-4 ring-background"
          />
        ))}
      </div>
    </aside>
  );
}
