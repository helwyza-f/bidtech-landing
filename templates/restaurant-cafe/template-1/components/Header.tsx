'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ease, duration } from '@/lib/motion';
import { BRAND, NAV_LINKS } from '@/lib/constants';

/**
 * Header dengan dua perilaku scroll yang sering dipakai landing page modern:
 *
 * 1. SOLIDIFY — transparan di atas hero, lalu memakai background + blur
 *    begitu halaman di-scroll. Membuat hero terasa lapang tanpa
 *    mengorbankan keterbacaan nav di section berikutnya.
 *
 * 2. HIDE ON SCROLL DOWN — header menyingkir saat user membaca ke bawah,
 *    dan langsung kembali saat scroll ke atas (isyarat "saya mau navigasi").
 *
 * useMotionValueEvent = cara mendengar perubahan MotionValue tanpa memicu
 * re-render tiap frame. Kita hanya setState saat status BERUBAH,
 * bukan tiap pixel — itu bedanya dengan pasang window.addEventListener.
 */
export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;

    setScrolled(y > 24);

    // Ambang 120px: mencegah header berkedip saat scroll kecil di puncak halaman.
    setHidden(y > previous && y > 120 && !menuOpen);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: duration.base, ease: ease.out }}
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        'transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-smooth',
        scrolled
          ? 'bg-cream/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(89,65,60,0.12)]'
          : 'bg-transparent',
      )}
    >
      <nav className="shell flex h-20 items-center justify-between gap-6">
        <a
          href={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || "") + "/"}
          className="text-lg font-extrabold tracking-tight text-ink"
        >
          {BRAND.name}
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="#reservasi"
            className={cn(
              'hidden rounded-full bg-ember px-6 py-2.5 text-sm font-semibold text-cream md:inline-flex',
              'transition-[transform,background-color] duration-300 ease-smooth',
              'hover:-translate-y-0.5 hover:bg-ember-dark',
            )}
          >
            Reservasi
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Buka menu"
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-blush md:hidden"
          >
            {/* Ikon hamburger yang bermorf jadi X. Dua garis, dua state. */}
            <span className="relative block h-3 w-4">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: duration.fast, ease: ease.inOut }}
                className="absolute inset-x-0 top-0 h-[2px] origin-center bg-ink"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: duration.fast, ease: ease.inOut }}
                className="absolute inset-x-0 bottom-0 h-[2px] origin-center bg-ink"
              />
            </span>
          </button>
        </div>
      </nav>

      {/* AnimatePresence = izin untuk menganimasikan elemen yang DIHAPUS dari
          DOM. Tanpa ini, panel mobile akan hilang seketika tanpa exit. */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.inOut }}
            className="overflow-hidden border-t border-blush/50 bg-cream md:hidden"
          >
            <ul className="shell flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 text-sm font-medium text-cocoa"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/**
 * Link nav dengan garis bawah yang tumbuh dari kiri.
 *
 * Trik-nya: scale-x + transform-origin, BUKAN animasi `width`.
 * `width` memaksa browser menghitung ulang layout tiap frame (mahal).
 * `transform` hanya menyentuh tahap compositing — 60fps nyaris gratis.
 * Ingat aturan ini: animasikan transform & opacity, hindari sisanya.
 */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="group relative text-sm font-medium text-cocoa">
      {children}
      <span
        className={cn(
          'absolute -bottom-1 left-0 h-[1.5px] w-full bg-ember',
          'origin-left scale-x-0 transition-transform duration-300 ease-smooth',
          'group-hover:scale-x-100',
        )}
      />
    </a>
  );
}
