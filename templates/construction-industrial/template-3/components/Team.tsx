"use client";

import React, { useRef } from 'react';
import { COMPANY_INFO } from '@/lib/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Team() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".team-header-anim", 
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

    gsap.fromTo(".team-card-anim", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );
  }, { scope: containerRef });

  return (
    <section id="tim" ref={containerRef} className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="team-header-anim text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs font-bold uppercase tracking-wider text-orange-600 mb-3">
            <span className="material-symbols-outlined text-[16px]">engineering</span>
            <span>TIM AHLI TERSERTIFIKASI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-950 font-heading">
            Dikelola oleh <span className="text-orange-600">Profesional Berlisensi</span>
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div 
            className="team-card-anim bg-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                BS
              </div>
              <span className="inline-flex px-3 py-1.5 rounded-full bg-slate-200/50 text-slate-700 text-[11px] font-bold">
                18+ Thn Pengalaman
              </span>
            </div>
            
            <div className="mb-6 flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Ir. Bambang Sujatmo</h3>
              <p className="text-[11px] font-bold text-orange-700 uppercase tracking-wide leading-relaxed">
                KEPALA OPERASIONAL ALAT BERAT
              </p>
            </div>
            
            <div className="border-t border-slate-200/60 pt-5 mb-5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-3">
                VERIFIKASI LISENSI:
              </span>
              <div className="flex flex-col gap-2">
                <span className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-600">
                  SIO Kelas 1 Kemenaker
                </span>
                <span className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-600">
                  IPM PII Teknik Mesin
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold pt-4 border-t border-slate-200/60">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Kredensial Terverifikasi</span>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            className="team-card-anim bg-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                HK
              </div>
              <span className="inline-flex px-3 py-1.5 rounded-full bg-slate-200/50 text-slate-700 text-[11px] font-bold">
                12+ Thn Pengalaman
              </span>
            </div>
            
            <div className="mb-6 flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Hendra Kurniawan</h3>
              <p className="text-[11px] font-bold text-orange-700 uppercase tracking-wide leading-relaxed">
                MASTER OPERATOR CRANE BERAT
              </p>
            </div>
            
            <div className="border-t border-slate-200/60 pt-5 mb-5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-3">
                VERIFIKASI LISENSI:
              </span>
              <div className="flex flex-col gap-2">
                <span className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-600">
                  SIO Kelas 1 Mobile Crane
                </span>
                <span className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-600">
                  Rigger Level 3 Depnaker
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold pt-4 border-t border-slate-200/60">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Kredensial Terverifikasi</span>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            className="team-card-anim bg-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                SR
              </div>
              <span className="inline-flex px-3 py-1.5 rounded-full bg-slate-200/50 text-slate-700 text-[11px] font-bold">
                14+ Thn Pengalaman
              </span>
            </div>
            
            <div className="mb-6 flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Siti Rahmawati, S.T.</h3>
              <p className="text-[11px] font-bold text-orange-700 uppercase tracking-wide leading-relaxed">
                MANAJER K3 & KEPALA HSE
              </p>
            </div>
            
            <div className="border-t border-slate-200/60 pt-5 mb-5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-3">
                VERIFIKASI LISENSI:
              </span>
              <div className="flex flex-col gap-2">
                <span className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-600">
                  Lead Auditor ISO 45001
                </span>
                <span className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-600">
                  Ahli K3 Konstruksi Utama
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold pt-4 border-t border-slate-200/60">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Kredensial Terverifikasi</span>
            </div>
          </div>

          {/* Card 4 */}
          <div 
            className="team-card-anim bg-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                AP
              </div>
              <span className="inline-flex px-3 py-1.5 rounded-full bg-slate-200/50 text-slate-700 text-[11px] font-bold">
                16+ Thn Pengalaman
              </span>
            </div>
            
            <div className="mb-6 flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Agus Pratama</h3>
              <p className="text-[11px] font-bold text-orange-700 uppercase tracking-wide leading-relaxed">
                KEPALA MEKANIK ALAT BERAT
              </p>
            </div>
            
            <div className="border-t border-slate-200/60 pt-5 mb-5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-3">
                VERIFIKASI LISENSI:
              </span>
              <div className="flex flex-col gap-2">
                <span className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-600">
                  Spesialis Hidrolik Utama
                </span>
                <span className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-600">
                  Diagnostik Mesin Level 4
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold pt-4 border-t border-slate-200/60">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Kredensial Terverifikasi</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
