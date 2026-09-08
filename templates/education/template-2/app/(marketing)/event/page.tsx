import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { events } from "@/lib/data/events";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Webinar & Workshop",
  description: "Jadwal webinar dan workshop gratis maupun berbayar dari Nivora Academy — belajar langsung dari mentor praktisi.",
  path: "/event",
});

export default function EventPage() {
  return (
    <main className="mx-auto w-full max-w-shell px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28">
      <h1 className="text-2xl font-semibold text-foreground sm:text-display-md">Webinar & workshop</h1>
      <p className="mt-2.5 max-w-prose text-sm text-muted sm:mt-3 sm:text-base">
        Belajar langsung dari mentor praktisi lewat sesi live — sebagian besar gratis, sebagian
        berupa workshop intensif berbayar.
      </p>

      <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link
            key={event.slug}
            href={`/event/${event.slug}`}
            className="group block overflow-hidden rounded-card border border-line bg-surface"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-soft">
                <Clock size={12} />
                <span>{event.time}</span>
                <span>·</span>
                <span>{event.type}</span>
              </div>
              <h2 className="mt-1.5 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                {event.title}
              </h2>
              <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                Bersama <span className="font-semibold text-foreground">{event.speaker}</span>
                <ArrowUpRight size={12} className="ml-auto text-muted-soft" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}