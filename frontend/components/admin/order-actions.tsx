"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Order } from "@/lib/types";

const statusStyles: Record<Order["status"], string> = {
  baru: "border-amber-300 text-amber-700",
  dihubungi: "border-sky-300 text-sky-700",
  selesai: "border-lime-300 text-green-700",
};

export function StatusSelect({ id, status }: { id: number; status: Order["status"] }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [pending, setPending] = useState(false);

  const handleChange = async (next: Order["status"]) => {
    setValue(next);
    setPending(true);
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setPending(false);
    }
  };

  return (
    <select
      className={`rounded-lg border bg-white px-2 py-1 text-xs disabled:opacity-60 ${statusStyles[value]}`}
      disabled={pending}
      onChange={(e) => handleChange(e.target.value as Order["status"])}
      value={value}
    >
      <option value="baru">Baru</option>
      <option value="dihubungi">Dihubungi</option>
      <option value="selesai">Selesai</option>
    </select>
  );
}

export function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Hapus pesanan ini?")) return;

    setPending(true);
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs text-red-600 disabled:opacity-60"
      disabled={pending}
      onClick={handleDelete}
      type="button"
    >
      Hapus
    </button>
  );
}
