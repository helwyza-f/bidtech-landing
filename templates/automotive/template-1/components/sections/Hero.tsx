"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const titleLine1 = "Kendarai Yang".split(" ");
  const titleLine2 = "Luar Biasa".split(" ");

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
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-8 md:pb-12"
    >
      <motion.div
        className="absolute inset-0 w-full h-[115%] -z-10"
        style={{
          y: backgroundY,
          scale: 1.05,
        }}
      >
        <Image
          src="/images/hero_section.webp"
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/20" />

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />

      <div className="relative z-10 flex-grow flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="mb-4 text-[14px] font-semibold leading-[14px] tracking-[2.8px] text-white uppercase"
          >
            Layanan Armada Utama
          </motion.p>


          <h1 className="mb-6 text-[44px] sm:text-[56px] font-bold leading-[1.1] tracking-tight">
            <span className="inline-block">
              {titleLine1.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-3"
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
                  className="inline-block mr-3 text-white"
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
            className="mb-8 text-[18px] font-normal leading-[28.8px] tracking-[0px] text-gray-200 max-w-xl"
          >
            Rasakan puncak rekayasa otomotif dengan pilihan kendaraan mewah kami yang dikurasi, siap sedia setiap saat.
          </motion.p>
        </motion.div>
      </div>

      {/* Statistics Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-0 -translate-y-12 md:-translate-y-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 rounded-2xl bg-white p-6 shadow-2xl md:p-8">

          {/* Item 1 */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-blue-600">
              50rb+
            </span>
            <span className="text-xs font-bold uppercase leading-tight tracking-wider text-gray-600">
              Anggota
              <br />
              Aktif
            </span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-blue-600">
              120+
            </span>
            <span className="text-xs font-bold uppercase leading-tight tracking-wider text-gray-600">
              Lokasi
              <br />
              Global
            </span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-blue-600">
              4.9/5
            </span>
            <div>
              <div className="flex text-blue-600 mb-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={14} strokeWidth={3} className="fill-blue-600" />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Peringkat
              </span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-4">
            <ShieldCheck size={42} strokeWidth={2} className="text-blue-600" />
            <span className="text-xs font-bold uppercase leading-tight tracking-wider text-gray-600">
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