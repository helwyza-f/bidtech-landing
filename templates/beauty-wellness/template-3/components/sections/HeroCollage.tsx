"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface HeroCardItem {
  id: string;
  name: string;
  price: string;
  frameColor: string;
  badge: {
    text: string;
    bg: string;
    textColor: string;
    position: string;
  };
  image: string;
  alt: string;
  rotation: string;
  targetRotDeg: number;
  positionClasses: string;
  sizeClasses: string;
  imgHeightClasses: string;
  textColorClasses: string;
  subText?: string;
  zIndex: number;
  parallaxFactor: number;
  toss: {
    x: number;
    y: number;
    rot: number;
  };
  tapePosition?: "top-left" | "top-center" | "bottom-right" | "none";
  extraBadge?: {
    text: string;
    type: "barcode" | "stamp";
    className: string;
  };
}

const collageCards: HeroCardItem[] = [
  {
    id: "card-1",
    name: "COMMA HAIR",
    price: "130K",
    frameColor: "#EAB308",
    badge: {
      text: "SPEC #01",
      bg: "bg-black/90",
      textColor: "text-white",
      position: "top-1.5 left-1.5",
    },
    image: "/images/bidtech/rambut 1.webp",
    alt: "Comma Hair Cut",
    rotation: "-rotate-12",
    targetRotDeg: -12,
    positionClasses: "top-[6%] left-[4%] sm:left-[7%] md:left-[9%]",
    sizeClasses: "w-[185px] sm:w-[220px] md:w-[240px]",
    imgHeightClasses: "h-[175px] sm:h-[205px] md:h-[225px]",
    textColorClasses: "text-black",
    zIndex: 15,
    parallaxFactor: 16,
    toss: { x: -160, y: -140, rot: -36 },
    tapePosition: "top-left",
  },
  {
    id: "card-2",
    name: "RAZOR FADE",
    price: "120K",
    frameColor: "#2563EB",
    badge: {
      text: "0.0MM BLADE",
      bg: "bg-[#E11D48]",
      textColor: "text-white",
      position: "bottom-2 right-2",
    },
    image: "/images/bidtech/rambut 2.webp",
    alt: "Razor Fade",
    rotation: "rotate-6",
    targetRotDeg: 6,
    positionClasses: "top-[48%] left-[7%] sm:left-[11%] md:left-[14%]",
    sizeClasses: "w-[190px] sm:w-[225px] md:w-[250px]",
    imgHeightClasses: "h-[170px] sm:h-[200px] md:h-[220px]",
    textColorClasses: "text-white",
    zIndex: 25,
    parallaxFactor: 14,
    toss: { x: -140, y: 130, rot: 25 },
    extraBadge: {
      text: "|||| ||||| ||| ||| 002-FADE",
      type: "barcode",
      className:
        "absolute -bottom-2.5 left-3 z-30 bg-white text-black font-mono text-[8px] font-bold px-1.5 py-0.5 shadow border border-zinc-400 select-none tracking-tighter",
    },
  },
  {
    id: "card-3",
    name: "GROOMING / SCULPT",
    price: "SIGNATURE",
    frameColor: "#D8F242",
    badge: {
      text: "SIGNATURE #01",
      bg: "bg-black",
      textColor: "text-[#D8F242]",
      position: "top-2 left-2",
    },
    image: "/images/bidtech/rambut 3.webp",
    alt: "Grooming & Sculpting",
    rotation: "-rotate-1",
    targetRotDeg: -1,
    positionClasses: "top-[8%] left-[30%] sm:left-[33%] md:left-[34%]",
    sizeClasses: "w-[250px] sm:w-[295px] md:w-[325px]",
    imgHeightClasses: "h-[235px] sm:h-[280px] md:h-[310px]",
    textColorClasses: "text-black",
    zIndex: 20,
    parallaxFactor: 8,
    toss: { x: 0, y: -180, rot: -12 },
    tapePosition: "top-center",
  },
  {
    id: "card-4",
    name: "TWO-BLOCK NATURAL",
    price: "130K",
    frameColor: "#141417",
    badge: {
      text: "CALIBRATED",
      bg: "bg-white",
      textColor: "text-black",
      position: "bottom-2 left-2",
    },
    image: "/images/bidtech/rambut 4.webp",
    alt: "Two-Block Natural",
    rotation: "-rotate-6",
    targetRotDeg: -6,
    positionClasses: "top-[46%] right-[7%] sm:right-[11%] md:right-[14%]",
    sizeClasses: "w-[195px] sm:w-[235px] md:w-[260px]",
    imgHeightClasses: "h-[175px] sm:h-[210px] md:h-[235px]",
    textColorClasses: "text-zinc-300",
    zIndex: 35,
    parallaxFactor: 12,
    toss: { x: 140, y: 140, rot: -22 },
    tapePosition: "bottom-right",
  },
  {
    id: "card-5",
    name: "MODERN MULLET",
    price: "140K",
    frameColor: "#E11D48",
    badge: {
      text: "VOL.05",
      bg: "bg-white",
      textColor: "text-[#E11D48]",
      position: "top-2 right-2",
    },
    image: "/images/bidtech/rambut 5.webp",
    alt: "Modern Mullet Cut",
    rotation: "rotate-12",
    targetRotDeg: 12,
    positionClasses: "top-[5%] right-[4%] sm:right-[7%] md:right-[9%]",
    sizeClasses: "w-[185px] sm:w-[220px] md:w-[245px]",
    imgHeightClasses: "h-[170px] sm:h-[205px] md:h-[225px]",
    textColorClasses: "text-white",
    zIndex: 18,
    parallaxFactor: 16,
    toss: { x: 160, y: -140, rot: 38 },
    extraBadge: {
      text: "CONFIDENTIAL // SPEC #05",
      type: "stamp",
      className:
        "absolute -top-3 -right-2 z-30 border border-[#E11D48] text-[#E11D48] bg-black/90 font-mono text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rotate-6 shadow select-none",
    },
  },
];

