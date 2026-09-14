"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { siteConfig } from "@/data/site";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

export function KineticMarquee() {
  const { lenis } = useLenis();
  const marqueeBarRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let marqueeTween: gsap.core.Tween | null = null;
    let scrollTimeout: NodeJS.Timeout | null = null;

    try {
      const marqueeItems = trackRef.current?.querySelectorAll(".gsap-marquee-item");
      if (marqueeItems && marqueeItems.length > 0) {
        marqueeTween = gsap.to(marqueeItems, {
          xPercent: -100,
          repeat: -1,
          duration: 26,
          ease: "none",
        });

        // Hover deceleration
        const bar = marqueeBarRef.current;
        const handleMouseEnter = () => {
          if (marqueeTween) {
            gsap.to(marqueeTween, { timeScale: 0.2, duration: 0.4, overwrite: "auto" });
          }
        };
        const handleMouseLeave = () => {
          if (marqueeTween) {
            gsap.to(marqueeTween, { timeScale: 1, duration: 0.6, overwrite: "auto" });
          }
        };

        bar?.addEventListener("mouseenter", handleMouseEnter);
        bar?.addEventListener("mouseleave", handleMouseLeave);

        // Scroll velocity acceleration
        const onScrollVelocity = () => {
          if (marqueeTween) {
            gsap.to(marqueeTween, { timeScale: 2.4, duration: 0.25, overwrite: "auto" });
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              if (marqueeTween) {
                gsap.to(marqueeTween, {
                  timeScale: 1,
                  duration: 0.7,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }
            }, 120);
          }
        };

        if (lenis) {
          lenis.on("scroll", (e: { velocity: number }) => {
            if (Math.abs(e.velocity) > 0.3) {
              onScrollVelocity();
            }
          });
        } else {
          window.addEventListener("scroll", onScrollVelocity, { passive: true });
        }

        return () => {
          bar?.removeEventListener("mouseenter", handleMouseEnter);
          bar?.removeEventListener("mouseleave", handleMouseLeave);
          window.removeEventListener("scroll", onScrollVelocity);
          if (scrollTimeout) clearTimeout(scrollTimeout);
          marqueeTween?.kill();
        };
      }
    } catch (err) {
      console.warn("GSAP marquee initialization error:", err);
    }
  }, [lenis]);

  const renderMarqueeSet = (keySuffix: string, ariaHidden = false) => (
    <div
      key={keySuffix}
      className="gsap-marquee-item space-x-6 pr-6 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-zinc-300"
      aria-hidden={ariaHidden}
    >
      {siteConfig.marqueeItems.map((item, idx) => {
        let colorStyle = "text-zinc-800 dark:text-zinc-300";
        let styleObj: React.CSSProperties = {};
        if (item.color === "lime") {
          styleObj = { color: "var(--accent-lime)" };
          colorStyle = "font-bold";
        } else if (item.color === "amber") {
          colorStyle = "text-[#EAB308] font-bold";
        } else if (item.color === "red") {
          colorStyle = "text-[#E11D48] font-bold";
        }

        return (
          <React.Fragment key={idx}>
            <span className={colorStyle} style={styleObj}>
              {item.text}
            </span>
            <span className="text-zinc-400 dark:text-zinc-600">·</span>
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div
      ref={marqueeBarRef}
      id="gsapMarqueeBar"
      className="marquee-wrapper border-t border-b py-3.5 border-zinc-300 dark:border-zinc-800/80 bg-white dark:bg-[#0B0B0C] transition-colors"
    >
      <div ref={trackRef} id="gsapMarqueeTrack" className="marquee-track-gsap">
        {renderMarqueeSet("set-1", false)}
        {renderMarqueeSet("set-2", true)}
        {renderMarqueeSet("set-3", true)}
      </div>
    </div>
  );
}
