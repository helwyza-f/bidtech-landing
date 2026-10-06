"use client";

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface RevealTextProps {
  text: string
  textColor?: string
  overlayColor?: string
  className?: string
  letterDelay?: number
  overlayDelay?: number
  overlayDuration?: number
  springDuration?: number
  letterImages?: string[]
}

export function RevealText({
  text,
  textColor = 'text-foreground',
  overlayColor = 'text-brand-500',
  className,
  letterDelay = 0.08,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 600,
  letterImages = [],
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const lastLetterDelay = (text.length - 1) * letterDelay
    const totalDelay = lastLetterDelay * 1000 + springDuration
    const timer = setTimeout(() => setShowOverlay(true), totalDelay)
    return () => clearTimeout(timer)
  }, [text.length, letterDelay, springDuration])

  return (
    <span className={cn('inline-flex flex-nowrap whitespace-nowrap relative align-baseline select-none', className)}>
      {text.split('').map((letter, index) => {
        const image = letterImages[index % Math.max(1, letterImages.length)]
        return (
          <motion.span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="font-black tracking-tight cursor-pointer relative inline-flex items-center justify-center overflow-hidden shrink-0 whitespace-nowrap select-none"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: index * letterDelay,
              type: 'spring',
              damping: 8,
              stiffness: 200,
              mass: 0.8,
            }}
          >
            <motion.span
              className={cn('inline-block whitespace-nowrap select-none', textColor)}
              animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
              transition={{ duration: 0.1 }}
            >
              {letter}
            </motion.span>

            {image ? (
              <motion.span
                className="absolute inset-0 bg-clip-text bg-cover bg-no-repeat"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  backgroundPosition:
                    hoveredIndex === index ? '10% center' : '0% center',
                }}
                transition={{
                  opacity: { duration: 0.1 },
                  backgroundPosition: { duration: 3, ease: 'easeInOut' },
                }}
                style={{
                  backgroundImage: `url('${image}')`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {letter}
              </motion.span>
            ) : null}

            {showOverlay && (
              <motion.span
                className={cn(
                  'absolute inset-0 pointer-events-none',
                  overlayColor,
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: index * overlayDelay,
                  duration: overlayDuration,
                  times: [0, 0.1, 0.7, 1],
                  ease: 'easeInOut',
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        )
      })}
    </span>
  )
}
