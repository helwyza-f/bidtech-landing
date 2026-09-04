"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { mentors } from "@/lib/data/mentors";

export function MentorsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useScrollReveal(rootRef, {
    targets: ".mentor-card",
    y: 28,
    stagger: 0.05,
    disabled: !!reduce,
  });

  return (
    <Section id="mentor" ref={rootRef} className="border-t border-line bg-surface">
      <SectionHeader
        title="Belajar dari mereka yang berkarya di industri"
        description="Mentor kami aktif memimpin tim engineering, product design, dan data science di berbagai tech giant dan ekosistem digital Asia Tenggara."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {mentors.map((mentor) => (
          <motion.article
            key={mentor.name}
            className="mentor-card group overflow-hidden rounded-[20px] border border-line bg-background transition-colors duration-300 hover:border-brand/40 hover:bg-surface"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden text-white ${mentor.colorClass}`}>
              <span className="text-2xl font-bold tracking-tight opacity-90">{mentor.initials}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
              <span className="absolute bottom-2.5 left-2.5 rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                {mentor.track}
              </span>
            </div>

            <div className="p-3.5">
              <h3 className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-brand">
                {mentor.name}
              </h3>
              <p className="mt-0.5 truncate text-[11px] font-semibold text-muted">{mentor.role}</p>
              <p className="mt-1 truncate text-[10px] text-muted-soft">{mentor.company}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
