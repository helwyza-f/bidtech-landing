"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Section } from "@/components/ui/section";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { events, type NivoraEvent } from "@/lib/data/events";

const PREVIEW_COUNT = 3;

function EventCard({ event, variant }: { event: NivoraEvent; variant: "grid" | "slide" }) {
  return (
    <Link
      href={`/event/${event.slug}`}
      className={`${
        variant === "grid" ? "event-card" : "event-card-mobile"
      } group block overflow-hidden rounded-card border border-line bg-surface`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 640px) 33vw, 80vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
        <span
          className={`absolute right-3 top-3 rounded-pill px-2.5 py-0.5 text-[11px] font-bold ${
            event.price === 0 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          }`}
        >
          {event.status}
        </span>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-pill bg-white/90 px-2.5 py-1 font-mono text-[11px] font-bold text-brand backdrop-blur-sm">
          <Calendar size={12} />
          <span>{event.date}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
          {event.title}
        </h3>
        <p className="mt-2 text-xs text-muted">
          Bersama <span className="font-semibold text-foreground">{event.speaker}</span> · {event.type}
        </p>
      </div>
    </Link>
  );
}

export function EventsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const preview = events.slice(0, PREVIEW_COUNT);

  useScrollReveal(rootRef, {
    targets: ".event-card",
    y: 24,
    stagger: 0.08,
    disabled: !!reduce,
  });

  return (
    <Section ref={rootRef} className="border-t border-line bg-background">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-[26ch] text-2xl font-semibold leading-[1.1] text-foreground sm:text-display-lg">
          Webinar & workshop terdekat
        </h2>
        <Link
          href="/event"
          className="hidden items-center gap-1.5 text-sm font-bold text-brand hover:underline sm:inline-flex"
        >
          <span>Lihat semua event</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Desktop/tablet: grid 3 kolom */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-3">
        {preview.map((event) => (
          <EventCard key={event.slug} event={event} variant="grid" />
        ))}
      </div>

      {/* Mobile: carousel slideable, penutup jadi CTA "lihat semua" */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:hidden">
        {preview.map((event) => (
          <div key={event.slug} className="w-[76vw] max-w-[290px] shrink-0 snap-start">
            <EventCard event={event} variant="slide" />
          </div>
        ))}
        <Link
          href="/event"
          className="flex w-[62vw] max-w-[220px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-card border border-line bg-gradient-to-br from-brand-soft to-surface p-6 text-center"
        >
          <div className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
            <ArrowUpRight size={18} />
          </div>
          <span className="text-sm font-bold text-foreground">Lihat semua event</span>
        </Link>
      </div>
    </Section>
  );
}