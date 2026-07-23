"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Mail, MapPin, MessageCircleMore, Star, User } from "lucide-react";

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
            {t.hero.titleWhite} <span className="text-[#63E009]">{t.hero.titleGreen}</span>
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

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-5 sm:mt-16 sm:gap-x-12 sm:gap-y-6">
            {[
              { name: "Beauty Go", src: "/icon/ic_beauty.webp" },
              { name: "Sentosa Logistik", src: "/icon/ic_logistik.webp" },
              { name: "Global Fin", src: "/icon/ic_global.webp" },
            ].map((client) => (
              <Image
                key={client.name}
                src={client.src}
                alt={client.name}
                width={140}
                height={32}
                className="h-5 w-auto max-w-[110px] object-contain opacity-80 sm:h-7 sm:max-w-none"
              />
            ))}
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

          <Reveal delay={100}>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold leading-tight text-white md:text-3xl">
              {t.why.title}
            </h2>
            <p className="mt-3 leading-7 text-zinc-400">{t.why.subtitle}</p>

            <div className="mt-6 space-y-5">
              {t.why.items.map((item, index) => {
                const Icon = whyIcons[index];

                return (
                  <div className="flex gap-3" key={item.title}>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime-300/10">
                      <Icon className="size-4 text-[#63E009]" />
                    </div>
                    <div>
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
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.services.title}
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
            <Reveal
              className="w-full min-w-full shrink-0 snap-start md:min-w-0 md:shrink"
              delay={index * 100}
              key={service.title}
            >
              <Card className="border-lime-300/20 bg-lime-300/[0.03]">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime-300/10">
                      <Image src={serviceIcons[index]} alt="" width={22} height={22} className="size-5" />
                    </div>
                    <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[#63E009]">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-zinc-400">{service.description}</p>
                  <ul className="space-y-2 border-t border-white/10 pt-4">
                    {service.features.map((feature) => (
                      <li className="flex items-center gap-2 text-sm text-zinc-300" key={feature}>
                        <span className="size-1.5 shrink-0 rounded-full bg-lime-300" />
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
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
            <Reveal
              className="w-full min-w-full shrink-0 snap-start sm:min-w-0 sm:shrink"
              delay={(index % 4) * 80}
              key={item.title}
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f12] transition hover:border-lime-300/30">
                <Image
                  src={specializationImages[index]}
                  alt={item.title}
                  width={1200}
                  height={680}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full object-cover"
                />
                <div className="flex items-start gap-3 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-lime-300/10">
                    <Image src={specializationIcons[index]} alt="" width={18} height={18} className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-400">{item.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
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
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.products.titleWhite} <span className="text-[#63E009]">{t.products.titleGreen}</span> {t.products.titleWhiteEnd}
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.products.subtitle}</p>
        </Reveal>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {t.products.items.map((product, index) => (
            <Reveal delay={index * 100} key={product.title}>
              <Card className="overflow-hidden p-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={400}
                  className="h-auto w-full object-contain"
                />
                <CardContent className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#63E009]">{product.tag}</span>
                  <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-white">{product.title}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{product.subtitle}</p>
                  <p className="text-sm leading-6 text-zinc-400">{product.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
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

        <div className="relative mt-10 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-4 [scrollbar-width:none] sm:mt-14 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
          {t.howItWorks.steps.map((step, index) => (
            <Reveal
              className="relative z-10 flex min-h-64 w-[calc(50%_-_0.375rem)] min-w-[calc(50%_-_0.375rem)] shrink-0 snap-start flex-col items-center rounded-2xl border border-green-900/10 bg-white px-3 py-6 text-center shadow-[0_8px_28px_rgba(31,80,20,0.08)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#63E009]/40 hover:shadow-[0_14px_34px_rgba(31,80,20,0.13)] sm:min-h-60 sm:w-auto sm:min-w-0 sm:shrink lg:min-h-64 lg:px-4"
              delay={index * 80}
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
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge className="border-green-700/20 bg-green-700/10 text-[#63E009]">{t.pricing.badge}</Badge>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
            {t.pricing.title}
          </h2>
          <p className="mt-4 leading-7 text-slate-600">{t.pricing.subtitle}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-center">
          {t.pricing.tabs.map((tab, index) => (
            <button
              className={`min-w-0 rounded-full border px-2 py-2 text-[10px] font-semibold uppercase tracking-wide transition-colors sm:px-5 sm:text-xs sm:tracking-widest ${
                activePricingTab === index
                  ? "border-[#63E009] bg-[#63E009] text-black"
                  : "border-slate-900/20 text-slate-700 hover:border-green-600/50"
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

        <div
          className="mt-8 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-10 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 xl:grid-cols-3 xl:gap-6 [&::-webkit-scrollbar]:hidden"
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
          {t.pricing.tabs[activePricingTab].plans.map((rawPlan) => {
            const plan = rawPlan as typeof rawPlan & { badge?: string; originalPrice?: string };
            const isSelected =
              selectedPackage?.service === (t.contact.form.services[activePricingTab] ?? t.contact.form.services[0]) &&
              selectedPackage.plan === plan.name;

            return (
            <Card
              key={plan.name}
              className={`flex w-full min-w-full shrink-0 snap-start flex-col !shadow-none transition-all duration-300 md:min-w-0 md:shrink ${
                isSelected
                  ? "border-lime-300 bg-[#0b0f12] shadow-[0_0_0_2px_rgba(190,242,100,0.18)]"
                  : plan.featured
                    ? "border-lime-300/40 bg-[#0b0f12] xl:-translate-y-3"
                    : "bg-[#0b0f12]"
              }`}
            >
              <CardContent className="flex flex-1 flex-col space-y-6">
                <div>
                  <p className="text-sm text-zinc-400">{plan.name}</p>
                  {plan.badge ? (
                    <span className="mt-3 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                      {plan.badge}
                    </span>
                  ) : null}
                  {plan.originalPrice ? (
                    <p className="mt-2 text-xs text-zinc-500 line-through">{plan.originalPrice}</p>
                  ) : null}
                  {!plan.badge && plan.price !== "Custom" ? <p className="mt-3 text-xs text-zinc-500">Mulai</p> : null}
                  <p
                    className={`font-[family-name:var(--font-sora)] font-bold text-[#63E009] ${
                      plan.price === "Custom" ? "mt-3 text-4xl" : "mt-1 text-3xl"
                    }`}
                  >
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
                            <Check
                              className={`mt-0.5 size-4 shrink-0 ${feature.active ? "text-[#63E009]" : "text-zinc-600"}`}
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
                  className="w-full"
                  onClick={() => selectPackage(plan)}
                  variant={isSelected ? "default" : "outline"}
                >
                  {isSelected ? t.pricing.selected : t.pricing.ctaDefault}
                </Button>
              </CardContent>
            </Card>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 md:hidden" aria-label="Navigasi paket">
          <button
            aria-label="Paket sebelumnya"
            className="flex size-11 items-center justify-center rounded-full border border-slate-900/20 text-slate-900 transition hover:border-green-600 hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activePricingSlide === 0}
            onClick={() => movePricingSlide(activePricingSlide - 1)}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2" aria-label={`Paket ${activePricingSlide + 1} dari 3`}>
            {t.pricing.tabs[activePricingTab].plans.map((plan, index) => (
              <button
                aria-label={`Lihat paket ${plan.name}`}
                className={`h-2.5 rounded-full transition-all ${
                  activePricingSlide === index ? "w-8 bg-[#63E009]" : "w-2.5 bg-zinc-600"
                }`}
                key={plan.name}
                onClick={() => movePricingSlide(index)}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Paket berikutnya"
            className="flex size-11 items-center justify-center rounded-full border border-slate-900/20 text-slate-900 transition hover:border-green-600 hover:text-[#63E009] disabled:cursor-not-allowed disabled:opacity-35"
            disabled={activePricingSlide === t.pricing.tabs[activePricingTab].plans.length - 1}
            onClick={() => movePricingSlide(activePricingSlide + 1)}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
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
            <Reveal
              className="w-full min-w-full shrink-0 snap-start md:min-w-0 md:shrink"
              delay={index * 100}
              key={item.name}
            >
              <Card className="bg-[#0b0f12] !shadow-none">
                <CardContent className="flex h-full min-h-72 flex-col space-y-5 sm:min-h-64 md:min-h-0">
                  <div className="flex gap-1 text-[#63E009]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star className="size-4 fill-[#63E009]" key={i} />
                    ))}
                  </div>
                  <p className="whitespace-normal break-words leading-7 text-zinc-300">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex size-9 items-center justify-center rounded-full bg-lime-300/10 text-[#63E009]">
                      <User className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-zinc-400">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="contact">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.contact.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-4" y={16}>
            {t.contact.info.map((item, index) => {
              const Icon = [MessageCircleMore, Mail, MapPin][index];

              return (
                <Card key={item.label}>
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
                </Card>
              );
            })}
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
