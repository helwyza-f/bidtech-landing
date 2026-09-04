"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { courses, courseCategories, type CourseCategory } from "@/lib/data/courses";

type CoursesSectionProps = {
  onOpenConsult: () => void;
};

// Catatan motion: section ini SENGAJA tidak memakai useScrollReveal (GSAP).
// Kartu di sini dikelola AnimatePresence/layout milik Framer Motion untuk
// filter kategori, jadi reveal masuk pertama juga memakai Framer Motion
// (varian "hidden"/"visible" di bawah) — satu elemen, satu library,
// sesuai aturan 7.1 blueprint.
const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay: Math.min(i, 6) * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function CoursesSection({ onOpenConsult }: CoursesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CourseCategory | "Semua">("Semua");
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (activeCategory === "Semua" ? courses : courses.filter((c) => c.category === activeCategory)),
    [activeCategory]
  );

  return (
    <Section id="kursus" className="border-t border-line bg-background">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-display-lg font-semibold text-foreground">Kursus yang paling banyak diambil</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {courseCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`h-10 rounded-pill px-4 text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-brand text-white shadow-[0_10px_24px_rgba(52,91,214,.22)]"
                  : "border border-line bg-surface text-muted hover:border-brand/30 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((course, i) => (
            <motion.article
              key={course.slug}
              layout
              custom={i}
              initial={reduce ? false : "hidden"}
              animate="visible"
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              variants={cardVariants}
              className="course-card group flex flex-col justify-between rounded-card border border-line bg-surface p-4 transition-colors duration-300 hover:border-brand/40"
            >
              <div>
                <div
                  className={`relative flex aspect-video flex-col justify-between overflow-hidden rounded-media border border-line bg-gradient-to-br p-3 ${course.accent}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-pill bg-white/90 px-2 py-0.5 text-[10px] font-bold text-foreground">
                      {course.category}
                    </span>
                    <span className="rounded-pill bg-white/60 px-2 py-0.5 text-[10px] font-semibold text-foreground/70 backdrop-blur-sm">
                      {course.level}
                    </span>
                  </div>
                  <div className="rounded-lg border border-white/80 bg-white/90 p-2 backdrop-blur-sm">
                    <p className="truncate font-mono text-[10px] text-muted">{course.tag}</p>
                  </div>
                </div>

                <div className="mt-4 px-1">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-muted-soft">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.duration}
                    </span>
                    <span>·</span>
                    <span>{course.lessons}</span>
                  </div>

                  <h3 className="mt-1.5 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                    {course.title}
                  </h3>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                    <span className="font-semibold text-foreground">{course.mentor}</span>
                    <span>·</span>
                    <span>{course.mentorRole}</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line px-1 pt-3">
                <span className="text-xs font-semibold text-brand">Akses selamanya</span>
                <button
                  onClick={onOpenConsult}
                  className="flex items-center gap-1 text-xs font-bold text-foreground group-hover:text-brand"
                >
                  <span>Lihat detail</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}