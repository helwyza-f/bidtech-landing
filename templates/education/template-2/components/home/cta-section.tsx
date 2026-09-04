"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { Section } from "@/components/ui/section";
import { whatsappLink } from "@/lib/data/site";

type CtaSectionProps = {
  onOpenInterestTest: () => void;
};

export function CtaSection({ onOpenInterestTest }: CtaSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current) return;

    if (reduce) {
      gsap.set([panelRef.current, ".cta-copy"], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const split = new SplitText(headingRef.current, { type: "words", wordsClass: "split-word" });
      gsap.set(split.words, { yPercent: 100, opacity: 0 });
      gsap.set(panelRef.current, { y: 40, opacity: 0 });
      gsap.set(".cta-copy", { y: 16, opacity: 0 });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(panelRef.current, { y: 0, opacity: 1, duration: 0.8 })
            .to(split.words, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.03 }, 0.15)
            .to(".cta-copy", { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.4);
        },
      });

      return () => split.revert();
    }, rootRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <Section ref={rootRef} className="border-t border-line bg-background">
      <div
        ref={panelRef}
        className="relative overflow-hidden rounded-panel bg-brand p-8 text-center text-white shadow-2xl shadow-brand/20 sm:p-14 md:p-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[620px] space-y-6">
          <h2
            ref={headingRef}
            className="text-display-lg font-semibold leading-[1.06] tracking-[-0.04em] [&_.split-word]:inline-block [&_.split-word]:overflow-hidden"
          >
            Mulai dari satu langkah kecil hari ini
          </h2>

          <p className="cta-copy mx-auto max-w-[50ch] text-base leading-relaxed text-white/80 sm:text-lg">
            Ambil asesmen minat 5 menit tanpa biaya, atau diskusikan target kariermu langsung
            bersama konselor akademik kami.
          </p>

          <div className="cta-copy flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenInterestTest}
              className="flex h-12 items-center gap-2 rounded-pill bg-white px-7 text-sm font-bold text-brand shadow-md transition hover:bg-white/90 active:scale-95"
            >
              <span>Ikuti tes minat 5 menit</span>
              <ArrowRight size={16} />
            </button>
            <a
              href={whatsappLink("Halo Nivora, saya ingin tanya program")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-pill border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle size={16} />
              <span>Tanya konselor dulu</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
