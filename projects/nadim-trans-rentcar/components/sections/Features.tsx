"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Users, Gauge, Briefcase, Star, ArrowLeft, ArrowRight, Fuel, Car } from "lucide-react";
import { getCars } from "@/lib/localizedData";
import { formatRupiah, getLocalizedPath, type Locale } from "@/lib/i18n";

const CARS_PER_PAGE = 3;

export default function Features() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const cars = getCars(locale);

  const totalPages = Math.ceil(cars.length / CARS_PER_PAGE);

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
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  };

  const currentCars = cars.slice(
    currentPage * CARS_PER_PAGE,
    (currentPage + 1) * CARS_PER_PAGE
  );

  return (
    <section id="collection" className="relative w-full py-16 sm:py-20 md:py-28 bg-[#fafafc] overflow-hidden">
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section dengan Tombol Navigasi Panah */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            {/* Gold Accent */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-4 sm:w-5 h-1.5 -skew-x-12 bg-amber-200 rounded-[1px] shadow-sm" />
              <span className="w-4 sm:w-5 h-1.5 -skew-x-12 bg-amber-500 rounded-[1px] shadow-sm" />
              <span className="w-4 sm:w-5 h-1.5 -skew-x-12 bg-amber-700 rounded-[1px] shadow-sm" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-amber-600 ml-1.5">
                {t("home.fleetEyebrow")}
              </span>
            </div>

            {/* Title with Bebas Neue Accent */}
            <h2 className="font-bebas text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-wide uppercase leading-tight sm:leading-[0.95]">
              {t("home.fleetTitle")} <br className="hidden sm:inline" />
              <span className="text-amber-500">{t("home.fleetTitleAccent")}</span>
            </h2>

            <p className="text-gray-600 mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed max-w-xl">
              {t("home.fleetDescription")}
            </p>
          </div>

          {/* Tombol Panah Navigasi & Indikator Halaman */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            {/* Dots Indicator */}
            <div className="flex items-center gap-2 mr-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToPage(idx)}
                  aria-label={t("home.carouselPage", { count: idx + 1 })}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === idx
                      ? "w-8 bg-gradient-to-r from-amber-400 to-amber-600"
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
              aria-label={t("home.previousFleet")}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                currentPage === 0
                  ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                  : currentPage === totalPages - 1
                  ? "border-amber-500 text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 active:scale-95"
                  : "border-gray-300 text-gray-700 bg-white hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:border-amber-500 hover:text-slate-950 hover:shadow-md hover:shadow-amber-500/20 shadow-sm active:scale-95"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Tombol Panah Kanan (Selanjutnya) */}
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              aria-label={t("home.nextFleet")}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                currentPage >= totalPages - 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                  : currentPage === 0
                  ? "border-amber-500 text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 active:scale-95"
                  : "border-gray-300 text-gray-700 bg-white hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:border-amber-500 hover:text-slate-950 hover:shadow-md hover:shadow-amber-500/20 shadow-sm active:scale-95"
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid 3 Mobil Per Halaman dengan Transisi Animasi Halus */}
        <div className="relative min-h-[480px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" key={currentPage}>
              {currentCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400/80 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Foto Mobil */}
                    <Link
                      href={getLocalizedPath(locale, `/kendaraan/${car.slug}`)}
                      className="block relative h-52 sm:h-56 bg-white overflow-hidden cursor-pointer border-b border-gray-100"
                    >
                      {car.image ? (
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)]"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-amber-50/30 flex flex-col items-center justify-center p-4 text-center">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-2 text-slate-400 group-hover:text-amber-500 transition-colors">
                            <Car className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("vehicle.photoPlaceholder")}</span>
                        </div>
                      )}

                      {/* Category Badge (Top Left) */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="inline-flex items-center rounded-md bg-slate-900/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 shadow-sm border border-amber-500/30">
                          {car.category}
                        </span>
                      </div>

                      {/* Rating Badge (Top Right) */}
                      <div className="absolute top-3.5 right-3.5 z-10 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm border border-gray-100">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-900">{car.rating}</span>
                        <span className="text-[10px] text-gray-500">({car.reviews})</span>
                      </div>

                      {/* Fuel Tag (Bottom Left) */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1 rounded bg-slate-900/85 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200 border border-amber-500/30">
                          <Fuel className="w-3 h-3 text-amber-400" />
                          {car.specs.fuel.split(" ")[0]}
                        </span>
                      </div>
                    </Link>

                    {/* Detail Info */}
                    <div className="p-5 sm:p-6">
                      <div className="flex justify-between items-start mb-3.5">
                        <Link href={getLocalizedPath(locale, `/kendaraan/${car.slug}`)} className="block">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-tight">
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
                          <Users className="w-4 h-4 text-amber-500" />
                          <span className="text-[11px] text-gray-700 font-semibold leading-none">
                            {car.specs.seats} {t("common.seats")}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 text-center border-x border-gray-200/80">
                          <Briefcase className="w-4 h-4 text-amber-500" />
                          <span className="text-[11px] text-gray-700 font-semibold leading-none">
                            {car.specs.luggage} {t("common.luggage")}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 text-center">
                          <Gauge className="w-4 h-4 text-amber-500" />
                          <span className="text-[11px] text-gray-700 font-semibold leading-none truncate max-w-[85px]">
                            {car.specs.transmission.split(" ")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Harga per Hari */}
                      <div className="flex items-baseline justify-between pt-1">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">
                            {t("home.rentalRate")}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-bebas text-2xl sm:text-3xl font-bold text-amber-600 tracking-wide leading-none">
                              {formatRupiah(car.price, locale)}
                            </span>
                            <span className="text-xs text-gray-500 font-medium">{car.priceNote}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Sewa */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <Link href={`${getLocalizedPath(locale, `/kendaraan/${car.slug}`)}#galeri`} className="block w-full">
                      <Button className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl h-11 shadow-sm hover:shadow-md shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 group/btn cursor-pointer">
                        <span>{t("catalog.bookNow")}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Catalog Action */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <Link href={getLocalizedPath(locale, "/kendaraan")}>
            <Button
              variant="outline"
              className="px-7 py-3 rounded-xl text-sm font-bold text-slate-900 bg-white hover:bg-amber-50 border border-amber-400/60 hover:border-amber-500 transition-colors h-auto cursor-pointer shadow-sm"
            >
              {t("home.exploreAll")}
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
