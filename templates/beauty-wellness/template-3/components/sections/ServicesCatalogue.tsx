"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { haircutsData, HaircutModel } from "@/data/haircuts";
import { HaircutInspectionModal } from "./HaircutInspectionModal";

interface ServicesCatalogueProps {
  onSelectCut?: (cutKey: string) => void;
}

/**
 * SplitTextHover: High-fashion character-by-character kinetic flip animation on row hover.
 * Optimized with md:group-hover so mobile touch devices render crisp stable text without duplicate artifacts.
 */
function SplitTextHover({ text, isActive }: { text: string; isActive?: boolean }) {
  const characters = text.split("");

  return (
    <span className="inline-flex overflow-hidden py-0.5 select-none">
      {characters.map((char, index) => {
        if (char === " ") {
          return (
            <span key={index} className="inline-block w-[0.28em]">
              &nbsp;
            </span>
          );
        }

        return (
          <span key={index} className="relative inline-block overflow-hidden">
            {/* Primary character */}
            <span
              className={`inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:-translate-y-full ${
                isActive ? "text-[#658200] dark:text-[#D8F242]" : "text-zinc-950 dark:text-white"
              }`}
              style={{ transitionDelay: `${index * 16}ms` }}
            >
              {char}
            </span>

            {/* Bottom rolling duplicate character in Neon Lime (Active only on md+ desktop hover) */}
            <span
              className="hidden md:inline-block absolute top-0 left-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full md:group-hover:translate-y-0 text-[#658200] dark:text-[#D8F242]"
              style={{ transitionDelay: `${index * 16}ms` }}
              aria-hidden="true"
            >
              {char}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function ServicesCatalogue({ onSelectCut }: ServicesCatalogueProps) {
  const [selectedCut, setSelectedCut] = useState<HaircutModel>(haircutsData[0]);
  const [mobileExpandedKey, setMobileExpandedKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const serviceRowsRef = useRef<HTMLDivElement>(null);
  const previewCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header & Section title slide-up
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // 2. Service rows staggered entry
      if (serviceRowsRef.current) {
        gsap.fromTo(
          serviceRowsRef.current.children,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: serviceRowsRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      // 3. Desktop Preview card entrance
      if (previewCardRef.current) {
        gsap.fromTo(
          previewCardRef.current,
          { scale: 0.96, opacity: 0, y: 16 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: previewCardRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (cut: HaircutModel) => {
    setSelectedCut(cut);
    if (onSelectCut) onSelectCut(cut.key);

    // Toggle expansion for mobile
    setMobileExpandedKey((prev) => (prev === cut.key ? null : cut.key));
  };

  const handleOpenModal = (cut?: HaircutModel) => {
    if (cut) {
      setSelectedCut(cut);
      if (onSelectCut) onSelectCut(cut.key);
    }
    setIsModalOpen(true);
  };

  const handleBookingJump = (cutKey: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("agak-rapi-select-cut", { detail: { cutKey } })
      );
    }

    const reservasiEl = document.getElementById("reservasi");
    if (reservasiEl) {
      reservasiEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="layanan"
      className="py-16 md:py-28 bg-[#F6F6F2] dark:bg-[#0B0B0C] border-b border-zinc-300 dark:border-zinc-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef}>
          {/* Top Header Badge */}
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase font-semibold text-[#658200] dark:text-[#A4CE22] select-none mb-3">
            <span className="w-2 h-2 bg-[#D8F242] inline-block" />
            <span>VOL. 04 — SELECTED CUTS</span>
          </div>

          {/* Section Heading & Subtitle Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 sm:pb-12 border-b border-zinc-300/80 dark:border-zinc-800/80 gap-4 sm:gap-6">
            <div>
              <h2 className="font-display italic text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-zinc-950 dark:text-white">
                Arsitektur rambut <br />
                berpresisi tinggi.
              </h2>
            </div>
            <p className="font-mono text-[11px] sm:text-xs text-zinc-500 tracking-wider uppercase select-none pb-1 md:text-right">
              [ TAP SERVICE TO EXPAND ARCHIVE SPEC ]
            </p>
          </div>
        </div>

        {/* Dual Column: Interactive List vs Preview Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6 sm:mt-12">
          {/* Left Column: Haircut Rows with Inline Mobile Accordion Expansion */}
          <div
            ref={serviceRowsRef}
            className="lg:col-span-7 divide-y divide-zinc-300/70 dark:divide-zinc-800/70 border-t border-b border-zinc-300/70 dark:border-zinc-800/70"
          >
            {haircutsData.map((cut) => {
              const isSelected = selectedCut.key === cut.key;
              const isMobileExpanded = mobileExpandedKey === cut.key;

              return (
                <div key={cut.id} className="transition-all">
                  {/* Service Row Button */}
                  <div
                    onClick={() => handleSelect(cut)}
                    className={`group p-4 sm:py-6 sm:px-5 flex items-center justify-between cursor-pointer transition-all duration-200 select-none ${
                      isSelected
                        ? "bg-zinc-200/80 dark:bg-zinc-900/60"
                        : "hover:bg-zinc-200/40 dark:hover:bg-zinc-900/20 active:bg-zinc-200/60 dark:active:bg-zinc-900/40"
                    }`}
                  >
                    {/* Left: ID Number + Title + Subtitle */}
                    <div className="flex items-start space-x-3.5 sm:space-x-6 min-w-0 pr-3">
                      <span
                        className={`font-mono text-xs sm:text-sm pt-1 transition-colors ${
                          isSelected
                            ? "text-[#658200] dark:text-[#A4CE22] font-bold"
                            : "text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300"
                        }`}
                      >
                        {cut.id}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-display uppercase text-lg sm:text-2xl font-bold tracking-tight">
                            <SplitTextHover text={cut.title} isActive={isSelected} />
                          </h3>
                        </div>
                        <p className="font-mono text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 mt-1 truncate">
                          {cut.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right: Price and Action Arrow */}
                    <div className="flex items-center space-x-4 shrink-0 font-mono">
                      <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-200">
                        {cut.priceFormatted}
                      </span>
                      <span
                        className={`text-xs transition-transform duration-200 ${
                          isSelected
                            ? "text-[#658200] dark:text-[#A4CE22] translate-x-1"
                            : "text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 group-hover:translate-x-0.5"
                        }`}
                      >
                        {isSelected ? "[ ▾ ]" : "[ → ]"}
                      </span>
                    </div>
                  </div>

                  {/* INLINE MOBILE ACCORDION PREVIEW (Active on mobile < lg when selected) */}
                  {isSelected && (
                    <div className="lg:hidden p-4 bg-white dark:bg-[#0E0E10] border-t border-b border-zinc-200 dark:border-zinc-800 relative animate-in fade-in duration-200">
                      {/* Technical Brackets */}
                      <span className="absolute top-1 left-1 text-[#D8F242] font-mono text-xs select-none">┌</span>
                      <span className="absolute top-1 right-1 text-[#D8F242] font-mono text-xs select-none">┐</span>
                      <span className="absolute bottom-1 left-1 text-[#D8F242] font-mono text-xs select-none">└</span>
                      <span className="absolute bottom-1 right-1 text-[#D8F242] font-mono text-xs select-none">┘</span>

                      {/* Header Telemetry */}
                      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-200 dark:border-zinc-800 text-[10px] font-mono uppercase tracking-wider select-none">
                        <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#D8F242] inline-block" />
                          ARCHIVE SPEC: {cut.id}
                        </span>
                        <span className="text-lime-600 dark:text-[#A4CE22] font-bold">READY TO CUT</span>
                      </div>

                      {/* Image Container (Clickable to Inspect Full Photo) */}
                      <div
                        onClick={() => handleOpenModal(cut)}
                        className="relative w-full aspect-[4/3] bg-zinc-100 dark:bg-black overflow-hidden mb-3 border border-zinc-300 dark:border-zinc-800 cursor-zoom-in group/img"
                        role="button"
                        tabIndex={0}
                        aria-label={`Inspect ${cut.name} full photo`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleOpenModal(cut);
                          }
                        }}
                      >
                        <Image
                          src={cut.image}
                          alt={cut.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover contrast-110 group-hover/img:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 z-10 bg-black/85 text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                          {cut.title}
                        </div>
                        <div className="absolute bottom-2 right-2 z-10 bg-[#D8F242] text-black font-mono text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider">
                          {cut.priceTag}
                        </div>

                        {/* Hover/Tap Overlay Indicator */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                          <span className="font-mono text-[9px] uppercase tracking-widest bg-black/90 text-[#D8F242] border border-[#D8F242]/70 px-2.5 py-1 flex items-center gap-1.5 shadow-md">
                            <span>[ ⤢ TAP TO INSPECT ]</span>
                          </span>
                        </div>
                      </div>

                      {/* 2x2 Technical Specs */}
                      <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px] mb-3">
                        <div className="p-2 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
                          <span className="text-zinc-500 block text-[9px] uppercase">BLADE SPEC</span>
                          <span className="text-zinc-900 dark:text-white font-bold block truncate">{cut.bladeSpec}</span>
                        </div>
                        <div className="p-2 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
                          <span className="text-zinc-500 block text-[9px] uppercase">FINISH COMPOUND</span>
                          <span className="text-lime-600 dark:text-[#A4CE22] font-bold block truncate">{cut.finishCompound}</span>
                        </div>
                        <div className="p-2 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
                          <span className="text-zinc-500 block text-[9px] uppercase">DURATION</span>
                          <span className="text-zinc-900 dark:text-white font-bold block">{cut.duration}</span>
                        </div>
                        <div className="p-2 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
                          <span className="text-zinc-500 block text-[9px] uppercase">SPECIALIST</span>
                          <span className="text-zinc-900 dark:text-white font-bold block">{cut.specialist}</span>
                        </div>
                      </div>

                      {/* Direct CTA */}
                      <button
                        type="button"
                        onClick={() => handleBookingJump(cut.key)}
                        className="w-full py-2.5 bg-[#0E0E10] text-white dark:bg-white dark:text-black font-mono text-xs uppercase font-bold tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                      >
                        <span>LOCK IN THIS STYLE [ → ]</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Preview Module Active (Sticky Spec Panel for Desktop / Large Screens) */}
          <div
            ref={previewCardRef}
            className="hidden lg:block lg:col-span-5 p-5 sm:p-6 bg-white dark:bg-[#0E0E10] border border-zinc-200 dark:border-zinc-800/80 sticky top-24 relative shadow-lg dark:shadow-2xl will-change-transform"
          >
            {/* 4 Corner Technical Brackets in Neon Lime */}
            <span className="absolute -top-[1px] -left-[1px] text-[#D8F242] font-mono text-sm leading-none select-none">
              ┌
            </span>
            <span className="absolute -top-[1px] -right-[1px] text-[#D8F242] font-mono text-sm leading-none select-none">
              ┐
            </span>
            <span className="absolute -bottom-[1px] -left-[1px] text-[#D8F242] font-mono text-sm leading-none select-none">
              └
            </span>
            <span className="absolute -bottom-[1px] -right-[1px] text-[#D8F242] font-mono text-sm leading-none select-none">
              ┘
            </span>

            {/* Header Telemetry of Module */}
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-mono uppercase tracking-wider select-none">
              <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400">
                <span className="w-2 h-2 bg-[#D8F242] inline-block" />
                <span>PREVIEW MODULE ACTIVE</span>
              </div>
              <span className="text-lime-600 dark:text-[#A4CE22] font-bold">
                SPEC: {selectedCut.id} // ARCHIVE
              </span>
            </div>

            {/* Main Portrait Image Container (Clickable to Inspect Full Photo) */}
            <div
              onClick={() => handleOpenModal(selectedCut)}
              className="relative w-full aspect-[3/4] bg-zinc-100 dark:bg-black overflow-hidden my-4 border border-zinc-300 dark:border-zinc-800/90 rounded-[1px] cursor-zoom-in group/img"
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${selectedCut.name} full photo`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleOpenModal(selectedCut);
                }
              }}
            >
              {/* Top-Left Cut Tag Badge */}
              <div className="absolute top-2.5 left-2.5 z-10 bg-black/85 text-white font-mono text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase rounded-[1px]">
                {selectedCut.title}
              </div>

              {/* Bottom-Right Price Badge */}
              <div className="absolute bottom-2.5 right-2.5 z-10 bg-[#D8F242] text-black font-mono text-xs font-bold px-2.5 py-1 tracking-wider uppercase rounded-[1px]">
                {selectedCut.priceTag}
              </div>

              <Image
                src={selectedCut.image}
                alt={selectedCut.name}
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover contrast-115 group-hover/img:scale-105 transition-all duration-500"
                priority
              />

              {/* Hover Overlay with Inspect Badge */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20 pointer-events-none">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest bg-black/90 text-[#D8F242] border border-[#D8F242]/70 px-3 py-1.5 flex items-center gap-2 shadow-xl backdrop-blur-xs">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M11 8v6" />
                    <path d="M8 11h6" />
                  </svg>
                  <span>[ ⤢ INSPECT ARCHIVE ]</span>
                </span>
              </div>
            </div>

            {/* 2x2 Technical Specification Grid */}
            <div className="grid grid-cols-2 gap-2 mt-4 font-mono">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-[1px]">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-1">
                  BLADE SPEC
                </span>
                <span className="text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-wider block truncate">
                  {selectedCut.bladeSpec}
                </span>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-[1px]">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-1">
                  FINISH COMPOUND
                </span>
                <span className="text-lime-600 dark:text-[#A4CE22] text-xs font-bold uppercase tracking-wider block truncate">
                  {selectedCut.finishCompound}
                </span>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-[1px]">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-1">
                  DURATION
                </span>
                <span className="text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-wider block">
                  {selectedCut.duration}
                </span>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-[1px]">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-1">
                  BARBER SPECIALIST
                </span>
                <span className="text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-wider block">
                  {selectedCut.specialist}
                </span>
              </div>
            </div>

            {/* Bottom CTA Button: LOCK IN THIS STYLE */}
            <button
              type="button"
              onClick={() => handleBookingJump(selectedCut.key)}
              className="w-full mt-3.5 py-3.5 bg-[#0E0E10] text-white dark:bg-white dark:text-black font-mono text-xs uppercase font-bold tracking-widest rounded-none hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
            >
              <span>LOCK IN THIS STYLE [ → ]</span>
            </button>
          </div>
        </div>
      </div>

      {/* Architectural Blueprint Inspection Modal (Option A) */}
      <HaircutInspectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeCut={selectedCut}
        allCuts={haircutsData}
        onSelectCut={(cut) => setSelectedCut(cut)}
        onBooking={(cutKey) => handleBookingJump(cutKey)}
      />
    </section>
  );
}
