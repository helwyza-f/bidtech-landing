'use client';

import Image from "next/image";
import { colors } from "@lib/color";
import { useLanguage } from "@lib/LanguageContext";
import { asset } from "@constants/index";

export default function HeroSection() {
  const { t } = useLanguage();
  const titleWords = t("hero.title").split(" ");

  return (
    <section className="relative w-full bg-gradient-to-b from-[#e2f3f7] via-[#e2f3f7] to-white pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden">
      {/* Top Text Content Area (Aligned with 7xl margins) */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col gap-6">
        
        {/* Connection/Collaborate Badge */}
        <span 
          className="inline-flex items-center rounded-full px-4 py-1 text-xs sm:text-sm font-semibold w-fit border shadow-sm bg-white/80 animate-slide-left"
          style={{ 
            color: colors.primary,
            borderColor: "#c4e3eb",
            animationDelay: "0.1s"
          }}
        >
          Slogan · Singkat · Organisasi
        </span>

        {/* Title & Subtitle Group */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-5xl"
          style={{ color: colors.primary }}
        >
          <span className="inline-flex flex-wrap">
            {titleWords.map((word, index) => (
              <span
                key={index}
                className="inline-block mr-3 animate-blur-up"
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                {word}
              </span>
            ))}
          </span>{" "}
          <span 
            className="text-slate-500 font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl block sm:inline mt-2 sm:mt-0 animate-blur-up"
            style={{ animationDelay: `${0.2 + titleWords.length * 0.15}s` }}
          >
            {t("hero.subtitle")}
          </span>
        </h1>

        {/* Description */}
        <p 
          className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl font-medium animate-slide-up"
          style={{ animationDelay: `${0.3 + titleWords.length * 0.15}s` }}
        >
          {t("hero.desc")}
        </p>

        {/* Pill CTA Button (Primary background, white text) */}
        <a
          href="#membership"
          className="w-fit px-6 py-2.5 rounded-full text-white text-sm sm:text-base font-bold transition-all hover:opacity-90 shadow-md cursor-pointer inline-flex items-center justify-center animate-slide-up"
          style={{ 
            backgroundColor: colors.primary,
            animationDelay: `${0.4 + titleWords.length * 0.15}s`
          }}
        >
          {t("hero.cta")}
        </a>
      </div>

      {/* Bottom Rounded Image Area (Aligned with 7xl margins) */}
      <div className="max-w-7xl mx-auto">
        <div
          className="relative w-full aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/50 shadow-2xl bg-white animate-image-up"
          style={{
            animationDelay: `${0.5 + titleWords.length * 0.15}s`
          }}
        >
          <Image
            src={asset("/img/hero.webp")}
            alt="Ilustrasi kegiatan organisasi"
            fill
            quality={90}
            sizes="(max-width: 1280px) 92vw, 1216px"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
