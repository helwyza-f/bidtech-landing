"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { programs } from "@/lib/data/programs";

export function ProgramsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useScrollReveal(rootRef, {
    targets: ".path-card",
    y: 44,
    stagger: 0.09,
    duration: 0.7,
    disabled: !!reduce,
  });

  return (
    <Section id="program" ref={rootRef}>
      <SectionHeader
        title="Pilih jalur yang sesuai tujuan kariermu"
        description="Empat jalur spesialisasi. Setiap jalur dirancang berjenjang dari pemahaman fundamental sampai penyelesaian project akhir berstandar industri."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {programs.map((program) => {
          const Icon = program.icon;
          return (
            <motion.article
              key={program.slug}
              className="path-card group flex min-h-[340px] flex-col justify-between rounded-card border border-line bg-surface p-6 md:p-7"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110">
                  <Icon size={26} />
                </div>
                <div className="mt-8">
                  <span className="text-xs font-bold text-brand">{program.classCount} kelas terpadu</span>
                  <h3 className="mt-1 text-xl font-semibold text-foreground">{program.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{program.description}</p>
                </div>
              </div>
              <a
                href="#kursus"
                className="mt-6 flex items-center justify-between border-t border-line pt-6 text-sm font-semibold text-foreground group-hover:text-brand"
              >
                <span>Lihat kurikulum jalur</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}