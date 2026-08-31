"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Gauge, Briefcase, ArrowLeft, ArrowRight } from "lucide-react";
import { ALL_CARS, CATEGORIES } from "@/lib/data";

const FILTERS = CATEGORIES;

export default function Features() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredCars =
    activeFilter === "Semua"
      ? ALL_CARS
      : ALL_CARS.filter((car) => car.category === activeFilter);

  const maxIndex = Math.max(0, filteredCars.length - itemsPerPage);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = window.innerWidth < 640 ? 24 : 32;
        container.scrollTo({
          left: index * (cardWidth + gap),
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = window.innerWidth < 640 ? 24 : 32;
        const scrollLeft = container.scrollLeft;
        const newIndex = Math.round(scrollLeft / (cardWidth + gap));
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= maxIndex) {
          setCurrentIndex(newIndex);
        }
      }
    }
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(maxIndex, currentIndex + 1);
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "auto" });
    }
  };

  return (
    <section
      id="collection"
      className="w-full min-h-screen pt-8 pb-16 sm:py-20 md:py-24 bg-white flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          {/* Header Judul */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Eksplorasi Koleksi Mobil <br className="hidden sm:inline" />
              Premium Kami
            </h2>
            <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
              Pilih kendaraan sesuai kebutuhan perjalanan Anda. Seluruh unit kami dirawat secara berkala dan siap pakai untuk memberikan kenyamanan maksimal.
            </p>
          </motion.div>

          {/* Tombol Navigasi Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mt-6 md:mt-0"
          >
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous vehicles"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 ${currentIndex === 0
                  ? "border-gray-200 text-gray-300 cursor-not-allowed bg-white"
                  : "border-blue-600 text-blue-600 bg-white hover:bg-blue-50 shadow-sm active:scale-95 cursor-pointer"
                }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next vehicles"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 ${currentIndex >= maxIndex
                  ? "border-gray-200 text-gray-300 cursor-not-allowed bg-white"
                  : "border-blue-600 text-blue-600 bg-white hover:bg-blue-50 shadow-sm active:scale-95 cursor-pointer"
                }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Filter Mobil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 no-scrollbar"
        >
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              variant="outline"
              className={`rounded-full px-5 sm:px-6 text-xs sm:text-sm whitespace-nowrap transition-all ${activeFilter === filter
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Carousel Koleksi Mobil Responsif */}
        <div className="overflow-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {filteredCars.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.333px)] flex-shrink-0 snap-center bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-600/10 border border-gray-100 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Foto Mobil */}
                  <Link href={`/kendaraan/${car.id}`} className="block relative h-48 sm:h-56 bg-gray-200 overflow-hidden cursor-pointer">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center rounded-md bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 shadow-md">
                        {car.category}
                      </span>
                    </div>
                  </Link>

                  {/* Detail Info */}
                  <div className="p-5 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Link href={`/kendaraan/${car.id}`} className="block">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {car.name}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm">{car.type}</p>
                      </Link>
                      <div className="text-right">
                        <span className="text-base sm:text-lg font-bold text-blue-600">
                          Rp {car.priceFormatted}
                        </span>
                        <span className="text-xs text-gray-500 block">/ hari</span>
                      </div>
                    </div>

                    {/* Spesifikasi Ikon */}
                    <div className="flex items-center justify-between py-3.5 border-y border-gray-100 mb-5">
                      <div className="flex flex-col items-center gap-1">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <span className="text-[11px] sm:text-xs text-gray-600 font-medium">
                          {car.specs.seats} Kursi
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <span className="text-[11px] sm:text-xs text-gray-600 font-medium">
                          {car.specs.luggage} Tas
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <span className="text-[11px] sm:text-xs text-gray-600 font-medium truncate max-w-[80px]">
                          {car.specs.transmission}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tombol Sewa */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                  <Link href={`/kendaraan/${car.id}`} className="block w-full">
                    <Button className="w-full bg-white hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-600 transition-all duration-200 h-11 sm:h-12 shadow-sm font-semibold rounded-xl text-sm">
                      Sewa Sekarang
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
