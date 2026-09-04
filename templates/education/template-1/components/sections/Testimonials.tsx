'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header masked word slide-up reveal
      gsap.fromTo(
        '.testi-title-word',
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 2. Squiggly underline draw-in right as words finish
      const squigglyPath = sectionRef.current?.querySelector('#testi-squiggly path') as SVGPathElement | null;
      if (squigglyPath) {
        const length = squigglyPath.getTotalLength() || 110;
        gsap.fromTo(
          squigglyPath,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            delay: 0.22,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Entrance reveal for testimonial cards with staggered spring
      gsap.fromTo(
        '.testi-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'back.out(1.2)',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      quote:
        'Anak saya jadi lebih percaya diri dan mandiri dalam belajar. SmartBelajar benar-benar membantu kami sebagai orang tua.',
      name: '— Ibu Rina',
      role: 'Orang tua siswa',
      image: '/images/testi_rina.webp',
      borderColor: 'border-[#BAE6FD]',
      quoteColor: 'text-[#0284C7]',
      topSticker: '/images/testi_star.webp',
      topStickerClass: '-top-6 right-8 w-14 h-14',
      bottomSticker: '/images/testi_book.webp',
      bottomStickerClass: 'bottom-4 right-5 w-20 h-20 sm:w-22 sm:h-22',
    },
    {
      quote:
        'Perkembangan anak saya dalam berhitung dan membaca sangat terlihat. Terima kasih SmartBelajar!',
      name: '— Bapak Andi',
      role: 'Orang tua siswa',
      image: '/images/testi_andi.webp',
      borderColor: 'border-[#BBF7D0]',
      quoteColor: 'text-[#16A34A]',
      topSticker: '/images/testi_boy.webp',
      topStickerClass: '-top-8 right-8 w-16 h-18 sm:w-18 sm:h-20',
      bottomSticker: '/images/testi_blocks.webp',
      bottomStickerClass: 'bottom-4 right-5 w-16 h-18 sm:w-18 sm:h-20',
    },
    {
      quote:
        'Metode SmartBelajar terstruktur dan mudah dipahami anak. Hasilnya luar biasa!',
      name: '— Ibu Dewi',
      role: 'Orang tua siswa',
      image: '/images/testi_dewi.webp',
      borderColor: 'border-[#DDD6FE]',
      quoteColor: 'text-[#9333EA]',
      topSticker: '/images/testi_girl.webp',
      topStickerClass: '-top-8 right-8 w-16 h-18 sm:w-18 sm:h-20',
      bottomSticker: '/images/testi_trophy.webp',
      bottomStickerClass: 'bottom-4 right-5 w-16 h-20 sm:w-18 sm:h-22',
    },
  ];

  return (
    <section id="testimoni" ref={sectionRef} className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Decorative Doodles */}
      <div className="absolute top-8 left-8 text-sky-400/80 pointer-events-none">
        <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <path d="M20,60 Q30,20 60,30 T70,70" />
        </svg>
      </div>
      <div className="absolute top-12 right-20 text-sky-300 pointer-events-none text-2xl font-black">★</div>
      <div className="absolute bottom-6 left-12 text-sky-300 pointer-events-none text-xl font-black">★</div>
      <div
        className="absolute bottom-4 right-6 w-32 h-32 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0284C7 1.5px, transparent 1.5px)',
          backgroundSize: '10px 10px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title + Squiggly Line */}
        <div className="testi-header text-center max-w-md mx-auto mb-14 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-brand-navy mb-2 flex flex-wrap justify-center gap-x-2">
            {["Apa", "kata", "orang", "tua?"].map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden pb-1">
                <span className="testi-title-word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <svg
            id="testi-squiggly"
            className="mx-auto w-24 h-3 text-brand-orange"
            viewBox="0 0 100 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M2,6 Q12,1 22,6 T42,6 T62,6 T82,6 T98,6" />
          </svg>
        </div>

        {/* 3 Testimonial Cards Grid with Custom Mockup Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-7 lg:gap-8 pt-4 pb-4">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`testi-card group relative bg-white rounded-[2rem] p-7 sm:p-8 border-[2.5px] ${r.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-visible min-h-[310px]`}
            >
              {/* Top Right Peaking Mascot / Sticker */}
              <div className={`absolute ${r.topStickerClass} pointer-events-none z-20 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105`}>
                <Image
                  src={r.topSticker}
                  alt="Mascot"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain select-none drop-shadow-sm"
                />
              </div>

              {/* Top Quote Icon & Quote Text */}
              <div>
                {/* Double Quotation Icon */}
                <svg
                  className={`w-9 h-9 ${r.quoteColor} fill-current mb-4 select-none`}
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-sm sm:text-[15px] text-[#334155] leading-relaxed font-medium pr-4">
                  {r.quote}
                </p>
              </div>

              {/* Card Footer: Author Info & Bottom-Right Sticker */}
              <div className="flex items-end justify-between pt-8 mt-4 relative z-10">
                <div className="flex items-center gap-3">
                  <Image
                    src={r.image}
                    alt={r.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-black text-brand-navy leading-tight">
                      {r.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {r.role}
                    </p>
                  </div>
                </div>

                {/* Bottom-Right Sticker */}
                <div className={`absolute ${r.bottomStickerClass} pointer-events-none z-10 transition-transform duration-300 group-hover:scale-110`}>
                  <Image
                    src={r.bottomSticker}
                    alt="Illustration"
                    width={90}
                    height={90}
                    className="w-full h-full object-contain select-none drop-shadow-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
