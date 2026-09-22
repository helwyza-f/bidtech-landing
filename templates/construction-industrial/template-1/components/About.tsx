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
    <section ref={containerRef} className="w-full py-12 sm:py-space-2xl bg-surface border-b border-outline-variant overflow-hidden" id="about">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 relative about-image-wrapper">
            <div className="relative w-full aspect-[4/3] border border-outline-variant bg-surface-container overflow-hidden">
              <img className="about-image w-full h-full object-cover" alt="Fotografi sudut tinggi terfokus dari insinyur sipil struktural bersertifikat" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnGYPePLE1rB2LYjiiNZ8hIikF7vm5vF4MWRB5j8aEq_j6nQ8LlrypAneL4q3pSYPfhSGL6cDagR0RY3be0WDnmtfDDPcZEz6aKgr-fNbOSR6J4wcYlqGWUdSCBF9xUgKwBCxR5IyzbiNZAlesTjQJEnLBTc0RyTmQWTJxtnRAaVu8cn1YKNQVyQpjUgs-wkWj6tOdvmM-w9REOtshGfpSbFVChflApxul8m3Nu5z5V5gyJWkI8Bv2OA" />
              <button aria-label="Putar video situs" className="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-container text-on-secondary-fixed flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-md group">
                <span className="material-symbols-outlined text-xl sm:text-2xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-on-secondary-fixed/90 text-surface p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-label-technical font-label-technical uppercase border-t border-secondary gap-1 sm:gap-0">
                <span>VERIFIKASI LAPANGAN : SEKTOR PROYEK 04</span>
                <span className="text-primary-container flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span> FEED KAMERA LANGSUNG 01</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 about-content">
            <div className="inline-flex items-center gap-2 bg-primary-container text-on-secondary-fixed font-label-caps text-[11px] sm:text-label-caps px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 uppercase font-bold tracking-wider">
              TENTANG KAMI
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg uppercase text-on-surface leading-snug lg:leading-tight mb-4 sm:mb-6">
              KAMI DIBANGUN UNTUK MEREKA YANG MENGHARGAI INTEGRITAS STRUKTURAL DAN KEAHLIAN
            </h2>
            <p className="font-body-md text-sm sm:text-body-md text-secondary mb-6 sm:mb-8 leading-relaxed">
              Elevasi hadir memberikan solusi konstruksi dan rekayasa struktural menyeluruh untuk berbagai sektor industri dan komersial. Melalui pendekatan terpadu dari perancangan hingga eksekusi, kami menjamin struktur yang kokoh, efisiensi biaya, dan ketepatan waktu proyek Anda.
            </p>
            <div className="grid grid-cols-2 gap-px bg-outline-variant border border-outline-variant mb-6 sm:mb-8 shadow-sm">
              <div className="bg-surface p-3.5 sm:p-6 hover:bg-surface-container transition-colors duration-300">
                <div className="font-display text-2xl sm:text-4xl lg:text-headline-lg text-on-surface font-bold">98%+</div>
                <div className="font-body-sm text-xs sm:text-body-sm text-secondary font-medium mt-0.5">Tingkat Kepuasan Klien</div>
              </div>
              <div className="bg-surface p-3.5 sm:p-6 hover:bg-surface-container transition-colors duration-300">
                <div className="font-display text-2xl sm:text-4xl lg:text-headline-lg text-on-surface font-bold">1.2k+</div>
                <div className="font-body-sm text-xs sm:text-body-sm text-secondary font-medium mt-0.5">Proyek Besar Ditangani</div>
              </div>
              <div className="bg-surface p-3.5 sm:p-6 hover:bg-surface-container transition-colors duration-300">
                <div className="font-display text-2xl sm:text-4xl lg:text-headline-lg text-on-surface font-bold">4.9</div>
                <div className="font-body-sm text-xs sm:text-body-sm text-secondary font-medium mt-0.5">Rata-rata Peringkat Keselamatan</div>
              </div>
              <div className="bg-surface p-3.5 sm:p-6 hover:bg-surface-container transition-colors duration-300">
                <div className="font-display text-2xl sm:text-4xl lg:text-headline-lg text-on-surface font-bold">90%+</div>
                <div className="font-body-sm text-xs sm:text-body-sm text-secondary font-medium mt-0.5">Selesai Lebih Cepat dari Jadwal</div>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-on-secondary-fixed text-surface rounded-full px-6 sm:px-8 py-3 sm:py-3.5 font-label-caps text-xs sm:text-label-caps uppercase hover:bg-primary-container hover:text-on-secondary-fixed hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-sm font-bold" onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}>
              <span>Pelajari Lebih Lanjut</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
