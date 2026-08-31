"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CraftsmanshipProps {
  lang: "en" | "id";
  onOpenBlueprint: (prop?: any) => void;
}

const GALLERY_PROJECTS = [
  {
    id: "g1",
    num: "01",
    name: "Night Facade Villa",
    location: "Zurich, Switzerland",
    category: "Cantilever Monolith",
    year: "2024",
    area: "940 m²",
    image: "/images/craft-1.webp",
  },
  {
    id: "g2",
    num: "02",
    name: "Double Height Atrium",
    location: "Palm Jumeirah, Dubai",
    category: "Minimalist Lightwell",
    year: "2024",
    area: "1,650 m²",
    image: "/images/craft-2.webp",
  },
  {
    id: "g3",
    num: "03",
    name: "Glass Villa Pavilion",
    location: "Emirates Hills, Dubai",
    category: "Garden Enclave",
    year: "2023",
    area: "2,100 m²",
    image: "/images/craft-3.webp",
  },
  {
    id: "g4",
    num: "04",
    name: "Living Suite & Pool",
    location: "Downtown Dubai",
    category: "Panoramic Sky Suite",
    year: "2024",
    area: "980 m²",
    image: "/images/craft-4.webp",
  },
];

export default function Craftsmanship({ lang, onOpenBlueprint }: CraftsmanshipProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const totalProjects = GALLERY_PROJECTS.length;

  const handleSelectCard = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  }, [totalProjects]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
  }, [totalProjects]);

  // GSAP ScrollTrigger Entrance Reveal
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set(".gallery-anim-elem, .gallery-card-item", { opacity: 1, y: 0, x: 0, scale: 1 });
        return;
      }

      // Initial States
      gsap.set(".gallery-anim-elem", { opacity: 0, y: 28 });
      gsap.set(".gallery-heading-line", { yPercent: 100, opacity: 0 });
      gsap.set(".gallery-card-item", {
        opacity: 0,
        y: isMobile ? 25 : 0,
        x: isMobile ? 0 : 50,
        scale: 0.96,
      });

      // Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Left Typography Reveal
      tl.to(
        ".gallery-eyebrow",
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        0
      );

      tl.to(
        ".gallery-heading-line",
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power4.out" },
        0.1
      );

      tl.to(
        ".gallery-desc",
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        0.25
      );

      tl.to(
        ".gallery-explore",
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        0.35
      );

      tl.to(
        ".gallery-controls",
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        0.45
      );

      // Right 4 Cards Cascading Entrance
      tl.to(
        ".gallery-card-item",
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.15
      );
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const formattedActive = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalProjects).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-16 sm:py-20 md:py-28 bg-white text-neutral-900 border-b border-[#E5E7EB] overflow-hidden select-none"
    >
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & Dynamic Counter */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6 z-20 relative bg-white pr-2">
            <div className="space-y-4">
              <div className="gallery-eyebrow gallery-anim-elem">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase block">
                  {lang === "en" ? "GALLERY" : "GALERI"}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-neutral-900 leading-[1.18]">
                <div className="overflow-hidden">
                  <div className="gallery-heading-line">
                    {lang === "en" ? "A glimpse of" : "Sekilas karya"}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="gallery-heading-line">
                    {lang === "en" ? "our craftsmanship." : "arsitektur kami."}
                  </div>
                </div>
              </h2>

              <p className="gallery-desc gallery-anim-elem text-sm text-neutral-600 leading-relaxed font-normal max-w-sm">
                {lang === "en"
                  ? "An interactive architectural collection. Tap or click any card to expand and explore its spatial design."
                  : "Koleksi arsitektur interaktif. Ketuk kartu mana pun untuk memperluas dan menjelajahi detail spasialnya."}
              </p>

              {/* Explore Gallery Action */}
              <div className="gallery-explore gallery-anim-elem pt-2">
                <Link
                  href="#properties"
                  className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  <span className="underline decoration-1 underline-offset-4">
                    {lang === "en" ? "EXPLORE GALLERY" : "JELAJAHI GALERI"}
                  </span>
                  <div className="w-6 h-6 rounded-full border border-neutral-300 group-hover:border-neutral-900 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Pagination Controls & Counter */}
            <div className="gallery-controls gallery-anim-elem pt-6 sm:pt-8 border-t border-neutral-200/80 flex items-center justify-between">
              {/* Counter 01 / 04 */}
              <div className="flex items-baseline gap-1.5 font-mono text-sm tracking-widest">
                <span className="text-2xl font-bold text-neutral-900 tabular-numbers">
                  {formattedActive}
                </span>
                <span className="text-neutral-400 font-light">/</span>
                <span className="text-neutral-400 font-medium tabular-numbers">
                  {formattedTotal}
                </span>
              </div>

              {/* Arrow Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
                  aria-label="Previous Image"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-neutral-900 text-white hover:bg-black flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
                  aria-label="Next Image"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 4 Architectural Expanding Cards (Vertical on Mobile, Horizontal on Desktop) */}
          <div className="lg:col-span-8 xl:col-span-9 z-10 relative">
            {/* Responsive Flex Accordion Stage: Column on Mobile, Row on Desktop */}
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5 w-full md:h-[440px] items-stretch">
              {GALLERY_PROJECTS.map((project, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (isActive) {
                        onOpenBlueprint(project);
                      } else {
                        handleSelectCard(idx);
                      }
                    }}
                    className={`gallery-card-item group relative rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 shadow-md cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none border border-neutral-100 will-change-transform ${
                      isActive
                        ? "h-[290px] sm:h-[330px] md:h-auto md:flex-[3.5] ring-2 ring-neutral-900/10 shadow-xl"
                        : "h-[68px] sm:h-[76px] md:h-auto md:flex-[1] opacity-90 md:opacity-85 hover:opacity-100 hover:scale-[1.01]"
                    }`}
                  >
                    {/* Architectural Image */}
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className={`object-cover transition-transform duration-700 ease-out ${
                        isActive ? "scale-100" : "scale-105 group-hover:scale-110"
                      }`}
                      priority={idx === 0}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isActive
                          ? "bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-100"
                          : "bg-black/50 md:bg-black/30 group-hover:bg-black/40 opacity-100"
                      }`}
                    />

                    {/* TOP LEFT PILL: Number badge */}
                    <div className={`absolute z-10 transition-all duration-300 ${
                      isActive ? "top-4 left-4" : "top-3.5 left-3.5 md:top-4 md:left-4"
                    }`}>
                      <span
                        className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm transition-all duration-300 ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-black/70 backdrop-blur-sm text-white border border-white/20"
                        }`}
                      >
                        {project.num}
                      </span>
                    </div>

                    {/* MOBILE INACTIVE COMPACT VIEW (Horizontal Bar when inactive on mobile) */}
                    {!isActive && (
                      <div className="md:hidden absolute inset-0 flex items-center justify-between pl-14 pr-4 z-10">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-white tracking-tight leading-tight line-clamp-1">
                            {project.name}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-300">
                            {project.location}
                          </span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}

                    {/* ACTIVE CARD CONTENT (Fluid Reveal on both Mobile & Desktop) */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white z-10 transition-all duration-500 flex flex-col justify-end ${
                        isActive
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <div className="flex items-end justify-between gap-3 sm:gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase block">
                            {project.category}
                          </span>
                          <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-snug">
                            {project.name}
                          </h3>
                          <p className="text-xs text-neutral-300 font-mono">
                            {project.location} • {project.area}
                          </p>
                        </div>

                        {/* View Blueprint Trigger Pill */}
                        <div className="flex items-center gap-1.5 sm:gap-2 bg-white text-black hover:bg-neutral-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-lg transition-transform group-hover:scale-105 shrink-0">
                          <span className="hidden sm:inline">
                            {lang === "en" ? "VIEW BLUEPRINT" : "LIHAT DENAH"}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* DESKTOP INACTIVE CARD TITLE HINT (Vertical text when compact on desktop) */}
                    <div
                      className={`hidden md:block absolute bottom-4 left-4 z-10 transition-opacity duration-300 ${
                        isActive ? "opacity-0 pointer-events-none" : "opacity-90 group-hover:opacity-100"
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-white tracking-wider uppercase drop-shadow line-clamp-1">
                        {project.name.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
