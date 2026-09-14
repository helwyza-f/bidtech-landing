"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroCollage } from "./HeroCollage";
import { TelemetryCards } from "./TelemetryCards";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const narrativeBarRef = useRef<HTMLDivElement>(null);
  const narrativeTextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Top Badges & Coordinates terminal snap
      if (badgesRef.current) {
        tl.from(badgesRef.current, {
          opacity: 0,
          y: -18,
          duration: 0.6,
        });
      }

      if (metaRef.current) {
        tl.from(
          metaRef.current,
          {
            opacity: 0,
            x: 24,
            duration: 0.6,
          },
          "-=0.4"
        );
      }

      // 2. Editorial 3-Line Masked Slide-Up (Staggered per line)
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(
        Boolean
      ) as HTMLSpanElement[];

      if (lines.length > 0) {
        tl.from(
          lines,
          {
            yPercent: 125,
            duration: 1.05,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.3"
        );
      }

      // 3. Narrative vertical lime bar draw-down & text fade
      if (narrativeBarRef.current) {
        tl.from(
          narrativeBarRef.current,
          {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.7,
          },
          "-=0.7"
        );
      }

      if (narrativeTextRef.current) {
        tl.from(
          narrativeTextRef.current,
          {
            opacity: 0,
            x: -16,
            duration: 0.75,
          },
          "-=0.5"
        );
      }

      if (buttonRef.current) {
        tl.from(
          buttonRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
          },
          "-=0.4"
        );
      }

      // 4. Telemetry cards entrance
      tl.from(
        ".telemetry-card",
        {
          opacity: 0,
          y: 24,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="beranda"
      className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 transition-colors bg-[#F6F6F2] dark:bg-[#0B0B0C] bg-drafting-grid border-b border-zinc-300/80 dark:border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Telemetry & Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-12">
          {/* Left Status Badges */}
          <div ref={badgesRef} className="flex items-center flex-wrap gap-2 sm:gap-3">
            <div className="bg-white dark:bg-[#141417] border border-zinc-300 dark:border-zinc-800/90 text-zinc-900 dark:text-white px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-[11px] font-mono tracking-wider flex items-center gap-2 select-none shadow-sm dark:shadow-none">
              <span className="w-2 h-2 bg-[#D8F242] inline-block flex-shrink-0 animate-pulse" />
              <span>CUTS / GROOMING ARCHIVE</span>
            </div>
            <div className="bg-white dark:bg-[#141417] border border-zinc-300 dark:border-zinc-800/90 text-[#658200] dark:text-[#D8F242] px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold select-none shadow-sm dark:shadow-none">
              LIVE STYLISTS ON DECK
            </div>
          </div>

          {/* Right Coordinate & Telemetry Meta */}
          <div
            ref={metaRef}
            className="flex items-center space-x-3 text-[10px] sm:text-xs font-mono tracking-wider select-none self-start sm:self-auto"
          >
            <span className="text-zinc-500">[JKT — 06°12'S 106°49'E]</span>
            <span className="text-[#658200] dark:text-[#D8F242] font-bold">BATTERY: 100%</span>
          </div>
        </div>

        {/* Main Headline & Narrative Row with Mask Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center mb-8 sm:mb-12">
          {/* Left Headline (3 lines: Pangkas presisi / untuk yang mau / agak rapi.) */}
          <div className="lg:col-span-7 py-1">
            <h1 className="font-display italic font-bold tracking-tight leading-[0.98] text-[42px] sm:text-6xl md:text-7xl lg:text-[76px] select-none">
              <div className="overflow-hidden py-0.5">
                <span
                  ref={line1Ref}
                  className="text-zinc-950 dark:text-white block will-change-transform"
                >
                  Pangkas presisi
                </span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span
                  ref={line2Ref}
                  className="block text-[#658200] dark:text-[#A8D122] will-change-transform"
                >
                  untuk yang mau
                </span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span
                  ref={line3Ref}
                  className="text-zinc-950 dark:text-white block will-change-transform"
                >
                  agak rapi.
                </span>
              </div>
            </h1>
          </div>

          {/* Right Narrative Card with vertical accent bar */}
          <div className="lg:col-span-5 flex flex-col items-start lg:pl-6">
            <div
              ref={narrativeBarRef}
              className="pl-4 py-0.5 border-l-2 will-change-transform border-[#658200] dark:border-[#A8D122]"
            >
              <p
                ref={narrativeTextRef}
                className="text-zinc-600 dark:text-zinc-400 font-sans text-xs sm:text-[13px] leading-relaxed max-w-md"
              >
                Bukan salon konvensional. Laboratorium struktur rambut urban Jakarta yang
                merombak siluet lo dengan presisi geometri skena, tekstur dinamis, dan produk
                custom-blend.
              </p>
            </div>

            {/* View Archive Matrix Button */}
            <a
              ref={buttonRef}
              href="#layanan"
              className="mt-5 inline-flex items-center gap-2.5 px-4 py-2 border border-zinc-300 dark:border-zinc-700/90 bg-white dark:bg-[#121214] hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white font-mono text-[11px] uppercase tracking-[0.18em] font-medium transition-colors select-none shadow-sm dark:shadow-none"
            >
              <span>VIEW ARCHIVE MATRIX</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Abstract Photo Collage Stage Box with GSAP Physics */}
        <HeroCollage />

        {/* 3 Telemetry Cards directly below the collage box */}
        <TelemetryCards />
      </div>
    </section>
  );
}
