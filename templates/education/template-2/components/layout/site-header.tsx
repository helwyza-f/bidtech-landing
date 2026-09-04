"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useEffect, useState } from "react";

import { navLinks } from "@/lib/data/home";
import { nivoraAssets } from "@/lib/data/asset-paths";


export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <header className="fixed left-0 top-4 z-50 w-full px-4">
      <motion.div
        animate={{
          width: scrolled ? "min(1120px,calc(100%-32px))" : "min(1240px,calc(100%-32px))",
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`mx-auto flex items-center justify-between rounded-[22px] border px-5 transition-all duration-300 ${scrolled ? "min-h-[58px] border-slate-200 bg-white/90 shadow-[0_18px_55px_rgba(31,50,112,.13)] backdrop-blur-xl" : "min-h-[68px] border-white/70 bg-white/70 shadow-[0_16px_45px_rgba(35,52,105,.05)] backdrop-blur-lg"}`}
      >

        <Link href="/" className="flex items-center">
          <motion.div
            animate={{
              width: scrolled ? 126 : 144,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <Image
              src={nivoraAssets.brand.logoPrimary}
              alt="Nivora Academy"
              width={144}
              height={40}
              priority
              className="h-auto w-full"
            />
          </motion.div>
        </Link>


        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>


        <div className="flex items-center gap-3">
          <motion.a
            href="#mulai"
            className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 text-xs font-bold text-white shadow-[0_10px_28px_rgba(52,91,214,.22)] transition-colors hover:bg-blue-700 md:inline-flex"
            initial={false}
            animate={{
              height: scrolled ? 40 : 44,
            }}
            transition={{
              height: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            Mulai Belajar
            <ArrowUpRight size={15} />
          </motion.a>


          <button
            onClick={() => setOpen((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-3 rounded-[22px] border border-slate-200 bg-white/95 p-3 shadow-[0_48px_140px_rgba(31,50,112,.16)] backdrop-blur-xl lg:hidden"
          >
            <nav className="grid gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="#mulai"
              className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white"
            >
              Mulai Belajar
              <ArrowUpRight size={16} />
            </Link>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}