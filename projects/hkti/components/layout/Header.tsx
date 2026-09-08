'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, SITE_INFO } from '@/constants';
import { getAssetPath } from '@/lib/utils';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const pathname = usePathname();

  const isHomepage = pathname === '/' || pathname === '';

  useEffect(() => {
    if (!isHomepage) {
      if (pathname.startsWith('/galeri')) {
        setActiveSection('galeri');
      }
      return;
    }

    const handleScroll = () => {
      const sections = NAV_ITEMS
        .filter((item) => item.href.includes('#'))
        .map((item) => item.href.substring(item.href.indexOf('#') + 1));
      
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage, pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileMenuOpen(false);
    if (href.includes('#') && isHomepage) {
      const sectionId = href.substring(href.indexOf('#') + 1);
      const element = document.getElementById(sectionId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
  };

  const isItemActive = (href: string) => {
    if (href === '/galeri') {
      return pathname.startsWith('/galeri');
    }
    if (isHomepage && href.includes('#')) {
      const sectionId = href.substring(href.indexOf('#') + 1);
      return activeSection === sectionId;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 lg:h-22 flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand Logo & Identity */}
        <Link 
          href="/#beranda" 
          onClick={(e) => handleNavClick(e, '/#beranda')}
          className="flex items-center gap-3 sm:gap-4 group focus:outline-none flex-shrink-0"
        >
          <img
            src={getAssetPath('/images/logo1.webp')}
            alt="Logo HKTI"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform group-hover:scale-105 duration-200 flex-shrink-0"
          />
          <div className="flex flex-col whitespace-nowrap">
            <span className="text-xs sm:text-sm lg:text-base font-extrabold tracking-tight text-hkti-forest uppercase leading-tight whitespace-nowrap">
              {SITE_INFO.name}
            </span>
            <span className="text-[9px] sm:text-[11px] lg:text-xs font-semibold text-slate-500 tracking-normal uppercase whitespace-nowrap">
              {SITE_INFO.fullName}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links: default bold & line-only hover (no background box) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[14px] xl:text-[15px] flex-shrink-0">
          {NAV_ITEMS.map((item) => {
            const isSelected = isItemActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group relative py-2 font-bold whitespace-nowrap transition-colors duration-150 ${
                  isSelected
                    ? 'text-hkti-forest'
                    : 'text-slate-800 hover:text-hkti-forest'
                }`}
              >
                <span>{item.label}</span>
                {/* Clean Underline indicator ONLY on hover (default has no line) */}
                <span className="absolute bottom-0 left-0 h-[2.5px] w-full bg-hkti-forest rounded-full transition-all duration-200 origin-left opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTA & Mobile/Tablet Controls (with expanded spacing) */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Link
            href="/#kontak"
            onClick={(e) => handleNavClick(e, '/#kontak')}
            className="hidden sm:inline-flex items-center justify-center bg-hkti-forest hover:bg-hkti-dark text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2.5 rounded-xl shadow-xs transition-all duration-200 whitespace-nowrap flex-shrink-0 hover:-translate-y-0.5"
          >
            Hubungi Kami
          </Link>
          <div
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-hkti-forest hover:bg-hkti-dark flex items-center justify-center text-white shadow-xs transition-all duration-200 cursor-pointer flex-shrink-0 hover:scale-105"
            title="Portal Pengurus HKTI"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>

          {/* Hamburger Menu Button (shown on screens < 1024px, including 794px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none flex-shrink-0"
            aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-hkti-forest" /> : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-slate-200 bg-white px-4 sm:px-6 pt-3 pb-5 space-y-2 shadow-lg overflow-hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isSelected = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isSelected
                      ? 'text-hkti-forest bg-hkti-mint font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 sm:hidden">
              <Link
                href="/#kontak"
                onClick={(e) => handleNavClick(e, '/#kontak')}
                className="flex items-center justify-center w-full bg-hkti-forest text-white py-2.5 rounded-lg font-semibold text-sm shadow-xs"
              >
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
