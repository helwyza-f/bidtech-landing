'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Mail } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomepage = pathname === '/';
  const isSolid = isScrolled || !isHomepage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid
        ? 'bg-[#0D4D44] shadow-md py-3.5'
        : 'bg-transparent backdrop-blur-[2px] border-b border-white/10 py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "") + "/"} className="flex items-center gap-2.5 group shrink-0">
            <div>
              <img
                src={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "") + "/images/logo.webp"}
                alt="BIDTECH Logo"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Navigation Links with Underline Indicator */}
          <nav className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-sm font-semibold transition-colors duration-200 ${
                    isActive ? 'text-[#E05A47]' : 'text-gray-100 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="header-active-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E05A47] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden md:flex items-center shrink-0">
            <Link href="/#kontak">
              <Button
                className="bg-[#48B800] hover:bg-[#3ea200] text-white text-xs px-5 py-2.5 rounded-xl font-bold shadow-md inline-flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Kirim Pesan</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0D4D44] border-b border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10">
                <Link href="/#kontak" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-center text-xs bg-[#48B800] hover:bg-[#3ea200] text-white font-bold py-2.5 rounded-lg inline-flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Kirim Pesan</span>
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
