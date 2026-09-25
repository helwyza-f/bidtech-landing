"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Parallax effect for the background image
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Staggered text entrance
    gsap.from(".hero-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[85vh] lg:min-h-[921px] flex items-center overflow-hidden border-b border-outline-variant bg-surface" id="home">
      <div className="absolute inset-0 z-0">
        <img ref={imageRef} className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125 scale-110" alt="Rangka baja struktural arsitektur yang megah menjulang tinggi." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-zB7CORWiF7TcUsONxpTyQNqNboH11zKUrQ8LH78tTBTRt8_hFi1JkYxjr-7jdcbDaitHZE-0Y7ilwK-6N7Iu_olP9cei_R8on7RX2c7bcR6tVy9SnKRxeA7yUieFutSta94RyETxwGGUlyMjIeCxDTjZEWmbVeqRbDFu3hod6oCWaHcSMNxQCR0Bu3BE6u5kXye7vm6PMQwgQJFS25Zu2WzvUAAGeGGXqcoEfourqioixusj-G5xcw" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/40"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)' }}></div>
      </div>
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-margin py-12 sm:py-space-2xl">
        <div className="max-w-4xl" ref={textRef}>
          <h1 className="hero-text font-headline-lg text-2xl sm:text-4xl md:text-5xl lg:text-headline-lg uppercase text-on-surface leading-[1.12] md:leading-[1.05] tracking-tight mb-4 sm:mb-6">
            MEREKAYASA KEAMANAN DENGAN <br className="hidden sm:inline" />
            <span className="inline-block bg-primary-container text-on-secondary-fixed px-2 sm:px-3 py-0.5 sm:py-1 mt-1 font-bold">STRUKTUR YANG KOKOH</span>
          </h1>
          <p className="hero-text font-body-md text-sm sm:text-base md:text-body-lg text-secondary max-w-2xl mb-8 sm:mb-10 leading-relaxed font-normal">
            Memanfaatkan rekayasa tingkat lanjut, keahlian baja bersertifikat, dan standar arsitektur modern untuk pembangunan mega-struktur dan kawasan industri.
          </p>
          <div className="hero-text flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button className="bg-primary-container text-on-secondary-fixed font-label-caps text-xs sm:text-label-caps uppercase rounded-full px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-on-secondary-fixed hover:text-primary-container hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-sm font-bold cursor-pointer" onClick={() => document.getElementById('quote')?.scrollIntoView({behavior: 'smooth'})}>
              <span>Dapatkan Estimasi Gratis</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <a className="border-[1.5px] border-on-secondary-fixed text-on-secondary-fixed font-label-caps text-xs sm:text-label-caps uppercase rounded-full px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-on-secondary-fixed hover:text-surface hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2" href="tel:0215558742">
              <span className="material-symbols-outlined text-base">call</span> <span>(021) 555-8742</span>
            </a>
          </div>
          <div className="hero-text mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-outline-variant grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <span className="font-label-technical text-[10px] sm:text-label-technical uppercase text-secondary block mb-0.5">Standar Kepatuhan</span>
              <span className="font-title-lg text-sm sm:text-base md:text-title-lg text-on-surface uppercase font-bold">SNI / AISC 360</span>
            </div>
            <div>
              <span className="font-label-technical text-[10px] sm:text-label-technical uppercase text-secondary block mb-0.5">Bentang Maksimal</span>
              <span className="font-title-lg text-sm sm:text-base md:text-title-lg text-on-surface uppercase font-bold">120+ METER</span>
            </div>
            <div>
              <span className="font-label-technical text-[10px] sm:text-label-technical uppercase text-secondary block mb-0.5">Pabrikasi Baja</span>
              <span className="font-title-lg text-sm sm:text-base md:text-title-lg text-on-surface uppercase font-bold">5.000 TON/BLN</span>
            </div>
            <div>
              <span className="font-label-technical text-[10px] sm:text-label-technical uppercase text-secondary block mb-0.5">Rekor Keselamatan</span>
              <span className="font-title-lg text-sm sm:text-base md:text-title-lg text-on-surface uppercase font-bold">NOL LTI (5 THN)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
