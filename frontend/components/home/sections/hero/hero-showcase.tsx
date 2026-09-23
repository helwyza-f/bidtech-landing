"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

import { useLanguage } from "@/lib/i18n";

import { useHeroOrchestrator } from "./use-hero-orchestrator";
import { useFitTextToLines } from "./use-fit-text-to-lines";
import { HeroBlob } from "./hero-blob";
import { HeroDecorativeCard } from "./hero-decorative-card";
import { heroSlides, HERO_RIGHT_BLOB_SRC } from "./hero-data";

const TITLE_MAX_LINES = 3;
const TITLE_LINE_HEIGHT = 1.25;

export function HeroShowcase() {
  const { t } = useLanguage();
  const localizedSlides = useMemo(
    () =>
      heroSlides.map((slide, slideIndex) => {
        const copy = t.heroShowcase.slides[slideIndex];

        return {
          ...slide,
          title: copy?.title ?? slide.title,
          subtitle: copy?.subtitle ?? slide.subtitle,
          modelAlt: copy?.modelAlt ?? slide.modelAlt,
          decoratives: slide.decoratives.map((card, cardIndex) => ({
            ...card,
            label: copy?.decoratives[cardIndex] ?? card.label,
          })),
        };
      }),
    [t],
  );

  // judul terpanjang jadi acuan auto-fit agar ukuran font stabil di semua slide
  const longestTitle = useMemo(
    () => localizedSlides.reduce((a, b) => (b.title.length > a.title.length ? b : a)),
    [localizedSlides],
  );
  const longestSubtitle = useMemo(
    () => localizedSlides.reduce((a, b) => (b.subtitle.length > a.subtitle.length ? b : a)),
    [localizedSlides],
  );

  const {
    currentSlide,
    titleText,
    cursorVisible,
    decorativesVisible,
    modelRef,
    subtitleRef,
    registerDecorative,
  } = useHeroOrchestrator(localizedSlides);

  // Batas ukuran font menyesuaikan ukuran layar (HP, Tablet, Desktop)
  const [fontBounds, setFontBounds] = useState({ min: 26, max: 38 });

  useEffect(() => {
    const updateFontBounds = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setFontBounds({ min: 24, max: 36 });
      } else if (w < 1024) {
        setFontBounds({ min: 32, max: 48 });
      } else {
        setFontBounds({ min: 44, max: 64 });
      }
    };

    updateFontBounds();
    window.addEventListener("resize", updateFontBounds);
    return () => window.removeEventListener("resize", updateFontBounds);
  }, []);

  const frontCards = currentSlide.decoratives.filter((c) => c.zLayer === "front");
  const behindCards = currentSlide.decoratives.filter((c) => c.zLayer === "behind");

  const { measureRef, fontSizePx } = useFitTextToLines({
    text: longestTitle.title,
    maxLines: TITLE_MAX_LINES,
    minFontSizePx: fontBounds.min,
    maxFontSizePx: fontBounds.max,
  });

  const resolvedFontSizePx = fontSizePx ?? fontBounds.min;
  const titleBoxHeightPx = resolvedFontSizePx * TITLE_LINE_HEIGHT * TITLE_MAX_LINES;

  return (
    /* Grid 1 kolom pada mobile & tablet (vertikal: teks diatas, model dibawah), 2 kolom pada desktop (lg:) */
    <div className="relative grid items-stretch gap-8 md:gap-12 lg:grid-cols-[0.95fr_1.05fr]">
      {/* BARIS 1 (Mobile/Tablet) & KOLOM KIRI (Desktop): Teks & CTA */}
      <div className="relative flex flex-col justify-center text-center lg:text-left z-10">
        <HeroBlob className="left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 sm:h-[680px] sm:w-[680px] lg:left-[40%] lg:h-[820px] lg:w-[820px]" />

        <div
          className="relative mt-3 mx-auto max-w-4xl overflow-hidden sm:mt-5 lg:mx-0"
          style={{ height: `${titleBoxHeightPx}px` }}
        >
          <h1
            ref={measureRef}
            aria-hidden
            className="font-[family-name:var(--font-sora)] pointer-events-none absolute inset-x-0 top-0 font-bold tracking-tight"
            style={{ visibility: "hidden", lineHeight: TITLE_LINE_HEIGHT }}
          >
            {longestTitle.title}
          </h1>

          <h1
            className="font-[family-name:var(--font-sora)] relative font-bold tracking-tight text-slate-950"
            style={{ fontSize: `${resolvedFontSizePx}px`, lineHeight: TITLE_LINE_HEIGHT }}
          >
            <span>{titleText}</span>
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] bg-slate-950 align-middle"
              style={{
                opacity: cursorVisible ? 1 : 0,
                animation: cursorVisible ? "hero-cursor-blink 0.9s step-end infinite" : "none",
              }}
            />
          </h1>
        </div>

        <div className="relative mt-4 sm:mt-6 w-full">
          <p aria-hidden className="invisible text-sm leading-6 sm:text-base sm:leading-8 md:text-lg">
            {longestSubtitle.subtitle}
          </p>
          <p
            ref={subtitleRef}
            className="absolute inset-0 text-sm leading-6 text-slate-600 opacity-0 sm:text-base sm:leading-8 md:text-lg"
          >
            {currentSlide.subtitle}
          </p>
        </div>

        <div
          className="hero-fade-in mt-6 sm:mt-8 flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 w-full max-w-sm mx-auto lg:mx-0 sm:max-w-none"
          style={{ animationDelay: "180ms" }}
        >
          <a
            href="/template-website"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 sm:px-6 sm:py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(95,201,74,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primary/90 active:scale-95 text-center cursor-pointer"
          >
            <span>{t.heroShowcase.ctaPrimary}</span>
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-green-200 bg-white/80 backdrop-blur-sm px-5 py-3 sm:px-6 sm:py-3.5 text-sm font-semibold text-brand-primary transition-all duration-200 hover:bg-green-50 hover:-translate-y-0.5 active:scale-95 text-center cursor-pointer"
          >
            <MessageCircle className="size-4" />
            <span>{t.heroShowcase.ctaSecondary}</span>
          </a>
        </div>
      </div>

      {/* BARIS 2 (Mobile/Tablet) & KOLOM KANAN (Desktop): Visual & Model Showcase */}
      <div className="relative mx-auto flex w-full max-w-[640px] items-stretch mt-4 lg:mt-0">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Image src={HERO_RIGHT_BLOB_SRC} alt="" fill className="object-contain opacity-90" priority />
        </div>

        <div className="relative h-full min-h-[320px] xs:min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] w-full overflow-hidden">
          {decorativesVisible &&
            behindCards.map((card) => (
              <HeroDecorativeCard card={card} key={card.id} registerRef={registerDecorative} />
            ))}

          <div ref={modelRef} className="absolute inset-0" style={{ opacity: 0 }}>
            <Image
              src={currentSlide.modelSrc}
              alt={currentSlide.modelAlt}
              fill
              className="object-contain object-bottom"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-x-0 -bottom-8 h-32 sm:h-36 bg-gradient-to-t from-white to-transparent"
            />
          </div>

          {decorativesVisible &&
            frontCards.map((card) => (
              <HeroDecorativeCard card={card} key={card.id} registerRef={registerDecorative} />
            ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-cursor-blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .hero-fade-in {
          opacity: 0;
          animation: hero-fade-in 0.6s ease-out forwards;
        }
        @keyframes hero-fade-in {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
