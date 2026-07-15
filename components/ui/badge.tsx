import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-lime-300",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
