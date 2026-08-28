'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

// Triple list for continuous wrap-around infinite loop
const EXTENDED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
  const total = TESTIMONIALS.length;
  // Start at the middle set
  const [index, setIndex] = useState(total);
  const [isInstant, setIsInstant] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Active item index for dot indicator (0 to total - 1)
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

  // Auto-play every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section
      className="pt-28 pb-20 md:pt-32 md:pb-24 bg-white border-t border-gray-100 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-2"
            >
              TESTIMONI
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight"
            >
              Apa yang mereka katakan
            </motion.h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#0D4D44] hover:text-[#0D4D44] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-[#0D4D44] text-white flex items-center justify-center hover:bg-[#072C27] transition-all active:scale-95 shadow-md"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Testimonials Infinite Slider Track */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden py-4 -mx-4 px-4"
        >
          <motion.div
            animate={{
              x: `calc(-${index} * (clamp(300px, 31vw, 380px) + 24px))`,
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
            dragElastic={0.08}
            onDragEnd={(_: unknown, info: { offset: { x: number } }) => {
              if (info.offset.x < -40) nextSlide();
              else if (info.offset.x > 40) prevSlide();
            }}
            className="flex items-stretch gap-6 cursor-grab active:cursor-grabbing touch-pan-y"
          >
            {EXTENDED_TESTIMONIALS.map((item, idx) => {
              const isDark = item.highlighted;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  style={{ width: 'clamp(300px, 31vw, 380px)' }}
                  className={`p-7 rounded-2xl flex-shrink-0 flex flex-col justify-between transition-all duration-300 select-none ${
                    isDark
                      ? 'bg-[#0D4D44] text-white shadow-xl shadow-[#0D4D44]/15'
                      : 'bg-white border border-gray-200/90 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 fill-current ${
                            isDark ? 'text-emerald-300' : 'text-[#E05A47]'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 italic ${
                        isDark ? 'text-gray-100' : 'text-gray-700'
                      }`}
                    >
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div
                    className={`flex items-center gap-3 pt-4 border-t ${
                      isDark ? 'border-white/15' : 'border-gray-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                      draggable={false}
                    />
                    <div>
                      <h3
                        className={`text-sm font-bold leading-tight ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`text-[11px] ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}
                      >
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Carousel Indicator Dots */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsInstant(false);
                setIndex(total + idx);
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
              className="focus:outline-none py-2"
            >
              {idx === activeDotIndex ? (
                <motion.div
                  layoutId="testimonialInfiniteDotPill"
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
    </section>
  );
}

