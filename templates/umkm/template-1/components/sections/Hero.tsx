'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const foregroundRef = useRef<HTMLDivElement | null>(null);
  const underlineRef = useRef<SVGPathElement | null>(null);
  const metric1Ref = useRef<HTMLSpanElement | null>(null);
  const metric2Ref = useRef<HTMLSpanElement | null>(null);
  const metric3Ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ── 1. CHOREOGRAPHED ENTRANCE TIMELINE ─────────────────────
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        // Top Header elements (logo, navigation, actions)
        tl.fromTo(
          '.hero-top-header .brand-logo-wrap, .hero-top-header .nav-links a, .hero-top-header .header-actions',
          { y: -16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.04 },
          0.05
        );

        // Pre-tag badge
        tl.fromTo(
          '.pre-tag',
          { y: 15, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55 },
          0.2
        );

        // Main Title H1
        tl.fromTo(
          '.hero-h1',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power4.out' },
          0.3
        );

        // Leaf icon pop in H1
        tl.fromTo(
          '.hero-h1 .leaf-icon',
          { scale: 0, rotation: -40 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'back.out(1.8)',
            onComplete: () => {
              // Continuous subtle leaf sway
              gsap.to('.hero-h1 .leaf-icon', {
                rotation: 9,
                duration: 2.8,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                transformOrigin: '50% 90%',
              });
            },
          },
          0.55
        );

        // Script Tagline
        tl.fromTo(
          '.hero-script',
          { y: 14, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65 },
          0.45
        );

        // SVG Brush Underline drawing animation
        if (underlineRef.current) {
          const pathLen = underlineRef.current.getTotalLength() || 220;
          gsap.set(underlineRef.current, {
            strokeDasharray: pathLen,
            strokeDashoffset: pathLen,
          });
          tl.to(
            underlineRef.current,
            { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' },
            0.6
          );
        }

        // Description paragraph
        tl.fromTo(
          '.hero-desc',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.6
        );

        // CTA Buttons (staggered)
        tl.fromTo(
          '.hero-cta-row > *',
          { y: 20, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' },
          0.7
        );

        // Metrics entrance animation (halus tanpa getaran)
        tl.fromTo(
          '.hero-metrics-row',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.8
        );

        tl.fromTo(
          '.metric-divider',
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.5, stagger: 0.08 },
          0.85
        );

        tl.fromTo(
          '.metric-item .metric-label',
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.9
        );

        // Animated Numerical Count-Up for Metrics
        // Di mobile (<768px): langsung set angka final agar tidak bergetar sama sekali
        // Di desktop (>=768px): jalankan count-up dengan tabular-nums yang stabil
        tl.add(() => {
          if (window.innerWidth < 768) {
            if (metric1Ref.current) metric1Ref.current.textContent = '15.000';
            if (metric2Ref.current) metric2Ref.current.textContent = '4.9';
            if (metric3Ref.current) metric3Ref.current.textContent = '100';
            return;
          }

          // Desktop count-up
          const m1 = { val: 0 };
          if (metric1Ref.current) metric1Ref.current.textContent = '0';
          gsap.to(m1, {
            val: 15000,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              if (metric1Ref.current) {
                metric1Ref.current.textContent = Math.floor(m1.val).toLocaleString('id-ID');
              }
            },
          });

          const m2 = { val: 0 };
          if (metric2Ref.current) metric2Ref.current.textContent = '0.0';
          gsap.to(m2, {
            val: 4.9,
            duration: 1.3,
            ease: 'power2.out',
            onUpdate: () => {
              if (metric2Ref.current) {
                metric2Ref.current.textContent = m2.val.toFixed(1);
              }
            },
          });

          const m3 = { val: 0 };
          if (metric3Ref.current) metric3Ref.current.textContent = '0';
          gsap.to(m3, {
            val: 100,
            duration: 1.3,
            ease: 'power2.out',
            onUpdate: () => {
              if (metric3Ref.current) {
                metric3Ref.current.textContent = Math.floor(m3.val).toString();
              }
            },
          });
        }, 0.85);

        // Main Drink Cup Product (rises from bottom)
        tl.fromTo(
          '.hero-drink-img-wrap img',
          { y: 65, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
          0.35
        );

        // Floating Stamp Badge (pop & stamp rotate)
        tl.fromTo(
          '.floating-stamp',
          { scale: 0, rotation: -30, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'back.out(1.5)',
            onComplete: () => {
              // Idle floating micro-interaction
              gsap.to('.floating-stamp', {
                y: -8,
                rotation: 3.5,
                duration: 3.4,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              });
            },
          },
          0.7
        );

        // Floating Pill Time
        tl.fromTo(
          '.floating-pill-time',
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            onComplete: () => {
              // Idle floating micro-interaction
              gsap.to('.floating-pill-time', {
                y: 6,
                duration: 3.8,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              });
            },
          },
          0.8
        );

        // Script Quote on Right Side
        tl.fromTo(
          '.script-quote-side',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.85
        );

        // Benefit Strip Cells & Slogan (stagger from bottom)
        tl.fromTo(
          '.benefit-cell',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
          0.9
        );

        tl.fromTo(
          '.benefit-slogan-col',
          { opacity: 0, x: 15 },
          { opacity: 1, x: 0, duration: 0.6 },
          1.1
        );

        // ── 2. SCROLL PARALLAX & SINKING EFFECT (GSAP ScrollTrigger) ───
        // Layer 2: Leaf Shadow Parallax
        if (parallaxRef.current && heroRef.current) {
          gsap.to(parallaxRef.current, {
            y: 80,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }

        // Layer 3: Foreground Botanical Leaves Parallax
        if (foregroundRef.current && heroRef.current) {
          gsap.to(foregroundRef.current, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }

        // Parallax Minuman (Paralaks Kedalaman Standar, Opacity Tetap 100%)
        if (heroRef.current) {
          gsap.fromTo(
            '.hero-drink-img-wrap',
            { y: 0 },
            {
              y: 40,
              ease: 'none',
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      }, heroRef);
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section id="beranda" ref={heroRef} className="hero-canvas">
      {/* LAYER 1: Background Podium & Dinding Krem */}
      <div className="hero-bg-layer">
        <img
          src="/assets/background.webp"
          alt="Podium Background"
        />
        <div className="hero-bg-overlay" />
      </div>

      {/* LAYER 2: Bayangan Dedaunan Halus untuk Efek Paralaks */}
      <div ref={parallaxRef} className="hero-parallax-layer" id="parallax-leaves">
        <img
          src="/assets/layer 2.webp"
          alt="Bayangan Dedaunan Botani Halus"
        />
      </div>

      {/* Header Transparan di Atas Hero Canvas — hanya tampil di Desktop */}
      <header className="hero-top-header hidden md:block">
        <div className="container header-inner">
          {/* Brand Logo */}
          <Link href="#beranda" className="brand-logo-wrap">
            <img
              src="/assets/individual/02_logo_teh_in.webp"
              alt="Teh.in — Teh Asli, Cerita Nyata"
              width={180}
              height={48}
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links hidden md:flex">
            <Link href="#beranda" className="active">Beranda</Link>
            <Link href="#menu">Menu Favorit</Link>
            <Link href="#keunggulan">Keunggulan</Link>
            <Link href="#testimoni">Testimoni</Link>
            <Link href="#lokasi">Lokasi &amp; Kontak</Link>
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Teh.in,%20saya%20mau%20pesan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-primary !hidden md:!inline-flex"
            >
              <i className="ph ph-whatsapp-logo" style={{ fontSize: '1.1rem' }} />
              <span>Pesan via WhatsApp</span>
            </a>

            <Link href="#lokasi" className="btn-icon-circle" aria-label="Lokasi Kedai">
              <i className="ph ph-map-pin" />
            </Link>
          </div>
        </div>
      </header>

      {/* Konten Utama Hero */}
      <main className="hero-main !pt-24 sm:!pt-28 md:!pt-2">
        <div className="container">
          <div className="hero-grid">

            {/* Kiri: Teks Rapat ke Kiri & Naik Sedikit */}
            <div className="hero-text-col">
              <div className="pre-tag">
                <img
                  src="/assets/individual/03_icon_daun_teh.webp"
                  alt="Daun Teh"
                  className="w-4 h-4 object-contain inline-block shrink-0"
                />
                <span>100% Daun Teh Pilihan &amp; Gula Tebu Asli</span>
              </div>

              <h1 className="hero-h1">
                Kesegaran<br />
                Teh Asli <i className="ph-fill ph-leaf leaf-icon" />
              </h1>

              <div className="hero-script-wrap">
                <p className="hero-script">yang Bikin Semangat Balik Lagi!</p>
                <svg
                  style={{ width: 220, height: 10, display: 'block', marginTop: -6, overflow: 'visible' }}
                  viewBox="0 0 220 10"
                  fill="none"
                >
                  <path
                    ref={underlineRef}
                    d="M2 7C60 2 160 2 218 8"
                    stroke="#2D4A27"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                </svg>
              </div>

              <p className="hero-desc">
                <span className="md:hidden">
                  Diseduh segar tiap 4 jam dari pucuk teh asli nusantara dengan perasan lemon murni &amp; manis alami gula tebu tanpa pengawet sintetis.
                </span>
                <span className="hidden md:inline">
                  Diseduh segar setiap 4 jam dari pucuk daun teh hitam pegunungan tropis nusantara.
                  Diracik harmonis dengan perasan buah lemon asli dan manis alami gula tebu tanpa pengawet sintetis.
                </span>
              </p>

              <div className="hero-cta-row flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-5 sm:mb-8">
                <a
                  href="https://wa.me/?text=Halo%20Teh.in,%20saya%20mau%20pesan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-primary flex-1 sm:flex-none justify-center text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6"
                >
                  <i className="ph ph-whatsapp-logo text-base sm:text-lg" />
                  <span>Pesan via WhatsApp</span>
                  <i className="ph ph-caret-right text-xs" />
                </a>

                <Link
                  href="#menu"
                  className="btn-pill-secondary flex-1 sm:flex-none justify-center text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6"
                >
                  <i className="ph ph-leaf text-base sm:text-lg" />
                  <span><span className="hidden sm:inline">Lihat Daftar </span>Menu</span>
                  <i className="ph ph-caret-right text-xs" />
                </Link>
              </div>

              <div className="hero-metrics-row !py-2.5 !my-1">
                <div className="metric-item">
                  <div className="metric-val text-xl sm:text-3xl tabular-nums">
                    <span ref={metric1Ref} className="tabular-nums">15.000</span>+
                  </div>
                  <div className="metric-label text-[0.65rem] sm:text-xs">Cup Terjual / Bulan</div>
                </div>
                <div className="metric-divider" />
                <div className="metric-item">
                  <div className="metric-val text-xl sm:text-3xl tabular-nums">
                    <span ref={metric2Ref} className="tabular-nums">4.9</span> ★
                  </div>
                  <div className="metric-label text-[0.65rem] sm:text-xs">Rating Pelanggan</div>
                </div>
                <div className="metric-divider" />
                <div className="metric-item">
                  <div className="metric-val text-xl sm:text-3xl tabular-nums">
                    <span ref={metric3Ref} className="tabular-nums">100</span>%
                  </div>
                  <div className="metric-label text-[0.65rem] sm:text-xs">Halal &amp; Alami</div>
                </div>
              </div>
            </div>

            {/* Kanan: Minuman & Badges */}
            <div className="hero-product-col">
              {/* Badge Stempel Racikan Lemon: diatur rapi di pojok kanan atas */}
              <div className="floating-stamp">
                <img
                  src="/assets/individual/08_badge_racikan_asli_perasan_lemon.webp"
                  alt="Racikan Asli Perasan Lemon Asli"
                />
              </div>

              {/* Sembunyikan badge bertumpuk di mobile agar tidak menutupi gambar produk */}
              <div className="floating-pill-time !hidden md:!flex">
                <img
                  src="/assets/individual/15_icon_diseduh_tiap_4_jam.webp"
                  alt="Diseduh Tiap 4 Jam"
                />
              </div>

              <div className="script-quote-side !hidden md:!block">
                Good Tea<br />Good Mood 🍃
              </div>

              {/* Minuman Diatur Masuk ke Lapisan Kaca Fit Bar */}
              <div className="hero-drink-img-wrap">
                <img
                  src="/assets/individual/01_teh_in_minuman_tatakan_buah.webp"
                  alt="Teh.in Es Teh Lemon Segar"
                  width={950}
                  height={812}
                />
                <div className="drink-glint-sheen" aria-hidden="true" />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* STRIP BAR BENEFIT */}
      <div className="benefit-strip">
        <div className="container">
          <div className="benefit-grid">
            <div className="benefit-cell">
              <img
                src="/assets/individual/03_icon_daun_teh.webp"
                alt="Daun Teh"
                className="benefit-icon-img"
              />
              <div>
                <div className="title">Diseduh Segar Tiap Hari</div>
                <div className="subtitle hidden sm:block">Rasa selalu maksimal</div>
              </div>
            </div>

            <div className="benefit-cell">
              <img
                src="/assets/individual/05_icon_tebu.webp"
                alt="Gula Tebu"
                className="benefit-icon-img"
              />
              <div>
                <div className="title">100% Gula Tebu Asli</div>
                <div className="subtitle hidden sm:block">Manis alami, lebih sehat</div>
              </div>
            </div>

            <div className="benefit-cell">
              <img
                src="/assets/individual/07_icon_es_batu.webp"
                alt="Es Batu"
                className="benefit-icon-img"
              />
              <div>
                <div className="title">Es Kristal RO Higienis</div>
                <div className="subtitle hidden sm:block">Bersih dan menyegarkan</div>
              </div>
            </div>

            <div className="benefit-cell">
              <img
                src="/assets/individual/11_icon_cup_daun.webp"
                alt="Cup Daun"
                className="benefit-icon-img"
              />
              <div>
                <div className="title">Tersedia Cup Regular &amp; Jumbo</div>
                <div className="subtitle hidden sm:block">Pilihan sesuai seleramu</div>
              </div>
            </div>

            <div className="benefit-slogan-col !hidden md:!flex">
              <span>Lebih dari Sekadar Teh</span>
              <i className="ph-fill ph-leaf" />
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Dedaunan Botani Foreground Paling Depan */}
      <div ref={foregroundRef} className="hero-foreground-layer" id="foreground-leaves" aria-hidden="true">
        <img
          src="/assets/layer 3.webp"
          alt="Dedaunan Botani Foreground"
          width={1610}
          height={977}
        />
      </div>
    </section>
  );
}
