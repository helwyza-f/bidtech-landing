import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  /** 0.1 - 0.5. Makin besar, makin jauh elemen "ditarik" kursor. */
  strength?: number;
  className?: string;
}

/**
 * Efek magnet: elemen mengikuti kursor sedikit saat didekati.
 * Cocok untuk tombol utama (CTA) — bikin tombol terasa "hidup" dan menarik klik.
 *
 * Sengaja dimatikan di perangkat sentuh: di HP tidak ada kursor untuk diikuti,
 * jadi efeknya percuma dan hanya membuang kalkulasi.
 */
export default function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    // `pointer: fine` = mouse/trackpad. Layar sentuh akan bernilai false.
    const query = window.matchMedia("(pointer: fine)");
    setHasFinePointer(query.matches);

    const onChange = (event: MediaQueryListEvent) => setHasFinePointer(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // MotionValue = nilai yang bisa berubah TANPA memicu re-render React.
  // Ini penting: kalau pakai useState, tiap gerakan mouse akan me-render ulang
  // komponen puluhan kali per detik dan halaman jadi berat.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // useSpring membungkus nilai mentah jadi gerakan berpegas, bukan patah-patah.
  const springConfig = { stiffness: 200, damping: 18, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const enabled = hasFinePointer && !reduced;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    // Jarak kursor dari TITIK TENGAH elemen.
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
