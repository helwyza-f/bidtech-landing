import {
  CarFront,
  Dumbbell,
  Network,
  Users,
  UtensilsCrossed,
  ShoppingBasket,
  House,
  MirrorRound,
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
    category: "Restaurant",
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
    category: "Restaurant",
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
    category: "Gym",
    subcategory:
      "Tempat kebugaran dan latihan anak gen z, tersebar sekitar jabodetabek, dengan fasilitas lengkap dan pelatih professional.",
    image: "/images/design_thumbnail/ironforce.webp",
    previewHref: "/demo/beauty-wellness",
    tags: ["Fitness", "Gym", "Personal Trainer"],
    icon: Dumbbell,
  },
  {
    id: 5,
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
    id: 6,
    name: "Yayasan Bakti Nusantara",
    category: "Komunitas",
    subcategory: "Organisasi nirlaba sosial kemasyarakatan independen yang mendedikasikan diri untuk pengentasan kemiskinan, pemberdayaan ekonomi warga, dan kemanusiaan di Indonesia.",
    image: "/images/design_thumbnail/batik_nusantara.webp",
    previewHref: "/demo/community-pro",
    tags: ["Community", "Yayasan", "Donation"],
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
    category: "Properti",
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
