"use client";

import { useEffect } from "react";

/**
 * Kunci scroll body saat menu mobile / modal terbuka, dengan kompensasi
 * lebar scrollbar supaya layout tidak "loncat" (blueprint navbar, poin 2).
 */
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const original = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = original.overflow;
      document.body.style.paddingRight = original.paddingRight;
    };
  }, [locked]);
}
