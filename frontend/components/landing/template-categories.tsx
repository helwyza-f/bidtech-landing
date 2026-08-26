"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/landing/reveal";
import { ChevronRight, X, Store, Briefcase, Calendar, Car, Plane, UtensilsCrossed, Users, Heart, Rocket, Home, Hammer, Palette, Sparkles, Building2, Cog, BookOpen, ShoppingCart, Lightbulb } from "lucide-react";

const TEMPLATE_CATEGORIES = [
  {
    name: "UMKM",
    description: "Laundry, Barbershop, Salon, Bengkel, Toko Bunga",
    icon: Store,
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
    icon: Briefcase,
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
    icon: Calendar,
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
    name: "Automotive",
    description: "Dealer, Rental, Showroom, Bengkel",
    icon: Car,
    features: [
      { title: "Inventory", description: "Katalog kendaraan lengkap" },
      { title: "Specifications", description: "Detail spesifikasi kendaraan" },
      { title: "Test Drive", description: "Booking test drive online" },
      { title: "Financing", description: "Opsi pembiayaan" },
      { title: "Service", description: "Appointment service berkala" },
      { title: "Reviews", description: "Rating & review pelanggan" },
    ],
  },
  {
    name: "Travel & Hospitality",
    description: "Hotel, Villa, Tour & Travel, Rental",
    icon: Plane,
    features: [
      { title: "Listings", description: "Kamar & paket wisata" },
      { title: "Booking", description: "Reservasi online mudah" },
      { title: "Pricing", description: "Harga transparan & promo" },
      { title: "Map", description: "Lokasi & peta interaktif" },
      { title: "Reviews", description: "Rating tamu & testimonial" },
      { title: "Availability", description: "Kalender ketersediaan" },
    ],
  },
  {
    name: "Restaurant & Cafe",
    description: "Restoran, Kafe, Menu Digital",
    icon: UtensilsCrossed,
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
    name: "Organization",
    description: "Komunitas, Organisasi Sosial, Perkumpulan",
    icon: Users,
    features: [
      { title: "About", description: "Profil organisasi & tujuan" },
      { title: "Members", description: "Directory anggota" },
      { title: "Events", description: "Daftar acara & aktivitas" },
      { title: "Forum", description: "Forum diskusi online" },
      { title: "Gallery", description: "Galeri kegiatan" },
      { title: "Join", description: "Pendaftaran anggota baru" },
    ],
  },
  {
    name: "Nonprofit",
    description: "Yayasan, Donasi, Program Sosial",
    icon: Heart,
    features: [
      { title: "Impact", description: "Program dampak sosial" },
      { title: "Donate", description: "Platform donasi online" },
      { title: "Stories", description: "Cerita sukses & testimoni" },
      { title: "Volunteer", description: "Pendaftaran relawan" },
      { title: "Reports", description: "Laporan tahunan & transparan" },
      { title: "Contact", description: "Hubungi tim kami" },
    ],
  },
  {
    name: "SaaS / Startup",
    description: "Produk Digital, Aplikasi, Landing Page",
    icon: Rocket,
    features: [
      { title: "Features", description: "Showcase fitur unggulan" },
      { title: "Pricing", description: "Paket harga & billing" },
      { title: "Demo", description: "Video demo & trial gratis" },
      { title: "Documentation", description: "API docs & resources" },
      { title: "Testimonials", description: "User testimonial & case study" },
      { title: "Sign Up", description: "Onboarding & registrasi" },
    ],
  },
  {
    name: "Property",
    description: "Perumahan, Kos, Apartemen, Agen",
    icon: Home,
    features: [
      { title: "Listings", description: "Katalog properti lengkap" },
      { title: "Details", description: "Spesifikasi & fasilitas" },
      { title: "Virtual Tour", description: "3D tour & photo gallery" },
      { title: "Map", description: "Lokasi & neighborhood info" },
      { title: "Calculator", description: "Mortgage calculator tool" },
      { title: "Inquiry", description: "Contact agen inquiry form" },
    ],
  },
  {
    name: "Service Professional",
    description: "Konsultan, Legal, Akuntan, Arsitek",
    icon: Hammer,
    features: [
      { title: "Expertise", description: "Area keahlian profesional" },
      { title: "Services", description: "Layanan detail & pricing" },
      { title: "Portfolio", description: "Case studies & projects" },
      { title: "Team", description: "Profile tim professional" },
      { title: "Blog", description: "Insights & artikel expert" },
      { title: "Contact", description: "Appointment & konsultasi" },
    ],
  },
  {
    name: "Portfolio",
    description: "Designer, Developer, Fotografer, Freelancer",
    icon: Palette,
    features: [
      { title: "Gallery", description: "Showcase karya portfolio" },
      { title: "Projects", description: "Detail project & client" },
      { title: "Skills", description: "Keahlian & expertise" },
      { title: "About", description: "Profil & pengalaman" },
      { title: "Blog", description: "Article & insights" },
      { title: "Contact", description: "Hubungi untuk kolaborasi" },
    ],
  },
  {
    name: "Beauty & Wellness",
    description: "Skincare, Spa, Gym, Fitness, Salon",
    icon: Sparkles,
    features: [
      { title: "Services", description: "Layanan treatment lengkap" },
      { title: "Booking", description: "Appointment online mudah" },
      { title: "Pricing", description: "Harga & paket membership" },
      { title: "Products", description: "Produk retail & perawatan" },
      { title: "Before/After", description: "Galeri transformasi" },
      { title: "Reviews", description: "Rating & testimonial" },
    ],
  },
  {
    name: "Construction",
    description: "Kontraktor, Manufaktur, Supplier",
    icon: Building2,
    features: [
      { title: "Portfolio", description: "Showcase proyek selesai" },
      { title: "Services", description: "Layanan konstruksi detail" },
      { title: "Certifications", description: "Sertifikasi & penghargaan" },
      { title: "Team", description: "Profile tim & expertise" },
      { title: "Equipment", description: "Peralatan & kapasitas" },
      { title: "Quote", description: "Request quotation form" },
    ],
  },
  {
    name: "Company Profile",
    description: "Profil Perusahaan, Visi & Misi",
    icon: Cog,
    features: [
      { title: "About", description: "Profil & sejarah perusahaan" },
      { title: "Mission", description: "Visi, Misi, Nilai perusahaan" },
      { title: "Team", description: "Struktur organisasi & tim" },
      { title: "Services", description: "Layanan unggulan" },
      { title: "Achievements", description: "Penghargaan & sertifikasi" },
      { title: "Contact", description: "Informasi kontak lengkap" },
    ],
  },
  {
    name: "Services",
    description: "Halaman Layanan & Produk",
    icon: Cog,
    features: [
      { title: "Service Cards", description: "Showcase layanan menarik" },
      { title: "Details", description: "Detail lengkap setiap layanan" },
      { title: "Pricing", description: "Paket & harga transparan" },
      { title: "Benefits", description: "Manfaat & keunggulan" },
      { title: "CTA", description: "Call-to-action yang efektif" },
      { title: "Contact", description: "Hubungi untuk order" },
    ],
  },
  {
    name: "Blog",
    description: "Website Blog, Artikel, Kategori",
    icon: BookOpen,
    features: [
      { title: "Articles", description: "Listing artikel lengkap" },
      { title: "Categories", description: "Filter artikel per kategori" },
      { title: "Search", description: "Pencarian artikel mudah" },
      { title: "Comments", description: "Komentar & diskusi reader" },
      { title: "Author", description: "Profile & bio penulis" },
      { title: "Newsletter", description: "Subscribe newsletter email" },
    ],
  },
  {
    name: "E-Commerce",
    description: "Toko Online, Produk, Checkout",
    icon: ShoppingCart,
    features: [
      { title: "Products", description: "Katalog produk lengkap" },
      { title: "Cart", description: "Keranjang belanja fitur" },
      { title: "Checkout", description: "Proses pembayaran aman" },
      { title: "Filters", description: "Filter kategori & harga" },
      { title: "Reviews", description: "Rating produk pelanggan" },
      { title: "Orders", description: "Tracking pesanan real-time" },
    ],
  },
  {
    name: "Landing Page",
    description: "Conversion-Focused Landing Page",
    icon: Lightbulb,
    features: [
      { title: "Hero Section", description: "Headline & CTA menarik" },
      { title: "Value Prop", description: "Proposisi nilai jelas" },
      { title: "Features", description: "Showcase fitur unggulan" },
      { title: "Social Proof", description: "Testimoni & success stories" },
      { title: "Pricing", description: "Pricing table jelas" },
      { title: "Form", description: "Lead capture form efektif" },
    ],
  },
];

