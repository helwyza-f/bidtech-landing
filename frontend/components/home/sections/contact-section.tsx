"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Copy, Mail, MapPin } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { ContactForm } from "@/components/home/components/contact-form";
import { useLanguage } from "@/lib/i18n";

export function ContactSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(t.contact.cards.emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="landing-panel relative py-12 sm:py-16 md:py-24"
      id="contact"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(95,201,74,0.14),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 -z-10 h-64 w-full max-w-3xl rounded-full bg-[#5fc94a]/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#45a02e]">
              {t.contact.badge}
            </span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-[40px] leading-tight">
            {t.contact.titlePrefix}{" "}
            <span className="text-[#45a02e]">{t.contact.titleHighlight}</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed text-slate-600">
            {t.contact.subtitle}
          </p>
        </Reveal>

        {/* 2-Column Content Grid: Left Cards & Right Form */}
        <div className="mt-10 sm:mt-14 grid gap-6 lg:gap-8 lg:grid-cols-[410px_1fr] xl:grid-cols-[430px_1fr] items-start">
          {/* Left Column: 4 Distinct Contact Info Cards */}
          <Reveal className="space-y-4 sm:space-y-5" y={16}>
            {/* Card 1: WhatsApp Consultation */}
            <div className="group rounded-[20px] sm:rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ea] border border-[#d6f2c9] text-[#45a02e]">
                  <Mail className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-sora)] text-base font-bold text-slate-900 leading-snug">
                    {t.contact.cards.whatsappTitle}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {t.contact.cards.whatsappNumber}
                  </p>
                  <a
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#45a02e] hover:text-[#3b8e26] transition-colors group/link"
                    href="https://wa.me/628217601455"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>{t.contact.cards.whatsappCta}</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Official Email */}
            <div className="group rounded-[20px] sm:rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ea] border border-[#d6f2c9] text-[#45a02e]">
                  <Mail className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-sora)] text-base font-bold text-slate-900 leading-snug">
                    {t.contact.cards.emailTitle}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {t.contact.cards.emailSubtitle}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <a
                      className="text-xs font-bold text-[#45a02e] hover:underline"
                      href={`mailto:${t.contact.cards.emailAddress}`}
                    >
                      {t.contact.cards.emailAddress}
                    </a>
                    <button
                      aria-label="Salin email"
                      className="inline-flex items-center justify-center p-1 text-slate-400 hover:text-[#45a02e] transition-colors cursor-pointer"
                      onClick={handleCopyEmail}
                      type="button"
                    >
                      {copied ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#45a02e]">
                          <Check className="size-3.5" />
                          <span className="text-[10px]">{t.contact.cards.copiedTooltip}</span>
                        </span>
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Jakarta Office with Satellite Map Preview */}
            <div className="group rounded-[20px] sm:rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ea] border border-[#d6f2c9] text-[#45a02e]">
                  <MapPin className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-sora)] text-base font-bold text-slate-900 leading-snug">
                    {t.contact.cards.jakartaTitle}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs font-medium text-[#45a02e] leading-relaxed">
                    {t.contact.cards.jakartaAddress}
                  </p>
                </div>
              </div>

              {/* Satellite Map Preview with Red Pin & Floating Button */}
              <div className="relative mt-4 h-36 sm:h-40 w-full overflow-hidden rounded-[14px] border border-slate-100 bg-slate-100">
                <Image
                  alt={t.contact.cards.jakartaTitle}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 430px, 90vw"
                  src="/images/map-jakarta.jpg"
                />
                <a
                  className="absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-slate-200/90 px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-md hover:bg-white hover:border-[#45a02e] hover:text-[#45a02e] transition-all cursor-pointer"
                  href="https://www.google.com/maps/search/?api=1&query=-6.207275%2C106.822519"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{t.contact.cards.openGoogleMaps}</span>
                </a>
              </div>
            </div>

            {/* Card 4: Batam Office with Satellite Map Preview */}
            <div className="group rounded-[20px] sm:rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f9ea] border border-[#d6f2c9] text-[#45a02e]">
                  <MapPin className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--font-sora)] text-base font-bold text-slate-900 leading-snug">
                    {t.contact.cards.batamTitle}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs font-medium text-[#45a02e] leading-relaxed">
                    {t.contact.cards.batamAddress}
                  </p>
                </div>
              </div>

              {/* Satellite Map Preview with Red Pin & Floating Button */}
              <div className="relative mt-4 h-36 sm:h-40 w-full overflow-hidden rounded-[14px] border border-slate-100 bg-slate-100">
                <Image
                  alt={t.contact.cards.batamTitle}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 430px, 90vw"
                  src="/images/map-batam.jpg"
                />
                <a
                  className="absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-slate-200/90 px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-md hover:bg-white hover:border-[#45a02e] hover:text-[#45a02e] transition-all cursor-pointer"
                  href="https://www.google.com/maps/search/?api=1&query=1.1058157731502605%2C104.07543166924557"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{t.contact.cards.openGoogleMaps}</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Contact Consultation Form Card */}
          <Reveal delay={100} y={16}>
            <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              <ContactForm selectedPackage={null} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

