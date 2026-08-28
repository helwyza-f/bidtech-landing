"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isSolid
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm text-gray-900"
          : "bg-gradient-to-b from-black/80 via-black/30 to-transparent border-b border-white/10 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-1 group">
            <span className="text-2xl font-extrabold text-blue-500 tracking-tight">
              Rent
              <span
                className={`font-extrabold transition-colors ${
                  isSolid ? "text-gray-900" : "text-white"
                }`}
              >
                car
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 items-center">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group relative py-1 text-sm transition-colors ${
                      isActive
                        ? "font-bold text-blue-500"
                        : isSolid
                        ? "font-medium text-gray-700 hover:text-blue-600"
                        : "font-medium text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.div
                        layoutId="activeHeaderNavAutomotive"
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                    )}
                  </Link>
                );
              })}
            </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/#faq">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-6 shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95">
                Hubungi Kami
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors focus:outline-none ${
                isSolid
                  ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
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
