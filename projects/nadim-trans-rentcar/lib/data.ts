export interface CarSpec {
  seats: number;
  luggage: number;
  transmission: string;
  fuel: string;
  engine?: string;
  power?: string;
  acceleration?: string;
  topSpeed?: string;
  year?: number;
}

export interface Car {
  id: number;
  name: string;
  type: string;
  category: "MPV" | "SUV" | "City Car" | "Sedan" | "Minibus";
  price: number;
  priceFormatted: string;
  priceNote?: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviews: number;
  specs: CarSpec;
  featured: boolean;
  description: string;
  features: string[];
  included: string[];
  terms: string[];
}

export const COMPANY_INFO = {
  name: "PT. Nadim Auto Transindo",
  brand: "Nadim Trans RentCar",
  tagline: "Solusi Transportasi Nyaman untuk Setiap Perjalanan Anda di Batam",
  city: "Batam",
  address: "Perumahan KDA Cluster Kepodang, Jl. Kepodang 3 No. 2, Belian, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29464",
  phone: "+62 812-7660-3878",
  phone2: "+62 822-7132-2301",
  whatsapp: "6281276603878",
  email: "pt.nadimautotransindo@gmail.com",
};

export const ALL_CARS: Car[] = [
  {
    id: 1,
    name: "Toyota Alphard VIP",
    type: "Luxury Executive MPV",
    category: "MPV",
    price: 3000000,
    priceFormatted: "3.000.000",
    priceNote: "per 12 Jam (Include Driver & BBM)",
    image: "/images/mobil-22.webp",
    gallery: [
      "/images/mobil-22.webp",
      "/images/mobil-4.webp",
      "/images/mobil-9.webp",
      "/images/mobil-18.webp",
      "/images/mobil-1.webp",
      "/images/mobil-6.webp",
      "/images/mobil-19.webp",
    ],
    rating: 5.0,
    reviews: 64,
    specs: {
      seats: 7,
      luggage: 4,
      transmission: "CVT Otomatis",
      fuel: "Bensin Premium",
      engine: "2.5L DOHC 4-Silinder Dual VVT-i",
      power: "180 HP",
      acceleration: "8.9 detik (0-100 km/h)",
      topSpeed: "180 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Toyota Alphard VIP adalah standar kemewahan tertinggi dalam mobilitas eksekutif di Kota Batam. Ideal untuk penjemputan tamu VVIP di Bandara Internasional Hang Nadim, kunjungan pejabat, rombongan bisnis Singapura/Malaysia, dan acara formal.",
    features: [
      "Executive Ottoman Captain Seat dengan Pemanas/Pendingin",
      "Dual Electric Panoramic Sunroof",
      "Rear Seat Entertainment Monitor & Audio Premium",
      "Pintu Geser Elektrik Kanan & Kiri Otomatis",
      "Kabin Kedap Suara & Privasi Tingkat Tinggi",
      "Kamera 360° & Toyota Safety Sense (TSS)",
    ],
    included: [
      "Sudah Termasuk Supir Profesional & Berpengalaman",
      "Bahan Bakar Minyak (BBM) Sudah Termasuk",
      "Unit Bersih, Harum, & Steril Setiap Hari",
      "Layanan Antar Jemput VVIP Bandara Hang Nadim",
    ],
    terms: [
      "KTP / Paspor asli yang masih berlaku",
      "Konfirmasi jadwal sewa minimal 1 hari sebelumnya",
      "Tarif berlaku untuk pemakaian rute area Batam",
      "Layanan overtime tersedia sesuai kesepakatan",
    ],
  },
  {
    id: 2,
    name: "Toyota Fortuner GR Sport",
    type: "Premium High SUV",
    category: "SUV",
    price: 1300000,
    priceFormatted: "1.300.000",
    priceNote: "per Hari (Lepas Kunci) / Rp 2.000.000 (Mobil + Driver 12 Jam)",
    image: "/images/mobil-21.webp",
    gallery: [
      "/images/mobil-21.webp",
      "/images/mobil-16.webp",
    ],
    rating: 4.9,
    reviews: 52,
    specs: {
      seats: 7,
      luggage: 4,
      transmission: "6-Speed Otomatis Sport",
      fuel: "Diesel Turbo",
      engine: "2.8L 1GD-FTV Diesel Turbo Intercooler",
      power: "204 HP",
      acceleration: "9.2 detik (0-100 km/h)",
      topSpeed: "190 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Toyota Fortuner GR Sport menawarkan performa mesin tangguh dengan sentuhan bodi Gazoo Racing yang agresif dan berwibawa. Sangat nyaman untuk perjalanan inspeksi proyek kawasan industri Batam, liburan keluarga, maupun kunjungan kerja dinas.",
    features: [
      "Bodykit & Emblem Eksklusif GR Sport",
      "Suspensi GR Sport yang Lebih Stabil & Nyaman",
      "Power Backdoor dengan Kick Sensor",
      "Head Unit Layar Sentuh 9 Inch dengan Smartphone Mirroring",
      "Surround Monitor 360 Derajat & Blind Spot Detection",
      "AC Digital Dual Zone dengan Climate Control",
    ],
    included: [
      "Pilihan Lepas Kunci atau dengan Supir Berpengalaman",
      "Asuransi All-Risk Kendaraan",
      "Unit Servis Rutin Resmi & Kondisi Prima",
      "Layanan Bantuan Darurat 24 Jam",
    ],
    terms: [
      "KTP Asli & SIM A Aktif (untuk lepas kunci)",
      "Deposit jaminan refundable sebelum serah terima unit",
      "Durasi sewa minimal 1 x 24 Jam",
    ],
  },
  {
    id: 3,
    name: "Toyota Innova Zenix",
    type: "Modern Hybrid / Gasoline MPV",
    category: "MPV",
    price: 600000,
    priceFormatted: "600.000",
    priceNote: "per Hari (Lepas Kunci) / Rp 1.200.000 (Mobil + Driver 12 Jam)",
    image: "/images/mobil-14.webp",
    gallery: [
      "/images/mobil-14.webp",
    ],
    rating: 4.9,
    reviews: 58,
    specs: {
      seats: 7,
      luggage: 3,
      transmission: "Direct-Shift CVT Otomatis",
      fuel: "Bensin",
      engine: "2.0L M20A-FKS Dynamic Force",
      power: "174 HP",
      acceleration: "9.6 detik (0-100 km/h)",
      topSpeed: "185 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Toyota Innova Zenix hadir dengan arsitektur TNGA penggerak roda depan (FWD) yang menghasilkan kabin jauh lebih senyap, lega, dan suspensi nyaman layaknya sedan mewah. Unit favorit pelanggan bisnis dan keluarga di Batam.",
    features: [
      "Platform TNGA: Kenyamanan Berkendara Maksimal",
      "Kabin Luas 7 Penumpang dengan Legroom Ekstra",
      "Layar Infotainment 10 Inch dengan Apple CarPlay & Android Auto",
      "Electric Parking Brake (EPB) with Auto Brake Hold",
      "Digital AC Double Blower Cepat Dingin",
      "Vehicle Stability Control & Hill Start Assist",
    ],
    included: [
      "Unit Bersih & Terawat",
      "Asuransi Kendaraan Terpercaya",
      "Tersedia Opsi Lepas Kunci atau dengan Driver",
      "Dukungan Customer Care Cepat Respon",
    ],
    terms: [
      "KTP / Paspor asli yang masih berlaku",
      "SIM A aktif untuk penyewa lepas kunci",
      "Deposit jaminan refundable",
      "Durasi sewa harian minimal 24 Jam",
    ],
  },
  {
    id: 4,
    name: "Hyundai Stargazer",
    type: "Futuristic Family MPV",
    category: "MPV",
    price: 400000,
    priceFormatted: "400.000",
    priceNote: "per Hari (Lepas Kunci)",
    image: "/images/mobil-8.webp",
    gallery: [
      "/images/mobil-8.webp",
      "/images/mobil-2.webp",
    ],
    rating: 4.8,
    reviews: 44,
    specs: {
      seats: 7,
      luggage: 3,
      transmission: "IVT Otomatis",
      fuel: "Bensin",
      engine: "1.5L Smartstream MPI",
      power: "115 HP",
      acceleration: "10.4 detik (0-100 km/h)",
      topSpeed: "175 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Hyundai Stargazer memadukan siluet one-curve aerodinamis futuristik dengan kabin multifungsi yang sangat ergonomis. Dilengkapi beragam tempat penyimpanan, AC dingin merata, dan peredaman kabin yang sangat senyap.",
    features: [
      "Horizontal DRL & Distinctive H-Rear Lamp",
      "Head Unit Touchscreen 8 Inch Smartphone Integration",
      "Wireless Smartphone Charger",
      "Tire Pressure Monitoring System (TPMS)",
      "Rear View Camera dengan Dynamic Guidelines",
      "Banyak Cup Holder & Ruang Penyimpanan Rahasia",
    ],
    included: [
      "Asuransi Komprehensif Dasar",
      "Unit Baru & Bersih Bebas Bau Rokok",
      "Gratis Konsultasi Rekomendasi Rute Wisata Batam",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi minimal sewa 24 Jam",
    ],
  },
  {
    id: 5,
    name: "Toyota Avanza",
    type: "Compact Family MPV",
    category: "MPV",
    price: 350000,
    priceFormatted: "350.000",
    priceNote: "per Hari (Lepas Kunci)",
    image: "/images/mobil-17.webp",
    gallery: [
      "/images/mobil-17.webp",
      "/images/mobil-11.webp",
    ],
    rating: 4.8,
    reviews: 79,
    specs: {
      seats: 7,
      luggage: 3,
      transmission: "CVT Otomatis / Manual",
      fuel: "Bensin",
      engine: "1.5L 2NR-VE Dual VVT-i",
      power: "106 HP",
      acceleration: "11.2 detik (0-100 km/h)",
      topSpeed: "170 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Toyota Avanza generasi terbaru merupakan mobil sejuta umat dengan kenyamanan suspensi baru dan interior modern. Pilihan tepat untuk perjalanan hemat bahan bakar, gesit, dan mampu menampung hingga 7 orang penumpang.",
    features: [
      "Konfigurasi Kursi Long Sofa Mode yang Fleksibel",
      "Head Unit Modern 9 Inch dengan Mirroring",
      "Tilt Steering & Start/Stop Engine Button",
      "Dual Airbags & ABS + EBD + BA",
      "AC Double Blower Cepat Dingin untuk Iklim Tropis Batam",
    ],
    included: [
      "Unit Bersih & Siap Pakai",
      "Asuransi Dasar Terjamin",
      "Customer Support Siaga 24 Jam",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 hari",
    ],
  },
  {
    id: 6,
    name: "Toyota Raize Turbo",
    type: "Modern Compact Turbo SUV",
    category: "SUV",
    price: 350000,
    priceFormatted: "350.000",
    priceNote: "per Hari (Lepas Kunci)",
    image: "/images/mobil-12.webp",
    gallery: [
      "/images/mobil-12.webp",
      "/images/mobil-7.webp",
    ],
    rating: 4.8,
    reviews: 36,
    specs: {
      seats: 5,
      luggage: 2,
      transmission: "CVT Otomatis",
      fuel: "Bensin",
      engine: "1.0L 3-Silinder Turbo 1KR-VET",
      power: "98 HP",
      acceleration: "10.0 detik (0-100 km/h)",
      topSpeed: "175 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Toyota Raize Turbo memadukan aura SUV sporty yang berani dengan tarikan mesin turbo responsif. Sangat lincah bermanuver di jalanan kota Batam, mudah parkir, dan tampil gaya kemanapun Anda pergi.",
    features: [
      "Mesin Turbocharge Responsif & Hemat Konsumsi BBM",
      "Digital TFT Instrument Cluster 7 Inch Modern",
      "Head Unit 9 Inch Floating Display",
      "Paddle Shift & Sport Driving Mode",
      "LED Headlamp with Sequential Turn Light",
    ],
    included: [
      "Unit Wangi & Bersih Maksimal",
      "Layanan Antar Unit ke Hotel / Bandara Batam",
      "Asuransi Kendaraan",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi minimal sewa 1 x 24 Jam",
    ],
  },
  {
    id: 7,
    name: "Honda Brio",
    type: "Sporty City Car",
    category: "City Car",
    price: 300000,
    priceFormatted: "300.000",
    priceNote: "per Hari (Lepas Kunci)",
    image: "/images/mobil-20.webp",
    gallery: [
      "/images/mobil-20.webp",
    ],
    rating: 4.7,
    reviews: 63,
    specs: {
      seats: 5,
      luggage: 2,
      transmission: "CVT Otomatis",
      fuel: "Bensin",
      engine: "1.2L i-VTEC 4-Silinder",
      power: "90 HP",
      acceleration: "11.5 detik (0-100 km/h)",
      topSpeed: "160 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Honda Brio adalah mobil perkotaan nomor satu di Indonesia. Handling lincah, kabin nyaman, dan sangat hemat bahan bakar. Pilihan paling praktis untuk solo traveler, pasangan, maupun dinas kerja kilat di Batam.",
    features: [
      "Mesin 1.2L i-VTEC Paling Bertenaga di Kelasnya",
      "Kamera Parkir Belakang & Sensor Parkir",
      "Audio Touchscreen dengan Bluetooth & USB",
      "Electric Power Steering yang Sangat Ringan",
      "Desain Grille & Velg Baru Sporty",
    ],
    included: [
      "Mobil Bersih Luar Dalam",
      "Asuransi Perjalanan",
      "Opsi Serah Terima di Pelabuhan / Bandara",
    ],
    terms: [
      "KTP & SIM A Asli",
      "Deposit jaminan",
      "Durasi sewa minimal 1 hari",
    ],
  },
  {
    id: 8,
    name: "Toyota Calya",
    type: "Economy 7-Seater Family MPV",
    category: "MPV",
    price: 300000,
    priceFormatted: "300.000",
    priceNote: "per Hari (Lepas Kunci)",
    image: "/images/mobil-15.webp",
    gallery: [
      "/images/mobil-15.webp",
      "/images/mobil-13.webp",
    ],
    rating: 4.7,
    reviews: 51,
    specs: {
      seats: 7,
      luggage: 2,
      transmission: "Otomatis / Manual",
      fuel: "Bensin",
      engine: "1.2L Dual VVT-i 4-Silinder",
      power: "88 HP",
      acceleration: "12.0 detik (0-100 km/h)",
      topSpeed: "155 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Toyota Calya adalah solusi transportasi 7 kursi paling ramah kantong. Biaya sewa sangat terjangkau, bahan bakar super irit, dan dilengkapi pendingin kabin yang nyaman untuk seluruh keluarga.",
    features: [
      "Kapasitas 7 Penumpang Ekonomis",
      "Head Unit Layar Sentuh dengan Bluetooth",
      "Rear Air Circulator Dingin hingga Baris Belakang",
      "Electronic Power Steering & Rem ABS",
      "Bagasi Luas saat Kursi Baris Ketiga Dilipat",
    ],
    included: [
      "Unit Siap Pakai & Bersih",
      "Asuransi Dasar",
      "Pelayanan Ramah & Cepat",
    ],
    terms: [
      "KTP & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi minimal sewa 1 x 24 Jam",
    ],
  },
];

export const CATEGORIES = ["Semua", "MPV", "SUV", "City Car"] as const;

export function getCarById(id: number | string): Car | undefined {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return ALL_CARS.find((car) => car.id === numericId);
}

export function getAllCars(): Car[] {
  return ALL_CARS;
}

export function getFeaturedCars(): Car[] {
  return ALL_CARS.filter((car) => car.featured);
}

export function getRelatedCars(currentId: number | string, category: string, limit = 3): Car[] {
  const numericId = typeof currentId === "string" ? parseInt(currentId, 10) : currentId;
  const sameCategory = ALL_CARS.filter((c) => c.id !== numericId && c.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherCars = ALL_CARS.filter((c) => c.id !== numericId && c.category !== category);
  return [...sameCategory, ...otherCars].slice(0, limit);
}
