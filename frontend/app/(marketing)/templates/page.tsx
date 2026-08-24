import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Briefcase,
  CarFront,
  ChevronRight,
  ExternalLink,
  Heart,
  Map,
  Rocket,
  Shirt,
  ShoppingCart,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TEMPLATE_CATEGORIES = [
  { name: "Semua Design", count: "120+" },
  { name: "Company Profile", count: "24+" },
  { name: "Services", count: "20+" },
  { name: "Toko Online / E-Commerce", count: "18+" },
  { name: "Landing Page", count: "15+" },
  { name: "Portfolio", count: "12+" },
  { name: "Restaurant & Cafe", count: "10+" },
  { name: "Laundry", count: "8+" },
  { name: "Education", count: "7+" },
  { name: "Automotive", count: "6+" },
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
    image: "/images/web_ayocuci.webp",
    tags: ["Laundry", "Business"],
    icon: Shirt,
  },
  {
    id: 2,
    name: "RestoSpace",
    category: "Restaurant",
    subcategory: "Company Profile",
    price: "Rp699.000",
    image: "/images/web_stokin.webp",
    tags: ["Restaurant", "Company Profile"],
    icon: UtensilsCrossed,
  },
  {
    id: 3,
    name: "Shopify",
    category: "E-Commerce",
    subcategory: "UMKM",
    price: "Rp799.000",
    image: "/images/web_satuRupiah.webp",
    tags: ["E-Commerce", "UMKM"],
    icon: ShoppingCart,
  },
  {
    id: 4,
    name: "BizLand",
    category: "Company Profile",
    subcategory: "Business",
    price: "Rp599.000",
    image: "/images/expertise-2.webp",
    tags: ["Company Profile", "Business"],
    icon: Briefcase,
  },
  {
    id: 5,
    name: "Travelin",
    category: "Travel",
    subcategory: "Tourism",
    price: "Rp599.000",
    image: "/images/expertise-5.webp",
    tags: ["Travel", "Tourism"],
    icon: Map,
  },
  {
    id: 6,
    name: "EduSmart",
    category: "Education",
    subcategory: "School",
    price: "Rp499.000",
    image: "/images/expertise-6.webp",
    tags: ["Education", "School"],
    icon: BookOpen,
  },
  {
    id: 7,
    name: "Glamour",
    category: "Beauty",
    subcategory: "Salon",
    price: "Rp549.000",
    image: "/images/expertise-4.webp",
    tags: ["Beauty", "Salon"],
    icon: Sparkles,
  },
  {
    id: 8,
    name: "StartUp",
    category: "SaaS",
    subcategory: "Startup",
    price: "Rp395.000",
    image: "/images/expertise-8.webp",
    tags: ["Landing Page", "Startup"],
    icon: Rocket,
  },
  {
    id: 9,
    name: "Rentcar Premium",
    category: "Automotive",
    subcategory: "Rental Mobil",
    price: "Rp649.000",
    image: "/templates/automotive/images/hero_section.jpg",
    previewHref: "/templates/automotive",
    tags: ["Automotive", "Rental Mobil"],
    icon: CarFront,
  },
];

const sectionBadgeClass =
  "rounded-full border border-lime-300 bg-lime-50/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-green-700 shadow-sm";

