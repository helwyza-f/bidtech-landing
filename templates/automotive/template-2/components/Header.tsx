"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        { id: 'kontak', offset: 300 },
        { id: 'faq', offset: 250 },
        { id: 'armada', offset: 250 },
        { id: 'layanan', offset: 250 },
        { id: 'beranda', offset: 0 },
      ];

      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollPos + windowHeight >= docHeight - 80) {
        setActiveSection('kontak');
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const offsetTop = el.offsetTop - section.offset;
          if (scrollPos >= offsetTop) {
            setActiveSection(section.id);
            return;
          }
        }
      }

      setActiveSection('beranda');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionId = (href: string) => {
    return href.replace('#', '').replace('/', '') || 'beranda';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full max-w-[100vw] z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      {/* Announcement Bar */}
      <div className="bg-primary w-full py-1.5 sm:py-2 px-3 sm:px-4 text-center flex items-center justify-center">
        <p className="text-black text-[11px] sm:text-xs md:text-sm font-medium sm:font-semibold leading-snug sm:leading-normal tracking-tight sm:tracking-normal w-full">
          Butuh mobil hari ini? Pesan sekarang dan dapatkan kendaraan terbaik untuk perjalananmu.
        </p>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">Pinjam<span className="text-primary">Mobil</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const sectionId = getSectionId(link.href);
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveSection(sectionId)}
                  className={`text-sm transition-all duration-200 pb-1 border-b-2 ${
                    isActive
                      ? 'text-primary font-bold border-primary'
                      : 'text-foreground/80 hover:text-primary font-medium border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#pesan" className="bg-primary hover:bg-primary-hover text-black font-semibold text-sm px-6 py-2.5 rounded-full transition-colors">
              Pesan Sekarang
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-border shadow-lg py-4 px-4 flex flex-col space-y-2">
          {NAV_LINKS.map((link) => {
            const sectionId = getSectionId(link.href);
            const isActive = activeSection === sectionId;
            return (
              <Link 
                key={link.label} 
                href={link.href} 
                onClick={() => {
                  setActiveSection(sectionId);
                  setMobileMenuOpen(false);
                }}
                className={`font-medium py-2.5 px-3 rounded-lg transition-all duration-200 border-b border-border/40 flex items-center justify-between ${
                  isActive
                    ? 'text-primary font-bold bg-primary/10 border-b-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-primary" />}
              </Link>
            );
          })}
          <Link 
            href="#pesan" 
            onClick={() => setMobileMenuOpen(false)}
            className="bg-primary text-center text-black font-semibold px-6 py-3 rounded-full mt-4"
          >
            Pesan Sekarang
          </Link>
        </div>
      )}

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-[110px] bg-black/20 z-[-1]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
