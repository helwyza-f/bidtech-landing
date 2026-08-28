'use client';

import { useState } from "react";
import { colors } from "@lib/color";
import { useLanguage } from "@lib/LanguageContext";
import ScrollReveal from "@components/ui/ScrollReveal";
import { FAQ_ITEMS } from "@constants/faq";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 px-4 md:px-8 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <ScrollReveal animation="slide-up" className="text-center mb-12">
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-3 inline-flex rounded-full px-4 py-2 bg-slate-50 border border-slate-200"
            style={{ color: colors.primary }}
          >
            {t("faq.label")}
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
            {t("faq.heading")}
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("faq.desc")}
          </p>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal
                key={index}
                animation="slide-up"
                delay={index * 100}
                className="border rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isOpen ? colors.secondary : "#e2e8f0",
                  boxShadow: isOpen ? "0 10px 25px -5px rgba(165, 221, 237, 0.35), 0 8px 10px -6px rgba(165, 221, 237, 0.35)" : "0 0 0 0 rgba(0, 0, 0, 0)",
                }}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 bg-white hover:bg-slate-50/40 transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-bold text-base md:text-lg transition-colors duration-300"
                    style={{ color: isOpen ? colors.primary : "#1e293b" }}
                  >
                    {t(item.questionKey)}
                  </span>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? colors.primary : "#f1f5f9",
                      color: isOpen ? "#ffffff" : "#475569",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="w-4 h-4 stroke-current"
                      fill="none"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={isOpen ? "M18 12H6" : "M12 4.5v15m7.5-7.5h-15"}
                      />
                    </svg>
                  </span>
                </button>

                {/* Accordion Content */}
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="p-5 md:p-6 pt-0 md:pt-0 border-t text-sm md:text-base leading-relaxed text-gray-600"
                      style={{ borderColor: "#f1f5f9" }}
                    >
                      <p className="whitespace-pre-line">{t(item.answerKey)}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
