"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
  (window as unknown as { ScrollSmoother: typeof ScrollSmoother; gsap: typeof gsap }).ScrollSmoother = ScrollSmoother;
  (window as unknown as { ScrollSmoother: typeof ScrollSmoother; gsap: typeof gsap }).gsap = gsap;
}

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
  smooth?: number;
  effects?: boolean;
  smoothTouch?: number | boolean;
}

export function SmoothScrollProvider({
  children,
  smooth = 1.2,
  effects = true,
  smoothTouch = 0.1,
}: SmoothScrollProviderProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      // Ensure existing instance is killed before recreating
      const existing = ScrollSmoother.get();
      if (existing) {
        existing.kill();
      }

      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: smooth,
        effects: effects,
        smoothTouch: smoothTouch,
      });

      return () => {
        smootherRef.current?.kill();
      };
    },
    { scope: mainRef }
  );

  return (
    <div id="smooth-wrapper" ref={mainRef} className="w-full overflow-hidden">
      <div id="smooth-content" className="w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
