"use client";

import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaYoutube, FaEnvelope, FaGlobe } from "react-icons/fa6";

import { SmartNavLink } from "@/components/layouts/smart-nav-link";
import { useLanguage } from "@/lib/i18n";
import { logoAssets } from "@/lib/data";

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/bidtechsolutions/",
    label: "Instagram",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/628217601455",
    label: "WhatsApp",
  },
  {
    icon: FaEnvelope,
    href: "mailto:cs@bidtech.co.id",
    label: "Email Resmi",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
  },
  {
    icon: FaGlobe,
    href: "https://bidtech.co.id",
    label: "Website",
  },
];

export function SiteFooter() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80 pt-10 pb-3 sm:pt-20 sm:pb-6">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 z-10">
        {/* Top Header Row: Logo, Tagline & Back to Top Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 pb-8 sm:pb-14 border-b border-slate-100">
          <div className="max-w-2xl">
            <Image
              src={logoAssets.footer.src}
              alt={logoAssets.footer.alt}
              width={logoAssets.footer.width}
              height={logoAssets.footer.height}
              className="h-8 sm:h-12 w-auto object-contain"
            />
            <h3 className="mt-3.5 sm:mt-5 font-[family-name:var(--font-sora)] text-lg sm:text-2xl lg:text-[28px] font-bold tracking-tight text-slate-950 leading-snug">
              {t.footer.description}
            </h3>
          </div>

        </div>

        {/* Middle Section: 4-Column Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 lg:gap-12 py-8 sm:py-14">
          {/* Column 1: Navigasi */}
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 sm:mb-5">
              {t.footer.navTitle}
            </p>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-medium text-slate-700">
              {t.footer.navItems.map((item) => (
                <li key={item.label}>
                  <SmartNavLink
                    className="transition-colors hover:text-[#45a02e]"
                    href={item.href}
                  >
                    {item.label}
                  </SmartNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Layanan */}
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 sm:mb-5">
              {t.footer.servicesTitle}
            </p>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-medium text-slate-700">
              {t.footer.servicesItems.map((item) => (
                <li key={item}>
                  <SmartNavLink
                    className="transition-colors hover:text-[#45a02e]"
                    href="#services"
                  >
                    {item}
                  </SmartNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Bantuan */}
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 sm:mb-5">
              {t.footer.helpTitle}
            </p>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm font-medium text-slate-700">
              {t.footer.helpItems.map((item) => (
                <li key={item}>
                  <a
                    className="transition-colors hover:text-[#45a02e]"
                    href={item === "FAQ" ? "#faq" : "#contact"}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Ikuti Kami */}
          <div className="text-left col-span-2 sm:col-span-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 sm:mb-5">
              {t.footer.followUsTitle ?? "IKUTI KAMI"}
            </p>
            {/* Social Icons Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    aria-label={social.label}
                    className="flex size-9 sm:size-10 items-center justify-center rounded-2xl bg-slate-100/90 text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e8f7e2] hover:text-[#45a02e]"
                    href={social.href}
                    key={social.label}
                    rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
            {/* Subtext description */}
            <p className="mt-3.5 sm:mt-5 text-xs text-slate-500 leading-relaxed max-w-xs">
              {t.footer.followUsSub ?? "Konsultasi digital dan penjadwalan arsitek solusi tersedia setiap hari kerja."}
            </p>
          </div>
        </div>

        {/* Bottom Row: Copyright & Status Badge */}
        <div className="border-t border-slate-200/80 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-xs sm:text-sm text-slate-500 font-medium text-center sm:text-left">
            {t.footer.copyright}
          </p>
        </div>

        {/* Giant Watermark "BIDTECH" */}
        <div className="@container relative mt-8 sm:mt-12 -mb-3 sm:-mb-6 -mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-full overflow-hidden select-none pointer-events-none flex items-center justify-center">
          <span className="font-[family-name:var(--font-playfair)] font-bold tracking-[0.02em] sm:tracking-[0.04em] text-[clamp(4.2rem,21.8vw,16.8rem)] text-[21.6cqw] leading-[0.78] text-[#c5e7b7] uppercase block whitespace-nowrap text-center">
            BIDTECH
          </span>
        </div>
      </div>
    </footer>
  );
}
