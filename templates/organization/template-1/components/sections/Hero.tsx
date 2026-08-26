'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  ArrowRight,
  ArrowDown,
  BookOpen,
  Leaf,
  ChevronRight
} from 'lucide-react';

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.png"
          alt="Bersama Membangun Masa Depan yang Berkelanjutan"
          className="w-full h-full object-cover object-center"
        />
        {/* Enhanced Multi-stop Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-2xl text-left">

          {/* 2. Headline with Green Accent Word */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-[1.12] mb-6"
          >
            Bersama Membangun <br />
            Masa Depan yang <br />
            <span className="text-[#48B800] relative inline-block">
              Berkelanjutan
              {/* Garis lengkung dekoratif  */}
              <svg
                className="absolute -bottom-2.5 right-0 w-[60%] h-3 sm:h-4 text-[#48B800] pointer-events-none overflow-visible"
                viewBox="0 0 250 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 13C65 4 185 3 247 11"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* 3. Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-200/90 leading-relaxed mb-8 max-w-lg font-normal"
          >
            Menciptakan dampak nyata melalui pendidikan, pemberdayaan masyarakat, dan pelestarian lingkungan untuk masa depan yang lebih baik.
          </motion.p>

          {/* 4. Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/program">
              <button className="bg-[#48B800] hover:bg-[#3ea200] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 shadow-lg shadow-[#48B800]/25 transition-all hover:scale-105 active:scale-95">
                <span>Jelajahi Program</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/tentang-kami">
              <button className="bg-black/35 hover:bg-white/15 border border-white/30 hover:border-white text-white font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                <span>Tentang Kami</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
