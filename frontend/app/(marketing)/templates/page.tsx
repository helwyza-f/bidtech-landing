import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Heart } from "lucide-react";
import Image from "next/image";

const TEMPLATE_CATEGORIES = [
  { name: "Semua Template", count: "120+" },
  { name: "Company Profile", count: "24+" },
  { name: "Services", count: "20+" },
  { name: "Toko Online / E-Commerce", count: "18+" },
  { name: "Landing Page", count: "15+" },
  { name: "Portfolio", count: "12+" },
  { name: "Restaurant & Cafe", count: "10+" },
  { name: "Laundry", count: "8+" },
  { name: "Education", count: "7+" },
  { name: "Beauty & Salon", count: "6+" },
  { name: "Travel & Tour", count: "5+" },
  { name: "Property", count: "5+" },
  { name: "Event & Wedding", count: "4+" },
  { name: "SaaS / Startup", count: "3+" },
  { name: "Jasa Profesional", count: "3+" },
];

const SAMPLE_TEMPLATES = [
  {
    id: 1,
    name: "LaundryPro",
    category: "Laundry",
    subcategory: "Business",
    price: "Rp499.000",
    image: "/templates/laundry-pro.jpg",
    tags: ["Laundry", "Business"],
  },
  {
    id: 2,
    name: "RestoSpace",
    category: "Restaurant",
    subcategory: "Company Profile",
    price: "Rp699.000",
    image: "/templates/resto-space.jpg",
    tags: ["Restaurant", "Company Profile"],
  },
  {
    id: 3,
    name: "Shopify",
    category: "E-Commerce",
    subcategory: "UMKM",
    price: "Rp799.000",
    image: "/templates/shopify.jpg",
    tags: ["E-Commerce", "UMKM"],
  },
  {
    id: 4,
    name: "BizLand",
    category: "Company Profile",
    subcategory: "Business",
    price: "Rp599.000",
    image: "/templates/bizland.jpg",
    tags: ["Company Profile", "Business"],
  },
  {
    id: 5,
    name: "Travelin",
    category: "Travel",
    subcategory: "Tourism",
    price: "Rp599.000",
    image: "/templates/travelin.jpg",
    tags: ["Travel", "Tourism"],
  },
  {
    id: 6,
    name: "EduSmart",
    category: "Education",
    subcategory: "School",
    price: "Rp499.000",
    image: "/templates/edusmart.jpg",
    tags: ["Education", "School"],
  },
  {
    id: 7,
    name: "Glamour",
    category: "Beauty",
    subcategory: "Salon",
    price: "Rp549.000",
    image: "/templates/glamour.jpg",
    tags: ["Beauty", "Salon"],
  },
  {
    id: 8,
    name: "StartUp",
    category: "SaaS",
    subcategory: "Startup",
    price: "Rp395.000",
    image: "/templates/startup.jpg",
    tags: ["Landing Page", "Startup"],
  },
];

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
            <span>Home</span>
            <ChevronRight className="size-4" />
            <span className="text-[#63E009]">Template</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Template Website Profesional
            </h1>
            <p className="text-[#63E009] text-xl font-semibold mt-2">
              Siap Pakai untuk Bisnis Anda
            </p>
            <p className="text-zinc-400 mt-3 max-w-2xl">
              Pilih template berkualitas dengan desain modern, responsive, dan mudah dikustomisasi sesuai kebutuhan bisnis Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#63E009]/10">
                <span className="text-[#63E009] font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Desain Premium</p>
                <p className="text-xs text-zinc-400">Template modern & profesional</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#63E009]/10">
                <span className="text-[#63E009] font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Responsive</p>
                <p className="text-xs text-zinc-400">Optimal di semua perangkat</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#63E009]/10">
                <span className="text-[#63E009] font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Mudah Dikustomisasi</p>
                <p className="text-xs text-zinc-400">Sesuaikan dengan brand Anda</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#63E009]/10">
                <span className="text-[#63E009] font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">SEO Friendly</p>
                <p className="text-xs text-zinc-400">Dioptimalkan untuk peringkat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-12">
        <div className="flex gap-8">
          {/* Sidebar Categories */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <h3 className="font-semibold text-white mb-4">Kategori Template</h3>
              <div className="space-y-2">
                {TEMPLATE_CATEGORIES.map((category) => (
                  <button
                    key={category.name}
                    className="w-full flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-left text-sm transition hover:border-[#63E009]/30 hover:bg-white/[0.05]"
                  >
                    <span className="text-white hover:text-[#63E009] transition">
                      {category.name}
                    </span>
                    <span className="text-[#63E009] text-xs font-semibold">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Consultation CTA */}
              <div className="mt-8 rounded-xl border border-[#63E009]/20 bg-[#63E009]/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎧</span>
                </div>
                <p className="text-sm font-semibold text-white mb-3">
                  Butuh template custom?
                </p>
                <p className="text-xs text-zinc-400 mb-4">
                  Kami siap membuat solusi yang sesuai dengan kebutuhan bisnis Anda
                </p>
                <button className="w-full rounded-lg bg-[#63E009] px-4 py-2 text-center text-sm font-semibold text-black hover:bg-[#52be07] transition">
                  Konsultasi Gratis
                </button>
              </div>
            </div>
          </aside>

          {/* Templates Grid */}
          <div className="flex-1">
            {/* Filter & Sort */}
            <div className="mb-8 flex items-center justify-between">
              <p className="text-zinc-400">
                Menampilkan <span className="font-semibold text-white">120+ template website</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">Urutan:</span>
                <select className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#63E009]">
                  <option>Terbaru</option>
                  <option>Populer</option>
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Templates Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_TEMPLATES.map((template) => (
                <Card key={template.id} className="group overflow-hidden border-white/10 bg-[#0b0f12] transition hover:border-[#63E009]/30">
                  <div className="relative overflow-hidden bg-[#050505] h-48">
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm">
                      [Template Preview]
                    </div>
                    <button className="absolute top-3 right-3 z-10 rounded-lg bg-black/50 p-2 backdrop-blur-sm transition hover:bg-black/70">
                      <Heart className="size-5 text-white hover:text-[#63E009]" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white text-lg group-hover:text-[#63E009] transition">
                      {template.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Template {template.category}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {template.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-[#63E009]/10 text-[#63E009] text-xs border-0 hover:bg-[#63E009]/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-[#63E009] font-semibold mt-4">
                      {template.price}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/15 text-white hover:border-[#63E009] hover:text-[#63E009]"
                      >
                        Live Preview
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-[#63E009] text-black hover:bg-[#52be07]"
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="bg-[#63E009] text-black hover:bg-[#52be07]"
              >
                Lihat Template Lainnya
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-[#0b0f12] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Tidak menemukan template yang sesuai?
          </h2>
          <p className="text-zinc-400 mt-3">
            Kami siap membuat template custom sesuai kebutuhan bisnis Anda
          </p>
          <Button
            size="lg"
            className="mt-8 bg-[#63E009] text-black hover:bg-[#52be07]"
          >
            Konsultasi Gratis
            <ChevronRight className="ml-2 size-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}
