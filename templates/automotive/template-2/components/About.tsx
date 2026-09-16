"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%',
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: '.about-image',
        start: 'top 75%',
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="about-text">
            <div className="inline-block px-3 py-1 bg-primary text-xs font-bold tracking-widest uppercase mb-4 rounded-sm">
              Tentang Kami
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 leading-tight">
              Pengalaman yang Terpercaya Sejak Tahun 2018
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Sejak tahun 2018, Pinjam Mobil telah melayani ribuan pelanggan yang mempercayakan mobilitas mereka kepada kami, baik untuk urusan bisnis, liburan keluarga, maupun acara-acara penting.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Kami pastikan setiap armada perawatan rutin, kebersihan maksimal, serta layanan driver profesional, memberikan perjalanan standar tinggi yang aman, tenang, dan dapat diandalkan oleh siapa saja di kota-kota besar.
            </p>
            
            <div className="flex gap-10 border-t border-border pt-8">
              <div>
                <h4 className="text-3xl font-extrabold text-primary mb-1">20K+</h4>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pelanggan Puas</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-primary mb-1">200+</h4>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pilihan Armada</p>
              </div>
            </div>
          </div>
          
          {/* Right Images */}
          <div className="about-image relative h-[500px]">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-3xl overflow-hidden shadow-2xl z-10">
              <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80" alt="Driving Experience" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 w-3/4 h-2/3 rounded-3xl overflow-hidden shadow-2xl border-8 border-white z-20">
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80" alt="Our Fleet" className="w-full h-full object-cover" />
            </div>
            {/* Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-surface rounded-full blur-3xl -z-10"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
