"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  LockKeyhole,
  MessageCircleMore,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { useLanguage } from "@/lib/i18n";

const benefitIcons = [MessageCircleMore, Eye, UsersRound, ShieldCheck] as const;

export function CtoSection() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="cto-title"
      className="landing-panel relative mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20"
      id="cto"
    >
      <Reveal y={20}>
        <div className="relative overflow-hidden rounded-[24px] border border-emerald-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.09)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(95,201,74,0.13),transparent_28%),linear-gradient(135deg,#ffffff_0%,#ffffff_58%,#f5fbf1_100%)]" />

          <div className="relative z-10 grid gap-10 px-5 py-8 sm:px-8 sm:py-10 md:min-h-[480px] md:grid-cols-[1.08fr_0.92fr] md:items-center md:gap-8 lg:min-h-[520px] lg:gap-10 lg:px-12 lg:py-12">
            <div className="max-w-[560px]">
              <div className="inline-flex min-h-8 items-center whitespace-nowrap rounded-full border border-lime-300 bg-lime-50/90 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-green-700 shadow-sm sm:text-xs sm:tracking-[0.32em]">
                {t.cto.badge}
              </div>

              <h2
                className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl"
                id="cto-title"
              >
                <span className="block">{t.cto.titleLine1}</span>
                <span className="block">
                  {t.cto.titleLine2} <span className="text-brand-primary">{t.cto.titleHighlight}</span>
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                {t.cto.subtitle}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-x-6">
                {t.cto.benefits.map((benefit, index) => {
                  const Icon = benefitIcons[index];

                  return (
                    <div
                      className="flex min-h-[68px] items-center gap-3.5 border-b border-emerald-100/80 pb-4 last:border-b-0 sm:border-b-0 sm:pb-0"
                      key={benefit.title}
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary ring-1 ring-brand-primary/10">
                        <Icon className="size-5" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-[family-name:var(--font-sora)] text-sm font-semibold leading-5 text-slate-950">
                          {benefit.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <a
                  className="inline-flex h-13 w-full shrink-0 cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand-primary px-6 text-sm font-bold text-brand-primary-dark shadow-[0_18px_42px_rgba(95,201,74,0.24)] ring-1 ring-green-700/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 sm:flex-1 md:flex-none lg:flex-1"
                  href="https://wa.me/628217601455"
                  rel="noreferrer"
                  target="_blank"
                >
                  {t.cto.ctaPrimary}
                  <ArrowRight className="size-4" />
                </a>
                <Link
                  className="inline-flex h-13 w-full shrink-0 cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-full border border-emerald-100 bg-white px-6 text-sm font-semibold text-slate-950 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-lime-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 sm:flex-1 md:flex-none lg:flex-1"
                  href="/templates"
                >
                  <Search className="size-5" />
                  {t.cto.ctaSecondary}
                </Link>
              </div>

              <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500">
                <LockKeyhole className="mt-0.5 size-4 shrink-0 text-brand-primary" />
                <span>{t.cto.trust}</span>
              </div>
            </div>

            <div aria-label={t.cto.deviceAlt} className="relative mx-auto hidden h-[350px] w-full max-w-[600px] md:block lg:h-[410px]">
              <div className="absolute bottom-[-12%] left-[-10%] top-[-12%] w-[116%]">
                <Image
                  alt={t.cto.desktopAlt}
                  className="object-contain object-center"
                  fill
                  sizes="(min-width: 1280px) 600px, (min-width: 768px) 48vw, 0px"
                  src="/images/laptop-stokin-mockup.png"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
