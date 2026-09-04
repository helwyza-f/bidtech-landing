'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '@/lib/ModalContext';
import { MapPin, Menu, X } from 'lucide-react';

export default function Header() {
  const { openRegister, openBranch } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tentang Kami', href: '#manfaat' },
    { label: 'Program', href: '#program' },
    { label: 'Manfaat', href: '#manfaat' },
    { label: 'Testimoni', href: '#testimoni' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center group flex-shrink-0">
            <Image
              src="/logo.webp"
              alt="SmartBelajar"
              width={180}
              height={44}
              style={{ width: 'auto', height: 'auto' }}
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-brand-blue transition-colors relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={openBranch}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-sky-700 transition-colors py-2 px-2"
            >
              <MapPin className="w-4 h-4 text-brand-blue" />
              Temukan Cabang
            </button>

            <button
              onClick={() => openRegister()}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-black text-white bg-brand-orange hover:bg-brand-orange-hover rounded-full shadow-orange-glow transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openRegister()}
              className="px-4 py-2 text-xs font-black text-white bg-brand-orange rounded-full shadow-sm"
            >
              Daftar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-navy hover:text-brand-orange transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-100 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-brand-navy hover:text-brand-orange py-2 px-3 rounded-xl hover:bg-brand-cream/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBranch();
                }}
                className="w-full py-3 px-4 rounded-xl text-center text-sm font-bold text-brand-blue bg-brand-sky flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Temukan Cabang
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRegister();
                }}
                className="w-full py-3.5 px-4 rounded-full text-center text-sm font-black text-white bg-brand-orange shadow-orange-glow"
              >
                Daftar Sekarang
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
