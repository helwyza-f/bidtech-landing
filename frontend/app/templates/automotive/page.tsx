import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Calendar,
  CarFront,
  Gauge,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const imageBase = "/templates/automotive/images";

const cars = [
  {
    name: "Mercedes-Benz S-Class",
    type: "Sedan Mewah",
    price: "2.500.000",
    image: `${imageBase}/car-1.jpg`,
    specs: ["4 Seats", "Otomatis", "Premium"],
  },
  {
    name: "Toyota Alphard",
    type: "Premium MPV",
    price: "1.800.000",
    image: `${imageBase}/car-2.jpg`,
    specs: ["7 Seats", "Otomatis", "Chauffeur"],
  },
  {
    name: "BMW Seri 3",
    type: "Sedan Sport",
    price: "1.500.000",
    image: `${imageBase}/car-3.jpg`,
    specs: ["5 Seats", "Sport", "Harian"],
  },
];

const steps = [
  { icon: CarFront, title: "Pilih Mobil", description: "Temukan kendaraan premium sesuai agenda perjalanan Anda." },
  { icon: Calendar, title: "Atur Jadwal", description: "Pilih tanggal, lokasi jemput, dan durasi pemakaian." },
  { icon: BadgeCheck, title: "Konfirmasi", description: "Tim kami memastikan kendaraan siap dan bersih sebelum digunakan." },
];

const testimonials = [
  {
    author: "Sarah Mitchell",
    role: "Eksekutif Bisnis",
    quote: "Layanan pengiriman ke lokasi sangat luar biasa. Mobil diantar tepat waktu dan kondisinya premium.",
    avatar: `${imageBase}/avatar-1.jpg`,
  },
  {
    author: "Marcus Thorne",
    role: "Wirausaha Teknologi",
    quote: "Proses booking cepat, tampilan website terasa mahal, dan cocok untuk brand rental mobil premium.",
    avatar: `${imageBase}/avatar-2.jpg`,
  },
];

export default function AutomotiveTemplatePreviewPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="text-2xl font-extrabold tracking-tight text-blue-600" href="/templates">
            Rent<span className="text-slate-950">car</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a className="text-blue-600" href="#home">Beranda</a>
            <a className="transition hover:text-blue-600" href="#collection">Kendaraan</a>
            <a className="transition hover:text-blue-600" href="#why">Layanan</a>
            <a className="transition hover:text-blue-600" href="#contact">Kontak</a>
          </nav>
          <a
            className="hidden rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 md:inline-flex"
            href="#contact"
          >
            Hubungi Kami
          </a>
        </div>
      </header>

      <section className="relative flex min-h-[820px] flex-col justify-between overflow-visible pt-24 lg:min-h-[860px]" id="home">
        <Image
          alt="Premium car rental hero"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[68%_center]"
          fill
          priority
          sizes="100vw"
          src={`${imageBase}/hero_section.jpg`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.82)_0%,rgba(15,23,42,0.54)_42%,rgba(15,23,42,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-50 via-slate-50/55 to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-28 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-blue-200">Layanan Armada Utama</p>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Kendarai Yang <br /> Luar Biasa
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              Rasakan pengalaman rental mobil premium dengan kendaraan mewah yang dikurasi, siap antar, dan terverifikasi.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition hover:bg-blue-700" href="#collection">
                Lihat Kendaraan
                <ArrowRight className="ml-2 size-4" />
              </a>
              <Link className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15" href="/templates">
                <ArrowLeft className="mr-2 size-4" />
                Kembali Design
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto -mb-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 rounded-3xl bg-white p-5 shadow-2xl sm:grid-cols-2 lg:grid-cols-4 lg:p-7">
            {[
              ["50rb+", "Anggota Aktif", Users],
              ["120+", "Lokasi Global", MapPin],
              ["4.9/5", "Rating Premium", Star],
              ["24/7", "Mitra Terverifikasi", ShieldCheck],
            ].map(([value, label, Icon]) => (
              <div className="flex min-h-20 items-center gap-4" key={label as string}>
                <Icon className="size-9 shrink-0 text-blue-600" />
                <div>
                  <p className="text-3xl font-extrabold leading-none text-blue-600">{value as string}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 pb-20 pt-32 sm:px-6 lg:px-8" id="collection">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-600">Koleksi Kami</p>
              <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950">Performa yang Dikurasi</h2>
            </div>
            <div className="flex gap-3">
              <button className="flex size-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400" type="button">
                <ArrowLeft className="size-5" />
              </button>
              <button className="flex size-12 items-center justify-center rounded-full border border-blue-600 bg-white text-blue-600 shadow-sm" type="button">
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {cars.map((car) => (
              <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10" key={car.name}>
                <div className="relative h-60 overflow-hidden">
                  <Image alt={car.name} className="object-cover transition duration-500 hover:scale-105" fill sizes="(min-width: 768px) 33vw, 100vw" src={car.image} />
                </div>
                <div className="space-y-5 p-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{car.type}</p>
                    <h3 className="mt-1 text-xl font-extrabold text-slate-950">{car.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {car.specs.map((spec) => (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700" key={spec}>{spec}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                    <p className="text-sm text-slate-500">Mulai <span className="font-extrabold text-slate-950">Rp{car.price}</span>/hari</p>
                    <a className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700" href="#contact">Booking</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="why">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[36px]">
            <Image alt="Premium rental service" className="h-[460px] w-full object-cover" height={720} src={`${imageBase}/why-choose-us.jpg`} width={900} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 p-5 shadow-xl backdrop-blur">
              <p className="text-3xl font-extrabold text-blue-600">98%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Repeat customer</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-600">Kenapa Memilih Kami</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">Rental premium yang terasa rapi dari awal.</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Template ini cocok untuk bisnis rental, dealer, showroom, atau jasa transportasi premium yang butuh tampilan modern dan meyakinkan.
            </p>
            <div className="mt-8 grid gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm" key={step.title}>
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-950">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-600">Testimonial</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">Suara Kepercayaan</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <article className="rounded-[30px] bg-blue-600 p-8 text-white shadow-xl shadow-blue-600/20" key={item.author}>
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star className="size-5 fill-white text-white" key={index} />
                  ))}
                </div>
                <p className="text-base leading-8 text-blue-50">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-4">
                  <Image alt={item.author} className="size-12 rounded-full object-cover ring-2 ring-white/20" height={96} src={item.avatar} width={96} />
                  <div>
                    <h3 className="font-extrabold">{item.author}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-200">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="contact">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-blue-600 p-8 text-white shadow-2xl shadow-blue-600/30 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Siap memulai perjalanan luar biasa Anda?</h2>
              <p className="mt-4 max-w-xl text-blue-100">
                Gunakan design ini untuk bisnis automotive Anda, atau custom agar lebih sesuai dengan brand.
              </p>
            </div>
            <div className="grid gap-3">
              <a className="flex items-center justify-center rounded-2xl bg-white px-6 py-4 font-extrabold text-blue-600 transition hover:bg-blue-50" href="https://wa.me/628217601455" rel="noreferrer" target="_blank">
                <Phone className="mr-2 size-5" />
                Konsultasi Sekarang
              </a>
              <a className="flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/15" href="mailto:cs@bidtech.co.id">
                <Mail className="mr-2 size-5" />
                Email BIDTECH
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 px-4 py-8 text-center text-sm text-slate-500">
        Preview template Automotive by BIDTECH Design Library.
      </footer>
    </main>
  );
}
