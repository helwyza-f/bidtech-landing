'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BruceKilgore from './BruceKilgore';
import Pillars from './Pillars';
import OriginalSix from './OriginalSix';
import Baltimore from './Baltimore';
import Timeline from './Timeline';
import CTA from './CTA';

gsap.registerPlugin(ScrollTrigger);

export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.story-hero-anim',
        { y: 40, opacity: 0 },
        {
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
    <div ref={containerRef} className="bg-surface">
      {/* Top Banner / Breadcrumb & Document Header */}
      <section className="border-b border-surface-container-highest bg-surface-container-lowest">
        <div className="w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
          {/* Status Bar */}
          <div className="story-hero-anim flex flex-wrap justify-between items-center text-mono-label font-mono-label text-secondary uppercase pb-4 border-b border-surface-container-highest mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-primary font-bold">● DOKUMEN RESMI VAULT</span>
              <span>// ARSIP HISTORIS SEJAK 1982</span>
            </div>
            <div>STATUS: TERBUMIKAN KULTUR (VERIFIED ARCHIVE)</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-end mb-8">
            <div className="md:col-span-8 space-y-4">
              <span className="story-hero-anim font-mono-spec text-mono-spec tracking-widest text-primary uppercase block">
                SPESIFIKASI ARSIP // KISAH WARISAN
              </span>
              <h1 className="story-hero-anim font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase leading-none">
                KISAH &amp; WARISAN: KELAHIRAN SANG IKON ABADI.
              </h1>
              <p className="story-hero-anim font-body-lg text-body-lg text-secondary leading-relaxed max-w-3xl">
                Tiga puluh empat tahun berdiri sebagai mahkota jalanan. Inilah rekam jejak arsitektural lengkap bagaimana siluet kreasi Bruce Kilgore bertransformasi dari sepatu lapangan kayu hingga menjadi kanvas dekonstruksi seni paling berpengaruh sepanjang sejarah.
              </p>
            </div>

            {/* Top Right Metadata Card */}
            <div className="story-hero-anim md:col-span-4">
              <div className="border border-surface-container-highest bg-surface p-4 space-y-2 font-mono-spec text-mono-spec">
                <div className="flex justify-between pb-2 border-b border-surface-container-highest">
                  <span className="text-secondary">ARSIP HISTORIS:</span>
                  <span className="text-primary font-bold">1982 — 2024</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-surface-container-highest">
                  <span className="text-secondary">PENULIS:</span>
                  <span className="text-primary font-bold">Tim Kurator ForceVault</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-surface-container-highest">
                  <span className="text-secondary">DOKUMEN NO:</span>
                  <span className="text-primary font-bold">AF1-HIST-82</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">STATUS ARSIP:</span>
                  <span className="text-primary font-bold">Terbuka untuk Publik</span>
                </div>
              </div>
            </div>
          </div>

          {/* Big Archival Hero Image */}
          <div className="story-hero-anim border border-surface-container-highest bg-surface-container-lowest p-3 relative overflow-hidden">
            <div className="aspect-[21/9] bg-surface-container relative overflow-hidden flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM9dHL_A-raV5DV2bRyBLWsVHOTDoUmQlAaE4BdRUhrg-ksEQ6ItqbM1McM4adECo218ZkxhZZC09MwYnH_QVXnixQna9fJH9j0wXlbxs_lx0_OoNdoSzR8V9DKG_Dq1KvXVMC8Cbou9RaWg_XCw_7V7jgETwTPlIuWzX5q0OkfUrs3HBK3IGKWA2Eu_VSCRqVKw48Rx-BdevU_NiOGvZj99SsMQ0MuFLTPjrFQ4BaY5oMN948uLHh"
                alt="Archival Original 1982 Nike Air Force 1 High"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-primary text-on-primary font-mono-label text-mono-label uppercase px-3 py-1">
                FOTO ARSIP UTAMA: NIKE AIR FORCE 1 HIGH OG (1982)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Historical Sections */}
      <BruceKilgore />
      <Pillars />
      <OriginalSix />
      <Baltimore />
      <Timeline />
      <CTA />
    </div>
  );
}
