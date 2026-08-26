"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

export function StatCounter({ value, suffix = "", duration = 1200 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = window.requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [duration, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}
