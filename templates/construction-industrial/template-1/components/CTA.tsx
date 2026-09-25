"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".cta-content", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-12 sm:py-space-2xl bg-on-secondary-fixed overflow-hidden border-b border-outline-variant/20" id="quote">
      <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover opacity-20 filter contrast-150" alt="Pandangan sudut lebar kontras tinggi yang intens dari rangka derek baja industri berat yang masif." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmV8Nb8ADF4W-rWFc_VLB6E7OPb5DOPOk1s7draH_nYpBZbxBUrxbL_8UK5wNfW4bk1nJxoiGhrys4rueK4pKqdVQb4npnizwsOxSSJwNYTY42OylA9sd6hxtMvcx1_jlYD8ZyvO54IhevbGiFf5Gcc_76JBPaQEZe7jRVsS6sHyvOwTMOfqDLqAraDvJf98u2Kyb7_BQSdy7eZuzDQw92nfcWJh4KRgcK6QGSswcCub0mLrXRiFqIYg" />
        <div className="absolute inset-0 bg-on-secondary-fixed/90"></div>
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-margin text-center cta-content">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-container text-on-secondary-fixed font-label-caps text-[11px] sm:text-label-caps px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 uppercase font-bold tracking-wider">
            MULAI KONSULTASI REKAYASA ANDA
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg uppercase text-surface mb-4 sm:mb-6 leading-snug lg:leading-tight">
            SIAP UNTUK MEMBANGUN <br className="hidden sm:inline" />
            <span className="text-primary-container">LANDMARK INDUSTRI SELANJUTNYA?</span>
          </h2>
          <p className="font-body-md text-sm sm:text-base md:text-body-lg text-surface-dim mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Berkonsultasilah secara langsung dengan insinyur struktural utama kami. Dapatkan laporan kelayakan rekayasa dan estimasi awal kuantitas dalam 48 jam.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button className="w-full sm:w-auto bg-primary-container text-on-secondary-fixed font-label-caps text-xs sm:text-label-caps uppercase rounded-full px-6 sm:px-8 py-3.5 sm:py-4 hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 font-bold inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer" onClick={() => alert('Jadwal Konsultasi Terkirim!')}>
              <span>Jadwalkan Konsultasi Teknis</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <a className="w-full sm:w-auto border-[1.5px] border-surface text-surface font-label-caps text-xs sm:text-label-caps uppercase rounded-full px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-surface hover:text-on-secondary-fixed hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2" href="tel:0215558742">
              <span className="material-symbols-outlined text-base">call</span> <span>(021) 555-8742</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
