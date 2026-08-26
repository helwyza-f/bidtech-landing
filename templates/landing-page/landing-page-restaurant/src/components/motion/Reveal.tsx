import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { duration as D, ease } from "../../lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  /** Arah datangnya elemen. "up" = muncul dari bawah ke atas. */
  direction?: Direction;
  /** Jarak tempuh dalam pixel. Makin kecil makin halus/mahal kesannya. */
  distance?: number;
  delay?: number;
  duration?: number;
  /** Berapa persen elemen harus terlihat sebelum animasi jalan (0-1). */
  amount?: number;
  once?: boolean;
  className?: string;
}

function offsetFor(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

/**
 * Pembungkus serbaguna: apa pun di dalamnya akan muncul saat masuk layar.
 *
 * Dipakai untuk elemen TUNGGAL. Kalau mau beberapa elemen muncul berurutan,
 * pakai <StaggerGroup> supaya jedanya diatur otomatis.
 */
export default function Reveal({
  children,
  direction = "up",
  distance = 24,
  delay = 0,
  duration = D.base,
  amount = 0.25,
  once = true,
  className,
}: RevealProps) {
  // Kalau pengguna mengaktifkan "reduce motion" di OS-nya, kita hormati:
  // elemen tetap muncul, tapi tanpa gerakan — hanya fade.
  const reduced = useReducedMotion();
  const from = reduced ? { opacity: 0 } : { opacity: 0, ...offsetFor(direction, distance) };

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? D.fast : duration, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
