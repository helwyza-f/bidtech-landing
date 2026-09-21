"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/animations/reveal";
import { TemplateDesignCard } from "@/components/home/components/template-design-card";
import { TEMPLATES } from "@/lib/data/template";
import { useLanguage } from "@/lib/i18n";

const sectionBadgeClass =
  "rounded-full border border-lime-300 bg-lime-50/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-green-700 shadow-sm";

const orderedTemplates = [...TEMPLATES].sort((a, b) => b.id - a.id);
const mobileTemplatePreview = orderedTemplates.slice(0, 4);
const desktopTemplatePreview = orderedTemplates.slice(0, 6);
const templateMoreLinkClass =
  "inline-flex h-13 items-center justify-center gap-3 rounded-full bg-brand-primary px-7 text-sm font-bold text-brand-primary-dark shadow-[0_18px_42px_rgba(95,201,74,0.24)] ring-1 ring-green-700/10 transition hover:-translate-y-0.5 hover:bg-brand-primary-hover sm:h-14 sm:px-8 sm:text-base";

export function TemplatePreviewSection() {
  const { t } = useLanguage();

  return (
    <section
      className="landing-panel relative mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20"
      id="templates"
    >
      <div className="pointer-events-none absolute inset-x-4 top-28 -z-10 h-[72%] rounded-[48px] bg-[radial-gradient(circle_at_18%_20%,rgba(95,201,74,0.10),transparent_34%),radial-gradient(circle_at_80%_42%,rgba(95,201,74,0.08),transparent_30%)]" />

      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <Badge className={sectionBadgeClass}>
            {t.templatePreview.badge}
          </Badge>
        </div>

        <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
          {t.templatePreview.titlePrefix}{" "}
          <span className="text-brand-primary">
            {t.templatePreview.titleHighlight}
          </span>{" "}
          {t.templatePreview.titleSuffix}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
          {t.templatePreview.subtitle}
        </p>
      </Reveal>

      {/* ========================= */}
      {/* MOBILE / TABLET */}
      {/* 1 kolom x 4 item */}
      {/* ========================= */}

      <div className="mt-10 grid grid-cols-1 gap-5 lg:hidden">
        {mobileTemplatePreview.map((template, index) => {
          const isLastItem =
            index === mobileTemplatePreview.length - 1;

          return (
            <Reveal
              className="relative w-full"
              delay={(index % 4) * 90}
              key={template.name}
              y={30}
            >
              <TemplateDesignCard template={template} />

              {isLastItem && (
                <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-b from-white/35 via-white/80 to-white p-5">
                  <Link
                    className={templateMoreLinkClass}
                    href="/template-website"
                  >
                    {t.templatePreview.more}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              )}
            </Reveal>
          );
        })}
      </div>

      {/* ========================= */}
      {/* DESKTOP */}
      {/* 3 + 3 */}
      {/* ========================= */}

      <div className="relative mt-10 hidden lg:block">
        <div className="grid grid-cols-3 gap-5">
          {desktopTemplatePreview
            .slice(0, 3)
            .map((template, index) => (
              <Reveal
                className="h-full"
                delay={(index % 3) * 90}
                key={template.name}
                y={30}
              >
                <TemplateDesignCard template={template} />
              </Reveal>
            ))}
        </div>

        <div className="relative mt-5">
          <div className="grid grid-cols-3 gap-5">
            {desktopTemplatePreview
              .slice(3, 6)
              .map((template, index) => (
                <Reveal
                  className="h-full"
                  delay={(index % 3) * 90}
                  key={template.name}
                  y={30}
                >
                  <TemplateDesignCard template={template} />
                </Reveal>
              ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 flex h-full items-center justify-center rounded-b-[24px] bg-gradient-to-b from-white/45 via-white/90 to-white p-8">
            <Link
              className={templateMoreLinkClass}
              href="/template-website"
            >
              {t.templatePreview.more}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
