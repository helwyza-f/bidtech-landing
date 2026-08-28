'use client';

import Image from "next/image";
import { colors } from "@lib/color";
import { useLanguage } from "@lib/LanguageContext";
import ScrollReveal from "@components/ui/ScrollReveal";
import { BLOG_ARTICLES } from "@constants/blog";
import { asset } from "@constants/index";

export default function BlogSection() {
  const { t } = useLanguage();

  return (
    <section id="blog" className="py-16 md:py-24 px-4 md:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal animation="slide-up" className="text-center mb-12 md:mb-16">
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-3 inline-flex rounded-full px-4 py-2 bg-slate-50 border border-slate-200"
            style={{ color: colors.primary }}
          >
            {t("blog.label")}
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
            {t("blog.heading")}
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t("blog.desc")}
          </p>
        </ScrollReveal>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((article, idx) => {
            const cardContent = (
              <>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={asset(article.image)}
                    alt={article.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 420px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 block mb-2">
                      {t(article.dateKey)}
                    </span>
                    <h4 className="text-base md:text-lg font-bold text-black mb-3 leading-snug group-hover:text-[#053f5c] transition-colors duration-200">
                      {t(article.titleKey)}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                      {t(article.excerptKey)}
                    </p>
                  </div>

                  <div
                    className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-1.5 text-xs font-bold transition-all duration-200"
                    style={{ color: colors.primary }}
                  >
                    <span>{t("blog.readMore")}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </>
            );

            return (
              <ScrollReveal
                key={idx}
                as="article"
                animation="slide-up"
                delay={idx * 150}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col group"
              >
                {article.href ? (
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full flex-col cursor-pointer"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className="flex h-full flex-col">
                    {cardContent}
                  </div>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
