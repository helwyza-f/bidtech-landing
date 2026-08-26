"use client";

import { useState, useMemo } from "react";
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

// Categorized FAQs
const FAQ_CATEGORIES = [
  { id: "pemesanan", name: "Pemesanan", icon: Car, title: "Pemesanan Kendaraan" },
  { id: "dokumen", name: "Dokumen & Syarat", icon: FileText, title: "Dokumen & Persyaratan" },
  { id: "pembayaran", name: "Pembayaran", icon: CreditCard, title: "Metode & Ketentuan Pembayaran" },
  { id: "asuransi", name: "Asuransi", icon: Shield, title: "Cakupan & Layanan Asuransi" },
];

const ALL_FAQS = [
  // 1. Pemesanan
  {
    id: 1,
    category: "pemesanan",
    question: "Bagaimana cara menyewa kendaraan di Rentcar",
    answer:
      "Proses penyewaan sangat mudah. Anda dapat memilih kendaraan melalui halaman 'Kendaraan', memilih tanggal sewa, dan mengisi formulir pemesanan. Tim kami akan menghubungi Anda untuk konfirmasi akhir dan pengaturan pengiriman atau pengambilan kendaraan.",
  },
  {
    id: 2,
    category: "pemesanan",
    question: "Dokumen apa saja yang diperlukan untuk menyewa?",
    answer:
      "Anda hanya perlu menyiapkan KTP/Paspor asli yang masih berlaku, SIM A asli yang aktif (minimal 1 tahun), dan kartu kredit atau metode verifikasi identitas resmi lainnya.",
  },
  {
    id: 3,
    category: "pemesanan",
    question: "Bagaimana kebijakan pembatalan (cancellation policy)?",
    answer:
      "Pembatalan gratis dapat dilakukan hingga 24 jam sebelum jadwal waktu penjemputan armada. Jika pembatalan dilakukan kurang dari 24 jam, akan dikenakan biaya administrasi sesuai syarat dan ketentuan.",
  },
  {
    id: 4,
    category: "pemesanan",
    question: "Metode pembayaran apa saja yang diterima?",
    answer:
      "Kami menerima Transfer Bank (BCA, Mandiri, BNI, BRI), Kartu Kredit/Debit (Visa, MasterCard), Virtual Account, serta e-Wallet dan QRIS terverifikasi.",
  },
  {
    id: 5,
    category: "pemesanan",
    question: "Bisakah mobil diantar langsung ke bandara atau hotel saya?",
    answer:
      "Ya, kami menyediakan layanan pengantaran dan penjemputan armada gratis ke bandara utama dan hotel-hotel berbintang di dalam area jangkauan kota.",
  },

  // 2. Dokumen & Syarat
  {
    id: 6,
    category: "dokumen",
    question: "Berapa usia minimum pengemudi untuk sewa lepas kunci?",
    answer:
      "Usia minimum pengemudi adalah 21 tahun dengan kepemilikan SIM A aktif sekurang-kurangnya 1 tahun. Untuk supercar atau kategori mobil sport tertentu, batas usia minimum adalah 25 tahun.",
  },
  {
    id: 7,
    category: "dokumen",
    question: "Apakah Warga Negara Asing (WNA) bisa menyewa kendaraan?",
    answer:
      "Tentu saja. WNA wajib melampirkan Paspor asli yang masih berlaku, KITAS/Visa tinggal, dan International Driving Permit (SIM Internasional) yang sah.",
  },
  {
    id: 8,
    category: "dokumen",
    question: "Apakah diperlukan deposit jaminan selama masa sewa?",
    answer:
      "Ya, untuk sewa lepas kunci diperlukan deposit jaminan yang akan dikembalikan secara penuh 100% setelah masa sewa selesai dan kendaraan diperiksa.",
  },

  // 3. Pembayaran
  {
    id: 9,
    category: "pembayaran",
    question: "Kapan pembayaran sewa harus dilunasi?",
    answer:
      "Pembayaran uang muka (down payment) dilakukan saat konfirmasi reservasi, dan pelunasan dapat dilakukan sebelum atau saat serah terima kunci kendaraan.",
  },
  {
    id: 10,
    category: "pembayaran",
    question: "Apakah ada biaya tersembunyi selain harga sewa yang tertera?",
    answer:
      "Tidak ada biaya tersembunyi. Harga yang tertera sudah mencakup asuransi komprehensif dasar dan pajak. Biaya tambahan hanya berlaku jika Anda memilih add-on seperti sopir ekstra atau asuransi Super CDW.",
  },
  {
    id: 11,
    category: "pembayaran",
    question: "Berapa lama proses pengembalian uang deposit jaminan?",
    answer:
      "Pengembalian deposit dilakukan maksimal 1x24 jam kerja melalui transfer bank setelah kendaraan dikembalikan dalam kondisi baik.",
  },

  // 4. Asuransi
  {
    id: 12,
    category: "asuransi",
    question: "Apa saja perlindungan asuransi yang termasuk dalam paket sewa?",
    answer:
      "Semua armada kami dilindungi oleh asuransi Collision Damage Waiver (CDW), perlindungan pencurian (Theft Protection), dan tanggung jawab hukum pihak ketiga (Third Party Liability).",
  },
  {
    id: 13,
    category: "asuransi",
    question: "Apa itu opsi Super CDW (Zero Excess / Deductible)?",
    answer:
      "Super CDW adalah opsi proteksi tambahan yang membebaskan Anda dari seluruh biaya risiko sendiri jika terjadi lecet, baret, atau insiden tidak terduga di jalan.",
  },
  {
    id: 14,
    category: "asuransi",
    question: "Apa yang harus dilakukan jika terjadi kendala teknis atau insiden?",
    answer:
      "Hubungi layanan darurat 24/7 kami segera. Tim Roadside Assistance kami akan segera meluncur ke lokasi Anda untuk memberikan penanganan atau mobil pengganti.",
  },
];

