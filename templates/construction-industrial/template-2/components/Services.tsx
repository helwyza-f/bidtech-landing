"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const handleScrollToQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#quote');
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, {
        offset: -85,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    gsap.fromTo(".services-header-anim", 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );

    gsap.fromTo(".services-card-anim", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );
  }, { scope: containerRef });

  return (
    <section id="katalog" ref={containerRef} className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="services-header-anim flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h4 className="text-orange-700 font-bold text-[11px] tracking-wider uppercase mb-2">
              DIVISI MESIN & ALAT BERAT TEKNIS
            </h4>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Katalog Armada Utama
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-500 text-sm leading-relaxed">
              Seluruh unit dilengkapi sertifikat laik operasi (SLO), inspeksi berkala K3, dan gateway telematika untuk pemantauan konsumsi bahan bakar serta efisiensi beban kerja.
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Left Card - Excavator */}
          <div className="services-card-anim service-card lg:col-span-8 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            {/* Card Header */}
            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1.5 rounded-full">ARMADA EARTHMOVING</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Tersedia 42 Unit
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                KODE: CAT-390FL-EXEC
              </span>
            </div>

            {/* Image Section */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/7.5] bg-slate-100">
              <Image 
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop"
                alt="Excavator Crawler Kelas Berat"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-700/50">
                <span className="material-symbols-outlined text-[14px] text-orange-500">verified_user</span>
                <span className="text-[11px] font-medium text-white tracking-wide">Termasuk Operator SIO</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight max-w-md">
                    Excavator Crawler Kelas Berat 30T
                  </h3>
                  <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">MODEL SEWA</span>
                    <span className="text-[13px] font-bold text-orange-600">Kontrak Bulanan / Jam</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                  Dirancang khusus untuk penggalian pondasi dalam, pembongkaran struktur, dan pemindahan material volume tinggi.
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1 tracking-wider">DAYA BERSIH</span>
                  <span className="text-[15px] font-bold text-slate-900">285 HP</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1 tracking-wider">BERAT OPERASIONAL</span>
                  <span className="text-[15px] font-bold text-slate-900">32.500 kg</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1 tracking-wider">KAPASITAS BUCKET</span>
                  <span className="text-[15px] font-bold text-slate-900 flex items-center justify-center gap-1">
                    1.9 m<sup className="text-[10px]">3</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fleet Categories */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4 h-full content-between">
            {/* Heavy Earthmoving */}
            <div
              className="services-card-anim bg-slate-50 border border-slate-200/60 rounded-2xl p-6 group hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">LOGISTIK / ANGKUTAN</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold">
                  Tersedia 35 Unit
                </span>
              </div>
              
              <h3 className="text-[17px] font-bold text-slate-900 mb-2">Truk Angkut Tambang 50T</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed mb-6 flex-1">
                Efisiensi angkut material tambang, urukan tanah masif, serta batuan keras pada kontur curam.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Daya Mesin</span>
                  <span className="text-[11px] font-bold text-slate-800">540 HP Turbo</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Kapasitas Muatan</span>
                  <span className="text-[11px] font-bold text-slate-800">48.000 kg</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Pemantauan</span>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">rss_feed</span>
                    Telematika Aktif
                  </span>
                </div>
              </div>
              
              <a href="#quote" onClick={handleScrollToQuote} className="w-full py-3.5 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-100 text-[12px] font-bold flex items-center justify-between transition-colors">
                <span>Ajukan Sewa Unit</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </a>
            </div>

            {/* Lifting & Cranes */}
            <div
              className="services-card-anim bg-slate-50 border border-slate-200/60 rounded-2xl p-6 group hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">SOLUSI PENGANGKATAN</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold">
                  Tersedia 18 Unit
                </span>
              </div>
              
              <h3 className="text-[17px] font-bold text-slate-900 mb-2">Crane All-Terrain 100T</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed mb-6 flex-1">
                Pengangkatan balok girder, perakitan baja pabrikasi, dan instalasi mekanikal berat di medan terbatas.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Daya Mesin</span>
                  <span className="text-[11px] font-bold text-slate-800">520 HP Tier 4</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Jangkauan Boom Maks</span>
                  <span className="text-[11px] font-bold text-slate-800">60.0 m Teleskopik</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Sistem Keselamatan</span>
                  <span className="text-[11px] font-bold text-slate-800">Dual Winch LMI</span>
                </div>
              </div>
              
              <a href="#quote" onClick={handleScrollToQuote} className="w-full py-3.5 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-100 text-[12px] font-bold flex items-center justify-between transition-colors">
                <span>Ajukan Sewa Unit</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
