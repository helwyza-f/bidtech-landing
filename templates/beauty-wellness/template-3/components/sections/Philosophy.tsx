"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { technicalStandards } from "@/data/standards";

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Heading slide-up
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      // 2. 3 Technical Standards Cards Waterfall Entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="filosofi"
      className="py-20 md:py-28 border-b transition-colors"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="max-w-3xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-1">
            // STANDAR TEKNIKAL
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">
            Tolak potong rambut sembarangan.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-3 leading-relaxed font-sans">
            Rambut pria tumbuh rata-rata 1.25 cm per bulan. Tanpa potongan berstruktur, bentuk rambut
            akan hancur dalam 7 hari. Kami membangun fondasi geometris agar rambut tetap terlihat
            terawat bahkan saat mulai memanjang.
          </p>
        </div>

        {/* 3 Technical Standards Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technicalStandards.map((std) => (
            <div
              key={std.number}
              className="standard-card p-6 rounded-[4px] border transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-700 hover:-translate-y-1 will-change-transform"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
              }}
            >
              <div
                className="w-8 h-8 rounded-[2px] flex items-center justify-center font-mono font-bold text-xs mb-4 shadow-sm"
                style={{
                  backgroundColor: std.badgeBg,
                  color: std.badgeText,
                }}
              >
                {std.number}
              </div>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-2">
                {std.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                {std.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
