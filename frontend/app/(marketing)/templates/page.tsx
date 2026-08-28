"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CarFront,
  ChevronRight,
  ExternalLink,
  Heart,
  ShoppingCart,
  UtensilsCrossed,
  Utensils,
  Dumbbell,
  Users,
  Network,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TEMPLATE_CATEGORIES = [
  { name: "Semua Design", count: 6 },
  { name: "Automotive", count: 1 },
  { name: "Restaurant & Cafe", count: 2 },
  { name: "Gym & Wellness", count: 1 },
  { name: "Community & Org", count: 2 },
];

const SAMPLE_TEMPLATES = [
  {
    id: 1,
    name: "Rentcar - Penyewaan Kendaraan",
    category: "Automotive",
    subcategory: "Showcase kendaraan dan penyewaan kendaraan untuk usaha Penyewaan Kendaraan",
    image: "/images/design_thumbnail/rentcar.webp",
    previewHref: "/demo/automotive/",
    tags: ["Automotive", "Rental Mobil", "Responsive"],
    icon: CarFront,
  },
  {
    id: 2,
    name: "Deny Restaurant - Kalcer Restaurant",
    category: "Restaurant & Cafe",
    subcategory: "Cafe atau restaurant anak muda dengan gaya animasi kalcer, cocok untuk portofolio usaha.",
    image: "/images/design_thumbnail/deny_restaurant.webp",
    previewHref: "/demo/restaurant-cafe-2/",
    tags: ["Restaurant", "Cafe", "Interactive Menu"],
    icon: UtensilsCrossed,
  },
  {
    id: 3,
    name: "Chef's Table - European Signature",
    category: "Restaurant & Cafe",
    subcategory: "Restaurant otentik, mewah dan berprestisius, dengan target korporat dan kelas internasional.",
    image: "/images/design_thumbnail/chefs_table.webp",
    previewHref: "/demo/restaurant-cafe/",
    tags: ["Restaurant", "Diner", "Modern Theme"],
    icon: Utensils,
  },
  {
    id: 4,
    name: "IRONFORCE - Best Gym on Jakarta",
    category: "Gym & Wellness",
    subcategory: "Tempat kebugaran dan latihan anak gen z, tersebar sekitar jabodetabek, dengan fasilitas lengkap dan pelatih professional.",
    image: "/images/design_thumbnail/ironforce.webp",
    previewHref: "/demo/beauty-wellness/",
    tags: ["Fitness", "Gym", "Personal Trainer"],
    icon: Dumbbell,
  },
  {
    id: 5,
    name: "Harapan kita",
    category: "Community & Org",
    subcategory: "Organisasi non-profit mandiri dengan visi pengembangan pendidikan pada anak-anak di wilayah 3T (Tertinggal, Terdepan, dan Terluar).",
    image: "/images/design_thumbnail/harapan_kita.webp",
    previewHref: "/demo/organization/",
    tags: ["Community", "Organization", "Information Portal"],
    icon: Users,
  },
  {
    id: 6,
    name: "CommunityPro",
    category: "Community & Org",
    subcategory: "Professional Community",
    image: "/images/community-pro_template.webp",
    previewHref: "/demo/community-pro/",
    tags: ["Community", "Membership", "Program"],
    icon: Network,
  },
];

const sectionBadgeClass =
  "rounded-full border border-lime-300 bg-lime-50/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-green-700 shadow-sm";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua Design");

  const filteredTemplates = SAMPLE_TEMPLATES.filter((template) => {
    if (selectedCategory === "Semua Design") return true;
    return template.category === selectedCategory;
  });

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
            {TEMPLATE_CATEGORIES.map((category) => (
              <button
                onClick={() => setSelectedCategory(category.name)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition cursor-pointer ${
                  selectedCategory === category.name
                    ? "border-brand-primary bg-slate-950 text-white"
                    : "border-emerald-100 bg-white/80 text-slate-600 hover:border-brand-primary/40 hover:text-slate-950"
                }`}
                key={category.name}
              >
                {category.name}
                <span className={selectedCategory === category.name ? "ml-2 text-brand-primary" : "ml-2 text-slate-400"}>
                  {category.count}
                </span>
              </button>
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const Icon = template.icon;

            return (
              <Card
                className="group flex flex-col overflow-hidden border border-emerald-100 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(95,201,74,0.18)]"
                key={template.id}
              >
                <div className="relative h-48 max-md:h-72 max-sm:h-40 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-3 sm:p-4">
                  <Image
                        alt={`${template.name} design preview`}
                        className="h-full w-full object-cover object-top aspect-video transition-transform duration-500 group-hover:scale-[1.04]"
                        draggable={false}
                        fill
                        src={template.image}
                      />
                </div>

                <CardContent className="flex flex-1 flex-col space-y-3 p-4 sm:space-y-3.5 sm:p-5 h-full">
                  <div className="flex max-w-[65%] w-fit h-fit py-2.5 items-start gap-x-1.5 truncate text-[11px] font-bold text-slate-700 sm:gap-2 sm:text-xs">
                    <Icon className="size-3.5 shrink-0 text-brand-primary" />
                    <span className="truncate">{template.category}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-950 transition-colors duration-200 group-hover:text-brand-primary sm:text-lg">
                      {template.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {template.subcategory}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {template.tags.map((tag) => (
                      <Badge
                        className="border border-emerald-100 bg-white px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-slate-600 transition hover:bg-emerald-50 hover:text-slate-700 sm:px-2.5 sm:py-1 sm:text-[10px]"
                        key={tag}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2 sm:gap-3 sm:pt-3 h-full items-end">
                    <Link
                      className="flex-1"
                      href={template.previewHref ?? "#"}
                      rel={template.previewHref ? "noreferrer" : undefined}
                      target={template.previewHref ? "_blank" : undefined}
                    >
                      <Button
                        className="h-9 w-full gap-1 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700 transition-all hover:border-brand-primary/50 hover:bg-emerald-50 hover:text-slate-900 sm:h-10 sm:gap-1.5 sm:text-sm"
                        size="sm"
                        variant="outline"
                      >
                        <ExternalLink className="size-3.5" />
                        <span>Lihat</span>
                      </Button>
                    </Link>
                    <Button
                      className="h-9 flex-1 gap-1 rounded-full bg-brand-primary text-xs font-medium text-slate-950 shadow-md shadow-brand-primary/20 transition-all hover:bg-brand-primary-hover hover:shadow-lg hover:shadow-brand-primary/30 sm:h-10 sm:gap-1.5 sm:text-sm"
                      size="sm"
                      onClick={() => {
                        const message = `Halo Bidtech! Saya tertarik mendigitalisasikan perusahaan/organisasi saya dengan template website ${template.name}.`
                        const whatsappUrl = `https://wa.me/628217601455?text=${encodeURIComponent(message)}`;
                        window.open(
                          whatsappUrl,
                          "_blank"
                        )
                      }}
                    >
                      <ShoppingCart className="size-3.5" />
                      <span>Beli</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
