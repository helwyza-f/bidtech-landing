"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState("Beranda");

  // Sync active navigation item with pathname & scroll position
  useEffect(() => {
    if (pathname === "/kendaraan") {
      setActiveNav("Kendaraan");
      return;
    }

    if (pathname === "/") {
      const handleScroll = () => {
        const hashItems = [
          { label: "FAQ", id: "#faq" },
          { label: "Layanan", id: "#why-choose-us" },
          { label: "Beranda", id: "#home" },
        ];

        for (const item of hashItems) {
          const el = document.querySelector(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              setActiveNav(item.label);
              return;
            }
          }
        }

        if (window.scrollY < 200) {
          setActiveNav("Beranda");
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100/80 shadow-[0_2px_15px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-blue-600">
              Rent<span className="text-gray-900">car</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-10 items-center">
            {NAV_ITEMS.map((item) => {
              const isActive =
                (pathname === "/kendaraan" && item.href === "/kendaraan") ||
                (pathname === "/" && activeNav === item.label);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveNav(item.label)}
                  className={`relative py-1 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 font-bold"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-7 py-2.5 h-11 rounded-xl shadow-md shadow-blue-600/25 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/35 hover:scale-[1.02] active:scale-95"
            >
              Hubungi Kami
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-b border-gray-100 shadow-xl absolute w-full left-0 px-4 pt-3 pb-6"
        >
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                (pathname === "/kendaraan" && item.href === "/kendaraan") ||
                (pathname === "/" && activeNav === item.label);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.label);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 mt-2 border-t border-gray-100">
            <Button
              className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl shadow-md shadow-blue-600/25"
            >
              Hubungi Kami
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
