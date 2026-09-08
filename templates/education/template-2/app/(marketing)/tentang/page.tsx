import { ArrowUpRight } from "lucide-react";
import { aboutTimeline, aboutValues, aboutMission } from "@/lib/data/about";
import { stats } from "@/lib/data/stats";
import { formatID } from "@/lib/utils";
import { whatsappLink } from "@/lib/data/site";
import { TimelineTabs } from "@/components/timeline-tabs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tentang Nivora Academy",
  description: "Nivora Academy — akademi keterampilan digital yang percaya belajar seharusnya punya arah.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-line bg-surface pt-24 pb-10 sm:pt-28 sm:pb-14">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <span className="block text-sm font-semibold text-brand">Filosofi kami</span>
          <h1 className="mt-2 max-w-[22ch] text-2xl font-semibold leading-[1.1] text-foreground sm:text-display-lg">
            Kami percaya belajar seharusnya punya arah.
          </h1>
          <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted sm:text-base">
            Nivora Academy dimulai dari satu keresahan sederhana: begitu banyak orang punya
            tekad belajar teknologi, namun tersesat di tengah tutorial acak dan berhenti di
            tengah jalan tanpa menghasilkan karya. Kami mendesain setiap kurikulum bukan
            sebagai daftar video pasif, melainkan sebagai sistem navigasi yang mengarahkan
            setiap langkahmu.
          </p>
        </div>
      </section>

      {/* Misi + stats */}
      <section className="border-b border-line bg-background py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Misi kami</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{aboutMission}</p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <strong className="block text-2xl font-semibold text-foreground sm:text-3xl">
                      {stat.decimals
                        ? stat.value.toLocaleString("id-ID", {
                            minimumFractionDigits: stat.decimals,
                            maximumFractionDigits: stat.decimals,
                          })
                        : formatID(stat.value)}
                      {stat.suffix}
                    </strong>
                    <span className="mt-1 block text-xs text-muted sm:text-sm">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline lengkap */}
      <section className="border-b border-line bg-surface py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-foreground sm:mb-8 sm:text-2xl">Perjalanan kami</h2>
          <TimelineTabs
            timeline={aboutTimeline}
            heightClassName="h-[50vh] min-h-[320px] sm:h-[55vh] lg:h-[60vh] lg:max-h-[600px]"
          />
        </div>
      </section>

      {/* Nilai-nilai */}
      <section className="border-b border-line bg-background py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <h2 className="mb-8 text-xl font-bold text-foreground sm:mb-10 sm:text-2xl">Yang kami pegang teguh</h2>

          <div className="grid gap-5 sm:grid-cols-3">
            {aboutValues.map((value, i) => (
              <div key={value.title} className="rounded-card border border-line bg-surface p-6">
                <span className="text-3xl font-extrabold tabular-nums text-line">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-bold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA penutup */}
      <section className="bg-surface py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 text-center sm:px-6">
          <h2 className="mx-auto max-w-[28ch] text-xl font-bold text-foreground sm:text-2xl">
            Mulai langkahmu bersama kami
          </h2>
          <a
            href={whatsappLink("Halo Nivora, saya mau tanya-tanya dulu")}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-pill bg-brand px-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.22)] transition hover:bg-brand-dark"
          >
            <span>Chat dengan tim konselor</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}