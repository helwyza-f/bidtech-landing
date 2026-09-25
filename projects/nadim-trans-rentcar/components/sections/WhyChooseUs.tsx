"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHY_CHOOSE_US_FEATURES } from "@/constants/features";

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative w-full py-12 sm:py-16 md:py-20 bg-white flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Real Office & Fleet Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px]">
              {/* Photo Frame */}
              <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-2xl ring-1 ring-amber-500/20 -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
                <div className="relative aspect-[4/4.8] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950 p-6 flex flex-col justify-between border border-slate-800">
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30">
                      Armada Resmi Batam
                    </span>
                    <span className="text-xs text-slate-400 font-medium">15+ Pilihan Unit</span>
                  </div>

                  <div className="relative w-full h-52 my-auto flex items-center justify-center">
                    <Image
                      src="/images/Fortuner.webp"
                      alt="Armada PT. Nadim Auto Transindo Batam"
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 z-10">
                    <p className="text-sm font-bold text-white">Toyota Fortuner GR Sport & All Fleet</p>
                    <p className="text-xs text-slate-400">Siap Melayani Perjalanan Bisnis & Liburan di Batam</p>
                  </div>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -bottom-6 -right-2 sm:-right-6 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-slate-950 px-6 py-5 sm:px-7 sm:py-6 rounded-2xl shadow-xl shadow-amber-500/30 z-10 border border-amber-300/40"
              >
                <div className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-900 mt-1 whitespace-nowrap">
                  Unit Terawat & Legal
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">
              MENGAPA MEMILIH NADIM TRANS RENTCAR
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 tracking-tight leading-[1.18] mb-6 sm:mb-8">
              Standar Baru dalam <br className="hidden sm:block" />
              Mobilitas Perjalanan di Batam
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {WHY_CHOOSE_US_FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    className="group flex flex-col items-start"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-slate-950 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}