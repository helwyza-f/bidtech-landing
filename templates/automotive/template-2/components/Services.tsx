"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '@/lib/constants';
import TiltCard from '@/components/common/TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.service-header', {
      scrollTrigger: {
        trigger: '.service-header',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.tilt-wrapper', {
      scrollTrigger: {
        trigger: '.service-grid',
        start: 'top 75%',
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <section ref={container} id="layanan" className="pt-40 md:pt-48 pb-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="service-header text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 bg-primary text-xs font-bold tracking-widest uppercase mb-4 rounded-full">
            Layanan Kami
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Solusi Perjalanan Anda
          </h2>
          <p className="text-gray-600">
            Kami menawarkan berbagai opsi layanan rental mobil untuk memenuhi kebutuhan mobilitas Anda, dari perjalanan bisnis hingga liburan keluarga.
          </p>
        </div>

        <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            // "Dengan Sopir" (idx 1) is 2-col wide, "Acara Khusus & VIP" (idx 5) is full width
            const isWideRightImg = idx === 1;
            const isFullWidthLeftImg = idx === 5;
            const hasHorizontalLayout = isWideRightImg || isFullWidthLeftImg;
            
            return (
              <TiltCard key={service.id} className={`tilt-wrapper h-full ${isWideRightImg ? 'md:col-span-2' : isFullWidthLeftImg ? 'md:col-span-2 lg:col-span-3' : 'md:col-span-1'}`} intensity={8}>
                <div 
                  className={`service-card bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#FFCC00]/30 transition-shadow flex h-full ${hasHorizontalLayout ? 'flex-col sm:flex-row' : 'flex-col'}`}
                >
                {/* Image for Full Width (Left side) */}
                {isFullWidthLeftImg && service.image && (
                  <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className={`p-8 flex flex-col justify-start flex-1 ${isFullWidthLeftImg ? 'sm:w-2/3' : isWideRightImg ? 'sm:w-1/2' : ''}`}>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-foreground">
                      {service.icon === 'car-key' ? 'key' : 
                       service.icon === 'user' ? 'person' : 
                       service.icon === 'plane' ? 'flight' : 
                       service.icon === 'map' ? 'landscape' : 
                       service.icon === 'building' ? 'domain' : 'celebration'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <Link href={service.link} className="inline-flex items-center text-primary font-bold text-xs hover:text-primary-hover uppercase tracking-widest mt-auto">
                    {service.id === 6 ? 'Hubungi Tim Spesialis' : 'Pelajari Lebih Lanjut'} <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                  </Link>
                </div>
                
                {/* Image for Wide Right (Right side) */}
                {isWideRightImg && service.image && (
                  <div className="sm:w-1/2 h-48 sm:h-auto overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                )}
                </div>
              </TiltCard>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
