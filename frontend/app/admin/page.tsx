import { cookies } from "next/headers";

import { getOrders } from "@/core/api-client";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const orders = await getOrders(cookieStore.toString());

  const total = orders.length;
  const baru = orders.filter((o) => o.status === "baru").length;
  const dihubungi = orders.filter((o) => o.status === "dihubungi").length;
  const selesai = orders.filter((o) => o.status === "selesai").length;

  const cards = [
    { label: "Total Pesanan", value: total, accent: "text-slate-950", bar: "bg-slate-400" },
    { label: "Baru", value: baru, accent: "text-amber-500", bar: "bg-amber-400" },
    { label: "Dihubungi", value: dihubungi, accent: "text-sky-500", bar: "bg-sky-400" },
    { label: "Selesai", value: selesai, accent: "text-green-600", bar: "bg-[#63e009]" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Ringkasan</h1>
      <p className="mb-6 text-sm text-slate-500">Aktivitas BidTech hari ini</p>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            key={card.label}
          >
            <span className={`absolute left-0 top-0 h-full w-1 ${card.bar}`} />
            <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
            <p className={`mt-2 text-3xl font-bold ${card.accent}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-slate-500">Statistik Pengunjung Web</p>
        <p className="mt-2 text-3xl font-bold text-slate-950">—</p>
        <p className="mt-1 text-xs text-slate-500">
          Tracking pengunjung belum diaktifkan di backend. Hubungi tim dev untuk memasang analytics.
        </p>
      </div>
    </div>
  );
}
