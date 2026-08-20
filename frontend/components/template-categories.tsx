"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { ChevronRight, X } from "lucide-react";

const TEMPLATE_CATEGORIES = [
  {
    name: "UMKM",
    description: "Laundry, Barbershop, Salon, Bengkel, Toko Bunga",
    icon: "🏪",
    features: [
      { title: "Inventory", description: "Kelola stok layanan & paket" },
      { title: "Booking", description: "Reservasi & jadwal appointment" },
      { title: "Pricing", description: "Harga dan deskripsi layanan" },
      { title: "Gallery", description: "Galeri foto hasil kerja" },
      { title: "Reviews", description: "Rating & testimonial pelanggan" },
      { title: "Lokasi", description: "Peta & alamat bisnis" },
    ],
  },
  {
    name: "Education",
    description: "Sekolah, Kursus, Bootcamp, Webinar",
    icon: "🎓",
    features: [
      { title: "Programs", description: "Daftar program & kursus" },
      { title: "Schedule", description: "Jadwal kelas & pembelajaran" },
      { title: "Instructors", description: "Profile guru/instruktur" },
      { title: "Enrollment", description: "Pendaftaran siswa online" },
      { title: "Certificates", description: "Sertifikat & achievement" },
      { title: "Resources", description: "Materi & learning materials" },
    ],
  },
  {
    name: "Event",
    description: "Seminar, Konferensi, Launching, Undangan Digital",
    icon: "🎉",
    features: [
      { title: "Details", description: "Tanggal, waktu, lokasi acara" },
      { title: "Speakers", description: "Profile pembicara & expert" },
      { title: "Agenda", description: "Jadwal lengkap event" },
      { title: "Ticketing", description: "Booking & pembayaran tiket" },
      { title: "Venue Map", description: "Peta lokasi acara" },
      { title: "Gallery", description: "Foto & dokumentasi" },
    ],
  },
  {
    name: "Restaurant & Cafe",
    description: "Restoran, Kafe, Menu Digital",
    icon: "🍽️",
    features: [
      { title: "Menu", description: "Digital menu dengan kategori" },
      { title: "Pricing", description: "Harga & deskripsi makanan" },
      { title: "Reservation", description: "Booking meja online" },
      { title: "Delivery", description: "Integrasi order delivery" },
      { title: "Gallery", description: "Foto menu yang menarik" },
      { title: "Reviews", description: "Rating & review pelanggan" },
    ],
  },
  {
    name: "E-Commerce",
    description: "Toko Online, Produk, Checkout",
    icon: "🛒",
    features: [
      { title: "Products", description: "Katalog produk lengkap" },
      { title: "Shopping Cart", description: "Keranjang belanja" },
      { title: "Checkout", description: "Proses pembayaran aman" },
      { title: "Filters", description: "Filter kategori & harga" },
      { title: "Reviews", description: "Rating produk pelanggan" },
      { title: "Orders", description: "Tracking pesanan real-time" },
    ],
  },
  {
    name: "Company Profile",
    description: "Profil Perusahaan, Visi & Misi",
    icon: "🏢",
    features: [
      { title: "About", description: "Profil & sejarah perusahaan" },
      { title: "Mission", description: "Visi, Misi, Nilai perusahaan" },
      { title: "Team", description: "Struktur organisasi & tim" },
      { title: "Services", description: "Layanan unggulan" },
      { title: "Achievements", description: "Penghargaan & sertifikasi" },
      { title: "Contact", description: "Informasi kontak lengkap" },
    ],
  },
];

export function TemplateCategories() {
  const [selectedCategory, setSelectedCategory] = useState<typeof TEMPLATE_CATEGORIES[0] | null>(null);

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

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATE_CATEGORIES.map((category) => (
          <Reveal key={category.name} delay={Math.random() * 200}>
            <Card
              className="group relative overflow-hidden border-lime-300/15 bg-[#0b0f12]/80 backdrop-blur-sm transition-all duration-300 hover:border-lime-300/40 hover:bg-[#0b0f12] cursor-pointer"
              onClick={() => setSelectedCategory(category)}
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
                    <span>Lihat Detail</span>
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              </CardContent>

              <div className="absolute inset-0 bg-gradient-to-br from-lime-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Modal untuk category details */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-lime-300/20 bg-[#0b0f12]">
            <CardContent className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="text-6xl mb-3">{selectedCategory.icon}</div>
                  <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-white">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-sm text-zinc-400 mt-2">{selectedCategory.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-zinc-400 hover:text-white transition"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* Features Grid */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#63E009] mb-4">Fitur Template</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCategory.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-start gap-3 p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:border-lime-300/20 hover:bg-white/[0.05] transition"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#63E009]/10 text-[#63E009] font-semibold">
                        ✓
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{feature.title}</p>
                        <p className="text-xs text-zinc-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex-1 px-4 py-3 rounded-lg border border-white/15 text-white font-semibold hover:border-white/30 transition"
                >
                  Tutup
                </button>
                <a
                  href="/templates"
                  className="flex-1 px-4 py-3 rounded-lg bg-[#63E009] text-black font-semibold hover:bg-[#52be07] transition text-center"
                >
                  Lihat Template
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
