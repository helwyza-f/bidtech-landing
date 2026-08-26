import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Total pergeseran dalam pixel. Positif = bergerak lebih lambat dari scroll. */
  distance?: number;
  className?: string;
}

/**
 * Parallax: isi bergerak lebih lambat dari halaman saat di-scroll,
 * sehingga terasa berada di lapisan yang lebih jauh.
 *
 * `offset: ["start end", "end start"]` artinya progress dihitung 0 saat ATAS
 * elemen menyentuh BAWAH layar, dan 1 saat BAWAH elemen meninggalkan ATAS layar.
 * Jadi progress 0->1 mencakup seluruh masa elemen terlihat di layar.
 */
export default function Parallax({ children, distance = 80, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      {/* Saat reduce-motion aktif, y dikunci di 0 — tidak ada gerakan sama sekali. */}
      <motion.div style={{ y: reduced ? 0 : y }}>{children}</motion.div>
    </div>
  );
}
