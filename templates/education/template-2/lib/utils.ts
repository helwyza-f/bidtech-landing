import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Gabungkan class Tailwind dengan aman, resolve konflik terakhir menang. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format angka ke gaya Indonesia: pemisah ribuan titik.
 * Dipakai untuk count-up di Trust Metrics.
 * Contoh: formatID(12400) -> "12.400"
 */
export function formatID(value: number): string {
  return new Intl.NumberFormat("id-ID").format(Math.round(value));
}