export interface FaqItem {
  id: number;
  category: "pemesanan" | "dokumen" | "pembayaran" | "asuransi";
  question: string;
  answer: string;
}

export const ALL_FAQS: FaqItem[] = [
  // 1. Pemesanan
  {
    id: 1,
    category: "pemesanan",
    question: "Bagaimana cara menyewa kendaraan di Nadim Trans RentCar?",
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
      "Ya, kami menyediakan layanan pengantaran dan penjemputan armada gratis ke bandara utama (Bandara Hang Nadim BTH) dan hotel-hotel berbintang di dalam area Kota Batam.",
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
