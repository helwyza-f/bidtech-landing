"use client";

import { motion } from "framer-motion";
import { Search, Calendar, Key } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "01. Pilih Kendaraan",
    description:
      "Jelajahi armada premium kami dan temukan yang paling sesuai dengan kebutuhan Anda.",
    icon: Search,
  },
  {
    number: "02",
    title: "02. Tentukan Tanggal",
    description:
      "Pilih jadwal Anda dan layanan tambahan seperti asuransi atau GPS.",
    icon: Calendar,
  },
  {
    number: "03",
    title: "03. Konfirmasi & Berkendara",
    description:
      "Selesaikan pemesanan dan kami akan menyiapkan mobil Anda.",
    icon: Key,
  },
];

export default function HowToBook() {
  return (
    <section className="relative w-full min-h-screen py-20 md:py-24 bg-[#121214] text-white flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase mb-4"
          >
            PROSES MUDAH
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Tiga Langkah Menuju Kebebasan
          </motion.h2>
        </div>

        {/* Steps Grid Container */}
        <div className="relative">
          {/* Connecting Line between steps (Desktop) */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[1px] bg-zinc-800 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Icon Circle */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#18181b] border border-zinc-800 flex items-center justify-center text-zinc-300 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500 group-hover:text-blue-400 shadow-xl">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
