"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TypewriterPhase = "idle" | "typing" | "holding-cursor" | "settled" | "untyping";

type UseTypewriterOptions = {
  typeMsPerChar: number;
  untypeMsPerChar: number;
  /** durasi kursor tetap berkedip setelah mengetik selesai */
  cursorHoldMs: number;
};

// mengatur alur ketik -> tahan kursor sebentar -> stabil, lalu hapus ketikan saat transisi
export function useTypewriter({ typeMsPerChar, untypeMsPerChar, cursorHoldMs }: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(false);

  const fullTextRef = useRef("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const type = useCallback(
    (text: string, onComplete?: () => void) => {
      clearTimer();
      fullTextRef.current = text;
      setCursorVisible(true);

      let i = 0;
      const step = () => {
        i += 1;
        setDisplayText(text.slice(0, i));
        if (i < text.length) {
          timeoutRef.current = setTimeout(step, typeMsPerChar);
        } else {
          timeoutRef.current = setTimeout(() => {
            setCursorVisible(false);
            onComplete?.();
          }, cursorHoldMs);
        }
      };
      timeoutRef.current = setTimeout(step, typeMsPerChar);
    },
    [typeMsPerChar, cursorHoldMs]
  );

  const untype = useCallback(
    (onComplete?: () => void) => {
      clearTimer();
      const text = fullTextRef.current;
      setCursorVisible(true);

      let i = text.length;
      const step = () => {
        i -= 1;
        setDisplayText(text.slice(0, Math.max(i, 0)));
        if (i > 0) {
          timeoutRef.current = setTimeout(step, untypeMsPerChar);
        } else {
          setCursorVisible(false);
          onComplete?.();
        }
      };
      timeoutRef.current = setTimeout(step, untypeMsPerChar);
    },
    [untypeMsPerChar]
  );

  return { displayText, cursorVisible, type, untype };
}
