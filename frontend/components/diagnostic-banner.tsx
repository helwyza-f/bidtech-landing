"use client";

import { useEffect } from "react";

// Temporary diagnostic aid: proves whether React successfully hydrated on a
// given device. Marks the <html> element once mounted; the inline bootstrap
// script in the root layout checks this flag after a timeout and shows a
// visible on-page banner (with the actual JS error, if any) when it's still
// missing. Safe to remove once the underlying device issue is understood.
export function DiagnosticBanner() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "1";
    const banner = document.getElementById("__diag_banner");
    if (banner) banner.remove();
  }, []);

  return null;
}
