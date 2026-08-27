"use client";

import { motion, type Variants } from 'framer-motion'
import type { CSSProperties } from 'react'

export interface StackCardItem {
  src: string
  alt: string
  hueA: number
  hueB: number
}

interface ScrollTriggeredProps {
  items: StackCardItem[]
}

const containerVariants: Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const cardVariants: Variants = {
  offscreen: { y: 200, opacity: 0, rotate: -14 },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: -6,
    transition: {
      type: 'spring',
      bounce: 0.45,
      duration: 0.9,
    },
  },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

const cardContainer: CSSProperties = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1 1 0',
  minWidth: 220,
  paddingTop: 20,
}

const splashStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
  opacity: 0.85,
}

const cardStyle: CSSProperties = {
  width: '100%',
  maxWidth: 260,
  aspectRatio: '3 / 4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  background: '#f5f5f5',
  boxShadow:
    '0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)',
  transformOrigin: '10% 60%',
  overflow: 'hidden',
  padding: 24,
  position: 'relative',
  zIndex: 1,
}

interface CardProps {
  item: StackCardItem
}

function Card({ item }: CardProps) {
  const background = `linear-gradient(306deg, ${hue(item.hueA)}, ${hue(item.hueB)})`

  return (
    <div style={cardContainer}>
      <div style={{ ...splashStyle, background }} />
      <motion.div style={cardStyle} variants={cardVariants}>
        <img
          src={item.src}
          alt={item.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          draggable={false}
        />
      </motion.div>
    </div>
  )
}

export function ScrollTriggered({ items }: ScrollTriggeredProps) {
  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4 my-16 md:my-24 flex flex-row flex-wrap justify-center items-end gap-4 md:gap-6"
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
    >
      {items.map((item, i) => (
        <Card item={item} key={item.src + i} />
      ))}
    </motion.div>
  )
}
