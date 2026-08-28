'use client';

import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'slide-up' | 'slide-left' | 'blur-up' | 'image-up' | 'fade-in' | 'scale-up' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  animation = 'slide-up',
  delay = 0,
  duration,
  threshold = 0.1,
  once = true,
  className = '',
  as: Component = 'div',
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => {
      if (el && !once) {
        observer.unobserve(el);
      }
    };
  }, [threshold, once]);

  const animationClass = {
    'slide-up': 'animate-slide-up',
    'slide-left': 'animate-slide-left',
    'blur-up': 'animate-blur-up',
    'image-up': 'animate-image-up',
    'fade-in': 'animate-fade-in',
    'scale-up': 'animate-scale-up',
    'none': '',
  }[animation];

  const mergedStyle: React.CSSProperties = { ...style };
  if (isIntersecting) {
    if (delay && delay > 0) {
      mergedStyle.animationDelay = `${delay}ms`;
    }
    if (duration && duration > 0) {
      mergedStyle.animationDuration = `${duration}ms`;
    }
  }

  return (
    <Component
      ref={ref}
      className={`${className} ${isIntersecting ? animationClass : animation !== 'none' ? 'opacity-0' : ''}`}
      style={mergedStyle}
    >
      {children}
    </Component>
  );
}
