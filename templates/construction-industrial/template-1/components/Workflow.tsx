"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Workflow() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".workflow-step", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-space-2xl bg-surface-container-low border-b border-outline-variant" id="workflow">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-container text-on-secondary-fixed font-label-caps text-label-caps px-4 py-1.5 rounded-full mb-3 uppercase">
            DISIPLIN REKAYASA
          </div>
          <h2 className="font-headline-lg text-headline-lg uppercase text-on-surface">
            METODOLOGI EKSEKUSI PRESISI
          </h2>
          <p className="font-body-md text-body-md text-secondary mt-4">
            Mulai dari verifikasi tanah geoteknik hingga serah terima digital, protokol rekayasa sistematis kami menyisakan nol margin untuk kesalahan struktural.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="workflow-step border border-outline-variant bg-surface p-8 relative hover:border-primary-container transition-colors duration-300">
            <div className="font-display text-[64px] leading-none text-surface-container-highest font-bold mb-4 transition-colors group-hover:text-primary">
              01
            </div>
            <div className="w-8 h-1 bg-primary-container mb-4"></div>
            <h3 className="font-title-lg text-title-lg uppercase mb-3 text-on-surface">Audit & Survei Lokasi</h3>
            <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
              Pengeboran geoteknik, analisis tekanan beban tanah, pemetaan patahan seismik, dan pemindaian topografi LiDAR 3D milimetrik sebelum perancangan.
            </p>
            <div className="mt-6 font-label-technical text-label-technical uppercase text-secondary font-bold">
              Keluaran: INDEKS KEAMANAN GEOTEK
            </div>
          </div>
          <div className="workflow-step border border-outline-variant bg-surface p-8 relative hover:border-primary-container transition-colors duration-300">
            <div className="font-display text-[64px] leading-none text-surface-container-highest font-bold mb-4 transition-colors group-hover:text-primary">
              02
            </div>
            <div className="w-8 h-1 bg-primary-container mb-4"></div>
            <h3 className="font-title-lg text-title-lg uppercase mb-3 text-on-surface">Cetak Biru Struktural</h3>
            <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
              Pemodelan BIM LOD 400 tingkat lanjut, dinamika fluida komputasional lorong angin, pemodelan getaran dinamis, dan perincian sambungan elemen hingga.
            </p>
            <div className="mt-6 font-label-technical text-label-technical uppercase text-secondary font-bold">
              Keluaran: CETAK BIRU PE BERSERTIFIKAT
            </div>
          </div>
          <div className="workflow-step border border-outline-variant bg-surface p-8 relative hover:border-primary-container transition-colors duration-300">
            <div className="font-display text-[64px] leading-none text-surface-container-highest font-bold mb-4 transition-colors group-hover:text-primary">
              03
            </div>
            <div className="w-8 h-1 bg-primary-container mb-4"></div>
            <h3 className="font-title-lg text-title-lg uppercase mb-3 text-on-surface">Ereksi Presisi</h3>
            <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
              Penempatan *crawler crane* berat terkoordinasi, pemasangan rangka dengan panduan laser, pengujian las ultrasonik, dan pembautan tegangan terkalibrasi.
            </p>
            <div className="mt-6 font-label-technical text-label-technical uppercase text-secondary font-bold">
              Keluaran: LOG KUALITAS NDT
            </div>
          </div>
          <div className="workflow-step border border-outline-variant bg-surface p-8 relative hover:border-primary-container transition-colors duration-300">
            <div className="font-display text-[64px] leading-none text-surface-container-highest font-bold mb-4 transition-colors group-hover:text-primary">
              04
            </div>
            <div className="w-8 h-1 bg-primary-container mb-4"></div>
            <h3 className="font-title-lg text-title-lg uppercase mb-3 text-on-surface">Serah Terima & Garansi</h3>
            <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
              Tanda tangan sertifikat kepatuhan penuh, kembaran arsitektur digital sesuai pembangunan (*as-built*), manual fasilitas jangka panjang, dan garansi struktur 25 tahun kami.
            </p>
            <div className="mt-6 font-label-technical text-label-technical uppercase text-secondary font-bold">
              Keluaran: OBLIGASI STRUKTURAL 25 THN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
