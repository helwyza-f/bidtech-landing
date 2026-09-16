'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Initial fade-up for events
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

      // 2. Animate the vertical line to draw downwards
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: true,
          }
        }
      );

      // 3. Highlight nodes as the line passes them
      gsap.utils.toArray('.timeline-node').forEach((node: any) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 50%',
          onEnter: () => {
            node.classList.remove('bg-surface-container-lowest');
            node.classList.add('bg-primary');
          },
          onLeaveBack: () => {
            node.classList.remove('bg-primary');
            node.classList.add('bg-surface-container-lowest');
          }
        });
      });
    },
    { scope: containerRef }
  );

  const events = [
    {
      year: "1982",
      title: "Genesis High Cut dengan Strap Velcro dan Mesh Toe-Box",
      desc: "Rilis pertama dalam skema warna White/Neutral Grey. Menampilkan konstruksi kulit gandum penuh (full-grain leather), panel mesh samping untuk sirkulasi udara, strap ankle proprioceptive bergaris, dan unit sol dengan 12 lingkaran konsentris. Dibuat langsung dengan tangan untuk para pemain NBA.",
      era: "ERA 01 // ORISINALITAS",
      spec: "AIR FORCE 1 HIGH OG",
      tags: ["HIGH-TOP CUT", "VELCRO STRAP", "NITROGEN ENCAPSULATED"]
    },
    {
      year: "1994",
      title: "Kelahiran Siluet Mid-Cut dan Eksperimen Logomark Permata",
      desc: "Nike memperkenalkan potongan Mid-Cut untuk pertama kalinya dengan strap pergelangan yang terhubung langsung secara permanen. Periode ini juga menandai debut \"Jewel Swoosh\"—logo Nike berukuran kecil yang dicetak dari plastik transparan timbul menyerupai permata berkilau.",
      era: "ERA 02 // DIVERSIFIKASI",
      spec: "MID-CUT & JEWEL SWOOSH",
      tags: ["MID-CUT ANKLE", "TRANSLUCENT JEWEL", "STREET LEVEL ADOPTION"]
    },
    {
      year: "2001",
      title: "Era Emas Kolaborasi Desain (HTM) dan Penetrasi Pasar Perempuan",
      desc: "Tahun 2001 meruntuhkan batasan gender dengan diperkenalkannya ukuran khusus perempuan untuk pertama kalinya. Di Tokyo, divisi Concept Japan (CO.JP) melahirkan seri langka seperti 'Linen' dan 'Wheat'. Di saat bersamaan, tritunggal Hiroshi Fujiwara, Tinker Hatfield, dan Mark Parker mendirikan kelompok HTM yang mendefinisikan standar kolaborasi luxury sneaker modern.",
      era: "ERA 03 // GLOBAL CURATION",
      spec: "HTM, CO.JP & WOMEN’S SIZING",
      tags: ["TOKYO CO.JP", "HTM TRILOGY", "FEMALE RUNWAY LINE"]
    },
    {
      year: "2007",
      title: "Penyempurnaan Total '07 & Standarisasi Logam Deubré Baja",
      desc: "Memperingati 25 tahun keberadaan siluet, Nike melakukan kalibrasi ulang cetakan sol untuk kenyamanan pemakaian seharian penuh. Pelat tali logam kecil (deubré) diperbarui dengan material baja poles bertuliskan grafir tajam \"AF-1 '82\", menjadi penanda paling universal dari model All-White klasik.",
      era: "ERA 04 // 25TH JUBILEE",
      spec: "AF-1 '07 REMASTERED",
      tags: ["STEEL DEUBRÉ ENGRAVING", "ALL-WHITE STANDARD", "25TH ANNIVERSARY"]
    },
    {
      year: "2017–2024",
      title: "Monumen Post-Modern: Virgil Abloh \"The Ten\", Travis Scott, Hingga Sol Shadow",
      desc: "Melalui koleksi 'The Ten' (2017), mendiang arsitek Virgil Abloh membedah anatomi AF1 hingga ke tulang belulang busa dan jahitan interiornya, menandatangani midsole dengan teks Helvetica bertanda kutip \"AIR\". Dekonstruksi ini membuka pintu bagi eksperimen ekstrem: Swoosh terbalik Travis Scott, lapisan ganda AF1 Shadow, hingga integrasi busa mutakhir Nike React.",
      era: "ERA 05 // DEKONSTRUKSI SENI",
      spec: "VIRGIL ABLOH & INDUSTRIAL AVANT-GARDE",
      tags: ["VIRGIL ABLOH \"AIR\"", "TRAVIS SCOTT REVERSE SWOOSH", "SHADOW DUAL-LAYER"],
      isCurrent: true
    }
  ];

  return (
    <section ref={containerRef} className="border-b border-surface-container-highest bg-surface">
      <div className="w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-2xl md:py-3xl">
        <div className="anim-item flex items-center justify-between pb-4 border-b border-surface-container-highest mb-12">
          <span className="font-mono-spec text-mono-spec tracking-widest text-primary uppercase">05 // KRONOLOGI EVOLUSI BENTUK</span>
          <span className="font-mono-label text-mono-label text-secondary uppercase">1982 — 2024 HISTORICAL TIMELINE</span>
        </div>
        <div className="anim-item mb-12">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase">
            GARIS WAKTU MUTASI MORFOLOGI DAN KULTUR.
          </h2>
          <p className="font-body-lg text-body-lg text-secondary max-w-3xl mt-4 leading-relaxed">
            Perjalanan empat dekade transformasi dari perlengkapan tempur para atlet basket profesional menuju kanvas dekonstruksi seni rupa kontemporer dunia.
          </p>
        </div>
        {/* Vertical Continuous Timeline */}
        <div className="timeline-container relative border-l border-surface-container-highest ml-4 md:ml-8 pl-6 md:pl-12 space-y-16">
          <div className="timeline-line absolute -left-[1px] top-0 bottom-0 w-[1px] bg-primary origin-top"></div>
          {events.map((event, idx) => (
            <div key={idx} className="anim-item relative group">
              {/* Node Marker */}
              <div className={`timeline-node absolute -left-[31px] md:-left-[55px] top-1.5 w-3 h-3 border-2 border-primary transition-colors duration-300 ease-out ${event.isCurrent ? 'bg-primary' : 'bg-surface-container-lowest'}`}></div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="font-mono-label text-mono-label text-secondary block">{event.era}</span>
                  <h3 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">{event.year}</h3>
                  <span className="font-mono-spec text-mono-spec text-secondary">{event.spec}</span>
                </div>
                <div className="md:col-span-9 border border-surface-container-highest bg-surface-container-lowest p-6">
                  <h4 className="font-headline-sm text-headline-sm text-primary uppercase mb-2">{event.title}</h4>
                  <p className="font-body-md text-body-md text-secondary leading-relaxed mb-4">{event.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="font-mono-label text-mono-label uppercase px-2 py-1 bg-surface border border-surface-container-highest">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
