import { cookies } from "next/headers";
import { MessageCircle } from "lucide-react";

import { StatusSelect } from "@/features/admin/components/order-actions";
import { getOrders } from "@/lib/api";

function toWhatsAppLink(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

export default async function AdminPesananPage() {
  const cookieStore = await cookies();
  const orders = await getOrders(cookieStore.toString());

  return (
    <div>
      <h1 className="text-2xl font-bold">Pesanan Masuk</h1>
      <p className="mb-6 text-sm text-slate-500">{orders.length} pesanan</p>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="whitespace-nowrap px-4 py-3">Tanggal</th>
              <th className="whitespace-nowrap px-4 py-3">Nama</th>
              <th className="whitespace-nowrap px-4 py-3">WhatsApp</th>
              <th className="whitespace-nowrap px-4 py-3">Perusahaan</th>
              <th className="whitespace-nowrap px-4 py-3">Layanan</th>
              <th className="px-4 py-3">Deskripsi</th>
              <th className="whitespace-nowrap px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-slate-500" colSpan={7}>
                  Belum ada pesanan masuk.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr className="border-t border-slate-200 transition hover:bg-slate-50" key={order.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">{order.created_at}</td>
                  <td className="whitespace-nowrap px-4 py-3">{order.name}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <a
                      className="inline-flex items-center gap-1.5 text-green-600 hover:underline"
                      href={toWhatsAppLink(order.whatsapp)}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <MessageCircle className="size-4" />
                      {order.whatsapp}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{order.company || "-"}</td>
                  <td className="whitespace-nowrap px-4 py-3">{order.service}</td>
                  <td className="max-w-[280px] px-4 py-3 text-slate-500">{order.description || "-"}</td>
                  <td className="px-4 py-3">
                    <StatusSelect id={order.id} status={order.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
