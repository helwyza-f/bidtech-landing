"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Header() {
  const headerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Header enter animation
    gsap.fromTo(headerRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Scroll spy logic
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'workflow', 'safety'];
      let current = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust 150 based on header height and desired trigger point
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

  const getLinkClass = (section: string) => {
    if (activeSection === section) {
      return "text-primary font-bold uppercase tracking-wider border-b-2 border-primary-container py-1 font-label-caps text-label-caps transition-all";
    }
    return "text-on-surface-variant uppercase tracking-wider hover:text-on-surface transition-all duration-150 py-1 border-b-2 border-transparent font-label-caps text-label-caps";
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 flex items-center justify-between px-margin-mobile md:px-margin py-space-md w-full bg-surface border-b border-outline-variant">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-5 h-5 bg-primary-container flex-shrink-0"></div>
        <a className="font-headline-md text-headline-md tracking-wider uppercase text-on-surface" href="#home" onClick={(e) => e.preventDefault()}>ELEVASI</a>
      </div>
      <nav className="hidden lg:flex items-center gap-8">
        <a className={getLinkClass('home')} href="#home" onClick={(e) => handleNavClick(e, 'home')}>Beranda</a>
        <a className={getLinkClass('about')} href="#about" onClick={(e) => handleNavClick(e, 'about')}>Tentang Kami</a>
        <a className={getLinkClass('services')} href="#services" onClick={(e) => handleNavClick(e, 'services')}>Layanan</a>
        <a className={getLinkClass('projects')} href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Proyek</a>
        <a className={getLinkClass('workflow')} href="#workflow" onClick={(e) => handleNavClick(e, 'workflow')}>Alur Kerja</a>
        <a className={getLinkClass('safety')} href="#safety" onClick={(e) => handleNavClick(e, 'safety')}>Keamanan</a>
      </nav>
      <div className="flex items-center gap-4">
        <a className="hidden sm:flex items-center gap-2 text-on-surface hover:text-primary transition-colors font-body-md text-body-md font-medium" href="tel:0215558742">
          <span className="material-symbols-outlined">call</span>
          <span>(021) 555-8742</span>
        </a>
        <button className="bg-on-secondary-fixed text-surface rounded-full px-6 py-2.5 font-label-caps text-label-caps hover:bg-primary-container hover:text-on-secondary-fixed hover:scale-105 active:scale-95 transition-all duration-300 uppercase flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md" onClick={() => document.getElementById('quote')?.scrollIntoView({behavior: 'smooth'})}>
          Minta Penawaran <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </header>
  );
}
