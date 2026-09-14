"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

export function Footer() {
  const { lenis } = useLenis();
  const footerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const narrativeRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Subtle Parallax on Barber Chair Image (footer.webp)
      if (bgImageRef.current && footerRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { yPercent: -6, scale: 1.06 },
          {
            yPercent: 5,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Editorial Headline Masked Slide-Up
      const headlineSpans = [headlineLine1Ref.current, headlineLine2Ref.current].filter(
        Boolean
      ) as HTMLSpanElement[];

      if (headlineSpans.length > 0) {
        gsap.from(headlineSpans, {
          yPercent: 120,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headlineSpans[0],
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // 3. Monospace Sub-label & Narrative Text Entrance
      if (tagRef.current) {
        gsap.from(tagRef.current, {
          opacity: 0,
          x: -16,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tagRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      }

      if (narrativeRef.current) {
        gsap.from(narrativeRef.current, {
          opacity: 0,
          y: 16,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: narrativeRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // 4. CTA Action Buttons Entrance
      if (ctaButtonsRef.current) {
        gsap.from(ctaButtonsRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaButtonsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // 5. Right-side Watermark Text Entrance
      if (watermarkRef.current) {
        gsap.from(watermarkRef.current, {
          opacity: 0,
          x: 16,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: watermarkRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // 6. Staggered Entrance for the 4 Footer Columns
      if (columnsRef.current) {
        gsap.from(columnsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: columnsRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, immediate: false });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="kontak"
      className="relative w-full lg:h-[100dvh] lg:min-h-[660px] lg:max-h-[960px] flex flex-col justify-between bg-[#08080A] text-zinc-100 overflow-hidden select-none border-t border-zinc-800/80"
    >
      {/* ========================================================================= */}
      {/* 1. LARGE CTA BANNER (TOP ~58% OF VIEWPORT IN DESKTOP)                     */}
      {/* ========================================================================= */}
      <div className="relative w-full flex-1 flex flex-col justify-center overflow-hidden bg-[#08080A] py-12 sm:py-16 lg:py-8">
        {/* Parallax Background Wrapper for footer.webp */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div ref={bgImageRef} className="relative w-full h-[115%] -top-[8%]">
            <Image
              src="/images/footer.webp"
              alt="Agak Rapi Barbershop Interior"
              fill
              sizes="100vw"
              className="object-cover object-right opacity-45 sm:opacity-55 lg:opacity-70 will-change-transform"
              priority={false}
            />
          </div>
          {/* Studio Vignette & Gradients to guarantee high contrast for left text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080A] via-[#08080A]/95 sm:via-[#08080A]/85 lg:via-[#08080A]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-[#08080A]/50" />
        </div>

        {/* CTA Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Left Column: Heading & Actions */}
            <div className="lg:col-span-8 max-w-2xl">
              {/* Monospace Sub-label with slash prefix */}
              <p
                ref={tagRef}
                className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.22em] text-zinc-400 mb-2 sm:mb-3"
              >
                // SIAP TAMPIL LEBIH RAPI?
              </p>

              {/* Editorial Display Masked Headline (Calibrated to fit 1-screen viewport) */}
              <h2 className="font-display italic text-3xl sm:text-5xl lg:text-[46px] xl:text-[54px] font-bold text-white tracking-tight leading-[1.04] mb-3 sm:mb-4">
                <div className="overflow-hidden py-0.5">
                  <span ref={headlineLine1Ref} className="block will-change-transform">
                    Pesan Kursi
                  </span>
                </div>
                <div className="overflow-hidden py-0.5">
                  <span ref={headlineLine2Ref} className="block will-change-transform">
                    Kamu Sekarang.
                  </span>
                </div>
              </h2>

              {/* Sub-narrative */}
              <p
                ref={narrativeRef}
                className="text-zinc-400 font-sans text-xs sm:text-sm lg:text-[15px] leading-relaxed mb-6 sm:mb-7 max-w-md"
              >
                Potongan yang dirancang, <br className="hidden sm:inline" />
                bukan sekadar dipangkas.
              </p>

              {/* Action Buttons Row */}
              <div
                ref={ctaButtonsRef}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
              >
                <a
                  href="#reservasi"
                  className="inline-flex items-center justify-between sm:justify-start gap-4 px-5 py-3 border border-zinc-400 hover:border-white bg-black/40 hover:bg-white/10 text-white font-mono text-xs sm:text-[12px] uppercase tracking-[0.16em] font-medium transition-all group backdrop-blur-sm"
                >
                  <span>BOOK APPOINTMENT</span>
                  <span className="text-sm transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-zinc-400 hover:text-white font-mono text-xs sm:text-[12px] uppercase tracking-[0.16em] transition-colors group"
                >
                  <span>ATAU HUBUNGI KAMI</span>
                  <span className="w-10 h-px bg-zinc-600 group-hover:bg-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Right Column: Floating Watermark beside barber chair */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div
                ref={watermarkRef}
                className="text-right font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-zinc-500 uppercase leading-relaxed pb-1"
              >
                <p>AGAK RAPI.</p>
                <p>MORE THAN</p>
                <p>A HAIRCUT.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Architectural Divider Line between CTA & Links */}
      <div className="w-full border-t border-zinc-800/80 shrink-0" />

      {/* ========================================================================= */}
      {/* 2. FOOTER NAVIGATION & INFORMATION (BOTTOM ~42% OF VIEWPORT IN DESKTOP)   */}
      {/* ========================================================================= */}
      <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-8 pb-5 sm:pb-6 flex flex-col justify-between shrink-0">
        <div
          ref={columnsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8"
        >
          {/* Column 1: Brand Info & Socials */}
          <div className="lg:col-span-4 space-y-3">
            <Link
              href="#beranda"
              className="font-display italic text-xl sm:text-2xl font-bold text-white tracking-tight inline-block hover:opacity-90 transition-opacity"
            >
              {siteConfig.name}
            </Link>
            <p className="font-sans text-zinc-400 text-xs leading-relaxed max-w-sm">
              Studio perawatan rambut pria dengan pendekatan kalkulasi struktural arsitektur.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-zinc-800 hover:border-zinc-500 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full border border-zinc-800 hover:border-zinc-500 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.49 6.27 6.27 0 0 0 1.95-4.5V8.55a8.28 8.28 0 0 0 4.78 1.54V6.69z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full border border-zinc-800 hover:border-zinc-500 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <path d="M9.5 9.5a1.5 1.5 0 0 0 2.5 1.5l1-1a1.5 1.5 0 0 1 2 0l1.5 1.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigasi */}
          <div className="lg:col-span-2 sm:pl-2">
            <span className="text-zinc-500 block mb-3 uppercase tracking-widest text-[10px] sm:text-[11px]">
              // NAVIGASI
            </span>
            <ul className="space-y-2 text-zinc-300 font-mono text-xs">
              {siteConfig.navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors tracking-wider block"
                  >
                    {link.label.replace("// ", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tarif Dasar */}
          <div className="lg:col-span-3 sm:pl-2">
            <span className="text-zinc-500 block mb-3 uppercase tracking-widest text-[10px] sm:text-[11px]">
              // TARIF DASAR
            </span>
            <ul className="space-y-1.5 text-zinc-300 font-mono text-xs">
              {siteConfig.footerTariff.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span className="text-zinc-400">{item.name}</span>
                  <span className="text-zinc-200 font-medium">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Lokasi */}
          <div className="lg:col-span-3 sm:pl-2 space-y-2 font-mono text-xs">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[10px] sm:text-[11px]">
              // LOKASI
            </span>
            <p className="text-zinc-400 font-sans text-xs leading-relaxed">
              {siteConfig.location.address}
            </p>
            <div className="pt-0.5">
              <p className="text-zinc-400 text-xs">Selasa - Minggu 10.00 - 21.00</p>
            </div>
            <div className="w-5 h-px bg-zinc-700 my-1.5" />
            <div>
              <a
                href={siteConfig.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white uppercase tracking-widest text-[11px] font-semibold transition-colors"
              >
                <span>LIHAT DI MAPS</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Motto, and Lenis-Powered Scroll-to-Top */}
        <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-[10px] sm:text-[11px] font-mono">
          <p>© {new Date().getFullYear()} Agak Rapi Studio. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="tracking-widest uppercase">GOOD HAIR, BETTER DAYS.</span>
            <span className="text-zinc-700">|</span>
            <button
              type="button"
              onClick={handleScrollToTop}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Kembali ke atas"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
