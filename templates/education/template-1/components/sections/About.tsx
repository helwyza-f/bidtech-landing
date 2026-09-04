'use client';

import React, { useEffect, useRef } from 'react';
import { Gamepad2, HeartHandshake, Sparkles, Smartphone, Check, ArrowRight } from 'lucide-react';
import { useModal } from '@/lib/ModalContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const { openRegister } = useModal();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Gamepad2,
      title: 'Metode Bermain Sambil Belajar',
      desc: 'Konsep gamifikasi visual & alat peraga interaktif membuat materi abstrak matematika & bahasa terasa seru seperti bermain game.',
      color: 'bg-brand-orange-light text-brand-orange border-amber-200/60',
      badge: 'Gamified Learning',
    },
    {
      icon: HeartHandshake,
      title: 'Pendidik Berjiwa Pengasuh',
      desc: 'Seluruh pengajar berlatar belakang Pendidikan & Psikologi Anak. Sabar, penuh kasih sayang, dan mengutamakan rasa aman emosional anak.',
      color: 'bg-brand-sky text-brand-blue border-sky-200/60',
      badge: 'Certified Mentors',
    },
    {
      icon: Sparkles,
      title: 'Kurikulum Terpersonalisasi',
      desc: 'Kami memahami setiap anak memiliki gaya belajar berbeda (visual, auditori, kinestetik). Kecepatan materi disesuaikan tanpa paksaan.',
      color: 'bg-emerald-100 text-emerald-600 border-emerald-200/60',
      badge: 'Adaptive Pace',
    },
    {
      icon: Smartphone,
      title: 'Laporan Perkembangan Real-Time',
      desc: 'Orang tua mendapatkan ringkasan harian, dokumentasi foto saat belajar, dan grafik kemajuan kompetensi langsung via Portal Siswa & Notifikasi.',
      color: 'bg-brand-purple-light text-brand-purple border-purple-200/60',
      badge: 'Parent Portal',
    },
  ];

  return (
    <section id="tentang" ref={sectionRef} className="py-20 md:py-28 bg-brand-cream/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange-light text-brand-orange text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            TENTANG SMARTBELAJAR
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight">
            Belajar Menjadi <span className="text-brand-orange">Momen Menyenangkan</span> yang Selalu Dinantikan
          </h2>
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-medium">
            Kami hadir untuk mengubah paradigma bahwa belajar itu membosankan. Melalui pendekatan holistik dan ruang belajar yang hangat, kami membimbing anak mencintai proses belajar seumur hidup.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="about-card p-6 md:p-7 rounded-3xl bg-white border border-slate-100 shadow-soft hover:shadow-float hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${pillar.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-brand-navy mb-2.5 leading-snug">{pillar.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{pillar.desc}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center text-xs font-bold text-brand-orange">
                  <span>Keunggulan Teruji</span>
                  <Check className="w-4 h-4 ml-1 text-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Card */}
        <div className="mt-14 p-8 md:p-10 rounded-4xl bg-gradient-to-r from-brand-blue to-sky-500 text-white shadow-blue-glow flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-black uppercase tracking-wider text-sky-200">
              Uji Coba Tanpa Komitmen
            </div>
            <h3 className="text-2xl md:text-3xl font-black">
              Ingin Merasakan Suasana Kelas SmartBelajar?
            </h3>
            <p className="text-sky-100 text-sm md:text-base max-w-xl font-medium">
              Ajak si kecil mengikuti 1 sesi Free Trial Class. Konsultan edukasi kami akan memberikan asesmen minat dan gaya belajar anak secara gratis.
            </p>
          </div>

          <button
            onClick={() => openRegister()}
            className="flex-shrink-0 px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-black text-sm rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Daftar Free Trial
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
