"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Minus, Check } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";

interface StepItem {
  number: number;
  title: string;
  desc: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
}

const STEPS: StepItem[] = [
  {
    number: 1,
    title: "Pilih Template / Domain",
    desc: "Tentukan desain tema favorit dan nama domain identitas bisnis Anda",
    imageSrc: "/icon/svg-1.webp",
    imageAlt: "Pilih Template dan Domain Website",
    width: 244,
    height: 134,
  },
  {
    number: 2,
    title: "Lengkapi Data",
    desc: "Isi informasi profil usaha, kontak, serta materi awal website",
    imageSrc: "/icon/svg-2.webp",
    imageAlt: "Lengkapi Data Usaha dan Kontak",
    width: 140,
    height: 146,
  },
  {
    number: 3,
    title: "Pembayaran",
    desc: "Pilih metode bayar otomatis dengan verifikasi instan terjamin",
    imageSrc: "/icon/svg-3.webp",
    imageAlt: "Pembayaran Otomatis QRIS dan VA",
    width: 216,
    height: 136,
  },
  {
    number: 4,
    title: "Tim Menghubungi",
    desc: "Konsultan teknis kami segera berkoordinasi via WhatsApp resmi",
    imageSrc: "/icon/svg-4.webp",
    imageAlt: "Tim Konsultan BidTech Menghubungi",
    width: 176,
    height: 112,
  },
  {
    number: 5,
    title: "Website dikerjakan",
    desc: "Pengembangan kilat, integrasi konten, dan pengujian performa SEO",
    imageSrc: "/icon/svg-5.webp",
    imageAlt: "Website Dikerjakan dan Integrasi SEO",
    width: 192,
    height: 128,
  },
  {
    number: 6,
    title: "Website selesai",
    desc: "Serah terima akun cPanel / CMS lengkap dengan garansi pendampingan",
    imageSrc: "/icon/svg-6.webp",
    imageAlt: "Website Selesai dan Serah Terima Akun",
    width: 192,
    height: 154,
  },
];

const STATS = [
  { value: "1-3 Hari", label: "Estimasi Rata-rata Jadi" },
  { value: "100%", label: "Garansi Hak Milik" },
  { value: "Free SSL", label: "Keamanan Enkripsi Web" },
  { value: "Support 24/7", label: "Bantuan Teknis Siap" },
];

const FAQS = [
  {
    id: 1,
    question: "Berapa lama sebenarnya website saya akan aktif setelah pembayaran?",
    answer:
      "Website Anda siap digunakan maksimal dalam 2x24 jam kerja setelah pembayaran diverifikasi dan data bisnis Anda dilengkapi bersama konsultan kami.",
  },
  {
    id: 2,
    question: "Apakah saya mendapatkan nama domain dan hosting resmi?",
    answer:
      "Ya, Anda mendapatkan kepemilikan nama domain resmi (.com / .id / .co.id sesuai paket) dan cloud hosting performa tinggi dengan SSL gratis, yang sepenuhnya terdaftar atas nama bisnis Anda.",
  },
  {
    id: 3,
    question: "Apakah saya bisa meminta bantuan revisi jika ada tulisan atau gambar yang ingin diganti?",
    answer:
      "Tentu saja! Kami memberikan garansi revisi minor gratis untuk penyesuaian teks, gambar, tata letak, dan konten bisnis Anda hingga Anda puas sebelum website online.",
  },
  {
    id: 4,
    question: "Bagaimana jika saya belum memiliki materi atau logo bisnis?",
    answer:
      "Jangan khawatir! Tim kreatif BidTech siap membantu membuatkan copywriting materi awal dan menyediakan placeholder/panduan logo standar secara cuma-cuma selama proses onboarding.",
  },
];



