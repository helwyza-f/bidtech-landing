import { motion, useReducedMotion } from "motion/react";
import { duration as D, ease } from "../../lib/motion";

/**
 * Efek judul "terbit dari balik garis" — tiap kata naik dari bawah sambil
 * ditutupi mask, berurutan. Ini efek khas landing page modern.
 *
 * Triknya: tiap kata dibungkus <span overflow-hidden>, lalu kata di dalamnya
 * digeser turun 110% dan dinaikkan ke 0. Karena induknya memotong luapan,
 * kata terlihat seperti muncul dari balik sebuah garis.
 */

const tagMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

interface SplitTextProps {
  text: string;
  as?: keyof typeof tagMap;
  className?: string;
  /** Kelas tambahan untuk tiap kata — berguna untuk mewarnai/memiringkan sebagian. */
  wordClassName?: string;
  /** "word" = per kata (aman & cepat). "char" = per huruf (lebih dramatis). */
  by?: "word" | "char";
  stagger?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

export default function SplitText({
  text,
  as = "span",
  className,
  wordClassName,
  by = "word",
  stagger = 0.06,
  delay = 0,
  duration = D.slow,
  once = true,
  amount = 0.4,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const Tag = tagMap[as];
  const words = text.split(" ");

  // Dengan reduce-motion, teks cukup muncul utuh tanpa dipecah-pecah.
  if (reduced) {
    return (
      <Tag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: D.fast, delay }}
      >
        {text}
      </Tag>
    );
  }

  const piece = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration, ease: ease.out } },
  };

  return (
    <Tag
      // Screen reader membaca teks utuh dari sini, bukan potongan per kata.
      aria-label={text}
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          // mr pakai satuan `em` supaya jarak antar kata ikut menyesuaikan font-size.
          className="mr-[0.25em] inline-block"
        >
          {by === "char" ? (
            [...word].map((char, charIndex) => (
              <span
                key={`${char}-${charIndex}`}
                // pb/-mb mencegah huruf berekor (g, y, j) terpotong oleh mask.
                className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em]"
              >
                <motion.span
                  className={`inline-block ${wordClassName ?? ""}`}
                  variants={piece}
                >
                  {char}
                </motion.span>
              </span>
            ))
          ) : (
            <span className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em]">
              <motion.span
                className={`inline-block ${wordClassName ?? ""}`}
                variants={piece}
              >
                {word}
              </motion.span>
            </span>
          )}
        </span>
      ))}
    </Tag>
  );
}
