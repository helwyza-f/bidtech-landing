'use client';
import { ArrowUpRight, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#metrik', label: 'Metrik' },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState('#beranda');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.1
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Handle expanded width
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Handle active menu based on intersection
      const sections = navLinks.map(link => document.querySelector(link.href));
      let currentActive = activeMenu;
      
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If section top is within top half of the screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = '#' + section.id;
          }
        }
      });
      
      // Check contact section specifically
      const contactSection = document.querySelector('#kontak');
      if (contactSection) {
         const rect = contactSection.getBoundingClientRect();
         if (rect.top <= window.innerHeight / 1.5) {
            currentActive = '#kontak';
         }
      }

      if (currentActive !== activeMenu) {
        setActiveMenu(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMenu]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveMenu(href);
    setIsMobileMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={headerRef} className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className={`w-full pointer-events-auto py-2.5 rounded-full flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'max-w-5xl px-8 gap-4 md:gap-8 bg-white/90 dark:bg-brand-carbon/90 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg shadow-black/[0.03] dark:shadow-black/40 hover:border-black/20 dark:hover:border-white/20' : 'max-w-[750px] px-5 gap-4 md:gap-6 bg-transparent border-transparent'}`}>
        <a className="flex items-center group pl-2" href="#beranda" onClick={(e) => handleNavClick(e, '#beranda')}>
          <img src="/images/hero/afindo-logo.png" alt="PT Afindo Logo" className="h-9 w-auto object-contain transition-transform group-hover:scale-105 dark:brightness-0 dark:invert" />
        </a>
        <div className="hidden md:flex items-center gap-1 text-[13px] font-medium text-neutral-600 dark:text-neutral-400">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              className={`px-3.5 py-1.5 rounded-full transition ${activeMenu === link.href ? 'text-black dark:text-white bg-black/5 dark:bg-white/10 font-semibold' : 'hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="pr-1 flex items-center">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-neutral-300 hover:text-white" /> : <Moon className="w-4 h-4 text-neutral-600 hover:text-black" />}
            </button>
          )}
          <a 
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm ${activeMenu === '#kontak' ? 'bg-brand-gold text-white hover:bg-brand-goldDark' : 'bg-brand-black dark:bg-white text-white dark:text-brand-black hover:bg-neutral-800 dark:hover:bg-neutral-200'}`} 
            href="#kontak"
            onClick={(e) => handleNavClick(e, '#kontak')}
          >
            <span>Kontak</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button 
            className="md:hidden p-2 ml-1 rounded-full text-brand-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`absolute top-full left-4 right-4 mt-4 bg-white/95 dark:bg-brand-carbon/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-[20px] p-6 shadow-2xl transition-all duration-300 md:hidden pointer-events-auto ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              className={`text-base font-semibold py-2 border-b border-black/5 dark:border-white/5 transition-colors ${activeMenu === link.href ? 'text-brand-gold' : 'text-brand-black dark:text-white'}`}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a 
            className="mt-2 inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full text-sm font-semibold tracking-wide bg-brand-black dark:bg-white text-white dark:text-brand-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            href="#kontak"
            onClick={(e) => handleNavClick(e, '#kontak')}
          >
            <span>Hubungi Kami</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
