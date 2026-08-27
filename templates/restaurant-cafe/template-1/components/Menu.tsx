'use client';

import Image from 'next/image';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { useMemo, useState } from 'react';
import { MENU_FILTERS, MENU_ITEMS, formatPrice } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { duration, ease, fadeUp, spring, staggerParent } from '@/lib/motion';
import { Reveal } from '@/components/motion/Reveal';
import { SplitWords } from '@/components/motion/SplitWords';

type MenuFilter = (typeof MENU_FILTERS)[number];
type MenuItem = (typeof MENU_ITEMS)[number];

const PAGE_SIZE = 4;

export default function Menu() {
  const reduce = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<MenuFilter>('Semua');
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'Semua') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const visibleItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function chooseFilter(filter: MenuFilter) {
    setActiveFilter(filter);
    setPage(1);
  }

  return (
    <section id="menu" className="section overflow-hidden bg-[#fffdf8]">
      <div className="shell">
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Pilihan Musiman</p>
            </Reveal>

            <SplitWords
              as="h2"
              text="Dari Dapur Kami"
              className="heading text-3xl sm:text-4xl lg:text-5xl"
            />
          </div>

          <Reveal delay={0.12}>
            <LayoutGroup id="menu-filter-tabs">
              <div
                role="tablist"
                aria-label="Filter kategori menu"
                className="-mx-5 flex min-w-0 gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:justify-end md:overflow-visible md:px-0"
              >
                {MENU_FILTERS.map((filter) => {
                  const active = filter === activeFilter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => chooseFilter(filter)}
                      className={cn(
                        'relative h-10 shrink-0 rounded-full px-7 text-xs font-bold transition-colors duration-300 ease-smooth',
                        active ? 'text-cream' : 'text-cocoa hover:text-ember',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-menu-filter"
                          className="absolute inset-0 rounded-full bg-ember shadow-[0_14px_30px_rgba(170,48,21,0.22)]"
                          transition={spring.soft}
                        />
                      )}
                      <span className="relative">{filter}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${page}`}
            variants={reduce ? undefined : staggerParent(0.09)}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'show'}
            exit={
              reduce
                ? undefined
                : {
                    opacity: 0,
                    y: 10,
                    transition: { duration: duration.fast, ease: ease.inOut },
                  }
            }
            className="grid min-h-[29rem] gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visibleItems.length > 0 ? (
              visibleItems.map((item) => (
                <MenuCard key={item.name} item={item} reduce={Boolean(reduce)} />
              ))
            ) : (
              <motion.div
                variants={reduce ? undefined : fadeUp}
                className="col-span-full grid min-h-[20rem] place-items-center rounded-2xl border border-blush/50 bg-cream/70 text-center"
              >
                <p className="max-w-sm text-sm font-semibold text-cocoa">
                  Menu untuk kategori ini belum tersedia.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <nav
            aria-label="Halaman menu"
            className="mt-9 flex items-center justify-center gap-3"
          >
            <PaginationButton
              label="Halaman sebelumnya"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <span aria-hidden>&lsaquo;</span>
            </PaginationButton>

            {pages.map((pageNumber) => (
              <PaginationButton
                key={pageNumber}
                label={`Halaman ${pageNumber}`}
                active={pageNumber === page}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </PaginationButton>
            ))}

            <PaginationButton
              label="Halaman berikutnya"
              disabled={page === totalPages}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            >
              <span aria-hidden>&rsaquo;</span>
            </PaginationButton>
          </nav>
        )}
      </div>
    </section>
  );
}

function MenuCard({
  item,
  reduce,
}: {
  item: MenuItem;
  reduce: boolean;
}) {
  return (
    <motion.article
      layout
      variants={reduce ? undefined : fadeUp}
      whileHover={reduce ? undefined : { y: -10 }}
      transition={spring.soft}
      className={cn(
        'group overflow-hidden rounded-[1.75rem] border border-blush/45 bg-white/90',
        'shadow-[0_24px_60px_rgba(89,65,60,0.08)] transition-colors duration-500 ease-smooth',
        'hover:border-ember/35 hover:bg-white',
      )}
    >
      <div className="relative aspect-[1.04/1] overflow-hidden bg-ember-soft">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />

        {item.badge && (
          <motion.span
            initial={reduce ? false : { opacity: 0, scale: 0.86 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: duration.fast, ease: ease.back }}
            className="absolute right-4 top-4 rounded-full bg-ember px-3 py-1 text-[10px] font-bold text-cream shadow-[0_10px_24px_rgba(170,48,21,0.24)]"
          >
            {item.badge}
          </motion.span>
        )}
      </div>

      <div className="p-6 pt-5">
        <h3 className="mb-3 text-sm font-extrabold tracking-tight text-ink">
          {item.name}
        </h3>

        <p className="line-clamp-2 min-h-[2.9rem] text-sm leading-relaxed text-cocoa/80">
          {item.description}
        </p>

        <span
          className={cn(
            'mt-5 flex h-11 w-full items-center justify-center rounded-full border border-blush/80',
            'bg-[#fffdf8] text-xs font-extrabold text-cocoa transition-colors duration-300 ease-smooth',
            'group-hover:border-ember/45 group-hover:text-ember',
          )}
        >
          {formatPrice(item.price)}
        </span>
      </div>
    </motion.article>
  );
}

function PaginationButton({
  active = false,
  disabled = false,
  label,
  children,
  onClick,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-full text-xs font-bold transition-[transform,background-color,color,opacity] duration-300 ease-smooth',
        active
          ? 'bg-ember text-cream shadow-[0_12px_26px_rgba(170,48,21,0.22)]'
          : 'text-cocoa/60 hover:bg-ember-soft hover:text-ember',
        disabled && 'cursor-not-allowed opacity-30',
        !disabled && 'active:translate-y-px',
      )}
    >
      {children}
    </button>
  );
}
