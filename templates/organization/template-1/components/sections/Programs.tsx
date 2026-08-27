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
    <section id="program" className="py-20 md:py-24 bg-[#F4F2EB] scroll-mt-20 overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap items-center gap-2.5 mb-12"
          >
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
          </motion.div>
        )}

        {/* Program Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayPrograms.map((program, idx) => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.35,
                  delay: (idx % 3) * 0.08,
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-xl hover:shadow-[#0D4D44]/10 transition-shadow duration-300 flex flex-col group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#0D4D44] transition-colors"
                    >
                      <span>Selengkapnya</span>
                      <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-[#0D4D44] transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Programs CTA Button */}
        {showViewAllButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <Link href="/program">
              <Button className="bg-[#0D4D44] hover:bg-[#072C27] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 group">
                <span>Lihat Semua Program</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

