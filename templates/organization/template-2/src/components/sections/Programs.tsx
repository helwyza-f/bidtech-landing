'use client';

import Image from "next/image";
import { colors } from "@lib/color";
import { useLanguage } from "@lib/LanguageContext";
import ScrollReveal from "@components/ui/ScrollReveal";
import { PROGRAMS } from "@constants/programs";
import { asset } from "@constants/index";

export default function ProgramsSection() {
  const { t } = useLanguage();

  return (
    <section id="program" className="py-16 md:py-24 px-4 md:px-8 bg-slate-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal animation="slide-up" className="text-center mb-12 md:mb-16">
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-3 inline-flex rounded-full px-4 py-2 bg-white border border-slate-200"
            style={{ color: colors.primary }}
          >
            {t("program.label")}
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
            {t("program.heading")}
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("program.desc")}
          </p>
        </ScrollReveal>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {PROGRAMS.map((prog, idx) => (
            <ScrollReveal
              key={idx}
              as="article"
              animation="slide-up"
              delay={idx * 150}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={asset(prog.image)}
                  alt={prog.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={idx === 0}
                />
                {/* Badge Overlay */}
                <div
                  className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md"
                  style={{ backgroundColor: colors.primary }}
                >
                  {t(prog.badgeKey)}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider block mb-2"
                    style={{ color: colors.primary }}
                  >
                    {t(prog.scheduleKey)}
                  </span>
                  <h4 className="text-xl font-bold text-black mb-3 leading-tight group-hover:text-[#053f5c] transition-colors duration-250">
                    {t(prog.titleKey)}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t(prog.descKey)}
                  </p>
                </div>
                
                {/* Bottom line decorator */}
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-bold" style={{ color: colors.primary }}>
                  <span>{t("program.detailBtn")}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
