"use client";

import Image from "next/image";
import {
  FiTrendingUp,
  FiGlobe,
  FiSmartphone,
  FiBell,
  FiUsers,
  FiSearch,
} from "react-icons/fi";
import { FaApple, FaGooglePlay } from "react-icons/fa";

import type { DecorativeIconName } from "./hero-data";
import { CUSTOM_ICON_OVERRIDES } from "./hero-data";

const DEFAULT_ICONS: Record<DecorativeIconName, React.ComponentType<{ className?: string }>> = {
  "trending-up": FiTrendingUp,
  globe: FiGlobe,
  smartphone: FiSmartphone,
  bell: FiBell,
  users: FiUsers,
  "search-check": FiSearch,
};

// ikon dekoratif bisa diganti lewat path SVG di hero-data tanpa mengubah renderer
export function HeroIcon({ name, className }: { name: DecorativeIconName; className?: string }) {
  const customSrc = CUSTOM_ICON_OVERRIDES[name];
  if (customSrc) {
    return (
      <span className={`relative inline-block ${className ?? "size-3"}`}>
        <Image src={customSrc} alt="" fill className="object-contain" />
      </span>
    );
  }

  const Icon = DEFAULT_ICONS[name];
  return <Icon className={className ?? "size-3"} />;
}

// badge App Store/Google Play memakai mekanisme pengganti yang sama dengan HeroIcon
export function AppStoreIcon({ className }: { className?: string }) {
  const customSrc = CUSTOM_ICON_OVERRIDES["apple-store"];
  if (customSrc) {
    return (
      <span className={`relative inline-block ${className ?? "size-4"}`}>
        <Image src={customSrc} alt="" fill className="object-contain" />
      </span>
    );
  }
  return <FaApple className={className ?? "size-4"} />;
}

export function GooglePlayIcon({ className }: { className?: string }) {
  const customSrc = CUSTOM_ICON_OVERRIDES["google-play"];
  if (customSrc) {
    return (
      <span className={`relative inline-block ${className ?? "size-4"}`}>
        <Image src={customSrc} alt="" fill className="object-contain" />
      </span>
    );
  }
  return <FaGooglePlay className={className ?? "size-4"} />;
}
