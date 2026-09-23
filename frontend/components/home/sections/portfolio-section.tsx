"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";

export function PortfolioSection() {
  const { t } = useLanguage();
  const items = t.portfolioSection.items;

  // Active index (0 to items.length - 1), default to 1 (Ayo Cuci)
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    containerWidth: 1200,
    cardWidth: 350,
    gap: 20,
  });

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive dimensions for compact cards
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      let cardW = 350;
      let gapW = 20;

      if (width < 480) {
        cardW = Math.min(width - 64, 276);
        gapW = 12;
      } else if (width < 640) {
        cardW = Math.min(width - 56, 290);
        gapW = 14;
      } else if (width < 1024) {
        cardW = 310;
        gapW = 16;
      } else {
        cardW = 350;
        gapW = 20;
      }

      setDimensions({ containerWidth: width, cardWidth: cardW, gap: gapW });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  // Rock-solid auto slide timer (advances every 3.5s, pauses on hover/touch)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const onTouchStart = (e: TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Center offset calculation for active card
  const { containerWidth, cardWidth, gap } = dimensions;
  const activeCenterPos = activeIndex * (cardWidth + gap) + cardWidth / 2;
  const translateX = containerWidth / 2 - activeCenterPos;

  return (
    <section
      className="landing-panel relative overflow-hidden py-10 sm:py-16 md:py-20"
      id="portfolio"
    >
      {/* Ambient green glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(95,201,74,0.14),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 -z-10 h-56 w-full max-w-2xl rounded-full bg-[#5fc94a]/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#45a02e]">
              {t.portfolioSection.badge}
            </span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-[38px] leading-tight">
            {t.portfolioSection.titlePrefix}{" "}
            <span className="text-[#45a02e]">{t.portfolioSection.titleHighlight}</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed text-slate-600">
            {t.portfolioSection.subtitle}
          </p>
        </Reveal>
      </div>

      {/* Centered Carousel Slider Track Container */}
      <div
        className="relative mt-7 sm:mt-10 w-full overflow-hidden touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        ref={containerRef}
      >
        {/* Floating Arrow Navigation Buttons */}
        <button
          aria-label="Portofolio sebelumnya"
          className="absolute left-1.5 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 flex size-8 sm:size-10 lg:size-11 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-slate-700 shadow-md transition-all hover:border-[#45a02e] hover:text-[#45a02e] hover:scale-105 active:scale-95 cursor-pointer"
          onClick={handlePrev}
          type="button"
        >
          <ChevronLeft className="size-4 sm:size-5" />
        </button>

        <button
          aria-label="Portofolio berikutnya"
          className="absolute right-1.5 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 flex size-8 sm:size-10 lg:size-11 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-slate-700 shadow-md transition-all hover:border-[#45a02e] hover:text-[#45a02e] hover:scale-105 active:scale-95 cursor-pointer"
          onClick={handleNext}
          type="button"
        >
          <ChevronRight className="size-4 sm:size-5" />
        </button>

        {/* Sliding Flex Track (Only the 4 displayed items, no clones) */}
        <div
          className="flex items-stretch py-3 transition-transform duration-500 ease-out will-change-transform"
          style={{
            gap: `${gap}px`,
            transform: `translateX(${translateX}px)`,
          }}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                className={`group relative flex shrink-0 flex-col justify-between rounded-[22px] sm:rounded-[26px] bg-white p-4 sm:p-5 transition-all duration-500 select-none ${
                  isActive
                    ? "border-2 border-[#45a02e] shadow-[0_16px_40px_rgba(69,160,46,0.16)] scale-100 z-10 opacity-100"
                    : "border-2 border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] scale-[0.95] opacity-80 hover:opacity-100 hover:border-slate-300 cursor-pointer"
                }`}
                key={item.id}
                onClick={() => {
                  if (!isActive) setActiveIndex(index);
                }}
                style={{ width: `${cardWidth}px` }}
              >
                <div>
                  {/* Visual Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-slate-100 border border-slate-100">
                    <Image
                      alt={item.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      fill
                      sizes="(min-width: 1024px) 350px, 85vw"
                      src={item.image}
                    />
                  </div>

                  {/* Title & Tag Row */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <h3 className="font-[family-name:var(--font-sora)] text-base sm:text-lg font-bold tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                    {item.tagType === "amber" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 tracking-wide shrink-0">
                        {item.tag}
                      </span>
                    ) : (
                      <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed min-h-[52px]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-4 pt-1">
                  <Link
                    className={`block w-full rounded-full py-2.5 text-center text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#45a02e] text-white hover:bg-[#3b8e26] shadow-[0_4px_16px_rgba(69,160,46,0.25)] hover:-translate-y-0.5 active:scale-95"
                        : "border border-[#45a02e] text-[#45a02e] bg-white hover:bg-[#45a02e] hover:text-white hover:-translate-y-0.5 active:scale-95"
                    }`}
                    href={item.href}
                  >
                    {t.portfolioSection.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots with Active Countdown Progress Bar */}
      <div
        aria-label="Paginasi portofolio"
        className="mt-6 sm:mt-7 flex items-center justify-center gap-2"
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              aria-label={`Lihat ${item.title}`}
              className={`relative cursor-pointer transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-8 sm:w-9 rounded-full bg-[#d6f2c9] overflow-hidden"
                  : "h-2.5 w-2.5 rounded-full bg-slate-300 hover:bg-slate-400"
              }`}
              key={item.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              {isActive && (
                <span
                  key={`${activeIndex}-${isPaused}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-[#45a02e]"
                  style={{
                    animationName: "slideProgress",
                    animationDuration: "3500ms",
                    animationTimingFunction: "linear",
                    animationFillMode: "forwards",
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
