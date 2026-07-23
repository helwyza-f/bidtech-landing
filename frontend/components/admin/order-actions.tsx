"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Order } from "@/lib/types";

const statusStyles: Record<Order["status"], string> = {
  baru: "border-yellow-400/40 text-yellow-300",
  dihubungi: "border-sky-400/40 text-sky-300",
  selesai: "border-lime-400/40 text-[#63e009]",
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
      className={`rounded-lg border bg-black/40 px-2 py-1 text-xs disabled:opacity-60 ${statusStyles[value]}`}
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
      className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs text-red-300 disabled:opacity-60"
      disabled={pending}
      onClick={handleDelete}
      type="button"
    >
      Hapus
    </button>
  );
}
