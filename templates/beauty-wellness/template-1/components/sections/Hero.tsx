"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { siteConfig } from "@/data/site";

import { Container } from "@/components/ui/Container";
import { Stats } from "@/components/sections/Stats";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}`;

  const duration = shouldReduceMotion ? 0 : 0.9;

  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "12%"]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 80]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, 0]
  );  

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[100svh]"
    >
      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden bg-black">
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : { y: backgroundY }
          }
          className="absolute -inset-[8%] will-change-transform"
        >
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scale: 1.08,
                  }
            }
            animate={{
              scale: 1,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={siteConfig.hero.image}
              alt="Interior gym modern dengan peralatan latihan profesional"
              fill
              priority
              quality={82}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* =====================================
          HERO CONTENT
      ====================================== */}

      <Container className="relative flex min-h-[100svh] items-center pb-40 pt-32 text-white md:pb-44 lg:pt-36">
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: contentY,
                  opacity: contentOpacity,
                }
          }
          className="w-full will-change-transform"
        >
          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration,
              delay: shouldReduceMotion
                ? 0
                : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-xs"
          >
            <span className="h-px w-8 bg-[var(--color-primary)]" />

            {siteConfig.hero.eyebrow}
          </motion.p>

          <div className="max-w-[1100px]">
            <div className="overflow-hidden">
              <motion.h1
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        y: "110%",
                      }
                }
                animate={{
                  y: 0,
                }}
                transition={{
                  duration,
                  delay: shouldReduceMotion
                    ? 0
                    : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-heading text-[clamp(3.4rem,8vw,8.3rem)] font-bold uppercase leading-[0.82] tracking-[-0.065em]"
              >
                {siteConfig.hero.title.first}
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        y: "110%",
                      }
                }
                animate={{
                  y: 0,
                }}
                transition={{
                  duration,
                  delay: shouldReduceMotion
                    ? 0
                    : 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-heading text-[clamp(3.4rem,8vw,8.3rem)] font-bold uppercase leading-[0.82] tracking-[-0.065em] text-[var(--color-primary)]"
              >
                {siteConfig.hero.title.second}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 0.75,
              delay: shouldReduceMotion
                ? 0
                : 0.58,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 max-w-xl md:mt-8"
          >
            <p className="text-sm leading-7 text-white/70 sm:text-base md:text-lg md:leading-8">
              {siteConfig.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "group inline-flex min-h-12",
                  "items-center justify-center gap-3",
                  "rounded-full",
                  "bg-[var(--color-primary)]",
                  "px-6 text-sm font-semibold",
                  "transition-all duration-300",
                  "hover:bg-[var(--color-primary-hover)]",
                  "sm:min-h-14 sm:px-7",
                ].join(" ")}
              >
                {siteConfig.hero.primaryCta.label}

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href={siteConfig.hero.secondaryCta.href}
                className={[
                  "group inline-flex min-h-12",
                  "items-center justify-center gap-3",
                  "rounded-full border border-white/30",
                  "bg-white/5 px-6",
                  "text-sm font-semibold",
                  "backdrop-blur-sm",
                  "transition-all duration-300",
                  "hover:border-white",
                  "hover:bg-white hover:text-black",
                  "sm:min-h-14 sm:px-7",
                ].join(" ")}
              >
                {siteConfig.hero.secondaryCta.label}

                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative vertical label */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: shouldReduceMotion
              ? 0
              : 1,
            duration: shouldReduceMotion
              ? 0
              : 0.6,
          }}
          className="absolute bottom-40 right-0 hidden items-center gap-3 xl:flex"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
            Scroll to explore
          </span>

          <span className="h-px w-12 bg-white/30" />
        </motion.div>

        {/* Stats floating panel */}
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2">
          <Container>
            <Stats />
          </Container>
        </div>
      </Container>
    </section>
  );
}