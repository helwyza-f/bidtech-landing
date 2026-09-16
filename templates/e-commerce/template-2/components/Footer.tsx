'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
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
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef }
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer ref={containerRef} className="w-full bg-white border-t border-[#e2e2e2]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-20">
        {/* Newsletter VIP Sign-up Strip */}
        <div className="anim-item mb-14 pb-12 border-b border-[#e2e2e2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <h3 className="text-[24px] md:text-[28px] font-extrabold text-[#1a1c1c] uppercase tracking-tight leading-tight">
                BERGABUNG KE VAULT LEDGER UNTUK RILIS LANGKA
              </h3>
              <p className="text-[14px] text-[#7e7576]">
                Dapatkan notifikasi prioritas rahasia saat edisi terbatas deadstock AF1 tiba di brankas arsip.
              </p>
            </div>
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="h-12 px-4 bg-[#f9f9f9] border border-[#1a1c1c] flex items-center font-mono text-[#1a1c1c] text-[13px]">
                  ✓ Akses terdaftar. Selamat datang di jaringan Vault Ledger.
                </div>
              ) : (
                <form className="flex flex-col sm:flex-row gap-0" onSubmit={handleSubscribe}>
                  <input
                    className="flex-1 h-12 bg-white border border-[#e2e2e2] px-4 font-sans text-[14px] text-[#1a1c1c] placeholder:text-[#7e7576] focus:border-[#1a1c1c] focus:outline-none rounded-none"
                    placeholder="kolektor@domain.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="h-12 px-8 bg-black text-white font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shrink-0"
                    type="submit"
                  >
                    DAFTAR AKSES →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {/* Col 1: Catalog Silhouettes */}
          <div className="anim-item space-y-4">
            <p className="font-mono text-[11px] uppercase text-[#7e7576] tracking-wider font-semibold">
              01 // SILUET KATALOG
            </p>
            <ul className="space-y-2.5">
              {[
                { name: "Air Force 1 '07 Low", href: "#catalog" },
                { name: "Air Force 1 Mid Cut", href: "#catalog" },
                { name: "Air Force 1 High '07", href: "#catalog" },
                { name: "Seri Shadow & Fontanka", href: "#catalog" },
                { name: "Edisi Luxe & LV8", href: "#catalog" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    className="text-[#1a1c1c] text-[14px] underline underline-offset-4 decoration-[#cfc4c5] hover:decoration-[#1a1c1c] transition-all"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Archive Heritage */}
          <div className="anim-item space-y-4">
            <p className="font-mono text-[11px] uppercase text-[#7e7576] tracking-wider font-semibold">
              02 // WARISAN ARSIP
            </p>
            <ul className="space-y-2.5">
              {[
                { name: "Arsip Siluet", href: "#silhouette-archive" },
                { name: "Cetak Biru Bruce Kilgore (1982)", href: "#story" },
                { name: "Enam Atlet Orisinal (\"Original Six\")", href: "#story" },
                { name: "Klub Warna Bulanan (Color of the Month)", href: "#story" },
                { name: "Kisah & Filosofi", href: "#story" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    className="text-[#1a1c1c] text-[14px] underline underline-offset-4 decoration-[#cfc4c5] hover:decoration-[#1a1c1c] transition-all"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Vault Services & Authentication */}
          <div className="anim-item space-y-4">
            <p className="font-mono text-[11px] uppercase text-[#7e7576] tracking-wider font-semibold">
              03 // LAYANAN VAULT
            </p>
            <ul className="space-y-2.5">
              {[
                { name: "Asal-Usul & Buku Besar", href: "#reviews" },
                { name: "Protokol Verifikasi Fisik", href: "#reviews" },
                { name: "Penyimpanan Berpengatur Suhu", href: "#reviews" },
                { name: "Ulasan", href: "#reviews" },
                { name: "Status Sistem", href: "#reviews" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    className="text-[#1a1c1c] text-[14px] underline underline-offset-4 decoration-[#cfc4c5] hover:decoration-[#1a1c1c] transition-all"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Protocols */}
          <div className="anim-item space-y-4">
            <p className="font-mono text-[11px] uppercase text-[#7e7576] tracking-wider font-semibold">
              04 // HUKUM &amp; PROTOKOL
            </p>
            <ul className="space-y-2.5">
              {[
                { name: "Syarat & Ketentuan", href: "#reviews" },
                { name: "Kebijakan Privasi", href: "#reviews" },
                { name: "Kebijakan Pengembalian & Escrow", href: "#reviews" },
                { name: "Garansi Keaslian", href: "#reviews" },
                { name: "Ekspedisi Berasuransi", href: "#reviews" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    className="text-[#1a1c1c] text-[14px] underline underline-offset-4 decoration-[#cfc4c5] hover:decoration-[#1a1c1c] transition-all"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges & Currency Selector */}
        <div className="anim-item py-6 border-y border-[#e2e2e2] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[11px] text-[#7e7576]">
          <div className="flex items-center space-x-6 flex-wrap gap-y-2">
            <span className="flex items-center gap-1.5 text-[#1a1c1c] font-semibold">
              <span className="w-2 h-2 bg-[#1a1c1c]"></span> VAULT TERVERIFIKASI ISO 9001
            </span>
            <span>BCA / MANDIRI / QRIS / VISA</span>
            <span>KURIR EKSPRES INDONESIA</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="uppercase">MATA UANG:</span>
            <button
              onClick={() => setCurrency('IDR')}
              className={`font-bold transition-colors ${
                currency === 'IDR' ? 'text-[#1a1c1c] underline underline-offset-2' : 'hover:text-[#1a1c1c]'
              }`}
              type="button"
            >
              IDR (Rp)
            </button>
            <span>/</span>
            <button
              onClick={() => setCurrency('USD')}
              className={`font-bold transition-colors ${
                currency === 'USD' ? 'text-[#1a1c1c] underline underline-offset-2' : 'hover:text-[#1a1c1c]'
              }`}
              type="button"
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Copyright & Brand Stamp */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-[20px] font-extrabold text-[#1a1c1c] tracking-tight uppercase">
            FORCEVAULT
          </div>
          <div className="font-mono text-[10px] text-[#7e7576] tracking-wider text-left md:text-right uppercase">
            © 2024 FORCEVAULT ARCHIVE. SELURUH SPESIFIKASI TERDAFTAR. HAK CIPTA DILINDUNGI UNDANG-UNDANG.
          </div>
        </div>
      </div>
    </footer>
  );
}
