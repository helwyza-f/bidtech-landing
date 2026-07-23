import { cookies } from "next/headers";

import { DeleteButton, StatusSelect } from "@/components/admin/order-actions";
import { LogoutButton } from "@/components/admin/logout-button";
import type { Order } from "@/lib/types";

async function getOrders(): Promise<Order[]> {
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8080";
  const cookieStore = await cookies();

  const res = await fetch(`${backendUrl}/api/orders`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function AdminDashboardPage() {
  const orders = await getOrders();

  return (
    <main className="mx-auto min-h-screen max-w-6xl bg-[#050505] px-4 py-8 text-white sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="text-xl font-extrabold">
          BID<span className="text-[#63e009]">TECH</span>
        </div>
        <LogoutButton />
      </div>

      <h1 className="text-2xl font-bold">Pesanan Masuk</h1>
      <p className="mb-6 text-sm text-zinc-400">{orders.length} pesanan</p>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="bg-white/[0.02] text-left text-xs uppercase tracking-wide text-zinc-400">
              <th className="whitespace-nowrap px-4 py-3">Tanggal</th>
              <th className="whitespace-nowrap px-4 py-3">Nama</th>
              <th className="whitespace-nowrap px-4 py-3">WhatsApp</th>
              <th className="whitespace-nowrap px-4 py-3">Perusahaan</th>
              <th className="whitespace-nowrap px-4 py-3">Layanan</th>
              <th className="px-4 py-3">Deskripsi</th>
              <th className="whitespace-nowrap px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-zinc-500" colSpan={8}>
                  Belum ada pesanan masuk.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr className="border-t border-white/10" key={order.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-400">{order.created_at}</td>
                  <td className="whitespace-nowrap px-4 py-3">{order.name}</td>
                  <td className="whitespace-nowrap px-4 py-3">{order.whatsapp}</td>
                  <td className="whitespace-nowrap px-4 py-3">{order.company || "-"}</td>
                  <td className="whitespace-nowrap px-4 py-3">{order.service}</td>
                  <td className="max-w-[280px] px-4 py-3 text-zinc-400">{order.description || "-"}</td>
                  <td className="px-4 py-3">
                    <StatusSelect id={order.id} status={order.status} />
                  </td>
                  <td className="px-4 py-3">
                    <DeleteButton id={order.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
