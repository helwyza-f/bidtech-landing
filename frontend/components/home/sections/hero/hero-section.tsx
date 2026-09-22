"use client";

import { useLanguage } from "@/lib/i18n";

import { HeroShowcase } from "./hero-showcase";

export function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="landing-panel relative overflow-hidden bg-white text-slate-950 max-sm:pt-12"
      id="hero"
    >
      {/* sapuan ambient terpisah dari blob agar latar hero tetap lembut */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,_rgba(95,201,74,0.10),_transparent_65%)]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-5 sm:py-16 md:px-8">
        <HeroShowcase key={lang} />
      </div>
    </section>
  );
}
