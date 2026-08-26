'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/constants';

// Triple list for continuous infinite loop
const EXTENDED_GALLERY = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

export default function Gallery() {
  const total = GALLERY_IMAGES.length;
  // Start at the middle set
  const [index, setIndex] = useState(total);
  const [isInstant, setIsInstant] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Active item index for dot indicator
  const activeDotIndex = ((index % total) + total) % total;

  const nextSlide = useCallback(() => {
    setIsInstant(false);
    setIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsInstant(false);
    setIndex((prev) => prev - 1);
  }, []);

  // Seamless zero-duration position reset
  const handleAnimationComplete = () => {
    if (index >= total * 2) {
      setIsInstant(true);
      setIndex(index - total);
    } else if (index < total) {
      setIsInstant(true);
      setIndex(index + total);
    }
  };

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section
      id="galeri"
      className="py-20 md:py-24 bg-white overflow-hidden scroll-mt-20"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-2">
            DOKUMENTASI
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D4D44] tracking-tight">
              Galeri
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed font-normal">
              Potret kegiatan dan kisah inspiratif yang mencerminkan komitmen kami dalam mendukung tumbuh kembang anak dan komunitas.
            </p>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="relative w-full">
          {/* Edge Vignette Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Previous image"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Next image"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Infinite Moving Track */}
          <div className="overflow-hidden py-4">
            <motion.div
              animate={{
                x: `calc(-${index} * (clamp(260px, 31vw, 360px) + 20px))`,
              }}
              transition={
                isInstant
                  ? { duration: 0 }
                  : {
                      type: 'spring',
                      stiffness: 260,
                      damping: 28,
                    }
              }
              onAnimationComplete={handleAnimationComplete}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_: unknown, info: { offset: { x: number } }) => {
                if (info.offset.x < -40) nextSlide();
                else if (info.offset.x > 40) prevSlide();
              }}
              className="flex items-center gap-5 cursor-grab active:cursor-grabbing pl-4 sm:pl-8 touch-pan-y"
            >
              {EXTENDED_GALLERY.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="relative rounded-3xl overflow-hidden shadow-sm flex-shrink-0 select-none transition-all duration-300 group"
                  style={{
                    width: 'clamp(260px, 31vw, 360px)',
                    aspectRatio: '3 / 4',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    draggable={false}
                  />

                  {/* Gradient & title on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <p className="text-sm font-bold text-white leading-snug drop-shadow-md">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {GALLERY_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsInstant(false);
                setIndex(total + idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className="focus:outline-none py-2"
            >
              {idx === activeDotIndex ? (
                <motion.div
                  layoutId="galleryInfiniteDotPill"
                  className="w-6 h-2 rounded-full bg-[#0D4D44]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
