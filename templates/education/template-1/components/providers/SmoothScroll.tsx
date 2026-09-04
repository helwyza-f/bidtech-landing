'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      syncTouch: false, // Allows native 120Hz hardware-accelerated inertia scrolling on touch devices
      infinite: false,
    });

    // Make lenis globally accessible for smooth anchor scrolling
    (window as unknown as { __lenis?: Lenis; lenis?: Lenis }).__lenis = lenis;
    (window as unknown as { __lenis?: Lenis; lenis?: Lenis }).lenis = lenis;

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);

    // Re-enable GSAP lag smoothing to absorb frame drops gracefully during first-scroll
    gsap.ticker.lagSmoothing(500, 33);

    // Handle hash anchors smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80,
            duration: 1.0,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis; lenis?: Lenis }).__lenis;
      delete (window as unknown as { __lenis?: Lenis; lenis?: Lenis }).lenis;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
