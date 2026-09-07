"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { courses, type Course } from "@/lib/data/courses";

type CoursesSectionProps = {
  onOpenConsult: () => void;
};

// Preview 3 kursus saja di homepage — katalog penuh + filter + search ada
// di halaman /kursus, supaya homepage tidak membengkak seiring katalog tumbuh.
const PREVIEW_COUNT = 3;

export function CoursesSection({ onOpenConsult }: CoursesSectionProps) {
  const preview = courses.slice(0, PREVIEW_COUNT);
  const reduce = useReducedMotion();

  return (
    <Section id="kursus" className="border-t border-line bg-background">
      <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-[26ch] text-2xl font-semibold leading-[1.1] text-foreground sm:text-display-lg">
          Kursus yang paling banyak diambil
        </h2>
        <Link
          href="/kursus"
          className="hidden items-center gap-1.5 text-sm font-bold text-brand hover:underline sm:inline-flex"
        >
          <span>Lihat semua kursus</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Desktop: list horizontal, satu baris per kursus */}
      <div className="hidden divide-y divide-line border-y border-line md:block">
        {preview.map((course, i) => (
          <motion.article
            key={course.slug}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group grid items-center gap-10 py-9 md:grid-cols-[280px_1fr_auto]"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-media">
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="280px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" />
              <span className="absolute bottom-3 left-3 font-display text-lg italic text-white drop-shadow-sm">
                {course.category}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-soft">
                <span>{course.level}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {course.duration}
                </span>
                <span>·</span>
                <span>{course.lessons}</span>
              </div>

              <h3 className="mt-2 text-[26px] font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
                {course.title}
              </h3>

              <p className="mt-2 max-w-[46ch] text-sm text-muted">{course.tag}</p>

              <p className="mt-3 flex items-center gap-1.5 text-xs">
                <span className="font-semibold text-foreground">{course.mentor}</span>
                <span className="text-muted-soft">· {course.mentorRole}</span>
              </p>
            </div>

            <button
              onClick={onOpenConsult}
              className="flex items-center gap-2 self-start justify-self-end rounded-pill border border-line px-4 py-2 text-xs font-bold text-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand"
            >
              <span>Lihat detail</span>
              <ArrowRight size={14} />
            </button>
          </motion.article>
        ))}
      </div>

      {/* Mobile/tablet: carousel slideable, kartu terakhir jadi CTA "lihat semua" */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:hidden">
        {preview.map((course) => (
          <CourseSlideCard key={course.slug} course={course} onOpenConsult={onOpenConsult} />
        ))}
        <ViewMoreSlide href="/kursus" label="Lihat semua kursus" />
      </div>
    </Section>
  );
}

function CourseSlideCard({ course, onOpenConsult }: { course: Course; onOpenConsult: () => void }) {
  return (
    <article className="w-[80vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-card border border-line bg-surface">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={course.image} alt={course.title} fill sizes="80vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" />
        <span className="absolute bottom-2.5 left-3 font-display text-base italic text-white">
          {course.category}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-soft">
          <span>{course.level}</span>
          <span>·</span>
          <span>{course.duration}</span>
        </div>
        <h3 className="mt-1.5 text-base font-bold leading-snug text-foreground">{course.title}</h3>
        <p className="mt-2 text-xs text-muted">
          <span className="font-semibold text-foreground">{course.mentor}</span>
        </p>
        <button
          onClick={onOpenConsult}
          className="mt-3 flex items-center gap-1.5 text-xs font-bold text-brand"
        >
          <span>Lihat detail</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </article>
  );
}

/**
 * Kartu terakhir carousel mobile: gambar preview item berikutnya dengan
 * overlay gradasi warna latar + tombol "Lihat lebih lanjut", dipakai
 * konsisten di Courses, Events (dan pola serupa untuk deret item lain).
 */
function ViewMoreSlide({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex w-[62vw] max-w-[220px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-card border border-line bg-gradient-to-br from-brand-soft to-surface p-6 text-center"
    >
      <div className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
        <ArrowUpRight size={18} />
      </div>
      <span className="text-sm font-bold text-foreground">{label}</span>
    </Link>
  );
}