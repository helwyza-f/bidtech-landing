import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "on-dark" | "icon";

const variantClass: Record<Variant, string> = {
  primary:
    "inline-flex h-12 items-center gap-2 rounded-pill bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.22)] transition-colors duration-ui hover:bg-brand-dark active:scale-[0.98]",
  secondary:
    "inline-flex h-12 items-center gap-2.5 rounded-pill border border-line bg-surface px-5 text-sm font-semibold text-foreground transition-colors duration-ui hover:border-brand/40 hover:text-brand",
  ghost:
    "inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-ui hover:text-brand",
  "on-dark":
    "inline-flex h-12 items-center gap-2 rounded-pill bg-white px-6 text-sm font-semibold text-ink transition-colors duration-ui hover:bg-white/90",
  icon: "grid h-11 w-11 place-items-center rounded-pill border border-line bg-surface text-foreground transition-colors duration-ui hover:border-brand/40",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Tombol dengan lima varian per blueprint 5.1. Merender <a> jika `href`
 * diberikan, selain itu <button>. Label harus menyatakan aksi
 * ("Lihat jalur belajar"), bukan generik ("Selengkapnya").
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    const classes = cn(variantClass[variant], className);

    if ("href" in props && props.href) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
