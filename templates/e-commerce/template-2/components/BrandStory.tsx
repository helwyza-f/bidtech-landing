'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const containerRef = useRef<HTMLElement>(null);
  const countRef1 = useRef<HTMLSpanElement>(null);
  const countRef2 = useRef<HTMLSpanElement>(null);
  const countRef3 = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.anim-item',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Number Counting Animations
      const counterData = {
        val1: 0,
        val2: 0,
        val3: 0,
      };

      gsap.to(counterData, {
        val1: 4812,
        val2: 100,
        val3: 2024,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          if (countRef1.current) {
            countRef1.current.textContent = Math.floor(counterData.val1).toLocaleString('id-ID');
          }
          if (countRef2.current) {
            countRef2.current.textContent = counterData.val2.toFixed(1).replace('.', ',') + '%';
          }
          if (countRef3.current) {
            countRef3.current.textContent = Math.floor(counterData.val3).toString();
          }
        },
        onComplete: () => {
          if (countRef1.current) countRef1.current.textContent = '4.812';
          if (countRef2.current) countRef2.current.textContent = '100,0%';
          if (countRef3.current) countRef3.current.textContent = '2024';
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-14 md:py-20 bg-[#F5F5F5] border-b border-surface-container-highest" id="story">
      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter-desktop items-center">
          <div className="anim-item lg:col-span-5">
            <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest block mb-2">
              MANIFESTO KURATORIAL
            </span>
            <h3 className="text-[26px] sm:text-headline-md font-headline-md text-primary uppercase">
              Menjaga Bentuk Hakiki
            </h3>
            <p className="text-body-md font-body-md text-secondary mt-3 text-[14px] sm:text-base leading-relaxed">
              FORCEVAULT bukan sekadar reseller sepatu biasa, melainkan arsip monograf dedikasi tinggi yang melestarikan lini legendaris Nike Air Force 1. Setiap pasang sepatu tersimpan dalam ruangan berpengontrol kelembapan optimal.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-2 lg:mt-0">
            <div className="anim-item border border-surface-container-highest p-3.5 sm:p-4 bg-surface-container-lowest">
              <span className="font-mono-label text-[9px] sm:text-mono-label text-secondary uppercase block">
                TOTAL PASANG TERCATAT
              </span>
              <span
                ref={countRef1}
                className="font-mono-spec text-[22px] sm:text-headline-sm font-bold text-primary block mt-1 tabular-nums"
              >
                0
              </span>
            </div>
            <div className="anim-item border border-surface-container-highest p-3.5 sm:p-4 bg-surface-container-lowest">
              <span className="font-mono-label text-[9px] sm:text-mono-label text-secondary uppercase block">
                TINGKAT KEASLIAN
              </span>
              <span
                ref={countRef2}
                className="font-mono-spec text-[22px] sm:text-headline-sm font-bold text-primary block mt-1 tabular-nums"
              >
                0,0%
              </span>
            </div>
            <div className="anim-item border border-surface-container-highest p-3.5 sm:p-4 bg-surface-container-lowest col-span-2 sm:col-span-1">
              <span className="font-mono-label text-[9px] sm:text-mono-label text-secondary uppercase block">
                DIDIRIKAN
              </span>
              <span
                ref={countRef3}
                className="font-mono-spec text-[22px] sm:text-headline-sm font-bold text-primary block mt-1 tabular-nums"
              >
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
