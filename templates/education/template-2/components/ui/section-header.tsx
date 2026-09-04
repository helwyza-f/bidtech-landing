import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Opsional, default TIDAK dipakai. Hanya untuk section yang benar-benar memuat data (mis. "12 kelas · 4 jalur"). */
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

/**
 * Header section dipakai ulang di seluruh halaman. Eyebrow sengaja opsional
 * dan default kosong — blueprint 3.1 melarang eyebrow ALL-CAPS dekoratif
 * yang tidak membawa data.
 */
export function SectionHeader({
  title,
  description,
  eyebrow,
  align = "left",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-10 grid gap-5 md:mb-14",
        isCenter
          ? "mx-auto max-w-[36ch] text-center"
          : "lg:grid-cols-[1.05fr_.75fr] lg:items-end lg:gap-16",
        className
      )}
    >
      <div>
        {eyebrow && (
          <span className="mb-2 block text-sm font-semibold text-brand">{eyebrow}</span>
        )}
        <h2
          className={cn(
            "text-display-lg font-semibold text-foreground",
            !isCenter && "max-w-[18ch]",
            titleClassName
          )}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p className={cn("text-body-lg text-muted", isCenter ? "mx-auto" : "max-w-prose")}>
          {description}
        </p>
      )}
    </div>
  );
}
