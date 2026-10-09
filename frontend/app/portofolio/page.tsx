"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";

import { useLanguage } from "@/lib/i18n";
import {
  PORTFOLIO_ITEMS_ID,
  PORTFOLIO_ITEMS_EN,
  type PortfolioDetailItem,
} from "@/lib/data/portfolio";
import { PortfolioShowcaseStage } from "@/components/portfolio/portfolio-showcase-stage";

function PortfolioContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const topRef = useRef<HTMLDivElement>(null);

  const items: PortfolioDetailItem[] =
    lang === "en" ? PORTFOLIO_ITEMS_EN : PORTFOLIO_ITEMS_ID;

  const initialId = searchParams.get("id") || searchParams.get("item") || items[0].id;
  const [activeId, setActiveId] = useState<string>(initialId);

  useEffect(() => {
    const paramId = searchParams.get("id") || searchParams.get("item");
    if (paramId && items.some((i) => i.id === paramId)) {
      setActiveId(paramId);
    }
  }, [searchParams, items]);

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId)
  );
  const activeItem = items[activeIndex] || items[0];

  const handleSelectPortfolio = (id: string, scroll: boolean = true) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?id=${id}`;
      window.history.pushState(null, "", newUrl);

      if (scroll && topRef.current) {
        const top = topRef.current.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    const nextIndex = (activeIndex - 1 + items.length) % items.length;
    handleSelectPortfolio(items[nextIndex].id, true);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % items.length;
    handleSelectPortfolio(items[nextIndex].id, true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-8 sm:pt-12 md:pt-14 pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. HEADER SECTION: Badge, Title & Subtitle                                */}
        {/* ========================================================================= */}
        <div ref={topRef} className="flex flex-col items-center text-center">
          {/* Badge Pill */}
          <span className="inline-flex items-center rounded-full bg-[#eef8eb] px-4 py-1 text-xs sm:text-[13px] font-bold tracking-widest text-[#45a02e] uppercase shadow-xs">
            PORTOFOLIO
          </span>

          {/* Heading */}
          <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] text-slate-900">
            Portofolio <span className="text-[#5bb82e]">Kami</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 font-normal [text-wrap:balance]">
            {lang === "en"
              ? "Explore BIDTECH's collection of modern, responsive website templates ready to be customized to your business identity."
              : "Jelajahi koleksi template website BIDTECH yang dirancang modern, responsif, dan siap disesuaikan dengan identitas bisnismu."}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. FEATURED PORTFOLIO STAGE (Mockup Devices + Detailed Description)        */}
        {/* ========================================================================= */}
        <section
          aria-label="Detail Portofolio Terpilih"
          className="mt-10 sm:mt-14 md:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center"
        >
          {/* SISI KIRI: Mockup 3 Perangkat (Desktop, Tablet, Mobile) */}
          <div className="lg:col-span-7 xl:col-span-7 w-full flex items-center justify-center">
            <PortfolioShowcaseStage item={activeItem} />
          </div>

          {/* SISI KANAN: Judul, Garis Hijau + Deskripsi Mendalam, dan Link Domain */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center text-left">
            {/* Judul Besar Proyek */}
            <h2 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight">
              {activeItem.title}
            </h2>

            {/* Garis Aksen Hijau Vertikal + Deskripsi Mendalam */}
            <div className="mt-4 sm:mt-6 flex items-stretch gap-3.5 sm:gap-4.5">
              <div className="w-[3.5px] sm:w-1 shrink-0 rounded-full bg-[#5bb82e]" />
              <p className="text-xs sm:text-sm md:text-base lg:text-[16px] leading-relaxed sm:leading-[1.7] text-slate-600 font-normal">
                {activeItem.detailedDescription}
              </p>
            </div>

            {/* Tautan Domain Eksternal */}
            <div className="mt-6 sm:mt-8">
              <a
                href={activeItem.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg font-semibold text-[#5bb82e] hover:text-[#4aa024] transition-colors group cursor-pointer"
              >
                <span>{activeItem.domain}</span>
                <ExternalLink className="size-4 sm:size-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. DAFTAR PORTOFOLIO YANG LAIN (Grid Kartu + Navigasi)                    */}
        {/* ========================================================================= */}
        <section
          aria-label="Koleksi Portofolio Lainnya"
          className="mt-16 sm:mt-24 md:mt-28"
        >
          {/* Grid Kartu Portofolio (3 Kolom di Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {items.map((item, idx) => {
              const isSelected = item.id === activeItem.id;
              return (
                <article
                  key={item.id}
                  onClick={() => handleSelectPortfolio(item.id, true)}
                  className={`group relative rounded-2xl bg-white border p-3.5 sm:p-4 shadow-xs transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-[#5bb82e] ring-2 ring-[#5bb82e]/20 shadow-md"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {/* Thumbnail Screenshot */}
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                      <Image
                        src={item.image}
                        alt={`Screenshot ${item.title}`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Badge Aktif */}
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 rounded-full bg-[#5bb82e] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5">
                          <span className="size-1.5 rounded-full bg-white animate-pulse" />
                          <span>Ditampilkan</span>
                        </div>
                      )}
                    </div>

                    {/* Informasi Kartu */}
                    <div className="mt-4">
                      <h3 className="font-[family-name:var(--font-sora),sans-serif] text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#5bb82e] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                        {item.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Footer Kartu: Link Domain + Action Detail */}
                  <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5bb82e] hover:text-[#4aa024] transition-colors"
                    >
                      <span>{item.domain}</span>
                      <ExternalLink className="size-3 sm:size-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPortfolio(item.id, true);
                      }}
                      className="text-xs font-semibold text-slate-400 group-hover:text-[#5bb82e] transition-colors cursor-pointer"
                    >
                      {isSelected ? "Sedang Dilihat" : "Pilih Portofolio →"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 4. PAGINASI BAWAH: [<- Sebelumnya] [1] [2] [3] [4] [5] [Selanjutnya ->]     */}
          {/* ========================================================================= */}
          <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium">
            {/* Tombol Sebelumnya */}
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-95 transition cursor-pointer"
            >
              <ArrowLeft className="size-3.5 sm:size-4" />
              <span>Sebelumnya</span>
            </button>

            {/* Nomor Indikator Portofolio (1 - 5) */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {items.map((item, index) => {
                const pageNumber = index + 1;
                const isCurrent = index === activeIndex;
                return (
                  <button
                    key={`page-${item.id}`}
                    type="button"
                    onClick={() => handleSelectPortfolio(item.id, true)}
                    aria-label={`Pilih portofolio ${pageNumber}: ${item.title}`}
                    className={`size-8 sm:size-9 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? "bg-[#5bb82e] text-white shadow-xs scale-105"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Tombol Selanjutnya */}
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-95 transition cursor-pointer"
            >
              <span>Selanjutnya</span>
              <ArrowRight className="size-3.5 sm:size-4" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="size-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
