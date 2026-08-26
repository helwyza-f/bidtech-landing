'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { spring } from '@/lib/motion';

/**
 * <Magnetic /> — elemen yang "ditarik" sedikit ke arah kursor.
 *
 * Tiga hal yang membuatnya terasa mahal, bukan murahan:
 * 1. useMotionValue → nilainya hidup di luar React. Menggerakkan mouse TIDAK
 *    memicu re-render; Motion menulis langsung ke style. Kalau ini pakai
 *    useState, komponen re-render tiap pixel dan halaman mulai tersendat.
 * 2. useSpring → kursor berhenti mendadak, elemen tidak. Ada bobotnya.
 * 3. strength kecil (0.25). Magnetic yang berlebihan terasa seperti bug.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.soft);
  const sy = useSpring(y, spring.soft);

  if (reduce) return <div className={className}>{children}</div>;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Jarak kursor dari TITIK TENGAH elemen, bukan dari pojok kiri-atas.
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
