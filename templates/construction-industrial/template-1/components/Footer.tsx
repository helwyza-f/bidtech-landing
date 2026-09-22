"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".footer-column", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="w-full px-4 sm:px-6 md:px-margin py-12 sm:py-space-2xl bg-inverse-surface border-t border-on-surface-variant text-surface" id="contact">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="footer-column lg:col-span-4">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary-container flex-shrink-0"></div>
              <span className="font-headline-md text-xl sm:text-headline-md tracking-wider uppercase text-inverse-on-surface font-bold">ELEVASI</span>
            </div>
            <div className="font-body-sm text-xs sm:text-body-sm text-outline-variant mb-3 sm:mb-4 font-semibold uppercase tracking-wider">
              Membangun Standar yang Lebih Baik
            </div>
            <p className="font-body-sm text-xs sm:text-body-sm text-surface-dim leading-relaxed mb-5 sm:mb-6 max-w-sm">
              Rekayasa Struktural & Konstruksi Umum Elevasi berspesialisasi dalam infrastruktur sipil industri berat, kerangka baja pencakar langit, dan perkuatan seismik di seluruh Indonesia dan Asia Tenggara.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-container flex-shrink-0"></div>
              <span className="font-label-technical text-[10px] sm:text-label-technical uppercase text-surface-dim">ENTITAS BERSERTIFIKAT ISO 9001 & 45001</span>
            </div>
          </div>
          <div className="footer-column lg:col-span-2">
            <h4 className="font-label-caps text-xs sm:text-label-caps uppercase font-bold text-surface mb-4 sm:mb-6 tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 font-body-sm text-xs sm:text-body-sm">
              <li><a className="text-outline-variant hover:text-surface-bright transition-colors duration-150" href="#home">Beranda</a></li>
              <li><a className="text-outline-variant hover:text-surface-bright transition-colors duration-150" href="#about">Tentang Kami</a></li>
              <li><a className="text-outline-variant hover:text-surface-bright transition-colors duration-150" href="#services">Layanan</a></li>
              <li><a className="text-outline-variant hover:text-surface-bright transition-colors duration-150" href="#projects">Proyek</a></li>
              <li><a className="text-outline-variant hover:text-surface-bright transition-colors duration-150" href="#workflow">Tim & Metodologi</a></li>
              <li><a className="text-outline-variant hover:text-surface-bright transition-colors duration-150" href="#safety">Kepatuhan & Keamanan</a></li>
            </ul>
          </div>
          <div className="footer-column lg:col-span-3">
            <h4 className="font-label-caps text-xs sm:text-label-caps uppercase font-bold text-surface mb-4 sm:mb-6 tracking-wider">
              Kontak
            </h4>
            <div className="space-y-5 sm:space-y-6">
              <div>
                <div className="font-label-technical text-[10px] sm:text-label-technical uppercase text-primary-container font-bold mb-1">
                  KANTOR PUSAT JAKARTA
                </div>
                <p className="font-body-sm text-xs sm:text-body-sm text-surface-dim leading-relaxed">
                  200 SW Central Avenue, Lantai 18<br />
                  Jakarta Selatan 12190, Indonesia
                </p>
                <a className="font-body-sm text-xs sm:text-body-sm text-surface hover:text-primary-container transition-colors inline-block mt-1 font-semibold" href="tel:0215558742">
                  (021) 555-8742
                </a>
              </div>
              <div>
                <div className="font-label-technical text-[10px] sm:text-label-technical uppercase text-primary-container font-bold mb-1">
                  PUSAT INDUSTRI BATAM
                </div>
                <p className="font-body-sm text-xs sm:text-body-sm text-surface-dim leading-relaxed">
                  3924 Industrial Park Drive, Suite 101<br />
                  Batam 29432, Indonesia
                </p>
                <a className="font-body-sm text-xs sm:text-body-sm text-surface hover:text-primary-container transition-colors inline-block mt-1 font-semibold" href="mailto:info@elevasibuilders.com">
                  info@elevasibuilders.com
                </a>
              </div>
            </div>
          </div>
          <div className="footer-column lg:col-span-3">
            <h4 className="font-label-caps text-xs sm:text-label-caps uppercase font-bold text-surface mb-4 sm:mb-6 tracking-wider">
              Sosial & Wawasan
            </h4>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              <a aria-label="Instagram" className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-secondary text-surface-dim hover:border-primary-container hover:text-primary-container hover:scale-110 flex items-center justify-center transition-all duration-300" href="#">
                <span className="material-symbols-outlined text-base sm:text-lg">public</span>
              </a>
              <a aria-label="Facebook" className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-secondary text-surface-dim hover:border-primary-container hover:text-primary-container hover:scale-110 flex items-center justify-center transition-all duration-300" href="#">
                <span className="material-symbols-outlined text-base sm:text-lg">share</span>
              </a>
              <a aria-label="LinkedIn" className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-secondary text-surface-dim hover:border-primary-container hover:text-primary-container hover:scale-110 flex items-center justify-center transition-all duration-300" href="#">
                <span className="material-symbols-outlined text-base sm:text-lg">hub</span>
              </a>
              <a aria-label="YouTube" className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-secondary text-surface-dim hover:border-primary-container hover:text-primary-container hover:scale-110 flex items-center justify-center transition-all duration-300" href="#">
                <span className="material-symbols-outlined text-base sm:text-lg">play_circle</span>
              </a>
            </div>
            <div className="font-label-technical text-[10px] sm:text-label-technical uppercase text-surface mb-2 font-bold tracking-wider">
              BULETIN KECERDASAN STRUKTURAL
            </div>
            <form className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0" onSubmit={(e) => { e.preventDefault(); alert('Berlangganan Jurnal Teknis Elevasi berhasil.'); }}>
              <input className="w-full bg-surface/10 border border-secondary text-surface text-xs sm:text-body-sm px-3 py-2.5 rounded-none focus:outline-none focus:border-primary-container placeholder:text-surface-dim/60" placeholder="Masukkan email korporat" required type="email" />
              <button className="bg-primary-container text-on-secondary-fixed font-label-caps text-xs sm:text-label-caps px-5 py-2.5 rounded-full sm:ml-2 uppercase font-bold hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0" type="submit">
                Gabung
              </button>
            </form>
          </div>
        </div>
        <div className="w-full h-[1px] bg-secondary/40 my-8 sm:my-10"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 font-label-technical text-[10px] sm:text-label-technical text-surface-dim">
          <div>
            © 2025 Rekayasa Struktural & Konstruksi Umum Elevasi. Seluruh hak cipta.
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span>LISENSI: OR 193549</span>
            <span className="w-1 h-1 rounded-full bg-secondary hidden sm:inline-block"></span>
            <span>ID 1181615</span>
            <span className="w-1 h-1 rounded-full bg-secondary hidden sm:inline-block"></span>
            <span>WA ELEVAB890JL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
