'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { staggerParent, wordRise, viewport } from '@/lib/motion';

type Props = {
  text: string;
  className?: string;
  /** Jeda antar kata. Heading besar enak di 0.06-0.09. */
  stagger?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
};

/**
 * <SplitWords /> — heading yang kata-katanya terbit dari balik garis.
 *
 * Rahasianya bukan animasinya, tapi STRUKTUR HTML-nya:
 *
 *   <span class="overflow-hidden">   <- topeng/masker, tidak bergerak
 *     <motion.span y: 110% -> 0%>    <- kata, bergerak di dalam topeng
 *
 * Karena induknya `overflow-hidden`, kata yang masih di posisi 110%
 * benar-benar tak terlihat, bukan sekadar transparan. Itu yang bikin
 * kesannya "terbit", bukan "muncul".
 *
 * Kenapa per KATA, bukan per HURUF? Per huruf memecah kata bagi screen
 * reader dan bikin heading panjang terasa lambat. Per kata jauh lebih aman.
 */
export function SplitWords({
  text,
  className,
  stagger = 0.07,
  delay = 0,
  as = 'h2',
}: Props) {
  const reduce = useReducedMotion();
  const Tag = as;
  const words = text.split(' ');

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      {/* Teks utuh untuk screen reader — versi animasi disembunyikan darinya. */}
      <span className="sr-only">{text}</span>

      <motion.span
        aria-hidden
        variants={staggerParent(stagger, delay)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="inline"
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={cn('inline-block overflow-hidden align-bottom', 'pb-[0.12em]')}
          >
            <motion.span variants={wordRise} className="inline-block">
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
