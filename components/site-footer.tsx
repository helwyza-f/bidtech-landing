"use client";

import Image from "next/image";
import { Mail, MessageCircleMore } from "lucide-react";

import { useLanguage } from "@/lib/i18n";

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

const socials = [
  { icon: Mail, href: "mailto:cs@bidtech.co.id", label: "Email" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: MessageCircleMore, href: "https://wa.me/628217601455", label: "WhatsApp" },
];

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/8 bg-black/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/Logo.png"
                alt="BidTech logo"
                width={396}
                height={88}
                className="h-7 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">{t.footer.description}</p>
            <div className="mt-5 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-lime-300/40 hover:text-lime-300"
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

          <div>
            <p className="text-sm font-semibold text-white">{t.footer.navTitle}</p>
            <ul className="mt-4 space-y-3">
              {t.footer.navItems.map((item) => (
                <li key={item.label}>
                  <a className="text-sm text-zinc-400 transition hover:text-lime-300" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t.footer.servicesTitle}</p>
            <ul className="mt-4 space-y-3">
              {t.footer.servicesItems.map((item) => (
                <li key={item}>
                  <a className="text-sm text-zinc-400 transition hover:text-lime-300" href="#services">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t.footer.helpTitle}</p>
            <ul className="mt-4 space-y-3">
              {t.footer.helpItems.map((item) => (
                <li key={item}>
                  <a className="text-sm text-zinc-400 transition hover:text-lime-300" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/8 pt-6 text-center text-xs text-zinc-500">{t.footer.copyright}</div>
      </div>
    </footer>
  );
}
