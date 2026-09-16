"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Image reveal animation
    gsap.from(".about-image-wrapper", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      clipPath: "inset(0 100% 0 0)",
      duration: 1.5,
      ease: "power3.inOut"
    });

    gsap.from(".about-image", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      scale: 1.2,
      duration: 1.5,
      ease: "power3.inOut"
    });

    // Text animations
    gsap.from(".about-content > *", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-space-2xl bg-surface border-b border-outline-variant overflow-hidden" id="about">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative about-image-wrapper">
            <div className="relative w-full aspect-[4/3] border border-outline-variant bg-surface-container overflow-hidden">
              <img className="about-image w-full h-full object-cover" alt="Fotografi sudut tinggi terfokus dari insinyur sipil struktural bersertifikat" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnGYPePLE1rB2LYjiiNZ8hIikF7vm5vF4MWRB5j8aEq_j6nQ8LlrypAneL4q3pSYPfhSGL6cDagR0RY3be0WDnmtfDDPcZEz6aKgr-fNbOSR6J4wcYlqGWUdSCBF9xUgKwBCxR5IyzbiNZAlesTjQJEnLBTc0RyTmQWTJxtnRAaVu8cn1YKNQVyQpjUgs-wkWj6tOdvmM-w9REOtshGfpSbFVChflApxul8m3Nu5z5V5gyJWkI8Bv2OA" />
              <button aria-label="Putar video situs" className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary-container text-on-secondary-fixed flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-md group">
                <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-on-secondary-fixed/90 text-surface p-4 flex justify-between items-center text-label-technical font-label-technical uppercase border-t border-secondary">
                <span>VERIFIKASI LAPANGAN : SEKTOR PROYEK 04</span>
                <span className="text-primary-container flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span> FEED KAMERA LANGSUNG 01</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 about-content">
            <div className="inline-flex items-center gap-2 bg-primary-container text-on-secondary-fixed font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-4 uppercase">
              TENTANG KAMI
            </div>
            <h2 className="font-headline-lg text-headline-lg uppercase text-on-surface leading-tight mb-6">
              KAMI DIBANGUN UNTUK MEREKA YANG MENGHARGAI INTEGRITAS STRUKTURAL DAN KEAHLIAN
            </h2>
            <p className="font-body-md text-body-md text-secondary mb-8">
              Didirikan dengan filosofi rekayasa yang tanpa kompromi, Elevasi menyediakan solusi sipil *turnkey*, *retrofitting* seismik, dan pendirian struktur untuk pusat komersial dan industri kritis di Asia Tenggara. Metodologi *design-build* terintegrasi kami menghilangkan batasan kontraktor, memastikan presisi beban absolut dan kepatuhan anggaran yang ketat.
            </p>
            <div className="grid grid-cols-2 gap-px bg-outline-variant border border-outline-variant mb-8 shadow-sm">
              <div className="bg-surface p-6 hover:bg-surface-container transition-colors duration-300">
                <div className="font-display text-headline-lg font-headline-lg text-on-surface">98%+</div>
                <div className="font-body-sm text-body-sm text-secondary font-medium">Tingkat Kepuasan Klien</div>
              </div>
              <div className="bg-surface p-6 hover:bg-surface-container transition-colors duration-300">
                <div className="font-display text-headline-lg font-headline-lg text-on-surface">1.2k+</div>
                <div className="font-body-sm text-body-sm text-secondary font-medium">Proyek Besar Ditangani</div>
              </div>
              <div className="bg-surface p-6 hover:bg-surface-container transition-colors duration-300">
                <div className="font-display text-headline-lg font-headline-lg text-on-surface">4.9</div>
                <div className="font-body-sm text-body-sm text-secondary font-medium">Rata-rata Peringkat Keselamatan</div>
              </div>
              <div className="bg-surface p-6 hover:bg-surface-container transition-colors duration-300">
                <div className="font-display text-headline-lg font-headline-lg text-on-surface">90%+</div>
                <div className="font-body-sm text-body-sm text-secondary font-medium">Selesai Lebih Cepat dari Jadwal</div>
              </div>
            </div>
            <button className="bg-on-secondary-fixed text-surface rounded-full px-8 py-3.5 font-label-caps text-label-caps uppercase hover:bg-primary-container hover:text-on-secondary-fixed hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 shadow-sm" onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}>
              Pelajari Lebih Lanjut <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
