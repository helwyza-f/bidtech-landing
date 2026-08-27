'use client';

import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '@/lib/constants';

export default function Team() {
  return (
    <section id="pengurus" className="pt-28 pb-20 md:pt-32 md:pb-24 bg-white border-t border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-left mb-12"
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

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-center group"
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
      </div>
    </section>
  );
}

