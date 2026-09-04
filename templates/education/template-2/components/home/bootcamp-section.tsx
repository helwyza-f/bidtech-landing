"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { bootcampStages, bootcampMeta } from "@/lib/data/bootcamp";
import { whatsappLink } from "@/lib/data/site";

type BootcampSectionProps = {
  onOpenConsult: () => void;
};

export function BootcampSection({ onOpenConsult }: BootcampSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (reduce) {
      gsap.set([".bootcamp-heading", ".bootcamp-badge"], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const split = new SplitText(headingRef.current, { type: "words", wordsClass: "split-word" });
        gsap.set(split.words, { yPercent: 100, opacity: 0 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(split.words, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power3.out" });
            gsap.from(".bootcamp-badge", { y: 16, opacity: 0, duration: 0.6, delay: 0.1 });
          },
        });

        if (!trackRef.current) return;
        const distance = trackRef.current.scrollWidth - window.innerWidth + 64;

        const tween = gsap.to(trackRef.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".roadmap-progress", {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            containerAnimation: tween,
            trigger: trackRef.current,
            start: "left left",
            end: "right right",
            scrub: true,
          },
        });

        return () => split.revert();
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(".bootcamp-card-mobile", { opacity: 0, y: 24 });
        ScrollTrigger.batch(".bootcamp-card-mobile", {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }),
        });
        gsap.from(".bootcamp-heading", { y: 24, opacity: 0, duration: 0.6 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="bootcamp"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-24 text-white scroll-mt-12 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-brand/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="bootcamp-badge mb-3 inline-flex items-center gap-2 rounded-pill bg-signal/15 px-3 py-1 text-xs font-bold text-signal">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <span>{bootcampMeta.batchLabel}</span>
            </div>
            <h2
              ref={headingRef}
              className="bootcamp-heading max-w-[20ch] text-display-lg font-semibold leading-[1.06] text-white [&_.split-word]:inline-block [&_.split-word]:overflow-hidden"
            >
              {bootcampMeta.heading}
            </h2>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative mb-10 h-[2px] w-full bg-white/15">
            <div className="roadmap-progress absolute inset-0 origin-left scale-x-0 bg-signal" />
          </div>

          <div ref={trackRef} className="flex w-max gap-5">
            {bootcampStages.map((stage) => (
              <BootcampCard key={stage.period} stage={stage} variant="desktop" />
            ))}
          </div>
        </div>

        <div
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:hidden"
          data-pin="false"
        >
          {bootcampStages.map((stage) => (
            <div key={stage.period} className="w-[280px] shrink-0 snap-start">
              <BootcampCard stage={stage} variant="mobile" />
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-base font-bold text-white">{bootcampMeta.closingNote}</p>
            <p className="mt-0.5 text-xs text-white/60">{bootcampMeta.closingDetail}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenConsult}
              className="h-12 rounded-pill bg-white px-6 text-sm font-bold text-ink shadow-lg transition hover:bg-white/90"
            >
              Daftar Bootcamp Batch 07
            </button>
            <a
              href={whatsappLink("Halo Nivora, saya mau tanya silabus bootcamp")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-pill border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle size={16} />
              <span>Tanya via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BootcampCard({
  stage,
  variant,
}: {
  stage: (typeof bootcampStages)[number];
  variant: "desktop" | "mobile";
}) {
  return (
    <article
      className={`${
        variant === "desktop" ? "bootcamp-card" : "bootcamp-card-mobile"
      } w-[320px] shrink-0 rounded-card border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm`}
    >
      <div className="mb-3 flex items-center justify-between text-xs font-semibold">
        <span className="font-bold text-signal">{stage.period}</span>
        <span className="rounded-pill bg-white/10 px-2 py-0.5 text-[10px] text-white/70">{stage.badge}</span>
      </div>

      <h3 className="mb-2 text-xl font-bold text-white">{stage.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-white/70">{stage.focus}</p>

      <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
        {stage.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-pill border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}
