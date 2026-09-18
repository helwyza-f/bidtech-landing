"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS_DATA = [
  {
    quote: "Kesiapan unit CAT 797F dan excavator 30T dari Jaya Wijaya Group sangat luar biasa. Downtime tercatat di bawah 0.5% selama 8 bulan berturut-turut pada proyek tambang kami di Kutai.",
    author: "Ir. Doni Kusuma",
    role: "Project Director, PT Borneo Coal Mining",
    rating: 5,
    project: "Overburden Removal 4.5M BCM",
  },
  {
    quote: "Mobilisasi crane all-terrain 250 ton untuk ereksi balok girder tol sangat presisi dan tepat jadwal. Seluruh dokumen SILO dan SIO operator lengkap tanpa kendala saat audit.",
    author: "Hendrik Prasetyo, S.T.",
    role: "Site Operations Manager, Konsorsium Tol Trans Jawa",
    rating: 5,
    project: "Pemasangan 96 Balok Girder",
  },
  {
    quote: "Jaya Wijaya Group membuktikan standar keselamatan tinggi. Tim mekanik residen on-site standby 24 jam dengan fast-response yang menjaga jadwal konstruksi kami tetap on-track.",
    author: "Farhan Mahendra",
    role: "VP Engineering & EPC, PT Mega Infrastruktur Utama",
    rating: 5,
    project: "Pembangunan Smelter Alumina",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".testimonial-header-anim", 
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

    gsap.fromTo(".testimonial-card-anim", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="testimonial-header-anim text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-xs font-bold uppercase tracking-wider text-orange-600 mb-3">
            <span className="material-symbols-outlined text-[16px]">rate_review</span>
            <span>KEPUASAN KONTRAKTOR & MITRA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-950 font-heading">
            Kepercayaan Dari <span className="text-orange-600">Pelaku Industri</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Pengalaman nyata kontraktor BUMN dan swasta terkemuka yang telah bermitra dengan armada Jaya Wijaya Group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="testimonial-card-anim bg-slate-50 border border-slate-200/80 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg fill-current">
                      star
                    </span>
                  ))}
                </div>

                <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-black font-heading text-slate-900 uppercase">
                  {item.author}
                </h4>
                <p className="text-xs text-orange-600 font-bold mb-1">
                  {item.role}
                </p>
                <span className="inline-block text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {item.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
