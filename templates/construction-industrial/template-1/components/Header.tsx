"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Header enter animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    // Scroll spy logic
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'workflow', 'safety'];
      let current = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang Kami' },
    { id: 'services', label: 'Layanan' },
    { id: 'projects', label: 'Proyek' },
    { id: 'workflow', label: 'Alur Kerja' },
    { id: 'safety', label: 'Keamanan' },
  ];

  const getLinkClass = (section: string) => {
    if (activeSection === section) {
      return "text-on-surface font-bold uppercase tracking-wider border-b-[3px] border-[#ffd60a] py-1 font-label-caps text-label-caps transition-all";
    }
    return "text-on-surface-variant uppercase tracking-wider hover:text-on-surface hover:border-b-2 hover:border-[#ffd60a]/50 transition-all duration-150 py-1 border-b-2 border-transparent font-label-caps text-label-caps";
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        ref={headerRef} 
        className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-margin py-3 sm:py-space-md w-full bg-surface/95 backdrop-blur-md border-b border-outline-variant"
      >
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none" 
          onClick={handleLogoClick}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#ffd60a] flex-shrink-0"></div>
          <span className="font-headline-md text-xl sm:text-headline-md tracking-wider uppercase text-on-surface font-bold">
            ELEVASI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <a 
              key={item.id}
              className={getLinkClass(item.id)} 
              href={`#${item.id}`} 
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <a 
            className="hidden md:flex items-center gap-2 text-on-surface hover:text-[#ffd60a] transition-colors font-body-md text-body-md font-medium" 
            href="tel:0215558742"
          >
            <span className="material-symbols-outlined text-lg">call</span>
            <span>(021) 555-8742</span>
          </a>

          <button 
            className="hidden sm:inline-flex items-center gap-1.5 bg-on-secondary-fixed text-surface rounded-full px-4 sm:px-6 py-2 sm:py-2.5 font-label-caps text-[11px] sm:text-label-caps hover:bg-[#ffd60a] hover:text-on-secondary-fixed hover:scale-105 active:scale-95 transition-all duration-300 uppercase cursor-pointer shadow-sm font-bold" 
            onClick={() => {
              setMobileMenuOpen(false);
              document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Minta Penawaran</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>

          {/* Single Toggle Button for Mobile Navigation */}
          <button
            type="button"
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-outline-variant/60 hover:border-[#ffd60a] text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffd60a]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
          >
            <span 
              className={`w-5 h-0.5 bg-on-surface transition-all duration-300 transform ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span 
              className={`w-5 h-0.5 bg-on-surface transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span 
              className={`w-5 h-0.5 bg-on-surface transition-all duration-300 transform ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown Menu (Under Sticky Header - Single Close Button) */}
      <div 
        className={`fixed inset-x-0 top-[57px] sm:top-[65px] bottom-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none -translate-y-2'
        }`}
      >
        {/* Backdrop for clicking outside */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" 
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Dropdown Content */}
        <div className="w-full h-full bg-surface border-b border-outline-variant shadow-2xl flex flex-col justify-between p-5 sm:p-6 overflow-y-auto">
          {/* Nav Links */}
          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-[#ffd60a] text-[#1c1b1b] font-bold shadow-sm' 
                      : 'text-on-surface hover:text-[#1c1b1b] hover:bg-[#ffd60a]/20 active:bg-[#ffd60a] active:text-[#1c1b1b] font-semibold'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span 
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        isActive ? 'bg-[#1c1b1b]' : 'bg-[#ffd60a]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </span>
                  <span 
                    className={`material-symbols-outlined text-sm transition-transform ${
                      isActive ? 'text-[#1c1b1b] translate-x-0.5' : 'text-outline'
                    }`}
                  >
                    chevron_right
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Bottom Actions inside Mobile Menu */}
          <div className="pt-6 mt-6 border-t border-outline-variant space-y-3 pb-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-[#ffd60a] text-[#1c1b1b] font-label-caps text-xs py-3.5 px-4 rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-on-secondary-fixed hover:text-[#ffd60a] transition-all active:scale-95 shadow-md"
            >
              <span>Minta Penawaran</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>

            <a
              href="tel:0215558742"
              className="w-full border border-outline-variant text-on-surface font-body-sm text-xs py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#ffd60a]/15 hover:border-[#ffd60a] transition-colors"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span className="font-semibold">(021) 555-8742</span>
            </a>

            <div className="pt-2 text-center text-[10px] uppercase text-outline font-label-technical tracking-wider">
              Rekayasa Struktural Bersertifikasi ISO & SMK3
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
