'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TEAM_MEMBERS } from '@/lib/constants';

export default function Team() {
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  const handleTeamScroll = () => {
    if (!teamScrollRef.current) return;
    const { scrollLeft, clientWidth } = teamScrollRef.current;
    const cardWidth = clientWidth * 0.64;
    const newIndex = Math.round(scrollLeft / (cardWidth || 1));
    setActiveTeamIndex(Math.min(Math.max(0, newIndex), TEAM_MEMBERS.length - 1));
  };

  const scrollToMember = (idx: number) => {
    if (!teamScrollRef.current) return;
    const items = teamScrollRef.current.children;
    if (items[idx]) {
      (items[idx] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveTeamIndex(idx);
    }
  };

  return (
    <section id="pengurus" className="pt-24 pb-20 md:pt-32 md:pb-24 bg-white border-t border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-left mb-10 md:mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-extrabold text-[#0D4D44] tracking-tight mb-2"
          >
            Pengurus & Tim
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-gray-600 max-w-xl leading-relaxed"
          >
            Didukung oleh para profesional dan relawan berdedikasi yang memiliki komitmen kuat dalam menjalankan setiap program kerja sosial dan edukasi.
          </motion.p>
        </motion.div>

        {/* Team Desktop Grid & Mobile Horizontal Scroll */}
        <div>
          <div
            ref={teamScrollRef}
            onScroll={handleTeamScroll}
            className="flex md:grid md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="w-[64vw] sm:w-[220px] md:w-auto shrink-0 snap-center text-center group bg-gray-50/50 md:bg-transparent p-4 md:p-0 rounded-2xl border border-gray-100 md:border-0"
              >
                {/* Photo */}
                <div className="rounded-2xl overflow-hidden aspect-square mb-4 bg-gray-100 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 leading-tight">
                  {member.name}
                </h3>
                <span className="inline-block text-[10px] sm:text-[11px] font-extrabold text-[#E05A47] uppercase tracking-wider">
                  {member.role}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination & Navigation Arrows */}
          <div className="md:hidden flex items-center justify-between gap-4 mt-5 px-4">
            <button
              onClick={() => scrollToMember(Math.max(0, activeTeamIndex - 1))}
              disabled={activeTeamIndex === 0}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#0D4D44] hover:text-white text-gray-700 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all active:scale-95 shadow-sm border border-gray-200"
              aria-label="Anggota Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {TEAM_MEMBERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToMember(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    activeTeamIndex === idx
                      ? 'w-6 h-2 bg-[#0D4D44]'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Lihat anggota tim ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToMember(Math.min(TEAM_MEMBERS.length - 1, activeTeamIndex + 1))}
              disabled={activeTeamIndex === TEAM_MEMBERS.length - 1}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#0D4D44] hover:text-white text-gray-700 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all active:scale-95 shadow-sm border border-gray-200"
              aria-label="Anggota Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