export default function TemplatesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf6_48%,#ffffff_100%)] text-slate-950">
      <section className="relative border-b border-emerald-100/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(95,201,74,0.16),transparent_32%),linear-gradient(120deg,rgba(15,23,42,0.04),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-5 md:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Badge className={sectionBadgeClass}>
              BIDTECH Design Library
            </Badge>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Design Website Profesional
            </h1>
            <p className="mt-3 text-xl font-semibold text-brand-primary">
              Tampilan siap jual untuk bisnis Anda
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Pilih design berkualitas dengan tampilan modern, responsive, dan mudah dikustomisasi sesuai kebutuhan bisnis Anda.
            </p>
          </div>

          <div className="mx-auto mt-9 flex max-w-5xl flex-wrap items-center justify-center gap-3">
            {TEMPLATE_CATEGORIES.slice(0, 9).map((category, index) => (
              <span
                className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition ${
                  index === 0
                    ? "border-brand-primary bg-slate-950 text-white"
                    : "border-emerald-100 bg-white/80 text-slate-600 hover:border-brand-primary/40 hover:text-slate-950"
                }`}
                key={category.name}
              >
                {category.name}
                <span className={index === 0 ? "ml-2 text-brand-primary" : "ml-2 text-slate-400"}>
                  {category.count}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 md:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-primary">
              Pilihan Design
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Siap dipakai, tetap bisa custom
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            Cocok untuk company profile, landing page, e-commerce, dan sistem bisnis yang butuh tampilan rapi sejak awal.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SAMPLE_TEMPLATES.map((template) => {
            const Icon = template.icon;

            return (
              <Card
                className="group overflow-hidden rounded-[22px] border border-emerald-100 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_24px_70px_rgba(95,201,74,0.16)] sm:rounded-[24px]"
                key={template.id}
              >
                <div className="relative overflow-hidden bg-[linear-gradient(135deg,#f3fbef_0%,#ffffff_46%,#eef7ff_100%)] p-3 sm:p-4">
                  <button className="absolute right-3 top-3 z-10 rounded-full border border-emerald-100 bg-white/90 p-2 shadow-sm backdrop-blur transition hover:border-brand-primary/40 sm:right-4 sm:top-4">
                    <Heart className="size-4 text-slate-500 transition-colors group-hover:text-brand-primary" />
                  </button>
                  <div className="relative overflow-hidden rounded-[18px] border border-white bg-white shadow-[0_10px_30px_rgba(15,23,42,0.1)] sm:rounded-[20px]">
                    <div className="absolute left-3 top-3 z-10 flex max-w-[72%] items-center gap-1.5 truncate rounded-full bg-white/90 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 shadow-sm backdrop-blur sm:gap-2 sm:px-3 sm:text-xs">
                      <Icon className="size-3.5 text-brand-primary" />
                      <span className="truncate">{template.category}</span>
                    </div>
                    <Image
                      alt={`${template.name} design preview`}
                      className="h-44 w-full object-cover object-top transition duration-500 group-hover:scale-[1.03] sm:h-56"
                      draggable={false}
                      height={360}
                      src={template.image}
                      width={640}
                    />
                  </div>
                </div>

                <CardContent className="space-y-3.5 p-4 sm:space-y-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-950 transition-colors duration-200 group-hover:text-brand-primary sm:text-lg">
                        {template.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Design {template.subcategory}
                      </p>
                    </div>
                    <p className="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-slate-950 sm:px-3.5 sm:py-2 sm:text-xs">
                      {template.price}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge
                        className="border border-emerald-100 bg-white px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-slate-600 hover:bg-emerald-50 sm:text-xs"
                        key={tag}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 sm:flex sm:gap-3 sm:pt-2">
                    <Link className="flex-1" href={template.previewHref ?? "#"}>
                      <Button
                        className="h-10 w-full gap-1.5 rounded-full border-slate-200 bg-white px-3 text-xs text-slate-950 hover:border-brand-primary/50 hover:bg-emerald-50 sm:gap-2 sm:text-sm"
                        size="sm"
                        variant="outline"
                      >
                        <ExternalLink className="size-3.5 sm:size-4" />
                        Lihat
                      </Button>
                    </Link>
                    <Button
                      className="h-10 flex-1 gap-1.5 rounded-full bg-brand-primary px-3 text-xs text-slate-950 shadow-lg shadow-brand-primary/20 hover:bg-brand-primary-hover sm:gap-2 sm:text-sm"
                      size="sm"
                    >
                      <ShoppingCart className="size-3.5 sm:size-4" />
                      Beli
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button className="rounded-full bg-slate-950 px-8 text-white shadow-none hover:bg-slate-800 hover:shadow-none" size="lg">
            Lihat Design Lainnya
          </Button>
        </div>
      </div>

      <section className="px-4 pb-16 sm:px-5 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-emerald-100 bg-[linear-gradient(135deg,#f2fbef_0%,#ffffff_52%,#eef7f1_100%)] px-6 py-12 text-center shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
          <Badge className={sectionBadgeClass}>Custom Design</Badge>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-950">
            Tidak menemukan design yang sesuai?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Kami siap membuat tampilan custom yang lebih pas dengan brand dan kebutuhan bisnis Anda.
          </p>
          <Button
            className="mt-8 rounded-full bg-brand-primary px-8 text-slate-950 shadow-xl shadow-brand-primary/20 hover:bg-brand-primary-hover"
            size="lg"
          >
            Konsultasi Gratis
            <ChevronRight className="ml-2 size-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}
