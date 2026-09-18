"use client";

import React, { useState, useRef } from 'react';
import { COMPANY_INFO } from '@/lib/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    equipment: 'cat-797',
    location: '',
    duration: '1-bulan',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useGSAP(() => {
    gsap.fromTo(".cta-left-anim", 
      { x: -40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );

    gsap.fromTo(".cta-right-anim", 
      { x: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="quote"
      ref={containerRef}
      className="py-24 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Background Decorative Rings */}
      <div className="absolute -top-36 -right-36 w-96 h-96 rounded-full border border-slate-800/80 pointer-events-none" />
      <div className="absolute -bottom-36 -left-36 w-96 h-96 rounded-full border border-slate-800/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Prop */}
          <div 
            className="cta-left-anim lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-xs font-bold uppercase tracking-wider text-orange-400 mb-6">
              <span className="material-symbols-outlined text-[16px]">request_quote</span>
              <span>KONSULTASI & ESTIMASI TENDER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading leading-tight mb-6">
              Siap Memulai Proyek <br />
              <span className="text-orange-500">Infrastruktur Anda?</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Dapatkan proposal tarif sewa kompetitif, verifikasi kesiapan armada real-time, dan kalkulasi logistik alat berat ke lokasi proyek Anda dalam waktu kurang dari 2 jam kerja.
            </p>

            <div className="space-y-4 border-t border-slate-800 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-orange-500">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-medium">Hotline Tender & Sewa Cepat</span>
                  <span className="text-base font-extrabold text-white">{COMPANY_INFO.hotline} / {COMPANY_INFO.callCenter}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-500">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-medium">WhatsApp Dispatcher</span>
                  <span className="text-base font-extrabold text-white">{COMPANY_INFO.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-orange-400">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-medium">Email Penawaran Resmi</span>
                  <span className="text-base font-extrabold text-white">{COMPANY_INFO.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form */}
          <div 
            className="cta-right-anim lg:col-span-6"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl">check</span>
                  </div>
                  <h3 className="text-2xl font-black font-heading uppercase text-white mb-2">
                    Permintaan Diterima!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto mb-6">
                    Tim tender dan armada kami akan segera menghubungi Anda melalui nomor telepon / WhatsApp yang dicantumkan.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  >
                    Kirim Permintaan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-800 pb-3 mb-4">
                    <h3 className="text-lg font-black font-heading uppercase text-white">
                      Formulir Permintaan Penawaran Cepat
                    </h3>
                    <p className="text-xs text-slate-400">
                      Isi data kebutuhan alat berat Anda di bawah ini
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Nama Lengkap / PIC *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Ir. Hendarto"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Nama Perusahaan / Kontraktor *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="PT / CV / BUMN"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Pilihan Unit Armada Utama *
                      </label>
                      <select
                        value={formData.equipment}
                        onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      >
                        <option value="cat-797">Truk Tambang CAT 797F (400 Ton)</option>
                        <option value="excavator-pc300">Excavator Crawler 30T (Komatsu PC300)</option>
                        <option value="crane-ltm">Mobile Crane All-Terrain 150T - 300T</option>
                        <option value="dozer-d8t">Bulldozer Heavy Duty CAT D8T</option>
                        <option value="kombinasi-fleet">Paket Kombinasi Armada Fleet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Estimasi Durasi Kontrak
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      >
                        <option value="harian">Harian (1 - 7 Hari)</option>
                        <option value="1-bulan">1 Bulan Operasi</option>
                        <option value="3-bulan">3 Bulan (Kuartal)</option>
                        <option value="6-bulan">6 Bulan - 1 Tahun</option>
                        <option value="multi-year">Kontrak Jangka Panjang (Multi-Year)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Lokasi Proyek / Mobilisasi *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Contoh: Balikpapan / Morowali"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Nomor HP / WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0812-xxxx-xxxx"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-4 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-orange-600/30 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Dapatkan Estimasi Penawaran Resmi</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
