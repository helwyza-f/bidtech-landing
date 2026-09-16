'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const containerRef = useRef<HTMLElement>(null);

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
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-16 bg-[#F5F5F5] border-b border-surface-container-highest" id="story">
      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          <div className="anim-item lg:col-span-5">
            <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest block mb-2">
              MANIFESTO KURATORIAL
            </span>
            <h3 className="text-headline-md font-headline-md text-primary uppercase">
              Menjaga Bentuk Hakiki
            </h3>
            <p className="text-body-md font-body-md text-secondary mt-3">
              FORCEVAULT bukan sekadar reseller sepatu biasa, melainkan arsip monograf dedikasi tinggi yang melestarikan lini legendaris Nike Air Force 1. Setiap pasang sepatu tersimpan dalam ruangan berpengontrol kelembapan optimal.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="anim-item border border-surface-container-highest p-4 bg-surface-container-lowest">
              <span className="font-mono-label text-mono-label text-secondary uppercase block">
                TOTAL PASANG TERCATAT
              </span>
              <span className="font-mono-spec text-headline-sm font-bold text-primary block mt-1">
                4.812
              </span>
            </div>
            <div className="anim-item border border-surface-container-highest p-4 bg-surface-container-lowest">
              <span className="font-mono-label text-mono-label text-secondary uppercase block">
                TINGKAT KEASLIAN
              </span>
              <span className="font-mono-spec text-headline-sm font-bold text-primary block mt-1">
                100,0%
              </span>
            </div>
            <div className="anim-item border border-surface-container-highest p-4 bg-surface-container-lowest col-span-2 sm:col-span-1">
              <span className="font-mono-label text-mono-label text-secondary uppercase block">
                DIDIRIKAN
              </span>
              <span className="font-mono-spec text-headline-sm font-bold text-primary block mt-1">
                2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
