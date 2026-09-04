"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type RevealOptions = {
  /** Selector anak-anak yang akan di-reveal, relatif terhadap root. */
  targets: string;
  /** Jarak translate Y awal (px). Default 40 — pola "fade up" standar blueprint. */
  y?: number;
  /** Jeda antar elemen. Default 0.08 (grid <=4 item), pakai 0.05 untuk grid padat. */
  stagger?: number;
  /** Durasi animasi. Default 0.7 (--dur-enter). */
  duration?: number;
  /** Titik pemicu ScrollTrigger. Default "top 82%". */
  start?: string;
  /** Nonaktifkan reveal, dipakai saat prefers-reduced-motion aktif. */
  disabled?: boolean;
};

/**
 * Pola "fade up" wajib blueprint 7.6 — dipakai ulang di kartu, paragraf, dan section header.
 * Selalu dibungkus gsap.context() + ctx.revert() saat cleanup (aturan 7.4).
 */
export function useScrollReveal(root: RefObject<HTMLElement | null>, options: RevealOptions) {
  const { targets, y = 40, stagger = 0.08, duration = 0.7, start = "top 82%", disabled } = options;

  useEffect(() => {
    if (!root.current || disabled) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(targets);
      if (!els.length) return;

      gsap.set(els, { y, opacity: 0 });

      ScrollTrigger.create({
        trigger: root.current,
        start,
        once: true,
        onEnter: () => {
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            ease: "power3.out",
          });
        },
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, targets, y, stagger, duration, start]);
}
