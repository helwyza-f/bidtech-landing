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
      "Kebebasan penuh mengemudi sendiri dengan pilihan kendaraan premium yang selalu dalam kondisi prima dan terawat.",
    icon: Key,
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Sewa Dengan Sopir",
    description:
      "Nikmati perjalanan tanpa stres bersama pengemudi profesional berdedikasi dan berpengalaman kami.",
    icon: UserCheck,
    iconColor: "text-amber-700",
  },
  {
    id: 3,
    title: "Antar Jemput Bandara",
    description:
      "Layanan eksklusif dan tepat waktu untuk penjemputan maupun pengantaran bandara VIP Anda.",
    icon: Plane,
    iconColor: "text-gray-500",
  },
  {
    id: 4,
    title: "Layanan Asuransi",
    description:
      "Perlindungan komprehensif premium untuk memberikan ketenangan pikiran ekstra selama masa sewa.",
    icon: ShieldCheck,
    iconColor: "text-red-600",
  },
];

export default function LayananPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-16 sm:pt-20 bg-white">
        {/* Blue Hero Banner */}
        <section className="bg-blue-600 text-white py-16 sm:py-20 md:py-24 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Layanan & Bantuan
              </h1>
              <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Solusi mobilitas premium yang dirancang eksklusif untuk kenyamanan dan keamanan perjalanan Anda.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4 Premium Service Cards */}
        <section className="py-20 md:py-28 bg-[#f8fafd]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14 sm:mb-20"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-2">
                PREMIUM SERVICE
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Layanan Unggulan Kami
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
                    className="bg-white rounded-[32px] p-8 sm:p-10 border border-gray-200/90 shadow-xl shadow-gray-200/60 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group min-h-[400px] justify-center"
                  >
                    <div className="flex flex-col items-center">
                      {/* Icon Container */}
                      <div className="mb-8 transition-transform duration-300 group-hover:scale-110">
                        <Icon className={`w-14 h-14 stroke-[2.2] ${service.iconColor}`} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
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
