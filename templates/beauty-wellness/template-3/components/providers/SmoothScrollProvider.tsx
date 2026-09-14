"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let refreshTimeout: NodeJS.Timeout | null = null;

    try {
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.6,
        infinite: false,
        autoRaf: false,
      });

      lenisRef.current = lenis;
      setLenisInstance(lenis);
      if (typeof window !== "undefined") {
        (window as unknown as { lenis: Lenis }).lenis = lenis;
      }

      // Synchronize Lenis with GSAP ScrollTrigger for 1:1 scroll trigger fidelity
      const updateScrollTrigger = () => {
        ScrollTrigger.update();
      };
      lenis.on("scroll", updateScrollTrigger);

      // Connect GSAP ticker to drive Lenis requestAnimationFrame
      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // Re-calculate ScrollTrigger offsets once the DOM and dynamic images have settled
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

    } catch (err) {
      console.warn("Lenis initialization error:", err);
    }

    // Intercept in-page hash links for smooth anchor scrolling with -60px offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl as HTMLElement, {
            offset: -60,
            duration: 1.4,
            immediate: false,
          });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
      if (lenis) {
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