export default function FaqPage() {
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

      <main className="min-h-screen pt-16 sm:pt-20 bg-white">
        {/* 1. Blue Hero Banner */}
        <section className="bg-blue-600 text-white py-16 sm:py-20 md:py-24 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Pusat Bantuan & FAQ
              </h1>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
                Temukan jawaban untuk pertanyaan umum tentang layanan penyewaan mobil mewah kami. Kami hadir untuk memastikan perjalanan Anda tak terlupakan.
              </p>

              {/* Centered Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="w-4 h-4 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari pertanyaan anda..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3.5 bg-white text-gray-900 placeholder-gray-400 rounded-full text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-400/40 shadow-lg shadow-blue-900/20 transition-all"
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
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
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
                            ? "bg-blue-50 text-blue-600 shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-blue-600" : "text-gray-500"
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
                      className="text-xs text-blue-600 font-bold hover:underline"
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
                          <div className="pt-4 text-blue-500 shrink-0">
                            <HelpCircle className="w-5 h-5 stroke-[1.8]" />
                          </div>

                          {/* Card Container */}
                          <div
                            className={`flex-1 rounded-2xl border transition-all duration-200 overflow-hidden ${
                              isExpanded
                                ? "bg-white border-blue-100 shadow-lg shadow-blue-50/50"
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
                                  isExpanded ? "text-blue-600" : "text-gray-800"
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

            {/* 3. Masih Memiliki Pertanyaan? (Large Blue Bottom Banner) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 bg-blue-600 rounded-3xl p-8 sm:p-12 md:p-14 text-white text-center shadow-xl shadow-blue-600/20"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
                Masih memiliki pertanyaan?
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8 font-normal">
                Tim spesialis layanan pelanggan kami siap membantu Anda 24/7. Hubungi kami untuk pertanyaan lebih lanjut atau bantuan pemesanan.
              </p>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-gray-50 text-blue-600 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <Headphones className="w-4 h-4" />
                <span>Hubungi Kami</span>
              </a>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
