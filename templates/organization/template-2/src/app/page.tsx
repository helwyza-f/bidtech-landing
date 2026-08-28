'use client';

import Header from "@components/layout/Header";
import HeroSection from "@components/sections/Hero";
import AboutSection from "@components/sections/About";
import ProgramsSection from "@components/sections/Programs";
import MembershipSection from "@components/sections/Membership";
import FAQSection from "@components/sections/FAQ";
import BlogSection from "@components/sections/Blog";
import TestimonialsSection from "@components/sections/Testimonials";
import ScrollReveal from "@components/ui/ScrollReveal";
import { colors } from "@lib/color";
import { SITE_NAME, CONTACT, asset } from "@constants/index";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@lib/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white m-0 p-0">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <MembershipSection />
      <BlogSection />
      <FAQSection />
      <TestimonialsSection />

      {/* Footer */}
      <footer className="pt-16 pb-8 px-4 md:px-8" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            {/* Brand */}
            <ScrollReveal animation="slide-up" delay={50} className="col-span-2 md:col-span-1">
              <Image
                src={asset("/img/logo.svg")}
                alt={SITE_NAME}
                width={56}
                height={56}
                className="h-14 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                {t("footer.desc")}
              </p>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${SITE_NAME}`}
                className="mt-5 inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors text-sm font-medium"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                  </svg>
                </span>
                {CONTACT.instagramHandle}
              </a>
            </ScrollReveal>

            {/* Quick Links */}
            <ScrollReveal animation="slide-up" delay={150} className="col-span-1 md:col-span-1">
              <h5 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
                {t("footer.navTitle")}
              </h5>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="text-white/70 hover:text-white transition-colors">{t("nav.home")}</Link></li>
                <li><a href="#about" className="text-white/70 hover:text-white transition-colors">{t("nav.about")}</a></li>
                <li><a href="#program" className="text-white/70 hover:text-white transition-colors">{t("nav.program")}</a></li>
                <li><a href="#membership" className="text-white/70 hover:text-white transition-colors">{t("nav.membership")}</a></li>
                <li><a href="#faq" className="text-white/70 hover:text-white transition-colors">{t("nav.faq")}</a></li>
              </ul>
            </ScrollReveal>

            {/* Contact */}
            <ScrollReveal animation="slide-up" delay={250} className="col-span-1 md:col-span-1">
              <h5 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
                {t("footer.contactTitle")}
              </h5>
              <ul className="space-y-3 text-sm text-white/70">
                <li>{CONTACT.address}</li>
                <li>
                  <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {CONTACT.phoneLabel}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {CONTACT.instagramHandle}
                  </a>
                </li>
              </ul>
            </ScrollReveal>

            {/* Legalities */}
            <ScrollReveal animation="slide-up" delay={350} className="col-span-2 md:col-span-1">
              <h5 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
                {t("footer.legalTitle")}
              </h5>
              <ul className="space-y-3.5 text-xs text-white/70">
                <li>
                  <strong className="text-white block text-sm font-semibold">{t("footer.skLabel")}</strong>
                  <span className="font-mono mt-0.5 block text-white/90">—</span>
                </li>
                <li>
                  <strong className="text-white block text-sm font-semibold">{t("footer.npwpLabel")}</strong>
                  <span className="font-mono mt-0.5 block text-white/90">—</span>
                </li>
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-in" delay={450} className="pt-6 text-center">
            <p className="text-white/50 text-sm">&copy; 2026 {SITE_NAME}. All rights reserved.</p>
          </ScrollReveal>
        </div>
      </footer>
    </main>
  );
}
