import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  scholarship,
  scholarshipTiers,
  scholarshipTimeline,
  scholarshipRequirements,
  scholarshipFaqs,
} from "@/lib/data/scholarship";
import { nivoraAssets } from "@/lib/data/asset-paths";
import { whatsappLink } from "@/lib/data/site";
import { FaqAccordion } from "@/components/faq-accordion";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Beasiswa Nivora Academy",
  description: scholarship.description,
  path: "/beasiswa",
});

export default function BeasiswaPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-brand-soft pt-24 pb-14 sm:pt-28 sm:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={nivoraAssets.career.portfolioReview}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-soft/70 to-brand-soft" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-pill bg-white px-3.5 py-1 text-xs font-bold text-brand">
            <span>{scholarship.eyebrow}</span>
          </div>

          <h1 className="mt-3 max-w-[24ch] text-2xl font-semibold leading-[1.1] text-foreground sm:text-display-lg">
            {scholarship.title}
          </h1>

          <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-muted sm:text-base">
            {scholarship.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink("Halo Nivora, saya mau mendaftar beasiswa")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-pill bg-brand px-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.22)] transition hover:bg-brand-dark"
            >
              <span>Ajukan pendaftaran beasiswa</span>
              <ArrowUpRight size={16} />
            </a>
            <span className="text-xs font-semibold text-muted">
              {scholarship.deadlineNote} · {scholarship.quota.remaining}
            </span>
          </div>
        </div>
      </section>

      {/* Tingkatan beasiswa */}
      <section className="border-b border-line bg-background py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <h2 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">Tingkatan potongan biaya</h2>
          <p className="mb-8 max-w-prose text-sm text-muted sm:mb-10">
            Tidak ada sistem lolos-atau-gagal — hasil seleksimu menentukan tingkat potongan biaya
            yang kamu dapatkan, bukan menggugurkan kesempatanmu belajar.
          </p>

          <div className="grid gap-5 sm:grid-cols-3">
            {scholarshipTiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`rounded-card border p-6 ${
                  i === 0 ? "border-brand bg-brand-soft" : "border-line bg-surface"
                }`}
              >
                <span className="font-display text-4xl italic text-brand">{tier.discount}</span>
                <h3 className="mt-2 text-base font-bold text-foreground">{tier.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tier.criteria}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline seleksi */}
      <section className="border-b border-line bg-surface py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <h2 className="mb-8 text-xl font-bold text-foreground sm:mb-10 sm:text-2xl">Tahapan seleksi</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {scholarshipTimeline.map((step, i) => (
              <div key={step.label} className="relative rounded-card border border-line bg-background p-5">
                <span className="text-3xl font-extrabold tabular-nums text-line">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-brand">{step.date}</p>
                <h3 className="mt-1 text-sm font-bold text-foreground">{step.label}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syarat peserta */}
      <section className="border-b border-line bg-background py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Syarat peserta</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Syaratnya sederhana — kami lebih mementingkan komitmen belajar daripada latar
                belakang pendidikan formal.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {scholarshipRequirements.map((req) => (
                  <div key={req} className="flex items-start gap-3 rounded-card border border-line bg-surface p-4">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand" />
                    <span className="text-sm text-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ khusus beasiswa */}
      <section className="bg-surface py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Pertanyaan seputar beasiswa</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Masih ragu? Tim konselor kami siap membantu menjawab pertanyaan spesifik soal
                kondisimu.
              </p>

              <a
                href={whatsappLink("Halo Nivora, saya mau tanya soal beasiswa")}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
              >
                <span>Chat dengan tim konselor</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="lg:col-span-7">
              <FaqAccordion faqs={scholarshipFaqs} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}