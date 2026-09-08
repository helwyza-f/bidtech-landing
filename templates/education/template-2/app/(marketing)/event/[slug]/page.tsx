import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { events, getEventBySlug, getUpcomingEvents } from "@/lib/data/events";
import { mentors } from "@/lib/data/mentors";
import { whatsappLink } from "@/lib/data/site";
import { buildMetadata, eventJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return buildMetadata({
    title: event.title,
    description: event.description,
    path: `/event/${event.slug}`,
    image: event.image,
    type: "article",
  });
}

function formatPrice(price: number) {
  if (price === 0) return "Gratis";
  return `Rp${new Intl.NumberFormat("id-ID").format(price)}`;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  const speaker = mentors.find((m) => m.slug === event.speakerSlug);
  const upcoming = getUpcomingEvents(event.slug);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(event)) }}
      />
      <section className="border-b border-line bg-surface pt-24 pb-10 sm:pt-28 sm:pb-14">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted-soft">
            <Link href="/event" className="hover:text-brand">
              Event
            </Link>
            <span>/</span>
            <span className="text-muted">{event.type}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-soft">
                <span
                  className={`rounded-pill px-2.5 py-1 ${
                    event.price === 0 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {event.status}
                </span>
                <span>{event.type}</span>
              </div>

              <h1 className="mt-3 text-2xl font-semibold leading-[1.1] text-foreground sm:text-display-md">
                {event.title}
              </h1>

              <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-muted sm:text-base">
                {event.description}
              </p>

              {speaker && (
                <Link
                  href={`/mentor/${speaker.slug}`}
                  className="mt-6 flex w-fit items-center gap-3 rounded-2xl border border-line bg-background p-3 pr-5 transition hover:border-brand/30"
                >
                  <div className="relative h-11 w-11 overflow-hidden rounded-full bg-brand-soft">
                    <Image src={speaker.photo} alt={speaker.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-soft">Dibawakan oleh</p>
                    <p className="text-sm font-bold text-foreground">{speaker.name}</p>
                  </div>
                  <ArrowRight size={15} className="ml-2 text-muted-soft" />
                </Link>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-video w-full overflow-hidden rounded-panel bg-brand-soft">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-background py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">Susunan acara</h2>

              <div className="space-y-4">
                {event.agenda.map((item) => (
                  <div key={item.time} className="flex gap-4 rounded-card border border-line bg-surface p-4 sm:p-5">
                    <span className="w-16 shrink-0 font-mono text-sm font-bold text-brand">{item.time}</span>
                    <span className="text-sm text-foreground">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA sticky */}
            <div className="lg:col-span-5">
              <div className="rounded-panel border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-28">
                <h3 className="text-lg font-bold text-foreground">Daftar sekarang</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
                  Kuota terbatas, kami akan mengirim link akses ke WhatsApp/email kamu sebelum acara dimulai.
                </p>

                <a
                  href={whatsappLink(`Halo Nivora, saya mau daftar event "${event.title}"`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark"
                >
                  <span>Daftar via WhatsApp</span>
                  <ArrowUpRight size={16} />
                </a>

                <dl className="mt-6 space-y-3 border-t border-line pt-5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar size={14} className="mt-0.5 shrink-0 text-muted-soft" />
                    <div>
                      <dt className="text-muted-soft">Tanggal</dt>
                      <dd className="font-semibold text-foreground">{event.date}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock size={14} className="mt-0.5 shrink-0 text-muted-soft" />
                    <div>
                      <dt className="text-muted-soft">Waktu</dt>
                      <dd className="font-semibold text-foreground">{event.time}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-muted-soft" />
                    <div>
                      <dt className="text-muted-soft">Platform</dt>
                      <dd className="font-semibold text-foreground">{event.platform}</dd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-line pt-3">
                    <dt className="text-muted-soft">Biaya</dt>
                    <dd className="font-bold text-brand">{formatPrice(event.price)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
            <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">Event lainnya</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {upcoming.map((e) => (
                <Link
                  key={e.slug}
                  href={`/event/${e.slug}`}
                  className="group block overflow-hidden rounded-card border border-line bg-background"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={e.image}
                      alt={e.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-semibold text-muted-soft">{e.date}</p>
                    <h3 className="mt-1 text-sm font-bold text-foreground group-hover:text-brand">{e.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}