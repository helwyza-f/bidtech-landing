'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Baltimore() {
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
          <span className="font-mono-spec text-mono-spec tracking-widest text-primary uppercase">04 // KRONIK PENYELAMATAN (THE RESCUE)</span>
          <span className="font-mono-label text-mono-label text-secondary uppercase">BALTIMORE 1984 // REVOLUSI DISTRIBUSI</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-center">
          <div className="anim-item md:col-span-6 space-y-6">
            <div className="inline-block bg-primary text-on-primary font-mono-label text-mono-label uppercase px-2.5 py-1">
              KRISIS KEPUNAHAN 1984
            </div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase">
              BAGAIMANA BALTIMORE MENYELAMATKAN AIR FORCE 1 DARI KEMATIAN.
            </h2>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
              Sesuai siklus industri sepatu saat itu, Nike bersiap menghentikan total produksi Air Force 1 pada akhir 1984 untuk digantikan model Air Force II. Namun di jalanan kota Baltimore, Maryland, sepatu ini bukan lagi sekadar alat olahraga, melainkan mahkota status sosial.
            </p>
            <p className="font-body-md text-body-md text-secondary leading-relaxed">
              Tiga pemilik toko ritel independen legendaris—<strong>Charley Rudo Sports</strong>, <strong>Downtown Locker Room (DTLR)</strong>, dan <strong>Cinderella Shoes</strong>—terbang langsung ke kantor pusat Nike di Beaverton, Oregon. Mereka menuntut satu hal gila: memproduksi ulang AF1 eksklusif sebanyak 3.000 pasang (1.200 pasang Royal Blue dan 1.800 pasang Chocolate Brown) dengan jaminan uang mereka sendiri.
            </p>
            <p className="font-body-md text-body-md text-secondary leading-relaxed">
              Koleksi perdana ludes dalam hitungan jam. Kejadian ini melahirkan inisiatif legendaris <em>"Color of the Month Club"</em> pada 1984–1985—sebuah cetak biru konsep peredaran rilisan terbatas (limited sneaker drops) yang kini menopang seluruh industri fesyen jalanan global bernilai miliaran dolar.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-container-highest">
              <div className="border border-surface-container-highest p-3 bg-surface">
                <span className="font-mono-label text-mono-label text-secondary block">TOKO 01</span>
                <p className="font-headline-sm text-headline-sm text-primary mt-1">Charley Rudo</p>
                <span className="font-mono-spec text-mono-spec text-secondary">Pelopor Permintaan</span>
              </div>
              <div className="border border-surface-container-highest p-3 bg-surface">
                <span className="font-mono-label text-mono-label text-secondary block">TOKO 02</span>
                <p className="font-headline-sm text-headline-sm text-primary mt-1">Downtown Locker</p>
                <span className="font-mono-spec text-mono-spec text-secondary">Distribusi Sentral</span>
              </div>
              <div className="border border-surface-container-highest p-3 bg-surface">
                <span className="font-mono-label text-mono-label text-secondary block">TOKO 03</span>
                <p className="font-headline-sm text-headline-sm text-primary mt-1">Cinderella</p>
                <span className="font-mono-spec text-mono-spec text-secondary">Jaringan Komunitas</span>
              </div>
            </div>
          </div>
          {/* Historic Image / Archival Visual */}
          <div className="anim-item md:col-span-6">
            <div className="border border-surface-container-highest bg-surface p-6">
              <div className="aspect-[4/3] bg-surface-container-lowest border border-surface-container-highest overflow-hidden relative mb-4">
                <img
                  className="w-full h-full object-cover grayscale"
                  alt="Vintage documentary photograph of Baltimore"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGunitSw2wVMCf2HU0qFlrlWJPXpHV2p6_qOsk2IBkM2mnBOV4hXd3RuEbinR3p08gsP5F6IohcLjDFJ-a8eOZ9iVkU8rVHzWlJZk3-Exu2sRVx8GMEWGaMxV2-w3UsGi4u1xXvz49rJotUBfwUfY4kUaCNTnwi_E5sFdXlGwuzA6fmok72M_yercldknQfu8Gey_PEbWxvia8ozxhn2YXpc95IVFNU4mEA5ObcO5qvZgtjQp75uTm"
                />
                <span className="absolute bottom-3 left-3 bg-surface-container-lowest border border-surface-container-highest font-mono-label text-mono-label text-primary uppercase px-2 py-1">
                  ARSIP HISTORIS: BALTIMORE SNEAKER LINEUP (1984)
                </span>
              </div>
              <div className="flex justify-between items-center font-mono-spec text-mono-spec text-secondary">
                <span>DOKUMEN TITIK BALIK // AF1-BALT-84</span>
                <span className="text-primary font-semibold">"TANPA BALTIMORE, AF1 SUDAH MATI."</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
