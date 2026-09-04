'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useModal } from '@/lib/ModalContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StarParticle {
  symbol: string;
  className: string;
}

interface ProgramItem {
  title: string;
  subTitle?: string;
  titleColor: string;
  desc: string;
  image: string;
  flipImage: string;
  imagePosition: string;
  cardShapeClass: string;
  blobClass: string;
  flipBorder: string;
  linkColor: string;
  flipBg: string;
  stars: StarParticle[];
}

export default function Programs() {
  const { openRegister } = useModal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header masked word slide-up reveal
      gsap.fromTo(
        '.programs-title-word',
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 2. Squiggly underline draw-in right as "Kami" arrives
      const squigglyPath = sectionRef.current?.querySelector('#programs-squiggly path') as SVGPathElement | null;
      if (squigglyPath) {
        const length = squigglyPath.getTotalLength() || 110;
        gsap.fromTo(
          squigglyPath,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Program cards entrance with staggered spring
      gsap.fromTo(
        '.program-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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

      // 4. Yellow doodle breathing
      gsap.to('#programs-doodle', {
        rotation: 4,
        scale: 1.06,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle interactive 3D card tilt
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      transformPerspective: 800,
      ease: 'power1.out',
      duration: 0.3,
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  const programs: ProgramItem[] = [
    {
      title: 'Matematika',
      titleColor: 'text-brand-blue',
      desc: 'Mengembangkan kemampuan berhitung, pemecahan masalah, dan logika dengan materi yang terstruktur dan bertahap.',
      image: '/images/matematika.webp',
      flipImage: '/images/flip_matematika.webp',
      imagePosition: 'object-top',
      cardShapeClass: 'card-blob-math',
      blobClass: 'w-48 h-48 sm:w-52 sm:h-52 -left-3.5 sm:-left-4.5 top-6 sm:top-7 bg-sky-300/85 blob-halo-math',
      flipBorder: 'border-4 border-sky-400',
      linkColor: 'text-brand-blue',
      flipBg: 'bg-white',
      stars: [
        { symbol: '✦', className: 'text-amber-400 -top-3 -right-2 text-2xl sm:text-3xl animate-star-twinkle' },
        { symbol: '★', className: 'text-sky-400 -bottom-2 -left-3 text-base sm:text-xl animate-star-float' },
        { symbol: '✦', className: 'text-rose-400 top-1/2 -left-4 text-xs sm:text-sm animate-star-twinkle [animation-delay:1.2s]' },
      ],
    },
    {
      title: 'Bahasa Indonesia',
      titleColor: 'text-brand-orange',
      desc: 'Meningkatkan kemampuan membaca, menulis, dan pemahaman bahasa Indonesia dengan latihan yang konsisten.',
      image: '/images/bahasa.webp',
      flipImage: '/images/flip_bahasa.webp',
      imagePosition: 'object-[center_20%]',
      cardShapeClass: 'card-blob-bahasa',
      blobClass: 'w-48 h-48 sm:w-52 sm:h-52 -right-3.5 sm:-right-4.5 top-6 sm:top-7 bg-orange-300/85 blob-halo-bahasa',
      flipBorder: 'border-4 border-brand-orange',
      linkColor: 'text-brand-orange',
      flipBg: 'bg-white',
      stars: [
        { symbol: '★', className: 'text-amber-400 -top-3 -left-2 text-2xl sm:text-3xl animate-star-float' },
        { symbol: '✦', className: 'text-orange-500 -bottom-2 -right-3 text-base sm:text-xl animate-star-twinkle' },
        { symbol: '★', className: 'text-yellow-400 top-1/3 -right-4 text-xs sm:text-sm animate-star-float [animation-delay:0.8s]' },
      ],
    },
    {
      title: 'English as a Foreign Language',
      titleColor: 'text-emerald-600',
      desc: 'Mengembangkan kemampuan berbahasa Inggris melalui pendekatan bertahap yang menyenangkan.',
      image: '/images/inggris.webp',
      flipImage: '/images/flip_inggris.webp',
      imagePosition: 'object-[55%_35%]',
      cardShapeClass: 'card-blob-english',
      blobClass: 'w-48 h-48 sm:w-52 sm:h-52 -left-3.5 sm:-left-4.5 bottom-6 sm:bottom-7 bg-emerald-300/85 blob-halo-english',
      flipBorder: 'border-4 border-emerald-400',
      linkColor: 'text-emerald-600',
      flipBg: 'bg-white',
      stars: [
        { symbol: '✦', className: 'text-emerald-400 -top-3 -right-2 text-2xl sm:text-3xl animate-star-twinkle' },
        { symbol: '★', className: 'text-amber-400 -bottom-2 -left-3 text-base sm:text-xl animate-star-float' },
        { symbol: '✦', className: 'text-sky-400 top-2/3 -left-4 text-xs sm:text-sm animate-star-twinkle [animation-delay:1.5s]' },
      ],
    },
    {
      title: 'Keterampilan Memegang Pensil',
      titleColor: 'text-purple-600',
      desc: 'Melatih kekuatan jari, koordinasi motorik halus, dan postur genggaman pensil yang benar untuk kenyamanan menulis sejak dini.',
      image: '/images/menulis.webp',
      flipImage: '/images/flip_menulis.webp',
      imagePosition: 'object-center',
      cardShapeClass: 'card-blob-menulis',
      blobClass: 'w-48 h-48 sm:w-52 sm:h-52 -right-3.5 sm:-right-4.5 bottom-6 sm:bottom-7 bg-purple-300/85 blob-halo-menulis',
      flipBorder: 'border-4 border-purple-400',
      linkColor: 'text-purple-600',
      flipBg: 'bg-white',
      stars: [
        { symbol: '✦', className: 'text-purple-400 -top-3 -left-2 text-2xl sm:text-3xl animate-star-twinkle' },
        { symbol: '★', className: 'text-amber-400 -bottom-2 -right-3 text-base sm:text-xl animate-star-float' },
        { symbol: '★', className: 'text-pink-400 top-1/4 -right-4 text-xs sm:text-sm animate-star-float [animation-delay:0.6s]' },
      ],
    },
  ];

  return (
    <section id="program" ref={sectionRef} className="py-14 sm:py-20 bg-white relative overflow-hidden">
      {/* Floating Animated Star Particles across Section */}
      <div className="absolute top-10 left-8 text-brand-yellow text-2xl sm:text-3xl pointer-events-none animate-star-twinkle">★</div>
      <div className="absolute top-24 left-1/4 text-amber-300 text-lg sm:text-xl pointer-events-none animate-star-float [animation-delay:0.5s]">✦</div>
      <div className="absolute top-16 right-1/3 text-sky-300 text-xl sm:text-2xl pointer-events-none animate-star-twinkle [animation-delay:1s]">★</div>
      <div className="absolute top-28 right-16 text-pink-300 text-lg sm:text-xl pointer-events-none animate-star-float [animation-delay:1.5s]">✦</div>
      <div className="absolute bottom-12 left-12 text-purple-300 text-xl sm:text-2xl pointer-events-none animate-star-twinkle [animation-delay:0.8s]">✦</div>
      <div className="absolute bottom-16 right-12 text-emerald-300 text-xl sm:text-2xl pointer-events-none animate-star-float [animation-delay:1.2s]">★</div>
      <div className="absolute top-12 right-10 pointer-events-none text-brand-yellow/80 hidden md:block">
        <svg id="programs-doodle" className="w-14 h-14 -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <path d="M20,60 Q30,20 60,30 T70,70" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title + Squiggly Underline */}
        <div className="programs-header text-center max-w-md mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black text-brand-navy mb-2 flex justify-center gap-x-2.5">
            {["Program", "Kami"].map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden pb-1">
                <span className="programs-title-word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <svg
            id="programs-squiggly"
            className="mx-auto w-20 sm:w-24 h-3 text-sky-400"
            viewBox="0 0 100 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          >
            <path d="M2,6 Q12,1 22,6 T42,6 T62,6 T82,6 T98,6" />
          </svg>
        </div>

        {/* Grid 4 Program Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8 lg:gap-8">
          {programs.map((p, idx) => (
            <div
              key={p.title}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="program-item flex flex-col items-center text-center sm:items-start sm:text-left group transition-all duration-300 bg-brand-cream/35 sm:bg-transparent p-5 sm:p-2 rounded-3xl border border-amber-100/60 sm:border-transparent hover:shadow-lg sm:hover:shadow-none"
            >
              
              {/* Enlarged Image & Abstract Blob Container with Floating Star Particles */}
              <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 mb-6 flex items-center justify-center">
                {/* Playful Star Particles Around Card */}
                {p.stars.map((star, sIdx) => (
                  <span
                    key={sIdx}
                    className={`absolute pointer-events-none select-none z-20 transition-transform duration-300 group-hover:scale-125 ${star.className}`}
                  >
                    {star.symbol}
                  </span>
                ))}

                {/* Subtle Accent Blob Tucked Behind Card (Kecil terselip di kiri atau kanan) */}
                <div
                  className={`absolute ${p.blobClass} -z-0 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500 pointer-events-none`}
                />

                {/* 3D Flip Card Frame with Custom Abstract Shape */}
                <div
                  onClick={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
                  className={`relative z-10 w-full h-full flip-card cursor-pointer ${p.cardShapeClass} ${
                    flippedIndex === idx ? 'is-flipped' : ''
                  }`}
                >
                  <div className="w-full h-full relative flip-card-inner">
                    {/* Sisi Depan (Front Photo - Clean tanpa border) */}
                    <div
                      className={`flip-card-front shadow-xl bg-slate-100 ${p.cardShapeClass}`}
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        width={320}
                        height={320}
                        unoptimized
                        style={{ width: '100%', height: '100%' }}
                        className={`w-full h-full object-cover ${p.imagePosition} select-none`}
                      />
                    </div>

                    {/* Sisi Belakang (Back - Putih Bersih dengan Border Sesuai Element) */}
                    <div
                      className={`flip-card-back ${p.flipBorder} shadow-xl ${p.flipBg} flex items-center justify-center p-3 sm:p-4 ${p.cardShapeClass}`}
                    >
                      <Image
                        src={p.flipImage}
                        alt={`Simbol ${p.title} SmartBelajar`}
                        width={320}
                        height={320}
                        unoptimized
                        style={{ width: '100%', height: '100%' }}
                        className="w-full h-full object-contain select-none p-1 sm:p-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Badge flip hint on mobile */}
                <span className="sm:hidden absolute -bottom-2 right-1 z-20 text-[10px] font-bold bg-white/95 text-brand-navy border border-amber-200 px-2 py-0.5 rounded-full shadow-xs pointer-events-none flex items-center gap-1">
                  ↻ Ketuk balik
                </span>
              </div>

              {/* Title */}
              <h3 className={`text-lg sm:text-xl font-black ${p.titleColor} mb-2 sm:mb-2.5 leading-tight`}>
                {p.title} {p.subTitle && <><br /><span className="text-xs sm:text-sm text-brand-orange/80 font-bold">{p.subTitle}</span></>}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-5 font-normal max-w-sm sm:max-w-none">
                {p.desc}
              </p>

              {/* Action Link */}
              <button
                onClick={() => openRegister(p.title)}
                className={`mt-auto text-xs sm:text-sm font-black ${p.linkColor} hover:underline inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform`}
              >
                <span>Pelajari lebih lanjut</span> <span>→</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
