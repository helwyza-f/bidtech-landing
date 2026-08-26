import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { duration as D, ease, staggerContainer } from "../../lib/motion";

interface StaggerGroupProps {
  children: ReactNode;
  /** Jeda antar anak, dalam detik. 0.06-0.12 biasanya paling enak dilihat. */
  stagger?: number;
  /** Tunda sebelum anak pertama mulai. */
  delayChildren?: number;
  amount?: number;
  once?: boolean;
  className?: string;
}

/**
 * Induk untuk animasi berantai (stagger).
 *
 * Cara kerjanya yang perlu dipahami: induk mengatur STATE bernama
 * ("hidden" -> "visible"), lalu Motion menurunkan state itu ke semua keturunannya
 * secara otomatis. Jadi anak-anaknya (<StaggerItem>) TIDAK perlu punya
 * `initial`/`whileInView` sendiri — cukup punya variants dengan nama yang sama.
 *
 * Inilah kenapa kita tidak perlu menghitung delay manual per elemen.
 */
export function StaggerGroup({
  children,
  stagger = 0.08,
  delayChildren = 0,
  amount = 0.2,
  once = true,
  className,
}: StaggerGroupProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={staggerContainer(reduced ? 0 : stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  distance?: number;
  duration?: number;
  className?: string;
}

/** Anak dari <StaggerGroup>. Jangan dipakai sendirian tanpa induk. */
export function StaggerItem({
  children,
  distance = 24,
  duration = D.base,
  className,
}: StaggerItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? D.fast : duration, ease: ease.out },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
