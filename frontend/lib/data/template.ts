import {
  CarFront,
  Dumbbell,
  Network,
  Users,
  UtensilsCrossed,
  ShoppingBasket,
  House,
  MirrorRound,
  University,
  type LucideIcon,
} from "lucide-react";

export type TemplateItem = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  previewHref: string;
  tags: string[];
  icon: LucideIcon;
};

export const TEMPLATES: TemplateItem[] = [
  {
    id: 1,
    name: "Rentcar - Sewa Mobil #1",
    category: "Otomotif",
    subcategory:
      "Showcase kendaraan dan penyewaan kendaraan untuk usaha Penyewaan Kendaraan",
    image: "/images/design_thumbnail/rentcar.webp",
    previewHref: "/demo/automotive",
    tags: ["Automotive", "Rental Mobil", "Responsive"],
    icon: CarFront,
  },
  {
    id: 2,
    name: "Deny Restaurant - Kalcer Restaurant",
    category: "UMKM",
    subcategory:
      "Cafe atau restaurant anak muda dengan gaya animasi kalcer, cocok untuk portofolio usaha.",
    image: "/images/design_thumbnail/deny_restaurant.webp",
    previewHref: "/demo/restaurant-cafe-2",
    tags: ["Restaurant", "Cafe", "Kalcer"],
    icon: UtensilsCrossed,
  },
  {
    id: 3,
    name: "Chef's Table - European Signature",
    category: "UMKM",
    subcategory:
      "Restaurant otentik, mewah dan berprestisius, dengan target korporat dan kelas internasional.",
    image: "/images/design_thumbnail/chefs_table.webp",
    previewHref: "/demo/restaurant-cafe",
    tags: ["Restaurant", "Diner", "Modern Theme"],
    icon: UtensilsCrossed,
  },
  {
    id: 4,
    name: "IRONFORCE - Best Gym on Jakarta",
    category: "Kecantikan",
    subcategory:
      "Tempat kebugaran dan latihan anak gen z, tersebar sekitar jabodetabek, dengan fasilitas lengkap dan pelatih professional.",
    image: "/images/design_thumbnail/ironforce.webp",
    previewHref: "/demo/beauty-wellness",
    tags: ["Fitness", "Gym", "Personal Trainer"],
    icon: Dumbbell,
  },
  {
    id: 5,
    name: "Yayasan Bakti Nusantara",
    category: "Komunitas",
    subcategory: "Organisasi nirlaba sosial kemasyarakatan independen yang mendedikasikan diri untuk pengentasan kemiskinan, pemberdayaan ekonomi warga, dan kemanusiaan di Indonesia.",
    image: "/images/design_thumbnail/batik_nusantara.webp",
    previewHref: "/demo/community-pro",
    tags: ["Community", "Yayasan", "Donation"],
    icon: Users,    
  },
  {
    id: 6,
    name: "Harapan kita",
    category: "Komunitas",
    subcategory:
      "Organisasi non-profit mandiri dengan visi pengembangan pendidikan pada anak-anak di wilayah 3T (Tertinggal, Terdepan, dan Terluar).",
    image: "/images/design_thumbnail/harapan_kita.webp",
    previewHref: "/demo/organization",
    tags: ["Community", "Organization", "Information Portal"],
    icon: Users,
  },
  {
    id: 7,
    name: "Konterku",
    category: "UMKM",
    subcategory: "Branding dan digitalisasi usaha penjualan Handphone",
    image: "/images/design_thumbnail/konterku.webp",
    previewHref: "/demo/e-commerce",
    tags: ["UMKM", "Smartphone", "Penjualan"],
    icon: ShoppingBasket,
  },
  {
    id: 8,
    name: "Denn House",
    category: "Konstruksi & Properti",
    subcategory: "Agen Penjualan atau Penyewaan Properti Harian, Bulanan dan Tahunan.",
    image: "/images/design_thumbnail/denn_house.webp",
    previewHref: "/demo/property",
    tags: ["Properti", "Rumah", "Showcase"],
    icon: House,
  },
  {
    id: 9,
    name: "Chulla",
    category: "Kecantikan",
    subcategory: "Branding skincare professional dengan tampilan website standar brand skincare lokal dan internasional",
    image: "/images/design_thumbnail/chulla.webp",
    previewHref: "/demo/beauty-wellness-2",
    tags: ["Skincare", "Kecantikan", "Kosmetik"],
    icon: MirrorRound,
  },
  {
    id: 10,
    name: "SmartBelajar",
    category: "Pendidikan",
    subcategory: "SmartBelajar membantu anak mengembangkan kemampuan belajar mandiri dalam Matematika dan Membaca sejak usia dini",
    image: "/images/design_thumbnail/smart_belajar.webp",
    previewHref: "/demo/smartbelajar",
    tags: ["Les", "Sekolah", "Kursus"],
    icon: University,
  },
  {
    id: 11,
    name: "Nivora Academy - Akademi digital, kursus, bootcamp",
    category: "Pendidikan",
    subcategory: "Akademi keterampilan digital Indonesia — kursus praktis, bootcamp intensif, dan mentor praktisi industri nyata.",
    image: "/images/design_thumbnail/nivora_academy.webp",
    previewHref: "/demo/nivoraacademy",
    tags: ["Akademi", "Kursus", "Profesi"],
    icon: University,
  },
  {
    id: 12,
    name: "Aliansi Kepemimpinan Indonesia",
    category: "Komunitas",
    subcategory: "Wadah kolaborasi kepemimpinan, transformasi sosial, dan inovasi strategis generasi muda.",
    image: "/images/design_thumbnail/aliansi_kepemimpinan.webp",
    previewHref: "/demo/aliansi-kepemimpinan-indonesia",
    tags: ["Organisasi", "Company Profile", "Komunitas"],
    icon: Users,
  }, 
  {
    id: 13,
    name: "Teh.In - Teh Asli Nusantara",
    category: "UMKM",
    subcategory: "Kesegaran teh asli nusantara, Diseduh segar setiap 4 jam dari pucuk daun teh hitam pegunungan tropis nusantara.",
    image: "/images/design_thumbnail/tehin.webp",
    previewHref: "/demo/tehin",
    tags: ["UMKM", "Teh", "FnB"],
    icon: ShoppingBasket,
  },
  {
    id: 14,
    name: "Agak Rapi",
    category: "Kecantikan",
    subcategory: "Barbershop ekslusif Jakarta; Pangkas presisi untuk yang mau agak rapi.",
    image: "/images/design_thumbnail/agak_rapi.webp",
    previewHref: "/demo/agak-rapi",
    tags: ["Barbershop", "Skena", "Eksperimental"],
    icon: MirrorRound,
  },
  {
    id: 15,
    name: "Pinjam Mobil",
    category: "Otomotif",
    subcategory: "Pinjam Mobil adalah tempat sewa mobil terbaik untuk anda yang ingin jalan-jalan, atau sekedar flexing ke cewe yang anda dekati.",
    image: "/images/design_thumbnail/pinjammobil.webp",
    previewHref: "/demo/pinjammobil",
    tags: ["Otomotif", "Penyewaan", "Mobil"],
    icon: CarFront,
  },
  {
    id: 16,
    name: "FORCEVAULT - NIKE Authorize Seller at Indonesia",
    category: "UMKM",
    subcategory: "Sepatu Nike Air Force 1 Premium Berkualitas",
    image: "/images/design_thumbnail/forcevault.webp",
    previewHref: "/demo/forcevault",
    tags: ["Toko", "Thrifting", "Sepatu"],
    icon: ShoppingBasket,
  },
  {
    id: 17,
    name: "Elevasi",
    category: "Konstruksi & Properti",
    subcategory: "Sepatu Nike Air Force 1 Premium Berkualitas",
    image: "/images/design_thumbnail/elevasi.webp",
    previewHref: "/demo/elevasi",
    tags: ["Jasa", "Konstruksi", "Perusahaan"],
    icon: House,
  },    
];

/**
 * Category otomatis berdasarkan data TEMPLATES.
 *
 * Jadi tidak perlu lagi mengubah count secara manual
 * ketika menambahkan template baru.
 */
const categories = Array.from(
  new Set(TEMPLATES.map((template) => template.category))
);

export const TEMPLATE_CATEGORIES = [
  {
    name: "Semua Design",
    count: TEMPLATES.length,
  },
  ...categories.map((category) => ({
    name: category,
    count: TEMPLATES.filter(
      (template) => template.category === category
    ).length,
  })),
];
