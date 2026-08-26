'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/constants';

const ITEMS_PER_PAGE = 9;

export default function GalleryGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  
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

  return (
    <section className="py-12 md:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 3x3 Photo Grid */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
        >
          {currentPhotos.map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-gray-100 aspect-[3/4]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-bold text-sm sm:text-base leading-snug drop-shadow-md">
                  {photo.title}
                </p>
              </div>
            </div>
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
    </section>
  );
}
