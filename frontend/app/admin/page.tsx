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
    { label: "Total Pesanan", value: total, accent: "text-white" },
    { label: "Baru", value: baru, accent: "text-yellow-300" },
    { label: "Dihubungi", value: dihubungi, accent: "text-sky-300" },
    { label: "Selesai", value: selesai, accent: "text-[#63e009]" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mb-6 text-sm text-zinc-400">Ringkasan aktivitas BidTech</p>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5" key={card.label}>
            <p className="text-xs uppercase tracking-wide text-zinc-400">{card.label}</p>
            <p className={`mt-2 text-3xl font-bold ${card.accent}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-xs uppercase tracking-wide text-zinc-400">Statistik Pengunjung Web</p>
        <p className="mt-2 text-3xl font-bold text-white">—</p>
        <p className="mt-1 text-xs text-zinc-500">
          Tracking pengunjung belum diaktifkan di backend. Hubungi tim dev untuk memasang analytics.
        </p>
      </div>
    </div>
  );
}
