'use client';

import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      // Sync Lenis scroll events to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP's internal ticker to drive Lenis RAF
      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      if (typeof window !== 'undefined') {
        (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
        if (window.scrollY > 0) {
          lenis.scrollTo(window.scrollY, { immediate: true });
        }
      }

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
        gsap.ticker.remove(tickerCallback);
        document.removeEventListener('click', handleAnchorClick);
        lenis.destroy();
        if (typeof window !== 'undefined') {
          delete (window as unknown as { __lenis?: Lenis }).__lenis;
        }
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
