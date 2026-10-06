"use client";

import { useState, useRef } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface TestimonialItem {
  id: number;
  rating: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export default function Testimonials() {
  const t = useTranslations();

  // State terpisah untuk mobile & iPad (1 kartu per tampilan dengan dots & swipe)
  const [mobileIndex, setMobileIndex] = useState(0);

  // State terpisah untuk desktop website (2 kartu berdampingan, navigasi panah bersih)
  const [desktopIndex, setDesktopIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);

  const testimonials: TestimonialItem[] = [
    { id: 1, rating: 5, quote: t("home.testimonialItems.oneQuote"), author: "Hendra Wijaya", role: t("home.testimonialItems.oneRole"), avatar: "" },
    { id: 2, rating: 5, quote: t("home.testimonialItems.twoQuote"), author: "Calvin Tan", role: t("home.testimonialItems.twoRole"), avatar: "" },
    { id: 3, rating: 5, quote: t("home.testimonialItems.threeQuote"), author: "Rina Anggraini", role: t("home.testimonialItems.threeRole"), avatar: "" },
  ];

  const desktopMaxIndex = Math.max(0, testimonials.length - 2);
  const mobileMaxIndex = testimonials.length - 1;

  // Navigasi Desktop
  const handleDesktopPrev = () => {
    setDesktopIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleDesktopNext = () => {
    setDesktopIndex((prev) => Math.min(prev + 1, desktopMaxIndex));
  };

  // Navigasi Mobile & iPad
  const handleMobilePrev = () => {
    setMobileIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => Math.min(prev + 1, mobileMaxIndex));
  };

  // Gestur sentuh swipe di Mobile & iPad
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (diff > 40) {
      handleMobilePrev();
    } else if (diff < -40) {
      handleMobileNext();
    }
  };

  return (
    <section id="testimonials" className="relative w-full py-14 sm:py-18 md:py-24 bg-[#fafafc] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* 1. TAMPILAN KHUSUS MOBILE & IPAD / TABLET (Layar < 1024px)               */}
        {/*    - 1 Kartu penuh yang nyaman dibaca tanpa terpotong                    */}
        {/*    - Dilengkapi dukungan swipe jari & indikator titik (dots) di bawah    */}
        {/* ========================================================================= */}
        <div className="block lg:hidden">
          {/* Header Mobile & iPad */}
          <div className="mb-6 sm:mb-8 text-left">
            <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-2 sm:mb-3">
              {t("home.testimonialsEyebrow")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-snug mb-3">
              {t("home.testimonialsTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl">
              {t("home.testimonialsDescription")}
            </p>
          </div>

          {/* Slider Kartu Mobile & iPad */}
          <div
            className="overflow-hidden [touch-action:pan-y] rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex gap-4 transition-transform duration-350 ease-out"
              style={{
                transform: `translateX(calc(-${mobileIndex * 100}% - ${mobileIndex * 16}px))`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 bg-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-500/30 flex flex-col justify-between min-h-[260px] sm:min-h-[280px]"
                >
                  <div>
                    {/* Bintang Rating */}
                    <div className="flex items-center gap-1 mb-4 sm:mb-5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4.5 h-4.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Kutipan Testimonial */}
                    <p className="text-gray-100 text-xs sm:text-sm md:text-base leading-relaxed italic mb-6 font-normal">
                      {item.quote}
                    </p>
                  </div>

                  {/* Profil Pengguna */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-amber-400/40 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center font-bold text-amber-300 text-xs sm:text-sm shadow-inner">
                      {item.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-sm sm:text-base leading-snug truncate">
                        {item.author}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] font-bold tracking-wider text-amber-300 uppercase mt-0.5 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigasi Bawah Mobile & iPad: Dots + Tombol Panah */}
          <div className="flex items-center justify-between mt-6 px-1">
            {/* Indikator Titik (Dots) */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMobileIndex(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    mobileIndex === idx
                      ? "w-7 sm:w-8 bg-gradient-to-r from-amber-400 to-amber-600 shadow-xs"
                      : "w-2.5 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Tombol Panah Navigasi */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleMobilePrev}
                disabled={mobileIndex === 0}
                aria-label={t("home.previousTestimonials")}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  mobileIndex === 0
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                    : "border-amber-500 text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 active:scale-95"
                }`}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={handleMobileNext}
                disabled={mobileIndex >= mobileMaxIndex}
                aria-label={t("home.nextTestimonials")}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  mobileIndex >= mobileMaxIndex
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                    : "border-amber-500 text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 active:scale-95"
                }`}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TAMPILAN KHUSUS WEBSITE / DESKTOP (Layar >= 1024px)                    */}
        {/*    - Layout 2 kolom: Kiri (Judul & Panah saja, tanpa dots)               */}
        {/*    - Kanan (2 Kartu berdampingan, pergeseran halus & mewah)             */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Kolom Kiri: Judul dan Tombol Panah Desktop (Minimalis & Eksklusif) */}
          <div className="col-span-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">
                {t("home.testimonialsEyebrow")}
              </p>

              <h2 className="text-3xl lg:text-[44px] font-bold text-gray-900 tracking-tight leading-[1.18] mb-6">
                {t("home.testimonialsTitle")}
              </h2>

              <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-8">
                {t("home.testimonialsDescription")}
              </p>
            </div>

            {/* Tombol Panah Navigasi Desktop yang Rapi & Elegan (Tanpa Dots yang Mengganggu) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDesktopPrev}
                disabled={desktopIndex === 0}
                aria-label={t("home.previousTestimonials")}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  desktopIndex === 0
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                    : "border-gray-300 text-gray-700 bg-white hover:border-amber-500 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-slate-950 hover:shadow-md hover:shadow-amber-500/20 active:scale-95"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleDesktopNext}
                disabled={desktopIndex >= desktopMaxIndex}
                aria-label={t("home.nextTestimonials")}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  desktopIndex >= desktopMaxIndex
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                    : "border-amber-500 text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 active:scale-95"
                }`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Kolom Kanan: 2 Kartu Berdampingan (Desktop) */}
          <div className="col-span-8 overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${desktopIndex * 50}% - ${desktopIndex * 12}px))`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="w-[calc(50%-12px)] flex-shrink-0 bg-slate-950 rounded-[28px] p-8 md:p-9 text-white shadow-2xl border-2 border-amber-500/30 flex flex-col justify-between"
                >
                  <div>
                    {/* Bintang Rating */}
                    <div className="flex items-center gap-1 mb-6">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Kutipan Testimonial */}
                    <p className="text-gray-100 text-sm md:text-base leading-relaxed italic mb-8 font-normal">
                      {item.quote}
                    </p>
                  </div>

                  {/* Profil Pengguna */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-amber-400/40 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center font-bold text-amber-300 text-sm shadow-inner">
                      {item.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-base leading-snug truncate">
                        {item.author}
                      </h4>
                      <p className="text-[11px] font-bold tracking-wider text-amber-300 uppercase mt-0.5 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
