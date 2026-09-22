"use client";

import Image from "next/image";
import { ArrowUp, AtSign, Camera, MessageSquare, Share2 } from "lucide-react";

import { SmartNavLink } from "@/components/layouts/smart-nav-link";
import { useLanguage } from "@/lib/i18n";
import { logoAssets } from "@/lib/data";

function VideoPlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" {...props}>
      <rect x="2.5" y="4" width="19" height="16" rx="4.5" />
      <polygon points="10,8.5 16,12 10,15.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialLinks = [
  {
    icon: AtSign,
    href: "https://www.threads.net",
    label: "Threads",
  },
  {
    icon: MessageSquare,
    href: "https://wa.me/628217601455",
    label: "WhatsApp / Chat",
  },
  {
    icon: Camera,
    href: "https://www.instagram.com/bidtechsolutions/",
    label: "Instagram / Media",
  },
  {
    icon: Share2,
    href: "https://bidtech.co.id",
    label: "Share",
  },
  {
    icon: VideoPlayIcon,
    href: "https://youtube.com",
    label: "YouTube / Video",
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
    <footer className="relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80 pt-16 pb-4 sm:pt-20 sm:pb-6">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 z-10">
        {/* Top Header Row: Logo, Tagline & Back to Top Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 sm:pb-14 border-b border-slate-100">
          <div className="max-w-2xl">
            <Image
              src={logoAssets.footer.src}
              alt={logoAssets.footer.alt}
              width={logoAssets.footer.width}
              height={logoAssets.footer.height}
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <h3 className="mt-5 font-[family-name:var(--font-sora)] text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-slate-900 leading-snug">
              {t.footer.description}
            </h3>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 active:scale-95 cursor-pointer self-start md:self-center shrink-0"
          >
            <span>{t.footer.backToTop ?? "KEMBALI KE ATAS"}</span>
            <div className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <ArrowUp className="size-3.5" />
            </div>
          </button>
        </div>

        {/* Middle Section: 4-Column Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 py-12 sm:py-14">
          {/* Column 1: Navigasi */}
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">
              {t.footer.navTitle}
            </p>
            <ul className="space-y-3.5 text-sm font-medium text-slate-700">
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">
              {t.footer.servicesTitle}
            </p>
            <ul className="space-y-3.5 text-sm font-medium text-slate-700">
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">
              {t.footer.helpTitle}
            </p>
            <ul className="space-y-3.5 text-sm font-medium text-slate-700">
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
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">
              {t.footer.followUsTitle ?? "IKUTI KAMI"}
            </p>
            {/* Social Icons Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-2xl bg-slate-100/90 text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e8f7e2] hover:text-[#45a02e]"
                    href={social.href}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
            {/* Subtext description */}
            <p className="mt-5 text-xs text-slate-500 leading-relaxed max-w-xs">
              {t.footer.followUsSub ?? "Konsultasi digital dan penjadwalan arsitek solusi tersedia setiap hari kerja."}
            </p>
          </div>
        </div>

        {/* Bottom Row: Copyright & Operational Status */}
        <div className="border-t border-slate-200/80 pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-xs sm:text-sm text-slate-500 font-medium text-center sm:text-left">
            {t.footer.copyright}
          </p>

          {/* System Operational Status Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-slate-100 border border-slate-200/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            <span className="size-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span>{t.footer.operationalStatus ?? "System Operational & Ready for New Projects"}</span>
          </div>
        </div>

        {/* Giant Watermark "BIDTECH" */}
        <div className="relative mt-8 sm:mt-12 -mb-10 sm:-mb-16 w-full overflow-hidden select-none pointer-events-none text-center">
          <span className="font-[family-name:var(--font-playfair)] font-bold tracking-wider text-[90px] sm:text-[160px] md:text-[210px] lg:text-[260px] leading-none text-[#e8f8e4] uppercase block">
            BIDTECH
          </span>
        </div>
      </div>
    </footer>
  );
}
