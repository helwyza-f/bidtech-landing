import Image from "next/image";
import { ArrowRight, Cloud, Code2, MonitorSmartphone, ShieldCheck, BriefcaseBusiness, MessageCircleMore, Gauge, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Pengembangan Kustom",
    description: "Website, portal, dan sistem digital yang dirancang sesuai kebutuhan bisnis agar pekerjaan lebih rapi dan lebih efisien.",
    icon: Code2,
  },
  {
    title: "Produk Web & Mobile",
    description: "Website dan aplikasi yang mudah digunakan, tampil profesional, dan mendukung pengalaman pelanggan yang lebih baik.",
    icon: MonitorSmartphone,
  },
  {
    title: "Solusi Cloud",
    description: "Solusi digital yang stabil, aman, dan siap mendukung pertumbuhan bisnis Anda seiring kebutuhan yang terus berkembang.",
    icon: Cloud,
  },
  {
    title: "Layanan yang Andal",
    description: "Pendekatan kerja yang mengutamakan kualitas, kenyamanan penggunaan, dan kepercayaan jangka panjang untuk bisnis Anda.",
    icon: ShieldCheck,
  },
];

const process = [
  ["01", "Konsultasi Awal", "Kami memahami kebutuhan bisnis Anda, tantangan yang dihadapi, dan hasil yang ingin dicapai."],
  ["02", "Perencanaan Solusi", "Kami menyusun solusi yang tepat, terarah, dan sesuai dengan prioritas bisnis Anda."],
  ["03", "Proses Pengerjaan", "Setiap tahap dikerjakan secara rapi dan transparan agar Anda tetap nyaman mengikuti progresnya."],
  ["04", "Peluncuran & Pendampingan", "Setelah siap digunakan, kami tetap membantu memastikan solusi berjalan baik dan memberi hasil optimal."],
] as const;

const differentiators = [
  {
    title: "Fokus pada kebutuhan bisnis",
    description: "Setiap layanan disusun untuk membantu bisnis Anda bekerja lebih efektif dan tampil lebih profesional.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Proses kerja yang jelas",
    description: "Setiap tahap dikerjakan dengan alur yang rapi sehingga Anda dapat mengikuti proses dengan nyaman.",
    icon: Gauge,
  },
  {
    title: "Komunikasi yang responsif",
    description: "Kami menjaga komunikasi tetap jelas dan mudah dipahami agar kolaborasi berjalan lancar dari awal hingga selesai.",
    icon: Users,
  },
] as const;

const solutionShowcase = [
  {
    title: "Website Company Profile",
    description: "Membantu bisnis tampil lebih profesional, lebih dipercaya, dan lebih siap menjangkau calon pelanggan baru.",
  },
  {
    title: "Portal & Sistem Bisnis",
    description: "Solusi digital untuk membantu pekerjaan internal menjadi lebih tertata, lebih cepat, dan lebih efisien.",
  },
  {
    title: "Aplikasi Web & Mobile",
    description: "Pengembangan aplikasi yang dirancang mengikuti kebutuhan layanan, operasional, maupun pengalaman pelanggan.",
  },
] as const;

