"use client";

import Image from "next/image";
import { Mail, MessageCircleMore } from "lucide-react";

import { useLanguage } from "@/lib/i18n";
import { brandClasses, logoAssets } from "@/lib/data";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" stroke="none" viewBox="0 0 24 24" {...props}>
      <path d="M13.5 21v-7.5H16l.5-3H13.5V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.34C16.24 4.3 15.36 4.22 14.32 4.22c-2.16 0-3.64 1.32-3.64 3.74V10.5H8.18v3h2.5V21h2.82z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" stroke="none" viewBox="0 0 24 24" {...props}>
      <path d="M14.5 3c.4 2.8 2.1 4.4 4.5 4.6v2.9c-1.5.1-2.9-.3-4.2-1.1v5.8c0 3.6-2.9 6.1-6.1 6.1-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8c.4 0 .8 0 1.2.1v3a2.8 2.8 0 0 0-1.2-.3 3 3 0 1 0 3 3V3h2.8Z" />
    </svg>
  );
}

const socials = [
  { icon: Mail, href: "mailto:cs@bidtech.co.id", label: "Email" },
  { icon: FacebookIcon, href: "https://www.facebook.com/share/14qxUb9oNEA/", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/bidtechsolutions/", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@bidtech_indonesia", label: "TikTok" },
  { icon: MessageCircleMore, href: "https://wa.me/628217601455", label: "WhatsApp" },
];

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t border-emerald-100 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbf1_48%,#edf8e9_100%)] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_18%_0%,rgba(95,201,74,0.14),transparent_36%),radial-gradient(circle_at_90%_28%,rgba(95,201,74,0.09),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-5 sm:py-14 md:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr] lg:items-start lg:gap-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex items-center gap-2">
              <Image
                src={logoAssets.footer.src}
                alt={logoAssets.footer.alt}
                width={logoAssets.footer.width}
                height={logoAssets.footer.height}
                className="h-12 w-auto object-contain sm:h-14"
              />
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600 sm:mt-4 sm:max-w-md sm:leading-7 lg:max-w-xs">{t.footer.description}</p>
            <div className="mt-5 flex gap-2.5 sm:mt-6 sm:gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    aria-label={social.label}
                    className={`flex size-9 items-center justify-center rounded-full border border-emerald-100 bg-white/90 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-primary/45 hover:bg-lime-50 sm:size-10 ${brandClasses.hoverTextPrimary}`}
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
          </div>

          <div className="grid w-full grid-cols-2 gap-x-7 gap-y-7 sm:grid-cols-3 sm:gap-10">
          <div className="min-w-0 text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-950 sm:text-xs">{t.footer.navTitle}</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
              {t.footer.navItems.map((item) => (
                <li key={item.label}>
                  <a className={`break-words text-sm leading-5 text-slate-600 transition ${brandClasses.hoverTextPrimary}`} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-950 sm:text-xs">{t.footer.servicesTitle}</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
              {t.footer.servicesItems.map((item) => (
                <li key={item}>
                  <a className={`break-words text-sm leading-5 text-slate-600 transition ${brandClasses.hoverTextPrimary}`} href="#services">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 text-left sm:col-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-950 sm:text-xs">{t.footer.helpTitle}</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
              {t.footer.helpItems.map((item) => (
                <li key={item}>
                  <a className={`break-words text-sm leading-5 text-slate-600 transition ${brandClasses.hoverTextPrimary}`} href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>

        <div className="mt-8 border-t border-emerald-100 px-2 pt-5 text-center text-xs leading-5 text-slate-400 lg:mt-12 lg:pt-6">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
