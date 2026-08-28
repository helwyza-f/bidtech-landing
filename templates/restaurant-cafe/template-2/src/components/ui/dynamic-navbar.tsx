"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface DynamicNavbarProps {
  brand?: string;
  items?: NavItem[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

const defaultItems: NavItem[] = [
  { label: "Categories", href: "#categories" },
  { label: "Dishes", href: "#dishes" },
  { label: "Menu", href: "#menu" },
  { label: "Story", href: "#story" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function DynamicNavbar({
  brand = "Deny Restaurant",
  items = defaultItems,
  ctaLabel = "Order",
  onCtaClick,
  className,
}: DynamicNavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element | string, opts?: { offset?: number; duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("fixed top-4 left-1/2 -translate-x-1/2 z-50", className)}
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        scale: hovered ? 1.04 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 28,
        delay: 0.4,
        scale: { type: "spring", stiffness: 380, damping: 24, delay: 0 },
      }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-[28px] pointer-events-none -z-10"
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1.15 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        style={{
          background:
            "radial-gradient(closest-side, rgb(255 90 31 / 0.35), transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <motion.div
        className={cn(
          "relative overflow-hidden border",
          scrolled
            ? "bg-background/80 border-border shadow-xl"
            : "bg-background/60 border-border/60 shadow-lg",
          hovered ? "backdrop-blur-2xl" : "backdrop-blur-xl",
        )}
        animate={{
          borderRadius: open ? 24 : 9999,
          width: open ? 320 : "auto",
          boxShadow: hovered
            ? "0 20px 50px -12px rgb(0 0 0 / 0.25), 0 0 0 1px rgb(255 90 31 / 0.15)"
            : "0 10px 30px -8px rgb(0 0 0 / 0.18)",
        }}
        transition={{
          borderRadius: {
            duration: 0.3,
            ease: easeOut,
            delay: open ? 0 : 0.32,
          },
          width: {
            type: "spring",
            stiffness: 380,
            damping: 36,
            mass: 0.9,
            delay: open ? 0 : 0.32,
          },
          boxShadow: { duration: 0.25 },
        }}
      >
        <div className="flex items-center gap-1 px-2 py-2">
          <span className="font-display font-bold text-sm sm:text-base px-2.5 sm:px-3 py-1.5 text-foreground select-none cursor-default whitespace-nowrap">
            {brand}
          </span>

          <span className="hidden md:flex items-center gap-1 mx-1">
            <span className="h-4 w-px bg-border" />
            {items.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:backdrop-blur-md transition-colors rounded-full"
              >
                {item.label}
              </motion.a>
            ))}
            <span className="h-4 w-px bg-border" />
          </span>

          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="hidden md:inline-flex items-center justify-center size-8 rounded-full text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4 text-gray-700" />
            )}
          </motion.button>

          <motion.button
            onClick={onCtaClick}
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-brand-500 hover:text-primary-foreground hover:shadow-glow transition-colors"
          >
            <ShoppingBag className="size-3.5" strokeWidth={2.5} />
            {ctaLabel}
          </motion.button>

          <motion.button
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.92 }}
            className="md:hidden ml-auto relative flex items-center justify-center size-9 rounded-full text-foreground hover:bg-muted"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence initial={false} mode="wait">
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18, ease: easeOut }}
                  className="absolute"
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18, ease: easeOut }}
                  className="absolute"
                >
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-panel"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{
                duration: 0.3,
                ease: easeOut,
                delay: 0.18,
              }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-3 pb-3 pt-1 flex flex-col gap-1">
                <div className="h-px bg-border mx-1 mb-1" />
                {items.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      setOpen(false);
                      handleNavClick(e, item.href);
                    }}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{
                      duration: 0.22,
                      ease: easeOut,
                      delay: 0.22 + 0.04 * i,
                    }}
                    className="px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}

                <div className="flex items-center justify-between px-3 py-2 my-1 rounded-xl bg-muted/60">
                  <span className="text-xs font-medium text-foreground">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-background text-foreground shadow-xs cursor-pointer"
                  >
                    {isDark ? <Sun className="size-3.5 text-amber-400" /> : <Moon className="size-3.5 text-gray-700" />}
                    {isDark ? "Dark" : "Light"}
                  </button>
                </div>

                <motion.button
                  onClick={() => {
                    setOpen(false);
                    onCtaClick?.();
                  }}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    duration: 0.22,
                    ease: easeOut,
                    delay: 0.22 + 0.04 * items.length,
                  }}
                  className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-brand-500 hover:text-primary-foreground transition-colors"
                >
                  <ShoppingBag className="size-4" strokeWidth={2.5} />
                  {ctaLabel}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}
