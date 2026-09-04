"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, Clock, ShieldCheck, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-16 sm:pt-20 md:pt-32 pb-3 sm:pb-6 md:pb-8 text-white bg-slate-950"
    >
      {/* 1. Pristine Architectural Lakeside Pavilion Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <Image
          src="/images/hero_section5.webp"
          alt="Luxury modern lakeside pavilion overlooking mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] md:object-center"
        />

        {/* Cinematic dark gradients for text contrast while keeping lake & pavilion vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 z-[1]" />
      </div>

      {/* 2. Interactive High-Res Foreground Car Layer - Glides in smoothly from the right */}
      <motion.div
        initial={{ opacity: 0, x: 380 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1.3,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="hidden md:block absolute right-[1%] lg:right-[3%] xl:right-[5%] bottom-[8%] lg:bottom-[7%] w-[58%] lg:w-[53%] xl:w-[49%] max-w-[880px] pointer-events-none z-10 select-none"
      >
        <motion.div
          animate={{
            x: mousePos.x * 10,
            y: mousePos.y * 6,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 25,
          }}
        >
          <Image
            src="/images/car_hero.webp"
            alt="BMW M4 Coupe"
            width={1536}
            height={1024}
            priority
            sizes="50vw"
            className="w-full h-auto object-contain drop-shadow-[0_28px_35px_rgba(0,0,0,0.75)]"
          />
        </motion.div>
      </motion.div>

      {/* 3. Left Content Column: Headline, Subtitle, Buttons, Mobile Car, Performance Stats */}
      <div className="relative z-20 flex-grow flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-4 md:py-6">
        <div className="w-full max-w-2xl lg:max-w-3xl space-y-2 sm:space-y-4 md:space-y-8">
          
          {/* Main Title Group */}
          <div className="space-y-1 sm:space-y-3 md:space-y-4">
            {/* M-Sport Diagonal Colored Stripes Accent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-4 sm:w-5 h-1.5 sm:h-2 -skew-x-12 bg-[#009FE3] rounded-[1px] shadow-sm" />
              <span className="w-4 sm:w-5 h-1.5 sm:h-2 -skew-x-12 bg-[#00205B] rounded-[1px] shadow-sm" />
              <span className="w-4 sm:w-5 h-1.5 sm:h-2 -skew-x-12 bg-[#E2231A] rounded-[1px] shadow-sm" />
            </motion.div>

            {/* Headline with Bebas Neue font - Strictly 2 Lines with Words Emerging One by One */}
            <h1 className="font-bebas italic font-black uppercase text-[34px] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] leading-[0.92] tracking-wider text-white drop-shadow-xl">
              {/* Baris 1: PENGALAMAN */}
              <div className="block whitespace-nowrap overflow-hidden py-0.5">
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  PENGALAMAN
                </motion.span>
              </div>

              {/* Baris 2: BERKENDARA TERBAIK */}
              <div className="block whitespace-nowrap overflow-hidden py-0.5">
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-2 sm:mr-3 md:mr-4"
                >
                  BERKENDARA
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-white"
                >
                  TERBAIK
                </motion.span>
              </div>
            </h1>

            {/* Subtitle - Muncul berikutnya setelah judul */}
            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-200/95 text-[11px] sm:text-sm md:text-base lg:text-lg max-w-md sm:max-w-lg lg:max-w-xl font-normal leading-snug drop-shadow"
            >
              Diciptakan bagi Anda yang menginginkan kesempurnaan. Performa dan kemewahan yang menginspirasi setiap perjalanan Anda.
            </motion.p>
          </div>

          {/* Action Buttons (Muncul bergantian 1 per 1) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 pt-0.5 sm:pt-1 w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
              className="w-full sm:w-auto"
            >
              <Link href="#collection" className="w-full sm:w-auto block">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#0266D6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-sm px-5 sm:px-7 py-2.5 sm:py-4 shadow-lg shadow-blue-600/35 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-between sm:justify-center gap-4 group h-9 sm:h-12"
                >
                  <span>JELAJAHI ARMADA</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95, ease: "easeOut" }}
              className="w-full sm:w-auto"
            >
              <Link href="#collection" className="w-full sm:w-auto block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/40 hover:border-white text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-sm px-5 sm:px-7 py-2.5 sm:py-4 text-center backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95 h-9 sm:h-12"
                >
                  SEWA SEKARANG
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile-only Car Image - Glides in from right */}
          <motion.div
            initial={{ opacity: 0, x: 180 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.05, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="block md:hidden relative w-full pt-0 pb-0 -my-1"
          >
            <Image
              src="/images/car_hero.webp"
              alt="BMW M4 Coupe"
              width={800}
              height={533}
              priority
              sizes="95vw"
              className="w-full max-w-[340px] sm:max-w-[420px] mx-auto h-auto object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.85)]"
            />
          </motion.div>

          {/* Informative Rental Key Metrics Panel (Muncul 1 per 1 secara berurutan) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 md:gap-10 pt-3 sm:pt-5 border-t border-white/20 max-w-lg w-full"
          >
            {/* Column 1: 50+ UNIT MEWAH */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
              className="flex flex-col items-start space-y-1 sm:space-y-1.5"
            >
              {/* Ikon di atas tulisan */}
              <div className="h-6 flex items-center text-blue-400">
                <Car className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              {/* Angka Bebas Neue */}
              <div className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide leading-none">
                50+
              </div>
              {/* Label Informatif */}
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                UNIT MEWAH
              </div>
            </motion.div>

            {/* Vertical Divider Line */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="w-[1px] h-14 sm:h-16 bg-white/20 shrink-0 origin-top"
            />

            {/* Column 2: 24/7 LAYANAN & DRIVER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.25, ease: "easeOut" }}
              className="flex flex-col items-start space-y-1 sm:space-y-1.5"
            >
              {/* Ikon di atas tulisan */}
              <div className="h-6 flex items-center text-blue-400">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              {/* Angka Bebas Neue */}
              <div className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide leading-none">
                24/7
              </div>
              {/* Label Informatif */}
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                LAYANAN & DRIVER
              </div>
            </motion.div>

            {/* Vertical Divider Line */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.4, delay: 1.35 }}
              className="w-[1px] h-14 sm:h-16 bg-white/20 shrink-0 origin-top"
            />

            {/* Column 3: 100% ASURANSI & TERPERCAYA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
              className="flex flex-col items-start space-y-1 sm:space-y-1.5"
            >
              {/* Ikon di atas tulisan */}
              <div className="h-6 flex items-center text-blue-400">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              {/* Angka Bebas Neue */}
              <div className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide leading-none">
                100%
              </div>
              {/* Label Informatif */}
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                ASURANSI PENUH
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* 4. Bottom Center: Scroll To Discover */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.55 }}
        className="relative z-20 w-full flex justify-center pt-2 pb-1 sm:pt-4 sm:pb-2"
      >
        <a
          href="#collection"
          className="flex flex-col items-center gap-1 text-white/75 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="text-[9px] sm:text-xs font-bold uppercase tracking-[3px]">
            GULIR KE BAWAH
          </span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce text-blue-400 group-hover:text-blue-300" />
        </a>
      </motion.div>
    </section>
  );
}
