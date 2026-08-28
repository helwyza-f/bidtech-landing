'use client';

import { colors } from "@lib/color";
import { useLanguage } from "@lib/LanguageContext";
import ScrollReveal from "@components/ui/ScrollReveal";
import { TESTIMONIALS } from "@constants/testimonials";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal animation="slide-up" className="text-center mb-12 md:mb-16">
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-3 inline-flex rounded-full px-4 py-2 bg-white border border-slate-200"
            style={{ color: colors.primary }}
          >
            {t("testimonials.label")}
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
            {t("testimonials.heading")}
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("testimonials.desc")}
          </p>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <ScrollReveal
              key={idx}
              as="article"
              animation="slide-up"
              delay={idx * 150}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between relative group"
            >
              {/* Quote Icon Background Decorator */}
              <span className="absolute top-4 right-6 text-7xl font-serif text-slate-100 select-none pointer-events-none group-hover:text-slate-200/60 transition-colors duration-300">
                “
              </span>

              <div className="relative z-10">
                <p className="text-sm md:text-base text-gray-600 italic leading-relaxed mb-8">
                  &ldquo;{t(item.textKey)}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-slate-50">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0"
                  style={{
                    backgroundColor: item.color,
                    color: item.color === "#f1f5f9" ? "#0f172a" : "#ffffff"
                  }}
                >
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-black leading-tight">
                    {t(item.nameKey)}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {t(item.roleKey)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
