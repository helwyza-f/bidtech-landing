"use client";

import { useRef, useState, type UIEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Globe, Settings2, Smartphone } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";

const serviceMeta = [
  {
    image: "/images/hero/Visual-3.webp",
    icon: Globe,
    isPopular: false,
  },
  {
    image: "/images/hero/Visual-1.webp",
    icon: Smartphone,
    isPopular: true,
  },
  {
    image: "/images/hero/Visual-2.webp",
    icon: Settings2,
    isPopular: false,
  },
];

function getClosestSlideIndex(slider: HTMLElement) {
  const slides = Array.from(slider.children) as HTMLElement[];

  return slides.reduce(
    (best, slide, index) =>
      Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) < best.distance
        ? { index, distance: Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) }
        : best,
    { index: 0, distance: Number.POSITIVE_INFINITY },
  ).index;
}

function scrollSliderToIndex(slider: HTMLElement | null, nextSlide: number) {
  const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
  const target = Math.max(0, Math.min(nextSlide, slides.length - 1));

  if (slider && slides[target]) {
    slider.scrollTo({ left: slides[target].offsetLeft - slider.offsetLeft, behavior: "smooth" });
  }

  return target;
}

export function ServicesSection() {
  const { t, lang } = useLanguage();
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  const servicesSliderRef = useRef<HTMLDivElement>(null);

  const moveServiceSlide = (nextSlide: number) => {
    setActiveServiceSlide(scrollSliderToIndex(servicesSliderRef.current, nextSlide));
  };

  const handleServiceScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 1024) return;
    setActiveServiceSlide(getClosestSlideIndex(event.currentTarget));
  };

  return (
    <section
      className="landing-panel mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20"
      id="services"
    >
      {/* Section Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <span className="rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#45a02e]">
            {t.services.badge ?? "LAYANAN KUSTOM"}
          </span>
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[42px] leading-tight">
          {lang === "id" ? (
            <>
              Layanan <span className="text-[#45a02e]">Unggulan</span>
            </>
          ) : (
            <>
              Featured <span className="text-[#45a02e]">Services</span>
            </>
          )}
        </h2>
        <p className="mt-3.5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-slate-600">
          {t.services.subtitle}
        </p>
      </Reveal>

      {/* 3-Card Grid / Mobile Responsive Slider */}
      <div
        className="mt-10 flex h-fit w-full snap-x snap-mandatory items-stretch gap-5 overflow-x-auto overflow-y-hidden [scrollbar-width:none] md:mt-12 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        onScroll={handleServiceScroll}
        ref={servicesSliderRef}
      >
        {t.services.items.map((service, index) => {
          const meta = serviceMeta[index] ?? serviceMeta[0];
          const Icon = meta.icon;
          const isPopular = meta.isPopular;

          return (
            <Reveal
              className="flex w-full min-w-full shrink-0 snap-start sm:min-w-[420px] lg:min-w-0 lg:shrink"
              delay={index * 120}
              key={service.title}
              y={30}
            >
              <div
                className={`relative flex w-full flex-col justify-between rounded-[28px] sm:rounded-[32px] bg-white p-5 sm:p-6 transition-all duration-300 ${
                  isPopular
                    ? "border-2 border-[#45a02e] shadow-[0_12px_36px_rgba(69,160,46,0.12)] hover:shadow-[0_22px_48px_rgba(69,160,46,0.2)] hover:-translate-y-1.5"
                    : "border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5"
                }`}
              >
                <div>
                  {/* Top Card Visual Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-slate-100">
                    <Image
                      src={meta.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 380px, 90vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority={index === 0}
                    />
                    {isPopular && (
                      <div className="absolute top-3.5 right-3.5 z-10 rounded-full bg-[#22a348] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                        {t.services.popularBadge ?? "POPULER"}
                      </div>
                    )}
                  </div>

                  {/* Icon & Title Row */}
                  <div className="mt-5 flex items-center gap-3.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#edf8ea] text-[#45a02e]">
                      <Icon className="size-5 text-[#45a02e]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-sora)] text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed min-h-[40px]">
                    {service.description}
                  </p>

                  {/* Features Bullet List */}
                  <ul className="mt-5 space-y-2.5">
                    {service.features.map((feature) => (
                      <li
                        className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-600"
                        key={feature}
                      >
                        <span className="size-2 shrink-0 rounded-full bg-[#45a02e]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-7 pt-2">
                  <a
                    href="#contact"
                    className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isPopular
                        ? "bg-[#45a02e] text-white hover:bg-[#3b8e26] shadow-[0_6px_20px_rgba(69,160,46,0.25)] hover:shadow-[0_8px_24px_rgba(69,160,46,0.35)] hover:-translate-y-0.5 active:scale-95"
                        : "border border-[#45a02e] text-[#45a02e] hover:bg-[#45a02e] hover:text-white hover:-translate-y-0.5 active:scale-95"
                    }`}
                  >
                    {t.services.viewDetail ?? "Lihat Detail"}
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Mobile Slider Navigation Dots & Arrows */}
      <div
        className="mt-7 flex items-center justify-center gap-4 lg:hidden"
        aria-label={t.services.ariaGroupLabel}
      >
        <button
          aria-label={t.services.ariaPrevious}
          aria-disabled={activeServiceSlide === 0}
          className={`flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#45a02e] hover:text-[#45a02e] ${
            activeServiceSlide === 0 ? "cursor-not-allowed opacity-35" : ""
          }`}
          onClick={() => {
            if (activeServiceSlide === 0) return;
            moveServiceSlide(activeServiceSlide - 1);
          }}
          type="button"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div
          className="flex items-center gap-2"
          aria-label={`${t.services.ariaGroupLabel} ${activeServiceSlide + 1} ${t.services.ariaGroupFrom} ${t.services.items.length}`}
        >
          {t.services.items.map((service, index) => (
            <button
              aria-label={`${t.services.ariaViewPrefix} ${service.title}`}
              className={`h-2.5 rounded-full transition-all ${
                activeServiceSlide === index ? "w-8 bg-[#45a02e]" : "w-2.5 bg-slate-300"
              }`}
              key={service.title}
              onClick={() => moveServiceSlide(index)}
              type="button"
            />
          ))}
        </div>

        <button
          aria-label={t.services.ariaNext}
          aria-disabled={activeServiceSlide === t.services.items.length - 1}
          className={`flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#45a02e] hover:text-[#45a02e] ${
            activeServiceSlide === t.services.items.length - 1 ? "cursor-not-allowed opacity-35" : ""
          }`}
          onClick={() => {
            if (activeServiceSlide === t.services.items.length - 1) return;
            moveServiceSlide(activeServiceSlide + 1);
          }}
          type="button"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
