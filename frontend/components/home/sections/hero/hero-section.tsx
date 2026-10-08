"use client";

import { useLanguage } from "@/lib/i18n";

import { HeroShowcase } from "./hero-showcase";

export function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="landing-panel relative overflow-hidden bg-white text-slate-950 pt-4 sm:pt-8 md:pt-10 pb-12 sm:pb-16"
      id="hero"
    >
      {/* Top subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(ellipse_at_top,_rgba(95,201,74,0.06),_transparent_65%)] -z-10"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <HeroShowcase key={lang} />
      </div>
    </section>
  );
}
