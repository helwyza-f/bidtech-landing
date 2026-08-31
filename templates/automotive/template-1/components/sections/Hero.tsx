"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

export default function Hero() {
  const basePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "";
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const titleLine1 = "Kendaraan".split(" ");
  const titleLine2 = "Yang Luar Biasa".split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full min-h-[72dvh] md:min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-8 md:pb-12"
    >
      {/* Background image - simple and reliable across all mobile browsers */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/hero_section3.webp`}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "65% 55%",
          }}
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-950/55 via-black/25 to-blue-950/45 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Seamless bottom fade transition into next section (Pure White) */}
      <div
        className="absolute -bottom-1 left-0 w-full h-40 sm:h-52 md:h-64 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none"
        style={{ zIndex: 2 }}
      />


      <div className="relative z-10 flex-grow flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-0">
        <motion.div
          className="w-full max-w-2xl text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="mb-2 text-xs sm:text-sm md:text-base font-bold tracking-[3px] text-white uppercase drop-shadow-sm"
          >
            Layanan Armada Utama
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: { opacity: 1, scaleX: 1, transition: { duration: 0.5, delay: 0.2 } },
            }}
            className="w-12 h-1 bg-blue-500 rounded-full mb-3.5 origin-left shadow-sm shadow-blue-500/50"
          />

          <h1 className="mb-3 sm:mb-5 text-4xl sm:text-5xl md:text-[60px] lg:text-[68px] font-extrabold leading-[1.12] sm:leading-[1.08] tracking-tight text-white drop-shadow-lg">
            <span className="inline-block">
              {titleLine1.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-2 sm:mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block">
              {titleLine2.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-2 sm:mr-3 text-white"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.45, ease: "easeOut" },
              },
            }}
            className="mb-4 sm:mb-8 text-sm sm:text-base md:text-[19px] font-normal leading-relaxed sm:leading-[28.8px] text-blue-100 max-w-xl drop-shadow-md"
          >
            Rasakan puncak rekayasa otomotif dengan pilihan kendaraan mewah kami yang dikurasi, siap sedia setiap saat.
          </motion.p>
        </motion.div>
      </div>

      {/* Statistics Card (Compact 2x2 Grid on Mobile, 4 Columns on Desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4 md:pb-0 md:-translate-y-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 rounded-2xl bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">

          {/* Item 1 */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
              50rb+
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase leading-tight tracking-wider text-gray-600">
              Anggota
              <br />
              Aktif
            </span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
              120+
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase leading-tight tracking-wider text-gray-600">
              Lokasi
              <br />
              Global
            </span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
              4.9/5
            </span>
            <div>
              <div className="flex text-blue-600 mb-0.5 sm:mb-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={12} strokeWidth={3} className="fill-blue-600" />
                ))}
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Peringkat
              </span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <ShieldCheck size={34} strokeWidth={2} className="text-blue-600 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold uppercase leading-tight tracking-wider text-gray-600">
              Mitra Premium
              <br />
              Terverifikasi
            </span>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