export function HeroCollage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatingTweensRef = useRef<gsap.core.Tween[]>([]);
  // Mobile layout state: default is "grid" so all 5 images are immediately visible
  const [mobileView, setMobileView] = useState<"grid" | "swipe">("grid");

  useEffect(() => {
    // Only mount GSAP stage physics on desktop / tablet screens
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      const validWrappers = cardWrappersRef.current.filter(Boolean) as HTMLDivElement[];

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Chaotic Toss Entry (Scatter onto table physics)
      validWrappers.forEach((wrapper, i) => {
        const card = collageCards[i];
        if (!card) return;

        tl.from(
          wrapper,
          {
            x: card.toss.x,
            y: card.toss.y,
            rotation: card.toss.rot,
            scale: 0.75,
            opacity: 0,
            duration: 1.05,
            ease: "back.out(1.5)",
          },
          i * 0.08
        );
      });

      // Stamp in the central tape decal and drafting elements
      tl.from(
        ".tape-sticker, .ephemera-item",
        {
          scale: 1.6,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(2)",
        },
        "-=0.4"
      );

      // 2. Asynchronous Organic Floating Physics (subtle rotational & vertical drift)
      tl.add(() => {
        validWrappers.forEach((wrapper, i) => {
          if (!wrapper) return;
          const floatOffsetY = i % 2 === 0 ? 6 : -6;
          const floatOffsetRot = i % 2 === 0 ? 1.4 : -1.4;

          const tween = gsap.to(wrapper, {
            y: `+=${floatOffsetY}`,
            rotation: `+=${floatOffsetRot}`,
            duration: 3.4 + (i % 3) * 0.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
          floatingTweensRef.current.push(tween);
        });
      });

      // 3. Multi-plane Interactive Mouse Parallax (Depth layers)
      const handleMouseMove = (e: MouseEvent) => {
        const rect = stage.getBoundingClientRect();
        const mouseXRel = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const mouseYRel = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        validWrappers.forEach((wrapper, i) => {
          if (!wrapper) return;
          const factor = collageCards[i]?.parallaxFactor || 12;
          gsap.to(wrapper, {
            x: mouseXRel * factor,
            y: mouseYRel * (factor * 0.7),
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const handleMouseLeave = () => {
        validWrappers.forEach((wrapper) => {
          if (!wrapper) return;
          gsap.to(wrapper, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      stage.addEventListener("mousemove", handleMouseMove);
      stage.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        stage.removeEventListener("mousemove", handleMouseMove);
        stage.removeEventListener("mouseleave", handleMouseLeave);
        floatingTweensRef.current.forEach((t) => t.kill());
      };
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative w-full rounded-[2px] border border-zinc-300 dark:border-zinc-800/90 overflow-hidden bg-[#EBEBE6] dark:bg-[#111113] select-none shadow-xl dark:shadow-2xl transition-colors"
    >
      {/* 4 Corner Technical Framing Markers (Desktop Only) */}
      <div className="hidden md:flex corner-marker absolute top-3 left-4 font-mono text-[11px] text-zinc-500 tracking-wider items-center gap-2 select-none z-10">
        <span>┌ CROP_01 // JKT_SOUTH</span>
      </div>
      <div className="hidden md:block corner-marker absolute top-3 right-4 font-mono text-[11px] text-zinc-500 tracking-wider select-none z-10">
        <span>FRAME_INDEX_2025 ┐</span>
      </div>
      <div className="hidden md:block corner-marker absolute bottom-3 left-4 font-mono text-[11px] text-zinc-500 tracking-wider select-none z-10">
        <span>└ TELEMETRY_GRID</span>
      </div>
      <div className="hidden md:block corner-marker absolute bottom-3 right-4 font-mono text-[11px] text-zinc-500 tracking-wider select-none z-10">
        <span>ISO_400 // SHARP ┘</span>
      </div>

      {/* DESKTOP STAGE (hidden on mobile, visible on md+) */}
      <div id="heroCollageStage" className="hidden md:block relative w-full h-[600px] md:h-[640px] p-4">
        {/* Background Abstract Blueprint Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.04] dark:opacity-[0.07]">
          <span className="font-mono font-black text-7xl sm:text-9xl tracking-[0.25em] text-zinc-950 dark:text-white whitespace-nowrap -rotate-6">
            PRECISION ARCHIVE
          </span>
        </div>

        {/* CAD Dimension Ephemera Lines */}
        <div className="hidden lg:flex ephemera-item absolute top-[27%] left-[23%] font-mono text-[9px] text-zinc-500 dark:text-zinc-400 items-center gap-1.5 z-20 select-none pointer-events-none">
          <span>|←</span>
          <span className="w-10 h-px bg-zinc-400 dark:bg-zinc-600 inline-block" />
          <span>38mm FRINGE →|</span>
        </div>

        <div className="hidden lg:flex ephemera-item absolute bottom-[30%] right-[32%] font-mono text-[9px] text-[#658200] dark:text-[#D8F242] items-center gap-1.5 z-40 select-none pointer-events-none bg-white/90 dark:bg-black/85 px-2 py-0.5 border border-[#658200]/40 dark:border-[#D8F242]/50 backdrop-blur-xs shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#658200] dark:bg-[#D8F242] animate-ping" />
          <span>∡ 30° CRANIAL ANGLE</span>
        </div>

        {/* 5 Overlapping Abstract Cards */}
        {collageCards.map((card, index) => {
          return (
            <div
              key={card.id}
              ref={(el) => {
                cardWrappersRef.current[index] = el;
              }}
              className={`absolute ${card.positionClasses} will-change-transform`}
              style={{ zIndex: card.zIndex }}
            >
              {/* Relative wrapper for tape decals and stamps */}
              <div className="relative group/card">
                {/* Masking Tape Decals */}
                {card.tapePosition === "top-left" && (
                  <div className="tape-sticker absolute -top-3 -left-3 w-16 h-4 bg-amber-100/90 dark:bg-amber-100/35 -rotate-45 border-l-2 border-r-2 border-dashed border-black/30 shadow-md pointer-events-none z-40 backdrop-blur-[1px]" />
                )}
                {card.tapePosition === "top-center" && (
                  <div className="tape-sticker absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/85 dark:bg-white/25 rotate-1 border-l-2 border-r-2 border-dashed border-black/30 shadow-md pointer-events-none z-40 backdrop-blur-[1px]" />
                )}
                {card.tapePosition === "bottom-right" && (
                  <div className="tape-sticker absolute -bottom-3 -right-2 w-16 h-4 bg-amber-100/90 dark:bg-amber-100/35 rotate-45 border-l-2 border-r-2 border-dashed border-black/30 shadow-md pointer-events-none z-40 backdrop-blur-[1px]" />
                )}

                {/* Extra Decal Stamp / Barcode */}
                {card.extraBadge && (
                  <div className={card.extraBadge.className}>
                    {card.extraBadge.text}
                  </div>
                )}

                {/* Main Card */}
                <div
                  className={`hero-card ${card.sizeClasses} ${card.rotation} p-2 sm:p-2.5 rounded-[2px] shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:z-50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]`}
                  style={{ backgroundColor: card.frameColor }}
                >
                  <div
                    className={`relative w-full ${card.imgHeightClasses} bg-black overflow-hidden rounded-[1px] mb-1.5`}
                  >
                    <span
                      className={`absolute ${card.badge.position} z-10 ${card.badge.bg} ${card.badge.textColor} font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-[1px] tracking-widest uppercase`}
                    >
                      {card.badge.text}
                    </span>
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 180px, 320px"
                      className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div
                    className={`flex items-center justify-between font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-0.5 ${card.textColorClasses}`}
                  >
                    <span>{card.name}</span>
                    <span>{card.price}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Diagonal Centerpiece Tape Decal on Desktop */}
        <div
          className="tape-sticker absolute top-[57%] left-[48%] sm:left-[49%] -translate-x-1/2 -rotate-8 bg-white text-zinc-950 font-mono text-[10px] sm:text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-[1px] z-50 select-none shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex items-center gap-1.5 border border-zinc-300 whitespace-nowrap will-change-transform"
        >
          <span className="text-amber-500">★</span>
          <span>JAKARTA BEST FADE 2025</span>
        </div>
      </div>

      {/* MOBILE DISPLAY (visible only on mobile < md) */}
      <div className="block md:hidden relative w-full pt-3.5 pb-3.5 px-3.5">
        {/* Mobile Telemetry Bar with Grid/Slide Toggle */}
        <div className="flex items-center justify-between font-mono text-[10px] mb-3 px-0.5">
          <div className="flex items-center gap-1.5 text-[#D8F242]">
            <span className="w-1.5 h-1.5 bg-[#D8F242] inline-block animate-pulse" />
            <span className="font-bold tracking-wider">ALL ARCHIVES (05)</span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-[1px]">
            <button
              type="button"
              onClick={() => setMobileView("grid")}
              className={`px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider transition-colors ${
                mobileView === "grid"
                  ? "bg-[#D8F242] text-black font-extrabold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ⊞ GRID (SEMUA)
            </button>
            <button
              type="button"
              onClick={() => setMobileView("swipe")}
              className={`px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider transition-colors ${
                mobileView === "swipe"
                  ? "bg-[#D8F242] text-black font-extrabold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ⇄ SLIDE
            </button>
          </div>
        </div>

        {/* 1. 2-COLUMN GRID VIEW (ALL 5 IMAGES VISIBLE SIMULTANEOUSLY) */}
        {mobileView === "grid" ? (
          <div className="grid grid-cols-2 gap-2 pb-2">
            {collageCards.map((card, idx) => (
              <div
                key={card.id}
                className={`p-2 rounded-[2px] shadow-lg transition-transform active:scale-[0.98] ${
                  idx === 4 ? "col-span-2 max-w-[260px] mx-auto w-full" : ""
                }`}
                style={{ backgroundColor: card.frameColor }}
              >
                <div className="relative w-full h-[155px] bg-black overflow-hidden rounded-[1px] mb-1.5">
                  <span
                    className={`absolute ${card.badge.position} z-10 ${card.badge.bg} ${card.badge.textColor} font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-[1px] tracking-widest uppercase`}
                  >
                    {card.badge.text}
                  </span>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 180px, 200px"
                    className="object-cover grayscale contrast-125"
                    priority={idx < 4}
                  />
                </div>

                <div
                  className={`flex items-center justify-between font-mono font-bold text-[10px] uppercase tracking-wider px-0.5 ${card.textColorClasses}`}
                >
                  <span className="truncate pr-1">{card.name}</span>
                  <span className="flex-shrink-0 text-[9px]">{card.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 2. HORIZONTAL TOUCH SNAP SLIDER VIEW */
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-4 px-1 no-scrollbar -mx-3.5 px-3.5">
            {collageCards.map((card, idx) => (
              <div
                key={card.id}
                className="snap-center shrink-0 w-[230px] p-2.5 rounded-[2px] shadow-lg transition-transform active:scale-[0.98]"
                style={{ backgroundColor: card.frameColor }}
              >
                <div className="relative w-full h-[210px] bg-black overflow-hidden rounded-[1px] mb-2">
                  <span
                    className={`absolute ${card.badge.position} z-10 ${card.badge.bg} ${card.badge.textColor} font-mono text-[9px] font-bold px-2 py-0.5 rounded-[1px] tracking-widest uppercase`}
                  >
                    {card.badge.text}
                  </span>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="230px"
                    className="object-cover grayscale contrast-125"
                    priority={idx < 2}
                  />
                </div>

                <div
                  className={`flex items-center justify-between font-mono font-bold text-[11px] uppercase tracking-wider px-0.5 ${card.textColorClasses}`}
                >
                  <span className="truncate pr-1">{card.name}</span>
                  <span className="flex-shrink-0">{card.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Decal & Telemetry on Mobile */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 mt-1">
          <div className="inline-flex items-center gap-1.5 bg-white text-black font-mono text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded-[1px] shadow">
            <span className="text-amber-500">★</span>
            <span>JAKARTA BEST FADE 2025</span>
          </div>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            {mobileView === "grid" ? "5/5 DISPLAYED" : "TOUCH TO EXPAND"}
          </span>
        </div>
      </div>
    </div>
  );
}
