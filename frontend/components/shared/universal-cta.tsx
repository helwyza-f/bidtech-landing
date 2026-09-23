"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

interface UniversalCtaProps {
  className?: string;
}

export function UniversalCta({ className = "" }: UniversalCtaProps) {
  return (
    <section
      aria-labelledby="universal-cta-title"
      className={`landing-panel relative mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-20 ${className}`}
      id="cta"
    >
      <Reveal y={24}>
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-[#cdeec3] bg-[radial-gradient(ellipse_at_top_right,rgba(163,230,53,0.3),transparent_60%),linear-gradient(135deg,#f0faee_0%,#fbfefb_45%,#edf8eb_100%)] p-6 sm:p-10 md:p-12 lg:p-14 shadow-[0_24px_70px_rgba(95,201,74,0.14)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2
                className="font-[family-name:var(--font-sora)] text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-950 leading-[1.18]"
                id="universal-cta-title"
              >
                Wujudkan Website &amp; <br />
                Aplikasi Impian Bersama <br />
                <span className="text-[#45a02e]">BidTech</span>
              </h2>

              <p className="max-w-xl text-xs sm:text-sm sm:text-base leading-relaxed text-slate-600">
                Konsultasikan kebutuhan digital bisnis Anda secara gratis. Dari pilihan template siap pakai hingga kustomisasi penuh, kami siap membantu bisnis Anda naik level.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {/* Primary Button: WhatsApp */}
                <a
                  href="https://wa.me/628217601455?text=Halo%20BidTech,%20saya%20ingin%20konsultasi%20pembuatan%20website%20dan%20aplikasi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#45a02e] hover:bg-[#3d8e29] text-white px-6 sm:px-7 py-3.5 sm:py-4 text-sm font-bold shadow-[0_12px_28px_rgba(69,160,46,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
                >
                  <svg className="size-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.394-10.416c-5.523 0-10 4.477-10 10 0 1.766.458 3.424 1.258 4.872l-1.336 4.887 5.011-1.314c1.401.764 3.003 1.198 4.707 1.198 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>Konsultasi via WhatsApp</span>
                  <ArrowRight className="size-4" />
                </a>

                {/* Secondary Button: Portofolio */}
                <Link
                  href="/template-website"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-6 sm:px-7 py-3.5 sm:py-4 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
                >
                  <span>Lihat Portofolio</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              {/* Bottom Checklist */}
              <div className="pt-6 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-[#45a02e] font-bold text-sm">✓</span>
                  <span>Respon Cepat &lt; 15 Menit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#45a02e] font-bold text-sm">✓</span>
                  <span>Konsultasi 100% Gratis &amp; Tanpa Komitmen</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <span className="text-[#45a02e] font-bold text-sm">✓</span>
                  <span>Garansi Maintenance</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Laptop Mockup + 2 Floating Badges) */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
              <div className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px]">
                {/* Floating Badge 1: Top-Left */}
                <div className="absolute -top-4 left-1 sm:-top-8 sm:-left-4 z-20 flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100/90 px-3 sm:px-4 py-1.5 sm:py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.09)] transition-transform duration-300 hover:scale-105 max-w-[92%] sm:max-w-none">
                  <div className="flex size-7 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f7e2] text-[#45a02e]">
                    <Zap className="size-3.5 sm:size-5 fill-[#45a02e] text-[#45a02e]" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                      <span className="size-2 rounded-full bg-[#45a02e] animate-pulse" />
                      <span>Live Project Status</span>
                    </div>
                    <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5">
                      Ready to Launch • Instant Support
                    </p>
                  </div>
                </div>

                {/* Main Laptop Mockup Image */}
                <div className="relative aspect-[4/3] w-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]">
                  <Image
                    src="/images/hero/image 239.webp"
                    alt="Laptop Analytics Dashboard BidTech"
                    fill
                    sizes="(min-width: 1024px) 500px, 90vw"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Floating Badge 2: Bottom-Right */}
                <div className="absolute -bottom-3 right-1 sm:-bottom-6 sm:-right-2 z-20 flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100/90 px-3 sm:px-4 py-1.5 sm:py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.09)] transition-transform duration-300 hover:scale-105 max-w-[92%] sm:max-w-none">
                  <div className="flex size-7 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f7e2] text-[#45a02e]">
                    <ShieldCheck className="size-3.5 sm:size-5 text-[#45a02e]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] sm:text-[13px] font-bold text-slate-900 leading-tight">
                      100+ Proyek Berhasil
                    </div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-amber-500 mt-0.5">
                      <span className="tracking-tighter">★★★★★</span>
                      <span className="font-bold text-slate-700 ml-0.5 text-[10px] sm:text-[11px]">5.0 Star</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
