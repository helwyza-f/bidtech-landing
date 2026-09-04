import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

/** Chip meta netral: level, durasi, kategori. */
export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-3 py-1 text-meta font-semibold text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Chip status aktif — dipakai hanya untuk hal yang benar-benar berubah (batch, deadline). */
export function SignalChip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill bg-signal/12 px-3 py-1 text-meta font-bold text-[#8a5c05]",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {children}
    </span>
  );
}
