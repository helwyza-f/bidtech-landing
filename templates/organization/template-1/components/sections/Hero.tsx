'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight,
} from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress within the hero section (start → exit viewport)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Background: slow zoom + parallax pan upward
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);
  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  // Text: raw fade mapping from scroll progress
  const rawOpacity  = useTransform(scrollYProgress, [0, 0.05, 0.4, 0.45], [1, 1, 0, 0]);
  // Slow, smooth spring — low stiffness = lazy, high damping = no bounce, high mass = heavy/cinematic
  const textOpacity = useSpring(rawOpacity, { stiffness: 30, damping: 20, mass: 1.2 });

  return (
    <section
      ref={sectionRef}
      id="beranda"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden"
    >
      {/* ─── Background: Scroll-Driven Ken Burns ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: bgScale, y: bgY }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero.png"
            alt="Bersama Membangun Masa Depan yang Berkelanjutan"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      </div>

      {/* ─── Main Content: Fade Out on Scroll ─── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto"
        style={{ opacity: textOpacity }}
      >
        <div className="max-w-2xl text-left">

          {/* Headline */}
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
              {/* Garis lengkung dekoratif */}
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-200/90 leading-relaxed mb-8 max-w-lg font-normal"
          >
            Menciptakan dampak nyata melalui pendidikan, pemberdayaan masyarakat, dan pelestarian lingkungan untuk masa depan yang lebih baik.
          </motion.p>

          {/* Buttons */}
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
      </motion.div>
    </section>
  );
}
