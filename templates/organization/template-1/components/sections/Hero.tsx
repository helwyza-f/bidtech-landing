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
      className="relative min-h-[100dvh] flex flex-col justify-center pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20 overflow-hidden"
    >
      {/* ─── Background: Scroll-Driven Ken Burns ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: bgScale, y: bgY }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "") + "/images/hero.webp"}
            alt="Bersama Membangun Masa Depan yang Berkelanjutan"
            className="w-full h-full object-cover object-[center_35%] sm:object-center"
          />
        </motion.div>
        {/* Vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50" />
      </div>

      {/* ─── Main Content: Fade Out on Scroll ─── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full"
        style={{ opacity: textOpacity }}
      >
        <div className="max-w-2xl text-left">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[40px] sm:text-5xl md:text-6xl lg:text-[66px] font-black text-white tracking-tight leading-[1.1] sm:leading-[1.08] mb-5 sm:mb-6 drop-shadow-md"
          >
            Bersama Membangun <br />
            Masa Depan yang <br />
            <span className="text-[#48B800] relative inline-block">
              Berkelanjutan
              {/* Garis lengkung dekoratif */}
              <svg
                className="absolute -bottom-2.5 right-0 w-[65%] h-3.5 sm:h-4 text-[#48B800] pointer-events-none overflow-visible"
                viewBox="0 0 250 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 13C65 4 185 3 247 11"
                  stroke="currentColor"
                  strokeWidth="4"
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
            className="text-base sm:text-lg md:text-xl text-gray-100/95 leading-relaxed mb-8 sm:mb-10 max-w-xl font-normal drop-shadow-sm"
          >
            Menciptakan dampak nyata melalui pendidikan, pemberdayaan masyarakat, dan pelestarian lingkungan untuk masa depan yang lebih baik.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 sm:gap-4"
          >
            <Link href="/program">
              <button className="bg-[#48B800] hover:bg-[#3ea200] text-white font-extrabold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full inline-flex items-center gap-2.5 shadow-xl shadow-[#48B800]/30 transition-all hover:scale-105 active:scale-95">
                <span>Jelajahi Program</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </Link>

            <Link href="/tentang-kami">
              <button className="bg-black/40 hover:bg-white/20 border border-white/40 hover:border-white text-white font-bold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full inline-flex items-center gap-2.5 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                <span>Tentang Kami</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
              </button>
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
