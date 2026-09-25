"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".service-card", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-12 sm:py-space-2xl bg-surface-container-low border-b border-outline-variant" id="services">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-margin">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-container text-on-secondary-fixed font-label-caps text-[11px] sm:text-label-caps px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2.5 sm:mb-3 uppercase font-bold tracking-wider">
              KAPABILITAS KAMI
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg uppercase text-on-surface leading-snug lg:leading-tight">
              MENGAPA MEMILIH KAMI & LAYANAN UTAMA
            </h2>
          </div>
          <p className="font-body-md text-sm sm:text-body-md text-secondary max-w-md mt-3 md:mt-0 leading-relaxed">
            Kapabilitas industri berat yang direkayasa untuk bertahan di kondisi geoteknik yang ekstrem dan lingkungan operasional bersuhu tinggi.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="service-card group bg-surface text-on-surface p-5 sm:p-7 md:p-8 border border-outline-variant hover:bg-on-secondary-fixed hover:text-surface transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg cursor-pointer">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-container rounded-full group-hover:bg-surface/10 flex items-center justify-center text-on-surface group-hover:text-primary-container mb-4 sm:mb-6 transition-all group-hover:scale-110">
                <span className="material-symbols-outlined text-xl sm:text-2xl">iron</span>
              </div>
              <span className="font-label-technical text-[10px] sm:text-label-technical uppercase tracking-widest text-secondary group-hover:text-outline-variant block mb-1.5 sm:mb-2 transition-colors">MODUL LAYANAN 01</span>
              <h3 className="font-title-lg text-base sm:text-lg md:text-title-lg uppercase mb-2.5 sm:mb-4 font-bold">Material Tahan Lama & Precast</h3>
              <p className="font-body-sm text-xs sm:text-body-sm text-secondary group-hover:text-surface-container-highest leading-relaxed transition-colors">
                Rangka baja struktural standar ASTM bersertifikat, panel beton *precast post-tensioned* kekuatan tinggi, dan pelapis galvanis tahan cuaca yang dibangun untuk usia 100 tahun.
              </p>
            </div>
            <button className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-outline-variant group-hover:border-secondary flex justify-between items-center font-label-caps text-xs sm:text-label-caps uppercase group-hover:text-primary-container transition-colors w-full text-left" onClick={() => alert('Fitur spesifikasi sedang dalam pengembangan.')}>
              <span>Jelajahi Spesifikasi</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </div>
          <div className="service-card group bg-surface text-on-surface p-5 sm:p-7 md:p-8 border border-outline-variant hover:bg-on-secondary-fixed hover:text-surface transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg cursor-pointer">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-container rounded-full group-hover:bg-surface/10 flex items-center justify-center text-on-surface group-hover:text-primary-container mb-4 sm:mb-6 transition-all group-hover:scale-110">
                <span className="material-symbols-outlined text-xl sm:text-2xl">emergency</span>
              </div>
              <span className="font-label-technical text-[10px] sm:text-label-technical uppercase tracking-widest text-secondary group-hover:text-outline-variant block mb-1.5 sm:mb-2 transition-colors">MODUL LAYANAN 02</span>
              <h3 className="font-title-lg text-base sm:text-lg md:text-title-lg uppercase mb-2.5 sm:mb-4 font-bold">Perbaikan Struktural Darurat</h3>
              <p className="font-body-sm text-xs sm:text-body-sm text-secondary group-hover:text-surface-container-highest leading-relaxed transition-colors">
                Rekayasa bencana sipil respons cepat, perkuatan seismik, penopang struktural, penguatan serat karbon, dan stabilisasi pondasi darurat di fasilitas kritis.
              </p>
            </div>
            <button className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-outline-variant group-hover:border-secondary flex justify-between items-center font-label-caps text-xs sm:text-label-caps uppercase group-hover:text-primary-container transition-colors w-full text-left">
              <span>Jelajahi Spesifikasi</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </div>
          <div className="service-card group bg-surface text-on-surface p-5 sm:p-7 md:p-8 border border-outline-variant hover:bg-on-secondary-fixed hover:text-surface transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg cursor-pointer">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-container rounded-full group-hover:bg-surface/10 flex items-center justify-center text-on-surface group-hover:text-primary-container mb-4 sm:mb-6 transition-all group-hover:scale-110">
                <span className="material-symbols-outlined text-xl sm:text-2xl">payments</span>
              </div>
              <span className="font-label-technical text-[10px] sm:text-label-technical uppercase tracking-widest text-secondary group-hover:text-outline-variant block mb-1.5 sm:mb-2 transition-colors">MODUL LAYANAN 03</span>
              <h3 className="font-title-lg text-base sm:text-lg md:text-title-lg uppercase mb-2.5 sm:mb-4 font-bold">Pengadaan Berbasis Milestone</h3>
              <p className="font-body-sm text-xs sm:text-body-sm text-secondary group-hover:text-surface-container-highest leading-relaxed transition-colors">
                Manajemen modal yang transparan dan diatur oleh pencapaian, pencarian material buku terbuka, dan struktur penagihan komersial standar AIA untuk mengoptimalkan arus kas pengembang.
              </p>
            </div>
            <button className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-outline-variant group-hover:border-secondary flex justify-between items-center font-label-caps text-xs sm:text-label-caps uppercase group-hover:text-primary-container transition-colors w-full text-left">
              <span>Jelajahi Spesifikasi</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </div>
          <div className="service-card group bg-surface text-on-surface p-5 sm:p-7 md:p-8 border border-outline-variant hover:bg-on-secondary-fixed hover:text-surface transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg cursor-pointer">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-container rounded-full group-hover:bg-surface/10 flex items-center justify-center text-on-surface group-hover:text-primary-container mb-4 sm:mb-6 transition-all group-hover:scale-110">
                <span className="material-symbols-outlined text-xl sm:text-2xl">engineering</span>
              </div>
              <span className="font-label-technical text-[10px] sm:text-label-technical uppercase tracking-widest text-secondary group-hover:text-outline-variant block mb-1.5 sm:mb-2 transition-colors">MODUL LAYANAN 04</span>
              <h3 className="font-title-lg text-base sm:text-lg md:text-title-lg uppercase mb-2.5 sm:mb-4 font-bold">Tim Rekayasa Berlisensi</h3>
              <p className="font-body-sm text-xs sm:text-body-sm text-secondary group-hover:text-surface-container-highest leading-relaxed transition-colors">
                Insinyur sipil berlisensi internal, inspektur pengelasan AWS bersertifikat, ahli *rigger* level-3, dan pemodel digital BIM LOD 400 yang mengawasi eksekusi dengan presisi.
              </p>
            </div>
            <button className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-outline-variant group-hover:border-secondary flex justify-between items-center font-label-caps text-xs sm:text-label-caps uppercase group-hover:text-primary-container transition-colors w-full text-left">
              <span>Jelajahi Spesifikasi</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
