"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Search, X } from "lucide-react";
import { courses, courseCategories, courseLevels, type CourseCategory, type CourseLevel } from "@/lib/data/courses";

/**
 * Katalog kursus penuh — filter kategori + level, plus search judul/mentor.
 * Client component terpisah dari page.tsx agar page.tsx tetap bisa
 * mengekspor metadata (server component).
 */
export function CourseCatalog() {
  const [activeCategory, setActiveCategory] = useState<CourseCategory | "Semua">("Semua");
  const [activeLevel, setActiveLevel] = useState<CourseLevel | "Semua">("Semua");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchCategory = activeCategory === "Semua" || course.category === activeCategory;
      const matchLevel = activeLevel === "Semua" || course.level === activeLevel;
      const matchQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.mentor.toLowerCase().includes(q) ||
        course.tag.toLowerCase().includes(q);
      return matchCategory && matchLevel && matchQuery;
    });
  }, [activeCategory, activeLevel, query]);

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-soft" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari kursus, mentor, atau topik..."
          className="h-11 w-full rounded-pill border border-line bg-surface pl-11 pr-10 text-sm text-foreground placeholder:text-muted-soft focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-soft hover:text-foreground"
            aria-label="Hapus pencarian"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter kategori */}
      <div className="mt-5 flex flex-wrap gap-2">
        {courseCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`h-9 rounded-pill px-4 text-xs font-semibold transition-all duration-200 ${
              activeCategory === cat.value
                ? "bg-brand text-white shadow-[0_10px_24px_rgba(52,91,214,.22)]"
                : "border border-line bg-surface text-muted hover:border-brand/30 hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter level */}
      <div className="mt-2.5 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveLevel("Semua")}
          className={`h-7 rounded-pill px-3 text-[11px] font-semibold transition-colors ${
            activeLevel === "Semua" ? "bg-ink text-white" : "bg-background text-muted-soft hover:text-foreground"
          }`}
        >
          Semua level
        </button>
        {courseLevels.map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`h-7 rounded-pill px-3 text-[11px] font-semibold transition-colors ${
              activeLevel === level ? "bg-ink text-white" : "bg-background text-muted-soft hover:text-foreground"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Hasil */}
      <p className="mt-6 text-xs font-semibold text-muted-soft">
        {filtered.length} kursus ditemukan
      </p>

      <motion.div layout className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((course, i) => (
            <motion.div
              key={course.slug}
              layout
              custom={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 8) * 0.04, duration: 0.4 } }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/kursus/${course.slug}`}
                className="group block overflow-hidden rounded-card border border-line bg-surface"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" />
                  <span className="absolute bottom-3 left-3 font-display text-lg italic text-white drop-shadow-sm">
                    {course.category}
                  </span>
                </div>

                <div className="p-4">
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
                  <h2 className="mt-1.5 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                    {course.title}
                  </h2>
                  <p className="mt-2 text-xs text-muted">
                    <span className="font-semibold text-foreground">{course.mentor}</span> · {course.mentorRole}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-card border border-dashed border-line py-16 text-center">
          <p className="text-sm font-semibold text-foreground">Tidak ada kursus yang cocok</p>
          <p className="mt-1 text-xs text-muted">Coba ubah kata kunci atau filter yang kamu pilih.</p>
        </div>
      )}
    </div>
  );
}