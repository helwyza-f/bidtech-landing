import { backendUrl } from "@/lib/config";
import type { Order } from "@/lib/types";

async function apiFetch(path: string, cookieHeader: string): Promise<Response> {
  return fetch(`${backendUrl}${path}`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });
}

export async function getOrders(cookieHeader: string): Promise<Order[]> {
  const res = await apiFetch("/api/orders", cookieHeader);
  if (!res.ok) return [];
  return res.json();
}
