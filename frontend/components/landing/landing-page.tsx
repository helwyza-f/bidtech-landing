"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Mail, MapPin, MessageCircleMore, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/landing/contact-form";
import { Reveal } from "@/components/landing/reveal";
import { StatCounter } from "@/components/landing/stat-counter";
import { serviceIcons, specializationIcons, specializationImages } from "@/lib/data";
import { LandingPageProvider, heroShowcaseSlides, useLandingPage } from "@/providers/landing-page-provider";
import { brandClasses } from "@/lib/data";
import { clientLogos, logoAssets } from "@/lib/data";

const sectionBadgeClass =
  "rounded-full border border-lime-300 bg-lime-50/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-green-700 shadow-sm";

export function LandingPage() {
  return (
    <LandingPageProvider>
      <LandingPageView />
    </LandingPageProvider>
  );
}

function LandingPageView() {
  const {
    t,
    activeHeroSlide,
    activeHowItWorksPage,
    activeProductSlide,
    activeProductTab,
    activeServiceSlide,
    activeSpecializationSlide,
    activeStep,
    heroShowcase,
    heroTitleMobileFirstLine,
    heroTitleMobileSecondLine,
    howItWorksPages,
    howItWorksSliderRef,
    productSliderRef,
    servicesSliderRef,
    specializationsSliderRef,
    testimonialsRef,
    activateProductTab,
    activateStep,
    handleHowItWorksScroll,
    handleProductScroll,
    handleServiceScroll,
    handleSpecializationScroll,
    moveHowItWorksSlide,
    moveProductSlide,
    moveServiceSlide,
    moveSpecializationSlide,
    showHeroSlide,
  } = useLandingPage();

  return (
    <main className="landing-shell relative overflow-hidden bg-white">
      <section className="landing-panel relative overflow-hidden bg-white text-slate-950" id="hero">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_18%_20%,rgba(95,201,74,0.13),transparent_28%),radial-gradient(circle_at_78%_14%,rgba(38,63,143,0.08),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-5 sm:py-16 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
          <div className="text-center lg:text-left">
            <Reveal y={14}>
              <div className="flex justify-center lg:justify-start">
                <Badge className={sectionBadgeClass}>{t.hero.badge}</Badge>
              </div>
            </Reveal>
            <Reveal delay={90} y={18}>
              <h1 className="mt-5 max-w-4xl font-[Tahoma,Arial,sans-serif] text-3xl font-normal leading-tight tracking-tight text-slate-950 sm:text-4xl md:mt-6 md:text-5xl lg:text-6xl">
                <span className="block sm:hidden">{heroTitleMobileFirstLine}</span>
                <span className="block sm:hidden">{heroTitleMobileSecondLine}</span>
                <span className={`block sm:hidden ${brandClasses.textPrimary}`}>{t.hero.titleLine2Green}</span>
                <span className="hidden sm:block">{t.hero.titleLine1}</span>
                <span className="hidden sm:block">
                  {t.hero.titleLine2White} <span className={brandClasses.textPrimary}>{t.hero.titleLine2Green}</span>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={180} y={16}>
              <p className="mt-6 w-full text-base leading-8 text-slate-600 md:text-lg lg:mx-0">{t.hero.subtitle}</p>
            </Reveal>

            <Reveal delay={270} y={16}>
              <div className="mt-8 flex justify-center lg:justify-start">
              <a
                className="inline-flex h-14 w-full max-w-[260px] items-center justify-between rounded-full bg-brand-primary px-6 text-base font-bold text-brand-primary-dark shadow-[0_18px_42px_rgba(95,201,74,0.24)] ring-1 ring-green-700/10 transition hover:-translate-y-0.5 hover:bg-brand-primary-hover sm:w-auto sm:min-w-[260px]"
                href="https://wa.me/628217601455"
                rel="noreferrer"
                target="_blank"
              >
                <span className="flex items-center gap-3">
                  <span className="relative flex size-7 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                    <Image alt={logoAssets.whatsapp.alt} src={logoAssets.whatsapp.src} fill className="object-contain p-1" />
                  </span>
                  {t.hero.ctaPrimary}
                </span>
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-primary-dark text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                  <ArrowRight className="size-4" />
                </span>
              </a>
              </div>
            </Reveal>

            <Reveal delay={340} y={14}>
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold text-slate-600 lg:justify-start">
                <span className="rounded-full border border-green-100 bg-white px-4 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">Website siap jualan</span>
                <span className="rounded-full border border-green-100 bg-white px-4 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">Aplikasi custom</span>
                <span className="rounded-full border border-green-100 bg-white px-4 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">Support teknis</span>
              </div>
            </Reveal>

          </div>

          <Reveal delay={180} y={26}>
            <div className="relative mx-auto w-full max-w-[590px]">
              <div className="absolute -left-4 top-8 h-28 w-28 rounded-full bg-brand-primary/15 blur-3xl" />
              <div className="absolute -right-6 bottom-10 h-36 w-36 rounded-full bg-brand-cta/10 blur-3xl" />
              <div className="relative rounded-[28px] border border-green-100 bg-white p-3 shadow-[0_28px_90px_rgba(15,23,42,0.12)]">
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-950">
                  <div className="relative aspect-[16/10]">
                    {heroShowcaseSlides.map((slide, index) => (
                      <Image
                        src={slide.webImage}
                        alt={`${slide.name} website preview`}
                        fill
                        draggable={false}
                        priority={index === 0}
                        sizes="(min-width: 1024px) 48vw, 92vw"
                        className={`pointer-events-none select-none object-cover object-top transition-opacity duration-700 ${
                          activeHeroSlide === index ? "opacity-100" : "opacity-0"
                        }`}
                        key={slide.name}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-5 hidden w-44 overflow-hidden rounded-2xl border border-green-100 bg-white p-2 shadow-[0_18px_55px_rgba(15,23,42,0.16)] sm:block">
                  <div className="relative aspect-[4/3] rounded-xl bg-slate-950">
                    {heroShowcaseSlides.map((slide, index) => (
                      <Image
                        src={slide.mobileImage}
                        alt={`${slide.mobileLabel} preview`}
                        fill
                        draggable={false}
                        sizes="176px"
                        className={`pointer-events-none select-none object-cover object-top transition-opacity duration-700 ${
                          activeHeroSlide === index ? "opacity-100" : "opacity-0"
                        }`}
                        key={slide.mobileLabel}
                      />
                    ))}
                  </div>
                  <p className="mt-2 px-1 text-xs font-semibold text-slate-700">{heroShowcase.mobileLabel}</p>
                </div>
                <div className="absolute right-2 top-4 max-w-[34%] rounded-2xl border border-green-100 bg-white px-3 py-2.5 shadow-[0_16px_45px_rgba(15,23,42,0.12)] sm:-right-4 sm:top-7 sm:max-w-none sm:px-4 sm:py-3">
                  <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                    {heroShowcase.metricLabel}
                  </p>
                  <p className="mt-0.5 text-xl font-bold leading-none text-slate-950 sm:mt-1 sm:text-2xl">
                    {heroShowcase.metricValue}
                  </p>
                </div>
              </div>
              <div className="mt-7 flex justify-center">
                <div className="flex rounded-full border border-green-100 bg-white px-2.5 py-2 shadow-[0_14px_38px_rgba(15,23,42,0.08)]">
                  {heroShowcaseSlides.map((slide, index) => (
                    <button
                      aria-label={`Tampilkan ${slide.name}`}
                      className={`mx-1 h-2 rounded-full transition-all ${
                        activeHeroSlide === index ? "w-6 bg-slate-950" : "w-2 bg-slate-300"
                      }`}
                      key={slide.name}
                      onClick={() => showHeroSlide(index)}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative mx-auto max-w-7xl px-4 pb-4 sm:px-5 md:px-8 lg:pb-6" delay={420} y={14}>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Our Client</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
              {clientLogos.map((client) => (
                <Image
                  key={client.name}
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={36}
                  className="h-6 w-auto object-contain opacity-75 brightness-0 sm:h-7"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-4 mb-4 mt-6 grid max-w-7xl grid-cols-2 gap-2.5 sm:mx-5 sm:mb-6 sm:mt-8 sm:gap-3 md:mx-8 lg:mx-auto lg:mb-8 lg:mt-10 lg:grid-cols-4 lg:gap-4" aria-label="BidTech stats">
        {t.stats.map((stat, index) => (
          <div className="flex min-h-[122px] flex-col items-center justify-center rounded-[20px] border border-green-100 bg-white px-3 py-5 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:min-h-[132px] sm:rounded-[24px] sm:px-5 sm:py-6" key={stat.label}>
            <p className="font-[family-name:var(--font-sora)] text-3xl font-bold text-brand-primary md:text-4xl">
              <StatCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 w-full text-center text-[10px] uppercase leading-5 tracking-wider text-slate-500 sm:text-xs sm:tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="landing-panel mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="services">
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
          className="mt-8 flex w-full snap-x snap-mandatory items-stretch gap-4 overflow-x-auto [scrollbar-width:none] md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible lg:grid-cols-3 lg:gap-6 [&::-webkit-scrollbar]:hidden"
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

      <section className="landing-panel relative mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute inset-x-4 top-28 -z-10 h-[72%] rounded-[48px] bg-[radial-gradient(circle_at_18%_20%,rgba(95,201,74,0.10),transparent_34%),radial-gradient(circle_at_80%_42%,rgba(95,201,74,0.08),transparent_30%)]" />
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Badge className={sectionBadgeClass}>{t.specializations.badge}</Badge>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
            {t.specializations.title.split(" ")[0]}{" "}
              <span className="text-brand-primary">{t.specializations.title.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">{t.specializations.subtitle}</p>
        </Reveal>

        <div
          className="mt-10 flex w-full snap-x snap-mandatory items-stretch gap-5 overflow-x-auto [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          onScroll={handleSpecializationScroll}
          ref={specializationsSliderRef}
        >
          {t.specializations.items.map((item, index) => (
            <Reveal className="flex w-full min-w-full shrink-0 snap-start sm:min-w-0 sm:shrink" delay={(index % 4) * 90} key={item.title} y={30}>
              <div className="flex min-h-[320px] w-full flex-col overflow-hidden rounded-[24px] border border-green-100 bg-white !shadow-none transition duration-300 hover:-translate-y-1 hover:border-brand-primary/35 hover:shadow-[0_24px_64px_rgba(95,201,74,0.14)] sm:h-full sm:min-h-[292px] sm:shadow-[0_16px_48px_rgba(15,23,42,0.07)]">
                <div className="m-3 mb-0 flex h-[205px] items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#f1fbef,#e9f7ee)] p-1.5 sm:aspect-[16/10.5] sm:h-auto">
                  <div className="relative h-full w-full">
                    <Image
                      src={specializationImages[index]}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain object-center p-2 drop-shadow-[0_14px_22px_rgba(15,23,42,0.18)]"
                    />
                  </div>
                </div>
                <div className="m-3 mt-0 flex min-h-[104px] flex-1 items-start gap-3 rounded-[18px] bg-white px-3 py-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 ring-1 ring-brand-primary/10">
                    <Image src={specializationIcons[index]} alt="" width={18} height={18} className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-[family-name:var(--font-sora)] text-[15px] font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">{item.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden" aria-label="Navigasi spesialisasi">
          <button
            aria-label="Spesialisasi sebelumnya"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-brand-primary/40 hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeSpecializationSlide === 0}
            onClick={() => moveSpecializationSlide(activeSpecializationSlide - 1)}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div
            className="flex items-center gap-1.5"
            aria-label={`Spesialisasi ${activeSpecializationSlide + 1} dari ${t.specializations.items.length}`}
          >
            {t.specializations.items.map((item, index) => (
              <button
                aria-label={`Lihat ${item.title}`}
                className={`h-2 rounded-full transition-all ${
                  activeSpecializationSlide === index ? "w-6 bg-brand-primary" : "w-2 bg-slate-300"
                }`}
                key={item.title}
                onClick={() => moveSpecializationSlide(index)}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Spesialisasi berikutnya"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-brand-primary/40 hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeSpecializationSlide === t.specializations.items.length - 1}
            onClick={() => moveSpecializationSlide(activeSpecializationSlide + 1)}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </section>

      <section className="landing-panel relative mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="portfolio">
        <div className="pointer-events-none absolute inset-x-4 top-20 -z-10 h-[78%] rounded-[48px] bg-[radial-gradient(circle_at_20%_18%,rgba(95,201,74,0.12),transparent_32%),radial-gradient(circle_at_86%_42%,rgba(95,201,74,0.08),transparent_34%)]" />
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge className={sectionBadgeClass}>Our Products</Badge>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
            {t.products.titleWhite} <span className="text-brand-primary">{t.products.titleGreen}</span> {t.products.titleWhiteEnd}
          </h2>
          <p className="mt-4 leading-7 text-slate-500">{t.products.subtitle}</p>
        </Reveal>

        <div className="relative z-20 mt-8 flex flex-wrap justify-center gap-3">
          {t.products.tabs.map((tab, index) => (
            <button
              className={`relative z-10 touch-manipulation rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition supports-[hover:hover]:hover:border-brand-primary/50 supports-[hover:hover]:hover:text-brand-primary sm:px-6 sm:py-2.5 sm:text-sm sm:tracking-widest ${
                activeProductTab === index
                  ? "border-brand-primary bg-brand-primary text-slate-950 shadow-[0_12px_30px_rgba(95,201,74,0.18)]"
                  : "border-green-100 bg-white text-slate-500 shadow-sm"
              }`}
              key={tab.key}
              onClick={() => activateProductTab(index)}
              onPointerUp={(event) => {
                if (event.pointerType !== "mouse") {
                  activateProductTab(index);
                }
              }}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="mt-8 flex w-full snap-x snap-mandatory items-stretch gap-4 overflow-x-auto [scrollbar-width:none] md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible lg:grid-cols-3 lg:gap-6 [&::-webkit-scrollbar]:hidden"
          onScroll={handleProductScroll}
          ref={productSliderRef}
        >
          {t.products.tabs[activeProductTab].items.map((product) => (
            <Card className="flex min-h-[512px] w-full min-w-full shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border-green-100 bg-white p-0 !shadow-none transition duration-300 hover:-translate-y-1 hover:border-brand-primary/35 hover:shadow-[0_26px_72px_rgba(95,201,74,0.14)] md:min-h-0 md:min-w-0 md:shrink md:shadow-[0_18px_58px_rgba(15,23,42,0.08)]" key={product.title}>
              <div className="bg-[linear-gradient(135deg,#f2fbef,#ffffff)] p-4">
                <div className="flex h-[210px] items-center justify-center overflow-hidden rounded-[20px] border border-white bg-[#eef8ee] p-2 shadow-[inset_0_0_0_1px_rgba(95,201,74,0.08)] sm:h-[250px] md:h-[230px] lg:h-[250px]">
                  <div className="flex h-full w-full items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={600}
                      height={400}
                      className="h-full w-full rounded-2xl object-contain object-center drop-shadow-[0_14px_24px_rgba(15,23,42,0.12)]"
                    />
                  </div>
                </div>
              </div>
              <CardContent className="flex flex-1 flex-col space-y-3 px-5 pb-6 pt-1 sm:px-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{product.tag}</span>
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-slate-950">{product.title}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{product.subtitle}</p>
                <p className="text-sm leading-6 text-slate-500">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden" aria-label="Navigasi produk">
          <button
            aria-label="Produk sebelumnya"
            className="flex size-10 items-center justify-center rounded-full border border-green-100 bg-white text-slate-700 transition hover:border-brand-primary/40 hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeProductSlide === 0}
            onClick={() => moveProductSlide(Math.max(0, activeProductSlide - 1))}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {t.products.tabs[activeProductTab].items.map((product, index) => (
              <button
                aria-label={`Lihat ${product.title}`}
                className={`h-2 rounded-full transition-all ${
                  activeProductSlide === index ? "w-6 bg-brand-primary" : "w-2 bg-slate-300"
                }`}
                key={product.title}
                onClick={() => moveProductSlide(index)}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Produk berikutnya"
            className="flex size-10 items-center justify-center rounded-full border border-green-100 bg-white text-slate-700 transition hover:border-brand-primary/40 hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeProductSlide === t.products.tabs[activeProductTab].items.length - 1}
            onClick={() => moveProductSlide(Math.min(t.products.tabs[activeProductTab].items.length - 1, activeProductSlide + 1))}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </section>

      <div className="bg-[#edf6e8]">
      <section className="landing-panel mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge className={sectionBadgeClass}>{t.howItWorks.badge}</Badge>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
            {t.howItWorks.titleWhite} <span className="text-brand-primary">{t.howItWorks.titleGreen}</span>
          </h2>
        </Reveal>

        <div
          className="relative mt-14 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-4 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
          onScroll={handleHowItWorksScroll}
          ref={howItWorksSliderRef}
        >
          {t.howItWorks.steps.map((step, index) => (
            <div
              className="relative z-10 flex min-h-64 w-[calc(50%_-_0.375rem)] min-w-[calc(50%_-_0.375rem)] shrink-0 snap-start flex-col items-center rounded-2xl border border-green-900/10 bg-white px-3 py-6 text-center transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand-primary/40 sm:min-h-60 sm:w-auto sm:min-w-0 sm:shrink lg:min-h-64 lg:px-4"
              key={step.title}
            >
              <div className="relative flex h-10 w-full items-center justify-center">
                <button
                  aria-label={`${step.title} (${index + 1})`}
                  className={`relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                    activeStep === index
                      ? "scale-110 border-brand-primary bg-brand-primary text-black shadow-[0_0_0_6px_rgba(99,224,9,0.15)]"
                      : index < activeStep
                        ? "border-brand-primary bg-brand-primary/20 text-brand-primary"
                        : "border-slate-900/20 bg-white/70 text-slate-900 hover:border-green-600/50"
                  }`}
                  onClick={() => activateStep(index)}
                  type="button"
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              </div>
              <h3
                className={`mt-5 font-[family-name:var(--font-sora)] text-sm font-semibold transition-colors duration-300 sm:text-base ${
                  activeStep === index ? "text-brand-primary" : "text-slate-950"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-3 text-xs leading-5 transition-colors duration-300 sm:text-sm sm:leading-6 ${
                  activeStep === index ? "text-slate-700" : "text-slate-600"
                }`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden" aria-label="Navigasi how it works">
          <button
            aria-label="Langkah sebelumnya"
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-400 bg-white text-slate-700 transition hover:border-slate-500 hover:text-slate-900 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-white disabled:text-slate-500"
            disabled={activeHowItWorksPage === 0}
            onClick={() => moveHowItWorksSlide(Math.max(0, activeHowItWorksPage * 2 - 2))}
            type="button"
          >
            <ChevronLeft className="size-5 stroke-[2.25]" />
          </button>

          <div className="flex items-center gap-2.5">
            {Array.from({ length: howItWorksPages }).map((_, pageIndex) => (
              <button
                aria-label={`Lihat langkah ${pageIndex + 1}`}
                className={`h-2 rounded-full transition-all ${
                  activeHowItWorksPage === pageIndex ? "w-8 bg-brand-primary" : "w-2.5 bg-slate-600"
                }`}
                key={`how-it-works-dot-${pageIndex}`}
                onClick={() => moveHowItWorksSlide(pageIndex * 2)}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Langkah berikutnya"
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-400 bg-white text-slate-700 transition hover:border-slate-500 hover:text-slate-900 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-white disabled:text-slate-500"
            disabled={activeHowItWorksPage >= howItWorksPages - 1}
            onClick={() => moveHowItWorksSlide(Math.min(t.howItWorks.steps.length - 1, activeHowItWorksPage * 2 + 2))}
            type="button"
          >
            <ChevronRight className="size-5 stroke-[2.25]" />
          </button>
        </div>

        <div className="hidden mt-14 sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {t.howItWorks.steps.map((step, index) => (
            <div
              className="flex min-h-64 flex-col items-center rounded-2xl border border-green-900/10 bg-white px-3 py-6 text-center shadow-[0_8px_28px_rgba(31,80,20,0.08)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_14px_34px_rgba(31,80,20,0.13)] lg:min-h-64 lg:px-4"
              key={step.title}
            >
              <div className="relative flex h-10 w-full items-center justify-center">
                <button
                  aria-label={`${step.title} (${index + 1})`}
                  className={`relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                    activeStep === index
                      ? "scale-110 border-brand-primary bg-brand-primary text-black shadow-[0_0_0_6px_rgba(99,224,9,0.15)]"
                      : index < activeStep
                        ? "border-brand-primary bg-brand-primary/20 text-brand-primary"
                        : "border-slate-900/20 bg-white/70 text-slate-900 hover:border-green-600/50"
                  }`}
                  onClick={() => activateStep(index)}
                  type="button"
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              </div>
              <h3
                className={`mt-5 font-[family-name:var(--font-sora)] text-sm font-semibold transition-colors duration-300 sm:text-base ${
                  activeStep === index ? "text-brand-primary" : "text-slate-950"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-3 text-xs leading-5 transition-colors duration-300 sm:text-sm sm:leading-6 ${
                  activeStep === index ? "text-slate-700" : "text-slate-600"
                }`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-panel relative mx-auto max-w-7xl overflow-hidden px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute inset-x-8 top-20 h-72 rounded-[48px] bg-[radial-gradient(circle_at_50%_0%,rgba(95,201,74,0.12),transparent_36%)]" />
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge className={sectionBadgeClass}>{t.testimonials.badge}</Badge>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
            {t.testimonials.title}
          </h2>
        </Reveal>

        <div
          className="mt-8 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-3 lg:gap-6 [&::-webkit-scrollbar]:hidden"
          ref={testimonialsRef}
        >
          {t.testimonials.items.map((item, index) => (
            <div className="w-full min-w-full shrink-0 snap-start md:min-w-0 md:shrink" key={item.name}>
              <Card
                className="testimonial-card relative h-full overflow-hidden border-green-100 bg-white shadow-[0_18px_58px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-brand-primary/35 hover:shadow-[0_26px_74px_rgba(95,201,74,0.14)]"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <div className="testimonial-quote pointer-events-none absolute -right-2 top-1 text-8xl font-black leading-none text-brand-primary/10">
                  &rdquo;
                </div>
                <CardContent className="relative flex h-full min-h-72 flex-col space-y-5 p-6 sm:min-h-80 sm:p-7">
                  <div className="flex w-fit gap-1 rounded-full bg-brand-primary/10 px-3 py-2 text-brand-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star className="size-4 fill-brand-primary" key={i} />
                    ))}
                  </div>
                  <p className="flex-1 whitespace-normal break-words leading-7 text-slate-600">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-auto flex items-center gap-3 border-t border-green-100 pt-4">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-green-100 bg-brand-primary/10">
                      <Image alt={item.name} className="object-cover" fill src={`/icon/ic_ava${(index % 3) + 1}.png`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <style jsx>{`
          .testimonial-card {
            animation: testimonial-float-in 680ms ease both;
          }

          .testimonial-quote {
            animation: testimonial-quote-drift 4.8s ease-in-out infinite;
          }

          @keyframes testimonial-float-in {
            from {
              opacity: 0;
              transform: translate3d(0, 22px, 0) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(1);
            }
          }

          @keyframes testimonial-quote-drift {
            0%,
            100% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            50% {
              transform: translate3d(-6px, 7px, 0) rotate(-3deg);
            }
          }
        `}</style>
      </section>
      </div>

      <section className="landing-panel relative overflow-hidden bg-white py-14 sm:py-20 md:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <div className="text-center">
            <Badge className={sectionBadgeClass}>Our Mitra</Badge>
            <h2 className="mt-4 font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-950 md:text-3xl">
              Mitra <span className="text-brand-primary">Kami</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Partner dan komunitas yang ikut mendukung ekosistem digital BIDTECH.
            </p>
          </div>

              <div
                className="mt-10 overflow-hidden md:mt-14 [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
              >
                <div className="mitra-marquee-track flex w-max min-w-max items-center gap-4 will-change-transform">
                  {[0, 1, 2].map((groupIndex) => (
                    <div aria-hidden={groupIndex !== 0} className="flex shrink-0 items-center gap-4" key={`mitra-group-${groupIndex}`}>
                      {[
                        { src: "/images/mitra-appeknas-20260728.png", alt: "Logo APPEKNAS" },
                        { src: "/images/mitra-kadin-batam-20260728.png", alt: "Logo Kadin Batam" },
                        { src: "/images/mitra-batamnow-20260728.png", alt: "Logo BatamNow" },
                        { src: "/images/mitra-apindo-20260728.png", alt: "Logo APINDO" },
                        { src: "/images/mitra-poltevara-20260826.png", alt: "Logo Poltevara" },
                      ].map((mitra) => (
                        <div
                          className="flex h-24 w-40 shrink-0 items-center justify-center rounded-[22px] bg-white p-4 sm:h-28 sm:w-48"
                          key={`${mitra.alt}-${groupIndex}`}
                        >
                          <Image
                            alt={mitra.alt}
                            className="h-full w-full object-contain opacity-85 transition hover:opacity-100"
                            height={160}
                            src={mitra.src}
                            width={240}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <style jsx>{`
            .mitra-marquee-track {
              animation: mitra-marquee 22s linear infinite;
            }

            .mitra-marquee-track:hover {
              animation-play-state: paused;
            }

            @keyframes mitra-marquee {
              from {
                transform: translate3d(0, 0, 0);
              }
              to {
                transform: translate3d(-33.3333%, 0, 0);
              }
            }
          `}</style>
        </section>

      <section
        className="landing-panel relative mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20"
        id="contact"
      >
        <div className="pointer-events-none absolute inset-x-4 top-8 -z-10 h-80 rounded-[48px] bg-[radial-gradient(circle_at_25%_15%,rgba(95,201,74,0.13),transparent_34%),linear-gradient(135deg,rgba(245,255,242,0.9),rgba(255,255,255,0.75))]" />
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-brand-primary">
            Hubungi Kami
          </p>
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
            Siap Memulai Proyek <span className="text-brand-primary">Anda?</span>
          </h2>
          <p className="mt-4 leading-7 text-slate-500">{t.contact.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-6" y={16}>
            {t.contact.info.map((item, index) => {
              const Icon = [MessageCircleMore, Mail, MapPin][index];
              const isLocation = "batam" in item;

              if (isLocation) {
                return (
                  <div className="grid gap-5" key={item.label}>
                    <Card className="overflow-hidden border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                            <MapPin className="size-5" />
                          </div>
                          <div>
                            <p className="text-base font-bold text-slate-950">{item.label} Batam</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-500">{(item as any).batam}</p>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/40">
                          <iframe
                            allowFullScreen
                            className="h-52 w-full border-0"
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2311.377!2d104.07543166924557!3d1.1058157731502605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1785208829256!5m2!1sid!2sid"
                            title="Peta Lokasi BidTech Batam"
                          />
                        </div>

                        <a
                          className="flex items-center justify-center rounded-full border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:border-brand-primary/40 hover:bg-emerald-50"
                          href="https://www.google.com/maps/search/?api=1&query=1.1058157731502605%2C104.07543166924557"
                          rel="noreferrer"
                          target="_blank"
                        >
                          Buka Lokasi Batam
                        </a>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                            <MapPin className="size-5" />
                          </div>
                          <div>
                            <p className="text-base font-bold text-slate-950">{item.label} Jakarta</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-500">{(item as any).jakarta}</p>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/40">
                          <iframe
                            allowFullScreen
                            className="h-52 w-full border-0"
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            src="https://www.google.com/maps?q=-6.207275,106.822519&z=16&output=embed"
                            title="Peta Lokasi BidTech Jakarta"
                          />
                        </div>

                        <a
                          className="flex items-center justify-center rounded-full border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:border-brand-primary/40 hover:bg-emerald-50"
                          href="https://www.google.com/maps/search/?api=1&query=-6.207275%2C106.822519"
                          rel="noreferrer"
                          target="_blank"
                        >
                          Buka Lokasi Jakarta
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                );
              }

              const isEmail = index === 1;
              const content = (
                <CardContent className="flex items-center gap-4 rounded-[28px] border border-emerald-100 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="text-sm text-slate-500">{(item as any).value}</p>
                    {(item as any).note && <p className="text-xs font-medium text-brand-primary">{(item as any).note}</p>}
                  </div>
                </CardContent>
              );

              return isEmail ? (
                <a key={item.label} className="block" href={`mailto:${(item as any).value}`} rel="noreferrer" target="_blank">
                  <Card className="border-0 bg-transparent !shadow-none transition hover:-translate-y-0.5">{content}</Card>
                </a>
              ) : (
                <Card className="border-0 bg-transparent !shadow-none" key={item.label}>{content}</Card>
              );
            })}

            </Reveal>

          <Reveal delay={100} y={16}>
            <Card className="border border-emerald-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.09)]">
              <CardContent>
                <ContactForm selectedPackage={null} />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
