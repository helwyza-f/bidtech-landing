import type { Variants } from "motion/react";

/**
 * Token animasi: satu sumber kebenaran untuk easing & durasi.
 *
 * Kenapa penting: animasi terasa "murah" bukan karena kurang banyak, tapi karena
 * tidak konsisten. Kalau tiap section pakai easing sendiri-sendiri, mata pengguna
 * menangkap ketidakcocokan itu. Dengan token, semua gerakan terasa satu keluarga.
 */

/** cubic-bezier(x1, y1, x2, y2) — sama persis dengan CSS. */
type Bezier = [number, number, number, number];

export const ease: Record<"out" | "inOut" | "spring", Bezier> = {
  /** Cepat di awal, melambat panjang di akhir. Default untuk elemen yang MASUK. */
  out: [0.22, 1, 0.36, 1],
  /** Simetris. Untuk elemen yang bergerak dua arah, misal accordion buka/tutup. */
  inOut: [0.65, 0, 0.35, 1],
  /** Sedikit melewati target lalu balik. Bikin elemen terasa punya berat. */
  spring: [0.34, 1.56, 0.64, 1],
};

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  hero: 1.2,
} as const;

/**
 * Aturan viewport default untuk animasi scroll.
 * `once: true` -> animasi hanya jalan sekali. Kalau tiap scroll balik dianimasikan
 * ulang, halaman terasa gelisah dan mengganggu saat orang membaca.
 * `amount: 0.25` -> baru jalan setelah 25% elemen kelihatan.
 */
export const viewport = { once: true, amount: 0.25 } as const;

/**
 * Variants = "kamus pose". Kita definisikan pose bernama ("hidden"/"visible"),
 * lalu induk cukup mengatur namanya dan SEMUA anak ikut otomatis.
 * Ini yang bikin efek stagger bisa ditulis tanpa mengoper delay satu per satu.
 */
export function fadeUp(distance = 24, d: number = duration.base): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: d, ease: ease.out },
    },
  };
}

export function fadeIn(d: number = duration.base): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: d, ease: ease.out } },
  };
}

/** Zoom halus untuk gambar/kartu. Skala mulai sedikit besar lalu mengecil ke normal. */
export function zoomIn(from = 1.08, d: number = duration.slow): Variants {
  return {
    hidden: { opacity: 0, scale: from },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: d, ease: ease.out },
    },
  };
}

/**
 * Induk untuk efek berantai. Induk sendiri tidak bergerak — tugasnya hanya
 * mengatur JEDA antar anak lewat `staggerChildren`.
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
