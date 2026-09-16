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
    <section ref={containerRef} className="relative min-h-[921px] flex items-center overflow-hidden border-b border-outline-variant bg-surface" id="home">
      <div className="absolute inset-0 z-0">
        <img ref={imageRef} className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125 scale-110" alt="Rangka baja struktural arsitektur yang megah menjulang tinggi." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-zB7CORWiF7TcUsONxpTyQNqNboH11zKUrQ8LH78tTBTRt8_hFi1JkYxjr-7jdcbDaitHZE-0Y7ilwK-6N7Iu_olP9cei_R8on7RX2c7bcR6tVy9SnKRxeA7yUieFutSta94RyETxwGGUlyMjIeCxDTjZEWmbVeqRbDFu3hod6oCWaHcSMNxQCR0Bu3BE6u5kXye7vm6PMQwgQJFS25Zu2WzvUAAGeGGXqcoEfourqioixusj-G5xcw" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/40"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)' }}></div>
      </div>
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-2xl">
        <div className="max-w-4xl" ref={textRef}>
          <div className="hero-text inline-flex items-center gap-2 bg-primary-container text-on-secondary-fixed font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-6 uppercase">
            <span className="w-2 h-2 rounded-full bg-on-secondary-fixed animate-pulse"></span>
            SOLUSI STRUKTURAL TERPADU
          </div>
          <h1 className="hero-text font-headline-lg text-headline-lg uppercase text-on-surface leading-[1.05] tracking-tight mb-6">
            MEREKAYASA KEAMANAN DENGAN <br />
            <span className="inline-block bg-primary-container text-on-secondary-fixed px-3 py-1 mt-1">STRUKTUR YANG KOKOH</span>
          </h1>
          <p className="hero-text font-body-lg text-body-lg text-secondary max-w-2xl mb-10">
            Memanfaatkan rekayasa tingkat lanjut, keahlian baja bersertifikat, dan standar arsitektur modern untuk pembangunan mega-struktur dan kawasan industri.
          </p>
          <div className="hero-text flex flex-wrap items-center gap-4">
            <button className="bg-primary-container text-on-secondary-fixed font-label-caps text-label-caps uppercase rounded-full px-8 py-4 hover:bg-on-secondary-fixed hover:text-primary-container hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 shadow-sm" onClick={() => document.getElementById('quote')?.scrollIntoView({behavior: 'smooth'})}>
              Dapatkan Estimasi Gratis <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <a className="border-[1.5px] border-on-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps uppercase rounded-full px-8 py-4 hover:bg-on-secondary-fixed hover:text-surface hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2" href="tel:0215558742">
              <span className="material-symbols-outlined">call</span> (021) 555-8742
            </a>
          </div>
          <div className="hero-text mt-16 pt-8 border-t border-outline-variant grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <span className="font-label-technical text-label-technical uppercase text-secondary block">Standar Kepatuhan</span>
              <span className="font-title-lg text-title-lg text-on-surface uppercase font-bold">SNI / AISC 360</span>
            </div>
            <div>
              <span className="font-label-technical text-label-technical uppercase text-secondary block">Bentang Maksimal</span>
              <span className="font-title-lg text-title-lg text-on-surface uppercase font-bold">120+ METER</span>
            </div>
            <div>
              <span className="font-label-technical text-label-technical uppercase text-secondary block">Pabrikasi Baja</span>
              <span className="font-title-lg text-title-lg text-on-surface uppercase font-bold">5.000 TON/BLN</span>
            </div>
            <div>
              <span className="font-label-technical text-label-technical uppercase text-secondary block">Rekor Keselamatan</span>
              <span className="font-title-lg text-title-lg text-on-surface uppercase font-bold">NOL LTI (5 THN)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
