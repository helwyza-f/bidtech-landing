import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  draftingGrid?: boolean;
}

export function Card({ className, draftingGrid = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[4px] border transition-colors",
        draftingGrid ? "bg-drafting-grid" : "",
        "[background-color:var(--bg-surface)] [border-color:var(--border-color)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
