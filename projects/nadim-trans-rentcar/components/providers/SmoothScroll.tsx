'use client';

import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const desktopMotion = window.matchMedia(
      "(min-width: 1280px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    // Native scrolling is faster and more predictable on touch devices. Lenis is
    // deliberately a progressive desktop enhancement, not part of the mobile path.
    if (!desktopMotion.matches) return;

    const idleId = window.setTimeout(() => void import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      if (typeof window !== 'undefined') {
        (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      }

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      const rafId = requestAnimationFrame(raf);

      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a');
        if (!target) return;

        const href = target.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element as HTMLElement, { offset: -80 });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener('click', handleAnchorClick);
        lenis.destroy();
        if (typeof window !== 'undefined') {
          delete (window as unknown as { __lenis?: Lenis }).__lenis;
        }
      };
    }));

    return () => {
      cancelled = true;
      window.clearTimeout(idleId);
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
