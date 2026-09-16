'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
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
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="border-b border-surface-container-highest bg-surface-container-lowest">
      <div className="w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-2xl md:py-3xl">
        <div className="anim-item border border-primary bg-primary text-on-primary p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="font-mono-spec text-mono-spec uppercase tracking-widest text-inverse-primary">
              // TERMINAL KURATORIAL FORCEVAULT
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary tracking-tighter uppercase leading-none">
              JELAJAHI KATALOG SILUET LENGKAP KAMI.
            </h2>
            <p className="font-body-lg text-body-lg text-inverse-primary leading-relaxed">
              Akses database publik terlengkap yang memuat lebih dari 2.400 varian Nike Air Force 1 sejak 1982. Lengkap dengan riwayat nomor SKU pabrikan, kode rilis regional, catatan material kulit, dan protokol verifikasi NFC anti-pemalsuan.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-on-primary text-primary px-6 py-3.5 font-headline-sm text-sm font-semibold tracking-tight uppercase hover:bg-inverse-primary transition-colors"
              >
                BUKA KATALOG LENGKAP →
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center border border-on-primary text-on-primary px-6 py-3.5 font-headline-sm text-sm font-semibold tracking-tight uppercase hover:bg-on-primary hover:text-primary transition-colors"
              >
                VERIFIKASI CHIP NFC LEDGER
              </Link>
            </div>
          </div>
          {/* Subtle Archival Watermark Text in Background */}
          <div className="absolute -right-12 -bottom-16 text-[180px] font-bold tracking-tighter text-surface-container-highest opacity-10 select-none pointer-events-none font-display-hero">
            1982
          </div>
        </div>
      </div>
    </section>
  );
}
