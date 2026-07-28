"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Content is visible by default. It's only hidden briefly, client-side, for
  // elements that are off-screen at mount so they can fade in on scroll. If
  // client JS never runs (crash, old browser, etc.) the content stays visible
  // instead of getting stuck invisible forever.
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const rect = node.getBoundingClientRect();
    const isAlreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (isAlreadyInView) return;

    setAnimateIn(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimateIn(false);
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);

    const safetyTimer = window.setTimeout(() => setAnimateIn(false), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div
      className={className}
      ref={ref}
      style={{
        opacity: animateIn ? 0 : 1,
        transform: animateIn ? `translateY(${y}px)` : "translateY(0)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
