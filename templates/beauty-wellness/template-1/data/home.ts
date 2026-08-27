export const facilities = [
  {
    title: "Area Angkat Beban Olympic",
    description:
      "Dilengkapi peralatan profesional untuk latihan strength dan angkat beban.",
    image: "/images/facilities/weight-area.jpg",
    size: "large",
  },
  {
    title: "Area Recovery",
    description:
      "Area nyaman untuk membantu tubuh beristirahat dan pulih setelah latihan.",
    image: "/images/facilities/area-recovery.jpg",
    size: "small",
  },
  {
    title: "Area Functional Training",
    description:
      "Cocok untuk HIIT, agility, conditioning, dan circuit training.",
    image: "/images/facilities/functional.jpg",
    size: "small",
  },
  {
    title: "Ruang Ganti Pakaian",
    description:
      "Bersih, nyaman, dan dilengkapi fasilitas pendukung yang lengkap.",
    image: "/images/facilities/locker-room.jpg",
    size: "wide",
  },
] as const;

export const benefits = [
  {
    number: "01",
    title: "Equipment Premium",
    description:
      "Peralatan strength, cardio, dan functional training yang dirancang untuk berbagai level kebugaran.",
  },
  {
    number: "02",
    title: "Professional Trainers",
    description:
      "Berlatih lebih terarah bersama trainer berpengalaman dengan program yang disesuaikan dengan tujuan Anda.",
  },
  {
    number: "03",
    title: "Flexible Membership",
    description:
      "Pilihan membership fleksibel sehingga Anda dapat memilih program latihan yang paling sesuai.",
  },
  {
    number: "04",
    title: "Clean & Comfortable",
    description:
      "Lingkungan latihan modern, bersih, dan nyaman untuk pengalaman olahraga yang lebih maksimal.",
  },
] as const;

export const locations = [
  {
    city: "Jakarta",
    name: "Ironforce Kemang",
    address: "Jl. Kemang Raya No. 1, Jakarta Selatan",
    image: "/images/locations/kemang.jpg",
    slug: "kemang",
  },
  {
    city: "Jakarta",
    name: "Ironforce Cideng",
    address: "Jl. Cideng Timur No. 45, Jakarta Pusat",
    image: "/images/locations/cideng.jpg",
    slug: "cideng",
  },
  {
    city: "Jakarta",
    name: "Ironforce Sunter",
    address: "Jl. Danau Sunter Utara, Jakarta Utara",
    image: "/images/locations/sunter.jpg",
    slug: "sunter",
  },
  {
    city: "Tangerang",
    name: "Ironforce Green Lake",
    address: "Green Lake City Boulevard, Tangerang",
    image: "/images/locations/green-lake.jpg",
    slug: "green-lake",
  },
  {
    city: "Jakarta",
    name: "Ironforce Greenville",
    address: "Komp. Greenville, Jakarta Barat",
    image: "/images/locations/greenville.jpg",
    slug: "greenville",
  },
  {
    city: "Tangerang",
    name: "Ironforce Karawaci",
    address: "Lippo Karawaci, Tangerang",
    image: "/images/locations/karawaci.jpg",
    slug: "karawaci",
  },
] as const;

export const trainers = [
  {
    name: "Sarah Jenkins",
    specialty: "Strength & Conditioning",
    description:
      "Berpengalaman membantu member mencapai target kebugaran dengan program latihan yang tepat dan terukur.",
    image: "/images/trainers/sarah-jenkins.jpg",
  },
  {
    name: "Marcus Vance",
    specialty: "Functional Hypertrophy",
    description:
      "Berfokus pada peningkatan kekuatan, performa, dan perkembangan otot melalui latihan yang terstruktur.",
    image: "/images/trainers/marcus-vance.jpg",
  },
] as const;

export const membershipPlans = [
  {
    name: "Basic",
    price: "Rp. 800.00",
    period: "/Bulan",
    description:
      "Pilihan tepat untuk memulai rutinitas latihan secara konsisten.",
    features: [
      "Full Gym Access",
      "2 Personal Training Sessions/Month",
      "Nutrition App Access",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "Rp. 1,5 JT",
    period: "/Bulan",
    description:
      "Pilihan terbaik untuk Anda yang ingin berlatih lebih serius dan terarah.",
    features: [
      "Full Gym Access",
      "2 Personal Training Sessions/Month",
      "Nutrition App Access",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "Rp. 3,5 JT",
    period: "/Bulan",
    description:
      "Pengalaman fitness premium dengan dukungan latihan yang lebih maksimal.",
    features: [
      "Full Gym Access",
      "2 Personal Training Sessions/Month",
      "Nutrition App Access",
    ],
    featured: false,
  },
] as const;

export const testimonials = [
  {
    name: "James Miller",
    membership: "Anggota Pro",
    quote:
      "Program latihan terasa jauh lebih terarah dan fasilitasnya membuat saya lebih konsisten datang ke gym.",
  },
  {
    name: "Elena Rossi",
    membership: "Anggota Elite",
    quote:
      "Lingkungannya nyaman, trainer sangat membantu, dan setiap sesi latihan terasa lebih efektif.",
  },
] as const;

export const faqs = [
  {
    question: "Cara untuk mengikuti kelas?",
    answer:
      "Anda dapat memilih jadwal kelas melalui resepsionis atau menghubungi tim kami melalui WhatsApp untuk mendapatkan informasi kelas yang tersedia.",
  },
  {
    question:
      "Adakah yang bisa membantu saya menggunakan alat gym?",
    answer:
      "Ya. Trainer dan staf gym siap membantu menjelaskan penggunaan alat serta teknik latihan dasar dengan aman.",
  },
  {
    question: "Bagaimana cara menggunakan loker?",
    answer:
      "Loker tersedia untuk member selama berada di area gym. Informasi penggunaan dan akses dapat diperoleh melalui resepsionis.",
  },
  {
    question:
      "Bolehkah saya mengajak tamu atau non member ke club?",
    answer:
      "Kebijakan tamu dapat berbeda berdasarkan membership dan lokasi gym. Hubungi cabang terdekat untuk informasi guest pass yang tersedia.",
  },
] as const;