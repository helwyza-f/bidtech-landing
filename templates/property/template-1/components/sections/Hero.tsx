"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sun, Moon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroProps {
  lang: "en" | "id";
  onOpenBlueprint: () => void;
  heroTheme?: "dark" | "light";
  onToggleHeroTheme?: () => void;
}

export default function Hero({
  lang,
  onOpenBlueprint,
  heroTheme: externalHeroTheme,
  onToggleHeroTheme,
}: HeroProps) {
  const [internalHeroTheme, setInternalHeroTheme] = useState<"dark" | "light">("dark");

  const currentTheme = externalHeroTheme || internalHeroTheme;
  const isLight = currentTheme === "light";

  const handleToggle = () => {
    if (onToggleHeroTheme) {
      onToggleHeroTheme();
    } else {
      setInternalHeroTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set(".hero-anim-elem, .hero-title-line, .hero-metric-card", {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
        });
        return;
      }

      // Initial States for Page-Load Entrance Reveal
      gsap.set(".hero-anim-elem", { opacity: 0, y: 25 });
      gsap.set(".hero-title-line", { yPercent: 110, opacity: 0 });
      gsap.set(".hero-metric-card", { opacity: 0, y: 40, scale: 0.94 });
      if (bgRef.current) {
        gsap.set(bgRef.current, { scale: 1.15, opacity: 0.8 });
      }

      // Page-Load Master Entrance Timeline
      const loadTl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // 1. Background Cinematic Settle
      if (bgRef.current) {
        loadTl.to(
          bgRef.current,
          {
            scale: 1.05,
            opacity: 1,
            duration: 2.2,
            ease: "power3.out",
          },
          0
        );
      }

      // 2. Top Subhead
      loadTl.to(
        ".hero-subhead",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
        0.15
      );

      // 3. Mega Title Lines ("SANDER" & "HOUSE" Masked Reveal)
      loadTl.to(
        ".hero-title-line",
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.35,
          stagger: 0.14,
        },
        0.18
      );

      // 4. Bottom Left Info & CTA
      loadTl.to(
        ".hero-info-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.08,
        },
        0.45
      );

      // 5. Right Metric Card Bloom
      loadTl.to(
        ".hero-metric-card",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
        },
        0.6
      );

      // Subsequent Multi-Layer Scroll Parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          yPercent: -15,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      if (bottomRef.current) {
        gsap.to(bottomRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, heroRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 overflow-hidden select-none transition-colors duration-500 ${isLight ? "bg-[#F8F9FA] text-neutral-900" : "bg-[#0A0A0A] text-white"
        }`}
    >
      {/* Hero Twilight / Daylight Backdrop with Parallax */}
      <div
        ref={bgRef}
        className="absolute -inset-x-0 -top-[15%] -bottom-[15%] h-[130%] w-full z-0 will-change-transform pointer-events-none"
      >
        <Image
          src={isLight ? "/images/hero-light.webp" : "/images/hero-dark.webp"}
          alt="Sander House Luxury Villa Architecture"
          fill
          priority
          className={`w-full h-full object-cover object-center scale-105 transition-all duration-500 ${isLight ? "brightness-[0.96]" : "brightness-[0.88]"
            }`}
        />
        {/* Dynamic Theme Gradient Overlays */}
        {isLight ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/20 to-white/95 pointer-events-none transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-white/40 pointer-events-none transition-opacity duration-500"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black/95 pointer-events-none transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50 pointer-events-none transition-opacity duration-500"></div>
          </>
        )}
      </div>

      {/* Top Subhead Bar */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="hero-subhead hero-anim-elem">
          <p
            className={`text-[11px] tracking-[0.25em] uppercase font-bold transition-colors duration-500 ${isLight ? "text-neutral-700 font-extrabold" : "text-white/80"
              }`}
          >
            {lang === "en" ? "YOUR DREAM PROPERTY AWAITS" : "PROPERTI IMPIAN MENANTI ANDA"}
          </p>
        </div>
      </div>

      {/* Mega Display Typography with Masked Line Entrance Reveal & Parallax */}
      <div
        ref={titleRef}
        className={`relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 my-auto will-change-transform ${isLight ? "text-neutral-900" : "text-white"
          }`}
      >
        <div className="relative">
          <h1 className="text-[4.5rem] sm:text-[8rem] md:text-[11rem] lg:text-[13.5rem] font-black tracking-[-0.04em] leading-[0.85] uppercase select-none">
            <div className="overflow-hidden">
              <span
                className={`hero-title-line block transition-colors duration-500 ${isLight ? "text-neutral-900 drop-shadow-sm" : "text-white drop-shadow-lg"
                  }`}
              >
                DENN
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className={`hero-title-line block -mt-2 sm:-mt-6 md:-mt-10 lg:-mt-14 transition-colors duration-500 ${isLight ? "text-stroke-dark opacity-85" : "text-stroke-white opacity-90"
                  }`}
              >
                HOUSE
              </span>
            </div>
          </h1>
        </div>
      </div>

      {/* Bottom Details & Metric Card with Staggered Entrance & Floating Parallax */}
      <div
        ref={bottomRef}
        className={`relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 will-change-transform ${isLight ? "text-neutral-900" : "text-white"
          }`}
      >
        {/* Left Info & CTA */}
        <div className="max-w-md space-y-4">
          <div className="space-y-1">
            <div className="hero-info-item hero-anim-elem">
              <span
                className={`text-[11px] font-mono tracking-widest uppercase transition-colors duration-500 ${isLight ? "text-neutral-500 font-bold" : "text-neutral-400"
                  }`}
              >
                Y219 — PRIVATE RESIDENCE
              </span>
            </div>

            <div className="hero-info-item hero-anim-elem">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight uppercase leading-snug">
                {lang === "en"
                  ? "WHERE TRANQUILITY MEETS MODERN LIVING"
                  : "KETENANGAN BERSATU DENGAN KEMEWAHAN MODERN"}
              </h2>
            </div>

            <div className="hero-info-item hero-anim-elem">
              <p
                className={`text-xs tracking-wider uppercase pt-1 font-mono transition-colors duration-500 ${isLight ? "text-neutral-600 font-semibold" : "text-neutral-300"
                  }`}
              >
                {lang === "en"
                  ? "SURROUNDED BY NATURE. 20 MINUTES FROM THE BURJ KHALIFA."
                  : "DIKELILINGI ALAM. 20 MENIT DARI BURJ KHALIFA."}
              </p>
            </div>
          </div>

          <div className="hero-info-item hero-anim-elem pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBlueprint}
              className={`group flex items-center gap-3 px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-xl active:scale-95 cursor-pointer ${isLight
                ? "bg-black text-white hover:bg-neutral-800"
                : "bg-white text-black hover:bg-neutral-200"
                }`}
            >
              <span>{lang === "en" ? "VIEW LAYOUTS" : "LIHAT DENAH"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="#properties"
              className={`text-xs font-semibold tracking-wider uppercase underline underline-offset-4 flex items-center gap-1.5 transition-colors ${isLight
                ? "text-neutral-800 hover:text-black"
                : "text-neutral-200 hover:text-white"
                }`}
            >
              <span>{lang === "en" ? "EXPLORE ALL 12 UNITS" : "LIHAT SEMUA 12 UNIT"}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right Solid Metric Card */}
        <div
          className={`hero-metric-card p-5 rounded-2xl max-w-xs w-full shadow-2xl space-y-4 transition-colors duration-500 ${isLight
            ? "bg-white/85 backdrop-blur-xl border border-neutral-200/90 text-neutral-900"
            : "bg-black/60 backdrop-blur-xl border border-white/20 text-white"
            }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <span
                className={`text-3xl font-black tracking-tight tabular-numbers transition-colors duration-500 ${isLight ? "text-neutral-900" : "text-white"
                  }`}
              >
                400+
              </span>
              <p
                className={`text-[11px] font-normal leading-relaxed mt-1 transition-colors duration-500 ${isLight ? "text-neutral-600" : "text-neutral-300"
                  }`}
              >
                {lang === "en"
                  ? "clients have already received our bespoke architectural work worldwide."
                  : "klien telah mempercayakan mahakarya arsitektur kami di seluruh dunia."}
              </p>
            </div>
            <Link
              href="#properties"
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isLight
                ? "bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-900"
                : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                }`}
              aria-label="View Client Portfolio"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Avatars */}
          <div
            className={`flex items-center gap-3 pt-3 border-t transition-colors duration-500 ${isLight ? "border-neutral-200" : "border-white/10"
              }`}
          >
            <div className="flex -space-x-2">
              <div className="relative w-6 h-6 rounded-full ring-2 ring-neutral-300 overflow-hidden">
                <Image
                  src="/images/avatar-1.webp"
                  alt="Client 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-6 h-6 rounded-full ring-2 ring-neutral-300 overflow-hidden">
                <Image
                  src="/images/avatar-2.webp"
                  alt="Client 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-6 h-6 rounded-full ring-2 ring-neutral-300 overflow-hidden">
                <Image
                  src="/images/avatar-3.webp"
                  alt="Client 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <span
              className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-500 ${isLight ? "text-neutral-500" : "text-neutral-400"
                }`}
            >
              {lang === "en" ? "VERIFIED BUYERS" : "PEMBELI TERVERIFIKASI"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
