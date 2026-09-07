import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Program & Jalur Belajar",
  description:
    "Empat jalur spesialisasi Nivora Academy: Web Programming, UI/UX & Product Design, Data & Analytics, dan Excel & Office Productivity.",
};

export default function ProgramPage() {
  return (
    <main className="mx-auto w-full max-w-shell px-4 py-32 sm:px-6">
      <h1 className="text-display-lg font-semibold text-foreground">Jalur belajar Nivora Academy</h1>
      <p className="mt-4 max-w-prose text-body-lg text-muted">
        Empat jalur spesialisasi, tiap jalur disusun berjenjang dari pemahaman fundamental
        sampai project akhir berstandar industri.
      </p>

      <div className="mt-14 divide-y divide-line border-y border-line">
        {programs.map((program) => (
          <div key={program.slug} className="grid items-center gap-6 py-10 md:grid-cols-12 md:gap-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-brand-soft md:col-span-5">
              <Image
                src={program.image}
                alt={program.title}
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-pill bg-white/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur-sm">
                {program.classCount} kelas terpadu
              </span>
            </div>
            <div className="md:col-span-7">
              <h2 className="font-display text-3xl italic text-foreground sm:text-4xl">{program.title}</h2>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted sm:text-base">
                {program.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {program.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-pill border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
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