function getElementCenter(el: HTMLElement, container: HTMLElement) {
  let cur: HTMLElement | null = el;
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  while (cur && cur !== container) {
    x += cur.offsetLeft;
    y += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function WorkflowProcessGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathD, setPathD] = useState<string>("");

  const updatePath = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Responsive: iPad (md: 768px+) & Desktop get the continuous S-curve line
    if (container.offsetWidth < 768) {
      setPathD("");
      return;
    }

    const b0 = badgeRefs.current[0];
    const b1 = badgeRefs.current[1];
    const b2 = badgeRefs.current[2];
    const b3 = badgeRefs.current[3];
    const b4 = badgeRefs.current[4];
    const b5 = badgeRefs.current[5];

    if (!b0 || !b1 || !b2 || !b3 || !b4 || !b5) return;

    // Get badge centers relative to container
    const c0 = getElementCenter(b0, container);
    const c1 = getElementCenter(b1, container);
    const c2 = getElementCenter(b2, container);
    const c3 = getElementCenter(b3, container);
    const c4 = getElementCenter(b4, container);
    const c5 = getElementCenter(b5, container);

    const yRow1 = c0.y;
    const yRow2 = c3.y;

    // Calculate vertical corridor midpoint between Row 1 and Row 2
    let yMid = (yRow1 + yRow2) / 2;
    if (row1Ref.current && row2Ref.current) {
      const r1Bottom = row1Ref.current.offsetTop + row1Ref.current.offsetHeight;
      const r2Top = row2Ref.current.offsetTop;
      if (r2Top > r1Bottom) {
        yMid = (r1Bottom + r2Top) / 2;
      }
    }

    // Determine horizontal turn points
    const card2 = cardRefs.current[2];
    const card3 = cardRefs.current[3];

    let card2Right = c2.x + 130;
    if (card2) {
      const cardCenter = getElementCenter(card2, container);
      card2Right = cardCenter.x + card2.offsetWidth / 2;
    }

    let card3Left = c3.x - 130;
    if (card3) {
      const cardCenter = getElementCenter(card3, container);
      card3Left = cardCenter.x - card3.offsetWidth / 2;
    }

    // Right turn point (just outside Card 3, ensuring ample clearance within container)
    const xRightTurn = Math.min(container.offsetWidth - 40, Math.max(c2.x + 36, card2Right + 14));
    const availRight = Math.max(16, container.offsetWidth - 6 - xRightTurn);
    const bulgeRight = Math.min(48, Math.max(20, availRight / 0.8));

    // Left turn point (just outside Card 4, ensuring ample clearance within container)
    const xLeftTurn = Math.max(40, Math.min(c3.x - 36, card3Left - 14));
    const availLeft = Math.max(16, xLeftTurn - 6);
    const bulgeLeft = Math.min(48, Math.max(20, availLeft / 0.8));

    // Left start (extends slightly before badge 1, matching reference design)
    const xStart = Math.max(10, c0.x - 55);
    // Right end (extends slightly after badge 6, matching reference design)
    const xEnd = Math.min(container.offsetWidth - 10, c5.x + 55);

    // Continuous S-curve with smooth cubic Bézier turns
    const path = `
      M ${xStart.toFixed(1)} ${yRow1.toFixed(1)}
      L ${xRightTurn.toFixed(1)} ${yRow1.toFixed(1)}
      C ${(xRightTurn + bulgeRight).toFixed(1)} ${yRow1.toFixed(1)}, ${(xRightTurn + bulgeRight).toFixed(1)} ${yMid.toFixed(1)}, ${xRightTurn.toFixed(1)} ${yMid.toFixed(1)}
      L ${xLeftTurn.toFixed(1)} ${yMid.toFixed(1)}
      C ${(xLeftTurn - bulgeLeft).toFixed(1)} ${yMid.toFixed(1)}, ${(xLeftTurn - bulgeLeft).toFixed(1)} ${yRow2.toFixed(1)}, ${xLeftTurn.toFixed(1)} ${yRow2.toFixed(1)}
      L ${xEnd.toFixed(1)} ${yRow2.toFixed(1)}
    `.replace(/\s+/g, " ").trim();

    setPathD(path);
  }, []);

  useEffect(() => {
    updatePath();
    const frame = requestAnimationFrame(updatePath);
    const timer = setTimeout(updatePath, 200);

    window.addEventListener("resize", updatePath);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      observer = new ResizeObserver(() => {
        updatePath();
      });
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("resize", updatePath);
      if (observer) observer.disconnect();
    };
  }, [updatePath]);

  return (
    <div ref={containerRef} className="relative mt-16 sm:mt-20">
      {/* Continuous S-Curve Connector SVG for iPad & Desktop */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#48b02c"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="butt"
          />
        )}
      </svg>

      {/* Row 1: Steps 1, 2, 3 */}
      <div ref={row1Ref} className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {STEPS.slice(0, 3).map((step, idx) => (
            <div key={step.number} className="flex flex-col items-center">
              <Reveal y={20} delay={0.08 * idx} className="w-full">
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="step-card-item flex flex-col items-center text-center"
                >
                  {/* Graphic Container */}
                  <div className="w-full max-w-[280px] h-[155px] flex items-center justify-center transition-all duration-300 hover:scale-[1.04]">
                    <div className="relative flex items-center justify-center w-full h-full">
                      <Image
                        src={step.imageSrc}
                        alt={step.imageAlt}
                        width={step.width}
                        height={step.height}
                        className="max-h-[145px] w-auto max-w-[92%] object-contain select-none pointer-events-none mix-blend-multiply drop-shadow-xs"
                        priority={step.number <= 3}
                      />
                    </div>
                  </div>

                  {/* Step Number Badge */}
                  <div
                    ref={(el) => {
                      badgeRefs.current[idx] = el;
                    }}
                    className="mt-4 md:mt-5 mb-3 flex size-8 items-center justify-center rounded-full bg-[#3eb027] text-white font-bold text-sm shadow-[0_4px_14px_rgba(62,176,39,0.35)] ring-4 ring-[#edf8ea] relative z-10"
                  >
                    {step.number}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 px-2">
                    <h3 className="font-[family-name:var(--font-sora)] text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-[260px] mx-auto leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Mobile-only vertical connecting dashed line between cards in Row 1 */}
              {idx < 2 && (
                <div className="flex flex-col items-center my-3 md:hidden" aria-hidden="true">
                  <div className="h-8 w-0 border-l-2 border-dashed border-[#48b02c]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-only vertical connector between Step 3 and Step 4 */}
      <div className="flex flex-col items-center my-3 md:hidden" aria-hidden="true">
        <div className="h-8 w-0 border-l-2 border-dashed border-[#48b02c]" />
      </div>

      {/* Row 2: Steps 4, 5, 6 with generous top margin for the middle return connector line */}
      <div ref={row2Ref} className="relative mt-12 sm:mt-16 md:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {STEPS.slice(3, 6).map((step, idx) => (
            <div key={step.number} className="flex flex-col items-center">
              <Reveal y={20} delay={0.08 * (idx + 3)} className="w-full">
                <div
                  ref={(el) => {
                    cardRefs.current[idx + 3] = el;
                  }}
                  className="step-card-item flex flex-col items-center text-center"
                >
                  {/* Graphic Container */}
                  <div className="w-full max-w-[280px] h-[155px] flex items-center justify-center transition-all duration-300 hover:scale-[1.04]">
                    <div className="relative flex items-center justify-center w-full h-full">
                      <Image
                        src={step.imageSrc}
                        alt={step.imageAlt}
                        width={step.width}
                        height={step.height}
                        className="max-h-[145px] w-auto max-w-[92%] object-contain select-none pointer-events-none mix-blend-multiply drop-shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Step Number Badge */}
                  <div
                    ref={(el) => {
                      badgeRefs.current[idx + 3] = el;
                    }}
                    className="mt-4 md:mt-5 mb-3 flex size-8 items-center justify-center rounded-full bg-[#3eb027] text-white font-bold text-sm shadow-[0_4px_14px_rgba(62,176,39,0.35)] ring-4 ring-[#edf8ea] relative z-10"
                  >
                    {step.number}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 px-2">
                    <h3 className="font-[family-name:var(--font-sora)] text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-[260px] mx-auto leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Mobile-only vertical connecting dashed line between cards in Row 2 */}
              {idx < 2 && (
                <div className="flex flex-col items-center my-3 md:hidden" aria-hidden="true">
                  <div className="h-8 w-0 border-l-2 border-dashed border-[#48b02c]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TutorialPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-[#fcfdfc] text-slate-900 overflow-x-hidden">
      {/* 1. HERO & PROCESS SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Title */}
          <div className="mx-auto max-w-3xl text-center">
            <Reveal y={16}>
              <h1 className="font-[family-name:var(--font-sora)] text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 leading-tight">
                Wujudkan <span className="text-[#3eb027]">Website</span> Bisnis Anda
              </h1>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Alur pembuatan website yang paling mudah. Anda dapat mulai dari mencari domain dan memilih desain tampilan yang paling cocok untuk bisnis Anda.
              </p>
            </Reveal>
          </div>

          {/* 6 Step Cards Workflow Container with Connected S-Curve Pipeline */}
          <WorkflowProcessGrid />

            {/* 4 Metrics / Stats Banner */}
            <Reveal y={24} delay={0.4}>
              <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-100">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="font-[family-name:var(--font-sora)] text-xl sm:text-2xl font-extrabold text-[#3eb027]">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-slate-500">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
        </div>
      </section>

      {/* 2. FAQ POPULER SECTION */}
      <section className="py-12 sm:py-20 bg-white border-y border-slate-100/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <Reveal y={16}>
              <span className="inline-block rounded-full bg-[#edf8ea] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#3eb027] border border-[#d2f0cb]">
                PERTANYAAN POPULER
              </span>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <h2 className="mt-4 font-[family-name:var(--font-sora)] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
                Pertanyaan yang <span className="text-[#3eb027]">Sering Ditanyakan</span>
              </h2>
            </Reveal>
            <Reveal y={24} delay={0.2}>
              <p className="mt-3 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                Temukan jawaban cepat seputar pemesanan domain, pilihan template, hingga proses website Anda online.
              </p>
            </Reveal>
          </div>

          {/* FAQ Accordion List */}
          <div className="mt-10 sm:mt-12 space-y-3.5">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <Reveal key={faq.id} y={16}>
                  <div
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-[#a5e297] bg-[#fbfdfa] shadow-xs"
                        : "border-[#bde7b2] bg-white hover:border-[#a5e297]"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left focus:outline-hidden"
                      type="button"
                    >
                      <div className="flex items-center gap-3">
                        <span className="size-2 rounded-full bg-[#3eb027] shrink-0" />
                        <span className="font-[family-name:var(--font-sora)] text-xs sm:text-sm md:text-base font-bold text-slate-800">
                          {faq.question}
                        </span>
                      </div>
                      <div className="shrink-0 text-[#3eb027]">
                        {isOpen ? (
                          <Minus className="size-4 sm:size-5 stroke-[2.5]" />
                        ) : (
                          <ChevronDown className="size-4 sm:size-5 stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 sm:pl-9 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BOTTOM CTA BANNER WITH MODEL */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal y={24}>
            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#bde7b2] bg-gradient-to-r from-[#edf9eb] via-[#f7fcf6] to-[#edf9eb] p-6 sm:p-10 md:p-12 shadow-[0_16px_50px_rgba(62,176,39,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:min-h-[460px]">
                {/* Left Content Column */}
                <div className="z-10 space-y-6 lg:col-span-7">
                  <h2 className="font-[family-name:var(--font-sora)] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 leading-tight">
                    Wujudkan Website &amp; <br />
                    Aplikasi Impian Bersama <br />
                    <span className="text-[#3eb027]">BidTech</span>
                  </h2>

                  <p className="max-w-xl text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed">
                    Konsultasikan kebutuhan digital bisnis Anda secara gratis. Dari pilihan template siap pakai hingga kustomisasi penuh, kami siap membantu bisnis Anda naik level.
                  </p>

                  {/* CTA Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <a
                      href="https://wa.me/628217601455?text=Halo%20BidTech,%20saya%20ingin%20konsultasi%20pembuatan%20website%20dan%20aplikasi"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#3eb027] hover:bg-[#349620] text-white px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold shadow-[0_10px_24px_rgba(62,176,39,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    >
                      <svg className="size-4 fill-white shrink-0" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.394-10.416c-5.523 0-10 4.477-10 10 0 1.766.458 3.424 1.258 4.872l-1.336 4.887 5.011-1.314c1.401.764 3.003 1.198 4.707 1.198 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span>Konsultasi via WhatsApp</span>
                      <ArrowRight className="size-4" />
                    </a>

                    <Link
                      href="/portofolio"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    >
                      <span>Lihat Portofolio</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>

                  {/* Checklist Below Buttons */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-medium text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="size-3.5 text-[#3eb027] stroke-[3]" />
                      <span>Respon Cepat &lt; 15 Menit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-3.5 text-[#3eb027] stroke-[3]" />
                      <span>Konsultasi 100% Gratis &amp; Tanpa Komitmen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-3.5 text-[#3eb027] stroke-[3]" />
                      <span>Garansi Sla Kepuasan</span>
                    </div>
                  </div>
                </div>

                {/* Right Visual Column (Model holding phone) */}
                <div className="relative flex justify-center items-end lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[460px]">
                  <div className="relative h-full w-full max-w-[420px]">
                    <Image
                      src="/images/cta/model-8.webp"
                      alt="Konsultan BidTech menunjukkan aplikasi website di smartphone"
                      fill
                      sizes="(min-width: 1024px) 450px, (min-width: 640px) 400px, 90vw"
                      className="object-contain object-bottom drop-shadow-[0_16px_30px_rgba(0,0,0,0.12)]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
