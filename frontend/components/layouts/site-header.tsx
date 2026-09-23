"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Check, ChevronDown, Menu, X } from "lucide-react";

import { SmartNavLink } from "@/components/layouts/smart-nav-link";
import { useLanguage } from "@/lib/i18n";
import { brandClasses, logoAssets } from "@/lib/data";
import { getActiveHomeSection, isHomePath, isNavItemActive, scrollToSection } from "@/lib/section-navigation";

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!isHomePath(pathname)) return;

    const syncScrollPosition = () => {
      const hash = window.location.hash;
      if (hash) {
        scrollToSection(hash, "auto");
      }

      setActiveSection(getActiveHomeSection());
    };

    const handleScroll = () => setActiveSection(getActiveHomeSection());
    const handleHashChange = () => syncScrollPosition();

    syncScrollPosition();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  const navItems = [
    { label: t.nav.home ?? "Beranda", href: "#hero" },
    { label: t.nav.findDesign ?? "Cari Design", href: "/template-website" },
    { label: t.nav.portfolio ?? "Portofolio", href: "#portfolio" },
    { label: t.nav.services ?? "Layanan", href: "#services" },
    { label: t.nav.testimonials ?? "Ulasan", href: "#testimonials" },
    { label: t.nav.contact ?? "Hubungi Kami", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3.5 py-2.5 sm:gap-4 sm:px-5 sm:py-4 md:px-8">
        <SmartNavLink className="flex items-center shrink-0" href="#hero">
          <Image
            src={logoAssets.main.src}
            alt={logoAssets.main.alt}
            width={logoAssets.main.width}
            height={logoAssets.main.height}
            priority
            className="h-8 w-auto object-contain sm:h-10 md:h-11"
          />
        </SmartNavLink>

        <nav className="hidden items-center gap-7 lg:gap-8 text-sm text-slate-600 md:flex">
          {navItems.map((item) => (
            <SmartNavLink
              className={`relative pb-1 transition ${brandClasses.hoverTextPrimary} ${
                isNavItemActive(item.href, pathname, activeSection) ? `font-semibold ${brandClasses.textPrimary}` : ""
              }`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </SmartNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block" ref={menuRef}>
            <button
              className={`flex items-center gap-1 text-sm text-slate-600 transition ${brandClasses.hoverTextPrimary}`}
              onClick={() => setOpen((v) => !v)}
              type="button"
            >
              {lang.toUpperCase()} <ChevronDown className="size-3.5" />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-xl">
                {(
                  [
                    { code: "id", label: "Indonesia" },
                    { code: "en", label: "English" },
                  ] as const
                ).map((option) => (
                  <button
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-lime-50 ${brandClasses.hoverTextPrimary}`}
                    key={option.code}
                    onClick={() => {
                      setLang(option.code);
                      setOpen(false);
                    }}
                    type="button"
                  >
                    {option.label}
                    {lang === option.code && <Check className={`size-3.5 ${brandClasses.textPrimary}`} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <SmartNavLink
            className={`${brandClasses.bgPrimary} inline-flex h-9 items-center justify-center rounded-full px-3 text-xs font-semibold text-zinc-950 shadow-[0_12px_36px_rgba(99,224,9,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primary/90 sm:h-10 sm:px-4 sm:text-sm whitespace-nowrap`}
            href="#contact"
          >
            {t.header.cta}
          </SmartNavLink>

          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-slate-900 transition-colors hover:bg-slate-50 md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white/98 backdrop-blur-xl px-4 py-4 md:hidden shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => {
              const active = isNavItemActive(item.href, pathname, activeSection);
              return (
                <SmartNavLink
                  className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-[#edf8ea] text-[#45a02e] font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  href={item.href}
                  key={item.label}
                  onNavigate={() => setMobileOpen(false)}
                >
                  {item.label}
                </SmartNavLink>
              );
            })}
          </nav>
          <div className="mx-auto mt-3 flex max-w-7xl items-center justify-between border-t border-zinc-100 pt-3">
            <span className="text-xs font-medium text-slate-400">Bahasa / Language:</span>
            <div className="flex gap-2">
              {(["id", "en"] as const).map((code) => (
                <button
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase transition ${
                    lang === code
                      ? `${brandClasses.borderPrimary} ${brandClasses.bgPrimary} text-black shadow-sm`
                      : "border-zinc-200 text-slate-600 hover:bg-slate-50"
                  }`}
                  key={code}
                  onClick={() => {
                    setLang(code);
                    setMobileOpen(false);
                  }}
                  type="button"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
