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
    question: "Bagaimana cara menyewa kendaraan di NadimTrans RentCar?",
    answer:
      "Pilih unit di halaman Kendaraan, tentukan tanggal dan kebutuhan perjalanan Anda, lalu kirim permintaan pemesanan. Tim NadimTrans akan menghubungi Anda untuk mengonfirmasi ketersediaan unit, jadwal, titik jemput, dan detail perjalanan.",
  },
  {
    id: 15,
    category: "pemesanan",
    question: "Apa yang termasuk dalam paket All In?",
    answer:
      "Paket All In sudah mencakup kendaraan, supir, dan BBM untuk pemakaian di area Batam. Paket ini tersedia untuk Alphard Gen 3, Alphard Gen 4, Hiace Commuter, Hiace Premio Basic, dan Hiace Premio VIP.",
  },
  {
    id: 16,
    category: "pemesanan",
    question: "Berapa lama durasi paket All In?",
    answer:
      "Paket All In berlaku hingga 10 jam per pemesanan. Apabila perjalanan membutuhkan waktu lebih lama, silakan konfirmasikan kebutuhan overtime kepada tim NadimTrans saat pemesanan.",
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
      "Kami menerima transfer bank dan e-Wallet resmi A/n Dwi Gandhi Herdian: BNI (0352721997), BCA (0611847466), Mandiri (1090022349898), SeaBank (901960264464), dan DANA (081276003870). Pembayaran pelunasan juga dapat dilakukan saat serah terima kunci kendaraan.",
  },
  {
    id: 5,
    category: "pemesanan",
    question: "Bisakah mobil diantar langsung ke bandara atau hotel saya?",
    answer:
      "Ya, layanan antar-jemput tersedia untuk Bandara Hang Nadim, terminal ferry, hotel, dan titik lain di area Batam. Sampaikan lokasi jemput dan tujuan Anda saat pemesanan agar tim dapat mengonfirmasi pengaturannya.",
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
      "Tidak ada biaya tersembunyi. Untuk unit berlabel All In, tarif sudah mencakup mobil, supir, dan BBM hingga 10 jam pemakaian di area Batam. Biaya tambahan hanya dapat berlaku untuk overtime atau kebutuhan di luar kesepakatan awal.",
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
