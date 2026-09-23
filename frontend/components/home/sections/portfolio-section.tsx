"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";

const REPEAT_COUNT = 7;
const BASE_SET = 3;

export function PortfolioSection() {
  const { t } = useLanguage();
  const items = t.portfolioSection.items;
  const itemCount = items.length;

  // Start with Ayo Cuci (index 1) in the canonical center set (BASE_SET = 3)
  const [currentIndex, setCurrentIndex] = useState(() => BASE_SET * itemCount + 1);
  const [enableTransition, setEnableTransition] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({
    containerWidth: 1200,
    cardWidth: 360,
    gap: 20,
    isThreeCardView: true,
  });

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Responsive dimensions: exactly 3 cards in the viewport on desktop/tablet, centered 1 card on mobile
  useEffect(() => {
    const updateDimensions = () => {
      const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      const isThree = windowWidth >= 768;

      let cardW = 360;
      let gapW = 20;

      if (windowWidth < 340) {
        // Ultra-compact mobile (Fold 280px, SE 320px)
        cardW = Math.round(windowWidth * 0.8);
        gapW = 8;
      } else if (windowWidth < 480) {
        // Standard mobile (360px - 430px)
        cardW = Math.round(windowWidth * 0.82);
        gapW = 12;
      } else if (windowWidth < 768) {
        // Phablet (480px - 767px)
        cardW = 340;
        gapW = 16;
      } else if (windowWidth < 1024) {
        // Tablet (768px - 1023px) - exactly 3 cards in slide
        const available = Math.min(windowWidth - 110, 880);
        gapW = 14;
        cardW = Math.floor((available - 2 * gapW) / 3);
      } else if (windowWidth < 1280) {
        // Small Laptop (1024px - 1279px) - exactly 3 cards in slide
        const available = Math.min(windowWidth - 120, 1060);
        gapW = 18;
        cardW = Math.floor((available - 2 * gapW) / 3);
      } else {
        // Standard Desktop / Large screen (>= 1280px) - exactly 3 cards in slide
        gapW = 20;
        cardW = 360;
      }

      const containerW = containerRef.current ? containerRef.current.offsetWidth : windowWidth;

      setDimensions({
        containerWidth: containerW,
        cardWidth: cardW,
        gap: gapW,
        isThreeCardView: isThree,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Multi-copy infinite items list
  const extendedItems = useMemo(() => {
    const result: Array<
      (typeof items)[number] & {
        virtualIndex: number;
        originalIndex: number;
        uniqueKey: string;
      }
    > = [];

    for (let set = 0; set < REPEAT_COUNT; set++) {
      for (let i = 0; i < itemCount; i++) {
        const virtualIndex = set * itemCount + i;
        result.push({
          ...items[i],
          virtualIndex,
          originalIndex: i,
          uniqueKey: `portfolio-set-${set}-${items[i].id}-${virtualIndex}`,
        });
      }
    }
    return result;
  }, [items, itemCount]);

  // Handle re-enabling transitions after silent wrap-around reset
  useEffect(() => {
    if (!enableTransition) {
      const id1 = requestAnimationFrame(() => {
        const id2 = requestAnimationFrame(() => {
          setEnableTransition(true);
        });
        return () => cancelAnimationFrame(id2);
      });
      return () => cancelAnimationFrame(id1);
    }
  }, [enableTransition]);

  const handleNext = useCallback(() => {
    setEnableTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setEnableTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Silent snap when sliding into edge sets to ensure seamless infinite loop
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current) return;
    const normalized = ((currentIndex % itemCount) + itemCount) % itemCount;

    // If drifted away from the center set (Set 2 or Set 4 and beyond)
    if (currentIndex < 2 * itemCount || currentIndex >= 4 * itemCount) {
      setEnableTransition(false);
      setCurrentIndex(BASE_SET * itemCount + normalized);
    }
  };

  // Dot navigation: find shortest circular direction
  const handleDotClick = (targetOriginalIndex: number) => {
    setEnableTransition(true);
    const currentNormalized =
      ((currentIndex % itemCount) + itemCount) % itemCount;
    let diff = targetOriginalIndex - currentNormalized;
    if (diff > itemCount / 2) diff -= itemCount;
    if (diff < -itemCount / 2) diff += itemCount;
    if (diff !== 0) {
      setCurrentIndex((prev) => prev + diff);
    }
  };

  // Clicking a visible side card smoothly centers it
  const handleCardClick = (targetVirtualIndex: number) => {
    if (targetVirtualIndex === currentIndex) return;
    setEnableTransition(true);
    setCurrentIndex(targetVirtualIndex);
  };

  // Autoplay timer (4s, pauses on hover/touch)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch Swipe Handlers for mobile
  const onTouchStart = (e: TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current === null || touchEndX.current === null) {
      touchStartX.current = null;
      touchEndX.current = null;
      touchStartY.current = null;
      return;
    }

    const distanceX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 35; // Responsive sensitivity for mobile

    if (distanceX > minSwipeDistance) {
      handleNext();
    } else if (distanceX < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
  };

  // Desktop Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true);
    dragStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsPaused(false);
    if (!isDragging.current || dragStartX.current === null) return;
    const distance = dragStartX.current - e.clientX;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    dragStartX.current = null;
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    dragStartX.current = null;
    isDragging.current = false;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  // Center offset calculation:
  // On desktop/tablet (isThreeCardView): exactly 3 cards fit in the viewport, center card at index 1
  // On mobile (<768px): single card centered with peek
  const { containerWidth, cardWidth, gap, isThreeCardView } = dimensions;
  const translateX = isThreeCardView
    ? (cardWidth + gap) * (1 - currentIndex)
    : containerWidth / 2 - (currentIndex * (cardWidth + gap) + cardWidth / 2);
  const realActiveIndex = ((currentIndex % itemCount) + itemCount) % itemCount;

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
            <span className="rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-4 sm:px-5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#45a02e]">
              {t.portfolioSection.badge}
            </span>
          </div>
          <h2 className="mt-3 sm:mt-4 font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-[38px] leading-tight">
            {t.portfolioSection.titlePrefix}{" "}
            <span className="text-[#45a02e]">{t.portfolioSection.titleHighlight}</span>
          </h2>
          <p className="mt-2.5 sm:mt-3 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed text-slate-600">
            {t.portfolioSection.subtitle}
          </p>
        </Reveal>
      </div>

      {/* Centered Infinite Carousel Slider Track Container */}
      <div className="relative mx-auto mt-6 sm:mt-10 flex w-full max-w-7xl items-center justify-center gap-2 sm:gap-3 lg:gap-5 px-2 sm:px-4">
        {/* Desktop / Tablet Floating Side Navigation Buttons */}
        <button
          aria-label="Portofolio sebelumnya"
          className="hidden sm:flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200/90 text-slate-700 shadow-md transition-all hover:border-[#45a02e] hover:text-[#45a02e] hover:scale-105 active:scale-95 cursor-pointer z-20"
          onClick={handlePrev}
          type="button"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* 3-Card Viewport on Desktop / 1-Card Centered on Mobile */}
        <div
          className="relative overflow-hidden touch-pan-y focus:outline-none py-3 sm:py-5"
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          onTouchStart={onTouchStart}
          ref={containerRef}
          style={{
            width: isThreeCardView
              ? `${cardWidth * 3 + gap * 2}px`
              : "100%",
            maxWidth: "100%",
          }}
          tabIndex={0}
        >
          {/* Sliding Flex Track with Continuous Looping */}
          <div
            className="flex items-stretch select-none will-change-transform"
            onTransitionEnd={handleTransitionEnd}
            ref={trackRef}
            style={{
              gap: `${gap}px`,
              transform: `translateX(${translateX}px)`,
              transition: enableTransition
                ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
          {extendedItems.map((item) => {
            const isActive = item.virtualIndex === currentIndex;

            return (
              <div
                className={`group relative flex shrink-0 flex-col justify-between rounded-[20px] sm:rounded-[26px] bg-white p-3.5 sm:p-5 transition-all duration-500 select-none ${
                  isActive
                    ? "border-2 border-[#45a02e] shadow-[0_12px_32px_rgba(69,160,46,0.16)] sm:shadow-[0_16px_40px_rgba(69,160,46,0.16)] scale-100 z-10 opacity-100"
                    : "border-2 border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] scale-[0.95] opacity-75 sm:opacity-80 hover:opacity-100 hover:border-slate-300 cursor-pointer"
                }`}
                key={item.uniqueKey}
                onClick={() => {
                  if (!isActive) handleCardClick(item.virtualIndex);
                }}
                style={{ width: `${cardWidth}px` }}
              >
                <div>
                  {/* Visual Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] sm:rounded-[16px] bg-slate-100 border border-slate-100">
                    <Image
                      alt={item.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      draggable={false}
                      fill
                      sizes="(min-width: 1024px) 400px, 85vw"
                      src={item.image}
                    />
                  </div>

                  {/* Title & Tag Row */}
                  <div className="mt-3 sm:mt-4 flex items-center justify-between gap-1.5 sm:gap-2">
                    <h3 className="font-[family-name:var(--font-sora)] text-sm sm:text-base lg:text-lg font-bold tracking-tight text-slate-900 truncate">
                      {item.title}
                    </h3>
                    {item.tagType === "amber" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/80 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-amber-700 tracking-wide shrink-0">
                        {item.tag}
                      </span>
                    ) : (
                      <span className="rounded-md bg-slate-100 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-2 sm:mt-2.5 text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3 min-h-[46px] sm:min-h-[52px]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-3 sm:mt-4 pt-1">
                  {isActive ? (
                    <Link
                      className="block w-full rounded-full py-2 sm:py-2.5 text-center text-xs sm:text-sm font-semibold bg-[#45a02e] text-white hover:bg-[#3b8e26] shadow-[0_4px_16px_rgba(69,160,46,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                      href={item.href}
                    >
                      {t.portfolioSection.cta}
                    </Link>
                  ) : (
                    <button
                      className="block w-full rounded-full py-2 sm:py-2.5 text-center text-xs sm:text-sm font-semibold border border-[#45a02e] text-[#45a02e] bg-white hover:bg-[#45a02e] hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(item.virtualIndex);
                      }}
                      type="button"
                    >
                      {t.portfolioSection.cta}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Desktop / Tablet Right Arrow Button */}
        <button
          aria-label="Portofolio berikutnya"
          className="hidden sm:flex size-10 lg:size-12 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200/90 text-slate-700 shadow-md transition-all hover:border-[#45a02e] hover:text-[#45a02e] hover:scale-105 active:scale-95 cursor-pointer z-20"
          onClick={handleNext}
          type="button"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Mobile Navigation Controls: Ergonomic Bottom Controls with [<] [ • • • • ] [>] */}
      <div className="mt-5 flex sm:hidden items-center justify-center gap-3">
        <button
          aria-label="Portofolio sebelumnya"
          className="flex size-8 xs:size-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm active:scale-90 transition-transform cursor-pointer"
          onClick={handlePrev}
          type="button"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((item, index) => {
            const isActive = realActiveIndex === index;

            return (
              <button
                aria-label={`Lihat ${item.title}`}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "h-2 w-7 rounded-full bg-[#d6f2c9] overflow-hidden"
                    : "h-2 w-2 rounded-full bg-slate-300 hover:bg-slate-400"
                }`}
                key={item.id}
                onClick={() => handleDotClick(index)}
                type="button"
              >
                {isActive && (
                  <span
                    key={`mob-${realActiveIndex}-${isPaused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-[#45a02e]"
                    style={{
                      animationName: "slideProgress",
                      animationDuration: "4000ms",
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

        <button
          aria-label="Portofolio berikutnya"
          className="flex size-8 xs:size-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm active:scale-90 transition-transform cursor-pointer"
          onClick={handleNext}
          type="button"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Desktop & Tablet Pagination Dots with Active Countdown Progress Bar */}
      <div
        aria-label="Paginasi portofolio"
        className="mt-6 sm:mt-8 hidden sm:flex items-center justify-center gap-2"
      >
        {items.map((item, index) => {
          const isActive = realActiveIndex === index;

          return (
            <button
              aria-label={`Lihat ${item.title}`}
              className={`relative cursor-pointer transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-8 sm:w-9 rounded-full bg-[#d6f2c9] overflow-hidden"
                  : "h-2.5 w-2.5 rounded-full bg-slate-300 hover:bg-slate-400"
              }`}
              key={item.id}
              onClick={() => handleDotClick(index)}
              type="button"
            >
              {isActive && (
                <span
                  key={`desk-${realActiveIndex}-${isPaused}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-[#45a02e]"
                  style={{
                    animationName: "slideProgress",
                    animationDuration: "4000ms",
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


