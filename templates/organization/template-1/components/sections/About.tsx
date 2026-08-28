'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Eye, Target, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { ABOUT_DATA } from '@/lib/constants';
import CountUp from '@/components/ui/CountUp';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsScrollRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleCardsScroll = () => {
    if (!cardsScrollRef.current) return;
    const { scrollLeft, clientWidth } = cardsScrollRef.current;
    const cardWidth = clientWidth * 0.82; // approximate card step
    const newIndex = Math.round(scrollLeft / (cardWidth || 1));
    setActiveCardIndex(Math.min(Math.max(0, newIndex), ABOUT_DATA.cards.length - 1));
  };

  const scrollToCard = (idx: number) => {
    if (!cardsScrollRef.current) return;
    const cards = cardsScrollRef.current.children;
    if (cards[idx]) {
      (cards[idx] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveCardIndex(idx);
    }
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax effect for the whole section
  const sectionY = useTransform(scrollYProgress, [0, 1], ['-30px', '30px']);

  // Card stagger container variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Individual card variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  return (
    <section ref={sectionRef} id="tentang-kami" className="py-20 md:py-24 bg-white scroll-mt-20 overflow-hidden">
      <motion.div style={{ y: sectionY }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Tag & Heading */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#E05A47] mb-3"
          >
            {ABOUT_DATA.tag}
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              {/* Text Reveal for Heading */}
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
                }}
                className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0D4D44] tracking-tight leading-[1.2]"
              >
                {Array.isArray(ABOUT_DATA.title) ? (
                  ABOUT_DATA.title.map((line, idx) => (
                    <span key={idx} className="block overflow-hidden">
                      <motion.span
                        variants={{
                          hidden: { y: "100%", opacity: 0 },
                          visible: {
                            y: 0,
                            opacity: 1,
                            transition: {
                              type: "spring",
                              stiffness: 180,
                              damping: 20
                            }
                          }
                        }}
                        className="inline-block"
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))
                ) : (
                  ABOUT_DATA.title
                )}
              </motion.h2>
            </div>
            <div className="lg:col-span-6 lg:pt-2">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-[15px] text-gray-600 leading-relaxed"
              >
                {ABOUT_DATA.description}
              </motion.p>
            </div>
          </div>
        </div>

        {/* 3 Cards — Desktop Grid & Mobile Horizontal Scroll with Pagination */}
        <div className="mb-16">
          <div
            ref={cardsScrollRef}
            onScroll={handleCardsScroll}
            className="flex md:grid md:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-3 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {/* Card 1: Visi */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-center group relative overflow-hidden h-[260px] p-7 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-2xl hover:shadow-[#0D4D44]/25 hover:bg-[#0D4D44] hover:border-[#0D4D44] transition-all duration-300 flex flex-col justify-start cursor-pointer"
            >
              {/* Ambient Glow on Hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Container with Scale Animation */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-white/15 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
              >
                <Eye className="w-6 h-6 text-[#0D4D44] group-hover:text-[#5EEAD4] transition-colors duration-300" strokeWidth={1.75} />
              </motion.div>
              <h3 className="text-xl font-extrabold text-[#0D4D44] group-hover:text-white mb-2.5 transition-colors duration-300">Visi</h3>
              <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-200 leading-relaxed line-clamp-4 transition-colors duration-300">
                {ABOUT_DATA.cards[0].description}
              </p>
            </motion.div>

            {/* Card 2: Misi */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-center group relative overflow-hidden h-[260px] p-7 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-2xl hover:shadow-[#0D4D44]/25 hover:bg-[#0D4D44] hover:border-[#0D4D44] transition-all duration-300 flex flex-col justify-start cursor-pointer"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.35 }}
                className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-white/15 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
              >
                <Target className="w-6 h-6 text-[#0D4D44] group-hover:text-[#5EEAD4] transition-colors duration-300" strokeWidth={1.75} />
              </motion.div>
              <h3 className="text-xl font-extrabold text-[#0D4D44] group-hover:text-white mb-2.5 transition-colors duration-300">Misi</h3>
              <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-200 leading-relaxed line-clamp-4 transition-colors duration-300">
                {ABOUT_DATA.cards[1].description}
              </p>
            </motion.div>

            {/* Card 3: Nilai-Nilai Kami */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-center group relative overflow-hidden h-[260px] p-7 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-2xl hover:shadow-[#0D4D44]/25 hover:bg-[#0D4D44] hover:border-[#0D4D44] transition-all duration-300 flex flex-col justify-start cursor-pointer"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                className="w-12 h-12 rounded-xl bg-red-50 group-hover:bg-white/15 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
              >
                <Heart className="w-6 h-6 text-[#E05A47] group-hover:text-[#5EEAD4] transition-colors duration-300" strokeWidth={1.75} />
              </motion.div>
              <h3 className="text-xl font-extrabold text-[#0D4D44] group-hover:text-white mb-2.5 transition-colors duration-300">Nilai-Nilai Kami</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
                {ABOUT_DATA.cards[2].bullets?.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E05A47] group-hover:bg-[#5EEAD4] shrink-0 transition-colors duration-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Mobile Pagination & Navigation Arrows */}
          <div className="md:hidden flex items-center justify-between gap-4 mt-5 px-4">
            <button
              onClick={() => scrollToCard(Math.max(0, activeCardIndex - 1))}
              disabled={activeCardIndex === 0}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#0D4D44] hover:text-white text-gray-700 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all active:scale-95 shadow-sm border border-gray-200"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {ABOUT_DATA.cards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    activeCardIndex === idx
                      ? 'w-6 h-2 bg-[#0D4D44]'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Lihat kartu ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToCard(Math.min(ABOUT_DATA.cards.length - 1, activeCardIndex + 1))}
              disabled={activeCardIndex === ABOUT_DATA.cards.length - 1}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#0D4D44] hover:text-white text-gray-700 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all active:scale-95 shadow-sm border border-gray-200"
              aria-label="Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Stats Numbers Strip using CountUp */}
        <div className="pt-12 border-t border-gray-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {ABOUT_DATA.stats.map((stat, idx) => {
              // Parse number and suffix from string like "15+" or "92%"
              const numValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10) || 0;
              const suffix = stat.value.replace(/[0-9]/g, '');

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-2 sm:p-4"
                >
                  <div className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#0D4D44] tracking-tight mb-2 leading-none">
                    <CountUp end={numValue} suffix={suffix} duration={2} />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
