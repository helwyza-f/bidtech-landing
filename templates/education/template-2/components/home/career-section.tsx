"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Section } from "@/components/ui/section";
import { careerServices } from "@/lib/data/career";

export function CareerSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reduce) return;

    const ctx = gsap.context(() => {
      gsap.set(".career-card", { x: -24, opacity: 0 });
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(".career-card", { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <Section ref={rootRef} className="border-t border-line bg-background">
      <div className="mb-12 max-w-[32ch]">
        <h2 className="text-display-lg font-semibold text-foreground">
          Bukan sekadar materi, kami siapkan langkah kerjamu
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {careerServices.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.title}
              className="career-card rounded-card border border-line bg-surface p-6 transition-colors hover:border-brand/40"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon size={22} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{service.description}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
