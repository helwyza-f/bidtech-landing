import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "lime" | "outline" | "pulse";
  pulseDot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  pulseDot = false,
  children,
  ...props
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] text-xs font-mono uppercase tracking-widest border";

  const variantClasses = {
    default:
      "[background-color:var(--bg-accent)] [border-color:var(--border-color)] [color:var(--text-main)]",
    lime:
      "[background-color:var(--accent-lime)] [border-color:var(--accent-lime)] [color:var(--accent-lime-fg)] font-bold",
    outline:
      "bg-transparent [border-color:var(--border-color)] [color:var(--text-muted)]",
    pulse:
      "[background-color:var(--bg-accent)] [border-color:var(--border-color)] [color:var(--text-main)]",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {pulseDot && (
        <span
          className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
          style={{ backgroundColor: "var(--accent-lime)" }}
        />
      )}
      {children}
    </div>
  );
}
