"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .from('.hero-divider', { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-buttons', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-features', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-image', { x: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1')
      .from('.hero-widget', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  }, { scope: container });

  return (
    <section ref={container} id="beranda" className="relative bg-surface pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="max-w-2xl">
            <div className="hero-badge inline-block px-3 py-1 bg-primary text-xs font-bold tracking-widest uppercase mb-6 rounded-sm">
              Rental Mobil Aman & Terpercaya
            </div>
            
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Mau Pergi ke Mana?<br />
              Mobilnya Kami Siapkan.
            </h1>
            
            <div className="hero-divider h-1.5 w-40 bg-primary mb-6"></div>
            
            <p className="hero-desc text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Sewa mobil harian atau bulanan lebih praktis, fleksibel, dan nyaman. Tersedia untuk urusan bisnis, liburan keluarga, atau sekadar keliling kota. Pesan sekarang, berangkat kapan saja.
            </p>
            
            <div className="hero-buttons flex flex-wrap gap-4 mb-10">
              <Link href="#armada" className="bg-primary hover:bg-primary-hover text-black font-bold px-8 py-3.5 rounded-full transition-colors">
                Pilih Mobil
              </Link>
              <Link href="#kontak" className="bg-white border-2 border-foreground hover:bg-surface text-foreground font-bold px-8 py-3.5 rounded-full transition-colors">
                Hubungi Kami
              </Link>
            </div>
            
            <div className="hero-features flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                Asuransi All-Risk
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">support_agent</span>
                Pusat Bantuan 24/7
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="hero-image relative">
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1000&q=80" 
                alt="Mobil Putih Rental" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Yellow accent blob behind image */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20"></div>
          </div>
          
        </div>

        {/* Search Widget Container */}
        <div id="pesan" className="hero-widget mt-20 md:mt-28 md:-mb-40 relative z-20 scroll-mt-32">
          <div className="bg-white rounded-2xl shadow-xl border border-border p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6">Cari Mobil yang Pas untuk Perjalananmu</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">LOKASI PENGAMBILAN</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">location_on</span>
                  <input type="text" placeholder="Pilih Kota/Bandara" className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">TANGGAL MULAI</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">calendar_month</span>
                  <input type="date" className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-600 text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">TANGGAL SELESAI</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">event_available</span>
                  <input type="date" className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-600 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">LAYANAN</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">directions_car</span>
                  <select className="w-full pl-10 pr-10 py-3 rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-600 appearance-none bg-white text-sm">
                    <option>Lepas Kunci</option>
                    <option>Dengan Sopir</option>
                    <option>Antar-Jemput Bandara</option>
                    <option>Acara Khusus & VIP</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="flex items-end">
                <button className="w-full bg-primary hover:bg-primary-hover text-black font-bold py-3 px-4 rounded-lg transition-colors text-sm">
                  Cari Mobil
                </button>
              </div>
            </div>
            
            <p className="mt-4 text-xs italic text-gray-400">
              *Pemesanan akan dilanjutkan dan dikonfirmasi melalui WhatsApp untuk proses yang lebih personal dan aman.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
