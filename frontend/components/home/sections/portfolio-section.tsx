"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";

/* =========================================================================
   AUTHENTIC FULL-SCREEN VECTOR DEVICE FRAMES (Desktop, iPhone, iPad)
   ========================================================================= */

interface DeviceFrameProps {
  imageSrc: string;
  alt: string;
  priority?: boolean;
}

/** 1. Vector Desktop (MacBook / Monitor Frame - Headlight Centerpiece) */
function VectorDesktop({ imageSrc, alt, priority }: DeviceFrameProps) {
  return (
    <div className="relative mx-auto w-[88%] sm:w-[90%] md:w-[92%] transition-all duration-500 drop-shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
      {/* Desktop Display Chassis */}
      <div className="relative rounded-t-[18px] sm:rounded-t-[22px] bg-[#0b0f19] p-2 sm:p-2.5 pb-2 shadow-[0_25px_50px_rgba(0,0,0,0.5)] border-[2.5px] sm:border-[3px] border-[#334155] ring-1 ring-white/10">
        {/* Centered Camera Notch with Lens & Status LED */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-2.5 sm:h-3 bg-[#0b0f19] rounded-b-md z-30 flex items-center justify-center gap-1.5 shadow-sm">
          {/* Camera Lens */}
          <span className="size-1.5 sm:size-2 rounded-full bg-[#020617] ring-1 ring-slate-800 flex items-center justify-center">
            <span className="size-0.5 sm:size-1 rounded-full bg-blue-500/80" />
          </span>
          {/* Green Status LED */}
          <span className="size-0.5 sm:size-1 rounded-full bg-emerald-400 shadow-[0_0_3px_#34d399]" />
        </div>

        {/* 16:10 Full-Screen Display */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px] sm:rounded-[10px] bg-slate-950 shadow-inner">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover object-top transition-opacity duration-500"
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 58vw, 620px"
            priority={priority}
          />
          {/* Specular Diagonal Glass Sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent z-10"
          />
        </div>
      </div>

      {/* Aluminum Unibody Base with Opening Thumb Scoop */}
      <div className="relative h-3 sm:h-4 w-[105%] -left-[2.5%] rounded-b-xl bg-gradient-to-b from-[#64748b] via-[#475569] to-[#1e293b] border-t border-slate-300/40 shadow-2xl flex justify-center">
        <div className="h-1 sm:h-1.5 w-16 sm:w-22 rounded-b-sm bg-[#090d16] shadow-inner" />
      </div>
    </div>
  );
}

/** 2. Vector iPhone (Tilted -7deg, Full-Screen Seamless Display with Zero Cuts) */
function VectorIPhone({ imageSrc, alt, priority }: DeviceFrameProps) {
  return (
    <div
      className="absolute -bottom-3 sm:-bottom-5 -left-1 sm:left-1 md:left-2 w-[24%] sm:w-[25%] md:w-[24%] max-w-[145px] sm:max-w-[165px] z-20 -rotate-[7deg] transform-gpu origin-bottom-center transition-all duration-500 hover:-rotate-[4deg] drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] select-none"
      style={{ willChange: "transform" }}
    >
      {/* Titanium Chassis Enclosure */}
      <div className="relative rounded-[32px] sm:rounded-[36px] bg-[#090d16] p-[3px] sm:p-[3.5px] border-[2.5px] sm:border-[3px] border-[#475569] ring-1 ring-white/10 shadow-2xl">
        {/* Hardware Buttons - Left (Action Button, Volume Up, Volume Down) */}
        <div className="absolute -left-[3.5px] top-10 sm:top-12 w-[2.5px] h-3 bg-slate-400 rounded-l-sm" />
        <div className="absolute -left-[3.5px] top-15 sm:top-18 w-[2.5px] h-5 bg-slate-400 rounded-l-sm" />
        <div className="absolute -left-[3.5px] top-22 sm:top-26 w-[2.5px] h-5 bg-slate-400 rounded-l-sm" />

        {/* Hardware Buttons - Right (Power Button) */}
        <div className="absolute -right-[3.5px] top-14 sm:top-17 w-[2.5px] h-7 sm:h-8 bg-slate-400 rounded-r-sm" />

        {/* 100% Full-Bleed iPhone Screen (No Gaps, Perfectly Clipped) */}
        <div className="relative aspect-[9/18.8] w-full overflow-hidden rounded-[26px] sm:rounded-[30px] bg-slate-950 shadow-inner">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover object-top transition-opacity duration-500"
            sizes="(max-width: 768px) 30vw, 165px"
            priority={priority}
          />

          {/* Authentic Top Notch with Ear-Speaker & Camera Lens */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3 sm:h-3.5 bg-[#090d16] rounded-b-[12px] z-30 flex items-center justify-center gap-1 shadow-sm">
            {/* Front Camera Lens */}
            <span className="size-1.5 rounded-full bg-[#020617] ring-1 ring-slate-800 flex items-center justify-center">
              <span className="size-0.5 rounded-full bg-blue-500/80" />
            </span>
            {/* Ear-Speaker Micro Grille */}
            <span className="w-5 sm:w-6 h-[2px] rounded-full bg-slate-700" />
          </div>

          {/* Specular Diagonal Glass Sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent z-20"
          />

          {/* iOS Bottom Home Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-[2.5px] rounded-full bg-white/70 shadow-sm pointer-events-none z-30" />
        </div>
      </div>
    </div>
  );
}

/** 3. Vector iPad (Tilted +7deg, Full-Screen Seamless Display with Zero Cuts) */
function VectorIPad({ imageSrc, alt, priority }: DeviceFrameProps) {
  return (
    <div
      className="absolute -bottom-2 sm:-bottom-4 -right-1 sm:right-1 md:right-2 w-[31%] sm:w-[32%] md:w-[31%] max-w-[190px] sm:max-w-[220px] z-10 rotate-[7deg] transform-gpu origin-bottom-center transition-all duration-500 hover:rotate-[4deg] drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] select-none"
      style={{ willChange: "transform" }}
    >
      {/* Aluminum Symmetrical Chassis Enclosure */}
      <div className="relative rounded-[22px] sm:rounded-[26px] bg-[#090d16] p-[3px] sm:p-[3.5px] border-[2.5px] sm:border-[3px] border-[#475569] ring-1 ring-white/10 shadow-2xl">
        {/* Hardware Button - Top Power */}
        <div className="absolute -top-[3.5px] right-6 sm:right-8 w-6 sm:w-7 h-[2.5px] bg-slate-400 rounded-t-sm" />
        {/* Hardware Button - Right Volume */}
        <div className="absolute -right-[3.5px] top-7 sm:top-9 w-[2.5px] h-7 sm:h-8 bg-slate-400 rounded-r-sm" />

        {/* 100% Full-Bleed iPad Screen (No Gaps, Perfectly Clipped) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-slate-950 shadow-inner">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover object-top transition-opacity duration-500"
            sizes="(max-width: 768px) 38vw, 220px"
            priority={priority}
          />

          {/* FaceTime HD Camera Dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-[#020617] ring-1 ring-slate-800 flex items-center justify-center shadow-sm z-30">
            <span className="size-0.5 rounded-full bg-blue-500/80" />
          </div>

          {/* Specular Diagonal Glass Sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent z-20"
          />

          {/* iPadOS Bottom Home Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-[2.5px] rounded-full bg-white/70 shadow-sm pointer-events-none z-30" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN PORTFOLIO SECTION (5 SLIDES)
   ========================================================================= */

export function PortfolioSection() {
  const { t } = useLanguage();
  const items = t.portfolioSection.items;
  const itemCount = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const goToSlide = useCallback((newIndex: number) => {
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
    return () => clearTimeout(timeout);
  }, []);

  const handleNext = useCallback(() => {
    goToSlide((currentIndex + 1) % itemCount);
  }, [currentIndex, itemCount, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((currentIndex - 1 + itemCount) % itemCount);
  }, [currentIndex, itemCount, goToSlide]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    goToSlide(index);
  };

  // Autoplay (6s interval, paused on hover or touch)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch Swipe Handlers for mobile
  const onTouchStart = (e: TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current === null || touchEndX.current === null) {
      touchStartX.current = null;
      touchEndX.current = null;
      touchStartY.current = null;
      touchEndY.current = null;
      return;
    }

    const distanceX = touchStartX.current - touchEndX.current;
    const distanceY =
      touchStartY.current !== null && touchEndY.current !== null
        ? touchStartY.current - touchEndY.current
        : 0;
    const minSwipeDistance = 35;

    // Disambiguate horizontal swipe from vertical scrolling
    if (
      Math.abs(distanceX) > minSwipeDistance &&
      Math.abs(distanceX) > Math.abs(distanceY) * 1.2
    ) {
      if (distanceX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  const activeItem = items[currentIndex] || items[0];

  return (
    <section
      className="landing-panel relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
      id="portfolio"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(95,201,74,0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 -z-10 h-64 w-full max-w-3xl rounded-full bg-[#5fc94a]/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-4 sm:px-5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#45a02e]">
              {t.portfolioSection.badge}
            </span>
          </div>
          <h2 className="mt-3 sm:mt-4 font-[family-name:var(--font-sora)] text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight text-slate-950 leading-tight">
            {t.portfolioSection.titlePrefix}{" "}
            <span className="text-[#45a02e]">{t.portfolioSection.titleHighlight}</span>
          </h2>
          <p className="mt-2.5 sm:mt-3 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed text-slate-600">
            {t.portfolioSection.subtitle}
          </p>
        </Reveal>

        {/* Main Showcase Wrapper with Absolute Centered Navigation Arrows */}
        <div
          className="relative mx-auto mt-8 sm:mt-12 lg:mt-16 max-w-6xl px-2 sm:px-8 md:px-12 lg:px-14 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          onTouchStart={onTouchStart}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Carousel Portofolio"
        >
          {/* Consistent Left Arrow Button (Fixed Anchor on Desktop & Tablet) */}
          <button
            aria-label="Portofolio sebelumnya"
            className="hidden sm:flex absolute left-0 lg:-left-2 top-1/2 -translate-y-1/2 size-11 sm:size-12 lg:size-13 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-[#45a02e] hover:text-[#45a02e] hover:scale-105 active:scale-95 cursor-pointer z-30"
            onClick={handlePrev}
            type="button"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>

          {/* Consistent Right Arrow Button (Fixed Anchor on Desktop & Tablet) */}
          <button
            aria-label="Portofolio berikutnya"
            className="hidden sm:flex absolute right-0 lg:-right-2 top-1/2 -translate-y-1/2 size-11 sm:size-12 lg:size-13 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-[#45a02e] hover:text-[#45a02e] hover:scale-105 active:scale-95 cursor-pointer z-30"
            onClick={handleNext}
            type="button"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>

          {/* 2-Column Showcase Content */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 xl:gap-14 items-center">
              
              {/* LEFT COLUMN: Authentic Vector Device Trio (Desktop Headlight + Tilted iPhone & iPad) */}
              <div className="md:col-span-7 w-full">
                <div
                  className={`relative w-full max-w-[440px] sm:max-w-[520px] md:max-w-none mx-auto pt-2 pb-14 sm:pb-16 px-1 sm:px-2 select-none transition-all duration-350 ease-out ${
                    isTransitioning ? "opacity-80 scale-[0.99]" : "opacity-100 scale-100"
                  }`}
                >
                  {/* 1. Desktop Monitor / MacBook (Prominent Headlight Centerpiece) */}
                  <VectorDesktop
                    imageSrc={activeItem.laptopImage || activeItem.image}
                    alt={`${activeItem.title} Desktop View`}
                    priority
                  />

                  {/* 2. Vector iPhone (Left Overlap, Tilted ~-7deg, 100% Full Screen) */}
                  <VectorIPhone
                    imageSrc={activeItem.mobileImage || activeItem.image}
                    alt={`${activeItem.title} iPhone View`}
                    priority
                  />

                  {/* 3. Vector iPad (Right Overlap, Tilted ~+7deg, 100% Full Screen) */}
                  <VectorIPad
                    imageSrc={activeItem.tabletImage || activeItem.image}
                    alt={`${activeItem.title} iPad View`}
                    priority
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Project Information & Details */}
              <div
                className={`md:col-span-5 flex flex-col justify-center text-left transition-all duration-350 ease-out md:min-h-[420px] ${
                  isTransitioning ? "opacity-80 translate-y-0.5" : "opacity-100 translate-y-0"
                }`}
              >
                {/* Solution Title */}
                <h3 className="font-[family-name:var(--font-sora)] text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-950 leading-tight">
                  {activeItem.solutionTitle || "Solusi Digital Kami"}
                </h3>

                {/* Quote Box with Green Accent Left Border */}
                <div className="mt-4 sm:mt-5 border-l-[3.5px] sm:border-l-4 border-[#22c55e] pl-4 sm:pl-5 py-0.5 min-h-[78px] sm:min-h-[88px] flex items-center">
                  <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 sm:text-slate-700 font-normal">
                    “{activeItem.description}”
                  </p>
                </div>

                {/* 3 Metric Stats */}
                <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4 pt-1 sm:pt-2">
                  {activeItem.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span
                        className={`font-[family-name:var(--font-sora)] text-2xl sm:text-3xl font-extrabold tracking-tight ${
                          idx === 1 ? "text-[#22c55e]" : "text-slate-950"
                        }`}
                      >
                        {stat.value}
                      </span>
                      <span className="mt-1 text-xs sm:text-sm font-medium text-slate-500 leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Action Button */}
                <div className="mt-7 sm:mt-9">
                  <Link
                    href={activeItem.href}
                    target={activeItem.href.startsWith("http") ? "_blank" : undefined}
                    rel={activeItem.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#22c55e] px-8 py-3.5 sm:py-4 text-center text-sm sm:text-base font-bold text-white shadow-[0_8px_24px_rgba(34,197,94,0.32)] transition-all duration-300 hover:bg-[#16a34a] hover:shadow-[0_12px_28px_rgba(34,197,94,0.42)] hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer"
                  >
                    {t.portfolioSection.cta}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Slide Controls: Dedicated Consistent Navigation [<] [ • • • • • ] [>] */}
        <div className="mt-6 flex sm:hidden items-center justify-center gap-3">
          <button
            aria-label="Portofolio sebelumnya"
            className="flex size-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm active:scale-90 transition-transform cursor-pointer"
            onClick={handlePrev}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2">
            {items.map((item, index) => {
              const isActive = currentIndex === index;

              return (
                <button
                  aria-label={`Lihat ${item.title}`}
                  className={`cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "h-2 w-7 rounded-full bg-[#22c55e]"
                      : "h-2 w-2 rounded-full bg-slate-200 hover:bg-slate-300"
                  }`}
                  key={item.id}
                  onClick={() => handleDotClick(index)}
                  type="button"
                />
              );
            })}
          </div>

          <button
            aria-label="Portofolio berikutnya"
            className="flex size-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm active:scale-90 transition-transform cursor-pointer"
            onClick={handleNext}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Desktop & Tablet Bottom Pagination Dots (Exactly 5 Dots) */}
        <div
          aria-label="Paginasi portofolio"
          className="mt-8 sm:mt-12 hidden sm:flex items-center justify-center gap-2"
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;

            return (
              <button
                aria-label={`Lihat ${item.title}`}
                className={`cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "h-2 w-7 sm:w-8 rounded-full bg-[#22c55e]"
                    : "h-2 w-2 rounded-full bg-slate-200 hover:bg-slate-300"
                }`}
                key={item.id}
                onClick={() => handleDotClick(index)}
                type="button"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
