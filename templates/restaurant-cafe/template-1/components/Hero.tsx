'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Magnetic } from '@/components/motion/Magnetic';
import { SplitWords } from '@/components/motion/SplitWords';
import { ease, duration, staggerParent, fadeUp } from '@/lib/motion';
import { HERO } from '@/lib/constants';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * Efek "sinematik" saat scroll keluar dari hero.
   *
   * offset: ['start start', 'end start']
   *   progress 0 = hero pas menempel di atas layar (posisi awal halaman)
   *   progress 1 = bawah hero sudah menyentuh atas layar (hero habis)
   *
   * Selama itu: gambar sedikit membesar, teks naik lebih cepat + memudar.
   * Perbedaan kecepatan antara teks dan gambar inilah yang menciptakan
   * kesan kedalaman. Kalau semuanya bergerak sama, tidak ada efeknya.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-28"
    >
      {/* ── Lapisan background: gambar + gradien keterbacaan ─────────────── */}
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 -z-10">
        <Image
          src={HERO.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradien wajib. Tanpa ini, teks putih di atas foto akan gagal
            kontras begitu foto diganti pembeli template. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/20" />
      </motion.div>

      {/* ── Konten ──────────────────────────────────────────────────────── */}
      <motion.div style={{ y: textY, opacity: textOpacity }} className="shell relative">
        <motion.div
          className="max-w-2xl"
          variants={staggerParent(0.12)}
          initial="hidden"
          animate="show"  // hero = animate, BUKAN whileInView.
                          // Hero sudah terlihat saat load; menunggu scroll
                          // berarti animasinya tidak pernah dilihat siapa pun.
        >
          <motion.p
            variants={fadeUp}
            className="eyebrow mb-5 text-gold"
          >
            {HERO.eyebrow}
          </motion.p>

          {/* Dua baris judul dianimasikan terpisah supaya jeda antar baris
              terasa disengaja, bukan sekadar kata mengalir terus. */}
          <h1 className="heading mb-6 text-4xl text-cream sm:text-5xl lg:text-[4.2rem]">
            <SplitWords as="span" text={HERO.titleLines[0]} delay={0.15} className="block" />
            <SplitWords as="span" text={HERO.titleLines[1]} delay={0.32} className="block" />
          </h1>

          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.55, duration: duration.base, ease: ease.out }}
            className="mb-10 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg"
          >
            {HERO.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.68, duration: duration.base, ease: ease.out }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link
                href={HERO.primaryCta.href}
                className="group relative inline-flex overflow-hidden rounded-full bg-ember px-8 py-4 text-sm font-semibold text-cream"
              >
                {/* Isian yang menyapu dari bawah saat hover.
                    scale-y + origin-bottom, lagi-lagi transform. */}
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ember-dark transition-transform duration-500 ease-smooth group-hover:scale-y-100" />
                <span className="relative">{HERO.primaryCta.label}</span>
              </Link>
            </Magnetic>

            <Link
              href={HERO.secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-sm font-semibold text-cream transition-colors duration-300 hover:border-cream/70"
            >
              {HERO.secondaryCta.label}
              <span aria-hidden className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Isyarat scroll ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: duration.base }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-12 w-[1px] overflow-hidden bg-cream/20">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.8, ease: ease.inOut, repeat: Infinity }}
            className="h-full w-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
