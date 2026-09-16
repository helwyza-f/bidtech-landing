'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Entrance Animations
      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from('.hero-headline', { y: 35, opacity: 0, duration: 0.8, ease: 'power4.out' }, '-=0.4')
        .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .from('.hero-specs-box', { scaleX: 0.9, opacity: 0, duration: 0.6, ease: 'power3.out', transformOrigin: 'left' }, '-=0.4')
        .from('.hero-cta-btn', { y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from('.hero-right-frame', { opacity: 0, scale: 0.95, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('#shoe-img', { y: 40, opacity: 0, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.4')
        .from('.hero-spec-item', { opacity: 0, y: 15, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, '-=0.4');
    },
    { scope: containerRef }
  );

  // Mouse Move 3D Parallax Tilt Effect on Hero Shoe Image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(imageRef.current, {
      rotateY: x * 0.08,
      rotateX: -y * 0.08,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power3.out',
      duration: 0.6,
    });
  };

  return (
    <section ref={containerRef} className="bg-white border-b border-[#e2e2e2] py-14 md:py-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="hero-badge inline-flex items-center space-x-2 border border-[#e2e2e2] px-2.5 py-1">
              <span className="w-1.5 h-1.5 bg-[#1a1c1c] animate-pulse"></span>
              <span className="font-mono text-[11px] text-[#7e7576] uppercase tracking-wider">
                MONOGRAF / VOLUME 01
              </span>
            </div>

            <h1 className="hero-headline text-[42px] sm:text-[54px] lg:text-[62px] leading-[1.05] font-extrabold tracking-tight text-[#1a1c1c] uppercase">
              IKON TAK<br />
              TERBANTAHKAN.<br />
              TRIPLE WHITE MURNI.
            </h1>

            <p className="hero-desc text-[15px] leading-relaxed text-[#7e7576] max-w-xl">
              Mendekonstruksi warisan mahakarya Nike Air Force 1 — dari lapangan basket '82 hingga kultur jalanan modern. Diciptakan dengan bantalan kapsul Nike Air dan kulit tumbled premium 10oz tanpa cela.
            </p>

            {/* Specifications Bar */}
            <div className="hero-specs-box grid grid-cols-3 border border-[#e2e2e2] max-w-lg">
              <div className="p-3 border-r border-[#e2e2e2]">
                <p className="font-mono text-[10px] text-[#7e7576] uppercase tracking-wider">SERIAL / SKU</p>
                <p className="font-mono text-[12px] text-[#1a1c1c] font-bold mt-1">CW2288-111</p>
              </div>
              <div className="p-3 border-r border-[#e2e2e2]">
                <p className="font-mono text-[10px] text-[#7e7576] uppercase tracking-wider">BERAT BERSIH</p>
                <p className="font-mono text-[12px] text-[#1a1c1c] font-bold mt-1">430g / US 9</p>
              </div>
              <div className="p-3">
                <p className="font-mono text-[10px] text-[#7e7576] uppercase tracking-wider">WARISAN DESAIN</p>
                <p className="font-mono text-[12px] text-[#1a1c1c] font-bold mt-1">B. Kilgore 1982</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="#catalog"
                className="hero-cta-btn h-12 px-6 bg-black text-white font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center text-center"
              >
                BELI TRIPLE WHITE — RP 1.549.000
              </Link>
              <Link
                href="#catalog"
                className="hero-cta-btn h-12 px-6 bg-white border border-black text-[#1a1c1c] font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors flex items-center justify-center text-center"
              >
                JELAJAHI SEMUA 8 VARIAN →
              </Link>
            </div>
          </div>

          {/* Hero Right Visual Display with 3D Tilt */}
          <div className="hero-right-frame lg:col-span-6 border border-[#e2e2e2] p-6 md:p-8 bg-white relative">
            <div className="text-right font-mono text-[10px] text-[#7e7576] uppercase tracking-wider mb-4">
              SPESIFIKASI ARSIP // ROTASI 360° (INTERAKTIF)
            </div>

            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-[#F5F5F5] py-10 px-6 flex items-center justify-center mb-6 cursor-grab active:cursor-grabbing select-none"
            >
              <img
                ref={imageRef}
                id="shoe-img"
                className="w-full max-w-md object-contain drop-shadow-md transition-shadow duration-300"
                alt="Nike Air Force 1 '07 Triple White"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq3ZwKfvTUTzrHOHcH7BoWhSpgpl1JBzpynZdfol2iViFoC0dMSrPybU7JjszPYh6u_TfSOnCisKOfzFHElvcOoZtUdY9oKlFr7S6b-8ritkcr2ruo5rLXH93GuspkvqtvJ1bIxEkSspFsoDohKGFrAY3ISxNXw8fL4gsuM7c2UaHahw0l85zlk9g2kKiDH2_NYadRBz7i0yLWOlGAdjhtK-_6k3nEnShjrxeBtY-cIQCZ-wbP8vRU"
              />
            </div>

            {/* Bottom 4 Specs Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#e2e2e2]">
              <div className="hero-spec-item p-3 text-center border-r border-b sm:border-b-0 border-[#e2e2e2]">
                <span className="font-mono text-[10px] text-[#7e7576] block uppercase tracking-wider">BAGIAN ATAS</span>
                <span className="font-sans text-[12px] font-bold text-[#1a1c1c] block mt-1">Kulit Tumbled</span>
              </div>
              <div className="hero-spec-item p-3 text-center border-b sm:border-b-0 sm:border-r border-[#e2e2e2]">
                <span className="font-mono text-[10px] text-[#7e7576] block uppercase tracking-wider">MIDSOLE</span>
                <span className="font-sans text-[12px] font-bold text-[#1a1c1c] block mt-1">Unit Air-Sole</span>
              </div>
              <div className="hero-spec-item p-3 text-center border-r border-[#e2e2e2]">
                <span className="font-mono text-[10px] text-[#7e7576] block uppercase tracking-wider">OUTSOLE</span>
                <span className="font-sans text-[12px] font-bold text-[#1a1c1c] block mt-1">Karet Pivot</span>
              </div>
              <div className="hero-spec-item p-3 text-center">
                <span className="font-mono text-[10px] text-[#7e7576] block uppercase tracking-wider">STATUS</span>
                <span className="font-mono text-[11px] font-bold text-[#1a1c1c] block mt-1">Stok Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
