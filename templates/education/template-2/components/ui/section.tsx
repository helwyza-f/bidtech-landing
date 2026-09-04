import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  /** Set false untuk section yang mengelola padding vertikalnya sendiri (misal bootcamp gelap). */
  padded?: boolean;
};

/**
 * Wrapper py-* konsisten dipakai di semua 17 section, plus container 1240px.
 * Menjaga rhythm vertikal blueprint: 80-128px desktop.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, className, containerClassName, children, padded = true },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn("scroll-mt-24", padded && "py-20 md:py-28 lg:py-32", className)}
    >
      <div className={cn("mx-auto w-full max-w-shell px-4 sm:px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
});