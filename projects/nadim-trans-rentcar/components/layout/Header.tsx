"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomepage = pathname === "/";
  const isSolid = isScrolled || !isHomepage || isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-none ${
        isSolid
          ? "bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-amber-500/20 text-white"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo Brand NTR */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 sm:gap-3 group py-1">
            <div className="relative h-11 sm:h-12 w-11 sm:w-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/icons/icon-2.webp"
                alt="Nadim Trans RentCar Emblem"
                fill
                priority
                className="object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.45)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight leading-none uppercase text-white group-hover:text-amber-300 transition-colors">
                Nadim <span className="text-amber-400">Trans</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-200/80">
                RentCar Batam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive
                      ? "font-bold text-amber-400"
                      : "font-medium text-white/90 hover:text-amber-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="p-2 rounded-full text-white/80 hover:text-amber-300 hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="User Profile"
            >
              <User className="w-5 h-5" />
            </button>

            <Link href="/#faq">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl font-bold px-6 shadow-md shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95">
                Hubungi Kami
              </Button>
            </Link>
          </div>

          {/* Mobile Right Icons */}
          <div className="md:hidden flex items-center gap-3 sm:gap-4">
            <button
              className="p-1.5 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="User Profile"
            >
              <User className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-xl text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-amber-500/20 shadow-2xl overflow-hidden text-white"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "text-gray-200 hover:bg-white/5 hover:text-amber-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-white/10">
                <Link href="/#faq" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="lg" className="w-full justify-center bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold rounded-xl py-3 shadow-md shadow-amber-500/30">
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
