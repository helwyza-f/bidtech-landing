import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { bootcampStages, bootcampMeta, bootcampTracks, bootcampPricing, bootcampFaqs } from "@/lib/data/bootcamp";
import { whatsappLink } from "@/lib/data/site";
import { FaqAccordion } from "@/components/faq-accordion";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bootcamp 12 Minggu",
  description: bootcampMeta.heading,
  path: "/bootcamp",
});

function formatRupiah(value: number) {
  return `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}

export default function BootcampPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pt-24 pb-14 text-white sm:pt-28 sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-brand/25 blur-[140px]"
        />
        <div className="relative z-10 mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-pill bg-signal/15 px-3 py-1 text-xs font-bold text-signal">
            <span className="h-2 w-2 rounded-full bg-signal" />
            <span>{bootcampMeta.batchLabel}</span>
          </div>

          <h1 className="max-w-[24ch] text-2xl font-semibold leading-[1.1] text-white sm:text-display-lg">
            {bootcampMeta.heading}
          </h1>

          <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/70 sm:text-base">
            Program akselerasi ber-batch dengan kurikulum terpadu, mentoring langsung dari
            praktisi industri, dan dukungan karier intensif sampai kamu siap kerja.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink("Halo Nivora, saya mau daftar Bootcamp Batch 07")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-pill bg-white px-7 text-sm font-bold text-ink shadow-lg transition hover:bg-white/90"
            >
              <span>Daftar Bootcamp Batch 07</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href={whatsappLink("Halo Nivora, saya mau tanya silabus bootcamp")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-pill border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle size={16} />
              <span>Tanya via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Jalur spesialisasi */}
      <section className="border-b border-line bg-background py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <h2 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">Pilih jalur spesialisasimu</h2>
          <p className="mb-8 max-w-prose text-sm text-muted sm:mb-10">
            Materi tahap inti (minggu 3-8) disesuaikan dengan jalur yang kamu pilih saat mendaftar.
          </p>

          <div className="grid gap-5 sm:grid-cols-3">
            {bootcampTracks.map((track) => (
              <Link
                key={track.programSlug}
                href="/#program"
                className="group rounded-card border border-line bg-surface p-6 transition hover:border-brand/40"
              >
                <h3 className="text-base font-bold text-foreground group-hover:text-brand">{track.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{track.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap 6 tahap */}
      <section className="border-b border-line bg-surface py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <h2 className="mb-8 text-xl font-bold text-foreground sm:mb-10 sm:text-2xl">Roadmap 12 minggu</h2>

          <div className="space-y-4">
            {bootcampStages.map((stage, i) => (
              <div
                key={stage.period}
                className="flex flex-col gap-4 rounded-card border border-line bg-background p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6"
              >
                <div className="flex items-center gap-3 sm:w-40 sm:shrink-0 sm:flex-col sm:items-start sm:gap-1">
                  <span className="text-2xl font-extrabold tabular-nums text-line sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-brand">{stage.period}</p>
                    <p className="text-[11px] text-muted-soft">{stage.badge}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground sm:text-lg">{stage.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{stage.focus}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {stage.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-pill border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Harga & yang termasuk */}
      <section className="border-b border-line bg-background py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Investasi untuk kariermu</h2>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-foreground sm:text-4xl">
                  {formatRupiah(bootcampPricing.price)}
                </span>
                <span className="text-base text-muted-soft line-through">
                  {formatRupiah(bootcampPricing.originalPrice)}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-soft">{bootcampPricing.installmentNote}</p>

              <a
                href={whatsappLink("Halo Nivora, saya mau daftar Bootcamp Batch 07")}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-pill bg-brand px-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.22)] transition hover:bg-brand-dark"
              >
                <span>Daftar sekarang</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-3">
                {bootcampPricing.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-card border border-line bg-surface p-4">
                    <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Check size={12} />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ khusus bootcamp */}
      <section className="bg-surface py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Pertanyaan seputar bootcamp</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Masih ada yang mengganjal? Tim konselor kami siap membantu.
              </p>

              <a
                href={whatsappLink("Halo Nivora, saya mau tanya soal bootcamp")}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
              >
                <span>Chat dengan tim konselor</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="lg:col-span-7">
              <FaqAccordion faqs={bootcampFaqs} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}