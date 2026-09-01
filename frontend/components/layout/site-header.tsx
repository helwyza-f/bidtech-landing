"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Check, ChevronDown, Menu, X } from "lucide-react";

import { SmartNavLink } from "@/components/layout/smart-nav-link";
import { useLanguage } from "@/lib/i18n";
import { brandClasses, logoAssets } from "@/lib/data";
import { getActiveHomeSection, isHomePath, scrollToSection } from "@/lib/section-navigation";

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
    { label: t.nav.about, href: "#hero" },
    // { label: t.nav.services, href: "#services" },
    // { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.template, href: "/templates" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4 md:px-8">
        <SmartNavLink className="flex items-center" href="#hero">
          <Image
            src={logoAssets.main.src}
            alt={logoAssets.main.alt}
            width={logoAssets.main.width}
            height={logoAssets.main.height}
            priority
            className="h-8 w-auto object-contain sm:h-10 md:h-11"
          />
        </SmartNavLink>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          {navItems.map((item) => (
            <SmartNavLink
              className={`relative pb-1 transition ${brandClasses.hoverTextPrimary} ${
                item.href.startsWith("#") && isHomePath(pathname) && activeSection === (item.href.slice(1))
                  ? `font-semibold ${brandClasses.textPrimary}`
                  : ""
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
            className={`${brandClasses.bgPrimary} inline-flex h-9 items-center justify-center rounded-full px-3 text-xs font-semibold text-zinc-950 shadow-[0_12px_36px_rgba(99,224,9,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-primary/90 sm:h-10 sm:px-4 sm:text-sm`}
            href="#contact"
          >
            {t.header.cta}
          </SmartNavLink>

          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            className="flex size-9 items-center justify-center rounded-full border border-zinc-200 text-slate-900 md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <SmartNavLink
                className={`rounded-xl px-3 py-3 text-sm text-slate-600 transition hover:bg-lime-50 ${brandClasses.hoverTextPrimary}`}
                href={item.href}
                key={item.label}
                onNavigate={() => setMobileOpen(false)}
              >
                {item.label}
              </SmartNavLink>
            ))}
          </nav>
          <div className="mx-auto mt-3 flex max-w-7xl gap-2 border-t border-zinc-200 pt-3">
            {(["id", "en"] as const).map((code) => (
              <button
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase ${
                  lang === code ? `${brandClasses.borderPrimary} ${brandClasses.bgPrimary} text-black` : "border-zinc-200 text-slate-600"
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
      )}
    </header>
  );
}
