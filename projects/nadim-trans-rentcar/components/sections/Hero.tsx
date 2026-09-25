"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, Clock, ShieldCheck, ChevronDown, Sparkles } from "lucide-react";
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
      {/* 1. Sleek Modern Ambient Backdrop (VVIP Hang Nadim International Airport Backdrop - Brightened) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden bg-slate-950">
        <Image
          src="/images/background.webp"
          alt="Bandara Internasional Hang Nadim VVIP - Nadim Trans RentCar Batam"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_bottom] md:object-[60%_bottom] lg:object-[55%_bottom] brightness-[1.05] contrast-[1.03]"
        />

        {/* Softened cinematic gradient for clear text readability while allowing the airport and daylight to shine brightly */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 md:via-black/25 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30 z-[1]" />
        
        {/* Subtle gold ambient warmth */}
        <div className="absolute top-[25%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-amber-400/15 blur-[120px] pointer-events-none z-[2]" />
      </div>

      {/* 2. Interactive High-Res Foreground Car Layer - Cutout Toyota Alphard VIP */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="hidden md:block absolute right-[0%] lg:right-[1%] xl:right-[3%] bottom-[6%] lg:bottom-[8%] xl:bottom-[10%] w-[58%] lg:w-[53%] xl:w-[50%] max-w-[880px] pointer-events-none z-10 select-none"
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
          className="relative"
        >
          {/* Golden glow aura behind the car */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[75%] bg-gradient-to-tr from-amber-500/25 via-yellow-500/15 to-transparent blur-3xl rounded-full pointer-events-none" />

          {/* Standalone Cutout Vehicle */}
          <div className="relative">
            <Image
              src="/images/mobil-22.webp"
              alt="Armada Toyota Alphard VIP Nadim Trans RentCar Batam"
              width={1536}
              height={1024}
              priority
              sizes="50vw"
              className="w-full h-auto object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)]"
            />
            {/* Realistic floor contact shadow */}
            <div className="absolute -bottom-3 left-[8%] right-[8%] h-7 bg-black/95 blur-xl rounded-[100%] pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Left Content Column: Headline, Subtitle, Buttons, Mobile Car, Performance Stats */}
      <div className="relative z-20 flex-grow flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-4 md:py-6">
        <div className="w-full max-w-2xl lg:max-w-3xl space-y-2 sm:space-y-4 md:space-y-8">
          
          {/* Main Title Group */}
          <div className="space-y-1 sm:space-y-3 md:space-y-4">
            {/* Luxury Gold Accent Stripes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-5 h-2 -skew-x-12 bg-gradient-to-r from-amber-200 to-yellow-400 rounded-[1px] shadow-sm" />
              <span className="w-5 h-2 -skew-x-12 bg-gradient-to-r from-[#D4AF37] to-[#B89222] rounded-[1px] shadow-sm" />
              <span className="w-5 h-2 -skew-x-12 bg-gradient-to-r from-[#8A6510] to-[#5A4211] rounded-[1px] shadow-sm" />
            </motion.div>

            {/* Headline with Bebas Neue font */}
            <h1 className="font-bebas italic font-black uppercase text-[36px] sm:text-5xl md:text-5xl lg:text-[64px] xl:text-[76px] leading-[0.95] tracking-wider text-white drop-shadow-xl">
              {/* Baris 1: PENGALAMAN */}
              <div className="block overflow-hidden py-0.5">
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  PENGALAMAN
                </motion.span>
              </div>

              {/* Baris 2: BERKENDARA TERBAIK DI BATAM */}
              <div className="block overflow-hidden py-0.5">
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
                  className="inline-block text-amber-400 drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]"
                >
                  TERBAIK DI BATAM
                </motion.span>
              </div>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-200/95 text-[11px] sm:text-sm md:text-base lg:text-lg max-w-md sm:max-w-lg lg:max-w-xl font-normal leading-snug drop-shadow"
            >
              Solusi rental mobil lepas kunci & ber-supir terpercaya dari PT. Nadim Auto Transindo. Layanan cepat, armada terawat, dan siap mengantar perjalanan Anda di seluruh Kota Batam.
            </motion.p>
          </div>

          {/* Action Buttons */}
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
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl px-5 sm:px-7 py-2.5 sm:py-4 shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-between sm:justify-center gap-4 group h-9 sm:h-12"
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
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-amber-400/40 hover:border-amber-300 text-amber-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl px-5 sm:px-7 py-2.5 sm:py-4 text-center backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95 h-9 sm:h-12"
                >
                  SEWA SEKARANG
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile-only Car Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="block md:hidden relative w-full pt-2 pb-2 my-1"
          >
            <div className="relative w-full max-w-[360px] mx-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[60%] bg-amber-500/15 blur-2xl rounded-full" />
              <Image
                src="/images/mobil-22.webp"
                alt="Armada Toyota Alphard VIP Nadim Trans RentCar"
                width={1536}
                height={1024}
                priority
                sizes="95vw"
                className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.95)] relative z-10"
              />
              <div className="absolute -bottom-1 left-[10%] right-[10%] h-4 bg-black/90 blur-md rounded-[100%]" />
            </div>
          </motion.div>

          {/* Informative Rental Key Metrics Panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 md:gap-10 pt-3 sm:pt-5 border-t border-white/20 max-w-lg w-full"
          >
            {/* Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
              className="flex flex-col items-start space-y-1 sm:space-y-1.5"
            >
              <div className="h-6 flex items-center text-amber-400">
                <Car className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide leading-none">
                20+
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                UNIT PRIMA
              </div>
            </motion.div>

            {/* Vertical Divider Line */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="w-[1px] h-14 sm:h-16 bg-white/20 shrink-0 origin-top"
            />

            {/* Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.25, ease: "easeOut" }}
              className="flex flex-col items-start space-y-1 sm:space-y-1.5"
            >
              <div className="h-6 flex items-center text-amber-400">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide leading-none">
                24/7
              </div>
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

            {/* Column 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
              className="flex flex-col items-start space-y-1 sm:space-y-1.5"
            >
              <div className="h-6 flex items-center text-amber-400">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide leading-none">
                100%
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300">
                TERPERCAYA
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
          className="flex flex-col items-center gap-1 text-white/75 hover:text-amber-300 transition-colors group cursor-pointer"
        >
          <span className="text-[9px] sm:text-xs font-bold uppercase tracking-[3px]">
            GULIR KE BAWAH
          </span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce text-amber-400 group-hover:text-amber-300" />
        </a>
      </motion.div>
    </section>
  );
}
