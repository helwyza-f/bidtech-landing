"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Section } from "@/components/ui/section";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { events } from "@/lib/data/events";

type EventsSectionProps = {
  onOpenConsult: () => void;
};

export function EventsSection({ onOpenConsult }: EventsSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useScrollReveal(rootRef, {
    targets: ".event-row",
    y: 20,
    stagger: 0.06,
    disabled: !!reduce,
  });

  return (
    <Section ref={rootRef} className="border-t border-line bg-background">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-display-lg font-semibold text-foreground">Webinar & workshop terdekat</h2>
        <span className="text-xs font-semibold text-muted">Diperbarui tiap pekan · Terbuka untuk umum</span>
      </div>

      <div className="divide-y divide-line rounded-2xl border-y border-line bg-surface px-4 sm:px-8">
        {events.map((event) => (
          <div
            key={event.title}
            className="event-row group -mx-4 flex flex-col gap-4 px-4 py-5 transition hover:bg-background/80 sm:-mx-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex w-fit items-center gap-2 rounded-pill bg-brand-soft px-3 py-1 font-mono text-xs font-bold text-brand">
                <Calendar size={13} />
                <span>{event.date}</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-brand">
                  {event.title}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Bersama <span className="font-semibold text-foreground">{event.speaker}</span> · {event.type}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="rounded-pill bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                {event.status}
              </span>
              <button
                onClick={onOpenConsult}
                className="inline-flex items-center gap-1 text-xs font-bold text-foreground transition-colors group-hover:text-brand"
              >
                <span>Daftar</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
