'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const pillRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false); // track visibility without triggering re-render

  // GSAP animate pill IN (slide down + fade in)
  const showPill = useCallback(async () => {
    if (isVisibleRef.current) return;
    isVisibleRef.current = true;
    const { default: gsap } = await import('gsap');
    if (!pillRef.current) return;
    gsap.killTweensOf(pillRef.current);
    gsap.fromTo(
      pillRef.current,
      { y: -32, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'back.out(1.4)',
        onStart: () => {
          if (pillRef.current) pillRef.current.style.pointerEvents = 'auto';
        },
      }
    );
  }, []);

  // GSAP animate pill OUT (slide up + fade out)
  const hidePill = useCallback(async () => {
    if (!isVisibleRef.current) return;
    isVisibleRef.current = false;
    const { default: gsap } = await import('gsap');
    if (!pillRef.current) return;
    gsap.killTweensOf(pillRef.current);
    gsap.to(pillRef.current, {
      y: -20,
      opacity: 0,
      scale: 0.97,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        if (pillRef.current) pillRef.current.style.pointerEvents = 'none';
      },
    });
  }, []);

  useEffect(() => {
    const sections = ['beranda', 'menu', 'keunggulan', 'testimoni', 'lokasi'];

    const isMobile = () => window.innerWidth < 768;

    // Set initial state immediately via inline style (prevents flash)
    if (pillRef.current) {
      if (isMobile()) {
        pillRef.current.style.opacity = '1';
        pillRef.current.style.transform = 'translateY(0) scale(1)';
        pillRef.current.style.pointerEvents = 'auto';
        isVisibleRef.current = true;
      } else {
        pillRef.current.style.opacity = '0';
        pillRef.current.style.transform = 'translateY(-32px) scale(0.96)';
        pillRef.current.style.pointerEvents = 'none';
        isVisibleRef.current = false;
      }
    }

    const checkScroll = () => {
      // Pada mobile, header selalu tampil (langsung mode hamburger)
      if (isMobile()) {
        showPill();
      } else {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const heroEl = document.getElementById('beranda');
        const threshold = heroEl
          ? heroEl.offsetTop + heroEl.offsetHeight - 160
          : 350;

        if (scrollY > threshold) {
          showPill();
        } else {
          hidePill();
        }
      }

      // Active section spy
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollPos = scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    // Connect to Lenis smooth scroll events
    const connectLenis = () => {
      const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void } }).__lenis;
      if (lenis && typeof lenis.on === 'function') {
        lenis.on('scroll', checkScroll);
      }
    };
    connectLenis();
    const lenisTimer = setTimeout(connectLenis, 300);

    // Initial checks (handle F5 scroll restoration)
    checkScroll();
    const t1 = setTimeout(checkScroll, 50);
    const t2 = setTimeout(checkScroll, 150);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      clearTimeout(lenisTimer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [showPill, hidePill]);

  return (
    <div className="fixed top-3 sm:top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="w-full px-4">
        {/* ── PILL HEADER — visibility fully controlled by GSAP ── */}
        <header
          ref={pillRef}
          className="max-w-5xl mx-auto rounded-full py-2 sm:py-2.5 px-5 sm:px-6 flex items-center justify-between"
          style={{
            background: 'rgba(245, 242, 235, 0.94)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(45, 74, 39, 0.18)',
            boxShadow: '0 12px 40px -6px rgba(31, 51, 26, 0.18), 0 4px 14px rgba(0,0,0,0.05)',
          }}
        >
          {/* Brand Logo */}
          <Link href="#beranda" className="flex items-center shrink-0">
            <img
              src="/assets/individual/02_logo_teh_in.webp"
              alt="Teh.in"
              width={130}
              height={34}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links hidden md:flex" style={{ gap: '1.75rem', fontSize: '0.78rem' }}>
            <Link href="#beranda" className={activeSection === 'beranda' ? 'active' : ''}>Beranda</Link>
            <Link href="#menu" className={activeSection === 'menu' ? 'active' : ''}>Menu Favorit</Link>
            <Link href="#keunggulan" className={activeSection === 'keunggulan' ? 'active' : ''}>Keunggulan</Link>
            <Link href="#testimoni" className={activeSection === 'testimoni' ? 'active' : ''}>Testimoni</Link>
            <Link href="#lokasi" className={activeSection === 'lokasi' ? 'active' : ''}>Lokasi &amp; Kontak</Link>
          </nav>

          {/* Action Buttons */}
          <div className="header-actions flex items-center gap-2 sm:gap-3">
            {/* Tombol WA: HANYA tampil di Desktop (md:inline-flex) */}
            <a
              href="https://wa.me/6281234567890?text=Halo%20Teh.in,%20saya%20mau%20pesan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-primary !hidden md:!inline-flex"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.78rem' }}
            >
              <i className="ph ph-whatsapp-logo" style={{ fontSize: '1rem' }} />
              <span>Pesan via WhatsApp</span>
            </a>

            <Link
              href="#lokasi"
              className="btn-icon-circle"
              aria-label="Lokasi Kedai"
              style={{ width: '2.3rem', height: '2.3rem' }}
            >
              <i className="ph ph-map-pin" />
            </Link>

            {/* Mobile Menu Toggle (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden btn-icon-circle transition-transform active:scale-95"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              style={{ width: '2.3rem', height: '2.3rem' }}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#1F331A]" /> : <Menu className="w-4 h-4 text-[#1F331A]" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer (Menu & WA berada di dalam sini) */}
        {mobileMenuOpen && (
          <div
            className="max-w-md mx-auto mt-2.5 rounded-3xl border p-5 space-y-4 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-200"
            style={{
              background: 'rgba(245, 242, 235, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderColor: 'rgba(45, 74, 39, 0.2)',
              boxShadow: '0 20px 40px -10px rgba(31, 51, 26, 0.25)',
            }}
          >
            {/* Navigasi Link */}
            <nav className="flex flex-col space-y-1 font-nav text-sm font-bold tracking-wide text-[#1F331A]">
              {[
                { id: 'beranda', label: 'Beranda', icon: 'ph-house' },
                { id: 'menu', label: 'Menu Favorit', icon: 'ph-coffee' },
                { id: 'keunggulan', label: 'Keunggulan Kami', icon: 'ph-sparkle' },
                { id: 'testimoni', label: 'Kata Pelanggan', icon: 'ph-chat-circle-text' },
                { id: 'lokasi', label: 'Lokasi & Kontak', icon: 'ph-map-pin' },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-3.5 rounded-xl transition-all ${
                    activeSection === item.id
                      ? 'bg-[#2D4A27]/10 text-[#2D4A27] font-extrabold'
                      : 'hover:bg-[#2D4A27]/5 text-[#1F331A]/80 hover:text-[#1F331A]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <i className={`ph ${item.icon} text-lg text-[#2D4A27]`} />
                    <span>{item.label}</span>
                  </span>
                  <i className="ph ph-caret-right text-xs opacity-40" />
                </Link>
              ))}
            </nav>

            {/* Tombol WhatsApp di dalam Hamburger */}
            <div className="pt-2 border-t border-[#1F331A]/10 space-y-2.5">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Teh.in,%20saya%20mau%20pesan"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2.5 bg-[#2D4A27] hover:bg-[#1F331A] active:scale-[0.98] text-white py-3.5 px-5 rounded-full font-bold text-sm shadow-lg shadow-[#2D4A27]/25 transition-all text-center"
              >
                <i className="ph-fill ph-whatsapp-logo text-xl text-emerald-300" />
                <span>Pesan via WhatsApp</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[0.72rem] text-[#5C6B57] font-medium pt-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Buka Setiap Hari: 09.00 - 22.00 WIB</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
