import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[22px] border border-lime-300/15 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-[28px]",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 sm:p-6 md:p-7", className)} {...props} />;
}

export { Card, CardContent };
