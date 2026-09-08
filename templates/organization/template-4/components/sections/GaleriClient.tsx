'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Calendar, Sparkles, Camera } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { LightboxModal } from '@/components/ui/LightboxModal';
import { getAssetPath } from '@/lib/utils';

export interface GalleryStoryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isWide?: boolean;
  isFullWidth?: boolean;
  hasPillBadge?: string;
}

// 10 Items for Day 1: Konferensi Nasional & Sidang Pleno
const DAY1_ITEMS: GalleryStoryItem[] = [
  // Row 1: Wide (2 col) + Single (1 col)
  {
    id: 'day1-1',
    title: 'Penandatanganan Nota Kesepahaman Kerjasama Strategis',
    category: 'AGENDA UTAMA',
    imageUrl: '/images/gallery-2.webp',
    isWide: true,
    hasPillBadge: 'DOKUMENTASI',
  },
  {
    id: 'day1-2',
    title: 'Sidang Pleno Musyawarah Nasional & Garis Kebijakan',
    category: 'PLENO',
    imageUrl: '/images/gallery-7.webp',
  },

  // Row 2: 3 Vertical Cards (1 col, 1 col, 1 col)
  {
    id: 'day1-3',
    title: 'Paparan Kunci Kepemimpinan & Inovasi Transformatif',
    category: 'PIDATO KUNCI',
    imageUrl: '/images/gallery-5.webp',
  },
  {
    id: 'day1-4',
    title: 'Soliditas Dewan Pimpinan & Delegasi Wilayah Terpilih',
    category: 'KONSOLIDASI',
    imageUrl: '/images/gallery-4.webp',
  },
  {
    id: 'day1-5',
    title: 'Forum Diskusi Panel Strategi Inovasi Pemuda',
    category: 'PANEL DISKUSI',
    imageUrl: '/images/gallery-1.webp',
  },

  // Row 3: Single (1 col) + Wide (2 col)
  {
    id: 'day1-6',
    title: 'Penyerahan Penghargaan Tokoh Penggerak & Teladan',
    category: 'PENGHARGAAN',
    imageUrl: '/images/gallery-3.webp',
  },
  {
    id: 'day1-7',
    title: 'Lokakarya Strategi Kolaborasi & Sinergi Program',
    category: 'LOKAKARYA',
    imageUrl: '/images/gallery-6.webp',
    isWide: true,
    hasPillBadge: 'FOTO BERSAMA',
  },

  // Row 4: 3 Vertical Cards (1 col, 1 col, 1 col)
  {
    id: 'day1-8',
    title: 'Aksi Nyata Relawan & Program Pemberdayaan Sosial',
    category: 'AKSI SOSIAL',
    imageUrl: '/images/gallery-8.webp',
  },
  {
    id: 'day1-9',
    title: 'Konferensi Pers Resmi & Paparan Sikap Organisasi',
    category: 'MEDIA BRIEFING',
    imageUrl: '/images/gallery-9.webp',
  },
  {
    id: 'day1-10',
    title: 'Semarak Kongres Akbar & Peneguhan Komitmen Bersama',
    category: 'KONGRES',
    imageUrl: '/images/hero.webp',
  },
];

// 8 Items for Day 2: Sidang Komisi, Pemantapan Aksi & Penutupan
const DAY2_ITEMS: GalleryStoryItem[] = [
  // Row 1: Wide (2 col) + Single (1 col)
  {
    id: 'day2-1',
    title: 'Konsolidasi Akbar & Foto Bersama Seluruh Pimpinan Wilayah (2026–2030)',
    category: 'AGENDA UTAMA DAY 2',
    imageUrl: '/images/day2/day2-1.webp',
    isWide: true,
    hasPillBadge: 'DOKUMENTASI DAY 2',
  },
  {
    id: 'day2-2',
    title: 'Sidang Komisi & Perumusan Resolusi Strategis Organisasi',
    category: 'SIDANG KOMISI',
    imageUrl: '/images/day2/day2-2.webp',
  },

  // Row 2: 3 Vertical Cards (1 col, 1 col, 1 col)
  {
    id: 'day2-3',
    title: 'Diskusi Panel Transformasi Organisasi & Tata Kelola Berintegritas',
    category: 'PANEL STRATEGIS',
    imageUrl: '/images/day2/day2-3.webp',
  },
  {
    id: 'day2-4',
    title: 'Penandatanganan Kerjasama Kemitraan Antar-Lembaga',
    category: 'KEMITRAAN',
    imageUrl: '/images/day2/day2-4.webp',
  },
  {
    id: 'day2-5',
    title: 'Rapat Koordinasi Bidang & Pemantapan Rencana Aksi Nasional',
    category: 'RAPAT KERJA',
    imageUrl: '/images/day2/day2-5.webp',
  },

  // Row 3: Single (1 col) + Wide (2 col)
  {
    id: 'day2-6',
    title: 'Pidato Penutupan oleh Ketua Umum Dewan Pimpinan',
    category: 'PIDATO PENUTUPAN',
    imageUrl: '/images/day2/day2-6.webp',
  },
  {
    id: 'day2-7',
    title: 'Penyerahan Piagam Mandat & Surat Keputusan Pengurus Wilayah',
    category: 'PENYERAHAN SK',
    imageUrl: '/images/day2/day2-7.webp',
    isWide: true,
    hasPillBadge: 'SESI PENUTUPAN',
  },

  // Row 4: Panoramic Card (Full 3 col)
  {
    id: 'day2-8',
    title: 'Pameran Inovasi Program & Resepsi Ramah Tamah Seluruh Delegasi',
    category: 'PAMERAN & RAMAH TAMAH',
    imageUrl: '/images/day2/day2-8.webp',
    isFullWidth: true,
    hasPillBadge: 'INSPIRASI BERSAMA',
  },
];

