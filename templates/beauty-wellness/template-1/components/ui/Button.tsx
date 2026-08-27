import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "dark";
  showArrow?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3",
        "rounded-full px-6 text-sm font-semibold",
        "transition-all duration-300 ease-out",

        variant === "primary" &&
          "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",

        variant === "outline" &&
          "border border-current bg-transparent hover:bg-black hover:text-white",

        variant === "dark" &&
          "bg-black text-white hover:bg-[var(--color-primary)]",

        className
      )}
    >
      <span>{children}</span>

      {showArrow && (
        <ArrowUpRight
          size={17}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}