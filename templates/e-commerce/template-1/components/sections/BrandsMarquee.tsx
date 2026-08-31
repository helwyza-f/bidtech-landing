"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { brands } from "@/lib/data";

export default function BrandsMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // We clone the track content to make an infinite seamless loop
    const tl = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Double the brands array to ensure smooth infinite scrolling
  const marqueeItems = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-surface border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-sm font-semibold text-txt-400 uppercase tracking-widest">
          Brand Resmi & Terpercaya
        </p>
      </div>
      
      <div 
        ref={marqueeRef}
        className="relative w-full flex overflow-hidden mask-image-fade"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}
      >
        <div 
          ref={trackRef}
          className="flex items-center space-x-12 sm:space-x-24 px-6 sm:px-12 w-max"
        >
          {marqueeItems.map((brand, idx) => (
            <div 
              key={`${brand}-${idx}`}
              className="text-2xl sm:text-3xl font-bold text-txt-disabled whitespace-nowrap opacity-50 hover:opacity-100 hover:text-ink-800 transition-all cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
