'use client';

import { motion } from 'framer-motion';
import { Eye, Target, Heart } from 'lucide-react';
import { ABOUT_DATA } from '@/lib/constants';

export default function About() {
  return (
    <section id="tentang-kami" className="py-20 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Tag & Heading */}
        <div className="mb-16">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-3">
            {ABOUT_DATA.tag}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0D4D44] tracking-tight leading-[1.2]">
                {Array.isArray(ABOUT_DATA.title) ? (
                  ABOUT_DATA.title.map((line, idx) => (
                    <span key={idx} className="block">
                      {line}
                    </span>
                  ))
                ) : (
                  ABOUT_DATA.title
                )}
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                {ABOUT_DATA.description}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Cards — equal width via grid, fixed height 260px */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Visi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="h-[260px] p-7 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-start"
          >
            <div className="mb-4">
              <Eye className="w-7 h-7 text-[#0D4D44]" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-extrabold text-[#0D4D44] mb-2.5">Visi</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-4">
              {ABOUT_DATA.cards[0].description}
            </p>
          </motion.div>

          {/* Card 2: Misi (Solid Dark Teal Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-[260px] p-7 rounded-2xl bg-[#0D4D44] text-white shadow-xl shadow-[#0D4D44]/15 flex flex-col justify-start"
          >
            <div className="mb-4">
              <Target className="w-7 h-7 text-[#5EEAD4]" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-2.5">Misi</h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-4">
              {ABOUT_DATA.cards[1].description}
            </p>
          </motion.div>

          {/* Card 3: Nilai-Nilai Kami */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-[260px] p-7 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-start"
          >
            <div className="mb-4">
              <Heart className="w-7 h-7 text-[#E05A47]" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-extrabold text-[#0D4D44] mb-2.5">Nilai-Nilai Kami</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              {ABOUT_DATA.cards[2].bullets?.map((bullet, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E05A47] shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 4 Stats Numbers Strip */}
        <div className="pt-12 border-t border-gray-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {ABOUT_DATA.stats.map((stat, idx) => (
              <div key={idx} className="p-2 sm:p-4">
                <p className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#0D4D44] tracking-tight mb-2 leading-none">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

