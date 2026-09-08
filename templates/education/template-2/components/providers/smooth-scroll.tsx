"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // Jangan pasang Lenis sama sekali

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false, // biarkan scroll native di layar sentuh
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor link harus lewat Lenis, bukan scroll-behavior native.
    // Selector mencakup dua bentuk: href="#id" (anchor murni di halaman yang
    // sama) dan href="/#id" (dipakai navbar/footer supaya juga benar dari
    // halaman lain) — bentuk kedua hanya di-intercept kalau pengguna
    // memang sedang berada di "/", selain itu dibiarkan lewat Next.js
    // Link untuk navigasi antar halaman seperti biasa.
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const hashIndex = href.indexOf("#");
      const pathPart = href.slice(0, hashIndex);
      const id = href.slice(hashIndex);
      if (pathPart && pathPart !== "/" && pathPart !== window.location.pathname) return;

      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(id, { offset: -96 }); // kompensasi tinggi navbar
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}