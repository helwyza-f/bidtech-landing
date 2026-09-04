'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrustStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: '/images/smartbelajar_crops_png/10_icon_globe.webp',
      target: 60,
      suffix: '+',
      isThousand: false,
      label: 'Negara',
      fallback: '60+',
    },
    {
      icon: '/images/smartbelajar_crops_png/11_icon_students.webp',
      target: 4,
      suffix: ' Juta+',
      isThousand: false,
      label: 'Siswa',
      fallback: '4 Juta+',
    },
    {
      icon: '/images/smartbelajar_crops_png/12_icon_book.webp',
      target: 63,
      suffix: ' Tahun+',
      isThousand: false,
      label: 'Pengalaman',
      fallback: '63 Tahun+',
    },
    {
      icon: '/images/smartbelajar_crops_png/13_icon_school.webp',
      target: 25000,
      suffix: '+',
      isThousand: true,
      label: 'Pusat SmartBelajar',
      fallback: '25.000+',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading masked word slide-up reveal
      gsap.fromTo(
        '.stat-title-word',
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 2. Metric items entrance & Icon pop bounce (starts as words conclude)
      gsap.fromTo(
        '.stat-item',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.15,
          stagger: 0.1,
          ease: 'back.out(1.3)',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );

      gsap.fromTo(
        '.stat-icon-wrap',
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          delay: 0.15,
          stagger: 0.1,
          ease: 'back.out(1.6)',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 3. CountUp Animation for numbers
      const numElements = containerRef.current?.querySelectorAll<HTMLElement>('.stat-number');
      numElements?.forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const isThousand = el.dataset.thousand === 'true';
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => {
            if (isThousand) {
              el.innerText = Math.floor(proxy.val).toLocaleString('id-ID') + suffix;
            } else {
              el.innerText = Math.floor(proxy.val) + suffix;
            }
          },
        });
      });

      // 4. Triangle doodle idle float
      gsap.to('#truststats-triangle', {
        rotation: 4,
        y: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-16 sm:pt-20 md:pt-28 pb-24 bg-[#F0F9FF] overflow-visible"
    >
      {/* Gelombang Pembatas Halus: Diturunkan sedikit agar area bawah hero lebih lega */}
      <div className="w-full overflow-hidden leading-none absolute -top-6 sm:-top-10 md:-top-14 xl:-top-16 left-0 right-0 pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 md:h-24 text-[#F0F9FF] fill-current"
        >
          <path d="M0,80 C160,45 340,55 520,95 C720,140 920,10 1160,0 C1300,0 1390,8 1440,16 L1440,140 L0,140 Z" />
        </svg>
      </div>

      {/* Dotted Grid Watermark Kanan Bawah */}
      <div
        className="absolute top-10 right-6 w-36 h-36 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0284C7 1.5px, transparent 1.5px)',
          backgroundSize: '12px 12px',
        }}
      />

      {/* Segitiga Doodle Kiri Bawah */}
      <div id="truststats-triangle" className="absolute bottom-6 left-8 text-brand-yellow/80 pointer-events-none hidden sm:block">
        <svg
          className="w-14 h-14 -rotate-12"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        >
          <polygon points="10,90 90,90 50,15" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Heading with Masked Words */}
        <div className="mb-12 pt-4 md:pt-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-navy tracking-tight flex flex-wrap justify-center gap-x-2 sm:gap-x-2.5 gap-y-1">
            {["Dipercaya", "oleh", "jutaan", "orang", "tua", "di", "seluruh", "dunia"].map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden pb-1">
                <span className="stat-title-word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* 4 Kolom Metrik Bersih */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-item flex flex-col items-center text-center p-2 group cursor-default"
            >
              <div className="stat-icon-wrap w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <Image
                  src={s.icon}
                  alt={s.label}
                  width={80}
                  height={80}
                  style={{ width: 'auto', height: 'auto' }}
                  className="max-h-16 w-auto object-contain drop-shadow-sm"
                />
              </div>

              <div
                className="stat-number text-3xl sm:text-4xl font-black text-brand-navy tracking-tight"
                data-target={s.target}
                data-suffix={s.suffix}
                data-thousand={s.isThousand}
              >
                {s.fallback}
              </div>

              <div className="text-xs sm:text-sm font-bold text-brand-muted mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
