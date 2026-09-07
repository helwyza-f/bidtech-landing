import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Arah & kecepatan. "normal" ke kiri, "reverse" ke kanan, "slow" lebih lambat. */
  speed?: "normal" | "slow" | "reverse";
  className?: string;
  /** Override class track dalam (termasuk padding kiri default pl-4 sm:pl-6) — dipakai saat Marquee sudah ada di dalam container yang sudah punya padding sendiri, misal di dalam Hero. */
  trackClassName?: string;
  ariaLabel: string;
};

/**
 * Loop CSS murni (bukan JS) supaya tidak memakan frame budget ScrollTrigger.
 * Konten harus diduplikasi 2x oleh pemanggil; salinan kedua ditandai aria-hidden.
 */
export function Marquee({ children, speed = "normal", className, trackClassName, ariaLabel }: MarqueeProps) {
  const animationClass =
    speed === "slow" ? "animate-marquee-slow" : speed === "reverse" ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div
      tabIndex={0}
      aria-label={ariaLabel}
      className={cn(
        "marquee-mask relative w-full overflow-hidden focus:outline-none",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max items-center gap-10 pl-4 sm:pl-6 md:gap-16 motion-reduce:animate-none",
          animationClass,
          "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]",
          trackClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}