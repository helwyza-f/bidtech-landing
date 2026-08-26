'use client';

import { motion } from 'motion/react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { SplitWords } from '@/components/motion/SplitWords';
import { PILLARS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Tiga pilar nilai jual restoran.
 *
 * Section ini contoh pola yang akan kamu ulang di SEMUA section berikutnya:
 *   <Reveal>        untuk eyebrow / heading
 *   <Stagger>       untuk daftar kartu
 *   <StaggerItem>   untuk tiap kartu
 *
 * Perhatikan: tidak ada satu pun `delay` manual di kartu. Induk <Stagger>
 * yang mengatur giliran. Kalau nanti kamu tambah kartu keempat, ritmenya
 * ikut menyesuaikan sendiri.
 */
export default function Features() {
  return (
    <section className="section bg-cream">
      <div className="shell">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">Mengapa Kami</p>
          </Reveal>
          <SplitWords
            as="h2"
            text="Dibuat dengan niat, disajikan dengan bangga"
            className="heading text-3xl sm:text-4xl lg:text-5xl"
          />
        </div>

        <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.12}>
          {PILLARS.map((pillar, i) => (
            <StaggerItem key={pillar.title}>
              <PillarCard index={i} {...pillar} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function PillarCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    /**
     * whileHover di level motion.div, BUKAN CSS :hover.
     *
     * Alasannya: kita ingin kartu terangkat dengan spring (ada bobot,
     * berhenti tidak kaku). CSS transition tidak bisa spring.
     * Untuk perubahan warna sederhana, CSS tetap pilihan yang lebih ringan.
     */
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border border-blush/60 bg-ember-soft p-8',
        'transition-colors duration-500 ease-smooth hover:border-ember/40',
      )}
    >
      {/* Nomor besar sebagai ornamen. Ikut bergeser saat hover supaya
          kartu terasa satu kesatuan, bukan tumpukan elemen terpisah. */}
      <motion.span
        aria-hidden
        className="absolute -right-2 -top-6 text-[7rem] font-extrabold leading-none text-ember/[0.07]"
        whileHover={{ x: -6 }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <div className="relative">
        <span className="mb-6 inline-grid h-11 w-11 place-items-center rounded-full bg-ember text-sm font-bold text-cream">
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 className="mb-3 text-lg font-bold text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-cocoa/80">{description}</p>
      </div>

      {/* Garis aksen yang tumbuh dari kiri saat hover — pengulangan motif
          yang sama dengan underline nav. Konsistensi motif = terasa dirancang. */}
      <span
        className={cn(
          'absolute inset-x-8 bottom-0 h-[2px] origin-left scale-x-0 bg-ember',
          'transition-transform duration-500 ease-smooth group-hover:scale-x-100',
        )}
      />
    </motion.article>
  );
}
