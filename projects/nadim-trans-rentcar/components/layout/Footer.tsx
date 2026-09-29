"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { COMPANY_INFO } from "@/lib/data";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

export default function Footer() {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-amber-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <Link href={getLocalizedPath(locale, "/")} className="inline-flex items-center gap-3 group">
                  <div className="relative h-12 w-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/icons/icon-2.webp"
                      alt="PT. Nadim Auto Transindo Logo"
                      fill
                      sizes="48px"
                      className="object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.45)]"
                    />
                  </div>
                  <Image
                    src="/icons/icon-3.webp"
                    alt="NadimTrans Rentcar"
                    width={240}
                    height={80}
                    className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </Link>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
                {t("footer.description")}
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href={COMPANY_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a
                  href={COMPANY_INFO.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
                  </svg>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 flex items-center justify-center transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-6">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href={getLocalizedPath(locale, "/")}
                  className="text-sm font-medium text-gray-300 hover:text-amber-300 transition-colors"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath(locale, "/kendaraan")}
                  className="text-sm font-medium text-gray-300 hover:text-amber-300 transition-colors"
                >
                  {t("footer.vehicleList")}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath(locale, "/layanan")}
                  className="text-sm font-medium text-gray-300 hover:text-amber-300 transition-colors"
                >
                  {t("footer.servicesPackages")}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath(locale, "/faq")}
                  className="text-sm font-medium text-gray-300 hover:text-amber-300 transition-colors"
                >
                  {t("footer.faqLink")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-6">
              {t("footer.serviceContact")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div className="text-sm font-medium text-gray-200">
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-amber-300 transition-colors block">
                    {COMPANY_INFO.phone}
                  </a>
                  <a href={`tel:${COMPANY_INFO.phone2}`} className="hover:text-amber-300 transition-colors text-xs text-gray-400 block">
                    {COMPANY_INFO.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-sm font-medium text-gray-200 hover:text-amber-300 transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-300">
                  {t("footer.alwaysReady")}
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-6">
              {t("footer.office")}
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
              <a
                href={COMPANY_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-300 leading-relaxed hover:text-amber-300 transition-colors"
              >
                {COMPANY_INFO.address}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-gray-400 uppercase text-center sm:text-left">
            © 2024 PT. NADIM AUTO TRANSINDO (NADIMTRANS RENTCAR). ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6 sm:gap-8">
            <a
              href="#"
              className="text-[11px] sm:text-xs font-semibold tracking-wider text-gray-400 hover:text-amber-300 uppercase transition-colors"
            >
              {t("footer.privacy")}
            </a>
            <a
              href="#"
              className="text-[11px] sm:text-xs font-semibold tracking-wider text-gray-400 hover:text-amber-300 uppercase transition-colors"
            >
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
