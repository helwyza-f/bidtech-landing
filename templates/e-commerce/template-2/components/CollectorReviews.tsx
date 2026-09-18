'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  orderId: string;
  quote: string;
  name: string;
  role: string;
  edition: string;
}

const reviews: Review[] = [
  {
    orderId: 'PESANAN #FV-9021',
    quote:
      '"Menemukan AF1 Luxe langka di sini dalam kondisi mutlak sempurna. ForceVault adalah standar emas untuk pemburu AF1 di Indonesia. Pengiriman double-box rapi dan segel verifikasi lengkap."',
    name: 'Raditya P.',
    role: 'Kolektor Terverifikasi / Jakarta',
    edition: 'Edisi: AF1 Luxe Black Gum',
  },
  {
    orderId: 'PESANAN #FV-8419',
    quote:
      '"Triple White tiba dalam kondisi luar biasa segar. Aroma kulit asli yang khas, pengiriman kilat, dan kemasan berkelas. Kualitas rancang bangunnya langsung terasa saat pertama dipakai."',
    name: 'Sarah A.',
    role: 'Sneakerhead / Bandung',
    edition: "Edisi: AF1 '07 Triple White",
  },
  {
    orderId: 'PESANAN #FV-7731',
    quote:
      '"Koleksi varian Air Force 1 terlengkap. Sangat menghargai bagaimana mereka menjaga historis desain Bruce Kilgore. Versi high cut vintage sail ini sungguh layak masuk galeri museum."',
    name: 'Dimitri K.',
    role: 'Streetwear Stylist / Surabaya',
    edition: "Edisi: AF1 High '07 Vintage",
  },
];

export default function CollectorReviews() {
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
    <section ref={containerRef} className="py-16 md:py-24 bg-surface-container-lowest border-b border-surface-container-highest" id="reviews">
      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="anim-item flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 pb-6 border-b border-surface-container-highest">
          <div>
            <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest block mb-1">
              BUKU BESAR AUTENTIKASI
            </span>
            <h2 className="text-[30px] sm:text-headline-lg font-headline-lg tracking-tight text-primary uppercase">
              Ulasan Terverifikasi Kolektor
            </h2>
            <p className="text-body-md font-body-md text-secondary mt-1">
              Umpan balik nyata dari para kolektor, stylist, dan pengarsip sneaker di seluruh Indonesia.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 font-mono-spec text-mono-spec text-primary">
            <span className="font-bold">4.98 / 5.00</span>
            <span className="text-secondary">SKOR KESELURUHAN VAULT (642 PESANAN)</span>
          </div>
        </div>

        {/* 3-Column Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-gutter-desktop">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="anim-item border border-surface-container-highest p-6 md:p-8 flex flex-col justify-between hover:border-primary transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-primary font-mono-spec text-sm tracking-widest">
                    ★★★★★
                  </div>
                  <span className="font-mono-label text-mono-label border border-surface-container-highest px-2 py-0.5 uppercase text-secondary">
                    {r.orderId}
                  </span>
                </div>
                <p className="text-[15px] sm:text-body-lg text-primary italic mb-6 leading-relaxed">
                  {r.quote}
                </p>
              </div>
              <div className="pt-6 border-t border-surface-container-highest">
                <p className="text-headline-sm font-headline-sm text-primary text-base">{r.name}</p>
                <p className="font-mono-label text-mono-label text-secondary uppercase">{r.role}</p>
                <p className="font-mono-spec text-mono-spec text-primary mt-2">{r.edition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
