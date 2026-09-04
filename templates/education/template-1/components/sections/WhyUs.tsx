'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { User, BarChart2, PieChart, ClipboardList } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header masked word slide-up reveal
      gsap.fromTo(
        '.whyus-title-word',
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 2. Squiggly underline draw-in right as "SmartBelajar?" lands
      const squigglyPath = sectionRef.current?.querySelector('#whyus-squiggly path') as SVGPathElement | null;
      if (squigglyPath) {
        const length = squigglyPath.getTotalLength() || 110;
        gsap.fromTo(
          squigglyPath,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 0.85,
            delay: 0.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Image entrance from left with subtle scale
      gsap.fromTo(
        '.whyus-image-wrap',
        { x: -35, scale: 0.94, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: 'back.out(1.2)',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );

      // 4. Benefit items entrance reveal (stagger from right)
      gsap.fromTo(
        '.benefit-item',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );

      // 4. Floating star particles — continuous GSAP loop
      gsap.to('.whyus-star-float', {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.4, from: 'random' },
      });

      gsap.to('.whyus-star-twinkle', {
        scale: 1.4,
        opacity: 1,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.35, from: 'random' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: User,
      title: 'Belajar Mandiri',
      desc: 'SmartBelajar membangun kebiasaan belajar mandiri yang akan bermanfaat sepanjang hidup.',
      iconColor: 'text-brand-blue border-sky-100',
      starColor: 'text-sky-400',
    },
    {
      icon: BarChart2,
      title: 'Kemajuan Pasti',
      desc: 'Materi yang terstruktur dan latihan harian membantu anak mencapai kemajuan secara konsisten.',
      iconColor: 'text-amber-500 border-amber-100',
      starColor: 'text-amber-400',
    },
    {
      icon: PieChart,
      title: 'Kemampuan Maksimal',
      desc: 'Membantu anak mencapai kemampuan lebih tinggi dari yang mereka kira.',
      iconColor: 'text-pink-500 border-pink-100',
      starColor: 'text-pink-400',
    },
    {
      icon: ClipboardList,
      title: 'Konsentrasi & Disiplin',
      desc: 'Membentuk fokus dan disiplin yang bermanfaat di segala aspek kehidupan.',
      iconColor: 'text-indigo-500 border-indigo-100',
      starColor: 'text-indigo-400',
    },
  ];

  return (
    <section id="manfaat" ref={sectionRef} className="py-20 bg-white scroll-mt-12">
      <div id="tentang" className="-mt-16 pt-16" />
      <div id="keunggulan" className="-mt-16 pt-16" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Enlarged Cream Card */}
        <div className="bg-brand-cream rounded-4xl p-10 sm:p-16 lg:p-20 relative overflow-hidden border border-amber-100/50 shadow-soft">

          {/* === Scattered Background Star Particles === */}
          <span className="whyus-star-twinkle absolute top-8 left-16 text-amber-400 text-3xl pointer-events-none select-none opacity-60">✦</span>
          <span className="whyus-star-float absolute top-20 left-6 text-sky-400 text-xl pointer-events-none select-none opacity-50">★</span>
          <span className="whyus-star-twinkle absolute top-6 left-1/3 text-pink-300 text-2xl pointer-events-none select-none opacity-40">✦</span>
          <span className="whyus-star-float absolute top-10 right-24 text-emerald-400 text-2xl pointer-events-none select-none opacity-55">★</span>
          <span className="whyus-star-twinkle absolute top-28 right-1/3 text-purple-300 text-lg pointer-events-none select-none opacity-45">✦</span>
          <span className="whyus-star-float absolute bottom-10 left-1/4 text-orange-400 text-2xl pointer-events-none select-none opacity-50">★</span>
          <span className="whyus-star-twinkle absolute bottom-8 right-1/4 text-sky-300 text-xl pointer-events-none select-none opacity-45">✦</span>
          <span className="whyus-star-float absolute bottom-16 right-10 text-rose-300 text-lg pointer-events-none select-none opacity-40">★</span>
          <span className="whyus-star-twinkle absolute bottom-6 left-10 text-yellow-400 text-base pointer-events-none select-none opacity-35">✦</span>

          {/* Dotted Pattern Top Left */}
          <div
            className="absolute top-8 left-10 w-28 h-28 opacity-25 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#F59E0B 2px, transparent 2px)',
              backgroundSize: '10px 10px',
            }}
          />

          {/* Spiral Doodle Top Right */}
          <div className="absolute top-6 right-10 pointer-events-none text-brand-yellow/70">
            <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
              <path d="M30,30 C60,10 80,40 50,70 C30,90 70,90 85,75" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

            {/* Left Column: Enlarged Photo */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="whyus-image-wrap relative w-full max-w-lg flex items-center justify-center">
                {/* Decorative blobs */}
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-sky-200/70 blob-why-blue -z-10" />
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-yellow/60 blob-why-orange -z-10" />

                {/* Star particles around image */}
                <span className="whyus-star-twinkle absolute -top-5 -right-3 text-amber-400 text-3xl pointer-events-none select-none z-10">✦</span>
                <span className="whyus-star-float absolute -bottom-4 -left-5 text-sky-400 text-2xl pointer-events-none select-none z-10">★</span>
                <span className="whyus-star-twinkle absolute top-1/2 -left-7 text-pink-400 text-base pointer-events-none select-none z-10 opacity-80">✦</span>
                <span className="whyus-star-float absolute top-1/3 -right-6 text-emerald-400 text-xl pointer-events-none select-none z-10 opacity-75">★</span>
                <span className="whyus-star-twinkle absolute -top-2 left-1/3 text-purple-400 text-sm pointer-events-none select-none z-10 opacity-70">✦</span>
                <span className="whyus-star-float absolute bottom-1/4 -right-4 text-rose-400 text-xs pointer-events-none select-none z-10 opacity-65">★</span>

                <Image
                  src="/images/smarth.webp"
                  alt="Guru SmartBelajar membimbing anak belajar menulis"
                  width={520}
                  height={460}
                  style={{ width: '100%', height: 'auto' }}
                  className="w-full h-auto object-contain drop-shadow-xl select-none"
                />
              </div>
            </div>

            {/* Right Column: Benefit Points */}
            <div className="lg:col-span-6 space-y-7">
              <div className="whyus-header">
                <h2 className="text-3xl sm:text-4xl font-black text-brand-navy leading-tight">
                  <span className="block overflow-hidden pb-1">
                    <span className="whyus-title-word inline-block will-change-transform">
                      Mengapa
                    </span>
                  </span>
                  <span className="flex flex-wrap gap-x-2.5 overflow-hidden pb-1">
                    {["Memilih", "SmartBelajar?"].map((word, idx) => (
                      <span key={idx} className="inline-block overflow-hidden">
                        <span className="whyus-title-word inline-block will-change-transform">
                          {word}
                        </span>
                      </span>
                    ))}
                  </span>
                </h2>
                <svg
                  id="whyus-squiggly"
                  className="w-28 h-3.5 text-brand-orange mt-2.5"
                  viewBox="0 0 100 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M2,6 Q12,1 22,6 T42,6 T62,6 T82,6 T98,6" />
                </svg>
              </div>

              <div className="space-y-5">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="benefit-item flex items-start gap-5 relative">
                      {/* Tiny per-benefit star particle */}
                      <span className={`whyus-star-twinkle absolute -top-1 -left-1 text-xs pointer-events-none select-none opacity-60 ${b.starColor}`}>✦</span>
                      <div
                        className={`min-w-[3.25rem] w-13 h-13 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border-2 ${b.iconColor}`}
                        style={{ width: '3.25rem', height: '3.25rem' }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="pt-0.5">
                        <h3 className="text-base font-black text-brand-navy">{b.title}</h3>
                        <p className="text-sm text-brand-muted leading-relaxed mt-0.5 font-medium">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
