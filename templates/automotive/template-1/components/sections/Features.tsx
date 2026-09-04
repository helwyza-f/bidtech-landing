"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Gauge, Briefcase, Star, ArrowLeft, ArrowRight, Fuel } from "lucide-react";
import { ALL_CARS } from "@/lib/data";

const CARS_PER_PAGE = 3;

export default function Features() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalPages = Math.ceil(ALL_CARS.length / CARS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage) {
      setDirection(pageIndex > currentPage ? 1 : -1);
      setCurrentPage(pageIndex);
    }
  };

  const currentCars = ALL_CARS.slice(
    currentPage * CARS_PER_PAGE,
    (currentPage + 1) * CARS_PER_PAGE
  );

  return (
    <section
      id="collection"
      className="w-full py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section dengan Tombol Navigasi Panah */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            {/* M-Stripe / Luxury Badge Accent */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-4 sm:w-5 h-1.5 -skew-x-12 bg-[#009FE3] rounded-[1px] shadow-sm" />
              <span className="w-4 sm:w-5 h-1.5 -skew-x-12 bg-[#00205B] rounded-[1px] shadow-sm" />
              <span className="w-4 sm:w-5 h-1.5 -skew-x-12 bg-[#E2231A] rounded-[1px] shadow-sm" />
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0266D6] ml-1.5">
                Armada Eksklusif & Mewah
              </span>
            </div>

            {/* Title with Bebas Neue Accent */}
            <h2 className="font-bebas text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-wide uppercase leading-tight sm:leading-[0.95]">
              Eksplorasi Koleksi Mobil <br className="hidden sm:inline" />
              <span className="text-[#0266D6]">Premium</span> Kami
            </h2>

            <p className="text-gray-600 mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed max-w-xl">
              Pilih kendaraan impian untuk perjalanan bisnis, liburan keluarga, maupun acara prestisius Anda. Semua unit siap pakai dengan perawatan berkala dan proteksi menyeluruh.
            </p>
          </motion.div>

          {/* Tombol Panah Navigasi & Indikator Halaman */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 shrink-0 self-start md:self-end"
          >
            {/* Dots Indicator */}
            <div className="flex items-center gap-2 mr-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToPage(idx)}
                  aria-label={`Ke halaman ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === idx
                      ? "w-8 bg-[#0266D6]"
                      : "w-2.5 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Tombol Panah Kiri (Sebelumnya) */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 0}
              aria-label="Halaman sebelumnya"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                currentPage === 0
                  ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                  : "border-gray-300 hover:border-[#0266D6] text-gray-700 hover:text-[#0266D6] bg-white hover:bg-blue-50 shadow-sm active:scale-95"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Tombol Panah Kanan (Selanjutnya) */}
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              aria-label="Halaman selanjutnya"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                currentPage >= totalPages - 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                  : "border-[#0266D6] text-white bg-[#0266D6] hover:bg-blue-600 shadow-md shadow-blue-600/25 active:scale-95"
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Grid 3 Mobil Per Halaman dengan Transisi Animasi Halus */}
        <div className="relative min-h-[480px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: direction * 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 35 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {currentCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100/90 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 hover:border-blue-200/80 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Foto Mobil */}
                    <Link
                      href={`/kendaraan/${car.id}`}
                      className="block relative h-52 sm:h-56 bg-gray-100 overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                      {/* Category Badge (Top Left) */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="inline-flex items-center rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm border border-white/10">
                          {car.category}
                        </span>
                      </div>

                      {/* Rating Badge (Top Right) */}
                      <div className="absolute top-3.5 right-3.5 z-10 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-900">{car.rating}</span>
                        <span className="text-[10px] text-gray-500">({car.reviews})</span>
                      </div>

                      {/* Fuel Tag (Bottom Left) */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1 rounded bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-800">
                          <Fuel className="w-3 h-3 text-[#0266D6]" />
                          {car.specs.fuel.split(" ")[0]}
                        </span>
                      </div>
                    </Link>

                    {/* Detail Info */}
                    <div className="p-5 sm:p-6">
                      <div className="flex justify-between items-start mb-3.5">
                        <Link href={`/kendaraan/${car.id}`} className="block">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#0266D6] transition-colors leading-tight">
                            {car.name}
                          </h3>
                          <p className="text-gray-500 text-xs mt-1 font-medium">
                            {car.type} • {car.specs.year || 2024}
                          </p>
                        </Link>
                      </div>

                      {/* Spesifikasi Bar */}
                      <div className="grid grid-cols-3 gap-2 py-3 px-2.5 bg-gray-50/80 rounded-xl border border-gray-100/80 mb-5">
                        <div className="flex flex-col items-center justify-center gap-1 text-center">
                          <Users className="w-4 h-4 text-[#0266D6]" />
                          <span className="text-[11px] text-gray-700 font-semibold leading-none">
                            {car.specs.seats} Kursi
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 text-center border-x border-gray-200/80">
                          <Briefcase className="w-4 h-4 text-[#0266D6]" />
                          <span className="text-[11px] text-gray-700 font-semibold leading-none">
                            {car.specs.luggage} Koper
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 text-center">
                          <Gauge className="w-4 h-4 text-[#0266D6]" />
                          <span className="text-[11px] text-gray-700 font-semibold leading-none truncate max-w-[85px]">
                            {car.specs.transmission.split(" ")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Harga per Hari */}
                      <div className="flex items-baseline justify-between pt-1">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">
                            Mulai dari
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-bebas text-2xl sm:text-3xl font-bold text-[#0266D6] tracking-wide leading-none">
                              Rp {car.priceFormatted}
                            </span>
                            <span className="text-xs text-gray-500 font-medium">/ hari</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Sewa */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <Link href={`/kendaraan/${car.id}`} className="block w-full">
                      <Button className="w-full bg-[#0266D6] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl h-11 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 group/btn cursor-pointer">
                        <span>Sewa Sekarang</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Catalog Action (Tombol Simpel Tanpa Panah) */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <Link href="/kendaraan">
            <Button
              variant="outline"
              className="px-7 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 transition-colors h-auto cursor-pointer shadow-none"
            >
              Jelajahi Semua Kendaraan
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
