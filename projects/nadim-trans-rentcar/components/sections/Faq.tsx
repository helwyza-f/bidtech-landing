"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getFaqs } from "@/lib/localizedData";
import type { Locale } from "@/lib/i18n";

export default function Faq() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const faqItems = getFaqs(locale).filter((faq) => [5, 10, 15, 16].includes(faq.id));

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-12 sm:py-16 md:py-20 bg-[#f8f9fc] flex flex-col justify-center">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 tracking-tight mb-3">
            {t("home.faqTitle")}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t("home.faqDescription")}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden transition-shadow duration-300 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left focus:outline-none transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`flex-shrink-0 text-amber-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                      }`}
                  >
                    <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </button>

                {isExpanded && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="px-6 sm:px-8 pb-6 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-50">
                        {item.answer}
                      </div>
                    </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
