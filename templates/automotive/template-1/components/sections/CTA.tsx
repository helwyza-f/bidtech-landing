"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA_PERKS = [
  {
    id: 1,
    icon: BadgeCheck,
    title: "Konfirmasi Instan",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Pembayaran Aman",
  },
  {
    id: 3,
    icon: Star,
    title: "Program Hadiah Keanggotaan",
  },
];

export default function CTA() {
  return (
    <section className="w-full min-h-screen py-16 md:py-24 bg-white flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-blue-600 rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl shadow-blue-600/30 overflow-hidden"
        >
          {/* Subtle background glow circle decorations */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Sisi Kiri: Headline, Subtext & Tombol CTA */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-white leading-[1.15] tracking-tight mb-6">
                Siap untuk memulai <br />
                perjalanan luar biasa <br />
                Anda?
              </h2>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-lg mb-9">
                Bergabunglah dengan ribuan pengemudi yang telah meningkatkan
                pengalaman perjalanan mereka. Mobil impian Anda hanya beberapa klik
                saja.
              </p>

              <Button
                size="lg"
                className="bg-white hover:bg-gray-50 text-blue-600 font-bold uppercase tracking-wider h-14 sm:h-16 px-8 sm:px-10 rounded-2xl text-sm sm:text-base shadow-xl shadow-black/10 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Pesan Sekarang
              </Button>
            </div>

            {/* Sisi Kanan: Kartu Glassmorphism Manfaat / Perks */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/[0.08] backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/15 p-6 sm:p-8 shadow-inner">
                <div className="divide-y divide-white/15">
                  {CTA_PERKS.map((perk) => {
                    const Icon = perk.icon;
                    return (
                      <div
                        key={perk.id}
                        className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <div className="w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-white font-medium text-sm sm:text-base">
                          {perk.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}