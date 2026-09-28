"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: 1,
    question: "Cakupan asuransi apa yang termasuk?",
    answer:
      "Setiap sewa kendaraan sudah mencakup asuransi komprehensif dasar, termasuk perlindungan terhadap kerusakan akibat tabrakan (CDW), perlindungan pencurian, dan tanggung jawab hukum pihak ketiga. Anda juga dapat memilih opsi asuransi perlindungan penuh tanpa biaya deductible saat reservasi.",
  },
  {
    id: 2,
    question: "Apa saja persyaratan usia?",
    answer:
      "Usia minimum untuk menyewa armada umum kami adalah 21 tahun dengan kepemilikan SIM aktif sekurang-kurangnya 1 tahun. Untuk kategori mobil sport mewah dan supercar tertentu, usia minimum pengemudi adalah 25 tahun.",
  },
  {
    id: 3,
    question: "Bisakah saya mengembalikan mobil di lokasi yang berbeda?",
    answer:
      "Tentu saja. Kami menyediakan layanan pengembalian satu arah (one-way rental) antar lokasi kantor cabang kami, bandara, ataupun hotel pilihan Anda. Silakan pilih opsi lokasi pengembalian yang berbeda saat melakukan pemesanan.",
  },
  {
    id: 4,
    question: "Dokumen apa yang saya perlukan saat penjemputan?",
    answer:
      "Anda hanya perlu menyiapkan KTP/Paspor asli yang masih berlaku, SIM A asli yang aktif, dan kartu kredit atau metode pembayaran atas nama penyewa untuk deposit jaminan.",
  },
];

export default function Faq() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-12 sm:py-16 md:py-20 bg-[#f8f9fc] flex flex-col justify-center">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 tracking-tight mb-3">
            Pertanyaan Umum
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Semua yang perlu Anda ketahui sebelum memulai perjalanan.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden transition-shadow duration-300 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left focus:outline-none transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`flex-shrink-0 text-amber-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                      }`}
                  >
                    <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </button>

                {isExpanded && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="px-6 sm:px-8 pb-6 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-50">
                        {item.answer}
                      </div>
                    </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
