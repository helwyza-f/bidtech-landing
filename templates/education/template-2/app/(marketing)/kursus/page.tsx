import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { courses } from "@/lib/data/courses";

export const metadata: Metadata = {
  title: "Katalog Kursus",
  description: "Katalog kursus praktis Nivora Academy di jalur Web, Design, Data, dan Excel.",
};

export default function KursusPage() {
  return (
    <main className="mx-auto w-full max-w-shell px-4 py-32 sm:px-6">
      <h1 className="text-display-lg font-semibold text-foreground">Katalog kursus</h1>
      <p className="mt-4 max-w-prose text-body-lg text-muted">
        Kursus mandiri yang bisa diakses selamanya, disusun langsung oleh mentor praktisi industri.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <article key={course.slug} className="rounded-card border border-line bg-surface p-5">
            <div className="flex items-center gap-2 text-[11px] font-medium text-muted-soft">
              <Clock size={12} />
              <span>{course.duration}</span>
              <span>·</span>
              <span>{course.lessons}</span>
            </div>
            <h2 className="mt-2 text-base font-bold text-foreground">{course.title}</h2>
            <p className="mt-2 text-xs text-muted">
              {course.mentor} · {course.mentorRole}
            </p>
          </article>
        ))}
      </div>

      <Link
        href="/#kursus"
        className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <span>Lihat & filter kursus di halaman utama</span>
        <ArrowUpRight size={16} />
      </Link>
    </main>
  );
}