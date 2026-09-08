'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BadgeCheck, MapPin, Award, Flag, Images, ChevronRight } from 'lucide-react';
import { SITE_INFO } from '@/constants';
import { getAssetPath } from '@/lib/utils';

export const Hero: React.FC = () => {
  return (
    <section id="beranda" className="relative bg-hkti-forest text-white overflow-hidden py-16 sm:py-24 lg:py-28">
      {/* Background Hero Image with Photographic Ambience */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <img
          src={getAssetPath('/images/hero.webp')}
          alt="Kongres Nasional Kepemimpinan & Inovasi"
          className="w-full h-full object-cover object-right lg:object-center opacity-35 sm:opacity-45 filter contrast-105 brightness-95"
        />
        {/* Deep Forest Green Gradient Overlay ensuring text legibility on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-hkti-dark/95 via-hkti-forest/90 to-hkti-forest/45 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-hkti-dark/70 via-transparent to-hkti-dark/40" />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 hero-pattern opacity-30" />
      </motion.div>

      {/* Background Agro Silhouette Subtle Glows */}
      <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-[#904D00]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 -top-20 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">

          {/* Metadata Badge: Dewan Pimpinan Pill Card & Location */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3.5"
          >
            {/* Dewan Pimpinan Pill Card */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200 tracking-wide uppercase">
              <BadgeCheck className="w-4 h-4 text-[#FFD6A5] flex-shrink-0" />
              <span>DEWAN PIMPINAN PUSAT • PERIODE 2026–2030</span>
            </div>

            {/* Separated Location Badge */}
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200/90 tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
              <span>Sekretariat Nasional</span>
            </div>
          </motion.div>

          {/* Authoritative H1 Title: Sequential word-by-word reveal ("muncul satu-satu") */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.12,
                },
              },
            }}
            className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.15] flex flex-wrap gap-x-2.5 sm:gap-x-3.5 gap-y-1 sm:gap-y-2"
          >
            {SITE_INFO.name.split(' ').map((word, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Descriptive Subhead: Sequential phrase entrance animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.8,
                },
              },
            }}
            className="text-base sm:text-lg text-emerald-100 font-normal leading-relaxed max-w-2xl flex flex-wrap gap-x-1.5"
          >
            {[
              'Wadah kolaborasi kepemimpinan,',
              'transformasi sosial,',
              'dan inovasi strategis generasi muda dalam memperkuat kemandirian',
              'dan integritas bangsa menuju Indonesia Emas.',
            ].map((phrase, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="inline-block"
              >
                {phrase}
              </motion.span>
            ))}
          </motion.div>

          {/* Slogan Card Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-[#062418]/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-all hover:bg-[#062418] group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#BF8E3D] to-[#8C6424] flex items-center justify-center flex-shrink-0 text-white shadow-md group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
                SEMBOYAN UTAMA PERJUANGAN
              </span>
              <span className="text-base sm:text-xl font-extrabold tracking-tight text-white">
                “{SITE_INFO.slogan}”
              </span>
            </div>
          </motion.div>

          {/* Action CTA Buttons: Mobile (Stacked) & Desktop (Horizontal side-by-side like reference) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg pt-1"
          >
            {/* Mobile View (< sm): Stacked full-width buttons with ChevronRight, updated to #904D00 */}
            <div className="sm:hidden flex flex-col gap-3">
              {/* Button 1 Mobile: Jelajahi Visi & Misi */}
              <a
                href="#visi-misi"
                className="w-full flex items-center justify-between bg-[#904D00] hover:bg-[#783E00] text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center bg-white/10">
                    <Flag className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>Jelajahi Visi & Misi</span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/90 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Button 2 Mobile: Galeri Dokumentasi & Kegiatan */}
              <Link
                href="/galeri"
                className="w-full flex items-center justify-between bg-[#08291D]/90 hover:bg-[#0B3525] text-white font-bold text-sm px-5 py-3.5 rounded-xl border border-emerald-500/40 backdrop-blur-sm shadow-sm transition-all duration-200 active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg border border-white/30 flex items-center justify-center bg-white/5">
                    <Images className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>Galeri Dokumentasi & Kegiatan</span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Desktop / Website View (>= sm): Horizontal side-by-side buttons exactly as in reference */}
            <div className="hidden sm:flex items-center gap-3.5">
              {/* Button 1 Desktop: Jelajahi Visi & Misi (#904D00 + Flag icon) */}
              <a
                href="#visi-misi"
                className="inline-flex items-center gap-2.5 bg-[#904D00] hover:bg-[#783E00] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Flag className="w-4 h-4 text-white" />
                <span>Jelajahi Visi & Misi</span>
              </a>

              {/* Button 2 Desktop: Galeri Dokumentasi & Kegiatan (Translucent dark green + Images icon) */}
              <Link
                href="/galeri"
                className="inline-flex items-center gap-2.5 bg-[#1b5e3f]/80 hover:bg-[#206e4a] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-emerald-400/20 backdrop-blur-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Images className="w-4 h-4 text-white" />
                <span>Galeri Dokumentasi & Kegiatan</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
