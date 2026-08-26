'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth scroll (Lenis).
 *
 * Kenapa bukan `scroll-behavior: smooth` dari CSS? Karena CSS hanya
 * menghaluskan LOMPATAN anchor. Lenis menghaluskan scroll roda mouse itu
 * sendiri — inilah "rasa" khas landing page premium.
 *
 * Harga yang dibayar: scroll jadi tidak native. Kalau kamu merasa template
 * ini lebih baik tanpa itu, cukup hapus <SmoothScroll /> dari layout —
 * seluruh animasi lain tetap jalan karena tidak ada yang bergantung padanya.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Jangan paksakan smooth scroll ke user yang minta gerakan dikurangi.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
