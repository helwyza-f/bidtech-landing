"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-black/45 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4 md:px-8">
        <a className="flex items-center" href="#hero">
          <Image
            src="/images/Logo.png"
            alt="BidTech logo"
            width={396}
            height={88}
            priority
            className="h-7 w-auto object-contain sm:h-9"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          {navItems.map((item) => (
            <a className="transition hover:text-lime-300" href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block" ref={menuRef}>
            <button
              className="flex items-center gap-1 text-sm text-zinc-300 transition hover:text-lime-300"
              onClick={() => setOpen((v) => !v)}
              type="button"
            >
              {lang.toUpperCase()} <ChevronDown className="size-3.5" />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-xl border border-white/10 bg-black/95 py-1 shadow-xl backdrop-blur-xl">
                {(
                  [
                    { code: "id", label: "Indonesia" },
                    { code: "en", label: "English" },
                  ] as const
                ).map((option) => (
                  <button
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-white/5 hover:text-lime-300"
                    key={option.code}
                    onClick={() => {
                      setLang(option.code);
                      setOpen(false);
                    }}
                    type="button"
                  >
                    {option.label}
                    {lang === option.code && <Check className="size-3.5 text-lime-300" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#contact">
            <Button size="sm" className="h-9 rounded-full px-3 text-xs sm:h-10 sm:px-4 sm:text-sm">
              {t.header.cta}
            </Button>
          </a>

          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/8 bg-black/95 px-4 py-4 md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <a
                className="rounded-xl px-3 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-lime-300"
                href={item.href}
                key={item.label}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mx-auto mt-3 flex max-w-7xl gap-2 border-t border-white/8 pt-3">
            {(["id", "en"] as const).map((code) => (
              <button
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase ${
                  lang === code ? "border-lime-300 bg-lime-300 text-black" : "border-white/15 text-zinc-300"
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
