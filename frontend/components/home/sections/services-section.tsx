"use client";

import { useRef, useState, type UIEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/animations/reveal";
import { serviceIcons } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const sectionBadgeClass =
  "rounded-full border border-lime-300 bg-lime-50/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-green-700 shadow-sm";

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
  const { t } = useLanguage();
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  const servicesSliderRef = useRef<HTMLDivElement>(null);

  const moveServiceSlide = (nextSlide: number) => {
    setActiveServiceSlide(scrollSliderToIndex(servicesSliderRef.current, nextSlide));
  };

  const handleServiceScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    setActiveServiceSlide(getClosestSlideIndex(event.currentTarget));
  };

  return (
    <section className="landing-panel mx-auto max-w-7xl px-4 pb-14 lg:-mt-16 sm:px-5 sm:pb-16 max-sm:py-16 md:px-8 md:py-20" id="services">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Badge className={sectionBadgeClass}>{t.services.badge}</Badge>
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
          <span>Layanan Unggulan</span> <span className="text-brand-primary">Kami</span>
        </h2>
        <p className="mt-4 leading-7 text-slate-500">{t.services.subtitle}</p>
      </Reveal>

      <div
        className="mt-8 flex h-fit w-full snap-x snap-mandatory items-start gap-4 overflow-x-auto overflow-y-hidden [scrollbar-width:none] md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible lg:grid-cols-3 lg:gap-6 [&::-webkit-scrollbar]:hidden"
        onScroll={handleServiceScroll}
        ref={servicesSliderRef}
      >
        {t.services.items.map((service, index) => (
          <Reveal className="flex w-full min-w-full shrink-0 snap-start md:min-w-0 md:shrink" delay={index * 120} key={service.title} y={34}>
            <Card className="flex min-h-[305px] w-full border-green-100 bg-white !shadow-none transition duration-300 hover:-translate-y-1 hover:border-brand-primary/35 hover:shadow-[0_28px_80px_rgba(95,201,74,0.14)] md:h-full md:min-h-0">
              <CardContent
                className="flex h-full w-full flex-col space-y-5 p-5 md:min-h-[255px] md:p-6"
              >
                <div className="grid min-h-[150px] gap-4 md:min-h-[155px] md:grid-rows-[auto_1fr]">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 ring-1 ring-brand-primary/10">
                      <Image src={serviceIcons[index]} alt="" width={22} height={22} className="size-5" />
                    </div>
                    <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-slate-950">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-500">{service.description}</p>
                </div>
                <ul className="space-y-2 border-t border-green-100 pt-4">
                  {service.features.map((feature) => (
                    <li className="flex items-center gap-2 text-sm text-slate-500" key={feature}>
                      <span className="size-1.5 shrink-0 rounded-full bg-brand-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 md:hidden" aria-label="Navigasi layanan">
        <button
          aria-label="Layanan sebelumnya"
          aria-disabled={activeServiceSlide === 0}
          className={`flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-lime-300 hover:text-brand-primary ${
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

        <div className="flex items-center gap-2" aria-label={`Layanan ${activeServiceSlide + 1} dari ${t.services.items.length}`}>
          {t.services.items.map((service, index) => (
            <button
              aria-label={`Lihat ${service.title}`}
              className={`h-2.5 rounded-full transition-all ${
                activeServiceSlide === index ? "w-8 bg-brand-primary" : "w-2.5 bg-zinc-600"
              }`}
              key={service.title}
              onClick={() => moveServiceSlide(index)}
              type="button"
            />
          ))}
        </div>

        <button
          aria-label="Layanan berikutnya"
          aria-disabled={activeServiceSlide === t.services.items.length - 1}
          className={`flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-lime-300 hover:text-brand-primary ${
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