export function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top_right,rgba(190,242,100,0.18),transparent_32%),radial-gradient(circle_at_left,rgba(34,211,238,0.1),transparent_26%)]" />

      <section className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl gap-14 px-5 py-12 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16" id="hero">
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <Badge>Software House • Web • Mobile • Cloud</Badge>
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl font-[family-name:var(--font-sora)] text-5xl font-semibold leading-none tracking-tight text-white md:text-7xl lg:mx-0">
            Bangun solusi digital yang cepat, kredibel, dan siap scale.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg lg:mx-0">
            BidTech membantu bisnis Anda menghadirkan website, aplikasi, dan solusi digital yang terlihat profesional,
            mudah digunakan, dan siap mendukung pertumbuhan usaha.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a href="#contact">
              <Button size="lg">
                Jadwalkan Diskusi
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline">
                Lihat Layanan
              </Button>
            </a>
          </div>

          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {[
              ["End-to-end", "Dari strategi sampai deployment"],
              ["Solusi Kustom", "Bukan delivery berbasis template"],
              ["Fokus Bisnis", "Teknologi selaras dengan ROI"],
            ].map(([title, body]) => (
              <Card key={title}>
                <CardContent className="space-y-2">
                  <p className="text-base font-semibold text-white">{title}</p>
                  <p className="text-sm leading-6 text-zinc-400">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-lime-300/12 blur-3xl" />
          <div className="relative rounded-full border border-lime-300/25 bg-lime-300/5 p-5 shadow-[0_0_80px_rgba(190,242,100,0.14)]">
            <Image
              src="/images/bidtech-tech.jpeg"
              alt="BidTech technology visual"
              width={800}
              height={800}
              priority
              className="mx-auto aspect-square rounded-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[32px] border border-lime-300/15 bg-white/5 px-px md:grid-cols-5" aria-label="BidTech value propositions">
        {["Pengembangan Software Kustom", "Solusi Web & Mobile", "Arsitektur Cloud", "Arah UI/UX", "Konsultasi IT"].map(
          (item) => (
            <div className="bg-black/50 px-5 py-4 text-center text-sm text-zinc-300" key={item}>
              {item}
            </div>
          )
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" id="about">
        <div className="max-w-3xl">
          <Badge>Company Profile</Badge>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-5xl">
            Memposisikan BidTech sebagai partner teknologi modern yang kredibel dan terpercaya.
          </h2>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-6 text-zinc-400">
              <p className="leading-8">
                BidTech hadir sebagai partner digital yang mengutamakan tampilan profesional, proses kerja yang rapi,
                dan hasil yang relevan dengan kebutuhan bisnis masa kini.
              </p>
              <p className="leading-8">
                Melalui halaman ini, BidTech ditampilkan sebagai mitra yang siap membantu perusahaan membangun citra,
                layanan, dan kehadiran digital yang lebih kuat di mata pelanggan maupun mitra bisnis.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden p-0">
            <Image
              src="/images/bidtech-building.jpeg"
              alt="BidTech corporate building concept"
              width={1200}
              height={900}
              className="h-full min-h-[360px] w-full object-cover"
            />
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" id="services">
        <div className="max-w-3xl">
          <Badge>Layanan Utama</Badge>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-5xl">
            Layanan yang dirancang untuk membantu bisnis tumbuh lebih cepat dan lebih terarah.
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card key={service.title}>
                <CardContent className="space-y-5">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-lime-300/15 bg-lime-300/10">
                    <Icon className="size-5 text-lime-300" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 leading-8 text-zinc-400">{service.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="max-w-3xl">
          <Badge>Why BidTech</Badge>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-5xl">
            Alasan mengapa BidTech layak menjadi partner digital untuk bisnis Anda.
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {differentiators.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title}>
                <CardContent className="space-y-5">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-lime-300/15 bg-lime-300/10">
                    <Icon className="size-5 text-lime-300" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 leading-8 text-zinc-400">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" id="process">
        <div className="max-w-3xl">
          <Badge>Alur Delivery</Badge>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-5xl">
            Proses kerja yang jelas, nyaman diikuti, dan berorientasi pada hasil.
          </h2>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-4">
          {process.map(([step, title, body]) => (
            <Card key={step}>
              <CardContent className="space-y-5">
                <div className="flex size-11 items-center justify-center rounded-full bg-lime-300 text-sm font-bold text-black">
                  {step}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 leading-8 text-zinc-400">{body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="max-w-3xl">
          <Badge>Solusi Kami</Badge>
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-5xl">
            Bentuk solusi yang dapat disiapkan sesuai kebutuhan dan arah pertumbuhan bisnis Anda.
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-zinc-400">
            Setiap bisnis memiliki kebutuhan yang berbeda. Karena itu, BidTech menyesuaikan pendekatan dan solusi agar
            hasil akhirnya benar-benar relevan, fungsional, dan memberi nilai nyata.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {solutionShowcase.map((item) => (
            <Card key={item.title}>
              <CardContent className="space-y-4">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-lime-300/15 bg-white/5">
                  <BriefcaseBusiness className="size-5 text-lime-300" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 leading-8 text-zinc-400">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" id="contact">
        <Card className="overflow-hidden bg-[linear-gradient(135deg,rgba(190,242,100,0.14),transparent_36%),rgba(10,12,12,0.92)]">
          <CardContent className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <Badge>Langkah Berikutnya</Badge>
              <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-white md:text-5xl">
                Mari mulai percakapan untuk menemukan solusi digital yang tepat bagi bisnis Anda.
              </h2>
              <p className="mt-4 leading-8 text-zinc-400">
                Tim BidTech siap membantu Anda membangun website, aplikasi, maupun sistem digital yang mendukung citra
                profesional dan perkembangan bisnis secara berkelanjutan.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="https://wa.me/628217601455" target="_blank" rel="noreferrer">
                <Button size="lg">
                  <MessageCircleMore className="mr-2 size-4" />
                  Konsultasi via WhatsApp
                </Button>
              </a>
              <a href="mailto:hello@bidtech.co.id">
                <Button size="lg" variant="outline">
                  hello@bidtech.co.id
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
