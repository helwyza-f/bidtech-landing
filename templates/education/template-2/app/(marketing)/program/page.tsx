import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Program & Jalur Belajar",
  description: "Empat jalur spesialisasi Nivora Academy: Web Programming, UI/UX & Product Design, Data & Analytics, dan Excel & Office Productivity.",
};

export default function ProgramPage() {
  return (
    <main className="mx-auto w-full max-w-shell px-4 py-32 sm:px-6">
      <h1 className="text-display-lg font-semibold text-foreground">Jalur belajar Nivora Academy</h1>
      <p className="mt-4 max-w-prose text-body-lg text-muted">
        Empat jalur spesialisasi, tiap jalur disusun berjenjang dari pemahaman fundamental
        sampai project akhir berstandar industri.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {programs.map((program) => {
          const Icon = program.icon;
          return (
            <article key={program.slug} className="rounded-card border border-line bg-surface p-7">
              <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-brand-soft text-brand">
                <Icon size={26} />
              </div>
              <span className="mt-6 block text-xs font-bold text-brand">{program.classCount} kelas terpadu</span>
              <h2 className="mt-1 text-xl font-semibold text-foreground">{program.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{program.description}</p>
            </article>
          );
        })}
      </div>

      <Link
        href="/#program"
        className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <span>Lihat detail di halaman utama</span>
        <ArrowUpRight size={16} />
      </Link>
    </main>
  );
}
