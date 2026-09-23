"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";

const mitraLogos = [
  { src: "/images/mitra/mitra-appeknas-20260728.png", alt: "Logo APPEKNAS" },
  { src: "/images/mitra/mitra-kadin-batam-20260728.png", alt: "Logo Kadin Batam" },
  { src: "/images/mitra/mitra-batamnow-20260728.png", alt: "Logo BatamNow" },
  { src: "/images/mitra/mitra-apindo-20260728.png", alt: "Logo APINDO" },
  { src: "/images/mitra/mitra-poltevara-20260826.png", alt: "Logo Poltevara" },
  { src: "/images/mitra/mitra-vis-society.webp", alt: "Logo VIS Society" },
  { src: "/images/mitra/mitra-itebis.webp", alt: "Logo ITEBIS" },
  { src: "/images/mitra/mitra-hkti.webp", alt: "Logo HKTI" },
  { src: "/images/mitra/mitra-gempar.webp", alt: "Logo GEMPAR" },
];

export function MitraSection() {
  const { t } = useLanguage();

  return (
    <section className="landing-panel relative overflow-hidden bg-white py-10 sm:py-16 md:py-20" id="mitra">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="text-center">
          <Badge className="rounded-full border border-lime-300 bg-lime-50/90 px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.32em] text-green-700 shadow-sm">{t.mitra.badge}</Badge>
          <h2 className="mt-4 font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-950 sm:text-3xl">
            {t.mitra.titlePrefix} <span className="text-brand-primary">{t.mitra.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm md:text-base leading-6 text-slate-500">
            {t.mitra.subtitle}
          </p>
        </div>

        <div className="mitra-marquee-window mt-8 overflow-hidden md:mt-12">
          <div className="mitra-marquee-track flex w-max min-w-max items-center gap-3 sm:gap-4 will-change-transform">
            {[0, 1, 2].map((groupIndex) => (
              <div
                aria-hidden={groupIndex !== 0}
                className="flex shrink-0 items-center gap-3 sm:gap-4"
                key={`mitra-group-${groupIndex}`}
              >
                {mitraLogos.map((mitra) => (
                  <div
                    className="flex h-20 w-36 shrink-0 items-center justify-center rounded-[18px] sm:rounded-[22px] bg-white p-3 sm:h-28 sm:w-48 sm:p-4 border border-slate-100 shadow-sm"
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
    </section>
  );
}
