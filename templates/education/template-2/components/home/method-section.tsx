"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { methodSteps } from "@/lib/data/method";

export function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reduce) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!visualRef.current || !stepsRef.current) return;

        const pinTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${stepsRef.current!.offsetHeight - visualRef.current!.offsetHeight}`,
          pin: visualRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        });

        const stepEls = gsap.utils.toArray<HTMLElement>(".method-step");
        const stepTriggers = stepEls.map((step, i) =>
          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: ({ isActive }) => {
              if (isActive) setActive(i);
            },
          })
        );

        return () => {
          pinTrigger.kill();
          stepTriggers.forEach((t) => t.kill());
        };
      });

      // Reveal fade-up untuk mobile (tanpa pin)
      mm.add("(max-width: 1023px)", () => {
        gsap.set(".method-step", { y: 32, opacity: 0 });
        ScrollTrigger.batch(".method-step", {
          start: "top 85%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  const activeStep = methodSteps[active];
  const ActiveIcon = activeStep.icon;

  return (
    <section id="metode" ref={sectionRef} className="border-t border-line bg-surface py-20 scroll-mt-24 md:py-32">
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Kolom kiri: visual sticky (desktop) */}
          <div ref={visualRef} className="lg:col-span-5">
            <h2 className="text-display-lg font-semibold leading-tight text-foreground">
              Cara belajar yang menjaga fokusmu hingga tuntas
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Kami membuang materi bertele-tele dan menyusun setiap tahapan berdasarkan siklus
              pengerjaan proyek riil di dunia profesional.
            </p>

            <div className="mt-8 rounded-panel border border-line bg-background p-6 shadow-soft">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
                    <ActiveIcon size={16} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand">
                    Tahap {activeStep.no}
                  </span>
                </div>
                <span className="text-xs font-semibold text-muted-soft">Nivora Learning OS</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.no}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 space-y-3"
                >
                  <h3 className="text-lg font-bold text-foreground">{activeStep.title}</h3>
                  <p className="text-xs leading-relaxed text-muted">{activeStep.detail}</p>
                  <div className="flex items-start gap-2.5 rounded-xl border border-line bg-surface p-3.5 text-xs font-medium text-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand" />
                    <span>Standar industri diverifikasi bersama hiring partner regional.</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Kolom kanan: 4 langkah, satu-satunya tempat penomoran dibenarkan */}
          <div ref={stepsRef} className="space-y-6 lg:col-span-7">
            {methodSteps.map((step, idx) => {
              const isActive = active === idx;
              return (
                <div
                  key={step.no}
                  onClick={() => setActive(idx)}
                  className={`method-step cursor-pointer rounded-card border p-6 transition-all duration-300 sm:p-8 ${
                    isActive
                      ? "border-brand bg-surface shadow-[0_12px_40px_rgba(52,91,214,.08)] ring-1 ring-brand"
                      : "border-line bg-background hover:border-brand/40 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className={`text-3xl font-extrabold tabular-nums tracking-tight transition-colors sm:text-4xl ${
                        isActive ? "text-signal" : "text-line"
                      }`}
                    >
                      {step.no}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground sm:text-2xl">{step.title}</h3>
                      <p className="max-w-[55ch] text-sm leading-relaxed text-muted sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
