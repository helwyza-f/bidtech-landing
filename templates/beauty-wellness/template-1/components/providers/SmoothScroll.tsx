"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({
  children,
}: SmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    let frameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const anchor = target.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      if (!href || href === "#") return;

      const element = document.querySelector(href);

      if (!element) return;

      event.preventDefault();

      lenis.scrollTo(element as HTMLElement, {
        offset: -90,
        duration: 1.1,
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(frameId);

      document.removeEventListener(
        "click",
        handleAnchorClick
      );

      lenis.destroy();
    };
  }, []);

  return children;
}