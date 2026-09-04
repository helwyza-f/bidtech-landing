"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Section } from "@/components/ui/section";

type AboutSectionProps = {
  onOpenConsult: () => void;
};

export function AboutSection({ onOpenConsult }: AboutSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      if (!reduce) {
        gsap.set(".about-visual, .about-copy > *", { y: 32, opacity: 0 });
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(".about-visual", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
            gsap.to(".about-copy > *", { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" });
          },
        });

        // Parallax diterapkan ke wrapper DALAM .about-visual, bukan elemen yang
        // sama dengan reveal di atas — menghindari dua tween GSAP berebut
        // properti transform di node yang sama (aturan 7.1).
        mm.add("(min-width: 1024px)", () => {
          gsap.to(parallaxRef.current, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 1.4 },
          });
        });
      } else {
        gsap.set(".about-visual, .about-copy > *", { opacity: 1, y: 0 });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <Section id="tentang" ref={rootRef} className="border-t border-line bg-surface">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="about-visual relative overflow-hidden rounded-panel">
            <div
              ref={parallaxRef}
              className="relative flex aspect-[4/3] flex-col justify-between border border-line bg-background p-8"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-pill bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                  Sejak 2021
                </span>
                <span className="text-xs font-semibold text-muted-soft">Komunitas pembelajar</span>
              </div>

              <div className="space-y-4">
                <div className="h-1.5 w-16 rounded-pill bg-brand" />
                <blockquote className="text-lg font-medium leading-snug text-foreground sm:text-xl">
                  Pendidikan teknologi yang baik bukan yang paling banyak mengajarkan teori,
                  melainkan yang paling cepat mengantar siswa ke kemampuan problem solving nyata.
                </blockquote>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-line pt-4">
                <div>
                  <strong className="text-2xl font-bold text-brand">100%</strong>
                  <p className="mt-0.5 text-xs text-muted">Materi berbasis project nyata</p>
                </div>
                <div>
                  <strong className="text-2xl font-bold text-brand">6 kota</strong>
                  <p className="mt-0.5 text-xs text-muted">Komunitas chapter offline alumni</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-copy space-y-6 lg:col-span-6">
          <span className="block text-sm font-semibold text-brand">Filosofi kami</span>

          <h2 className="text-display-lg font-semibold leading-[1.08] text-foreground">
            Kami percaya belajar seharusnya punya arah.
          </h2>

          <p className="text-base leading-relaxed text-muted">
            Nivora Academy dimulai dari satu keresahan sederhana: begitu banyak orang punya
            tekad belajar teknologi, namun tersesat di tengah tutorial acak dan berhenti di
            tengah jalan tanpa menghasilkan karya.
          </p>

          <p className="text-base leading-relaxed text-muted">
            Kami mendesain setiap kurikulum bukan sebagai daftar video pasif, melainkan sebagai
            sistem navigasi yang mengarahkan setiap langkahmu — dari pemahaman logika, evaluasi
            kode, hingga siap menghadapi standar rekrutmen kerja nyata.
          </p>

          <button
            onClick={onOpenConsult}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
          >
            <span>Pelajari lebih dalam tentang visi edukasi kami</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Section>
  );
}
