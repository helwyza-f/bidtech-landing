'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BruceKilgore() {
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
    <section ref={containerRef} className="border-b border-surface-container-highest bg-surface">
      <div className="w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-2xl md:py-3xl">
        {/* Section Header */}
        <div className="anim-item flex items-center justify-between pb-4 border-b border-surface-container-highest mb-12">
          <span className="font-mono-spec text-mono-spec tracking-widest text-primary uppercase">01 // ARSITEK UTAMA (THE DESIGNER)</span>
          <span className="font-mono-label text-mono-label text-secondary uppercase">ARSIP KILGORE 1981-1982</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop">
          {/* Column 1: Historical Profile & Philosophy */}
          <div className="anim-item md:col-span-7 space-y-6">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase">
              BRUCE KILGORE: REVOLUSI PATUNG DAN BIOMEKANIK.
            </h2>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
              Sebelum bergabung dengan Nike, Bruce Kilgore mengasah instingnya dalam bidang seni patung murni dan rekayasa desain industri otomotif serta peralatan medis. Kilgore memandang sepatu bukan sebagai kanvas grafis dekoratif, melainkan sebuah struktur bejana pelindung yang harus mampu menahan beban impak ribuan newton dari para raksasa lapangan kayu.
            </p>
            <p className="font-body-md text-body-md text-secondary leading-relaxed">
              Dalam proses rancang bangun siluet 1982, Kilgore mengambil inspirasi tak lazim dari struktur katedral gotik Notre-Dame de Paris untuk distribusi berat tumit, serta kontur tapak ban salju Michelin untuk daya cengkeram tanpa batas. Hasilnya adalah lompatan radikal: penghapusan tapak herringbone yang telah berumur 50 tahun, digantikan lingkaran konsentris kinetik murni.
            </p>
            {/* Pull Quote Box */}
            <div className="border-l-2 border-primary pl-6 py-4 my-8 bg-surface-container-low">
              <p className="font-headline-sm text-headline-sm text-primary italic font-normal tracking-tight">
                "Sepatu ini tidak dirancang untuk menjadi tren fesyen. Ia dirancang murni untuk mengatasi masalah biomekanik atlet di atas lantai kayu."
              </p>
              <span className="font-mono-spec text-mono-spec text-secondary uppercase block mt-3">
                — Bruce Kilgore, Wawancara Arsip Desain Beaverton (1982)
              </span>
            </div>
            {/* Ledger Attribute Specs */}
            <div className="border border-surface-container-highest bg-surface-container-lowest">
              <div className="p-4 border-b border-surface-container-highest font-mono-spec text-mono-spec text-primary uppercase font-semibold">
                DOKUMENTASI RISET KILGORE // EXETER LAB
              </div>
              <div className="divide-y divide-surface-container-highest">
                <div className="p-3 flex justify-between font-mono-spec text-mono-spec">
                  <span className="text-secondary uppercase">METODE PEMODELAN</span>
                  <span className="text-primary font-body-md">Blok Kayu Mahoni Skala 1:1 &amp; Cetakan Plaster</span>
                </div>
                <div className="p-3 flex justify-between font-mono-spec text-mono-spec">
                  <span className="text-secondary uppercase">SUMBER INSPIRASI TAPAK</span>
                  <span className="text-primary font-body-md">Ban Musim Dingin Michelin Radials</span>
                </div>
                <div className="p-3 flex justify-between font-mono-spec text-mono-spec">
                  <span className="text-secondary uppercase">STRUKTUR TUMIT</span>
                  <span className="text-primary font-body-md">Buttress Katedral Gotik Notre-Dame</span>
                </div>
                <div className="p-3 flex justify-between font-mono-spec text-mono-spec">
                  <span className="text-secondary uppercase">UJI COBA PERTAMA</span>
                  <span className="text-primary font-body-md">Pemain Uji Coba Lapangan Askesis Exeter</span>
                </div>
              </div>
            </div>
          </div>
          {/* Column 2: Blueprint Sketches & Wooden Last Gallery */}
          <div className="anim-item md:col-span-5 space-y-6">
            <div className="border border-surface-container-highest bg-surface-container-lowest p-4">
              <div className="aspect-square bg-surface-container border border-surface-container-highest overflow-hidden relative">
                <img
                  className="w-full h-full object-cover"
                  alt="A vintage technical engineering blueprint from 1982 detailing the cross-section design of the Nike Air Force 1"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM9dHL_A-raV5DV2bRyBLWsVHOTDoUmQlAaE4BdRUhrg-ksEQ6ItqbM1McM4adECo218ZkxhZZC09MwYnH_QVXnixQna9fJH9j0wXlbxs_lx0_OoNdoSzR8V9DKG_Dq1KvXVMC8Cbou9RaWg_XCw_7V7jgETwTPlIuWzX5q0OkfUrs3HBK3IGKWA2Eu_VSCRqVKw48Rx-BdevU_NiOGvZj99SsMQ0MuFLTPjrFQ4BaY5oMN948uLHh"
                />
                <span className="absolute top-2 left-2 bg-primary text-on-primary font-mono-label text-mono-label uppercase px-2 py-0.5">
                  SKETSA RESMI KILGORE (1981)
                </span>
              </div>
              <p className="font-mono-spec text-mono-spec text-secondary mt-3">
                Cetak biru penempatan kapsul Air-Sole dalam lapisan getah polyurethane (1981).
              </p>
            </div>
            <div className="border border-surface-container-highest bg-surface-container-lowest p-4">
              <div className="aspect-[4/3] bg-surface-container border border-surface-container-highest overflow-hidden relative">
                <img
                  className="w-full h-full object-cover"
                  alt="An archival photograph of a hand-carved solid wooden shoe last prototype labeled Kilgore 1981"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC2N2GBocv5tZgmiv8M2fsLHzBkNuPJbaW9qXbsAKMiq6XimsUB1hyEMi6KAeSaRTORH-aa0b7fKCqbg34rNaMvhMgpXf_GYJzfnGIz-YzCFpPl3BSYR8oRgu4uUWfQ0FYSezpfYEHp_IM1nv0uKUKKspCm8mkW8EN3fQZeRhryWLGiCqR8wtww9C01iD4OrTD34QSVrxBYG3grb5hi3kusmRYMjZI8E2zulzkyS5yPctuS335t4gf"
                />
                <span className="absolute top-2 left-2 bg-primary text-on-primary font-mono-label text-mono-label uppercase px-2 py-0.5">
                  PROTOTIPE CETAKAN KAYU
                </span>
              </div>
              <p className="font-mono-spec text-mono-spec text-secondary mt-3">
                Cetakan kayu mahoni pertama yang digunakan untuk membentuk lekukan sol tebal AF1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
