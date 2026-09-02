'use client';

import Image from "next/image";
import { SITE_NAME, CONTACT, asset } from "@constants/index";
import { colors } from "@lib/color";
import { useState } from "react";
import { useLanguage } from "@lib/LanguageContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const waMessage =
    language === "id"
      ? "Halo, saya ingin mengetahui lebih lanjut tentang organisasi dan cara bergabung. Terima kasih."
      : "Hi, I'd like to know more about the organization and how to join. Thank you.";
  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(waMessage)}`;

  const NAV_ITEMS = [
    { label: t("nav.home"), href: "/", desc: "Halaman utama" },
    { label: t("nav.about"), href: "#about", desc: "Profil organisasi" },
    { label: t("nav.program"), href: "#program", desc: "Program & inisiatif" },
    { label: t("nav.membership"), href: "#membership", desc: "Pilihan membership" },
    { label: t("nav.faq"), href: "#faq", desc: "Pertanyaan sering diajukan" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 transition-all duration-300"
      style={{
        boxShadow: "0 1px 12px rgba(0, 0, 0, 0.08)"
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo - Left */}
        <div className="relative h-14 w-36 sm:h-16 sm:w-44 md:h-20 md:w-52 flex-shrink-0">
          <Image
            src={asset("/img/logo.webp")}
            alt={SITE_NAME}
            fill
            sizes="(max-width: 768px) 180px, 250px"
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation - Center (Desktop only) */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex gap-8 lg:gap-12">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-75 group relative text-slate-700"
              >
                {item.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: colors.secondary }}
                ></span>
              </a>
            ))}
          </div>
        </div>

        {/* CTA & Language Selector - Right */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-0.5 border border-slate-200 bg-slate-50 rounded-lg p-0.5 text-[10px] sm:text-xs font-bold transition-all duration-300">
            <button
              onClick={() => setLanguage("id")}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${language === "id"
                  ? "bg-[#053f5c] text-white shadow-sm"
                  : "text-slate-600 hover:text-black"
                }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${language === "en"
                  ? "bg-[#053f5c] text-white shadow-sm"
                  : "text-slate-600 hover:text-black"
                }`}
            >
              EN
            </button>
          </div>

          {/* CTA Button (Desktop only) */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-5 py-2 rounded-md font-bold text-xs sm:text-sm transition-all hover:opacity-90 flex-shrink-0 text-white cursor-pointer"
            style={{ backgroundColor: colors.primary }}
          >
            {t("nav.contactBtn")}
          </a>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown (Drawer-like) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white py-4 px-4 shadow-lg animate-fadeIn flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-black py-2.5 border-b border-slate-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button in mobile menu */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center w-full px-5 py-3 rounded-md font-bold text-sm text-white cursor-pointer"
            style={{ backgroundColor: colors.primary }}
          >
            {t("nav.contactBtn")}
          </a>
        </div>
      )}
    </header>
  );
}
