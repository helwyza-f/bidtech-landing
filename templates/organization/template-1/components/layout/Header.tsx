'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Mail } from 'lucide-react';
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
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomepage = pathname === '/';
  const isSolid = isScrolled || !isHomepage || mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? 'bg-[#0D4D44] shadow-lg shadow-black/15 py-3 md:py-3.5 border-b border-emerald-900/40'
          : 'bg-transparent backdrop-blur-[2px] border-b border-white/10 py-3 md:py-4 shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "") + "/"} className="flex items-center gap-2.5 group shrink-0">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "") + "/images/logo.webp"}
                alt="BIDTECH Logo"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </a>

          {/* Desktop Navigation Links with White Text & White Underline on Hover */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative py-1.5 text-sm font-semibold transition-colors duration-200 ${
                    isActive ? 'text-white font-bold' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Bottom Line: White underline on hover and active */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-white rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden md:flex items-center shrink-0">
            <Link href="/#kontak">
              <Button
                className="bg-[#48B800] hover:bg-[#3ea200] text-white text-xs px-5 py-2.5 rounded-xl font-bold shadow-md shadow-[#48B800]/25 inline-flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
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
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 flex flex-col items-center justify-center gap-1.5 text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-200 ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#0D4D44] border-b border-black/20 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white/15 text-white font-bold border-l-4 border-[#48B800]'
                        : 'text-gray-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#48B800]" />}
                  </a>
                );
              })}
              <div className="pt-3 border-t border-white/15">
                <Link href="/#kontak" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-center text-xs sm:text-sm bg-[#48B800] hover:bg-[#3ea200] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-[#48B800]/25">
                    <Mail className="w-4 h-4" />
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
