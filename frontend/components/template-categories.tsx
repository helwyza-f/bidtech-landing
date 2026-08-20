"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { ChevronRight } from "lucide-react";

const TEMPLATE_CATEGORIES = [
  { name: "UMKM", description: "Laundry, Barbershop, Salon, Bengkel, Toko Bunga", icon: "🏪" },
  { name: "Education", description: "Sekolah, Kursus, Bootcamp, Webinar", icon: "🎓" },
  { name: "Event", description: "Seminar, Konferensi, Launching, Undangan Digital", icon: "🎉" },
  { name: "Automotive", description: "Dealer, Rental, Showroom, Bengkel", icon: "🚗" },
  { name: "Travel & Hospitality", description: "Hotel, Villa, Tour & Travel, Rental", icon: "✈️" },
  { name: "Restaurant & Cafe", description: "Restoran, Kafe, Menu Digital", icon: "🍽️" },
  { name: "Organization", description: "Komunitas, Organisasi Sosial, Perkumpulan", icon: "🤝" },
  { name: "Nonprofit", description: "Yayasan, Donasi, Program Sosial", icon: "❤️" },
  { name: "SaaS / Startup", description: "Produk Digital, Aplikasi, Landing Page", icon: "🚀" },
  { name: "Property", description: "Perumahan, Kos, Apartemen, Agen", icon: "🏠" },
  { name: "Service Professional", description: "Konsultan, Legal, Akuntan, Arsitek", icon: "💼" },
  { name: "Portfolio", description: "Designer, Developer, Fotografer, Freelancer", icon: "🎨" },
  { name: "Beauty & Wellness", description: "Skincare, Spa, Gym, Fitness, Salon", icon: "💆" },
  { name: "Construction", description: "Kontraktor, Manufaktur, Supplier", icon: "🏗️" },
  { name: "Company Profile", description: "Profil Perusahaan, Visi & Misi", icon: "🏢" },
  { name: "Services", description: "Halaman Layanan & Produk", icon: "⚙️" },
  { name: "Blog", description: "Website Blog, Artikel, Kategori", icon: "📝" },
  { name: "E-Commerce", description: "Toko Online, Produk, Checkout", icon: "🛒" },
  { name: "Landing Page", description: "Conversion-Focused Landing Page", icon: "📄" },
  { name: "View All", description: "Lihat semua template & dokumentasi lengkap", icon: "👀" },
];

export function TemplateCategories() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="templates">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Badge className="border-green-700/20 bg-green-700/10 text-[#63E009]">Template Library</Badge>
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
          Template Siap Pakai <span className="text-[#63E009]">20+ Kategori</span>
        </h2>
        <p className="mt-4 leading-7 text-zinc-400">
          Koleksi lengkap template website untuk berbagai industri dan kebutuhan bisnis. Mulai dari UMKM hingga Enterprise.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {TEMPLATE_CATEGORIES.map((category) => (
          <Reveal key={category.name} delay={Math.random() * 200}>
            <Card
              className="group relative overflow-hidden border-lime-300/15 bg-[#0b0f12]/80 backdrop-blur-sm transition-all duration-300 hover:border-lime-300/40 hover:bg-[#0b0f12] cursor-pointer"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <CardContent className="flex h-full min-h-48 flex-col justify-between p-6">
                <div>
                  <div className="text-5xl mb-3">{category.icon}</div>
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-white group-hover:text-[#63E009] transition-colors">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-3">
                  <p className="text-xs leading-5 text-zinc-400 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#63E009] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Lihat</span>
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              </CardContent>

              <div className="absolute inset-0 bg-gradient-to-br from-lime-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-zinc-400 mb-4">
          📦 20 kategori template | 🎨 Next.js + TypeScript | ⚡ Production Ready
        </p>
        <a
          href="/templates"
          className="inline-flex items-center gap-2 rounded-lg border border-[#63E009] bg-[#63E009]/10 px-6 py-3 text-sm font-semibold text-[#63E009] transition hover:bg-[#63E009] hover:text-black"
        >
          Jelajahi Semua Template
          <ChevronRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
