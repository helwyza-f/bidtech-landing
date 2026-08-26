'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROGRAMS } from '@/lib/constants';

import { Button } from '@/components/ui/button';

interface ProgramsProps {
  limit?: number;
  showFilters?: boolean;
  showViewAllButton?: boolean;
}

export default function Programs({
  limit,
  showFilters = true,
  showViewAllButton = false,
}: ProgramsProps) {
  const [selectedCategory, setSelectedCategory] = useState('Semua Program');

  const categories = ['Semua Program', 'Pendidikan', 'Kesehatan', 'Pemberdayaan'];

  const filteredPrograms =
    selectedCategory === 'Semua Program'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === selectedCategory);

  const displayPrograms = limit ? filteredPrograms.slice(0, limit) : filteredPrograms;

  return (
    <section id="program" className="py-20 md:py-24 bg-[#F4F2EB] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-2">
              PROGRAM KAMI
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0D4D44] tracking-tight">
              Program & aktivitas
            </h2>
          </div>

          {limit && (
            <Link
              href="/program"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D4D44] hover:text-[#072C27] transition-colors group"
            >
              <span>Lihat Semua Program</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Filter Pills */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-2.5 mb-12">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {displayPrograms.map((program) => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#E05A47] block mb-2">
                      {program.tag}
                    </span>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-[#0D4D44] transition-colors leading-snug">
                      {program.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 line-clamp-4">
                      {program.description}
                    </p>
                  </div>

                  <div>
                    <Link
                      href="/#kontak"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#0D4D44] hover:underline transition-colors"
                    >
                      <span>Selengkapnya</span>
                      <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-[#0D4D44] transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Programs CTA Button */}
        {showViewAllButton && (
          <div className="mt-12 text-center">
            <Link href="/program">
              <Button className="bg-[#0D4D44] hover:bg-[#072C27] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105 inline-flex items-center gap-2">
                <span>Lihat Semua Program</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
