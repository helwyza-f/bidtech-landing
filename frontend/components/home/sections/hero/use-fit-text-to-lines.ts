"use client";

import { useLayoutEffect, useRef, useState } from "react";

type UseFitTextToLinesOptions = {
  /** teks acuan; pakai judul terpanjang agar ukuran stabil di semua slide */
  text: string;
  maxLines: number;
  minFontSizePx: number;
  maxFontSizePx: number;
};

// cari ukuran font terbesar yang muat maxLines; ukur saat mount/ubah ukuran, bukan tiap ketikan
export function useFitTextToLines({
  text,
  maxLines,
  minFontSizePx,
  maxFontSizePx,
}: UseFitTextToLinesOptions) {
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [fontSizePx, setFontSizePx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const lineHeightMultiplier = 1.15; // sesuai leading-tight Tailwind

    const fits = (size: number) => {
      el.style.fontSize = `${size}px`;
      el.style.lineHeight = String(lineHeightMultiplier);
      // bandingkan tinggi konten dengan batas tinggi maxLines pada ukuran ini
      const maxAllowedHeight = size * lineHeightMultiplier * maxLines + 1; // toleransi pembulatan 1px
      return el.scrollHeight <= maxAllowedHeight;
    };

    const measure = () => {
      let lo = minFontSizePx;
      let hi = maxFontSizePx;
      // jika ukuran minimum masih overflow, pakai minimum agar pencarian berhenti
      if (!fits(lo)) {
        setFontSizePx(lo);
        return;
      }
      while (hi - lo > 1) {
        const mid = Math.floor((lo + hi) / 2);
        if (fits(mid)) {
          lo = mid;
        } else {
          hi = mid;
        }
      }
      setFontSizePx(lo);
    };

    measure();

    // ukur ulang setelah web font siap karena font cadangan punya lebar karakter berbeda
    let didRemeasureForFonts = false;
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (!didRemeasureForFonts) {
          didRemeasureForFonts = true;
          measure();
        }
      });
    }

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(el);
    return () => {
      didRemeasureForFonts = true; // cegah callback fonts.ready setelah unmount
      resizeObserver.disconnect();
    };
  }, [text, maxLines, minFontSizePx, maxFontSizePx]);

  return { measureRef, fontSizePx };
}
