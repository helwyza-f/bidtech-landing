"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Mail, MapPin, MessageCircleMore, Star, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatCounter } from "@/components/stat-counter";
import { ContactForm } from "@/components/contact-form";
import { useLanguage } from "@/lib/i18n";
import { serviceIcons, specializationIcons, whyIcons } from "@/lib/icons";

export function LandingPage() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [activePricingTab, setActivePricingTab] = useState(0);
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
          <h1 className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:mt-6 md:text-5xl lg:text-6xl">
            {t.hero.titleWhite} <span className="text-lime-300">{t.hero.titleGreen}</span>
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
              { name: "Beauty Go", src: "/images/ic_beauty.webp" },
              { name: "Sentosa Logistik", src: "/images/ic_logistik.webp" },
              { name: "Global Fin", src: "/images/ic_global.webp" },
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

      <section className="mx-4 grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-lime-300/15 bg-white/5 px-px sm:mx-5 md:mx-8 md:rounded-[24px] lg:mx-auto lg:grid-cols-4" aria-label="BidTech stats">
        {t.stats.map((stat) => (
          <div className="bg-black/60 px-5 py-8 text-center" key={stat.label}>
            <p className="font-[family-name:var(--font-sora)] text-3xl font-bold text-lime-300 md:text-4xl">
              <StatCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="about">
        <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative flex justify-center">
            <div className="absolute inset-0 rounded-[28px] bg-lime-300/10 blur-3xl" />
            <Image
              src="/images/mascot.webp"
              alt="BidTech mascot"
              width={474}
              height={570}
              className="relative w-full max-w-[240px] object-contain"
            />
          </div>

          <div>
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
                      <Icon className="size-4 text-lime-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="services">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.services.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {t.services.items.map((service, index) => (
            <Card key={service.title} className="border-lime-300/20 bg-lime-300/[0.03]">
              <CardContent className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-xl bg-lime-300/10">
                  <Image src={serviceIcons[index]} alt="" width={22} height={22} className="size-5" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-lime-300">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{service.description}</p>
                </div>
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
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.specializations.title}
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.specializations.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.specializations.items.map((item, index) => (
            <Card key={item.title}>
              <CardContent className="space-y-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-lime-300/10">
                  <Image src={specializationIcons[index]} alt="" width={22} height={22} className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="portfolio">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.products.titleWhite} <span className="text-lime-300">{t.products.titleGreen}</span> {t.products.titleWhiteEnd}
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.products.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {t.products.items.map((product) => (
            <Card key={product.title} className="overflow-hidden p-0">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={400}
                className="h-44 w-full object-cover"
              />
              <CardContent className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-lime-300">{product.tag}</span>
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-white">{product.title}</h3>
                <p className="text-sm leading-6 text-zinc-400">{product.description}</p>
                <Badge>{t.products.viewLabel}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>{t.howItWorks.badge}</Badge>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.howItWorks.titleWhite} <span className="text-lime-300">{t.howItWorks.titleGreen}</span>
          </h2>
        </div>

        <div className="relative mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between">
          <div
            className="pointer-events-none absolute top-9 z-0 hidden h-px bg-white/15 lg:block"
            style={{
              left: `${50 / t.howItWorks.steps.length}%`,
              right: `${50 / t.howItWorks.steps.length}%`,
            }}
          >
            <div
              className="h-full bg-lime-300 transition-all duration-500"
              style={{ width: `${(activeStep / (t.howItWorks.steps.length - 1)) * 100}%` }}
            />
          </div>

          {t.howItWorks.steps.map((step, index) => (
            <div
              className={`relative z-10 flex flex-col items-center rounded-2xl px-3 py-4 text-center transition-all duration-300 lg:flex-1 ${
                activeStep === index ? "bg-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : ""
              }`}
              key={step.title}
            >
              <div className="relative flex h-10 w-full items-center justify-center">
                <button
                  aria-label={`${step.title} (${index + 1})`}
                  className={`relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                    activeStep === index
                      ? "scale-110 border-lime-300 bg-lime-300 text-black shadow-[0_0_0_6px_rgba(190,242,100,0.15)]"
                      : index < activeStep
                        ? "border-lime-300 bg-lime-300/20 text-lime-300"
                        : "border-white/15 bg-black text-white hover:border-lime-300/50"
                  }`}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              </div>
              <h3
                className={`mt-4 font-[family-name:var(--font-sora)] text-base font-semibold transition-colors duration-300 ${
                  activeStep === index ? "text-lime-300" : "text-white"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-6 transition-colors duration-300 ${
                  activeStep === index ? "text-zinc-200" : "text-zinc-400"
                }`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>{t.pricing.badge}</Badge>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.pricing.title}
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.pricing.subtitle}</p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-center">
          {t.pricing.tabs.map((tab, index) => (
            <button
              className={`min-w-0 rounded-full border px-2 py-2 text-[10px] font-semibold uppercase tracking-wide transition-colors sm:px-5 sm:text-xs sm:tracking-widest ${
                activePricingTab === index
                  ? "border-lime-300 bg-lime-300 text-black"
                  : "border-white/15 text-zinc-300 hover:border-lime-300/50"
              }`}
              key={tab.key}
              onClick={() => {
                setActivePricingTab(index);
                setSelectedPackage(null);
              }}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {t.pricing.tabs[activePricingTab].plans.map((plan) => {
            const isSelected =
              selectedPackage?.service === (t.contact.form.services[activePricingTab] ?? t.contact.form.services[0]) &&
              selectedPackage.plan === plan.name;

            return (
            <Card
              key={plan.name}
              className={`flex flex-col transition-all duration-300 ${
                isSelected
                  ? "border-lime-300 bg-lime-300/[0.08] shadow-[0_0_0_2px_rgba(190,242,100,0.18),0_20px_50px_rgba(0,0,0,0.35)]"
                  : plan.featured
                    ? "border-lime-300/40 bg-lime-300/[0.04] xl:-translate-y-3"
                    : ""
              }`}
            >
              <CardContent className="flex flex-1 flex-col space-y-6">
                <div>
                  <p className="text-sm text-zinc-400">{plan.name}</p>
                  <p className="mt-3 text-xs text-zinc-500">Mulai</p>
                  <p className="mt-1 font-[family-name:var(--font-sora)] text-3xl font-bold text-lime-300">{plan.price}</p>
                </div>

                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      className={`flex items-start gap-2 text-sm ${
                        feature.active ? "text-zinc-300" : "text-zinc-600 line-through"
                      }`}
                      key={feature.text}
                    >
                      <Check className={`mt-0.5 size-4 shrink-0 ${feature.active ? "text-lime-300" : "text-zinc-600"}`} />
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <Button
                  aria-pressed={isSelected}
                  className="w-full"
                  onClick={() => selectPackage(plan)}
                  variant={isSelected ? "default" : "outline"}
                >
                  {isSelected
                    ? t.pricing.selected
                    : plan.price === "Custom"
                      ? t.pricing.ctaEnterprise
                      : t.pricing.ctaDefault}
                </Button>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>{t.testimonials.badge}</Badge>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {t.testimonials.items.map((item) => (
            <Card key={item.name}>
              <CardContent className="space-y-5">
                <div className="flex gap-1 text-lime-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star className="size-4 fill-lime-300" key={i} />
                  ))}
                </div>
                <p className="leading-7 text-zinc-300">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                    <User className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-zinc-400">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="contact">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 leading-7 text-zinc-400">{t.contact.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {t.contact.info.map((item, index) => {
              const Icon = [MessageCircleMore, Mail, MapPin][index];

              return (
                <Card key={item.label}>
                  <CardContent className="flex items-center gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-zinc-400">{item.value}</p>
                      {item.note && <p className="text-xs font-medium text-lime-300">{item.note}</p>}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardContent>
              <ContactForm
                key={selectedPackage ? `${selectedPackage.service}-${selectedPackage.plan}-${selectedPackage.price}` : "empty"}
                selectedPackage={selectedPackage}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
