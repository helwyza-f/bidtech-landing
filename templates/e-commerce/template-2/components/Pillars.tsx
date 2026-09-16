'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Pillars() {
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
        <div className="anim-item flex items-center justify-between pb-4 border-b border-surface-container-highest mb-12">
          <span className="font-mono-spec text-mono-spec tracking-widest text-primary uppercase">02 // ANATOMI &amp; REKAYASA TEKNIK</span>
          <span className="font-mono-label text-mono-label text-secondary uppercase">SCHEMA ARSITEKTURAL KILGORE 1982</span>
        </div>
        <div className="anim-item mb-12">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase max-w-4xl">
            EMPAT PILAR REKAYASA ORISINAL TAHUN 1982.
          </h2>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mt-4">
            Sebelum 1982, pemain basket menderita cedera telapak kaki akibat sol kanvas datar tipis. AF1 mematahkan paradigma ini melalui empat pilar rekayasa industri:
          </p>
        </div>
        {/* 4 Pillars Grid / Bento Modern Monochromatic */}
        <div className="anim-item grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-surface-container-highest">
          {/* Pilar 1 */}
          <div className="border-r border-b border-surface-container-highest p-6 md:p-8 flex flex-col justify-between hover:bg-surface-container transition-colors">
            <div>
              <span className="font-mono-spec text-mono-spec text-secondary block mb-6">PILAR 01 // KONTROL IMPAK</span>
              <div className="w-12 h-12 border border-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-[24px]">air</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary uppercase mb-3">
                Kantung Udara Terkapsul
              </h3>
              <p className="font-body-md text-body-md text-secondary leading-relaxed">
                Unit <em>The Maiden Air-Sole</em>: gas nitrogen padat bertekanan disuntikkan dalam membran elastis polyurethane di dalam tumit, mematahkan trauma pendaratan vertikal para center NBA.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-surface-container-highest font-mono-label text-mono-label text-secondary uppercase">
              STATUS: PATEN RESMI DISETUJUI
            </div>
          </div>
          {/* Pilar 2 */}
          <div className="border-r border-b border-surface-container-highest p-6 md:p-8 flex flex-col justify-between hover:bg-surface-container transition-colors">
            <div>
              <span className="font-mono-spec text-mono-spec text-secondary block mb-6">PILAR 02 // TRAKSI KINETIK</span>
              <div className="w-12 h-12 border border-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-[24px]">radio_button_checked</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary uppercase mb-3">
                Titik Poros Konsentris
              </h3>
              <p className="font-body-md text-body-md text-secondary leading-relaxed">
                <em>Concentric Pivot Rings</em>: Lingkaran konsentris pada bantalan kaki depan memungkinkan atlet berputar 360 derajat secara instan tanpa mengorbankan ligamen lutut dan engkel.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-surface-container-highest font-mono-label text-mono-label text-secondary uppercase">
              STATUS: PERTAMA DALAM SEJARAH
            </div>
          </div>
          {/* Pilar 3 */}
          <div className="border-r border-b border-surface-container-highest p-6 md:p-8 flex flex-col justify-between hover:bg-surface-container transition-colors">
            <div>
              <span className="font-mono-spec text-mono-spec text-secondary block mb-6">PILAR 03 // PROPRIOSEPSI</span>
              <div className="w-12 h-12 border border-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-[24px]">lock</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary uppercase mb-3">
                Tali Pengunci Engkel
              </h3>
              <p className="font-body-md text-body-md text-secondary leading-relaxed">
                <em>Proprioceptive Ankle Strap</em>: Terinspirasi langsung dari sabuk pengaman mobil balap, memberikan respons taktil pada pergelangan kaki agar tidak terkilir saat lateral cut tajam.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-surface-container-highest font-mono-label text-mono-label text-secondary uppercase">
              STATUS: DAPAT DILEPAS-PASANG
            </div>
          </div>
          {/* Pilar 4 */}
          <div className="border-r border-b border-surface-container-highest p-6 md:p-8 flex flex-col justify-between hover:bg-surface-container transition-colors">
            <div>
              <span className="font-mono-spec text-mono-spec text-secondary block mb-6">PILAR 04 // STRUKTUR BETON</span>
              <div className="w-12 h-12 border border-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-[24px]">layers</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary uppercase mb-3">
                Midsole Cupsole Bertingkat
              </h3>
              <p className="font-body-md text-body-md text-secondary leading-relaxed">
                Sol karet tebal berjahit 360° yang tidak bisa hancur oleh gesekan aspal jalanan kota. Fondasi masif yang kemudian melahirkan julukan "Uptowns" di New York City.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-surface-container-highest font-mono-label text-mono-label text-secondary uppercase">
              STATUS: DAYA TAHAN MAKSIMAL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
