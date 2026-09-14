"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { siteConfig } from "@/data/site";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lenis } = useLenis();
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>("beranda");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = siteConfig.navLinks.map((l) => l.id);

    const updateActiveNav = () => {
      const currentScrollY = lenis ? lenis.scroll : window.scrollY || window.pageYOffset;
      const scrollPosition = currentScrollY + 180;
      let currentId = "beranda";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentId = id;
          }
        }
      }

      const totalHeight = document.body.offsetHeight;
      if (window.innerHeight + currentScrollY >= totalHeight - 60) {
        currentId = "reservasi";
      }

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    if (lenis) {
      lenis.on("scroll", updateActiveNav);
    }
    updateActiveNav();

    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      if (lenis) {
        lenis.off("scroll", updateActiveNav);
      }
    };
  }, [lenis]);

  // One-time load entrance animation on initial mount (isolated from Lenis state updates)
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.65, ease: "power3.out" }
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F6F6F2]/90 dark:bg-[#0B0B0C]/90 backdrop-blur-md border-b border-zinc-300/80 dark:border-zinc-800/80 transition-all duration-300 will-change-transform"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Wordmark Logo with Lime Square */}
        <Link href="#beranda" className="flex items-center space-x-1.5 group select-none">
          <span className="font-display italic text-2xl sm:text-[26px] font-bold tracking-tight text-zinc-950 dark:text-white group-hover:opacity-90 transition-opacity">
            {siteConfig.name}
          </span>
          <span className="w-2 h-2 bg-[#D8F242] inline-block flex-shrink-0" />
        </Link>

        {/* Center Links separated by Slashes */}
        <nav className="hidden md:flex items-center text-xs font-mono tracking-widest uppercase">
          {siteConfig.navLinks.map((link, index) => {
            const isActive = activeSection === link.id;
            return (
              <React.Fragment key={link.id}>
                {index > 0 && <span className="text-zinc-400 dark:text-zinc-600 px-3 select-none">/</span>}
                <a
                  href={link.href}
                  className={`py-1 transition-colors ${
                    isActive
                      ? "text-zinc-950 dark:text-[#D8F242] font-bold border-b-2 border-zinc-950 dark:border-[#D8F242]"
                      : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right Action: Book Appointment Button & Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme Toggle icon */}
          <button
            type="button"
            onClick={toggleTheme}
            className="px-2.5 py-1.5 rounded-none text-xs font-mono border border-zinc-300 dark:border-zinc-800 bg-zinc-200/80 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☾" : "☀"}
          </button>

          {/* Book Appointment CTA (Desktop / Tablet) */}
          <a
            href="#reservasi"
            className="hidden md:inline-flex px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-mono uppercase tracking-wider font-bold bg-zinc-950 text-white border border-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-black dark:border-white dark:hover:bg-zinc-200 rounded-none transition-colors whitespace-nowrap"
          >
            BOOK APPOINTMENT
          </a>

          {/* Hamburger Menu Box (Mobile Only) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 sm:p-2.5 bg-zinc-200/90 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors rounded-none flex items-center justify-center"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Expandable Mobile / Quick Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-300 dark:border-zinc-800 bg-[#F6F6F2] dark:bg-[#0E0E10] px-6 py-6 space-y-5 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3 text-xs font-mono tracking-widest uppercase">
            {siteConfig.navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-zinc-950 dark:text-[#D8F242] font-bold"
                      : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs">●</span>}
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-zinc-300 dark:border-zinc-800">
            <a
              href="#reservasi"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center py-3 bg-zinc-950 text-white font-mono text-xs uppercase font-bold tracking-widest hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors rounded-none"
            >
              BOOK APPOINTMENT [ → ]
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
