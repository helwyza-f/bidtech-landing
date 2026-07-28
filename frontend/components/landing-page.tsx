"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Mail, MapPin, MessageCircleMore, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatCounter } from "@/components/stat-counter";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/lib/i18n";
import { serviceIcons, specializationIcons, specializationImages, whyIcons } from "@/lib/icons";

export function LandingPage() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  const servicesSliderRef = useRef<HTMLDivElement>(null);
  const [activeSpecializationSlide, setActiveSpecializationSlide] = useState(0);
  const specializationsSliderRef = useRef<HTMLDivElement>(null);
  const [activePricingTab, setActivePricingTab] = useState(0);
  const [activePricingSlide, setActivePricingSlide] = useState(0);
  const pricingSliderRef = useRef<HTMLDivElement>(null);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [activeProductSlide, setActiveProductSlide] = useState(0);
  const productSliderRef = useRef<HTMLDivElement>(null);
  const howItWorksSliderRef = useRef<HTMLDivElement>(null);
  const [activeHowItWorksPage, setActiveHowItWorksPage] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState<{
    service: string;
    plan: string;
    price: string;
  } | null>(null);

  const selectPackage = (plan: { name: string; price: string }) => {
    const service = t.contact.form.services[activePricingTab] ?? t.contact.form.services[0];
    setSelectedPackage({ service, plan: plan.name, price: plan.price });

    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const movePricingSlide = (nextSlide: number) => {
    const slider = pricingSliderRef.current;
    const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
    const target = Math.max(0, Math.min(nextSlide, slides.length - 1));

    setActivePricingSlide(target);
    if (slider && slides[target]) {
      slider.scrollTo({ left: slides[target].offsetLeft - slider.offsetLeft, behavior: "smooth" });
    }
  };

  const moveServiceSlide = (nextSlide: number) => {
    const slider = servicesSliderRef.current;
    const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
    const target = Math.max(0, Math.min(nextSlide, slides.length - 1));

    setActiveServiceSlide(target);
    if (slider && slides[target]) {
      slider.scrollTo({ left: slides[target].offsetLeft - slider.offsetLeft, behavior: "smooth" });
    }
  };

  const moveSpecializationSlide = (nextSlide: number) => {
    const slider = specializationsSliderRef.current;
    const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
    const target = Math.max(0, Math.min(nextSlide, slides.length - 1));

    setActiveSpecializationSlide(target);
    if (slider && slides[target]) {
      slider.scrollTo({ left: slides[target].offsetLeft - slider.offsetLeft, behavior: "smooth" });
    }
  };

  const howItWorksPages = Math.ceil(t.howItWorks.steps.length / 2);

  useEffect(() => {
    let activeSlide = 0;

    const interval = window.setInterval(() => {
      const slider = testimonialsRef.current;
      if (!slider || window.innerWidth >= 768) return;

      const slides = Array.from(slider.children) as HTMLElement[];
      if (slides.length === 0) return;

      activeSlide = (activeSlide + 1) % slides.length;
      slider.scrollTo({ left: slides[activeSlide].offsetLeft - slider.offsetLeft, behavior: "smooth" });
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const slider = specializationsSliderRef.current;
      if (!slider || window.innerWidth >= 640) return;

      const slides = Array.from(slider.children) as HTMLElement[];
      if (slides.length === 0) return;

      setActiveSpecializationSlide((current) => {
        const next = (current + 1) % slides.length;
        slider.scrollTo({ left: slides[next].offsetLeft - slider.offsetLeft, behavior: "smooth" });
        return next;
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top_right,rgba(190,242,100,0.18),transparent_32%),radial-gradient(circle_at_left,rgba(34,211,238,0.1),transparent_26%)]" />

      <section className="relative overflow-hidden" id="hero">
        <Image
          src="/images/bg_landing.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-5 sm:py-20 md:px-8 md:py-24 lg:py-28">
          <div className="flex justify-center">
            <Badge className="uppercase tracking-widest">{t.hero.badge}</Badge>
          </div>
          <h1 className="mx-auto mt-5 max-w-3xl font-[Tahoma,Arial,sans-serif] text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:mt-6 md:text-5xl lg:text-6xl">
            <span className="block sm:whitespace-nowrap">{t.hero.titleLine1}</span>
            <span className="block">
              {t.hero.titleLine2White} <span className="text-[#63E009]">{t.hero.titleLine2Green}</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">{t.hero.subtitle}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-10">
            <a href="#contact">
              <Button className="w-full sm:w-auto" size="lg">
                {t.hero.ctaPrimary}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </a>
            <a href="#portfolio">
              <Button className="w-full sm:w-auto" size="lg" variant="outline">
                {t.hero.ctaSecondary}
              </Button>
            </a>
          </div>

          <div className="mt-12 sm:mt-16">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-300/80">Our Client</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12 sm:gap-y-6 md:flex-nowrap">
              {[
                { name: "Global Fin", src: "/logo/logo_globalFin.webp", width: 128 },
                { name: "Ayocuci", src: "/logo/logo ayocuci.webp", width: 118 },
                { name: "Beauty Go", src: "/logo/logo_beauty.webp", width: 124 },
                { name: "Stokin", src: "/logo/logo_stokin.webp", width: 116 },
                { name: "Satu Rupiah", src: "/logo/logo_satuRupiah.webp", width: 134 },
              ].map((client) => (
                <Image
                  key={client.name}
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={36}
                  className="h-6 w-auto object-contain opacity-90 sm:h-7"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-4 mb-4 mt-8 grid max-w-7xl grid-cols-2 gap-3 sm:mx-5 sm:mb-6 sm:mt-12 sm:gap-4 md:mx-8 lg:mx-auto lg:mb-8 lg:mt-14 lg:grid-cols-4" aria-label="BidTech stats">
        {t.stats.map((stat, index) => (
          <Reveal delay={index * 80} key={stat.label}>
            <div className="flex min-h-36 flex-col items-center justify-center rounded-[20px] border border-lime-300/15 bg-black/60 px-3 py-7 text-center shadow-[0_16px_50px_rgba(0,0,0,0.28)] sm:min-h-0 sm:rounded-[24px] sm:px-5 sm:py-8">
              <p className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[#63E009] md:text-4xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 w-full text-center text-[10px] uppercase leading-5 tracking-wider text-zinc-400 sm:text-xs sm:tracking-widest">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="about">
        <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="relative flex justify-center" y={16}>
            <div className="absolute inset-0 rounded-[28px] bg-lime-300/10 blur-3xl" />
            <Image
              src="/images/mascot.webp"
              alt="BidTech mascot"
              width={474}
              height={570}
              className="relative w-full max-w-[240px] object-contain"
            />
          </Reveal>

          <Reveal className="text-center md:text-left" delay={100}>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold leading-tight text-white md:text-3xl">
              <span>Mengapa Memilih</span>{" "}
              <span className="text-[#63E009]">BIDTECH?</span>
            </h2>
            <p className="mt-3 leading-7 text-zinc-400">{t.why.subtitle}</p>

            <div className="mt-6 space-y-5">
              {t.why.items.map((item, index) => {
                const Icon = whyIcons[index];

                return (
                  <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:text-left" key={item.title}>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime-300/10">
                      <Icon className="size-4 text-[#63E009]" />
                    </div>
                    <div className="max-w-xl">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="services">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge className="border-green-700/20 bg-green-700/10 text-[#63E009]">{t.services.badge}</Badge>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            <span>Layanan Unggulan</span> <span className="text-[#63E009]">Kami</span>
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.services.subtitle}</p>
        </Reveal>

        <div
          className="mt-8 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-3 lg:gap-6 [&::-webkit-scrollbar]:hidden"
          onScroll={(event) => {
            if (window.innerWidth >= 768) return;
            const slider = event.currentTarget;
            const slides = Array.from(slider.children) as HTMLElement[];
            const closest = slides.reduce(
              (best, slide, index) =>
                Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) < best.distance
                  ? { index, distance: Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) }
                  : best,
              { index: 0, distance: Number.POSITIVE_INFINITY },
            );
            setActiveServiceSlide(closest.index);
          }}
          ref={servicesSliderRef}
        >
          {t.services.items.map((service, index) => (
            <Card className="w-full min-w-full shrink-0 snap-start border-lime-300/20 bg-lime-300/[0.03] md:min-w-0 md:shrink" key={service.title}>
              <CardContent className="flex h-full min-h-[320px] flex-col space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime-300/10">
                    <Image src={serviceIcons[index]} alt="" width={22} height={22} className="size-5" />
                  </div>
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[#63E009]">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm leading-6 text-zinc-400">{service.description}</p>
                <ul className="mt-auto space-y-2 border-t border-white/10 pt-4">
                  {service.features.map((feature) => (
                    <li className="flex items-center gap-2 text-sm text-zinc-300" key={feature}>
                      <span className="size-1.5 shrink-0 rounded-full bg-lime-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 md:hidden" aria-label="Navigasi layanan">
          <button
            aria-label="Layanan sebelumnya"
            className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-lime-300 hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeServiceSlide === 0}
            onClick={() => moveServiceSlide(activeServiceSlide - 1)}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2" aria-label={`Layanan ${activeServiceSlide + 1} dari ${t.services.items.length}`}>
            {t.services.items.map((service, index) => (
              <button
                aria-label={`Lihat ${service.title}`}
                className={`h-2.5 rounded-full transition-all ${
                  activeServiceSlide === index ? "w-8 bg-[#63E009]" : "w-2.5 bg-zinc-600"
                }`}
                key={service.title}
                onClick={() => moveServiceSlide(index)}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Layanan berikutnya"
            className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-lime-300 hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeServiceSlide === t.services.items.length - 1}
            onClick={() => moveServiceSlide(activeServiceSlide + 1)}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <Reveal className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <Badge className="border-green-700/20 bg-green-700/10 text-[#63E009]">{t.specializations.badge}</Badge>
            <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
              {t.specializations.title.split(" ")[0]}{" "}
              <span className="text-[#63E009]">{t.specializations.title.split(" ").slice(1).join(" ")}</span>
            </h2>
          </div>
          <p className="max-w-md leading-7 text-zinc-400 md:text-right">{t.specializations.subtitle}</p>
        </Reveal>

        <div
          className="mt-10 flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          onScroll={(event) => {
            if (window.innerWidth >= 640) return;
            const slider = event.currentTarget;
            const slides = Array.from(slider.children) as HTMLElement[];
            const closest = slides.reduce(
              (best, slide, index) =>
                Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) < best.distance
                  ? { index, distance: Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) }
                  : best,
              { index: 0, distance: Number.POSITIVE_INFINITY },
            );
            setActiveSpecializationSlide(closest.index);
          }}
          ref={specializationsSliderRef}
        >
          {t.specializations.items.map((item, index) => (
            <div className="w-full min-w-full shrink-0 snap-start sm:min-w-0 sm:shrink" key={item.title}>
              <div className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f12] transition hover:border-lime-300/30">
                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-[#081208] ${
                    specializationImages[index].includes("expertise-5") || specializationImages[index].includes("expertise-6")
                      ? "p-7"
                      : "p-3"
                  }`}
                >
                  <Image
                    src={specializationImages[index]}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 items-start gap-3 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-lime-300/10">
                    <Image src={specializationIcons[index]} alt="" width={18} height={18} className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-400">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden" aria-label="Navigasi spesialisasi">
          <button
            aria-label="Spesialisasi sebelumnya"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-lime-300 hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
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
                  activeSpecializationSlide === index ? "w-6 bg-[#63E009]" : "w-2 bg-zinc-600"
                }`}
                key={item.title}
                onClick={() => moveSpecializationSlide(index)}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Spesialisasi berikutnya"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-lime-300 hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeSpecializationSlide === t.specializations.items.length - 1}
            onClick={() => moveSpecializationSlide(activeSpecializationSlide + 1)}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="portfolio">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge className="border-green-700/20 bg-green-700/10 text-[#63E009]">Our Products</Badge>
          </div>
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.products.titleWhite} <span className="text-[#63E009]">{t.products.titleGreen}</span> {t.products.titleWhiteEnd}
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.products.subtitle}</p>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {t.products.tabs.map((tab, index) => (
            <button
              className={`relative z-10 touch-manipulation rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition sm:px-6 sm:py-2.5 sm:text-sm sm:tracking-widest ${
                activeProductTab === index
                  ? "border-[#63E009] bg-[#63E009] text-black"
                  : "border-white/15 text-zinc-300 hover:border-[#63E009]/50 hover:text-[#63E009]"
              }`}
              key={tab.key}
              onClick={() => setActiveProductTab(index)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="mt-8 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-3 lg:gap-6 [&::-webkit-scrollbar]:hidden"
          onScroll={(event) => {
            if (window.innerWidth >= 768) return;
            const slider = event.currentTarget;
            const slides = Array.from(slider.children) as HTMLElement[];
            const closest = slides.reduce(
              (best, slide, index) =>
                Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) < best.distance
                  ? { index, distance: Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) }
                  : best,
              { index: 0, distance: Number.POSITIVE_INFINITY },
            );
            setActiveProductSlide(closest.index);
          }}
          ref={productSliderRef}
        >
          {t.products.tabs[activeProductTab].items.map((product) => (
            <Card className="w-full min-w-full shrink-0 snap-start overflow-hidden border-lime-300/15 bg-[#0b0f12] p-0 md:min-w-0 md:shrink" key={product.title}>
              <div className="bg-[#0b0f12] p-3 sm:p-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={400}
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>
              <CardContent className="space-y-3 px-4 pb-5 pt-1 sm:px-5 sm:pb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#63E009]">{product.tag}</span>
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-white">{product.title}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{product.subtitle}</p>
                <p className="text-sm leading-6 text-zinc-400">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden" aria-label="Navigasi produk">
          <button
            aria-label="Produk sebelumnya"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#63E009] hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeProductSlide === 0}
            onClick={() => {
              const slider = productSliderRef.current;
              const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
              const nextSlide = Math.max(0, activeProductSlide - 1);
              if (slider && slides[nextSlide]) {
                slider.scrollTo({ left: slides[nextSlide].offsetLeft - slider.offsetLeft, behavior: "smooth" });
              }
            }}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {t.products.tabs[activeProductTab].items.map((product, index) => (
              <button
                aria-label={`Lihat ${product.title}`}
                className={`h-2 rounded-full transition-all ${
                  activeProductSlide === index ? "w-6 bg-[#63E009]" : "w-2 bg-zinc-600"
                }`}
                key={product.title}
                onClick={() => {
                  const slider = productSliderRef.current;
                  const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
                  if (slider && slides[index]) {
                    slider.scrollTo({ left: slides[index].offsetLeft - slider.offsetLeft, behavior: "smooth" });
                  }
                }}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Produk berikutnya"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-[#63E009] hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeProductSlide === t.products.tabs[activeProductTab].items.length - 1}
            onClick={() => {
              const slider = productSliderRef.current;
              const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
              const nextSlide = Math.min(t.products.tabs[activeProductTab].items.length - 1, activeProductSlide + 1);
              if (slider && slides[nextSlide]) {
                slider.scrollTo({ left: slides[nextSlide].offsetLeft - slider.offsetLeft, behavior: "smooth" });
              }
            }}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </section>

      <div className="bg-[#edf6e8]">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge className="border-green-700/20 bg-green-700/10 text-[#63E009]">{t.howItWorks.badge}</Badge>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
            {t.howItWorks.titleWhite} <span className="text-[#63E009]">{t.howItWorks.titleGreen}</span>
          </h2>
        </Reveal>

        <div
          className="relative mt-14 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-4 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
          onScroll={(event) => {
            if (window.innerWidth >= 640) return;
            const slider = event.currentTarget;
            const slides = Array.from(slider.children) as HTMLElement[];
            const closest = slides.reduce(
              (best, slide, index) =>
                Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) < best.distance
                  ? { index, distance: Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) }
                  : best,
              { index: 0, distance: Number.POSITIVE_INFINITY },
            );
            setActiveStep(closest.index);
            setActiveHowItWorksPage(Math.floor(closest.index / 2));
          }}
          ref={howItWorksSliderRef}
        >
          {t.howItWorks.steps.map((step, index) => (
            <div
              className="relative z-10 flex min-h-64 w-[calc(50%_-_0.375rem)] min-w-[calc(50%_-_0.375rem)] shrink-0 snap-start flex-col items-center rounded-2xl border border-green-900/10 bg-white px-3 py-6 text-center transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#63E009]/40 sm:min-h-60 sm:w-auto sm:min-w-0 sm:shrink lg:min-h-64 lg:px-4"
              key={step.title}
            >
              <div className="relative flex h-10 w-full items-center justify-center">
                <button
                  aria-label={`${step.title} (${index + 1})`}
                  className={`relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                    activeStep === index
                      ? "scale-110 border-[#63E009] bg-[#63E009] text-black shadow-[0_0_0_6px_rgba(99,224,9,0.15)]"
                      : index < activeStep
                        ? "border-[#63E009] bg-[#63E009]/20 text-[#63E009]"
                        : "border-slate-900/20 bg-white/70 text-slate-900 hover:border-green-600/50"
                  }`}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              </div>
              <h3
                className={`mt-5 font-[family-name:var(--font-sora)] text-sm font-semibold transition-colors duration-300 sm:text-base ${
                  activeStep === index ? "text-[#63E009]" : "text-slate-950"
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
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-black transition hover:border-[#63E009] hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeHowItWorksPage === 0}
            onClick={() => {
              const slider = howItWorksSliderRef.current;
              const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
              const nextSlide = Math.max(0, activeHowItWorksPage * 2 - 2);
              if (slider && slides[nextSlide]) {
                slider.scrollTo({ left: slides[nextSlide].offsetLeft - slider.offsetLeft, behavior: "smooth" });
              }
            }}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: howItWorksPages }).map((_, pageIndex) => (
              <button
                aria-label={`Lihat langkah ${pageIndex + 1}`}
                className={`h-2 rounded-full transition-all ${
                  activeHowItWorksPage === pageIndex ? "w-6 bg-[#63E009] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" : "w-2 bg-zinc-700"
                }`}
                key={`how-it-works-dot-${pageIndex}`}
                onClick={() => {
                  const slider = howItWorksSliderRef.current;
                  const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
                  const target = pageIndex * 2;
                  if (slider && slides[target]) {
                    slider.scrollTo({ left: slides[target].offsetLeft - slider.offsetLeft, behavior: "smooth" });
                  }
                }}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Langkah berikutnya"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-black transition hover:border-[#63E009] hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activeHowItWorksPage >= howItWorksPages - 1}
            onClick={() => {
              const slider = howItWorksSliderRef.current;
              const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
              const nextSlide = Math.min(t.howItWorks.steps.length - 1, activeHowItWorksPage * 2 + 2);
              if (slider && slides[nextSlide]) {
                slider.scrollTo({ left: slides[nextSlide].offsetLeft - slider.offsetLeft, behavior: "smooth" });
              }
            }}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="hidden mt-14 sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {t.howItWorks.steps.map((step, index) => (
            <div
              className="flex min-h-64 flex-col items-center rounded-2xl border border-green-900/10 bg-white px-3 py-6 text-center shadow-[0_8px_28px_rgba(31,80,20,0.08)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#63E009]/40 hover:shadow-[0_14px_34px_rgba(31,80,20,0.13)] lg:min-h-64 lg:px-4"
              key={step.title}
            >
              <div className="relative flex h-10 w-full items-center justify-center">
                <button
                  aria-label={`${step.title} (${index + 1})`}
                  className={`relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                    activeStep === index
                      ? "scale-110 border-[#63E009] bg-[#63E009] text-black shadow-[0_0_0_6px_rgba(99,224,9,0.15)]"
                      : index < activeStep
                        ? "border-[#63E009] bg-[#63E009]/20 text-[#63E009]"
                        : "border-slate-900/20 bg-white/70 text-slate-900 hover:border-green-600/50"
                  }`}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              </div>
              <h3
                className={`mt-5 font-[family-name:var(--font-sora)] text-sm font-semibold transition-colors duration-300 sm:text-base ${
                  activeStep === index ? "text-[#63E009]" : "text-slate-950"
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

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="pricing">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Badge className="border-green-700/20 bg-green-700/10 text-[#63E009]">{t.pricing.badge}</Badge>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
            {t.pricing.titlePrefix} <span className="text-[#63E009]">{t.pricing.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            {t.pricing.subtitle}
          </p>
        </Reveal>

        <div className="mt-8 flex flex-nowrap justify-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:gap-3 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {t.pricing.tabs.map((tab, index) => (
            <button
              className={`relative z-10 min-w-0 shrink-0 touch-manipulation rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-wider transition-colors hover:border-[#63E009] hover:bg-[#63E009] hover:text-black sm:px-10 sm:py-3.5 sm:text-sm sm:tracking-widest ${
                activePricingTab === index
                  ? "border-[#63E009] bg-[#63E009] text-black"
                  : "border-slate-900/20 text-slate-700"
              }`}
              key={tab.key}
              onClick={() => {
                setActivePricingTab(index);
                setActivePricingSlide(0);
                setSelectedPackage(null);
                pricingSliderRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {(() => {
          const plans = t.pricing.tabs[activePricingTab].plans;
          const isSinglePlan = plans.length === 1;
          const isCentered = plans.length <= 2;

          return (
            <div
              className={`mt-8 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-10 md:pb-0 [&::-webkit-scrollbar]:hidden ${
                isSinglePlan || isCentered
                  ? "md:flex md:flex-wrap md:justify-center md:overflow-visible md:gap-5"
                  : "md:grid md:grid-cols-2 md:gap-5 md:overflow-visible xl:grid-cols-3 xl:gap-6"
              }`}
              onScroll={(event) => {
                if (window.innerWidth >= 768) return;
                const slider = event.currentTarget;
                const slides = Array.from(slider.children) as HTMLElement[];
                const closest = slides.reduce(
                  (best, slide, index) =>
                    Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) < best.distance
                      ? { index, distance: Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) }
                      : best,
                  { index: 0, distance: Number.POSITIVE_INFINITY },
                );
                setActivePricingSlide(closest.index);
              }}
              ref={pricingSliderRef}
            >
              {plans.map((rawPlan) => {
                const plan = rawPlan as typeof rawPlan & { badge?: string; originalPrice?: string };
                const isSelected =
                  selectedPackage?.service === (t.contact.form.services[activePricingTab] ?? t.contact.form.services[0]) &&
                  selectedPackage.plan === plan.name;

                return (
                  <Card
                    key={plan.name}
                    className={`flex w-full min-w-full shrink-0 snap-start flex-col !shadow-none transition-all duration-300 md:min-w-0 ${
                      isSinglePlan
                        ? isSelected
                          ? "border-lime-300 bg-[#0b0f12] shadow-[0_0_0_2px_rgba(190,242,100,0.18)]"
                          : plan.featured
                            ? "border-lime-300/40 bg-[#0b0f12]"
                            : "bg-[#0b0f12]"
                        : isSelected
                          ? "border-[#63E009] bg-[#0b0f12] shadow-[0_0_0_2px_rgba(99,224,9,0.18)]"
                          : "border-transparent bg-[#0b0f12]"
                    } ${
                      isSinglePlan
                        ? "md:max-w-3xl md:w-full"
                        : isCentered
                          ? "md:w-[340px] md:shrink"
                          : "md:shrink md:w-full"
                    }`}
                  >
                    <CardContent className="flex flex-1 flex-col space-y-6">
                      {isSinglePlan ? (
                        activePricingTab === 2 ? (
                          <div className="flex w-full flex-col space-y-6">
                            <div className="space-y-4 text-center">
                              <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[#63E009]">
                                {plan.name}
                              </h3>
                            </div>

                            <div className="space-y-8">
                              <div className="space-y-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-400">
                                  {plan.featureGroups[0]?.title}
                                </p>

                                <div className="space-y-5 text-left">
                                  {plan.featureGroups[0]?.items.map((feature, index) => (
                                    <div className="flex gap-4" key={feature.text}>
                                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#63E009]/40 bg-[#63E009]/10 text-sm font-semibold text-[#63E009]">
                                        {String(index + 1)}
                                      </div>
                                      <div className="space-y-1">
                                        <p className="text-sm font-semibold text-zinc-100">{feature.text}</p>
                                        <p className="text-sm leading-6 text-zinc-400">
                                          {index === 0
                                            ? 'Diskusi awal untuk memahami kebutuhan teknis & alur sistem.'
                                            : index === 1
                                              ? 'Kami menyusun proposal estimasi biaya & estimasi pengerjaan.'
                                              : 'Peluncuran aplikasi ke sistem produksi yang siap pakai, dilindungi penuh oleh Perjanjian Kerahasiaan Data (NDA).'}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-2xl bg-[#1a2226] px-5 py-6 text-center sm:px-8 sm:py-8">
                                <p className="font-[family-name:var(--font-sora)] text-2xl font-bold text-zinc-100 sm:text-3xl">
                                  Harga Custom
                                </p>
                                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                                  Estimasi biaya disesuaikan secara presisi dengan kebutuhan fitur dan alur kerja aplikasi Anda.
                                </p>
                                <Button
                                  aria-pressed={isSelected}
                                  className="mt-6 w-full bg-[#63E009] py-6 text-base font-semibold text-black transition-colors hover:bg-[#52be07] hover:text-black"
                                  onClick={() => selectPackage(plan)}
                                  variant="default"
                                >
                                  {(plan as any).ctaText || (isSelected ? t.pricing.selected : t.pricing.ctaDefault)}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col w-full text-center space-y-6">
                            <div className="pb-4 border-b border-zinc-800/80">
                              <h3 className="font-[family-name:var(--font-sora)] font-bold text-2xl text-[#63E009]">
                                {plan.name}
                              </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left py-2">
                              {plan.featureGroups.map((group) => (
                                <div key={group.title} className="space-y-4">
                                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{group.title}</p>
                                  <ul className="space-y-4">
                                    {group.items.map((feature) => (
                                      <li
                                        className={`flex items-start gap-3 text-sm leading-relaxed ${
                                          feature.active ? 'text-zinc-300' : 'text-zinc-600 line-through'
                                        }`}
                                        key={feature.text}
                                      >
                                        <Check
                                          className={`mt-0.5 size-5 shrink-0 ${feature.active ? 'text-[#63E009]' : 'text-zinc-600'}`}
                                        />
                                        <span>{feature.text}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            <div className="bg-[#040608] rounded-xl p-6 md:p-8 border border-zinc-800/50 flex flex-col items-center text-center space-y-4 w-full">
                              <p className="font-[family-name:var(--font-sora)] font-bold text-2xl text-zinc-100">
                                {plan.price}
                              </p>
                              <p className="text-xs text-zinc-400 max-w-md">
                                {(plan as any).description || t.pricing.subtitle}
                              </p>
                              <Button
                                aria-pressed={isSelected}
                                className="w-full max-w-md mt-2 bg-[#63E009] text-black transition-colors hover:bg-[#52be07] hover:text-black border-none font-semibold py-6 text-base rounded-lg"
                                onClick={() => selectPackage(plan)}
                                variant="default"
                              >
                                {(plan as any).ctaText || (isSelected ? t.pricing.selected : t.pricing.ctaDefault)}
                              </Button>
                            </div>
                          </div>
                        )
                      ) : (
                        <>
                          <div className="flex flex-col items-center space-y-4 text-center">
                            <div>
                              <h3 className="font-[family-name:var(--font-sora)] font-bold text-xl text-zinc-100">
                                {plan.name}
                              </h3>
                              {plan.badge ? (
                                <span className="mt-2 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                                  {plan.badge}
                                </span>
                              ) : null}
                            </div>
                            {plan.originalPrice ? (
                              <p className="text-xs text-zinc-500 line-through">{plan.originalPrice}</p>
                            ) : null}
                            <p className="font-[family-name:var(--font-sora)] whitespace-nowrap rounded-full bg-[#63E009]/10 px-5 py-2 text-sm font-bold text-[#63E009] sm:text-base">
                              {plan.price}
                            </p>
                          </div>

                          <div className="flex-1 space-y-5">
                            {plan.featureGroups.map((group) => (
                              <div key={group.title}>
                                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{group.title}</p>
                                <ul className="mt-3 space-y-3">
                                  {group.items.map((feature) => (
                                    <li
                                      className={`flex items-start gap-2 text-sm ${
                                        feature.active ? "text-zinc-300" : "text-zinc-600 line-through"
                                      }`}
                                      key={feature.text}
                                    >
                                      <span
                                        className={`mt-2 size-1.5 shrink-0 rounded-full ${feature.active ? "bg-[#63E009]" : "bg-zinc-600"}`}
                                      />
                                      {feature.text}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          <Button
                            aria-pressed={isSelected}
                            className="w-full border-zinc-700 text-zinc-100 transition-colors hover:border-[#63E009] hover:bg-[#63E009] hover:text-black"
                            onClick={() => selectPackage(plan)}
                            variant={isSelected ? "default" : "outline"}
                          >
                            {isSelected ? t.pricing.selected : t.pricing.ctaDefault}
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          );
        })()}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge className="border-green-700/20 bg-green-700/10 text-[#63E009]">{t.testimonials.badge}</Badge>
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
              <Card className="h-full bg-[#0b0f12] !shadow-none">
                <CardContent className="flex h-full min-h-80 flex-col space-y-5 p-6 sm:min-h-80 sm:p-7">
                  <div className="flex gap-1 text-[#63E009]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star className="size-4 fill-[#63E009]" key={i} />
                    ))}
                  </div>
                  <p className="flex-1 whitespace-normal break-words leading-7 text-zinc-300">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-lime-300/20 bg-lime-300/10">
                      <Image alt={item.name} className="object-cover" fill src={`/icon/ic_ava${(index % 3) + 1}.png`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-zinc-400">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
      </div>

      <section className="bg-[#050505] py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <div className="text-center">
            <Badge className="border-green-700/20 bg-green-700/10 text-[#63E009]">Our Mitra</Badge>
            <h2 className="mt-4 font-[family-name:var(--font-sora)] text-2xl font-semibold text-white md:text-3xl">
              Mitra <span className="text-[#63E009]">Kami</span>
            </h2>
          </div>

              <div
                className="mt-12 overflow-hidden md:mt-16 [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]"
              >
                <div className="mitra-marquee-track flex w-max min-w-max items-center gap-4 will-change-transform">
                  {[0, 1, 2].map((groupIndex) => (
                    <div aria-hidden={groupIndex !== 0} className="flex shrink-0 items-center gap-4" key={`mitra-group-${groupIndex}`}>
                      {[
                        { src: "/images/Mitra1.png", alt: "Mitra 1" },
                        { src: "/images/Mitra2.png", alt: "Mitra 2" },
                        { src: "/images/Mitra3.png", alt: "Mitra 3" },
                        { src: "/images/Mitra4.png", alt: "Mitra 4" },
                      ].map((mitra) => (
                        <div
                          className="flex h-28 w-40 shrink-0 items-center justify-center rounded-2xl border border-zinc-700/60 bg-zinc-900/60 p-4 sm:h-32 sm:w-48"
                          key={`${mitra.alt}-${groupIndex}`}
                        >
                          <Image
                            alt={mitra.alt}
                            className="h-full w-full object-contain"
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

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="contact">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            Siap Memulai Proyek <span className="text-[#63E009]">Anda</span>?
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.contact.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-4" y={16}>
            {t.contact.info.map((item, index) => {
              const Icon = [MessageCircleMore, Mail, MapPin][index];
              const isWhatsApp = index === 0;
              const content = (
                <CardContent className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime-300/10 text-[#63E009]">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-zinc-400">{item.value}</p>
                    {item.note && <p className="text-xs font-medium text-[#63E009]">{item.note}</p>}
                  </div>
                </CardContent>
              );

              return isWhatsApp ? (
                <a key={item.label} href="https://wa.me/628217601455" rel="noreferrer" target="_blank">
                  <Card className="transition hover:border-[#63E009]/40 hover:bg-white/[0.03]">{content}</Card>
                </a>
              ) : (
                <Card key={item.label}>{content}</Card>
              );
            })}

            <Card>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime-300/10 text-[#63E009]">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Peta Lokasi</p>
                    <p className="text-sm text-zinc-400">King Business Centre, Batam</p>
                  </div>
                </div>

                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      <iframe
                        allowFullScreen
                        className="h-72 w-full border-0 sm:h-80"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2311.377!2d104.07543166924557!3d1.1058157731502605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1785208829256!5m2!1sid!2sid"
                        title="Peta Lokasi BidTech"
                      />
                    </div>

                    <a
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#63E009]/40 hover:bg-white/[0.06]"
                      href="https://www.google.com/maps/search/?api=1&query=1.1058157731502605%2C104.07543166924557"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Buka di Google Maps
                    </a>
                </CardContent>
              </Card>
            </Reveal>

          <Reveal delay={100} y={16}>
            <Card>
              <CardContent>
                <ContactForm
                  key={selectedPackage ? `${selectedPackage.service}-${selectedPackage.plan}-${selectedPackage.price}` : "empty"}
                  selectedPackage={selectedPackage}
                />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

