"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { HaircutModel } from "@/data/haircuts";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

interface HaircutInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCut: HaircutModel;
  allCuts: HaircutModel[];
  onSelectCut: (cut: HaircutModel) => void;
  onBooking: (cutKey: string) => void;
}

export function HaircutInspectionModal({
  isOpen,
  onClose,
  activeCut,
  allCuts,
  onSelectCut,
  onBooking,
}: HaircutInspectionModalProps) {
  const { lenis } = useLenis();

  // Find index for prev/next navigation
  const currentIndex = allCuts.findIndex((c) => c.key === activeCut.key);
  const prevCut = allCuts[(currentIndex - 1 + allCuts.length) % allCuts.length];
  const nextCut = allCuts[(currentIndex + 1) % allCuts.length];

  // Freeze background scrolling when modal is active
  useEffect(() => {
    if (!isOpen) return;

    if (lenis) {
      lenis.stop();
    } else {
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onSelectCut(prevCut);
      } else if (e.key === "ArrowRight") {
        onSelectCut(nextCut);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (lenis) {
        lenis.start();
      } else {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, lenis, onClose, onSelectCut, prevCut, nextCut]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Inspection for ${activeCut.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Card Container */}
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#0E0E10] border border-zinc-800 text-zinc-100 flex flex-col overflow-hidden shadow-2xl select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon Lime Corner Drafting Brackets */}
        <span className="absolute -top-[1px] -left-[1px] text-[#D8F242] font-mono text-sm leading-none select-none z-30">
          ┌
        </span>
        <span className="absolute -top-[1px] -right-[1px] text-[#D8F242] font-mono text-sm leading-none select-none z-30">
          ┐
        </span>
        <span className="absolute -bottom-[1px] -left-[1px] text-[#D8F242] font-mono text-sm leading-none select-none z-30">
          └
        </span>
        <span className="absolute -bottom-[1px] -right-[1px] text-[#D8F242] font-mono text-sm leading-none select-none z-30">
          ┘
        </span>

        {/* Top Header Bar: Telemetry Status & Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-zinc-800 bg-[#121215] shrink-0">
          <div className="flex items-center space-x-2.5 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#D8F242] animate-pulse" />
            <span className="text-white font-bold">ARCHITECTURAL INSPECTOR</span>
            <span className="hidden sm:inline text-zinc-600">//</span>
            <span className="hidden sm:inline text-lime-400 font-semibold">
              SPEC #{activeCut.id} — {activeCut.specCode}
            </span>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <span className="hidden md:inline text-[10px] text-zinc-500 uppercase tracking-widest">
              [ ESC TO EXIT ]
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
              aria-label="Tutup jendela preview"
            >
              ✕ CLOSE
            </button>
          </div>
        </div>

        {/* Modal Main Content: Split 2-Column Desktop View */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Big Image Display with Navigation Arrows */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between bg-black/50 border-b lg:border-b-0 lg:border-r border-zinc-800/90 relative">
            {/* The Main High-Resolution Photo */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] bg-black overflow-hidden border border-zinc-800 rounded-[1px] group">
              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 z-10 bg-black/85 text-white font-mono text-[10px] font-bold px-3 py-1 tracking-wider uppercase border border-zinc-800">
                {activeCut.title}
              </div>

              <div className="absolute bottom-3 right-3 z-10 bg-[#D8F242] text-black font-mono text-xs font-bold px-3 py-1 tracking-wider uppercase shadow-lg">
                {activeCut.priceTag}
              </div>

              <Image
                src={activeCut.image}
                alt={activeCut.name}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover contrast-110"
                priority
              />

              {/* Architectural Crosshair Center Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity">
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-zinc-400/40" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-zinc-400/40" />
              </div>
            </div>

            {/* Previous & Next Navigation Controls */}
            <div className="flex items-center justify-between pt-4 font-mono text-xs">
              <button
                type="button"
                onClick={() => onSelectCut(prevCut)}
                className="inline-flex items-center gap-2 px-3 py-2 border border-zinc-800 hover:border-zinc-500 bg-zinc-900/60 text-zinc-300 hover:text-white uppercase tracking-wider transition-all"
              >
                <span>← PREV</span>
                <span className="hidden sm:inline text-zinc-500 text-[10px]">
                  ({prevCut.id})
                </span>
              </button>

              <span className="text-zinc-500 text-[11px] tracking-widest uppercase">
                MODEL {currentIndex + 1} / {allCuts.length}
              </span>

              <button
                type="button"
                onClick={() => onSelectCut(nextCut)}
                className="inline-flex items-center gap-2 px-3 py-2 border border-zinc-800 hover:border-zinc-500 bg-zinc-900/60 text-zinc-300 hover:text-white uppercase tracking-wider transition-all"
              >
                <span className="hidden sm:inline text-zinc-500 text-[10px]">
                  ({nextCut.id})
                </span>
                <span>NEXT →</span>
              </button>
            </div>
          </div>

          {/* Right Column: In-Depth Telemetry & Direct Booking */}
          <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between space-y-6 bg-[#0E0E10]">
            <div>
              {/* Title & Tag */}
              <div className="pb-3 border-b border-zinc-800">
                <span className="text-[#D8F242] font-mono text-xs uppercase tracking-widest block mb-1">
                  // {activeCut.tag}
                </span>
                <h3 className="font-display italic text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeCut.name}
                </h3>
                <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-wider">
                  {activeCut.subtitle}
                </p>
              </div>

              {/* Narrative Description */}
              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed mt-4">
                {activeCut.description}
              </p>

              {/* Technical Blueprint Data Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 font-mono text-xs">
                <div className="p-2.5 bg-zinc-900/60 border border-zinc-800/90 rounded-[1px]">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    BENTUK WAJAH
                  </span>
                  <span className="text-white font-bold block">
                    {activeCut.faceShape}
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-900/60 border border-zinc-800/90 rounded-[1px]">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    DURABILITAS BENTUK
                  </span>
                  <span className="text-[#D8F242] font-bold block">
                    {activeCut.durability}
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-900/60 border border-zinc-800/90 rounded-[1px]">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    BLADE SPECIFICATION
                  </span>
                  <span className="text-white font-bold block truncate">
                    {activeCut.bladeSpec}
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-900/60 border border-zinc-800/90 rounded-[1px]">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    FINISH COMPOUND
                  </span>
                  <span className="text-lime-400 font-bold block truncate">
                    {activeCut.finishCompound}
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-900/60 border border-zinc-800/90 rounded-[1px]">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    ESTIMASI DURASI
                  </span>
                  <span className="text-white font-bold block">
                    {activeCut.duration}
                  </span>
                </div>

                <div className="p-2.5 bg-zinc-900/60 border border-zinc-800/90 rounded-[1px]">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    BARBER TIER
                  </span>
                  <span className="text-white font-bold block">
                    {activeCut.specialist}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Booking Conversion Button */}
            <div className="pt-4 border-t border-zinc-800/90">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBooking(activeCut.key);
                }}
                className="w-full py-3.5 bg-[#D8F242] hover:bg-[#c6df37] text-black font-mono text-xs uppercase font-bold tracking-widest transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>LOCK IN THIS STYLE ({activeCut.priceFormatted}) [ → ]</span>
              </button>
              <p className="font-mono text-[10px] text-zinc-500 text-center uppercase tracking-widest mt-2">
                // JADWAL AKAN OTOMATIS TERISI PADA FORMULIR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
