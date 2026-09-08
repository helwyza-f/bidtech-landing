'use client';

import React from 'react';
import Link from 'next/link';
import { Maximize2, Camera, Calendar, Users, Flag, Award, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS } from '@/constants';
import { GalleryItem } from '@/types';
import { FadeIn } from '@/components/ui/MotionWrapper';
import { getAssetPath } from '@/lib/utils';

interface GalleryProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenLightbox }) => {
  return (
    <section id="galeri" className="py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-hkti-forest uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-hkti-gold" />
              <span>ARSIP & AKTIVITAS RESMI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-hkti-slate tracking-tight">
              Galeri Dokumentasi Kegiatan
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mt-1.5">
              Rekam jejak kongres nasional, konsolidasi pimpinan wilayah, dan program inovasi sosial Aliansi Kepemimpinan Indonesia.
            </p>
          </div>

        </FadeIn>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">

          {/* Card 1: Featured Large Card (Col 7) */}
          {GALLERY_ITEMS[0] && (
            <FadeIn delay={0.1} className="md:col-span-7 min-w-0 w-full">
              <div
                onClick={() => onOpenLightbox(GALLERY_ITEMS[0])}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] shadow-xs cursor-pointer border border-slate-200 w-full h-full"
              >
                <img
                  src={getAssetPath(GALLERY_ITEMS[0].imageUrl)}
                  alt={GALLERY_ITEMS[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (GALLERY_ITEMS[0].fallbackUrl && target.src !== GALLERY_ITEMS[0].fallbackUrl) {
                      target.src = GALLERY_ITEMS[0].fallbackUrl;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFDCC3] mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#FFDCC3]/80" />
                    <span>{GALLERY_ITEMS[0].category}</span>
                  </div>
                  <h4 className="text-base sm:text-xl lg:text-2xl font-bold text-white leading-tight mb-2">
                    {GALLERY_ITEMS[0].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {GALLERY_ITEMS[0].description}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </FadeIn>
          )}

          {/* Card 2: Supporting Wide Card (Col 5) */}
          {GALLERY_ITEMS[1] && (
            <FadeIn delay={0.2} className="md:col-span-5 min-w-0 w-full h-full">
              <div
                onClick={() => onOpenLightbox(GALLERY_ITEMS[1])}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] md:aspect-auto shadow-xs cursor-pointer border border-slate-200 w-full h-full min-h-[240px] sm:min-h-[280px] md:min-h-0"
              >
                <img
                  src={getAssetPath(GALLERY_ITEMS[1].imageUrl)}
                  alt={GALLERY_ITEMS[1].title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (GALLERY_ITEMS[1].fallbackUrl && target.src !== GALLERY_ITEMS[1].fallbackUrl) {
                      target.src = GALLERY_ITEMS[1].fallbackUrl;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFDCC3] mb-1.5">
                    <Users className="w-3.5 h-3.5 text-[#FFDCC3]/80" />
                    <span>{GALLERY_ITEMS[1].category}</span>
                  </div>
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white leading-snug mb-1.5">
                    {GALLERY_ITEMS[1].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {GALLERY_ITEMS[1].description}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </FadeIn>
          )}

          {/* Bottom Row: 3 Cards (Cards 3, 4, 5 - Col 4 each) */}
          {GALLERY_ITEMS.slice(2, 5).map((item, index) => (
            <FadeIn key={item.id} delay={0.1 * (index + 1)} className="md:col-span-4 min-w-0 w-full">
              <div
                onClick={() => onOpenLightbox(item)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/11] shadow-xs cursor-pointer border border-slate-200 w-full"
              >
                <img
                  src={getAssetPath(item.imageUrl)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (item.fallbackUrl && target.src !== item.fallbackUrl) {
                      target.src = item.fallbackUrl;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[11px] font-semibold text-[#FFDCC3] mb-1 block">
                    {item.category}
                  </span>
                  <h4 className="text-sm sm:text-[15px] font-bold text-white leading-snug">
                    {item.title}
                  </h4>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </FadeIn>
          ))}

        </div>

        {/* Bottom Action CTA */}
        <FadeIn delay={0.25} className="mt-10 sm:mt-12 text-center flex justify-center">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-hkti-mint hover:bg-emerald-100 text-hkti-forest border border-emerald-300/80 text-sm font-bold shadow-xs hover:shadow-card-hover transition-all duration-200 group"
          >
            <span>Lihat Semua Arsip Galeri</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-hkti-forest" />
          </Link>
        </FadeIn>

      </div>
    </section>
  );
};
