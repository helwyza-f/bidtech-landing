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
  category: "Sedan" | "SUV" | "MPV" | "Sport" | "Listrik";
  price: number;
  priceFormatted: string;
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

export const ALL_CARS: Car[] = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    type: "Sedan Mewah",
    category: "Sedan",
    price: 2500000,
    priceFormatted: "2.500.000",
    image: "/images/car-1.jpg",
    gallery: ["/images/car-1.jpg", "/images/car-2.jpg", "/images/car-3.jpg"],
    rating: 4.9,
    reviews: 48,
    specs: {
      seats: 4,
      luggage: 2,
      transmission: "9G-TRONIC Otomatis",
      fuel: "Bensin Premium",
      engine: "3.0L Inline-6 Turbo with EQ Boost",
      power: "429 HP",
      acceleration: "4.9 detik (0-100 km/h)",
      topSpeed: "250 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Mercedes-Benz S-Class adalah mahakarya kemewahan dan teknologi otomotif. Dirancang untuk menghadirkan kenyamanan kelas satu dengan suspensi udara AIRMATIC, kabin kedap suara dengan material kulit Nappa, serta sistem hiburan MBUX generasi terbaru.",
    features: [
      "Burmester 3D Surround Sound System",
      "Executive Rear Seating with Massage Function",
      "Panoramic Sliding Sunroof",
      "MBUX Augmented Reality Navigation",
      "Active Ambient Lighting 64 Warna",
      "Kamera 360° & Active Parking Assist",
    ],
    included: [
      "Asuransi Komprehensif (All-Risk)",
      "Layanan Darurat Roadside Assistance 24 Jam",
      "Unit Bersih & Disinfeksi Steril",
      "Tersedia Opsi Driver Profesional & Berpengalaman",
    ],
    terms: [
      "KTP / Paspor asli yang masih berlaku",
      "SIM A aktif (untuk opsi lepas kunci)",
      "Deposit jaminan refundable sebelum serah terima unit",
      "Durasi sewa minimal 1 x 24 Jam",
    ],
  },
  {
    id: 2,
    name: "Toyota Alphard Executive",
    type: "Premium MPV",
    category: "MPV",
    price: 1800000,
    priceFormatted: "1.800.000",
    image: "/images/car-2.jpg",
    gallery: ["/images/car-2.jpg", "/images/car-1.jpg", "/images/car-3.jpg"],
    rating: 4.8,
    reviews: 62,
    specs: {
      seats: 7,
      luggage: 4,
      transmission: "CVT Otomatis",
      fuel: "Hybrid / Bensin",
      engine: "2.5L 4-Silinder DOHC Hybrid",
      power: "190 HP",
      acceleration: "8.5 detik (0-100 km/h)",
      topSpeed: "180 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Toyota Alphard Executive Lounge adalah pilihan sempurna untuk perjalanan bisnis VIP maupun liburan keluarga dengan kenyamanan tak tertandingi. Dilengkapi Captain Seat elektrik, ruang kaki yang sangat lega, dan suspensi lembut yang meredam getaran dengan sempurna.",
    features: [
      "Captain Seat Ottoman dengan Pemanas & Pendingin",
      "Dual Panoramic Sunroof",
      "Rear Seat Entertainment Display 14 Inch",
      "JBL Premium Sound 17 Speaker",
      "Toyota Safety Sense (TSS) 3.0",
      "Pintu Geser Elektrik Ganda",
    ],
    included: [
      "Asuransi Komprehensif (All-Risk)",
      "Layanan Darurat 24/7",
      "Air Mineral & Refreshment Kit Gratis",
      "Pilihan Sewa Lepas Kunci atau Dengan Pengemudi",
    ],
    terms: [
      "KTP / Paspor asli yang masih berlaku",
      "SIM A aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 x 24 Jam",
    ],
  },
  {
    id: 3,
    name: "BMW Seri 3 Sedan",
    type: "Sedan Sport",
    category: "Sedan",
    price: 1500000,
    priceFormatted: "1.500.000",
    image: "/images/car-3.jpg",
    gallery: ["/images/car-3.jpg", "/images/car-1.jpg", "/images/car-2.jpg"],
    rating: 4.7,
    reviews: 35,
    specs: {
      seats: 5,
      luggage: 2,
      transmission: "Steptronic Otomatis 8-Speed",
      fuel: "Bensin",
      engine: "2.0L BMW TwinPower Turbo",
      power: "255 HP",
      acceleration: "5.6 detik (0-100 km/h)",
      topSpeed: "250 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "BMW Seri 3 memadukan kedinamisan berkendara yang presisi dengan elegansi modern. Menawarkan handling lincah khas BMW, layar curved display mutakhir, dan efisiensi bahan bakar yang optimal untuk perjalanan perkotaan maupun luar kota.",
    features: [
      "BMW Curved Display dengan iDrive 8",
      "Harman Kardon Surround Sound",
      "Adaptive M Suspension",
      "Wireless Apple CarPlay & Android Auto",
      "Wireless Charging Tray",
      "Driving Assistant & Reversing Assistant",
    ],
    included: [
      "Asuransi Komprehensif (All-Risk)",
      "Layanan Darurat 24 Jam",
      "Unit Bersih & Siap Pakai",
      "Bebas Biaya Perawatan Rutin",
    ],
    terms: [
      "KTP / Paspor asli yang masih berlaku",
      "SIM A aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 x 24 Jam",
    ],
  },
  {
    id: 4,
    name: "Porsche 911 Carrera",
    type: "Sport Coupe",
    category: "Sport",
    price: 3800000,
    priceFormatted: "3.800.000",
    image: "/images/car-1.jpg",
    gallery: ["/images/car-1.jpg", "/images/car-3.jpg", "/images/car-2.jpg"],
    rating: 5.0,
    reviews: 29,
    specs: {
      seats: 2,
      luggage: 1,
      transmission: "8-Speed PDK Dual-Clutch",
      fuel: "Bensin Oktan 98+",
      engine: "3.0L Twin-Turbo Flat-6",
      power: "379 HP",
      acceleration: "4.0 detik (0-100 km/h)",
      topSpeed: "293 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "Ikon mobil sport legendaris yang memberikan sensasi adrenalin murni. Dengan akselerasi kilat, transmisi PDK super responsif, dan suara knalpot sport yang memukau, Porsche 911 Carrera menjamin pengalaman berkendara yang tak terlupakan.",
    features: [
      "Sport Chrono Package with Mode Switch",
      "BOSE Surround Sound System",
      "Porsche Active Suspension Management (PASM)",
      "Sports Exhaust System with Black Tailpipes",
      "14-Way Power Sport Seats with Memory",
      "LED Matrix Headlights with PDLS Plus",
    ],
    included: [
      "Asuransi Khusus Supercar (All-Risk)",
      "Concierge Roadside Service 24 Jam",
      "Full Tank Bahan Bakar Oktan Tinggi saat Serah Terima",
      "Pengantaran Unit Langsung ke Lokasi Anda",
    ],
    terms: [
      "KTP & Paspor Asli",
      "SIM A aktif minimal pengalaman mengemudi 3 tahun",
      "Deposit jaminan keamanan khusus supercar (refundable)",
      "Durasi sewa minimal 1 x 24 Jam",
    ],
  },
  {
    id: 5,
    name: "Range Rover Velar",
    type: "Luxury SUV",
    category: "SUV",
    price: 3200000,
    priceFormatted: "3.200.000",
    image: "/images/car-2.jpg",
    gallery: ["/images/car-2.jpg", "/images/car-1.jpg", "/images/car-3.jpg"],
    rating: 4.9,
    reviews: 41,
    specs: {
      seats: 5,
      luggage: 3,
      transmission: "8-Speed Automatic AWD",
      fuel: "Bensin",
      engine: "2.0L Turbocharged Ingenium AWD",
      power: "247 HP",
      acceleration: "7.1 detik (0-100 km/h)",
      topSpeed: "217 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Range Rover Velar menawarkan desain avant-garde yang mempesona dengan ketangguhan segala medan khas Range Rover. Interior minimalis modern berbalut material premium menyuguhkan kenyamanan berkendara kelas dunia di segala kondisi rute.",
    features: [
      "Pivi Pro Infotainment with Curved Glass Touchscreen",
      "Meridian 3D Surround Sound System",
      "Electronic Air Suspension",
      "Terrain Response 2 with Dynamic Program",
      "Flush Deployable Door Handles",
      "3D Surround Camera & ClearSight Ground View",
    ],
    included: [
      "Asuransi Komprehensif (All-Risk)",
      "Layanan Darurat Roadside 24/7",
      "Unit Bersih & Disinfeksi Steril",
      "Pilihan Lepas Kunci atau Supir Berpengalaman",
    ],
    terms: [
      "KTP / Paspor asli yang masih berlaku",
      "SIM A aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 x 24 Jam",
    ],
  },
  {
    id: 6,
    name: "BMW M4 Coupe",
    type: "High Performance",
    category: "Sport",
    price: 3500000,
    priceFormatted: "3.500.000",
    image: "/images/car-3.jpg",
    gallery: ["/images/car-3.jpg", "/images/car-1.jpg", "/images/car-2.jpg"],
    rating: 4.9,
    reviews: 38,
    specs: {
      seats: 4,
      luggage: 2,
      transmission: "8-Speed M Steptronic with Drivelogic",
      fuel: "Bensin Oktan 98+",
      engine: "3.0L BMW M TwinPower Turbo S58",
      power: "503 HP",
      acceleration: "3.8 detik (0-100 km/h)",
      topSpeed: "290 km/h",
      year: 2024,
    },
    featured: true,
    description:
      "BMW M4 Coupe adalah monster performa tinggi yang memadukan DNA balap sirkuit dengan kenyamanan harian. Dengan tenaga lebih dari 500 HP dan diferensial Active M, mobil ini memberikan cengkeraman dan presisi manuver yang luar biasa di setiap tikungan.",
    features: [
      "M Carbon Bucket Seats",
      "M Carbon Fiber Roof",
      "Harman Kardon Surround Sound",
      "M Drive Professional with M Drift Analyzer",
      "Adaptive M Suspension with Variable Dampers",
      "M Compound Brakes in High-Gloss Red",
    ],
    included: [
      "Asuransi Sportscar Komprehensif",
      "Layanan Roadside 24/7",
      "Pengantaran Unit ke Tempat Anda",
      "Panduan Fitur & Orientasi Unit Gratis",
    ],
    terms: [
      "KTP & Paspor Asli",
      "SIM A aktif",
      "Deposit jaminan keamanan refundable",
      "Durasi sewa minimal 1 x 24 Jam",
    ],
  },
  {
    id: 7,
    name: "Hyundai Ioniq 6",
    type: "Electric Streamliner",
    category: "Listrik",
    price: 1700000,
    priceFormatted: "1.700.000",
    image: "/images/car-1.jpg",
    gallery: ["/images/car-1.jpg", "/images/car-2.jpg", "/images/car-3.jpg"],
    rating: 4.8,
    reviews: 24,
    specs: {
      seats: 5,
      luggage: 2,
      transmission: "Single-Speed Reduction Gear AWD",
      fuel: "100% Listrik (EV)",
      engine: "Dual Electric Motor AWD (77.4 kWh Battery)",
      power: "320 HP",
      acceleration: "5.1 detik (0-100 km/h)",
      topSpeed: "185 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Hyundai Ioniq 6 adalah masa depan mobilitas ramah lingkungan dengan siluet aerodinamis futuristik. Nikmati kesenyapan kabin maksimal, akselerasi instan tanpa emisi, dan jarak tempuh hingga 519 km dalam satu kali pengisian daya penuh.",
    features: [
      "Kabel Portable Charger & Kartu Akses SPKLU Gratis",
      "Dual Color Ambient Lighting 64 Pilihan Warna",
      "Bose Premium Audio System 8 Speaker",
      "Vehicle-to-Load (V2L) Power Outlet 220V",
      "Hyundai SmartSense ADAS Level 2",
      "Interactive Pixel LED Display",
    ],
    included: [
      "Baterai Terisi Penuh (100%) saat Pengambilan",
      "Asuransi Komprehensif Mobil Listrik",
      "Layanan Darurat Mobil Derek & Charging 24 Jam",
      "Unit Steril & Bersih Maksimal",
    ],
    terms: [
      "KTP / Paspor asli yang masih berlaku",
      "SIM A aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 x 24 Jam",
    ],
  },
  {
    id: 8,
    name: "Toyota Land Cruiser 300",
    type: "Flagship SUV",
    category: "SUV",
    price: 2900000,
    priceFormatted: "2.900.000",
    image: "/images/car-2.jpg",
    gallery: ["/images/car-2.jpg", "/images/car-3.jpg", "/images/car-1.jpg"],
    rating: 4.9,
    reviews: 55,
    specs: {
      seats: 7,
      luggage: 4,
      transmission: "10-Speed Direct Shift Automatic",
      fuel: "Diesel V6 Turbo",
      engine: "3.3L Twin-Turbo V6 Diesel",
      power: "304 HP",
      acceleration: "7.9 detik (0-100 km/h)",
      topSpeed: "210 km/h",
      year: 2024,
    },
    featured: false,
    description:
      "Raja segala medan dengan reputasi ketangguhan tanpa tanding di seluruh dunia. Toyota Land Cruiser 300 menghadirkan kombinasi tenaga badak mesin V6 Twin-Turbo, teknologi Multi-Terrain Monitor, dan interior mewah 7-penumpang yang kokoh dan berwibawa.",
    features: [
      "Multi-Terrain Select (MTS) & Crawl Control",
      "JBL Premium Audio System with 14 Speakers",
      "Rear Seat Entertainment Dual Screen",
      "Adaptive Variable Suspension (AVS)",
      "Wireless Smartphone Charger & Cool Box Konsol",
      "Toyota Safety Sense with Lane Tracing Assist",
    ],
    included: [
      "Asuransi Komprehensif (All-Risk)",
      "Layanan Darurat Roadside Assistance 24 Jam",
      "Pilihan Unit dengan Driver Protokol / Lepas Kunci",
      "Kondisi Mesin Prima & Steril",
    ],
    terms: [
      "KTP / Paspor asli yang masih berlaku",
      "SIM A aktif",
      "Deposit jaminan refundable",
      "Durasi sewa minimal 1 x 24 Jam",
    ],
  },
];

export const CATEGORIES = ["Semua", "Sedan", "SUV", "MPV", "Sport", "Listrik"] as const;

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
