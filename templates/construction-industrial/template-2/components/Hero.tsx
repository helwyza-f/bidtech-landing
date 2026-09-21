"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { useLenis } from '@studio-freight/react-lenis';
import { COMPANY_INFO, HERO_STATS, PARTNERS } from '@/lib/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const handleScrollToQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector('#quote');
    if (!targetElement) return;

    if (lenis) {
      lenis.scrollTo(targetElement as HTMLElement, {
        offset: -85,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    // 1. Entrance animation for hero texts & CTAs
    gsap.fromTo(".hero-anim-item", 
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out", clearProps: "opacity,transform" }
    );

    // 2. Dump Truck Entrance: drives in smoothly from the right to the center
    const startX = typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 380;
    gsap.fromTo(".hero-truck-entrance", 
      { x: startX, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out", clearProps: "opacity,transform" }
    );

    // 3. Floating orbital badges pop in after the truck enters
    gsap.fromTo(".hero-badge-anim",
      { scale: 0.6, opacity: 0, y: 15 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.15,
        delay: 0.8,
        ease: "back.out(1.5)",
        clearProps: "all"
      }
    );

    // 4. Highlight specification card entrance
    gsap.fromTo(".hero-card-anim",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.6, ease: "power2.out", clearProps: "opacity,transform" }
    );

    // 5. Parallax for the truck visual on scroll
    gsap.to(".hero-truck-parallax", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });



  return (
    <section
      id="beranda"
      ref={containerRef}
      className="relative pt-32 pb-0 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100"
    >
      {/* Background Concentric Orbital Rings (Reference: Fixbild Roof Layout) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div className="relative w-[1100px] h-[1100px] -top-24 flex items-center justify-center">
          {/* Outer Ring 1 */}
          <div className="absolute w-[950px] h-[950px] rounded-full border border-dashed border-slate-300/80 animate-spin-slow" />

          {/* Middle Ring 2 */}
          <div className="absolute w-[750px] h-[750px] rounded-full border border-dashed border-slate-300/60 animate-reverse-spin-slow" />

          {/* Inner Ring 3 with subtle solid glow */}
          <div className="absolute w-[550px] h-[550px] rounded-full border border-slate-200/90 bg-gradient-to-b from-orange-500/[0.03] to-transparent" />

          {/* Innermost Core Glow */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-amber-200/20 via-orange-100/30 to-transparent " />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Content: Badge, Headline, Subtitle, Dual CTAs */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-anim-item text-[26px] sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-slate-950 font-heading leading-[1.15] mb-6">
            INFRASTRUKTUR MODERN <br />
            <span className="text-orange-600 drop-shadow-sm">DENGAN ARMADA TANGGUH</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-anim-item text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Penyedia armada alat berat terkemuka di Indonesia untuk mega-proyek pertambangan, jalan tol, dan rekayasa sipil berstandar keselamatan tertinggi.
          </p>

          {/* Dual Action CTAs (Reference: Pill button + Phone link) */}
          <div className="hero-anim-item flex flex-wrap items-center justify-center gap-5 sm:gap-8 mb-10">
            <a
              href="#quote"
              onClick={handleScrollToQuote}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-sm uppercase tracking-wider hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-600/25 transition-all duration-300 active:scale-95 group shadow-lg cursor-pointer"
            >
              <span>Minta Penawaran Cepat</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              className="inline-flex items-center gap-3 text-slate-900 hover:text-orange-600 font-bold text-sm sm:text-base tracking-wide transition-colors group"
            >
              <div className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">call</span>
              </div>
              <div className="text-left">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-semibold">Toll-Free 24 Jam</span>
                <span className="text-slate-900 group-hover:text-orange-600 font-extrabold">{COMPANY_INFO.hotline}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Hero Visual Area: Cutout Dump Truck + Floating Badges on Orbital Track */}
        <div className="relative mt-2 max-w-5xl mx-auto flex flex-col items-center">
          {/* Left Orbital Floating Badge */}
          <div className="hero-badge-anim hidden md:flex absolute -left-6 lg:-left-12 top-16 z-20 items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 border border-slate-200 shadow-xl shadow-slate-200/50 animate-float">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
              <span className="material-symbols-outlined text-2xl">weight</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 block">Kapasitas Muatan</span>
              <span className="text-sm font-black text-slate-900 font-heading block">400.000 KG</span>
              <span className="text-[10px] text-slate-500 font-medium">Truk Tambang Kelas Ultra</span>
            </div>
          </div>

          {/* Right Orbital Floating Badge */}
          <div className="hero-badge-anim hidden md:flex absolute -right-6 lg:-right-12 top-24 z-20 items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 border border-slate-200 shadow-xl shadow-slate-200/50 animate-float-delayed">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <span className="material-symbols-outlined text-2xl">local_offer</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 block">Promo Kontrak Sewa</span>
              <span className="text-sm font-black text-slate-900 font-heading block">DISKON 15%</span>
              <span className="text-[10px] text-slate-500 font-medium">Khusus Kontrak Kuartal Ini</span>
            </div>
          </div>

          {/* Top Center Floating Badge */}
          <div className="hero-badge-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md mb-2 z-20">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Unit Tersedia • Siap Operasi & Mobilisasi</span>
          </div>

          {/* Truck Parallax Wrapper (Handles vertical scroll scrub) */}
          <div className="hero-truck-parallax w-full max-w-3xl will-change-transform">
            {/* Cutout Yellow Mining Dump Truck (Drives in from right to center on page load) */}
            <div className="hero-truck-entrance relative w-full aspect-[16/11] sm:aspect-[16/10] flex items-center justify-center z-10 will-change-transform">
              <Image
                src="/images/hero/dump-truck.png"
                alt="CAT 797 Heavy Mining Dump Truck"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                className="object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Unit Specification Highlight Card (Directly beneath the truck) */}
          <div className="hero-card-anim w-full max-w-2xl -mt-6 sm:-mt-8 z-20 px-4">
            <div className="bg-white/95 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-900/5 text-center">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                <div className="text-left">
                  <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wide block">Armada Utama Tambang</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-heading uppercase">Truk Tambang CAT 797F (400T)</h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 uppercase block">Tarif Sewa Harian</span>
                  <span className="text-base sm:text-lg font-black text-slate-950 font-heading">Rp 45.000.000 <span className="text-xs text-slate-500 font-normal">/ Hari</span></span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Daya Mesin</span>
                  <span className="font-bold text-slate-800">4.000 HP</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Berat GVW</span>
                  <span className="font-bold text-slate-800">623.690 KG</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Kapasitas Muat</span>
                  <span className="font-bold text-slate-800">400 Ton</span>
                </div>
              </div>

              <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>14 Unit Aktif Siap Dikirim</span>
                </div>
                <a
                  href="#quote"
                  onClick={handleScrollToQuote}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <span>Minta Penawaran Unit Ini</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="hero-anim-item w-full max-w-4xl mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {HERO_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-heading tracking-tight text-orange-600">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase text-slate-800 tracking-wider mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width Partner / Client Logo Strip (Infinite Running Marquee) */}
      <div className="mt-16 bg-slate-950 text-white py-6 border-t border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                MITRA UTAMA & ARMADA TANGGUH:
              </span>
            </div>

            {/* Continuous Marquee Ticker with Edge Fade Masks */}
            <div className="relative w-full overflow-hidden marquee-mask">
              <div className="animate-marquee flex items-center gap-8 sm:gap-12 text-slate-300 font-heading font-black text-sm sm:text-base tracking-widest uppercase py-1">
                {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
                  <span
                    key={idx}
                    className="hover:text-orange-500 transition-colors cursor-default opacity-85 hover:opacity-100 whitespace-nowrap shrink-0 flex items-center gap-8 sm:gap-12"
                  >
                    <span>{partner.logoText}</span>
                    <span className="text-slate-700 text-xs select-none">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
