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
          ? "bg-white/95 backdrop-blur-md shadow-sm text-gray-900"
          : "bg-gradient-to-b from-black/80 via-black/25 to-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo (Adaptive RC RENTCAR) */}
          <Link href="/" className="flex-shrink-0 relative flex items-center group py-1">
            <Image
              src="/images/logo2-light.webp"
              alt="RentCar Logo Light"
              width={260}
              height={86}
              className={`h-10 sm:h-12 md:h-14 w-auto object-contain transition-opacity duration-300 ${
                isSolid ? "opacity-0 invisible pointer-events-none absolute" : "opacity-100 visible"
              }`}
              priority
            />
            <Image
              src="/images/logo2-dark.webp"
              alt="RentCar Logo Dark"
              width={260}
              height={86}
              className={`h-10 sm:h-12 md:h-14 w-auto object-contain transition-opacity duration-300 ${
                isSolid ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none absolute"
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation (Tanpa Garis / No underlines) */}
          <nav className="hidden md:flex gap-8 items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive
                      ? "font-bold text-blue-500"
                      : isSolid
                      ? "font-medium text-gray-700 hover:text-blue-600"
                      : "font-medium text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA (User icon + Hubungi Kami) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className={`p-2 rounded-full transition-colors focus:outline-none ${
                isSolid
                  ? "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="User Profile"
            >
              <User className="w-5 h-5" />
            </button>

            <Link href="/#faq">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-6 shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95">
                Hubungi Kami
              </Button>
            </Link>
          </div>

          {/* Mobile Right Icons (User Profile + Menu hamburger, seperti contoh) */}
          <div className="md:hidden flex items-center gap-3 sm:gap-4">
            <button
              className={`p-1.5 rounded-full transition-colors focus:outline-none ${
                isSolid
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="User Profile"
            >
              <User className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1.5 rounded-xl transition-colors focus:outline-none ${
                isSolid
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:bg-white/10"
              }`}
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
            className="md:hidden bg-white border-b border-gray-100 shadow-xl overflow-hidden text-gray-900"
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
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-gray-100">
                <Link href="/#faq" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="lg" className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3 shadow-md shadow-blue-600/20">
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
