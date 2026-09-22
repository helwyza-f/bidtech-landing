'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.anim-item',
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef }
  );

  const navLinks = [
    { name: 'Katalog Koleksi', href: '/#catalog' },
    { name: 'Detail Sepatu', href: '/detail' },
    { name: 'Ulasan Kolektor', href: '/#reviews' },
    { name: 'Kisah & Warisan', href: '/kisah' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', handle: '@forcevault.id' },
    { name: 'TikTok', href: 'https://tiktok.com', handle: '@forcevault' },
    { name: 'Twitter / X', href: 'https://twitter.com', handle: '@forcevault' },
    { name: 'YouTube', href: 'https://youtube.com', handle: 'ForceVault' },
  ];

  return (
    <footer ref={containerRef} className="w-full bg-white border-t border-[#e2e2e2]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
        {/* Main Simple Grid: Brand, Navbar Menu, Social Media */}
        <div className="anim-item grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-10 border-b border-[#e2e2e2] items-start">
          {/* Brand Identity */}
          <div className="md:col-span-4 space-y-2">
            <Link
              href="/"
              className="text-[22px] font-extrabold text-[#1a1c1c] tracking-tight uppercase block"
            >
              FORCEVAULT
            </Link>
            <p className="font-mono text-[11px] text-[#7e7576] uppercase tracking-wider">
              Arsip Terkurasi Nike Air Force 1
            </p>
          </div>

          {/* Navigation Menu (Sesuai Navbar) */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-[11px] uppercase text-[#7e7576] tracking-wider block font-semibold">
              MENU UTAMA
            </span>
            <ul className="space-y-2 font-mono text-[13px] uppercase font-medium">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-[#1a1c1c] hover:text-[#7e7576] transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-[11px] uppercase text-[#7e7576] tracking-wider block font-semibold">
              MEDIA SOSIAL
            </span>
            <ul className="space-y-2 font-mono text-[13px]">
              {socialLinks.map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a1c1c] hover:text-[#7e7576] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="font-medium uppercase">{social.name}</span>
                    <span className="text-[11px] text-[#7e7576]">({social.handle})</span>
                    <span className="text-[11px] text-[#7e7576]">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="anim-item pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] text-[#7e7576]">
          <div>
            © 2024 FORCEVAULT ARCHIVE. HAK CIPTA DILINDUNGI.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>JAKARTA PUSAT, INDONESIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
