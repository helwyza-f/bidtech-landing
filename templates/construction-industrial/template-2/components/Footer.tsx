"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLenis } from '@studio-freight/react-lenis';
import { COMPANY_INFO } from '@/lib/constants';

export default function Footer() {
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    if (lenis) {
      lenis.scrollTo(targetElement as HTMLElement, {
        offset: -85,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group inline-block">
              <div className="bg-white p-2 rounded-xl inline-flex group-hover:scale-105 transition-transform">
                <Image 
                  src="/images/hero/logo-utama.png" 
                  alt={COMPANY_INFO.name} 
                  width={240} 
                  height={60} 
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              {COMPANY_INFO.description}
            </p>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-300">
                <span className="material-symbols-outlined text-xs text-emerald-400">verified</span>
                <span>ISO 9001:2015</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-300">
                <span className="material-symbols-outlined text-xs text-emerald-400">verified</span>
                <span>SMK3 Kemnaker</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-300">
                <span className="material-symbols-outlined text-xs text-emerald-400">verified</span>
                <span>SILO Resmi</span>
              </span>
            </div>
          </div>

          {/* Col 3: Navigasi */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 font-heading mb-4">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#beranda" onClick={(e) => handleNavClick(e, '#beranda')} className="hover:text-white transition-colors cursor-pointer">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#katalog" onClick={(e) => handleNavClick(e, '#katalog')} className="hover:text-white transition-colors cursor-pointer">
                  Katalog Alat Berat
                </a>
              </li>
              <li>
                <a href="#keunggulan" onClick={(e) => handleNavClick(e, '#keunggulan')} className="hover:text-white transition-colors cursor-pointer">
                  Standar Mutu & K3
                </a>
              </li>
              <li>
                <a href="#proyek" onClick={(e) => handleNavClick(e, '#proyek')} className="hover:text-white transition-colors cursor-pointer">
                  Galeri Konstruksi
                </a>
              </li>
              <li>
                <a href="#tim" onClick={(e) => handleNavClick(e, '#tim')} className="hover:text-white transition-colors cursor-pointer">
                  Tim Insinyur & Ahli
                </a>
              </li>
              <li>
                <a href="#quote" onClick={(e) => handleNavClick(e, '#quote')} className="hover:text-white transition-colors cursor-pointer">
                  Pengajuan Sewa
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Kategori Alat */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 font-heading mb-4">
              Armada Utama
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Mining Dump Truck 400T</li>
              <li>Excavator Crawler 30T - 50T</li>
              <li>All-Terrain Crane 250T</li>
              <li>Bulldozer Ripping D8T</li>
              <li>Wheel Loader & Grader</li>
              <li>Vibratory Compactor 20T</li>
            </ul>
          </div>

          {/* Col 5: Kontak & Workshop */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 font-heading mb-4">
              Kontak Kantor
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <span className="text-white font-bold block mb-0.5">Kantor Pusat:</span>
                <p className="leading-relaxed">{COMPANY_INFO.address}</p>
              </div>
              <div>
                <span className="text-white font-bold block mb-0.5">Workshop Kaltim:</span>
                <p className="leading-relaxed">{COMPANY_INFO.branchBalikpapan}</p>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-orange-400 font-bold block text-sm">{COMPANY_INFO.hotline}</span>
                <span className="text-slate-500 block">{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; 2026 {COMPANY_INFO.name}. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-6 text-slate-400">
            <span className="hover:text-white transition-colors cursor-pointer">Syarat & Ketentuan Sewa</span>
            <span className="hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</span>
            <span className="hover:text-white transition-colors cursor-pointer">Panduan Keselamatan K3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
