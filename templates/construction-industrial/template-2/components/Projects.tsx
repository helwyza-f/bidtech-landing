"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".projects-header-anim",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );

    gsap.fromTo(".project-card-anim",
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );
  }, { scope: containerRef });

  const projectsData = [
    {
      tahap: "TAHAP 01",
      status: "Selesai",
      statusColor: "emerald",
      location: "Proyek Jalan Tol Trans-Sumatra",
      title: "Pembersihan Lahan & Perataan Tanah",
      desc: "Pembersihan vegetasi, perataan topografi, dan cut-and-fill volume masif untuk persiapan koridor jalan tol.",
      armada: "Buldoser D85, Motor Grader 140K",
      image: "/images/projects/pembersihan_lahan.jpg"
    },
    {
      tahap: "TAHAP 02",
      status: "Selesai",
      statusColor: "emerald",
      location: "Dermaga Pelabuhan Logistik Nusantara",
      title: "Mobilisasi Alat Berat & Logistik",
      desc: "Mobilisasi armada tonase tinggi menggunakan multi-axle lowbed trailer dengan pengawalan K3 ketat.",
      armada: "Multi-Axle Lowbed Trailer",
      image: "/images/projects/mobilisasi_alat_berat.jpg"
    },
    {
      tahap: "TAHAP 03",
      status: "Berlangsung",
      statusColor: "orange",
      location: "Area Bendungan Strategis Nasional",
      title: "Penggalian Pondasi Dalam",
      desc: "Penggalian batuan dasar dan struktur diaphragm wall untuk penahan tekanan air debit tinggi bendungan.",
      armada: "Crawler Excavator 30T, Slurry Crane",
      image: "/images/projects/penggalian_pondasi.jpg"
    },
    {
      tahap: "TAHAP 04",
      status: "Berlangsung",
      statusColor: "orange",
      location: "Proyek Flyover Metropolis Tahap II",
      title: "Pemasangan Balok Girder Struktur Berat",
      desc: "Erection box girder seberat 80 ton dengan tandem crane berakurasi milimeter di tengah kepadatan kota.",
      armada: "Crane Hidrolik 100T",
      image: "/images/projects/pemasangan_girder.jpg"
    },
    {
      tahap: "TAHAP 05",
      status: "Berlangsung",
      statusColor: "orange",
      location: "Kawasan Pertambangan Nikel Terpadu",
      title: "Logistik Material Tonase Tinggi",
      desc: "Operasional continuous hauling mineral mentah 24 jam dengan pemantauan rotasi ban dan beban overload.",
      armada: "Dump Truck Tambang 50T",
      image: "/images/projects/dump_truck_tambang.jpg"
    },
    {
      tahap: "TAHAP 06",
      status: "Selesai",
      statusColor: "emerald",
      location: "Kawasan Industri Terpadu Subang",
      title: "Penyelesaian Pemadatan Tanah Dasar",
      desc: "Pemadatan tanah lapis demi lapis dengan pengujian sand-cone berkala untuk daya dukung beban kontainer berat.",
      armada: "Tandem Roller & Compactor",
      image: "/images/projects/pemadatan_tanah.jpg"
    }
  ];

  return (
    <section id="proyek" ref={containerRef} className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="projects-header-anim flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h4 className="text-orange-700 font-bold text-[11px] tracking-wider uppercase mb-2">
              ALUR EKSEKUSI OPERASIONAL
            </h4>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Galeri Proses Konstruksi
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-500 text-sm leading-relaxed">
              Dokumentasi eksekusi riil penggunaan armada alat berat di berbagai proyek strategis nasional, mengintegrasikan ketepatan waktu dengan kepatuhan zero-accident.
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((item, idx) => (
            <div
              key={idx}
              className="project-card-anim bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
            >

              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-orange-600 text-white text-[10px] font-bold tracking-wider rounded-md">
                    {item.tahap}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-bold shadow-sm ${item.statusColor === 'emerald' ? 'text-emerald-600' : 'text-orange-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.statusColor === 'emerald' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                    {item.status}
                  </span>
                </div>

                {/* Location */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-white text-[11px] font-medium">
                  <span className="material-symbols-outlined text-[14px] text-orange-400">location_on</span>
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[17px] font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-6 flex-1">
                  {item.desc}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-start gap-2">
                  <span className="text-[11px] font-bold text-slate-800">Armada:</span>
                  <span className="text-[11px] font-medium text-slate-500 leading-tight">
                    {item.armada}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
