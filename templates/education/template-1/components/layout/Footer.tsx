'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import gsap from 'gsap';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. True 2-Wheel Kinematic Physics: Both rear & front wheels mathematically touch the hill surface at all times
      const roadPath = footerRef.current?.querySelector('#front-hill-road') as SVGPathElement | null;
      const carEl = footerRef.current?.querySelector('#footer-car') as SVGGElement | null;

      if (roadPath && carEl) {
        // Clear any inline CSS transform from previous GSAP calls so only SVG native transform attribute takes effect
        carEl.style.transform = '';

        const totalLen = roadPath.getTotalLength();
        // Starts right from the bottom slope (0%) to the right descent (96%)
        const startLen = 0;
        const endLen = totalLen * 0.95;
        const trackLen = endLen - startLen;

        const carObj = { progress: 0 };

        const updateCarPosition = () => {
          const currentLen = startLen + carObj.progress * trackLen;
          // Sample the exact contact points for both wheels (wheelbase = 23px)
          const pRear = roadPath.getPointAtLength(currentLen);
          const pFront = roadPath.getPointAtLength(Math.min(currentLen + 23, totalLen));

          const dx = pFront.x - pRear.x;
          const dy = pFront.y - pRear.y;
          const angle = Math.atan2(dy, dx);
          const deg = angle * (180 / Math.PI);

          const midX = (pRear.x + pFront.x) / 2;
          const midY = (pRear.y + pFront.y) / 2;

          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);

          // In local car coordinates:
          // Rear wheel bottom is at (-11, +2.8), Front wheel bottom is at (+12, +2.8).
          // Midpoint of wheel contacts is (+0.5, +2.8).
          // DOWNWARD_SINK = 2.0px embeds both wheels 2.0px firmly into the hill surface.
          const DOWNWARD_SINK = 2.0;
          const tx = midX - (0.5 * cosA - 2.8 * sinA);
          const ty = midY - (0.5 * sinA + 2.8 * cosA) + DOWNWARD_SINK;

          // Crucial: Use SVG native transform attribute!
          // This keeps the car coordinates locked 100% inside SVG viewBox user space (0-500 x 0-200),
          // completely eliminating any responsive scaling mismatch or floating bug across all screen widths!
          carEl.setAttribute(
            'transform',
            `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) rotate(${deg.toFixed(2)})`
          );
        };

        // Initialize position at bottom of the hill
        updateCarPosition();

        // Driving timeline along the front hill curve
        const carTl = gsap.timeline({ repeat: -1 });
        carTl
          .set(carEl, { opacity: 0 })
          .to(carEl, { opacity: 1, duration: 0.4 })
          .to(carObj, {
            progress: 1,
            duration: 6.5,
            ease: 'none',
            onUpdate: updateCarPosition,
          }, 0)
          .to(carEl, {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.in',
          }, 6.0);
      }

      // 2. Wheels spinning continuously
      gsap.to('.car-wheel-spin', {
        rotation: 360,
        transformOrigin: 'center',
        duration: 0.35,
        repeat: -1,
        ease: 'linear',
      });

      // 3. Subtle chassis suspension bounce
      gsap.to('#car-chassis', {
        y: -1.2,
        duration: 0.18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 4. Exhaust smoke puffs
      gsap.to('.car-smoke-puff', {
        x: -12,
        y: -6,
        scale: 1.8,
        opacity: 0,
        duration: 0.6,
        repeat: -1,
        stagger: 0.2,
        ease: 'power1.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-white pt-12 pb-14 sm:pb-10 relative overflow-hidden text-brand-navy border-t border-slate-100"
    >
      {/* ========================================================================= */}
      {/* ELEMENT BUKIT & MOBIL — BERADA DI DEPAN GARIS FOOTER (Z-20)               */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 right-0 pointer-events-none z-20 overflow-visible">
        <svg
          className="w-[180px] sm:w-[280px] md:w-[380px] lg:w-[480px] aspect-[500/200] overflow-visible"
          viewBox="0 0 500 200"
          fill="none"
        >
          <defs>
            {/* Gradient untuk bukit depan utama (Biru Khas SmartBelajar) */}
            <linearGradient id="hillFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Gradient untuk bukit belakang asli (Biru Muda Lembut Sesuai Awal) */}
            <linearGradient id="hillBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>

            {/* Gradient sinar lampu mobil */}
            <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Jalur Khusus Permukaan Bukit Depan (C1/C2 Continuous — Bebas Patahan) */}
          <path
            id="front-hill-road"
            d="M 0,200 C 90,155 180,105 280,105 C 370,105 440,125 500,150"
            fill="none"
            stroke="none"
          />

          {/* 1. BUKIT BELAKANG (DIKEMBALIKAN PERSIS SESUAI AWAL — Lapisan Halus di Belakang) */}
          <path
            d="M 0,200 C 110,135 220,110 340,120 C 420,130 470,100 500,95 L 500,200 Z"
            fill="url(#hillBackGrad)"
            opacity="0.55"
          />

          {/* 2. BUKIT DEPAN UTAMA (BUKIT ASLI PALING DEPAN — Menyatu Sempurna dengan Jalur Mobil) */}
          <path
            d="M 0,200 C 90,155 180,105 280,105 C 370,105 440,125 500,150 L 500,200 L 0,200 Z"
            fill="url(#hillFrontGrad)"
          />

          {/* Garis aksen tekstur di lereng bukit paling depan */}
          <g stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" opacity="0.4">
            <path d="M260,165 Q255,152 250,148" />
            <path d="M262,165 Q265,150 270,146" />
            <path d="M440,175 Q435,162 430,158" />
            <path d="M442,175 Q446,160 452,157" />
          </g>

          {/* Bunga Daisy Kecil di Lereng Bukit Depan */}
          <g transform="translate(305, 142) scale(0.9)">
            <circle cx="0" cy="0" r="3.5" fill="#FBBF24" />
            <circle cx="-5" cy="0" r="2.5" fill="white" />
            <circle cx="5" cy="0" r="2.5" fill="white" />
            <circle cx="0" cy="-5" r="2.5" fill="white" />
            <circle cx="0" cy="5" r="2.5" fill="white" />
          </g>

          {/* ===================================================================== */}
          {/* MOBIL KARTUN LUCU BERJALAN DI ATAS BUKIT BIRU                        */}
          {/* ===================================================================== */}
          <g id="footer-car" transform="translate(300, 105)">
            {/* Kepulan Asap Knalpot (Animated Smoke Puffs) */}
            <g className="car-smoke">
              <circle className="car-smoke-puff" cx="-24" cy="-6" r="2.5" fill="#FFFFFF" opacity="0.75" />
              <circle className="car-smoke-puff" cx="-29" cy="-9" r="3.5" fill="#E2E8F0" opacity="0.6" />
            </g>

            {/* Badan Mobil (Chassis with Suspension Bounce) */}
            <g id="car-chassis">
              {/* Sinar Lampu Depan (Headlight Beam) */}
              <polygon points="22,-8 55,-16 55,2 22,-2" fill="url(#headlightBeam)" />

              {/* Bodi Utama Mobil (Warna Oranye Segar SmartBelajar) */}
              <path
                d="M-20,-4 L20,-4 Q24,-4 24,-7 L23,-11 Q21,-13 16,-13 L11,-13 L5,-23 Q4,-25 -1,-25 L-11,-25 Q-16,-25 -18,-16 L-22,-11 Q-24,-7 -20,-4 Z"
                fill="#F97316"
                stroke="#EA580C"
                strokeWidth="1.2"
              />

              {/* Bumper Depan & Belakang */}
              <rect x="-23" y="-6" width="3" height="3" rx="1.5" fill="#CBD5E1" />
              <rect x="21" y="-6" width="3" height="3" rx="1.5" fill="#CBD5E1" />

              {/* Jendela Mobil (Kaca Biru Muda dengan Refleksi) */}
              <path
                d="M-1,-22 L9,-22 L14,-14 L-1,-14 Z"
                fill="#E0F2FE"
                stroke="#BAE6FD"
                strokeWidth="0.8"
              />
              <path
                d="M-3,-22 L-11,-22 Q-14,-22 -15,-16 L-3,-16 Z"
                fill="#E0F2FE"
                stroke="#BAE6FD"
                strokeWidth="0.8"
              />

              {/* Lampu Depan (Kuning Terang) */}
              <circle cx="22" cy="-8" r="2.2" fill="#FEF08A" stroke="#FDE047" strokeWidth="0.6" />

              {/* Lampu Belakang (Merah) */}
              <circle cx="-21" cy="-8" r="1.8" fill="#EF4444" />

              {/* Handle Pintu */}
              <rect x="-2" y="-10" width="3.5" height="1" rx="0.5" fill="#EA580C" />
            </g>

            {/* Roda Belakang (Spinning Wheel) */}
            <g transform="translate(-11, -2)">
              <circle cx="0" cy="0" r="4.8" fill="#1E293B" />
              <circle cx="0" cy="0" r="2.5" fill="#F1F5F9" />
              <g className="car-wheel-spin">
                <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
                <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="#94A3B8" strokeWidth="0.8" />
              </g>
            </g>

            {/* Roda Depan (Spinning Wheel) */}
            <g transform="translate(12, -2)">
              <circle cx="0" cy="0" r="4.8" fill="#1E293B" />
              <circle cx="0" cy="0" r="2.5" fill="#F1F5F9" />
              <g className="car-wheel-spin">
                <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
                <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="#94A3B8" strokeWidth="0.8" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 sm:gap-10 pb-12">
          
          {/* Brand & Social Icons (Col 1 & 2) */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <Image
                src="/images/logo.webp"
                alt="SmartBelajar"
                width={170}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </a>

            {/* Circular Social Media Badges */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-sky-100 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-sky-100 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-sky-100 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 1: Tentang Kami */}
          <div className="col-span-1">
            <h4 className="text-xs font-black text-brand-navy mb-3">Tentang Kami</h4>
            <ul className="space-y-2 text-xs font-semibold text-brand-muted">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Sejarah</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Visi &amp; Misi</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Karier</a></li>
            </ul>
          </div>

          {/* Col 2: Program */}
          <div className="col-span-1">
            <h4 className="text-xs font-black text-brand-navy mb-3">Program</h4>
            <ul className="space-y-2 text-xs font-semibold text-brand-muted">
              <li><a href="#program" className="hover:text-brand-blue transition-colors">Matematika</a></li>
              <li><a href="#program" className="hover:text-brand-blue transition-colors">Bahasa Indonesia</a></li>
              <li><a href="#program" className="hover:text-brand-blue transition-colors">English as a Foreign Language</a></li>
              <li><a href="#program" className="hover:text-brand-blue transition-colors">Keterampilan Memegang Pensil</a></li>
            </ul>
          </div>

          {/* Col 3: Informasi */}
          <div className="col-span-1">
            <h4 className="text-xs font-black text-brand-navy mb-3">Informasi</h4>
            <ul className="space-y-2 text-xs font-semibold text-brand-muted">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Biaya</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Col 4: Bantuan */}
          <div className="col-span-1">
            <h4 className="text-xs font-black text-brand-navy mb-3">Bantuan</h4>
            <ul className="space-y-2 text-xs font-semibold text-brand-muted">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Syarat &amp; Ketentuan</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 relative z-30">
          {/* Garis pemisah halus di tengah yang memudar di kanan & kiri */}
          <div className="w-full max-w-2xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6 sm:mb-8" />
          <p className="text-[11px] font-semibold text-slate-400 text-left sm:text-center max-w-[200px] sm:max-w-none">
            © 2026 SmartBelajar Indonesia. Hak Cipta Dilindungi.
          </p>
        </div>

      </div>
    </footer>
  );
}