const ALL_ITEMS: GalleryStoryItem[] = [...DAY1_ITEMS, ...DAY2_ITEMS];

export const GaleriClient: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'day1' | 'day2'>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryStoryItem | null>(null);

  const getVisibleItems = () => {
    if (activeTab === 'day1') return DAY1_ITEMS;
    if (activeTab === 'day2') return DAY2_ITEMS;
    return ALL_ITEMS;
  };

  const handleOpenLightbox = (item: GalleryStoryItem) => {
    setActiveModalItem(item);
  };

  const handleCloseLightbox = () => {
    setActiveModalItem(null);
  };

  const handlePrevPhoto = () => {
    if (!activeModalItem) return;
    const items = getVisibleItems();
    const currentIndex = items.findIndex((i) => i.id === activeModalItem.id);
    if (currentIndex === -1) return;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    setActiveModalItem(items[prevIndex]);
  };

  const handleNextPhoto = () => {
    if (!activeModalItem) return;
    const items = getVisibleItems();
    const currentIndex = items.findIndex((i) => i.id === activeModalItem.id);
    if (currentIndex === -1) return;
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    setActiveModalItem(items[nextIndex]);
  };

  const currentModalIndex = activeModalItem
    ? getVisibleItems().findIndex((i) => i.id === activeModalItem.id)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Top Navigation */}
      <Header />

      {/* Breadcrumb Bar */}
      <Breadcrumb items={[{ label: 'Galeri' }]} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hkti-mint border border-emerald-200/80 text-hkti-forest text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5 text-hkti-forest" />
              <span>DOKUMENTASI RESMI • ALIANSI KEPEMIMPINAN INDONESIA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-hkti-slate tracking-tight">
              Galeri Dokumentasi Kegiatan
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-2xl mx-auto">
              Arsip visual resmi rekam jejak kongres nasional, sidang pleno, lokakarya kepemimpinan, dan jejaring kolaborasi inovasi sosial.
            </p>
          </div>

          {/* Day Filter Tab Bar */}
          <div className="flex items-center justify-center mb-8 sm:mb-12">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs gap-1 sm:gap-2 max-w-full overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-hkti-forest text-white shadow-xs'
                    : 'text-slate-600 hover:text-hkti-forest hover:bg-slate-50'
                }`}
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Semua Dokumentasi</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
                    activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {ALL_ITEMS.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('day1')}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'day1'
                    ? 'bg-hkti-forest text-white shadow-xs'
                    : 'text-slate-600 hover:text-hkti-forest hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Day 1 — Kongres & Pelantikan</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
                    activeTab === 'day1' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {DAY1_ITEMS.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('day2')}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'day2'
                    ? 'bg-hkti-forest text-white shadow-xs'
                    : 'text-slate-600 hover:text-hkti-forest hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                <span>Day 2 — Sidang & Penutupan</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
                    activeTab === 'day2' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {DAY2_ITEMS.length}
                </span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 1: DOKUMENTASI DAY 1 (KONGRES & PELANTIKAN)                       */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'day1') && (
            <div className="mb-14 sm:mb-16">
              {/* Day 1 Section Heading */}
              <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-hkti-forest uppercase tracking-wider mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-hkti-forest" />
                    <span>DOKUMENTASI HARI KE-1 (DAY 1)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-hkti-slate tracking-tight">
                    Kongres Nasional, Pelantikan & Musyawarah
                  </h2>
                </div>
                <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  10 Foto Dokumentasi
                </span>
              </div>

              {/* Day 1 Bento Story Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

                {/* --- Row 1: Wide (2 col) + Single (1 col) --- */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[0])}
                  className="col-span-1 md:col-span-2 h-[260px] sm:h-[300px] lg:h-[320px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[0].imageUrl)}
                    alt={DAY1_ITEMS[0].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:from-black/90 transition-colors" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                      {DAY1_ITEMS[0].hasPillBadge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[0].category}
                    </span>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-snug tracking-tight drop-shadow-xs max-w-xl">
                      {DAY1_ITEMS[0].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-4.webp')}
                        alt="Pengurus"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-2.webp')}
                        alt="Kader"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[1])}
                  className="col-span-1 md:col-span-1 h-[260px] sm:h-[300px] lg:h-[320px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[1].imageUrl)}
                    alt={DAY1_ITEMS[1].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[1].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY1_ITEMS[1].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-7.webp')}
                        alt="Muscab"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* --- Row 2: 3 Vertical Cards --- */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[2])}
                  className="col-span-1 md:col-span-1 h-[360px] sm:h-[400px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[2].imageUrl)}
                    alt={DAY1_ITEMS[2].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[2].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY1_ITEMS[2].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-5.webp')}
                        alt="Panji"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[3])}
                  className="col-span-1 md:col-span-1 h-[360px] sm:h-[400px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[3].imageUrl)}
                    alt={DAY1_ITEMS[3].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[3].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY1_ITEMS[3].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-4.webp')}
                        alt="Pimpinan"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[4])}
                  className="col-span-1 md:col-span-1 h-[360px] sm:h-[400px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[4].imageUrl)}
                    alt={DAY1_ITEMS[4].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[4].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY1_ITEMS[4].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-2.webp')}
                        alt="Kader"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* --- Row 3: Single (1 col) + Wide (2 col) --- */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[5])}
                  className="col-span-1 md:col-span-1 h-[260px] sm:h-[300px] lg:h-[320px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[5].imageUrl)}
                    alt={DAY1_ITEMS[5].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[5].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY1_ITEMS[5].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-3.webp')}
                        alt="Pataka"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[6])}
                  className="col-span-1 md:col-span-2 h-[260px] sm:h-[300px] lg:h-[320px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[6].imageUrl)}
                    alt={DAY1_ITEMS[6].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:from-black/90 transition-colors" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                      {DAY1_ITEMS[6].hasPillBadge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[6].category}
                    </span>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-snug tracking-tight drop-shadow-xs max-w-xl">
                      {DAY1_ITEMS[6].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-6.webp')}
                        alt="Konsolidasi"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* --- Row 4: 3 Vertical Cards --- */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.35 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[7])}
                  className="col-span-1 md:col-span-1 h-[360px] sm:h-[400px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[7].imageUrl)}
                    alt={DAY1_ITEMS[7].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[7].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY1_ITEMS[7].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-7.webp')}
                        alt="Raker"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.4 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[8])}
                  className="col-span-1 md:col-span-1 h-[360px] sm:h-[400px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[8].imageUrl)}
                    alt={DAY1_ITEMS[8].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[8].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY1_ITEMS[8].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-2.webp')}
                        alt="Tokoh"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.45 }}
                  onClick={() => handleOpenLightbox(DAY1_ITEMS[9])}
                  className="col-span-1 md:col-span-1 h-[360px] sm:h-[400px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY1_ITEMS[9].imageUrl)}
                    alt={DAY1_ITEMS[9].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                      {DAY1_ITEMS[9].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY1_ITEMS[9].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/gallery-6.webp')}
                        alt="Kebersamaan"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 2: DOKUMENTASI DAY 2 (SIDANG PLENO & PENUTUPAN)                    */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'day2') && (
            <div className="mb-14 sm:mb-16">
              {/* Day 2 Section Heading */}
              <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B87317] uppercase tracking-wider mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B87317]" />
                    <span>DOKUMENTASI HARI KE-2 (DAY 2)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-hkti-slate tracking-tight">
                    Sidang Pleno, Dialog Kelembagaan & Penutupan Acara
                  </h2>
                </div>
                <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                  8 Foto Dokumentasi
                </span>
              </div>

              {/* Day 2 Bento Story Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

                {/* --- Row 1: Wide (2 col) + Single (1 col) --- */}
                {/* Day 2 Card 1: Wide Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  onClick={() => handleOpenLightbox(DAY2_ITEMS[0])}
                  className="col-span-1 md:col-span-2 h-[260px] sm:h-[300px] lg:h-[320px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY2_ITEMS[0].imageUrl)}
                    alt={DAY2_ITEMS[0].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:from-black/90 transition-colors" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                      {DAY2_ITEMS[0].hasPillBadge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      {DAY2_ITEMS[0].category}
                    </span>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-snug tracking-tight drop-shadow-xs max-w-xl">
                      {DAY2_ITEMS[0].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/day2/day2-3.webp')}
                        alt="Pengurus"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/day2/day2-4.webp')}
                        alt="Kader"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Day 2 Card 2: Single Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  onClick={() => handleOpenLightbox(DAY2_ITEMS[1])}
                  className="col-span-1 md:col-span-1 h-[260px] sm:h-[300px] lg:h-[320px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY2_ITEMS[1].imageUrl)}
                    alt={DAY2_ITEMS[1].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      {DAY2_ITEMS[1].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY2_ITEMS[1].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/day2/day2-2.webp')}
                        alt="Doa"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* --- Row 2: 3 Vertical Cards --- */}
                {/* Day 2 Card 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  onClick={() => handleOpenLightbox(DAY2_ITEMS[2])}
                  className="col-span-1 md:col-span-1 h-[360px] sm:h-[400px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY2_ITEMS[2].imageUrl)}
                    alt={DAY2_ITEMS[2].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      {DAY2_ITEMS[2].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY2_ITEMS[2].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/day2/day2-3.webp')}
                        alt="Barisan"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Day 2 Card 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  onClick={() => handleOpenLightbox(DAY2_ITEMS[3])}
                  className="col-span-1 md:col-span-1 h-[360px] sm:h-[400px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY2_ITEMS[3].imageUrl)}
                    alt={DAY2_ITEMS[3].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      {DAY2_ITEMS[3].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY2_ITEMS[3].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/day2/day2-4.webp')}
                        alt="Kader"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Day 2 Card 5 */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  onClick={() => handleOpenLightbox(DAY2_ITEMS[4])}
                  className="col-span-1 md:col-span-1 h-[360px] sm:h-[400px] lg:h-[420px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY2_ITEMS[4].imageUrl)}
                    alt={DAY2_ITEMS[4].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      {DAY2_ITEMS[4].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY2_ITEMS[4].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/day2/day2-5.webp')}
                        alt="Panel"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* --- Row 3: Single (1 col) + Wide (2 col) --- */}
                {/* Day 2 Card 6: Single Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                  onClick={() => handleOpenLightbox(DAY2_ITEMS[5])}
                  className="col-span-1 md:col-span-1 h-[260px] sm:h-[300px] lg:h-[320px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY2_ITEMS[5].imageUrl)}
                    alt={DAY2_ITEMS[5].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:from-black/90 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      {DAY2_ITEMS[5].category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight drop-shadow-xs">
                      {DAY2_ITEMS[5].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/day2/day2-6.webp')}
                        alt="Dialog"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Day 2 Card 7: Wide Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 }}
                  onClick={() => handleOpenLightbox(DAY2_ITEMS[6])}
                  className="col-span-1 md:col-span-2 h-[260px] sm:h-[300px] lg:h-[320px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY2_ITEMS[6].imageUrl)}
                    alt={DAY2_ITEMS[6].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:from-black/90 transition-colors" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                      {DAY2_ITEMS[6].hasPillBadge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      {DAY2_ITEMS[6].category}
                    </span>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-snug tracking-tight drop-shadow-xs max-w-xl">
                      {DAY2_ITEMS[6].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/day2/day2-7.webp')}
                        alt="Penutupan"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* --- Row 4: Panoramic Card (Full 3 col) --- */}
                {/* Day 2 Card 8: Full Width Panoramic Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.35 }}
                  onClick={() => handleOpenLightbox(DAY2_ITEMS[7])}
                  className="col-span-1 md:col-span-3 h-[240px] sm:h-[280px] lg:h-[320px] relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-card-hover group cursor-pointer transition-all duration-300"
                >
                  <img
                    src={getAssetPath(DAY2_ITEMS[7].imageUrl)}
                    alt={DAY2_ITEMS[7].title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 group-hover:from-black/90 transition-colors" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                      {DAY2_ITEMS[7].hasPillBadge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      {DAY2_ITEMS[7].category}
                    </span>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-snug tracking-tight drop-shadow-xs max-w-xl">
                      {DAY2_ITEMS[7].title}
                    </h3>
                    <div className="flex items-center -space-x-1.5 mt-2.5">
                      <img
                        src={getAssetPath('/images/logo.webp')}
                        alt="AKN"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover bg-white shadow-xs"
                      />
                      <img
                        src={getAssetPath('/images/day2/day2-8.webp')}
                        alt="Audiensi"
                        className="w-6 h-6 rounded-full border-2 border-white/80 object-cover shadow-xs"
                      />
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          )}

        </div>
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Lightbox Modal (Cycles through the active set of photos) */}
      <LightboxModal
        isOpen={activeModalItem !== null}
        onClose={handleCloseLightbox}
        imageUrl={activeModalItem ? getAssetPath(activeModalItem.imageUrl) : ''}
        title={activeModalItem?.title || ''}
        category={activeModalItem?.category || ''}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        currentIndex={currentModalIndex}
        totalCount={getVisibleItems().length}
      />
    </div>
  );
};
