"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { mainNav } from "@/lib/data/navigation";
import { useLockScroll } from "@/lib/hooks/use-lock-scroll";

type SiteHeaderProps = {
  onOpenConsult: () => void;
};

export function SiteHeader({ onOpenConsult }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useLockScroll(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4"
      >
        <motion.nav
          aria-label="Navigasi utama"
          animate={{
            width: scrolled ? "min(1120px, 100%)" : "min(1240px, 100%)",
            height: scrolled ? 58 : 68,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center justify-between rounded-[22px] border px-5 backdrop-blur-lg md:px-6 ${
            scrolled
              ? "border-line bg-white/90 shadow-float backdrop-blur-xl"
              : "border-white/70 bg-white/80 shadow-[0_16px_45px_rgba(35,52,105,.05)]"
          }`}
        >
          <a
            href="#"
            className="flex items-center gap-2.5 rounded-md text-left focus-visible:outline-none"
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-lg font-bold text-white shadow-sm">
              <span className="tracking-tight">N</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-extrabold tracking-tight text-foreground">
                Nivora<span className="text-brand">.</span>
              </span>
              <span className="-mt-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-soft">
                Academy
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
            {mainNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 rounded py-1 transition-colors hover:text-brand"
              >
                {item.label}
                {item.highlight && <span className="h-1.5 w-1.5 rounded-full bg-signal" />}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConsult}
              className="hidden h-11 items-center gap-2 rounded-pill bg-brand px-5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(52,91,214,.25)] transition-colors hover:bg-brand-dark active:scale-[0.98] sm:inline-flex"
            >
              <span>Konsultasi gratis</span>
              <ArrowUpRight size={15} />
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-foreground transition hover:border-brand/40 lg:hidden"
              aria-label="Buka menu navigasi"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-start bg-ink/40 px-4 pb-6 pt-24 backdrop-blur-sm lg:hidden"
          >
            <div className="space-y-4 rounded-card border border-line bg-surface p-6 shadow-2xl">
              <div className="flex flex-col gap-1 text-base font-semibold text-foreground">
                {mainNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between border-b border-line/60 py-2.5 last:border-b-0 ${
                      item.highlight ? "text-brand" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.highlight && (
                        <span className="rounded-full bg-signal/15 px-2 py-0.5 text-xs font-bold text-[#b07316]">
                          Batch 07
                        </span>
                      )}
                    </span>
                    <ChevronRight size={16} className="text-muted-soft" />
                  </a>
                ))}
              </div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenConsult();
                }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand text-sm font-semibold text-white shadow-lg shadow-brand/20"
              >
                <span>Konsultasi jalur karier</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}