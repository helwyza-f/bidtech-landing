"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scholarship } from "@/lib/data/scholarship";
import { nivoraAssets } from "@/lib/data/asset-paths";

export function ScholarshipSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reduce) return;

    const ctx = gsap.context(() => {
      gsap.set(".scholarship-copy > *", { y: 16, opacity: 0 });
      gsap.set(".scholarship-bg", { opacity: 0 });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(".scholarship-bg", { opacity: 1, duration: 1, ease: "power2.out" });
          gsap.to(".scholarship-copy > *", {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.1,
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-brand-soft py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="scholarship-bg pointer-events-none absolute inset-0">
        <Image
          src={nivoraAssets.career.portfolioReview}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-soft/70 to-brand-soft" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="scholarship-copy max-w-[640px] space-y-4 sm:space-y-5">
          <h2 className="text-2xl font-semibold leading-[1.1] text-foreground sm:text-display-lg">
            {scholarship.title}
          </h2>

          <p className="max-w-[52ch] text-sm leading-relaxed text-muted sm:text-base">
            {scholarship.description}
          </p>

          <div className="space-y-2.5 pt-1 sm:space-y-3 sm:pt-2">
            {scholarship.checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <div className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check size={12} />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3 sm:gap-4 sm:pt-4">
            <Link
              href="/beasiswa"
              className="inline-flex h-11 items-center gap-2 rounded-pill bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.22)] transition hover:bg-brand-dark sm:h-12 sm:px-7"
            >
              <span>Lihat detail & skema beasiswa</span>
              <ArrowUpRight size={16} />
            </Link>
            <span className="text-xs font-semibold text-muted">
              {scholarship.deadlineNote} · {scholarship.quota.remaining}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}