"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { mentors } from "@/lib/data/mentors";

// Kartu portrait besar, fokus ke wajah mentor.
function MentorCard({ mentor, className = "" }: { mentor: (typeof mentors)[number]; className?: string }) {
  return (
    <Link
      href={`/mentor/${mentor.slug}`}
      className={`group relative block overflow-hidden rounded-panel bg-ink ${className}`}
    >
      <Image
        src={mentor.photo}
        alt={mentor.name}
        fill
        sizes="330px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
      <span className="absolute left-4 top-4 rounded-pill bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
        {mentor.track}
      </span>
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
        <p className="mt-0.5 text-xs font-medium text-white/75">{mentor.role}</p>
        <p className="text-xs text-white/55">{mentor.company}</p>
      </div>
    </Link>
  );
}

export function MentorsSection() {
  return (
    <section id="mentor" className="scroll-mt-24 overflow-hidden border-t border-line bg-surface py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="mx-auto mb-8 flex w-full max-w-shell flex-col gap-4 px-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <h2 className="max-w-[26ch] text-2xl font-semibold leading-[1.1] text-foreground sm:text-display-lg">
          Belajar dari mereka yang berkarya di industri
        </h2>
        <Link
          href="/mentor"
          className="hidden items-center gap-1.5 text-sm font-bold text-brand hover:underline sm:inline-flex"
        >
          <span>Lihat semua mentor</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Desktop/tablet: marquee dekoratif (loop tak berujung) */}
      <div className="hidden sm:block">
        <Marquee ariaLabel="Mentor praktisi Nivora Academy" speed="slow">
          <div className="flex items-center gap-5">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.slug} mentor={mentor} className="h-[380px] w-[300px] shrink-0 lg:h-[420px] lg:w-[330px]" />
            ))}
          </div>
          <div aria-hidden="true" className="flex items-center gap-5">
            {mentors.map((mentor) => (
              <MentorCard key={`${mentor.slug}-dup`} mentor={mentor} className="h-[380px] w-[300px] shrink-0 lg:h-[420px] lg:w-[330px]" />
            ))}
          </div>
        </Marquee>
      </div>

      {/* Mobile: carousel swipeable — menampilkan SEMUA mentor satu kali
          (bukan marquee berulang), karena di layar kecil pengguna tidak
          bisa "menunggu" konten lain lewat, mereka perlu bisa menjangkau
          semuanya lewat swipe. */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:hidden">
        {mentors.map((mentor) => (
          <MentorCard
            key={mentor.slug}
            mentor={mentor}
            className="h-[62vh] max-h-[420px] w-[76vw] max-w-[290px] shrink-0 snap-start"
          />
        ))}
        <Link
          href="/mentor"
          className="flex h-[62vh] max-h-[420px] w-[56vw] max-w-[220px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-panel border border-line bg-gradient-to-br from-brand-soft to-surface p-6 text-center"
        >
          <div className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
            <ArrowUpRight size={18} />
          </div>
          <span className="text-sm font-bold text-foreground">Lihat semua mentor</span>
        </Link>
      </div>
    </section>
  );
}