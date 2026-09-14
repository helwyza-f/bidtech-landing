import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-mono uppercase tracking-widest font-semibold transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none rounded-[2px]";

    const sizeClasses = {
      sm: "px-3 py-1.5 text-[11px]",
      md: "px-4 py-2 text-xs",
      lg: "px-6 py-3 text-xs tracking-[0.15em]",
    };

    const variantClasses = {
      primary:
        "border border-transparent hover:opacity-90 active:scale-[0.99] [background-color:var(--text-main)] [color:var(--bg-base)]",
      accent:
        "border border-lime-400 font-bold hover:opacity-95 active:scale-[0.99] [background-color:var(--accent-lime)] [color:var(--accent-lime-fg)]",
      outline:
        "border [border-color:var(--border-color)] [background-color:var(--bg-surface)] hover:border-lime-400 [color:var(--text-main)]",
      ghost:
        "border-transparent [color:var(--text-main)] hover:[background-color:var(--bg-accent)]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
