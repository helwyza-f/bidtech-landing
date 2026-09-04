"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scholarship } from "@/lib/data/scholarship";

type ScholarshipSectionProps = {
  onOpenConsult: () => void;
};

export function ScholarshipSection({ onOpenConsult }: ScholarshipSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Reveal sederhana per blueprint 09: panel scale 0.97->1 + fade, checklist
  // stagger 0.08. Tanpa parallax — section ini fungsinya konversi, bukan pertunjukan.
  useEffect(() => {
    if (!rootRef.current || reduce) return;

    const ctx = gsap.context(() => {
      gsap.set(".scholarship-panel", { scale: 0.97, opacity: 0 });
      gsap.set(".scholarship-check", { y: 16, opacity: 0 });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(".scholarship-panel", { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" });
          gsap.to(".scholarship-check", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.15,
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <Section ref={rootRef} className="bg-background">
      <div className="scholarship-panel rounded-panel bg-brand-soft p-8 sm:p-12 md:p-16">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-pill bg-white px-3.5 py-1 text-xs font-bold text-brand">
              <span>{scholarship.eyebrow}</span>
            </div>

            <h2 className="text-display-lg font-semibold leading-[1.08] text-foreground">
              {scholarship.title}
            </h2>

            <p className="max-w-[54ch] text-base leading-relaxed text-muted">{scholarship.description}</p>

            <div className="space-y-3 pt-2">
              {scholarship.checklist.map((item) => (
                <div key={item} className="scholarship-check flex items-center gap-3 text-sm font-semibold text-foreground">
                  <div className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check size={12} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenConsult}
                className="inline-flex h-12 items-center gap-2 rounded-pill bg-brand px-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.22)] transition hover:bg-brand-dark"
              >
                <span>Ajukan pendaftaran beasiswa</span>
                <ArrowUpRight size={16} />
              </button>
              <span className="text-xs font-semibold text-muted">{scholarship.deadlineNote}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-4 rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">Status kuota</span>
                <span className="rounded-pill bg-signal/10 px-2.5 py-0.5 text-xs font-bold text-signal">
                  {scholarship.quota.remaining}
                </span>
              </div>

              <div className="space-y-3 text-xs text-muted">
                <div className="flex justify-between border-b border-line/50 py-1">
                  <span>Total kuota beasiswa:</span>
                  <strong className="text-foreground">{scholarship.quota.total}</strong>
                </div>
                <div className="flex justify-between border-b border-line/50 py-1">
                  <span>Skema beasiswa:</span>
                  <strong className="text-foreground">{scholarship.quota.scheme}</strong>
                </div>
                <div className="flex justify-between border-b border-line/50 py-1">
                  <span>Tahapan seleksi:</span>
                  <strong className="text-foreground">{scholarship.quota.selection}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span>Biaya pendaftaran:</span>
                  <strong className="text-brand">{scholarship.quota.registrationFee}</strong>
                </div>
              </div>

              <p className="pt-2 text-[11px] leading-normal text-muted-soft">{scholarship.quota.footnote}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