export function TemplateCategories() {
  const [selectedCategory, setSelectedCategory] = useState<typeof TEMPLATE_CATEGORIES[0] | null>(null);
  const SelectedCategoryIcon = selectedCategory?.icon;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20" id="templates">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Badge className="border-green-700/20 bg-green-700/10 text-brand-primary">Template Library</Badge>
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-4xl">
          Template Siap Pakai <span className="text-brand-primary">20+ Kategori</span>
        </h2>
        <p className="mt-4 leading-7 text-zinc-400">
          Koleksi lengkap template website untuk berbagai industri dan kebutuhan bisnis. Mulai dari UMKM hingga Enterprise.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATE_CATEGORIES.map((category, index) => {
          const Icon = category.icon;

          return (
            <Reveal key={category.name} delay={(index % 3) * 80}>
              <Card
                className="group relative overflow-hidden border-lime-300/15 bg-brand-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-lime-300/40 hover:bg-brand-surface cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <CardContent className="flex h-full min-h-48 flex-col justify-between p-6">
                  <div>
                    <Icon className="mb-3 size-10 text-brand-primary" />
                    <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-white group-hover:text-brand-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs leading-5 text-zinc-400 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Lihat Detail</span>
                      <ChevronRight className="size-4" />
                    </div>
                  </div>
                </CardContent>

                <div className="absolute inset-0 bg-gradient-to-br from-lime-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Modal untuk category details */}
      {selectedCategory && SelectedCategoryIcon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-lime-300/20 bg-brand-surface">
            <CardContent className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <SelectedCategoryIcon className="mb-3 size-12 text-brand-primary" />
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
                <h3 className="text-lg font-semibold text-brand-primary mb-4">Fitur Template</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCategory.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-start gap-3 p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:border-lime-300/20 hover:bg-white/[0.05] transition"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary font-semibold">
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
                  className="flex-1 px-4 py-3 rounded-lg bg-brand-primary text-black font-semibold hover:bg-brand-primary-hover transition text-center"
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
