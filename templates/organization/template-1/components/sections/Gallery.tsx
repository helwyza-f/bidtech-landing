'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/constants';
import GalleryModal, { GalleryItem } from '@/components/ui/GalleryModal';

// Triple list for continuous infinite loop
const EXTENDED_GALLERY = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

export default function Gallery() {
  const total = GALLERY_IMAGES.length;
  // Start at the middle set
  const [index, setIndex] = useState(total);
  const [isInstant, setIsInstant] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [direction, setDirection] = useState(0);

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

  // Modal navigation with direction tracking
  const handleModalNext = () => {
    if (!selectedImage) return;
    setDirection(1);
    const currentIndex = GALLERY_IMAGES.findIndex((img) => img.id === selectedImage.id);
    const nextIdx = (currentIndex + 1) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[nextIdx]);
  };

  const handleModalPrev = () => {
    if (!selectedImage) return;
    setDirection(-1);
    const currentIndex = GALLERY_IMAGES.findIndex((img) => img.id === selectedImage.id);
    const prevIdx = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[prevIdx]);
  };

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

  // Auto-play interval (pauses when modal is open or hovered)
  useEffect(() => {
    if (!isAutoPlaying || selectedImage !== null) return;
    const timer = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, selectedImage, nextSlide]);

  return (
    <section
      id="galeri"
      className="py-20 md:py-24 bg-white overflow-hidden scroll-mt-20"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-2"
          >
            DOKUMENTASI
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-[#0D4D44] tracking-tight"
            >
              Galeri
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed font-normal"
            >
              Potret kegiatan dan kisah inspiratif yang mencerminkan komitmen kami dalam mendukung tumbuh kembang anak dan komunitas.
            </motion.p>
          </div>
        </motion.div>

        {/* Carousel Viewport */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full"
        >
          {/* Edge Vignette Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-16 md:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-16 md:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Previous image"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center shadow-xl backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Next image"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </button>

          {/* Infinite Moving Track with Center-Aligned Cards */}
          <div className="overflow-hidden py-3 w-full">
            <motion.div
              animate={{
                x: `calc(50% - (clamp(230px, 64vw, 340px) / 2) - ${index} * (clamp(230px, 64vw, 340px) + 16px))`,
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
              className="flex items-center gap-4 cursor-grab active:cursor-grabbing touch-pan-y"
            >
              {EXTENDED_GALLERY.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => {
                    setDirection(0);
                    setSelectedImage(item);
                  }}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-2 hover:rotate-[-1deg] flex-shrink-0 select-none transition-all duration-300 group cursor-pointer border border-black/5"
                  style={{
                    width: 'clamp(230px, 64vw, 340px)',
                    aspectRatio: '3 / 4',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    draggable={false}
                  />

                  {/* Gradient Overlay & Title on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#48B800] mb-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      DOKUMENTASI
                    </span>
                    <p className="text-xs sm:text-base font-bold text-white leading-snug drop-shadow-md transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Indicator Dots */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
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
        </motion.div>
      </div>

      {/* Gallery Popup Lightbox Modal with Paper Stack & 3D Flip */}
      <GalleryModal
        isOpen={selectedImage !== null}
        item={selectedImage}
        direction={direction}
        onClose={() => setSelectedImage(null)}
        onPrev={handleModalPrev}
        onNext={handleModalNext}
      />
    </section>
  );
}

