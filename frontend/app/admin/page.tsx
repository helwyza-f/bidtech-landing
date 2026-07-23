import { cookies } from "next/headers";
import { CheckCircle2, Clock3, Inbox, MessageCircleMore, TrendingUp } from "lucide-react";

import { getOrders } from "@/core/api-client";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const orders = await getOrders(cookieStore.toString());

  const total = orders.length;
  const baru = orders.filter((order) => order.status === "baru").length;
  const dihubungi = orders.filter((order) => order.status === "dihubungi").length;
  const selesai = orders.filter((order) => order.status === "selesai").length;

  const cards = [
    {
      label: "Total Pesanan",
      value: total,
      description: "Seluruh permintaan masuk",
      icon: Inbox,
      iconStyle: "bg-lime-50 text-green-600",
      valueStyle: "text-slate-950",
    },
    {
      label: "Pesanan Baru",
      value: baru,
      description: "Menunggu tindak lanjut",
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-500",
      valueStyle: "text-amber-500",
    },
    {
      label: "Sudah Dihubungi",
      value: dihubungi,
      description: "Sedang dalam proses",
      icon: MessageCircleMore,
      iconStyle: "bg-sky-50 text-sky-500",
      valueStyle: "text-sky-500",
    },
    {
      label: "Selesai",
      value: selesai,
      description: "Pesanan terselesaikan",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
      valueStyle: "text-emerald-600",
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px]">
      <section className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-green-600">
            <span className="size-2 rounded-full bg-[#63e009]" />
            Ringkasan Bisnis
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Selamat Datang</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Pantau permintaan pelanggan dan progres layanan BidTech dari satu dashboard.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-sm">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#63e009]/15 text-green-700">
            <TrendingUp className="size-5" />
          </span>
          <div>
            <p className="text-xs text-slate-500">Aktivitas hari ini</p>
            <p className="text-sm font-bold text-slate-900">{total} total pesanan</p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              className="group relative min-h-48 overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-green-100 hover:shadow-[0_14px_35px_rgba(34,197,94,0.09)]"
              key={card.label}
            >
              <div className={`flex size-12 items-center justify-center rounded-2xl ${card.iconStyle}`}>
                <Icon className="size-6" strokeWidth={1.8} />
              </div>
              <p className="mt-5 text-sm font-medium text-slate-500">{card.label}</p>
              <p className={`mt-1 text-4xl font-extrabold tracking-tight ${card.valueStyle}`}>{card.value}</p>
              <p className="mt-2 text-xs text-slate-400">{card.description}</p>
              <span className="absolute -bottom-7 -right-7 size-24 rounded-full bg-[#63e009]/[0.06] transition group-hover:scale-125" />
            </article>
          );
        })}
      </section>

      <section className="mt-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold text-slate-900">Status Pesanan Hari Ini</p>
            <p className="mt-1 text-xs text-slate-500">Distribusi progres permintaan pelanggan BidTech.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-amber-600">Baru {baru}</span>
            <span className="rounded-full bg-sky-50 px-3 py-1.5 text-sky-600">Dihubungi {dihubungi}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-600">Selesai {selesai}</span>
          </div>
        </div>

        <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-slate-100">
          {total > 0 ? (
            <>
              <span className="bg-amber-400" style={{ width: `${(baru / total) * 100}%` }} />
              <span className="bg-sky-400" style={{ width: `${(dihubungi / total) * 100}%` }} />
              <span className="bg-[#63e009]" style={{ width: `${(selesai / total) * 100}%` }} />
            </>
          ) : (
            <span className="w-full bg-slate-100" />
          )}
        </div>
      </section>
    </div>
  );
}
