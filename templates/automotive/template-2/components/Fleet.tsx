"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLEET } from '@/lib/constants';
import TiltCard from '@/components/common/TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function Fleet() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.fleet-header', {
      scrollTrigger: {
        trigger: '.fleet-header',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.tilt-wrapper', {
      scrollTrigger: {
        trigger: '.fleet-grid',
        start: 'top 75%',
      },
      scale: 0.95,
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <section ref={container} id="armada" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="fleet-header text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-primary text-xs font-bold tracking-widest uppercase mb-4 rounded-sm">
            Pilihan Armada
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Cari Mobil Favorit Anda
          </h2>
          <p className="text-gray-600">
            Pilih dari berbagai armada terawat kami yang disesuaikan dengan kebutuhan Anda. Semua kendaraan dalam kondisi prima dan siap jalan.
          </p>
        </div>

        <div className="fleet-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLEET.map((car) => (
            <TiltCard key={car.id} className="tilt-wrapper h-full" intensity={12}>
              <div className="fleet-card group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#FFCC00]/30 transition-shadow relative flex flex-col h-full">
              {car.popular && (
                <div className="absolute top-4 right-4 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full z-10 uppercase">
                  Pilihan Utama
                </div>
              )}
              
              <div className="h-48 bg-white relative p-4 flex items-center justify-center">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-1">{car.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{car.category}</p>
                
                <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500 block mb-0.5">Mulai dari</span>
                    <span className="font-bold text-lg">Rp {car.price.toLocaleString('id-ID')}</span>
                    <span className="text-xs text-gray-500">/hari</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 bg-white border border-foreground text-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-black">
                  Pilih Mobil
                </button>
              </div>
            </div>
            </TiltCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-primary-hover text-black font-bold px-8 py-3.5 rounded-full transition-colors inline-block">
            Lihat Semua Armada
          </button>
        </div>

      </div>
    </section>
  );
}
