"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

interface TestimonialItem {
  id: number;
  rating: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    rating: 5,
    quote:
      '"Layanan pengiriman ke lokasi sangat luar biasa. BMW M4 saya diantar langsung ke terminal tepat saat saya mendarat. Sangat lancar dan premium."',
    author: "Sarah Mitchell",
    role: "EKSEKUTIF BISNIS",
    avatar: "/images/avatar-1.webp",
  },
  {
    id: 2,
    rating: 5,
    quote:
      '"Menyewa mobil sport elektrik untuk liburan akhir pekan saya adalah momen terbaik dalam perjalanan tersebut. Layanannya benar-benar kelas dunia."',
    author: "Marcus Thorne",
    role: "WIRAUSAHA TEKNOLOGI",
    avatar: "/images/avatar-2.webp",
  },
  {
    id: 3,
    rating: 5,
    quote:
      '"Proses pemesanan sangat cepat, kendaraan bersih dan mulus seperti baru. Menjadikan perjalanan dinas saya jauh lebih efisien dan menyenangkan."',
    author: "Elena Rostova",
    role: "DIREKTUR KREATIF",
    avatar: "/images/avatar-3.webp",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = TESTIMONIALS.length - 2;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section id="testimonials" className="w-full min-h-screen py-20 md:py-24 bg-white flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Kolom Kiri: Header & Kontrol Navigasi */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-4">
                Suara <br />
                Kepercayaan
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-sm mb-8">
                Apa yang dikatakan komunitas pelancong global kami tentang pengalaman mereka.
              </p>
            </div>

            {/* Tombol Panah Navigasi Carousel */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous testimonials"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 ${currentIndex === 0
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 active:scale-95"
                  }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next testimonials"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 ${currentIndex >= maxIndex
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-95"
                  }`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Kolom Kanan: Kartu Testimonial */}
          <div className="lg:col-span-8 overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `calc(-${currentIndex * 50}% - ${currentIndex * 12}px)` }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              {TESTIMONIALS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full sm:w-[calc(50%-12px)] flex-shrink-0 bg-blue-600 rounded-[28px] p-8 md:p-9 text-white shadow-xl shadow-blue-600/20 flex flex-col justify-between"
                >
                  <div>
                    {/* Bintang Rating */}
                    <div className="flex items-center gap-1 mb-6">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-white text-white"
                        />
                      ))}
                    </div>

                    {/* Kutipan Testimonial */}
                    <p className="text-white text-sm sm:text-base leading-relaxed italic mb-8 font-normal">
                      {item.quote}
                    </p>
                  </div>

                  {/* Profil Pengguna */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base leading-snug">
                        {item.author}
                      </h4>
                      <p className="text-[11px] font-semibold tracking-wider text-blue-200 uppercase mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
