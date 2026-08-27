import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-5 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-[var(--color-primary)]" />

          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.24em] sm:text-xs",
              light ? "text-white/55" : "text-black/50"
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "font-heading text-[clamp(2.7rem,5.5vw,5.5rem)]",
          "font-bold uppercase leading-[0.9]",
          "tracking-[-0.055em]",
          light ? "text-white" : "text-black"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-sm leading-7 md:text-base",
            align === "center" && "mx-auto",
            light ? "text-white/60" : "text-black/55"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}