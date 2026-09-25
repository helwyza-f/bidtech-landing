"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Safety() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".safety-banner", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".testimonial-card", {
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-12 sm:py-space-2xl bg-on-secondary-fixed text-surface border-b border-outline-variant/20" id="safety">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-margin">
        <div className="safety-banner border border-secondary p-5 sm:p-8 md:p-12 mb-10 sm:mb-16 bg-surface/5 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 hover:border-primary-container transition-colors duration-500">
          <div className="max-w-2xl w-full">
            <div className="inline-flex items-center gap-2 bg-primary-container text-on-secondary-fixed font-label-caps text-[11px] sm:text-label-caps px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2.5 sm:mb-3 uppercase font-bold tracking-wider">
              BUDAYA KESELAMATAN UTAMA
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg uppercase text-surface mb-2.5 sm:mb-2 leading-snug lg:leading-tight">
              LEBIH DARI 4,5 JUTA JAM KERJA AMAN TANPA LTI
            </h2>
            <p className="font-body-md text-sm sm:text-body-md text-surface-dim leading-relaxed">
              Kebijakan *zero-harm* kami mengatur setiap lokasi proyek. Kami beroperasi di bawah regulasi SMK3 Peringkat Emas yang ketat dan protokol internasional ISO 45001.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
            <div className="border border-primary-container p-3 sm:px-6 sm:py-4 text-center hover:bg-primary-container/10 transition-colors">
              <span className="font-display text-2xl sm:text-4xl lg:text-headline-lg text-primary-container block font-bold">0</span>
              <span className="font-label-technical text-[9px] sm:text-label-technical text-surface uppercase block mt-1">KECELAKAAN KEHILANGAN WAKTU</span>
            </div>
            <div className="border border-secondary p-3 sm:px-6 sm:py-4 text-center hover:bg-surface/10 transition-colors">
              <span className="font-display text-2xl sm:text-4xl lg:text-headline-lg text-surface block font-bold">100%</span>
              <span className="font-label-technical text-[9px] sm:text-label-technical text-surface-dim uppercase block mt-1">KEPATUHAN APD (PPE)</span>
            </div>
          </div>
        </div>
        <div className="mb-8 sm:mb-12">
          <span className="font-label-technical text-[10px] sm:text-label-technical uppercase text-primary-container block mb-1.5 sm:mb-2 font-bold tracking-wider">DUKUNGAN INDUSTRI</span>
          <h3 className="font-headline-md text-xl sm:text-2xl md:text-headline-md uppercase text-surface leading-snug">APA KATA PARA PEMIMPIN INFRASTRUKTUR</h3>
        </div>
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="testimonial-card border border-secondary bg-surface/5 p-5 sm:p-7 md:p-8 flex flex-col justify-between hover:bg-surface/10 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-1 text-primary-container mb-3 sm:mb-4">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-xs sm:text-body-md text-surface-container-highest italic mb-5 sm:mb-6 leading-relaxed">
                "Elevasi mengeksekusi depot distribusi otomatis seluas 85.000 m² kami tiga minggu lebih awal dari jadwal. Toleransi beton *post-tensioned* mereka berada dalam kisaran 1.5mm di seluruh pondasi."
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-secondary">
              <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-primary-container flex-shrink-0" alt="Potret Direktur Infrastruktur" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCuUSbnASBVVckI-u8hCyu8FhB3QGqLwewkviLWJpo8OcJcHcyjxfo50YYpaUMIPPlXRrUlGCoQCVZGVw1gm-zkUV1COe4ICmlykRcyNAO4qVEgyU_JEmBB9gXVy4u8wOcYloVE57FjNuSFzmSHCOSaB1jsJQ5cmuhkuWf8DkGIMO5XGqKa4hpX0RaYzYbEnakfvm2bOm7NxtWT-PZQdcSr5riUwQpcN4Bk8ch-XcJy5NsfVDM2BF3FQ" />
              <div>
                <div className="font-title-md text-sm sm:text-title-md uppercase font-bold text-surface">Bambang S. Pratama</div>
                <div className="font-label-technical text-[10px] sm:text-label-technical text-surface-dim uppercase">VP Logistik, Energetix Nusantara</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card border border-secondary bg-surface/5 p-5 sm:p-7 md:p-8 flex flex-col justify-between hover:bg-surface/10 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-1 text-primary-container mb-3 sm:mb-4">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-xs sm:text-body-md text-surface-container-highest italic mb-5 sm:mb-6 leading-relaxed">
                "Untuk rangka *truss* bentang bebas berskala mega, tidak ada firma di kawasan ini yang mampu menyaingi presisi perincian baja Elevasi. Pemodelan geser angin mereka memberi keyakinan total bagi pemangku kepentingan penerbangan kami."
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-secondary">
              <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-primary-container flex-shrink-0" alt="Potret Arsitek Principal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHPyJtFVi-I3oaV5L95TyNq-33iqjHA3eb9nBXzrWsarIUohUvFXxGpmQIdR01G9vh9LX9B09GDMZuUi-DXs07OreyIiUAxPDOdSvzd49NwlLpoGvdAomnK_oM7P__AfAXwR5z2gJ9kdI1PyxVyuNFXjQDyuotSS9X-0JLz4tRtSRSyE3_cI7VHsn0Bo4ulJF6JlUm277Twdfj9LMDjWCns4kSKCqLN1BnZPvX91cBh005eeTjSy_WVA" />
              <div>
                <div className="font-title-md text-sm sm:text-title-md uppercase font-bold text-surface">Marcus H. Wong</div>
                <div className="font-label-technical text-[10px] sm:text-label-technical text-surface-dim uppercase">Arsitek Principal, NexaTech Urban</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card border border-secondary bg-surface/5 p-5 sm:p-7 md:p-8 flex flex-col justify-between hover:bg-surface/10 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-1 text-primary-container mb-3 sm:mb-4">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-xs sm:text-body-md text-surface-container-highest italic mb-5 sm:mb-6 leading-relaxed">
                "Petugas kepatuhan keselamatan K3 mereka memegang otoritas penuh di lokasi komersial kami. Nol catatan cedera selama 14 bulan pelaksanaan pengangkatan crane di elevasi tinggi berbicara banyak tentang budaya kerja mereka."
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-secondary">
              <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-primary-container flex-shrink-0" alt="Potret Direktur Lokasi Pembangunan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApkwcyKtMOiAEFEl4jFrnssS6_1QiyTj5FfR3Rare8uOTx9u-uYkxwsl7tkYWcXmhrzxwBgw8YrMqNOnCJoeQHonbDWxzsirzrTRMDAHK-pbtDhmfOl3Q4613z77uxGe4V7Lm--3C8CLmRN10MPJB1qXYG_e0mEWkNSAPZbb7J6Y2jLyl0jCnKt9o5KD0tImCQp35GhoMgE07glmLmRLAzjovgQS2i2a-3-4E0Mscjsoi-qkwWdWfpzA" />
              <div>
                <div className="font-title-md text-sm sm:text-title-md uppercase font-bold text-surface">Dewi Anindya</div>
                <div className="font-label-technical text-[10px] sm:text-label-technical text-surface-dim uppercase">Direktur Lapangan, BuildPro Enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
