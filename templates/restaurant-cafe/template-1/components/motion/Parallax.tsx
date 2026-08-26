'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef, type ReactNode } from 'react';

/**
 * <Parallax /> — isi bergerak lebih lambat/cepat dari halaman saat di-scroll.
 *
 * Dua hook yang wajib kamu pahami, karena keduanya dipakai di mana-mana:
 *
 * useScroll({ target, offset })
 *   Menghasilkan `scrollYProgress`: 0 → 1 selama elemen melintasi layar.
 *   offset: ['start end', 'end start'] artinya
 *     mulai hitung  : ATAS elemen menyentuh BAWAH layar   (progress 0)
 *     selesai hitung: BAWAH elemen menyentuh ATAS layar   (progress 1)
 *
 * useTransform(progress, [0, 1], ['-8%', '8%'])
 *   Memetakan angka 0..1 ke rentang lain. Ini "penerjemah" antara
 *   posisi scroll dan properti CSS apa pun.
 *
 * Keduanya MotionValue — sekali lagi: tanpa re-render sama sekali.
 */
export function Parallax({
  children,
  className,
  /** Positif = bergerak melawan scroll (terasa jauh). Nilai wajar 5-15. */
  distance = 8,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${distance}%`, `-${distance}%`],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
