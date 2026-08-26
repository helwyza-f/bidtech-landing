import { motion, useScroll, useSpring } from "motion/react";

/**
 * Garis tipis di paling atas yang memanjang seiring scroll.
 * Detail kecil, tapi ini salah satu penanda paling cepat bahwa sebuah situs
 * "digarap serius".
 *
 * Kenapa scaleX dan bukan width: scaleX dianimasikan GPU (compositor), tidak
 * memicu layout ulang. Menganimasikan `width` memaksa browser menghitung ulang
 * tata letak tiap frame dan bikin scroll tersendat.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Tanpa spring, garisnya ikut persis tiap pixel scroll dan terasa kaku.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-primary"
    />
  );
}
