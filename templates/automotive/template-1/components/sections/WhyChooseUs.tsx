"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHY_CHOOSE_US_FEATURES } from "@/constants/features";

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative w-full min-h-screen py-20 md:py-24 bg-white flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">


          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px]">

              <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-2xl ring-1 ring-gray-100/80 -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
                <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src="/images/why-choose-us.webp"
                    alt="Interior Mobil Mewah RentCar"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>


              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -bottom-6 -right-2 sm:-right-6 bg-blue-600 text-white px-6 py-5 sm:px-7 sm:py-6 rounded-2xl shadow-xl shadow-blue-600/30 z-10"
              >
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  15+
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-100 mt-1 whitespace-nowrap">
                  Tahun Pengalaman
                </div>
              </motion.div>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-3">
              MENGAPA MEMILIH RENTCAR
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 tracking-tight leading-[1.18] mb-10 sm:mb-12">
              Standar Baru dalam <br className="hidden sm:block" />
              Mobilitas Perjalanan
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
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
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