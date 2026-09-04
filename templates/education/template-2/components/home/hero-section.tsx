"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Award, BookOpenCheck, Sparkles, Star } from "lucide-react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "motion/react";

type HeroSectionProps = {
  onOpenConsult: () => void;
  onOpenInterestTest: () => void;
};

export function HeroSection({ onOpenConsult, onOpenInterestTest }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      if (reduce) {
        // Kontrak reduced motion: langsung tampil, tanpa timeline atau parallax.
        gsap.set(
          [
            ".hero-stage",
            ".hero-eyebrow",
            ".hero-desc",
            ".hero-portrait",
            ".hero-cta > *",
            ".hero-float",
            ".hero-proof",
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
        return;
      }

      mm.add("(min-width: 768px)", () => {
        if (!headlineRef.current) return;
        const split = new SplitText(headlineRef.current, { type: "lines", linesClass: "split-line" });
        gsap.set(split.lines, { overflow: "hidden" });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-stage", { scale: 0.92, opacity: 0, duration: 0.9 })
          .from(split.lines, { yPercent: 115, duration: 0.95, stagger: 0.09 }, 0.15)
          .from([".hero-eyebrow", ".hero-desc"], { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.55)
          .from(".hero-portrait", { y: 60, opacity: 0, duration: 1.05 }, 0.7)
          .from(".hero-cta > *", { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.95)
          .from(".hero-proof", { y: 14, opacity: 0, duration: 0.5 }, 1.05)
          .from(
            ".hero-float",
            { y: 26, opacity: 0, scale: 0.94, duration: 0.6, stagger: 0.12, ease: "back.out(1.6)" },
            1.1
          );

        // Parallax scroll — kedalaman antara foto dan floating card
        gsap.to(".hero-portrait", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(".hero-float", {
          yPercent: 26,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.6 },
        });

        return () => split.revert();
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: fade-up blok tunggal, tanpa SplitText per-baris & tanpa parallax.
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-stage", { scale: 0.95, opacity: 0, duration: 0.7 })
          .from(
            [headlineRef.current, ".hero-eyebrow", ".hero-desc"],
            { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 },
            0.1
          )
          .from(".hero-portrait", { y: 30, opacity: 0, duration: 0.7 }, 0.35)
          .from(".hero-cta > *", { y: 14, opacity: 0, duration: 0.4, stagger: 0.06 }, 0.55)
          .from(".hero-proof", { y: 10, opacity: 0, duration: 0.4 }, 0.65)
          .from(".hero-float", { y: 16, opacity: 0, scale: 0.96, duration: 0.5, stagger: 0.1 }, 0.7);
      });
    }, sectionRef);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_78%_8%,#E9EFFE_0%,transparent_52%)] pt-36 pb-20 md:pt-44 md:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-140px] top-16 h-[500px] w-[500px] rounded-full bg-brand/10 blur-[120px]"
      />

      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Kolom kiri: copy & CTA */}
          <div className="lg:col-span-6">
            <div className="hero-eyebrow inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3.5 py-1 text-xs font-semibold text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span>Belajar untuk kerja nyata</span>
            </div>

            <h1
              ref={headlineRef}
              className="mt-5 text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-[54px] lg:text-[66px]"
            >
              Upgrade skill,{" "}
              <span className="block font-display italic font-normal text-brand sm:inline">
                tanpa hilang arah.
              </span>
            </h1>

            <p className="hero-desc mt-6 max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg">
              Kelas praktis, kurikulum berbasis industri, dan jalur belajar terarah dari
              pemula hingga menghasilkan portfolio nyata yang dinilai mentor.
            </p>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#program"
                className="inline-flex h-12 items-center gap-2 rounded-pill bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.22)] transition-colors hover:bg-brand-dark active:scale-95"
              >
                <span>Lihat jalur belajar</span>
                <ArrowUpRight size={16} />
              </a>

              <button
                onClick={onOpenInterestTest}
                className="inline-flex h-12 items-center gap-2.5 rounded-pill border border-line bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-brand/40 hover:text-brand"
              >
                <Sparkles size={16} className="text-brand" />
                <span>Tes minat 5 menit</span>
              </button>
            </div>

            <div className="hero-proof mt-6 flex items-center gap-4 border-t border-line pt-6 text-xs font-semibold text-muted">
              <div className="flex -space-x-2">
                <span className="inline-grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-blue-100 text-[10px] font-bold text-blue-700">
                  DA
                </span>
                <span className="inline-grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-indigo-100 text-[10px] font-bold text-indigo-700">
                  UI
                </span>
                <span className="inline-grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-purple-100 text-[10px] font-bold text-purple-700">
                  FS
                </span>
              </div>
              <span>12.400 learner aktif · 42 mentor praktisi · 4,9 rating kepuasan</span>
            </div>
          </div>

          {/* Kolom kanan: panggung visual asimetris */}
          <div className="relative flex justify-center lg:col-span-6 lg:justify-end">
            <div className="hero-stage relative flex aspect-square w-full max-w-[480px] items-center justify-center">
              <div className="absolute inset-0 m-auto h-[380px] w-[380px] rounded-full bg-brand-soft sm:h-[460px] sm:w-[460px]" />

              <div className="hero-portrait relative z-10 flex h-full w-full items-end justify-center">
                <div className="relative flex h-[390px] w-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-b from-brand/10 to-brand/5 p-6 shadow-inner backdrop-blur-sm sm:h-[450px] sm:w-[360px]">
                  <div className="flex items-start justify-between">
                    <span className="rounded-pill bg-white/90 px-3 py-1 text-xs font-bold text-brand shadow-sm">
                      Portfolio-first
                    </span>
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-brand">
                      <Award size={16} />
                    </div>
                  </div>

                  <div className="space-y-2.5 rounded-2xl border border-line bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-1.5 border-b border-line pb-1">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="ml-2 font-mono text-[10px] text-muted-soft">workspace.nivora.id</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">Capstone Review</span>
                        <span className="text-[11px] font-bold text-brand">98/100</span>
                      </div>
                      <p className="text-[11px] leading-tight text-muted">
                        Struktur query efisien dan visual dashboard memenuhi standar presentasi
                        stakeholder.
                      </p>
                      <div className="pt-1 text-[10px] font-medium text-muted-soft">
                        — Dinilai oleh Sr. Mentor
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card: progres belajar */}
              <div className="hero-float absolute -top-3 right-0 z-20 w-[190px] rounded-[20px] border border-white/80 bg-white/90 p-4 shadow-float backdrop-blur-xl sm:-right-4">
                <div className="flex items-center justify-between">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-soft text-brand">
                    <BookOpenCheck size={18} />
                  </div>
                  <span className="rounded-full bg-signal/10 px-2 py-0.5 text-[10px] font-bold text-signal">
                    Aktif
                  </span>
                </div>
                <p className="mt-2.5 text-[11px] font-semibold text-muted-soft">Sedang dipelajari</p>
                <strong className="mt-0.5 block truncate text-xs font-bold text-foreground">
                  Analisis Data SQL
                </strong>
                <div className="mt-2 h-1.5 overflow-hidden rounded-pill bg-line">
                  <div className="h-full w-[78%] rounded-pill bg-brand" />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-muted">
                  <span>Progres</span>
                  <span className="font-bold text-brand">78%</span>
                </div>
              </div>

              {/* Floating card: rating */}
              <div className="hero-float absolute -bottom-4 left-0 z-20 w-[170px] rounded-[20px] border border-white/80 bg-white/90 p-4 shadow-float backdrop-blur-xl sm:-left-6">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                  <span className="text-lg font-extrabold text-foreground">4,9</span>
                  <span className="text-xs text-muted-soft">/ 5.0</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-foreground">Rating siswa</p>
                <p className="mt-0.5 text-[11px] leading-tight text-muted">
                  Berdasarkan 1.240+ ulasan terverifikasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}