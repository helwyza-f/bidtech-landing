'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useModal } from '@/lib/ModalContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
  const { openRegister } = useModal();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Banner Card Entrance (Scale & Fade Up)
      gsap.fromTo(
        '.cta-banner-card',
        { y: 35, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 2. Girl Image Pop-Up Entrance
      gsap.fromTo(
        '.cta-girl-image',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: 0.2,
          ease: 'back.out(1.2)',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 3. Title Masked Words Reveal
      gsap.fromTo(
        '.cta-title-word',
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          stagger: 0.035,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 4. Content Subtitle & Button Reveal
      gsap.fromTo(
        '.cta-content-anim',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 4. Subtle breathing animation for lightbulb doodle
      gsap.to('#cta-lightbulb', {
        y: -5,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 5. Subtle float for dashed learning trail
      gsap.to('#cta-dashed-trail', {
        x: 4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 6. Button Shimmer Pulse
      gsap.to('.cta-btn-pulse', {
        boxShadow: '0 0 24px 8px rgba(249, 115, 22, 0.45)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white relative pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-visible"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ========================================================================= */}
        {/* SKY BLUE BANNER CARD                                                      */}
        {/* ========================================================================= */}
        <div className="cta-banner-card relative bg-[#BAE6FD] rounded-[2.5rem] shadow-sm overflow-visible min-h-[220px] sm:min-h-[240px]">

          {/* ======================================================================= */}
          {/* WHITE DOODLES DENGAN GARIS PUTUS-PUTUS & LAMPU DI DALAM CARD            */}
          {/* ======================================================================= */}

          {/* 1. Lampu dengan garis putus-putus (Lightbulb with dashed rays) */}
          <div
            id="cta-lightbulb"
            className="absolute top-6 left-[48%] sm:left-[49%] pointer-events-none opacity-55"
          >
            <svg
              className="w-11 h-11 text-white"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Badan bohlam lampu */}
              <path d="M18 35h12m-9 4h6m-7-10a11 11 0 1 1 13 0c-1.8 1.8-2.5 3.5-2.5 5.5H20.5c0-2-.7-3.7-2.5-5.5z" />
              <path d="M21 21a4 4 0 0 1 4-4" strokeWidth="1.8" />
              {/* Garis putus-putus sinar lampu */}
              <line x1="24" y1="3" x2="24" y2="8" strokeDasharray="2 3" strokeWidth="2.5" />
              <line x1="11" y1="10" x2="14" y2="13" strokeDasharray="2 3" strokeWidth="2.5" />
              <line x1="37" y1="10" x2="34" y2="13" strokeDasharray="2 3" strokeWidth="2.5" />
              <line x1="5" y1="24" x2="9" y2="24" strokeDasharray="2 3" strokeWidth="2.5" />
            </svg>
          </div>

          {/* 2. Garis putus-putus melengkung (Dashed learning trail / path) */}
          <div
            id="cta-dashed-trail"
            className="absolute top-12 left-[35%] pointer-events-none opacity-40 hidden sm:block"
          >
            <svg className="w-24 h-12" viewBox="0 0 100 50" fill="none">
              <path
                d="M5,42 C30,12 65,12 95,38"
                stroke="white"
                strokeWidth="2.2"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 3. Doodle lucu garis putus-putus dekat meja di bawah (seperti contoh referensi) */}
          <div className="absolute bottom-4 left-[44%] pointer-events-none opacity-45 hidden md:block">
            <svg
              className="w-12 h-12 text-white"
              viewBox="0 0 50 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path
                d="M14,24 C10,36 28,40 36,28 C42,18 34,10 24,14 C18,18 20,28 28,30"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          {/* 4. Garis putus-putus kecil di area kiri atas */}
          <div className="absolute top-7 left-10 pointer-events-none opacity-35 hidden lg:block">
            <svg className="w-16 h-8" viewBox="0 0 80 30" fill="none">
              <path
                d="M2,20 Q40,2 78,16"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* ======================================================================= */}
          {/* MOBILE LAYOUT (< md): Stacked Cleanly (No Overlap, No Clutter)          */}
          {/* ======================================================================= */}
          <div className="md:hidden flex flex-col items-center text-center p-6 sm:p-8 relative z-20">
            <h2 className="text-xl sm:text-2xl font-black text-brand-navy leading-tight mb-2 flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
              {["Siap", "untuk", "memulai", "perjalanan", "belajar", "terbaik", "untuk", "anak", "Anda?"].map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden pb-0.5">
                  <span className="cta-title-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#0369A1] mb-3 max-w-xs">
              Temukan pusat SmartBelajar terdekat dan daftarkan sekarang.
            </p>

            {/* Girl Illustration with Blobs in Center on Mobile */}
            <div className="relative w-full h-[210px] flex items-end justify-center my-2">
              {/* Orange Blob */}
              <div
                className="absolute top-2 w-32 h-32 bg-brand-orange right-[14%] z-[1]"
                style={{
                  borderRadius: '52% 48% 55% 45% / 58% 52% 48% 42%',
                }}
              />
              {/* Blue Circle */}
              <div
                className="absolute top-4 w-24 h-24 rounded-full bg-brand-blue left-[14%] z-[1]"
              />
              {/* Girl Image */}
              <div
                className="cta-girl-image relative z-10 flex items-end justify-center"
                style={{ zIndex: 10 }}
              >
                <Image
                  src="/images/cta.webp"
                  alt="Anak perempuan ceria belajar menulis bersama SmartBelajar"
                  width={340}
                  height={320}
                  priority
                  className="w-auto h-[210px] object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* Button at bottom of card */}
            <div className="w-full pt-3 z-10 flex justify-center">
              <button
                onClick={() => openRegister()}
                className="cta-btn-pulse w-full max-w-xs py-3.5 px-6 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm sm:text-base font-extrabold rounded-full shadow-orange-glow active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Daftar Sekarang</span>
                <span className="text-lg leading-none">→</span>
              </button>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* DESKTOP / TABLET LAYOUT (>= md): Side-by-Side (Timbul & Elegan)         */}
          {/* ======================================================================= */}
          <div className="hidden md:block">
            {/* ORANGE BLOB */}
            <div
              className="absolute top-4 bottom-4 right-2 sm:right-6 md:right-8 w-40 sm:w-48 md:w-56 bg-brand-orange pointer-events-none z-[1]"
              style={{
                borderRadius: '52% 48% 55% 45% / 58% 52% 48% 42%',
              }}
            >
              <div className="absolute top-6 right-5 opacity-65">
                <svg
                  className="w-12 h-12 text-white"
                  viewBox="0 0 50 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M8,22 Q22,6 32,24 T22,42" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>

            {/* BLUE ROUND ELEMENT */}
            <div
              className="absolute top-6 sm:top-8 md:top-10 right-[150px] sm:right-[180px] md:right-[210px] lg:right-[230px] w-28 sm:w-36 md:w-40 lg:w-44 h-28 sm:h-36 md:h-40 lg:h-44 rounded-full bg-brand-blue pointer-events-none shadow-sm z-[1]"
            />

            {/* GIRL IMAGE */}
            <div
              className="cta-girl-image absolute bottom-0 right-0 sm:right-1 md:right-2 pointer-events-none flex items-end justify-end z-10"
              style={{ zIndex: 10 }}
            >
              <Image
                src="/images/cta.webp"
                alt="Anak perempuan ceria belajar menulis bersama SmartBelajar"
                width={460}
                height={440}
                priority
                className="w-auto h-[230px] sm:h-[270px] md:h-[310px] lg:h-[345px] max-w-none object-contain drop-shadow-xl select-none"
              />
            </div>

            {/* CONTENT: HEADLINE, SUBTITLE, BUTTON */}
            <div className="cta-content-anim relative z-20 py-8 sm:py-12 md:py-14 lg:py-16 pl-6 sm:pl-10 md:pl-12 lg:pl-14 pr-2 w-full md:w-[54%] lg:w-[50%] max-w-[380px] sm:max-w-[420px] lg:max-w-[460px]">
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-[28px] lg:text-[33px] font-black text-brand-navy leading-[1.25] tracking-tight flex flex-wrap gap-x-2 gap-y-1">
                  {["Siap", "untuk", "memulai", "perjalanan", "belajar", "terbaik", "untuk", "anak", "Anda?"].map((word, idx) => (
                    <span key={idx} className="inline-block overflow-hidden pb-0.5">
                      <span className="cta-title-word inline-block will-change-transform">
                        {word}
                      </span>
                    </span>
                  ))}
                </h2>

                <p className="text-xs sm:text-sm font-semibold text-[#0369A1] leading-relaxed max-w-sm">
                  Temukan pusat SmartBelajar terdekat dan daftarkan sekarang.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => openRegister()}
                    className="cta-btn-pulse inline-flex items-center gap-2 px-7 py-3 sm:px-8 sm:py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm sm:text-base font-extrabold rounded-full shadow-orange-glow transition-all hover:scale-105 active:scale-95 duration-200"
                  >
                    <span>Daftar Sekarang</span>
                    <span className="text-lg leading-none">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
