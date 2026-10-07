"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gauge } from "lucide-react";
import { HeroDomainSearch } from "./hero-domain-search";

export function HeroShowcase() {
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);

  // Auto-switch slide otomatis setiap 3.5 detik secara berkesinambungan
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 3500);

    return () => clearInterval(timer);
  }, [activeSlide]);

  return (
    <div className="relative w-full">
      {/* 
        Responsive Layout Grid:
        - Mobile (< 768px): 1-column vertical stack, side-by-side pill buttons, scaled badges
        - iPad / Tablet (768px - 1023px, md:): Dedicated 2-column layout tailored for iPad proportions
        - Desktop (>= 1024px, lg: & xl:): Full 2-column layout with generous scale and spacing
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-center gap-8 md:gap-6 lg:gap-8 xl:gap-12">
        
        {/* KOLOM KIRI: Typography & CTA Buttons */}
        <div className="relative z-10 flex flex-col justify-center text-left md:col-span-1 lg:col-span-5 xl:col-span-5">
          {/* Ambient Blur.webp langsung di belakang text sesuai gambar referensi */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-14 xs:-left-20 sm:-left-28 md:-left-16 lg:-left-24 xl:-left-28 -top-16 xs:-top-20 sm:-top-24 md:-top-16 lg:-top-20 xl:-top-24 w-[340px] xs:w-[420px] sm:w-[500px] md:w-[450px] lg:w-[540px] xl:w-[620px] -z-10 select-none mix-blend-multiply opacity-90 [mask-image:radial-gradient(ellipse_at_30%_38%,black_35%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_30%_38%,black_35%,transparent_75%)]"
          >
            <Image
              src="/images/hero/Blur.webp"
              alt=""
              width={761}
              height={832}
              priority
              className="w-full h-auto object-contain pointer-events-none"
            />
          </div>

          {/* Headline Sesuai Desain (Ukuran proporsional, rapi 4 baris, responsif mobile & iPad) */}
          <h1 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-[25px] xs:text-[28px] sm:text-[33px] md:text-[32px] lg:text-[38px] xl:text-[44px] font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.12]">
            Punya Website<br />
            Profesional Kini Lebih<br />
            Mudah dan Lebih<br />
            Cepat
          </h1>

          {/* Subjudul Sesuai Desain */}
          <p className="mt-3.5 sm:mt-4 font-[family-name:var(--font-plus-jakarta),sans-serif] text-xs xs:text-sm sm:text-[15px] lg:text-[16px] leading-relaxed text-slate-600 max-w-[430px] font-normal">
            Pilih desain siap pakai, sesuaikan dengan bisnis Anda, dan mulai menjangkau lebih banyak pelanggan tanpa proses yang rumit.
          </p>

          {/* 
            Tombol CTA: Hubungi Kami & Cari Design
            Di mobile, tablet, maupun desktop, tombol selalu berbentuk pill rapi dan berdampingan (side-by-side).
          */}
          <div className="mt-5 sm:mt-7 flex flex-row flex-nowrap sm:flex-wrap items-center justify-start gap-2.5 xs:gap-3.5 sm:gap-4">
            {/* Tombol WhatsApp Hijau Pill */}
            <a
              href="https://wa.me/628217601455?text=Halo%20BidTech,%20saya%20ingin%20konsultasi%20pembuatan%20website%20dan%20aplikasi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 xs:gap-2.5 rounded-full bg-[#5bb82e] hover:bg-[#4ea625] px-4.5 xs:px-5.5 sm:px-6 md:px-5 lg:px-7 py-2.5 xs:py-3 sm:py-3.5 text-xs xs:text-sm sm:text-base font-bold text-white shadow-[0_8px_20px_rgba(91,184,46,0.32)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <svg className="size-4 xs:size-5 fill-white shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.394-10.416c-5.523 0-10 4.477-10 10 0 1.766.458 3.424 1.258 4.872l-1.336 4.887 5.011-1.314c1.401.764 3.003 1.198 4.707 1.198 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10z" />
              </svg>
              <span>Hubungi Kami</span>
            </a>

            {/* Tombol Putih Cari Design Pill */}
            <Link
              href="/template-website"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white hover:bg-slate-50 px-4.5 xs:px-5.5 sm:px-6 md:px-5 lg:px-7 py-2.5 xs:py-3 sm:py-3.5 text-xs xs:text-sm sm:text-base font-bold text-slate-900 shadow-[0_4px_16px_rgba(0,0,0,0.07)] border border-slate-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Cari Design</span>
            </Link>
          </div>
        </div>

        {/* KOLOM KANAN: Model Showcase (Slider Terpisah Model 4 dan Model 5) */}
        <div className="relative mx-auto flex flex-col w-full items-center justify-center md:col-span-1 lg:col-span-7 xl:col-span-7 mt-4 md:mt-0">
          {/* Green Organic Blob dari blob-1.webp di belakang Model */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative h-[340px] w-[340px] xs:h-[400px] xs:w-[400px] sm:h-[480px] sm:w-[480px] md:h-[450px] md:w-[450px] lg:h-[530px] lg:w-[530px] xl:h-[590px] xl:w-[590px]">
              <Image
                src="/images/hero/blob-1.webp"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Ambient soft glow */}
            <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.35)_0%,rgba(187,247,208,0.2)_50%,transparent_72%)] filter blur-2xl" />
          </div>

          {/* Model Container with proportional heights for Mobile, iPad, and Desktop */}
          <div className="relative h-[380px] xs:h-[420px] sm:h-[480px] md:h-[460px] lg:h-[530px] xl:h-[580px] w-full max-w-[420px] xs:max-w-[460px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[580px] xl:max-w-[620px] overflow-hidden">
            
            {/* ========================================================= */}
            {/* SLIDE 1: MODEL-4 (Wanita memegang laptop dengan semangat) */}
            {/* ========================================================= */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                activeSlide === 0
                  ? "opacity-100 z-10 translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-0 z-0 -translate-x-6 scale-95 pointer-events-none"
              }`}
            >
              {/* Badge 1: Pelanggan Baru 236 ↑ 100% */}
              <div className="absolute left-0 sm:left-1 lg:-left-2 top-3 sm:top-5 lg:top-6 z-20 scale-[0.78] xs:scale-[0.88] sm:scale-100 md:scale-[0.85] lg:scale-100 origin-top-left rounded-2xl bg-white p-3 sm:p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08)] border border-slate-100/90 transition-transform duration-300 hover:scale-105">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Pelanggan Baru</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-extrabold text-xl sm:text-2xl text-slate-900">236</span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-emerald-600">
                    ↑ 100%
                  </span>
                </div>
              </div>

              {/* Badge 2: Menjangkau Lebih Banyak Pelanggan */}
              <div className="absolute right-0 sm:right-1 lg:right-2 top-2 sm:top-3 lg:top-4 z-20 scale-[0.78] xs:scale-[0.88] sm:scale-100 md:scale-[0.85] lg:scale-100 origin-top-right rounded-full bg-white px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-[0_10px_28px_rgba(0,0,0,0.08)] border border-slate-100/90 transition-transform duration-300 hover:scale-105">
                <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Menjangkau Lebih Banyak Pelanggan
                </span>
              </div>

              {/* Badge 3: SEO Perfect 100/100 Score */}
              <div className="absolute right-0 sm:right-0 md:-right-1 lg:-right-2 top-24 xs:top-28 sm:top-32 lg:top-36 z-20 scale-[0.78] xs:scale-[0.88] sm:scale-100 md:scale-[0.85] lg:scale-100 origin-top-right rounded-2xl bg-white p-2.5 sm:p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08)] border border-slate-100/90 flex items-center gap-2.5 sm:gap-3 transition-transform duration-300 hover:scale-105">
                <div className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                  <Gauge className="size-4 sm:size-5" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 leading-tight">SEO Perfect</div>
                  <div className="text-[11px] sm:text-xs md:text-sm font-bold text-[#5bb82e] leading-tight">100/100 Score</div>
                </div>
              </div>

              {/* Gambar Model 4 (Wanita memegang laptop) */}
              <div className="relative h-full w-full">
                <Image
                  src="/images/hero/model-4.webp"
                  alt="Pengusaha wanita sukses memegang laptop aplikasi profesional"
                  fill
                  className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]"
                  priority
                />
              </div>
            </div>

            {/* ========================================================= */}
            {/* SLIDE 2: MODEL-5 (Pria memegang smartphone dengan bangga) */}
            {/* ========================================================= */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                activeSlide === 1
                  ? "opacity-100 z-10 translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-0 z-0 translate-x-6 scale-95 pointer-events-none"
              }`}
            >
              {/* Badge 1: Pelanggan Baru 236 ↑ 100% */}
              <div className="absolute left-0 sm:left-1 lg:-left-4 top-4 sm:top-6 lg:top-8 z-20 scale-[0.78] xs:scale-[0.88] sm:scale-100 md:scale-[0.85] lg:scale-100 origin-top-left rounded-2xl bg-white p-3 sm:p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08)] border border-slate-100/90 transition-transform duration-300 hover:scale-105">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Pelanggan Baru</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-extrabold text-xl sm:text-2xl text-slate-900">236</span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-emerald-600">
                    ↑ 100%
                  </span>
                </div>
              </div>

              {/* Badge 2: Menjangkau Lebih Banyak Pelanggan (Di atas smartphone) */}
              <div className="absolute right-0 sm:right-1 lg:right-0 top-1 sm:top-2 lg:top-2 z-20 scale-[0.78] xs:scale-[0.88] sm:scale-100 md:scale-[0.85] lg:scale-100 origin-top-right rounded-full bg-white px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-[0_10px_28px_rgba(0,0,0,0.08)] border border-slate-100/90 transition-transform duration-300 hover:scale-105">
                <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Menjangkau Lebih Banyak Pelanggan
                </span>
              </div>

              {/* Badge 3: SEO Perfect 100/100 Score (Di bawah smartphone) */}
              <div className="absolute right-0 sm:right-0 md:-right-1 lg:-right-2 top-36 xs:top-40 sm:top-48 lg:top-52 z-20 scale-[0.78] xs:scale-[0.88] sm:scale-100 md:scale-[0.85] lg:scale-100 origin-top-right rounded-2xl bg-white p-2.5 sm:p-4 shadow-[0_12px_28px_rgba(0,0,0,0.08)] border border-slate-100/90 flex items-center gap-2.5 sm:gap-3 transition-transform duration-300 hover:scale-105">
                <div className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                  <Gauge className="size-4 sm:size-5" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-900 leading-tight">SEO Perfect</div>
                  <div className="text-[11px] sm:text-xs md:text-sm font-bold text-[#5bb82e] leading-tight">100/100 Score</div>
                </div>
              </div>

              {/* Gambar Model 5 (Pria memegang smartphone) */}
              <div className="relative h-full w-full">
                <Image
                  src="/images/hero/model-5.webp"
                  alt="Pengusaha pria sukses memegang smartphone website profesional"
                  fill
                  className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Kotak Pencarian Domain & Template di Bawah Hero Grid dengan Jarak Bersih */}
      <div className="mt-8 sm:mt-12 lg:mt-14 xl:mt-16 relative z-20">
        <HeroDomainSearch />
      </div>
    </div>
  );
}
