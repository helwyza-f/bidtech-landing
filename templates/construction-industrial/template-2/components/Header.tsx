"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLenis } from '@studio-freight/react-lenis';
import { COMPANY_INFO } from '@/lib/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const lenis = useLenis();

  useEffect(() => {
    const sections = ['beranda', 'katalog', 'keunggulan', 'proyek', 'tim', 'quote'];
    const triggers: ScrollTrigger[] = [];

    // Scroll trigger for navbar background / shadow (hanya dipicu sekali saat melintasi batas)
    const headerTrigger = ScrollTrigger.create({
      start: 'top -20px',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });
    triggers.push(headerTrigger);

    // Scroll triggers for sections to detect active menu item
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const trigger = ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(sectionId);
            }
          },
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  /**
   * Smooth animated scroll to target section without instant teleportation
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    if (lenis) {
      lenis.scrollTo(targetElement as HTMLElement, {
        offset: -85,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential glide
      });
    } else {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 85;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    window.history.pushState(null, '', targetId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#beranda"
            onClick={(e) => handleNavClick(e, '#beranda')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <Image 
              src="/images/hero/logo-utama.png" 
              alt={COMPANY_INFO.name} 
              width={240} 
              height={60} 
              priority
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a
              href="#beranda"
              onClick={(e) => handleNavClick(e, '#beranda')}
              className={`transition-colors cursor-pointer ${activeSection === 'beranda' ? 'text-orange-600 font-bold' : 'text-slate-700 hover:text-orange-600'}`}
            >
              Beranda
            </a>
            <a
              href="#katalog"
              onClick={(e) => handleNavClick(e, '#katalog')}
              className={`transition-colors cursor-pointer ${activeSection === 'katalog' ? 'text-orange-600 font-bold' : 'text-slate-700 hover:text-orange-600'}`}
            >
              Katalog Alat
            </a>
            <a
              href="#keunggulan"
              onClick={(e) => handleNavClick(e, '#keunggulan')}
              className={`transition-colors cursor-pointer ${activeSection === 'keunggulan' ? 'text-orange-600 font-bold' : 'text-slate-700 hover:text-orange-600'}`}
            >
              Keunggulan
            </a>
            <a
              href="#proyek"
              onClick={(e) => handleNavClick(e, '#proyek')}
              className={`transition-colors cursor-pointer ${activeSection === 'proyek' ? 'text-orange-600 font-bold' : 'text-slate-700 hover:text-orange-600'}`}
            >
              Portofolio
            </a>
            <a
              href="#tim"
              onClick={(e) => handleNavClick(e, '#tim')}
              className={`transition-colors cursor-pointer ${activeSection === 'tim' ? 'text-orange-600 font-bold' : 'text-slate-700 hover:text-orange-600'}`}
            >
              Tim Ahli
            </a>
            <a
              href="#quote"
              onClick={(e) => handleNavClick(e, '#quote')}
              className={`transition-colors cursor-pointer ${activeSection === 'quote' ? 'text-orange-600 font-bold' : 'text-slate-700 hover:text-orange-600'}`}
            >
              Kontak
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-orange-600 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                <span className="material-symbols-outlined text-[18px]">call</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Hotline 24 Jam</span>
                <span className="font-bold">{COMPANY_INFO.hotline}</span>
              </div>
            </a>

            <a
              href="#quote"
              onClick={(e) => handleNavClick(e, '#quote')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-600/25 hover:shadow-lg hover:shadow-orange-600/35 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>Ajukan Sewa</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 pt-2 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="#beranda"
              onClick={(e) => handleNavClick(e, '#beranda')}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${activeSection === 'beranda' ? 'bg-orange-50 text-orange-600 font-bold' : 'font-semibold text-slate-800 hover:bg-slate-50'}`}
            >
              Beranda
            </a>
            <a
              href="#katalog"
              onClick={(e) => handleNavClick(e, '#katalog')}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${activeSection === 'katalog' ? 'bg-orange-50 text-orange-600 font-bold' : 'font-semibold text-slate-800 hover:bg-slate-50'}`}
            >
              Katalog Alat
            </a>
            <a
              href="#keunggulan"
              onClick={(e) => handleNavClick(e, '#keunggulan')}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${activeSection === 'keunggulan' ? 'bg-orange-50 text-orange-600 font-bold' : 'font-semibold text-slate-800 hover:bg-slate-50'}`}
            >
              Keunggulan
            </a>
            <a
              href="#proyek"
              onClick={(e) => handleNavClick(e, '#proyek')}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${activeSection === 'proyek' ? 'bg-orange-50 text-orange-600 font-bold' : 'font-semibold text-slate-800 hover:bg-slate-50'}`}
            >
              Portofolio
            </a>
            <a
              href="#tim"
              onClick={(e) => handleNavClick(e, '#tim')}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${activeSection === 'tim' ? 'bg-orange-50 text-orange-600 font-bold' : 'font-semibold text-slate-800 hover:bg-slate-50'}`}
            >
              Tim Ahli
            </a>
            <a
              href="#quote"
              onClick={(e) => handleNavClick(e, '#quote')}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${activeSection === 'quote' ? 'bg-orange-50 text-orange-600 font-bold' : 'font-semibold text-slate-800 hover:bg-slate-50'}`}
            >
              Kontak
            </a>
            <a
              href="#quote"
              onClick={(e) => handleNavClick(e, '#quote')}
              className="mt-2 text-center px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-700 cursor-pointer"
            >
              Ajukan Penawaran Sewa
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
