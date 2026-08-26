'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ElementType, ReactNode } from 'react';
import { fadeUp, viewport, staggerParent } from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Tunda mulai, dalam detik. Pakai hanya kalau elemen berdiri sendiri. */
  delay?: number;
  /** Ganti tag HTML yang dirender. Default <div>. */
  as?: ElementType;
};

/**
 * <Reveal /> — satu elemen naik + memudar saat masuk viewport.
 *
 * whileInView = Motion memasang IntersectionObserver otomatis.
 * viewport.once = true  -> animasi jalan sekali saja. Kalau diulang tiap
 * scroll balik, halaman terasa gelisah dan konten sulit dibaca.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;

  // Hormati "reduce motion" di OS user: tampilkan konten tanpa gerak.
  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;

  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * <Stagger /> — induk yang memunculkan anak-anaknya bergiliran.
 *
 * Pola pentingnya: induk memegang `initial`/`whileInView`, anak CUKUP
 * menuliskan `variants`. Motion menurunkan state "hidden"/"show" ke bawah,
 * jadi kamu tidak perlu menghitung delay satu per satu.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as = 'div',
}: RevealProps & { stagger?: number; delayChildren?: number }) {
  const MotionTag = motion[as as 'div'] ?? motion.div;

  return (
    <MotionTag
      className={className}
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </MotionTag>
  );
}

/** Anak dari <Stagger />. Tidak punya initial/whileInView sendiri — sengaja. */
export function StaggerItem({
  children,
  className,
  as = 'div',
}: Omit<RevealProps, 'delay'>) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;

  return (
    <MotionTag className={className} variants={reduce ? undefined : fadeUp}>
      {children}
    </MotionTag>
  );
}
