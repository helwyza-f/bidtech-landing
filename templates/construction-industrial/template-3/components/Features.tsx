"use client";

import React, { useRef } from 'react';
import { FEATURES_DATA } from '@/lib/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".features-header-anim", 
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

    gsap.fromTo(".feature-card", 
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
    <section id="keunggulan" ref={containerRef} className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="features-header-anim text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs font-bold uppercase tracking-wider text-orange-600 mb-3">
            <span className="material-symbols-outlined text-[16px]">shield</span>
            <span>STANDAR KESELAMATAN & MUTU</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-950 font-heading">
            Mengapa Memilih <span className="text-orange-600">Jaya Wijaya Group?</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Komitmen tanpa kompromi pada keselamatan kerja, kesiapan unit alat berat, dan kepatuhan regulasi konstruksi nasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES_DATA.map((feat, idx) => (
            <div
              key={idx}
              className="feature-card bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">{feat.icon}</span>
                </div>
                <h3 className="text-lg font-black font-heading uppercase text-slate-900 tracking-tight mb-3 group-hover:text-orange-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
                <span>Pelajari Standar</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
