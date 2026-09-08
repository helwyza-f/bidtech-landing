"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "motion/react";
import { nivoraAssets } from "@/lib/data/asset-paths";
import { stats } from "@/lib/data/stats";
import { formatID } from "@/lib/utils";
import { PartnersMarquee } from "@/components/home/partners-section";

type HeroSectionProps = {
  onOpenInterestTest: () => void;
};

export function HeroSection({ onOpenInterestTest }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      if (reduce) {
        gsap.set([".hero-portrait", ".hero-eyebrow", ".hero-desc", ".hero-cta > *", ".hero-stats"], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
        return;
      }

      mm.add("(min-width: 768px)", () => {
        if (!headlineRef.current) return;
        const split = new SplitText(headlineRef.current, { type: "lines", linesClass: "split-line" });
        gsap.set(split.lines, { overflow: "hidden" });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-portrait", { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power4.out" })
          .from(split.lines, { yPercent: 115, duration: 0.9, stagger: 0.08 }, 0.2)
          .from([".hero-eyebrow", ".hero-desc"], { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.55)
          .from(".hero-cta > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.8)
          .from(".hero-stats", { y: 14, opacity: 0, duration: 0.5 }, 0.95);

        gsap.to(".hero-portrait", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        return () => split.revert();
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-portrait", { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power4.out" })
          .from(
            [headlineRef.current, ".hero-eyebrow", ".hero-desc"],
            { y: 20, opacity: 0, duration: 0.55, stagger: 0.08 },
            0.25
          )
          .from(".hero-cta > *", { y: 14, opacity: 0, duration: 0.4, stagger: 0.06 }, 0.5)
          .from(".hero-stats", { y: 10, opacity: 0, duration: 0.4 }, 0.6);
      });
    }, sectionRef);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden min-h-[95vh] place-content-end">
      <div className="hero-portrait absolute inset-0 overflow-hidden z-0 h-full" aria-hidden="true">
        <video 
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={nivoraAssets.hero.poster}
          className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02] object-cover object-center brightness-50"
        >
          <source 
            src={nivoraAssets.hero.video}
            type="video/mp4"
          />
        </video>
      </div>

      <div className="px-4 sm:px-6 max-w-shell z-10 min-h-[80vh] place-content-center justify-center m-auto">
        <h1
          ref={headlineRef}
          className="mt-3 text-[32px] font-semibold text-surface leading-[1.05] tracking-[-0.04em] sm:mt-4 sm:text-[44px] lg:text-[60px] max-sm:mb-8 max-sm:text-[40px]"
        >
          Upgrade <span className="italic">skill</span>, tanpa hilang arah.
        </h1>

        <p className="hero-desc mt-4 max-w-[48ch] text-sm leading-relaxed sm:mt-5 sm:text-base lg:text-lg text-muted-soft max-sm:hidden">
          Kelas praktis, kurikulum berbasis industri, dan jalur belajar terarah dari
          pemula hingga menghasilkan portfolio nyata yang dinilai mentor.
        </p>

        <div className="hero-cta mt-4 flex flex-wrap items-center gap-3">
          <a
            href="#program"
            className="inline-flex h-11 items-center gap-2 rounded-pill bg-brand px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.22)] transition-colors hover:bg-brand-dark active:scale-95 sm:h-12 sm:px-6"
          >
            <span>Lihat jalur belajar</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="hero-stats py-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong className="block text-surface text-xl font-semibold sm:text-2xl">
                  {stat.decimals
                    ? stat.value.toLocaleString("id-ID", {
                        minimumFractionDigits: stat.decimals,
                        maximumFractionDigits: stat.decimals,
                      })
                    : formatID(stat.value)}
                  {stat.suffix}
                </strong>
                <span className="mt-0.5 block text-[11px] text-muted-soft sm:text-xs">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-14">
            <span className="mb-6 text-center block text-xs font-semibold text-muted-soft">
              Alumni kami bekerja di
            </span>
            <PartnersMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}