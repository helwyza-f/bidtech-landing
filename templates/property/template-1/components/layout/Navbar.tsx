"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Boxes, Phone, Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";

interface NavbarProps {
  lang: "en" | "id";
  onToggleLang: () => void;
  heroTheme?: "dark" | "light";
  onToggleHeroTheme?: () => void;
}

export default function Navbar({
  lang,
  onToggleLang,
  heroTheme = "dark",
  onToggleHeroTheme,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastState = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          // Smooth hysteresis threshold to eliminate boundary jitter
          if (!lastState && currentScroll > 220) {
            lastState = true;
            setIsScrolled(true);
          } else if (lastState && currentScroll < 150) {
            lastState = false;
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        if (typeof window !== "undefined" && (window as any).lenis) {
          (window as any).lenis.scrollTo(targetElement as HTMLElement, {
            offset: -20,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      {/* 100% Fixed Vertical Top Anchor */}
      <header
        id="main-nav"
        className="fixed top-3 sm:top-5 left-0 w-full z-50 flex justify-center pointer-events-none px-3 sm:px-8 md:px-12 transition-all duration-500"
      >
        {/* Horizontal Morphing Shell */}
        <div
          className={`w-full pointer-events-auto flex items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
              ? "max-w-[880px] glass-scrolled-dock px-4 sm:px-6 py-2 sm:py-2.5"
              : "max-w-[1440px] bg-black/55 md:bg-black/40 backdrop-blur-xl md:backdrop-blur-md border border-white/15 px-3.5 sm:px-6 md:px-8 py-2 sm:py-3.5 shadow-2xl"
            }`}
        >
          {/* Left: Brand Monogram & Persistent Brand Text */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0 mr-2 sm:mr-4 md:mr-6"
            aria-label="BuildingBlocks Home"
          >
            <div
              className={`rounded-full border flex items-center justify-center font-bold text-white transition-all duration-500 ease-out ${isScrolled
                  ? "w-7 h-7 bg-white/15 border-white/25 group-hover:scale-105"
                  : "w-7 h-7 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm border-white/20 group-hover:scale-105"
                }`}
            >
              <Boxes className={`text-white transition-all duration-500 ${isScrolled ? "w-3.5 h-3.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}`} />
            </div>

            {/* Brand Text: Stays permanently visible on mobile & desktop with smooth responsiveness */}
            <div className="overflow-hidden flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-[170px] sm:max-w-[220px] opacity-100">
              <span className="text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-extrabold uppercase text-white whitespace-nowrap">
                DENNN HOUSE
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
                ? "gap-5 lg:gap-6 text-[11px] font-mono tracking-widest uppercase text-neutral-300"
                : "gap-6 lg:gap-8 text-xs font-medium tracking-wide text-neutral-300"
              }`}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {lang === "en" ? item.label : item.labelId}
              </Link>
            ))}
          </nav>

          {/* Right: Controls & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Hero Light/Dark Theme Switcher */}
            {onToggleHeroTheme && (
              <button
                onClick={onToggleHeroTheme}
                className={`flex items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${isScrolled ? "w-7 h-7 bg-white/10" : "w-7 h-7 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm hover:bg-white/15"
                  }`}
                title={heroTheme === "light" ? "Switch to Dark Hero" : "Switch to Light Hero"}
                aria-label="Toggle Hero Theme"
              >
                {heroTheme === "light" ? (
                  <Moon className="w-3.5 h-3.5 text-amber-300 transition-transform duration-300" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300" />
                )}
              </button>
            )}

            {/* Desktop Language Switch */}
            <button
              onClick={onToggleLang}
              className={`hidden md:block font-mono font-bold transition-all duration-500 text-neutral-300 hover:text-white ${isScrolled ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"
                }`}
            >
              {isScrolled ? (lang === "en" ? "EN" : "ID") : (lang === "en" ? "EN | ID" : "ID | EN")}
            </button>

            {/* Desktop Phone Button: Horizontal Width Transition */}
            <a
              href="tel:+923199492066"
              className={`hidden md:flex items-center rounded-full bg-white text-black hover:bg-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md active:scale-95 ${isScrolled
                  ? "w-7 h-7 p-0 justify-center"
                  : "px-3.5 py-1.5 gap-2 text-xs font-bold tracking-tight"
                }`}
              title="+92 319 949 2066"
            >
              <div
                className={`overflow-hidden flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
                    ? "max-w-0 opacity-0"
                    : "max-w-[140px] opacity-100"
                  }`}
              >
                <span className="whitespace-nowrap">+92 319 949 2066</span>
              </div>

              <div
                className={`flex items-center justify-center transition-all duration-500 shrink-0 ${isScrolled
                    ? "w-full h-full text-black"
                    : "w-5 h-5 rounded-full bg-black text-white"
                  }`}
              >
                <Phone className="w-3 h-3" />
              </div>
            </a>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex md:hidden items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 active:scale-90 cursor-pointer focus:outline-none"
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
            >
              <div className={`transition-transform duration-300 ${mobileMenuOpen ? "rotate-90" : "rotate-0"}`}>
                {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Smooth Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-50 md:hidden transition-opacity duration-300 ease-out ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Drawer Panel with Spring Transition */}
      <div
        className={`fixed inset-x-3.5 top-14 sm:top-16 z-50 max-w-lg mx-auto glass-scrolled-dock rounded-3xl p-5 sm:p-6 flex flex-col gap-4 text-white shadow-2xl md:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          }`}
      >
        {/* Top Bar inside Drawer */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Boxes className="w-3 h-3 text-white" />
            </div>
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-neutral-300 uppercase">
              DENNN HOUSE
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
            aria-label="Close menu"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 py-1">
          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/10 active:bg-white/15 text-neutral-200 hover:text-white transition-all duration-200 group active:scale-[0.98]"
            >
              <span className="text-base font-medium tracking-tight">
                {lang === "en" ? item.label : item.labelId}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                0{idx + 1}
              </span>
            </Link>
          ))}
        </nav>

        {/* Direct Call CTA Button */}
        <a
          href="tel:+923199492066"
          className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-white text-black font-bold text-xs tracking-wide hover:bg-neutral-200 active:bg-neutral-300 transition-all duration-200 shadow-lg active:scale-[0.98]"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
              <Phone className="w-3 h-3" />
            </div>
            <span>+92 319 949 2066</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </a>

        {/* Bottom Actions: Theme & Language */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          {onToggleHeroTheme && (
            <button
              onClick={() => {
                onToggleHeroTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-mono font-medium text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-all"
            >
              {heroTheme === "light" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-300" />
                  <span>HERO: DARK</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>HERO: LIGHT</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => {
              onToggleLang();
              setMobileMenuOpen(false);
            }}
            className="text-xs font-mono font-medium text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-all"
          >
            {lang === "en" ? "INDONESIAN (ID)" : "ENGLISH (EN)"}
          </button>
        </div>
      </div>
    </>
  );
}
