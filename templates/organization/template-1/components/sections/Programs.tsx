'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROGRAMS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface ProgramsProps {
  limit?: number;
  showFilters?: boolean;
  showViewAllButton?: boolean;
}

const ITEMS_PER_PAGE = 6;

export default function Programs({
  limit,
  showFilters = true,
  showViewAllButton = false,
}: ProgramsProps) {
  const [selectedCategory, setSelectedCategory] = useState('Semua Program');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['Semua Program', 'Pendidikan', 'Kesehatan', 'Pemberdayaan'];

  const filteredPrograms =
    selectedCategory === 'Semua Program'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === selectedCategory);

  const totalPages = Math.max(1, Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE));

  const displayPrograms = limit
    ? filteredPrograms.slice(0, limit)
    : filteredPrograms.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      if (typeof window !== 'undefined') {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | HTMLElement, options?: Record<string, unknown>) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { duration: 0.7 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section id="program" className="py-16 md:py-24 bg-[#F4F2EB] scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-2"
            >
              PROGRAM KAMI
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0D4D44] tracking-tight"
            >
              Program & aktivitas
            </motion.h2>
          </div>

          {limit && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/program"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D4D44] hover:text-[#072C27] transition-colors group"
              >
                <span>Lihat Semua Program</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Filter Pills */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 md:mb-12">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D4D44] text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {displayPrograms.map((program) => (
            <a
              key={program.id}
              href={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || '') + '/#kontak'}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-xl hover:shadow-[#0D4D44]/10 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1.5"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#E05A47] block mb-2">
                    {program.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#0D4D44] transition-colors leading-snug">
                    {program.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 sm:mb-6 line-clamp-3 sm:line-clamp-4">
                    {program.description}
                  </p>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#0D4D44] transition-colors">
                    <span>Selengkapnya</span>
                    <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-[#0D4D44] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Dynamic Pagination Controls for Subpage without Limit */}
        {!limit && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-12 select-none">
            {/* Previous Arrow */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-white hover:bg-[#0D4D44] hover:border-[#0D4D44] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer active:scale-95"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>

            {/* Dynamic Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = currentPage === pageNum;
              return (
                <button
                  type="button"
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#0D4D44] text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80 shadow-sm'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Arrow */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-white hover:bg-[#0D4D44] hover:border-[#0D4D44] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer active:scale-95"
              aria-label="Halaman Berikutnya"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* View All Programs CTA Button */}
        {showViewAllButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <a href={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || '') + '/program'}>
              <Button className="bg-[#0D4D44] hover:bg-[#072C27] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 group">
                <span>Lihat Semua Program</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

