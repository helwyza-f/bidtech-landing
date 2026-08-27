'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/constants';
import GalleryModal, { GalleryItem } from '@/components/ui/GalleryModal';

const ITEMS_PER_PAGE = 9;

export default function GalleryGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [direction, setDirection] = useState(0);
  
  // Dynamically calculate total pages from actual data
  const totalPages = Math.max(1, Math.ceil(GALLERY_IMAGES.length / ITEMS_PER_PAGE));

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPhotos = GALLERY_IMAGES.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Modal navigation with direction tracking
  const handleModalNext = () => {
    if (!selectedImage) return;
    setDirection(1);
    const currentIndex = GALLERY_IMAGES.findIndex((img) => img.id === selectedImage.id);
    const nextIdx = (currentIndex + 1) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[nextIdx]);
  };

  const handleModalPrev = () => {
    if (!selectedImage) return;
    setDirection(-1);
    const currentIndex = GALLERY_IMAGES.findIndex((img) => img.id === selectedImage.id);
    const prevIdx = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[prevIdx]);
  };

  return (
    <section className="py-12 md:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12 text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-2"
          >
            DOKUMENTASI KAMI
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0D4D44] tracking-tight mb-3"
          >
            Galeri & Dokumentasi Kegiatan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed font-normal"
          >
            Potret kegiatan dan kisah inspiratif yang mencerminkan komitmen kami dalam mendukung tumbuh kembang anak dan pemberdayaan komunitas.
          </motion.p>
        </motion.div>

        {/* 3x3 Photo Grid with Paper Stack subtle effect */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
        >
          {currentPhotos.map((photo, idx) => (
            <motion.div
              key={`${photo.id}-${idx}`}
              onClick={() => {
                setDirection(0);
                setSelectedImage(photo);
              }}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.1 }}
              whileHover={{ y: -8, scale: 1.02, rotate: idx % 2 === 0 ? 0.75 : -0.75 }}
              className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/25 transition-all duration-300 group bg-gray-100 aspect-[3/4] cursor-pointer border border-black/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover Dark Gradient Overlay & Animated Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#48B800] mb-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  DOKUMENTASI
                </span>
                <p className="text-white font-bold text-sm sm:text-base leading-snug drop-shadow-md transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {photo.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 select-none">
            {/* Previous Arrow */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-700 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Dynamic Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Arrow */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-700 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Halaman Berikutnya"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>

      {/* Gallery Popup Lightbox Modal with Paper Stack & 3D Flip */}
      <GalleryModal
        isOpen={selectedImage !== null}
        item={selectedImage}
        direction={direction}
        onClose={() => setSelectedImage(null)}
        onPrev={handleModalPrev}
        onNext={handleModalNext}
      />
    </section>
  );
}

