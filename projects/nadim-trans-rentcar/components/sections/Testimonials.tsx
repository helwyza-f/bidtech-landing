"use client";

import { useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations();
  const testimonials: TestimonialItem[] = [
    { id: 1, rating: 5, quote: t("home.testimonialItems.oneQuote"), author: "Hendra Wijaya", role: t("home.testimonialItems.oneRole"), avatar: "" },
    { id: 2, rating: 5, quote: t("home.testimonialItems.twoQuote"), author: "Calvin Tan", role: t("home.testimonialItems.twoRole"), avatar: "" },
    { id: 3, rating: 5, quote: t("home.testimonialItems.threeQuote"), author: "Rina Anggraini", role: t("home.testimonialItems.threeRole"), avatar: "" },
  ];

  const maxIndex = testimonials.length - 2;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <section id="testimonials" className="relative w-full py-16 sm:py-20 md:py-28 bg-[#fafafc] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Kolom Kiri: Judul dan Tombol Navigasi */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">
                {t("home.testimonialsEyebrow")}
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 tracking-tight leading-[1.15] mb-6">
                {t("home.testimonialsTitle")}
              </h2>

              <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-8">
                {t("home.testimonialsDescription")}
              </p>
            </div>

            {/* Tombol Panah Navigasi Carousel */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label={t("home.previousTestimonials")}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  currentIndex === 0
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                    : currentIndex >= maxIndex
                    ? "border-amber-500 text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 active:scale-95"
                    : "border-gray-300 text-gray-700 bg-white hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:border-amber-500 hover:text-slate-950 hover:shadow-md hover:shadow-amber-500/20 shadow-sm active:scale-95"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label={t("home.nextTestimonials")}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  currentIndex >= maxIndex
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                    : currentIndex === 0
                    ? "border-amber-500 text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 active:scale-95"
                    : "border-gray-300 text-gray-700 bg-white hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:border-amber-500 hover:text-slate-950 hover:shadow-md hover:shadow-amber-500/20 shadow-sm active:scale-95"
                }`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Kartu Testimonial */}
          <div className="lg:col-span-8 overflow-hidden">
            <div
              className="flex gap-6"
              style={{ transform: `translateX(calc(-${currentIndex * 50}% - ${currentIndex * 12}px))`, transition: "transform 300ms ease-out" }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="w-full sm:w-[calc(50%-12px)] flex-shrink-0 bg-slate-950 rounded-[28px] p-8 md:p-9 text-white shadow-2xl border-2 border-amber-500/30 flex flex-col justify-between"
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
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed italic mb-8 font-normal">
                      {item.quote}
                    </p>
                  </div>

                  {/* Profil Pengguna */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-amber-400/40 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center font-bold text-amber-300 text-sm shadow-inner">
                      {item.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base leading-snug">
                        {item.author}
                      </h4>
                      <p className="text-[11px] font-bold tracking-wider text-amber-300 uppercase mt-0.5">
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
