"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

const CATEGORIES = ["Semua", "Website & SEO", "Aplikasi Mobile", "Tips Bisnis", "Teknologi"];

const FEATURED_POSTS = [
  {
    slug: "tips-memilih-desain-website-bisnis",
    category: "Website & SEO",
    title: "Panduan Memilih Template vs Custom Website untuk UMKM dan Bisnis Modern",
    excerpt:
      "Kapan bisnis Anda membutuhkan template siap pakai dan kapan waktu yang tepat untuk beralih ke pembuatan web custom? Simak ulasan komprehensifnya.",
    date: "7 Oktober 2026",
    readTime: "5 menit baca",
    badge: "Populer",
  },
  {
    slug: "mengapa-kecepatan-website-berpengaruh-ke-penjualan",
    category: "Tips Bisnis",
    title: "Mengapa Kecepatan Website Berpengaruh Langsung terhadap Konversi Penjualan?",
    excerpt:
      "Studi membuktikan keterlambatan 1 detik dapat menurunkan penjualan hingga 7%. Pelajari cara mengoptimalkan performa web Anda agar selalu ngebut.",
    date: "4 Oktober 2026",
    readTime: "4 menit baca",
    badge: "Penting",
  },
  {
    slug: "otomasi-sistem-manajemen-inventaris",
    category: "Aplikasi Mobile",
    title: "Otomasi Operasional Bisnis: Dari Pencatatan Manual ke Aplikasi Internal Terintegrasi",
    excerpt:
      "Tinggalkan spreadsheet manual yang rentan kesalahan. Cari tahu bagaimana sistem ERP & CRM custom membantu tim bergerak 3x lebih efisien.",
    date: "1 Oktober 2026",
    readTime: "6 menit baca",
    badge: "Solusi",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredPosts =
    activeCategory === "Semua"
      ? FEATURED_POSTS
      : FEATURED_POSTS.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO HEADER */}
      <section className="relative pt-12 sm:pt-16 pb-10 sm:pb-14 overflow-hidden border-b border-slate-100">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-full max-w-4xl rounded-full bg-[radial-gradient(ellipse_at_top,rgba(163,230,53,0.18)_0%,rgba(187,247,208,0.1)_45%,transparent_70%)] filter blur-3xl -z-10"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={16}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4f2c5] bg-[#f0faee] px-4 py-1.5 text-xs font-bold text-[#45a02e]">
              <Sparkles className="size-3.5" />
              <span>Wawasan &amp; Edukasi Digital</span>
            </div>
            <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Blog &amp; Inspirasi <span className="text-[#45a02e]">Teknologi Bisnis</span>
            </h1>
            <p className="mt-3.5 mx-auto max-w-2xl text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed">
              Kumpulan artikel, tips pengembangan web &amp; aplikasi, serta strategi digitalisasi terbaik untuk mempercepat pertumbuhan bisnis Anda.
            </p>
          </Reveal>

          {/* Category Tabs */}
          <Reveal y={12} delay={100} className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#45a02e] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 2. ARTICLES GRID */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, idx) => (
              <Reveal key={post.slug} y={16} delay={idx * 60}>
                <div className="group flex h-full flex-col justify-between rounded-[24px] border border-slate-200/90 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#45a02e]/40 hover:shadow-[0_12px_32px_rgba(69,160,46,0.08)] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#45a02e]">
                        <BookOpen className="size-3.5" />
                        {post.badge}
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#45a02e] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link
                      href="/hubungi-kami"
                      className="inline-flex items-center gap-1 font-bold text-[#45a02e] hover:translate-x-0.5 transition-transform"
                    >
                      <span>Baca</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA Box */}
          <Reveal y={20} delay={150} className="mt-14 sm:mt-16">
            <div className="rounded-[28px] border border-[#d6f2c9] bg-gradient-to-br from-[#f2faf0] via-white to-[#edf8eb] p-6 sm:p-10 text-center shadow-[0_12px_36px_rgba(69,160,46,0.08)]">
              <h2 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-xl sm:text-2xl font-bold text-slate-900">
                Punya Ide atau Butuh Konsultasi Website Bisnis?
              </h2>
              <p className="mt-2 max-w-xl mx-auto text-xs sm:text-sm text-slate-600">
                Diskusikan kebutuhan website atau aplikasi custom Anda langsung bersama konsultan teknis kami. Gratis tanpa biaya awal.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/hubungi-kami"
                  className="inline-flex items-center gap-2 rounded-full bg-[#48b02c] hover:bg-[#3ea023] text-white px-6 py-3 text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(72,176,44,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Konsultasi Sekarang</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/template-website"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 text-xs sm:text-sm font-semibold transition"
                >
                  <span>Lihat Pilihan Template</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
