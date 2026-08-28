'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // duration in seconds, roughly translates to spring stiffness
  className?: string;
}

export default function CountUp({ end, suffix = '', prefix = '', duration = 2, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  
  // Create a motion value starting at 0
  const count = useMotionValue(0);
  
  // Use a spring for a smooth, natural deceleration
  const spring = useSpring(count, {
    damping: 30,
    stiffness: 100 / duration, // Adjust stiffness based on desired duration
    mass: 1
  });

  useEffect(() => {
    if (isInView) {
      count.set(end);
    }
  }, [isInView, count, end]);

  useEffect(() => {
    // Listen to the spring value and update the text content of the ref element
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix]);

  return <motion.span ref={ref} className={className} />;
}
