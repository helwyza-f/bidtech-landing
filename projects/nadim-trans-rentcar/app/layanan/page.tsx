"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Key, UserCheck, Plane, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    id: 1,
    title: "Sewa Lepas Kunci",
    description:
      "Kebebasan penuh mengemudi sendiri di Kota Batam dengan pilihan kendaraan terawat prima, bersih, dan wangi.",
    icon: Key,
    iconColor: "text-amber-500",
  },
  {
    id: 2,
    title: "Sewa Dengan Supir",
    description:
      "Nikmati perjalanan tanpa stres bersama pengemudi profesional, ramah, dan hafal seluruh rute penting di Batam.",
    icon: UserCheck,
    iconColor: "text-yellow-600",
  },
  {
    id: 3,
    title: "Antar Jemput Bandara",
    description:
      "Layanan eksklusif tepat waktu untuk penjemputan dan pengantaran Bandara Internasional Hang Nadim Batam.",
    icon: Plane,
    iconColor: "text-amber-600",
  },
  {
    id: 4,
    title: "Bus Pariwisata & Hiace",
    description:
      "Akomodasi perjalanan rombongan wisata, family gathering, serta rombongan dinas instansi di Batam.",
    icon: ShieldCheck,
    iconColor: "text-amber-700",
  },
];

export default function LayananPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-16 sm:pt-20 bg-white">
        {/* Gold & Dark Hero Banner */}
        <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-20 md:py-24 relative overflow-hidden text-center border-b border-amber-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                Layanan PT. Nadim Auto Transindo
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Layanan & Solusi Transportasi Batam
              </h1>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Pilihan layanan mobilitas terlengkap yang dirancang untuk kenyamanan, keamanan, dan ketepatan waktu Anda selama berada di Batam.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4 Premium Service Cards */}
        <section className="py-20 md:py-28 bg-[#fafafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14 sm:mb-20"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-2">
                LAYANAN UNGGULAN
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Pilihan Layanan Fleksibel
              </h2>
            </motion.div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-[32px] p-8 sm:p-10 border border-gray-200 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-amber-400 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group min-h-[380px] justify-center"
                  >
                    <div className="flex flex-col items-center">
                      {/* Icon Container */}
                      <div className="mb-6 transition-transform duration-300 group-hover:scale-110 p-4 rounded-2xl bg-amber-50 border border-amber-200/60 shadow-inner">
                        <Icon className={`w-10 h-10 stroke-[2.2] ${service.iconColor}`} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed max-w-[260px]">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
