import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { mentors } from "@/lib/data/mentors";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mentor Praktisi",
  description: "Kenali mentor praktisi Nivora Academy — profesional aktif dari perusahaan teknologi terkemuka Indonesia.",
  path: "/mentor",
});

export default function MentorPage() {
  return (
    <main className="mx-auto w-full max-w-shell px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28">
      <h1 className="text-2xl font-semibold text-foreground sm:text-display-md">Mentor praktisi kami</h1>
      <p className="mt-2.5 max-w-prose text-sm text-muted sm:mt-3 sm:text-base">
        Belajar langsung dari profesional yang aktif berkarya di industri — bukan sekadar teori,
        tapi pengalaman nyata dari lapangan.
      </p>

      <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <Link
            key={mentor.slug}
            href={`/mentor/${mentor.slug}`}
            className="group block overflow-hidden rounded-panel border border-line bg-surface"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
              <Image
                src={mentor.photo}
                alt={mentor.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-pill bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                {mentor.track}
              </span>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-lg font-bold text-white">{mentor.name}</h2>
                <p className="mt-0.5 text-xs font-medium text-white/75">{mentor.role}</p>
                <p className="text-xs text-white/55">{mentor.company}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4">
              <span className="text-xs font-semibold text-muted-soft">{mentor.experienceYears}+ tahun pengalaman</span>
              <span className="flex items-center gap-1 text-xs font-bold text-brand">
                Lihat profil
                <ArrowUpRight size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}