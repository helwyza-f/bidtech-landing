'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Eye, Target, Heart, Award, Users, CheckCircle2 } from 'lucide-react';
import { ABOUT_DATA, ORGANIZATION } from '@/lib/constants';

export default function AboutDetail() {
  return (
    <div className="bg-white">
      {/* 1. Top Detail Hero: Text on Left, Image on Right */}
      <section className="pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Heading, Story & CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[56px] font-black text-gray-900 tracking-tight leading-[1.12] mb-6"
              >
                Tentang Kami
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6"
              >
                {ABOUT_DATA.description}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-sm sm:text-base text-gray-500 leading-relaxed mb-8"
              >
                Didirikan dengan tekad untuk menjembatani kesenjangan sosial, kami terus bergerak bersama relawan, mitra, dan masyarakat di berbagai penjuru tanah air untuk menciptakan peluang hidup yang lebih baik dan bermartabat.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a href={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "") + "/#kontak"}>
                  <Button
                    className="bg-[#0D4D44] hover:bg-[#072C27] text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-105 active:scale-95"
                  >
                    Bergabung Sekarang
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[360px] sm:h-[420px] lg:h-[460px] bg-gray-100 border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                  alt="Tentang Kami - Tim"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Visi, Misi & Nilai Cards */}
      <section className="py-16 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-2">
              FONDASI KAMI
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D4D44] tracking-tight">
              Visi, Misi & Nilai Utama
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Visi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group relative overflow-hidden p-8 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-2xl hover:shadow-[#0D4D44]/25 hover:bg-[#0D4D44] hover:border-[#0D4D44] transition-all duration-300 flex flex-col justify-start cursor-pointer"
            >
              {/* Ambient Glow on Hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Container with Badge */}
              <div className="w-14 h-14 rounded-2xl bg-teal-50 group-hover:bg-white/15 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                <Eye className="w-7 h-7 text-[#0D4D44] group-hover:text-[#5EEAD4] transition-colors duration-300" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-extrabold text-[#0D4D44] group-hover:text-white mb-3 transition-colors duration-300">Visi</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                {ABOUT_DATA.cards[0].description}
              </p>
            </motion.div>

            {/* Card 2: Misi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.05 }}
              className="group relative overflow-hidden p-8 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-2xl hover:shadow-[#0D4D44]/25 hover:bg-[#0D4D44] hover:border-[#0D4D44] transition-all duration-300 flex flex-col justify-start cursor-pointer"
            >
              {/* Ambient Glow on Hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Container with Badge */}
              <div className="w-14 h-14 rounded-2xl bg-teal-50 group-hover:bg-white/15 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                <Target className="w-7 h-7 text-[#0D4D44] group-hover:text-[#5EEAD4] transition-colors duration-300" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-extrabold text-[#0D4D44] group-hover:text-white mb-3 transition-colors duration-300">Misi</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                {ABOUT_DATA.cards[1].description}
              </p>
            </motion.div>

            {/* Card 3: Nilai-Nilai */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.1 }}
              className="group relative overflow-hidden p-8 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-2xl hover:shadow-[#0D4D44]/25 hover:bg-[#0D4D44] hover:border-[#0D4D44] transition-all duration-300 flex flex-col justify-start cursor-pointer"
            >
              {/* Ambient Glow on Hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Container with Badge */}
              <div className="w-14 h-14 rounded-2xl bg-red-50 group-hover:bg-white/15 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                <Heart className="w-7 h-7 text-[#E05A47] group-hover:text-[#5EEAD4] transition-colors duration-300" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-extrabold text-[#0D4D44] group-hover:text-white mb-3 transition-colors duration-300">Nilai-Nilai Kami</h3>
              <ul className="space-y-2.5 text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
                {ABOUT_DATA.cards[2].bullets?.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-2.5 group-hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle2 className="w-4 h-4 text-[#E05A47] group-hover:text-[#5EEAD4] shrink-0 transition-colors duration-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Stats Strip */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {ABOUT_DATA.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-4 rounded-xl bg-gray-50/50"
              >
                <p className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#0D4D44] tracking-tight mb-2 leading-none">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

