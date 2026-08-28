"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const sectionIds = siteConfig.navigation
      .map((item) => item.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1));

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(
        (section): section is HTMLElement =>
          section !== null
      );

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find(
          (entry) => entry.isIntersecting
        );

        if (!activeEntry) return;

        setActiveSection(
          `#${activeEntry.target.id}`
        );
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isMenuOpen]);  

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-all duration-500",

          isScrolled
            ? [
                "border-b border-white/10",
                "bg-[#0b0b0b]/80",
                "py-3",
                "text-white",
                "backdrop-blur-xl",
              ]
            : [
                "bg-transparent",
                "py-5",
                "text-white",
              ]
        )}
      >
        <div className="site-container flex items-center justify-between">
          <Link
            href="#top"
            aria-label={`${siteConfig.brand.name} homepage`}
            className="relative z-50 font-heading text-xl font-bold tracking-[-0.04em] md:text-2xl"
          >
            {siteConfig.brand.name}
          </Link>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Main navigation"
          >
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative text-[13px] font-medium",
                  "transition-colors duration-300",

                  "after:absolute after:-bottom-2 after:left-0",
                  "after:h-px",
                  "after:bg-[var(--color-primary)]",
                  "after:transition-all after:duration-300",

                  activeSection === item.href
                    ? "text-white after:w-full"
                    : "text-white/65 after:w-0 hover:text-white hover:after:w-full"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group inline-flex items-center gap-2",
                "rounded-full",
                "bg-[var(--color-primary)]",
                "px-5 py-3",
                "text-xs font-semibold uppercase tracking-[0.08em]",
                "text-white",
                "transition-all duration-300",
                "hover:bg-[var(--color-primary-hover)]"
              )}
            >
              Daftar

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <button
            type="button"
            aria-label={
              isMenuOpen ? "Tutup menu" : "Buka menu"
            }
            aria-expanded={isMenuOpen}
            onClick={() =>
              setIsMenuOpen((current) => !current)
            }
            className="relative z-50 flex size-11 items-center justify-center rounded-full border border-white/20 lg:hidden"
          >
            {isMenuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="fixed inset-0 z-40 bg-[#0b0b0b] text-white lg:hidden"
          >
            <div className="site-container flex h-full flex-col justify-center">
              <nav className="flex flex-col">
                {siteConfig.navigation.map(
                  (item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        y: 32,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.08 + index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() =>
                          setIsMenuOpen(false)
                        }
                        className="group flex items-end justify-between border-b border-white/10 py-4"
                      >
                        <span className="font-heading text-[clamp(2.4rem,11vw,4.5rem)] font-semibold uppercase leading-none tracking-[-0.055em]">
                          {item.label}
                        </span>

                        <span className="mb-1 font-heading text-[10px] font-semibold tracking-[0.2em] text-[var(--color-primary)]">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                }}
                className="mt-10"
              >
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold"
                >
                  Mulai Membership
                  <ArrowUpRight size={17} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}