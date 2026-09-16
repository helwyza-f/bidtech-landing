'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OriginalSix() {
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
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef }
  );

  const players = [
    {
      name: "Moses Malone",
      role: "PHILADELPHIA 76ERS",
      tag: "MVP",
      number: "#01 // CENTER",
      desc: "Juara NBA 1983 dan MVP Final dengan AF1 High.",
      img: "/images/Atlet1.webp",
      tagStyle: "bg-primary text-on-primary"
    },
    {
      name: "Michael Cooper",
      role: "LOS ANGELES LAKERS",
      tag: "DEFENSE",
      number: "#02 // GUARD",
      desc: "Sang jangkar pertahanan perimeter 'Showtime' Lakers.",
      img: "/images/Atlet2.webp",
      tagStyle: "bg-surface text-primary border border-surface-container-highest"
    },
    {
      name: "Jamaal Wilkes",
      role: "LOS ANGELES LAKERS",
      tag: "FORWARD",
      number: "#03 // FORWARD",
      desc: "Dikenal dengan julukan 'Silk' karena tembakan mulusnya.",
      img: "/images/Atlet3.webp",
      tagStyle: "bg-surface text-primary border border-surface-container-highest"
    },
    {
      name: "Bobby Jones",
      role: "PHILADELPHIA 76ERS",
      tag: "6TH MAN",
      number: "#04 // FORWARD",
      desc: "Pemenang Sixth Man of the Year pertama dalam sejarah.",
      img: "/images/Atlet4.webp",
      tagStyle: "bg-surface text-primary border border-surface-container-highest"
    },
    {
      name: "Mychal Thompson",
      role: "PORTLAND TRAIL BLAZERS",
      tag: "DRAFT #1",
      number: "#05 // CENTER/FWD",
      desc: "Pilihan No. 1 NBA Draft 1978 dan benteng pertahanan tangguh.",
      img: "/images/Atlet5.webp",
      tagStyle: "bg-surface text-primary border border-surface-container-highest"
    },
    {
      name: "Calvin Natt",
      role: "PORTLAND TRAIL BLAZERS",
      tag: "ALL-STAR",
      number: "#06 // FORWARD",
      desc: "Forward bertenaga kuda yang menguji daya tahan sol AF1.",
      img: "/images/Atlet6.webp",
      tagStyle: "bg-surface text-primary border border-surface-container-highest"
    }
  ];

  return (
    <section ref={containerRef} className="border-b border-surface-container-highest bg-surface">
      <div className="w-full max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-2xl md:py-3xl">
        <div className="anim-item flex items-center justify-between pb-4 border-b border-surface-container-highest mb-12">
          <span className="font-mono-spec text-mono-spec tracking-widest text-primary uppercase">03 // DUTA PERINTIS (THE VALIDATION)</span>
          <span className="font-mono-label text-mono-label text-secondary uppercase">THE ORIGINAL SIX // KAMPANYE 1982</span>
        </div>
        <div className="anim-item grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop mb-12">
          <div className="md:col-span-8">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase">
              THE ORIGINAL SIX: GLADIATOR LAPANGAN KAYU.
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mt-4 leading-relaxed">
              Nike tidak mengandalkan kampanye televisi komersial konvensional. Mereka merekrut enam pilar bintang NBA terkuat pada musim 1982–1983 untuk mengenakan AF1 di medan perang sebenarnya, membuktikan ketangguhan struktural teknologi udara di hadapan jutaan mata penonton.
            </p>
          </div>
          <div className="md:col-span-4 flex items-end">
            <div className="border border-surface-container-highest bg-surface-container-lowest p-4 w-full">
              <span className="font-mono-spec text-mono-spec text-secondary uppercase block mb-1">DOKUMEN KAMPANYE FOTOGRAFI</span>
              <p className="font-body-md text-body-md text-primary font-medium">Potret Ikonik di Atas Landasan Pacu Bandara dengan Jas Putih (1983)</p>
            </div>
          </div>
        </div>
        {/* 6 Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-gutter-desktop">
          {players.map((player, idx) => (
            <div key={idx} className="anim-item border border-surface-container-highest bg-surface-container-lowest p-4 flex flex-col justify-between">
              <div>
                <div className="aspect-[3/4] bg-surface-container mb-4 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover grayscale"
                    alt={`Portrait of ${player.name}`}
                    src={player.img}
                  />
                  <span className={`absolute top-2 right-2 font-mono-label text-mono-label px-1.5 py-0.5 ${player.tagStyle}`}>
                    {player.tag}
                  </span>
                </div>
                <span className="font-mono-spec text-mono-spec text-secondary uppercase block">{player.number}</span>
                <h4 className="font-headline-sm text-headline-sm text-primary uppercase mt-1">{player.name}</h4>
                <p className="font-mono-label text-mono-label text-secondary mt-1">{player.role}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-surface-container-highest">
                <p className="font-mono-spec text-mono-spec text-secondary">{player.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
