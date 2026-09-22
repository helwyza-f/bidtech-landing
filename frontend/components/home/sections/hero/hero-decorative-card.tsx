"use client";

import { motion } from "motion/react";

import type { DecorativeCard } from "./hero-data";
import { HERO_TIMINGS } from "./hero-data";
import { PillCard } from "./hero-cards/pill-card";
import { ChartPanelCard } from "./hero-cards/chart-panel-card";
import { StoreBadgesCard } from "./hero-cards/store-badges-card";
import { AvatarStackCard } from "./hero-cards/avatar-stack-card";
import { MetricPanelCard } from "./hero-cards/metric-panel-card";
import { ThumbnailCard } from "./hero-cards/thumbnail-card";

type Props = {
  card: DecorativeCard;
  registerRef: (id: string, el: HTMLDivElement | null) => void;
};

// pilah berdasarkan kind agar tiap kartu punya renderer eksplisit dan tidak gagal diam-diam
export function HeroDecorativeCard({ card, registerRef }: Props) {
  return (
    <motion.div
      ref={(el) => registerRef(card.id, el)}
      className={`absolute ${card.position} ${card.zLayer === "front" ? "z-20" : "z-0"}`}
      style={{ opacity: 1, transform: "scale(1)" }} // fallback statis jika Motion/GSAP gagal di browser lama
      animate={{ y: [0, -HERO_TIMINGS.floatAmplitude, 0] }}
      transition={{
        duration: HERO_TIMINGS.floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Skala responsif pada kontainer dalam agar kartu mengecil sempurna dari layar HP hingga tablet */}
      <div className="origin-center scale-[0.60] min-[380px]:scale-[0.70] sm:scale-85 md:scale-95 lg:scale-100 transition-transform duration-200 pointer-events-none sm:pointer-events-auto">
        <CardByKind card={card} />
      </div>
    </motion.div>
  );
}

function CardByKind({ card }: { card: DecorativeCard }) {
  switch (card.kind) {
    case "pill":
      return <PillCard data={card} />;
    case "chart-panel":
      return <ChartPanelCard data={card} />;
    case "store-badges":
      return <StoreBadgesCard data={card} />;
    case "avatar-stack":
      return <AvatarStackCard data={card} />;
    case "metric-panel":
      return <MetricPanelCard data={card} />;
    case "thumbnail":
      return <ThumbnailCard data={card} />;
  }
}
