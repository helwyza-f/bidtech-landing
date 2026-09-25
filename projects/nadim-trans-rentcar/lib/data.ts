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
    image: "/images/Alphard.webp",
    gallery: ["/images/Alphard.webp"],
    rating: 5.0,
    reviews: 68,
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
      "Toyota Alphard VIP adalah standar kemewahan tertinggi dalam mobilitas eksekutif di Kota Batam. Ideal untuk penjemputan tamu VVIP di Bandara Internasional Hang Nadim, kunjungan pejabat negara, rombongan bisnis Singapura/Malaysia, dan acara pernikahan atau formal.",
    features: [
      "Executive Ottoman Captain Seat dengan Pemanas/Pendingin",
      "Dual Electric Panoramic Sunroof",
      "Rear Seat Entertainment Monitor & Audio Premium",
      "Pintu Geser Elektrik Kanan & Kiri Otomatis",
      "Kabin Senyap & Kaca Privasi Tingkat Tinggi",
      "Kamera 360° & Toyota Safety Sense (TSS)",
    ],
    included: [
      "Sudah Termasuk Supir Profesional & Berpengalaman",
      "Bahan Bakar Minyak (BBM) Sudah Termasuk",
      "Unit Bersih, Harum, & Steril Setiap Hari",
      "Layanan Antar Jemput VVIP Bandara Hang Nadim & Pelabuhan Ferry Batam",
    ],
    terms: [
      "Konfirmasi jadwal sewa minimal 1 hari sebelumnya",
      "Paket sewa 12 Jam per hari sudah termasuk Supir & BBM",
      "Tarif berlaku untuk pemakaian rute area Batam",
      "Layanan overtime tersedia sesuai kesepakatan",
    ],
  },
  {
    id: 2,
    name: "Toyota Hiace Commuter",
    type: "High-Capacity Passenger Minibus",
    category: "Minibus",
    price: 1300000,
    priceFormatted: "1.300.000",
    priceNote: "per Day (Include BBM & Driver)",
    image: "/images/Hiace-Commuter.webp",
    gallery: ["/images/Hiace-Commuter.webp"],
    rating: 4.9,
    reviews: 45,
    specs: {
      seats: 15,
      luggage: 6,
      transmission: "Manual 5-Speed",
      fuel: "Diesel",
      engine: "2.5L D-4D Common Rail Turbo Diesel",
      power: "102 HP",
      acceleration: "14.5 detik (0-100 km/h)",
      topSpeed: "150 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Toyota Hiace Commuter adalah kendaraan van komersial berkapasitas besar hingga 15 penumpang. Pilihan terbaik untuk rombongan wisata, event kantor, transfer tamu bandara Batam/pelabuhan ferry, dan study tour di Batam.",
    features: [
      "Kapasitas Ekstra Lega hingga 15 Penumpang",
      "AC Ceiling Duct Dingin Merata hingga Baris Belakang",
      "Kursi Reclining Ergonomis dengan Sabuk Pengaman Individual",
      "Pintu Geser Lebar Memudahkan Keluar Masuk Penumpang",
      "Suspensi Nyaman untuk Perjalanan Jauh",
      "Sistem Audio & Multimedia Lengkap",
    ],
    included: [
      "Sudah Termasuk Supir Profesional & Berpengalaman",
      "Bahan Bakar Minyak (BBM) Sudah Termasuk",
      "Mobil Bersih, Nyaman, dan Siap Jalan",
      "Bantuan Pengaturan Bagasi Rombongan",
    ],
    terms: [
      "Konfirmasi pemesanan minimal 1-2 hari sebelumnya",
      "Paket sudah include Driver & BBM untuk pemakaian rute Batam",
      "Waktu pemakaian harian terhitung per hari kerja (Day Use)",
      "Overtime pemakaian disesuaikan dengan kesepakatan",
    ],
  },
  {
    id: 3,
    name: "Toyota Hiace Premio",
    type: "Premium Executive Minibus",
    category: "Minibus",
    price: 2000000,
    priceFormatted: "2.000.000",
    priceNote: "per Day (Include BBM & Driver)",
    image: "/images/Hiace-Premio.webp",
    gallery: ["/images/Hiace-Premio.webp"],
    rating: 5.0,
    reviews: 38,
    specs: {
      seats: 12,
      luggage: 6,
      transmission: "Manual 6-Speed",
      fuel: "Diesel",
      engine: "2.8L 1GD-FTV 4-Silinder VNT Turbo Diesel",
      power: "176 HP",
      acceleration: "12.8 detik (0-100 km/h)",
      topSpeed: "160 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Toyota Hiace Premio menghadirkan konsep kemewahan minibus semi-bonnet modern dengan kabin lega, peredaman suara istimewa, dan interior mewah. Solusi transportasi terbaik bagi delegasi korporat, tamu kenegaraan, maupun wisata keluarga VIP di Batam.",
    features: [
      "Desain Semi-Bonnet Modern & Hidung Aerodinamis",
      "Kabin Super Luas dengan Captain Seat Style (12 Kursi)",
      "Peredaman Kabin Sangat Senyap & Suspensi Empuk",
      "Head Unit Touchscreen Modern & Port USB Charger Tiap Baris",
      "Vehicle Stability Control (VSC) & Hill Start Assist (HSA)",
      "Emergency Brake Signal & Dual SRS Airbag",
    ],
    included: [
      "Sudah Termasuk Supir Berpengalaman & Ramah",
      "Bahan Bakar Minyak (BBM) Sudah Termasuk",
      "Kebersihan & Kenyamanan Kabin Premium",
      "Penjemputan Bandara Hang Nadim / Terminal Ferry Batam",
    ],
    terms: [
      "Pemesanan disarankan H-2 sebelum acara",
      "Paket All-In (Mobil + Supir + BBM) per Hari di Batam",
      "Kapasitas maksimal 12 penumpang untuk kenyamanan terbaik",
      "Overtime dihitung proporsional per jam",
    ],
  },
  {
    id: 4,
    name: "Toyota Fortuner GR Sport",
    type: "Premium Tough SUV",
    category: "SUV",
    price: 1300000,
    priceFormatted: "1.300.000",
    priceNote: "per Day (Mobil Only) / Rp 2.000.000 (Mobil + Driver 12 Jam)",
    image: "/images/Fortuner.webp",
    gallery: ["/images/Fortuner.webp"],
    rating: 4.9,
    reviews: 56,
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
      "Toyota Fortuner GR Sport menawarkan performa mesin tangguh dengan sentuhan bodi Gazoo Racing yang berwibawa dan gagah. Sangat cocok untuk perjalanan inspeksi kawasan industri Batam, kunjungan dinas, maupun perjalanan keluarga berkelas.",
    features: [
      "Bodykit & Emblem Eksklusif GR Sport",
      "Suspensi GR Sport yang Lebih Stabil & Nyaman",
      "Power Backdoor dengan Kick Sensor",
      "Head Unit 9 Inch Smartphone Mirroring",
      "Surround Monitor 360° & Blind Spot Detection",
      "AC Digital Dual Zone dengan Climate Control",
    ],
    included: [
      "Pilihan Lepas Kunci atau dengan Supir Berpengalaman",
      "Asuransi All-Risk Kendaraan",
      "Unit Servis Rutin Resmi & Kondisi Prima",
      "Layanan Bantuan Darurat 24 Jam",
    ],
    terms: [
      "KTP Asli & SIM A Aktif (untuk sewa lepas kunci)",
      "Deposit jaminan refundable sebelum serah terima unit",
      "Durasi sewa minimal 1 x 24 Jam",
      "Tersedia paket lengkap mobil + driver 12 jam (Rp 2.000.000)",
    ],
  },
  {
    id: 5,
    name: "Toyota Innova Zenix",
    type: "Modern TNGA Crossover MPV",
    category: "MPV",
    price: 600000,
    priceFormatted: "600.000",
    priceNote: "per Day (Mobil Only) / Rp 1.200.000 (Mobil + Driver 12 Jam)",
    image: "/images/Innova-Zenix.webp",
    gallery: ["/images/Innova-Zenix.webp"],
    rating: 4.9,
    reviews: 62,
    specs: {
      seats: 7,
      luggage: 3,
      transmission: "Direct-Shift 10-Speed CVT",
      fuel: "Bensin",
      engine: "2.0L M20A-FKS Dynamic Force DOHC",
      power: "174 HP",
      acceleration: "9.6 detik (0-100 km/h)",
      topSpeed: "185 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Toyota Innova Zenix hadir dengan platform TNGA penggerak roda depan (FWD) yang memberikan rasa berkendara senyap, lega, dan suspensi nyaman layaknya sedan mewah. Menjadi unit terfavorit pelanggan bisnis dan keluarga di Batam.",
    features: [
      "Platform TNGA: Kenyamanan Berkendara Maksimal",
      "Kabin Luas 7 Penumpang dengan Ruang Kaki Ekstra Lega",
      "Layar Infotainment 10 Inch dengan Apple CarPlay & Android Auto",
      "Electric Parking Brake (EPB) with Auto Brake Hold",
      "Digital AC Double Blower Cepat Dingin",
      "Vehicle Stability Control & Hill Start Assist",
    ],
    included: [
      "Unit Baru, Bersih & Terawat",
      "Asuransi Kendaraan Terpercaya",
      "Tersedia Opsi Lepas Kunci atau dengan Driver",
      "Dukungan Layanan Pelanggan 24 Jam",
    ],
    terms: [
      "KTP / Paspor asli yang masih berlaku",
      "SIM A aktif untuk penyewa lepas kunci",
      "Deposit jaminan refundable",
      "Tersedia paket mobil + driver 12 jam (Rp 1.200.000)",
    ],
  },
  {
    id: 6,
    name: "Toyota Innova Reborn",
    type: "Reliable Mid-Size MPV",
    category: "MPV",
    price: 550000,
    priceFormatted: "550.000",
    priceNote: "per Day (Mobil Only) / Rp 1.000.000 (Mobil + Driver 12 Jam)",
    image: "/images/Innova-Reborn.webp",
    gallery: ["/images/Innova-Reborn.webp"],
    rating: 4.8,
    reviews: 71,
    specs: {
      seats: 7,
      luggage: 4,
      transmission: "6-Speed Otomatis / Manual",
      fuel: "Diesel / Bensin",
      engine: "2.4L 2GD-FTV Turbo Diesel / 2.0L Dual VVT-i",
      power: "149 HP",
      acceleration: "10.8 detik (0-100 km/h)",
      topSpeed: "175 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Toyota Innova Reborn merupakan legenda kenyamanan MPV keluarga Indonesia dengan sasis ladder-frame yang kokoh dan suspensi empuk. Sangat handal menjelajahi segala medan jalanan Batam dengan konsumsi bahan bakar yang efisien.",
    features: [
      "Sasis Tangguh & Suspensi Nyaman di Berbagai Kondisi Jalan",
      "Kabin Luas 7 Penumpang dengan Armrest Nyaman",
      "AC Triple Blower Dingin Merata ke Semua Baris",
      "Head Unit Layar Sentuh Multimedia & Audio Jernih",
      "Eco Mode & Power Driving Mode",
      "Dual SRS Airbag & Rem ABS + EBD",
    ],
    included: [
      "Unit Selalu Bersih & Wangi",
      "Asuransi Kendaraan",
      "Pilihan Lepas Kunci atau Plus Driver",
      "Gratis Pengantaran ke Area Bandara/Pelabuhan Batam",
    ],
    terms: [
      "KTP Asli & SIM A Aktif untuk lepas kunci",
      "Deposit jaminan sebelum pengambilan unit",
      "Durasi sewa harian 24 Jam",
      "Tersedia paket mobil + driver 12 jam (Rp 1.000.000)",
    ],
  },
  {
    id: 7,
    name: "Hyundai Stargazer",
    type: "Futuristic Family MPV",
    category: "MPV",
    price: 400000,
    priceFormatted: "400.000",
    priceNote: "per Day (Mobil Only)",
    image: "/images/Hyundai-Stargazer.webp",
    gallery: ["/images/Hyundai-Stargazer.webp"],
    rating: 4.8,
    reviews: 48,
    specs: {
      seats: 7,
      luggage: 3,
      transmission: "IVT Otomatis",
      fuel: "Bensin",
      engine: "1.5L Smartstream MPI 4-Silinder",
      power: "115 HP",
      acceleration: "10.4 detik (0-100 km/h)",
      topSpeed: "175 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Hyundai Stargazer memadukan siluet one-curve aerodinamis futuristik dengan kabin multifungsi ergonomis. Dilengkapi ragam kompartemen penyimpanan pintar, AC sejuk merata, dan peredaman kabin yang sangat senyap.",
    features: [
      "Horizontal DRL Futuristik & Distinctive H-Rear Lamp",
      "Head Unit Touchscreen 8 Inch Smartphone Integration",
      "Wireless Smartphone Charger & USB Port",
      "Tire Pressure Monitoring System (TPMS)",
      "Rear View Camera dengan Dynamic Guidelines",
      "Banyak Cup Holder & Ruang Penyimpanan Rahasia",
    ],
    included: [
      "Asuransi Komprehensif Dasar",
      "Unit Baru & Bersih Bebas Bau Rokok",
      "Gratis Konsultasi Rute Wisata Batam",
      "Customer Care Siaga 24 Jam",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 x 24 Jam",
      "Penggunaan khusus area Kota Batam",
    ],
  },
  {
    id: 8,
    name: "Toyota New Avanza",
    type: "Modern Compact MPV",
    category: "MPV",
    price: 350000,
    priceFormatted: "350.000",
    priceNote: "per Day (Mobil Only)",
    image: "/images/New-Avanza.webp",
    gallery: ["/images/New-Avanza.webp"],
    rating: 4.8,
    reviews: 84,
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
      "Toyota New Avanza generasi terbaru menghadirkan revolusi kenyamanan berkendara dengan platform FWD baru, kabin kedap, dan sofa mode fleksibel. Mobil keluarga sejuta umat yang hemat BBM dan handal untuk mobilitas harian di Batam.",
    features: [
      "Konfigurasi Kursi Long Sofa Mode yang Fleksibel",
      "Head Unit Modern 9 Inch dengan Smartphone Mirroring",
      "Tilt Steering & Start/Stop Engine Push Button",
      "Dual Airbags & ABS + EBD + BA",
      "AC Double Blower Cepat Sejuk untuk Iklim Tropis Batam",
    ],
    included: [
      "Unit Bersih, Harum & Siap Pakai",
      "Asuransi Dasar Terjamin",
      "Customer Support Siaga 24 Jam",
      "Opsi Antar Jemput ke Lokasi Anda",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 hari (24 Jam)",
      "Pengembalian bensin sesuai level awal",
    ],
  },
  {
    id: 9,
    name: "Daihatsu New Xenia",
    type: "Dynamic Family MPV",
    category: "MPV",
    price: 350000,
    priceFormatted: "350.000",
    priceNote: "per Day (Mobil Only)",
    image: "/images/New-Xenia.webp",
    gallery: ["/images/New-Xenia.webp"],
    rating: 4.8,
    reviews: 49,
    specs: {
      seats: 7,
      luggage: 3,
      transmission: "CVT Otomatis / Manual",
      fuel: "Bensin",
      engine: "1.3L / 1.5L Dual VVT-i 4-Silinder",
      power: "106 HP",
      acceleration: "11.3 detik (0-100 km/h)",
      topSpeed: "170 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Daihatsu New Xenia tampil sporty dengan grill berkarakter tegas dan ruang kabin yang lapang. Memiliki efisiensi bahan bakar unggul dan radius putar kecil, sangat nyaman untuk jalan-jalan santai maupun keperluan bisnis di Batam.",
    features: [
      "Desain Eksterior Sporty dengan Shark Fin Antenna",
      "Kabin Luas 7 Kursi dengan Sofa Mode Serbaguna",
      "Touchscreen Head Unit Support Android Auto & CarPlay",
      "Ground Clearance Tinggi 205 mm Aman di Segala Jalan",
      "Electronic Power Steering yang Ringan & Lincah",
    ],
    included: [
      "Unit Bersih & Terawat Teratur",
      "Asuransi Perjalanan Dasar",
      "Layanan Konsultasi Customer Care 24 Jam",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi minimal sewa 24 Jam",
      "Bahan bakar kembali sama seperti saat serah terima",
    ],
  },
  {
    id: 10,
    name: "Toyota Raize",
    type: "Compact Turbo SUV",
    category: "SUV",
    price: 350000,
    priceFormatted: "350.000",
    priceNote: "per Day (Mobil Only)",
    image: "/images/Raize.webp",
    gallery: ["/images/Raize.webp"],
    rating: 4.8,
    reviews: 42,
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
      "Toyota Raize memadukan aura SUV sporty yang stylish dengan akselerasi turbo yang gesit dan responsif. Sangat lincah bermanuver di lalu lintas Batam, mudah diparkir, dan membuat penampilan Anda semakin percaya diri.",
    features: [
      "Mesin Turbocharged Responsif & Sangat Irit BBM",
      "Digital TFT Interactive Instrument Cluster 7 Inch",
      "Floating Touchscreen 9 Inch Multimedia",
      "Paddle Shift & Sport Driving Mode",
      "LED Headlamp with Sequential Turn Signal",
    ],
    included: [
      "Unit Wangi & Bersih Maksimal",
      "Layanan Pengantaran ke Hotel / Bandara Batam",
      "Asuransi Kendaraan Terpercaya",
      "Bantuan Darurat 24 Jam",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi minimal sewa 1 x 24 Jam",
      "Pemakaian khusus area Pulau Batam",
    ],
  },
  {
    id: 11,
    name: "Daihatsu Rocky",
    type: "Compact Urban SUV",
    category: "SUV",
    price: 350000,
    priceFormatted: "350.000",
    priceNote: "per Day (Mobil Only)",
    image: "/images/Rocky.webp",
    gallery: ["/images/Rocky.webp"],
    rating: 4.8,
    reviews: 39,
    specs: {
      seats: 5,
      luggage: 2,
      transmission: "D-CVT Otomatis",
      fuel: "Bensin",
      engine: "1.0L Turbo / 1.2L 3-Silinder WA-VE",
      power: "98 HP",
      acceleration: "10.2 detik (0-100 km/h)",
      topSpeed: "175 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Daihatsu Rocky menawarkan gaya SUV perkotaan yang tangguh dengan transmisi D-CVT halus dan ground clearance tinggi. Cocok untuk Anda yang menyukai petualangan keliling destinasi eksotis di Barelang dan sudut kota Batam.",
    features: [
      "Transmisi D-CVT Halus & Akselerasi Halus",
      "Full Digital Meter Cluster dengan 4 Pilihan Tampilan",
      "Head Unit Touchscreen 9 Inch Smartphone Connection",
      "Active Subwoofer Audio System Berkualitas",
      "Fitur Hill Start Assist & VSC Lengkap",
    ],
    included: [
      "Unit Bersih & Servis Berkala Terjamin",
      "Asuransi Kendaraan",
      "Pelayanan Cepat & Antar Jemput Tepat Waktu",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 hari (24 Jam)",
      "Unit dikembalikan dalam keadaan rapi",
    ],
  },
  {
    id: 12,
    name: "Honda New Brio",
    type: "Sporty Compact City Car",
    category: "City Car",
    price: 300000,
    priceFormatted: "300.000",
    priceNote: "per Day (Mobil Only)",
    image: "/images/New-Brio.webp",
    gallery: ["/images/New-Brio.webp"],
    rating: 4.8,
    reviews: 75,
    specs: {
      seats: 5,
      luggage: 2,
      transmission: "CVT Otomatis / Manual",
      fuel: "Bensin",
      engine: "1.2L i-VTEC 4-Silinder",
      power: "90 HP",
      acceleration: "11.5 detik (0-100 km/h)",
      topSpeed: "160 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Honda New Brio adalah mobil perkotaan nomor satu di kelasnya. Desain sporty, handling presisi, kabin nyaman, dan sangat hemat bahan bakar. Pilihan paling praktis untuk solo traveler, pasangan, maupun dinas kerja kilat di Batam.",
    features: [
      "Mesin 1.2L i-VTEC Paling Bertenaga di Kelas City Car",
      "Kamera Parkir Belakang & Sensor Parkir",
      "Touchscreen Audio dengan Bluetooth & USB",
      "Electric Power Steering Ringan & Presisi",
      "Desain Grill Sporty & Velg Alloy Two-Tone Baru",
    ],
    included: [
      "Mobil Bersih Luar Dalam & Wangi",
      "Asuransi Perjalanan Terpercaya",
      "Opsi Serah Terima di Pelabuhan / Bandara Batam",
      "Customer Support Responsif 24 Jam",
    ],
    terms: [
      "KTP & SIM A Asli yang masih berlaku",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 hari (24 Jam)",
      "Penggunaan khusus area Pulau Batam",
    ],
  },
  {
    id: 13,
    name: "Toyota New Agya",
    type: "Agile Modern City Car",
    category: "City Car",
    price: 300000,
    priceFormatted: "300.000",
    priceNote: "per Day (Mobil Only)",
    image: "/images/New-Agya.webp",
    gallery: ["/images/New-Agya.webp"],
    rating: 4.7,
    reviews: 41,
    specs: {
      seats: 5,
      luggage: 2,
      transmission: "CVT Otomatis",
      fuel: "Bensin",
      engine: "1.2L WA-VE 3-Silinder Dual VVT-i",
      power: "88 HP",
      acceleration: "11.8 detik (0-100 km/h)",
      topSpeed: "160 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Toyota New Agya hadir dengan platform anyar yang memberikan stabilitas berkendara jauh lebih mantap dan interior lapang. Sangat efisien, gesit di jalanan sempit, dan cocok untuk menjelajahi spot kuliner di Batam.",
    features: [
      "Platform Baru: Handling Mantap & Lebih Stabil",
      "Mesin 1.2L WA-VE Bertenaga & Super Hemat BBM",
      "Head Unit Touchscreen 7 Inch Modern",
      "Paddle Shift & Dynamic Driving Mode",
      "Vehicle Stability Control & Hill Start Assist",
    ],
    included: [
      "Unit Bersih & Wangi",
      "Asuransi Dasar Terjamin",
      "Pelayanan Ramah & Pengantaran Unit Fleksibel",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 24 Jam",
      "Unit digunakan hanya di wilayah Batam",
    ],
  },
  {
    id: 14,
    name: "Toyota New Calya",
    type: "Economy 7-Seater Family MPV",
    category: "MPV",
    price: 300000,
    priceFormatted: "300.000",
    priceNote: "per Day (Mobil Only)",
    image: "/images/New-Calya.webp",
    gallery: ["/images/New-Calya.webp"],
    rating: 4.7,
    reviews: 58,
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
      "Toyota New Calya adalah solusi transportasi 7 penumpang paling ramah kantong di Batam. Biaya sewa terjangkau, bahan bakar super hemat, dan kabin ber-AC sejuk untuk seluruh anggota keluarga atau tim kerja Anda.",
    features: [
      "Kapasitas 7 Kursi Penumpang Ekonomis & Fleksibel",
      "Head Unit Touchscreen dengan Bluetooth & USB",
      "Rear Air Circulator Sejuk hingga Baris Belakang",
      "Electronic Power Steering & Rem ABS + EBD",
      "Bagasi Luas saat Kursi Baris Ketiga Dilipat",
    ],
    included: [
      "Unit Siap Pakai, Bersih & Terawat",
      "Asuransi Dasar Kendaraan",
      "Pelayanan Ramah & Customer Care 24 Jam",
    ],
    terms: [
      "KTP & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi minimal sewa 1 x 24 Jam",
      "Penggunaan rute area Batam",
    ],
  },
  {
    id: 15,
    name: "Daihatsu New Ayla",
    type: "Compact Economy City Car",
    category: "City Car",
    price: 250000,
    priceFormatted: "250.000",
    priceNote: "per Day (Mobil Only)",
    image: "/images/New-Ayla.webp",
    gallery: ["/images/New-Ayla.webp"],
    rating: 4.7,
    reviews: 46,
    specs: {
      seats: 5,
      luggage: 2,
      transmission: "D-CVT Otomatis / Manual",
      fuel: "Bensin",
      engine: "1.0L / 1.2L Dual VVT-i",
      power: "88 HP",
      acceleration: "12.2 detik (0-100 km/h)",
      topSpeed: "155 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Daihatsu New Ayla adalah pilihan rental mobil paling hemat di Batam dengan tarif hanya Rp 250.000 / hari. Sangat irit bensin, lincah bermanuver, mudah parkir, dan cocok untuk mobilitas harian pribadi maupun dinas kerja kilat.",
    features: [
      "Tarif Paling Hemat & Efisiensi BBM Luar Biasa",
      "Transmisi D-CVT Halus & Akselerasi Ringan",
      "Head Unit Touchscreen Modern Support Smartphone",
      "Bagasi Cukup untuk Koper & Perlengkapan Harian",
      "Dual SRS Airbag & Seatbelt Reminder",
    ],
    included: [
      "Unit Bersih & Terawat",
      "Asuransi Dasar",
      "Layanan Pelanggan Ramah & Fast Response",
    ],
    terms: [
      "KTP Asli & SIM A Aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 hari (24 Jam)",
      "Penggunaan khusus wilayah Pulau Batam",
    ],
  },
];

export const CATEGORIES = ["Semua", "MPV", "SUV", "City Car", "Minibus"] as const;

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
