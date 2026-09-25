"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Car,
  FileText,
  CreditCard,
  Shield,
  HelpCircle,
  Headphones,
} from "lucide-react";

import { ALL_FAQS } from "@/lib/faqData";

// Categorized FAQs
export const FAQ_CATEGORIES = [
  { id: "pemesanan", name: "Pemesanan", icon: Car, title: "Pemesanan Kendaraan" },
  { id: "dokumen", name: "Dokumen & Syarat", icon: FileText, title: "Dokumen & Persyaratan" },
  { id: "pembayaran", name: "Pembayaran", icon: CreditCard, title: "Metode & Ketentuan Pembayaran" },
  { id: "asuransi", name: "Asuransi", icon: Shield, title: "Cakupan & Layanan Asuransi" },
];

export default function FaqClient() {
  const [activeCategory, setActiveCategory] = useState("pemesanan");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  // Filter FAQs based on search or active category
  const displayedFaqs = useMemo(() => {
    if (searchQuery.trim() !== "") {
      return ALL_FAQS.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return ALL_FAQS.filter((faq) => faq.category === activeCategory);
  }, [activeCategory, searchQuery]);

  const activeCategoryObj = FAQ_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* 1. Dark & Gold Hero Banner with NTR Luxury Showroom Backdrop */}
        <section className="relative text-white pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 overflow-hidden text-center border-b border-amber-500/20 bg-slate-950">
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
            <Image
              src="/images/background-3.webp"
              alt="Pusat Bantuan Batam - Nadim Trans RentCar"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.9] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/50 z-[1]" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl z-[2] pointer-events-none" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md">
                Pusat Bantuan & <span className="text-amber-400">FAQ Batam</span>
              </h1>
              <p className="text-gray-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-sm">
                Temukan jawaban lengkap seputar ketentuan sewa lepas kunci, layanan dengan supir, metode pembayaran, hingga antar jemput Bandara Hang Nadim Batam.
              </p>

              {/* Centered Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="w-4 h-4 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari pertanyaan anda..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3.5 bg-white text-gray-900 placeholder-gray-400 rounded-full text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-amber-500/30 shadow-lg shadow-black/20 transition-all border border-amber-500/30"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Main Content (Sidebar + FAQs) */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Category Sidebar */}
              <div className="lg:col-span-4">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">
                  KATEGORI
                </p>
                <div className="space-y-1.5">
                  {FAQ_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id && searchQuery === "";
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setSearchQuery("");
                        }}
                        className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                          isActive
                            ? "bg-amber-50 text-amber-700 border border-amber-300 shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-amber-600" : "text-gray-500"
                          }`}
                        />
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: FAQs Accordion */}
              <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : activeCategoryObj?.title}
                </h2>

                {displayedFaqs.length === 0 ? (
                  <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100">
                    <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-base font-bold text-gray-800 mb-1">
                      Tidak ada pertanyaan yang cocok
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Coba gunakan kata kunci lain atau pilih kategori di sebelah kiri.
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-amber-600 font-bold hover:underline"
                    >
                      Reset Pencarian
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {displayedFaqs.map((faq) => {
                      const isExpanded = expandedId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="flex items-start gap-3"
                        >
                          {/* Question Mark Icon */}
                          <div className="pt-4 text-amber-500 shrink-0">
                            <HelpCircle className="w-5 h-5 stroke-[1.8]" />
                          </div>

                          {/* Card Container */}
                          <div
                            className={`flex-1 rounded-2xl border transition-all duration-200 overflow-hidden ${
                              isExpanded
                                ? "bg-white border-amber-300 shadow-lg shadow-amber-500/5"
                                : "bg-white border-gray-100 shadow-sm hover:border-gray-200"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                              className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                            >
                              <span
                                className={`text-sm sm:text-base font-bold transition-colors ${
                                  isExpanded ? "text-amber-600" : "text-gray-800"
                                }`}
                              >
                                {faq.question}
                              </span>
                            </button>

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                >
                                  <div className="px-6 pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50/80 mt-1 pt-3">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* 3. Masih Memiliki Pertanyaan? Bottom Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 bg-slate-950 rounded-3xl p-8 sm:p-12 md:p-14 text-white text-center shadow-2xl border-2 border-amber-500/30"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight text-white">
                Masih memiliki pertanyaan?
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8 font-normal">
                Tim spesialis layanan pelanggan Nadim Trans RentCar siap membantu Anda 24/7. Hubungi kami untuk konsultasi unit atau booking cepat.
              </p>

              <a
                href="https://wa.me/6281276603878"
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Headphones className="w-4 h-4" />
                <span>Chat WhatsApp CS Batam</span>
              </a>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
