"use client";

import { motion } from 'framer-motion'
import { CardStack, type CardStackItem } from '@/components/ui/card-stack'
import { RevealText } from '@/components/ui/reveal-text'
import { DynamicTextSlider } from '@/components/ui/dynamic-text-slider'

const dishImages = [
  'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
]

const dishes: CardStackItem[] = [
  {
    id: 1,
    title: 'Margherita Classica',
    description: 'San Marzano tomato, buffalo mozzarella, fresh basil',
    tag: 'Signature',
    imageSrc:
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Double Smash',
    description: 'Two beef patties, aged cheddar, secret sauce, brioche',
    tag: 'Best Seller',
    imageSrc:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Truffle Pepperoni',
    description: 'Calabrian pepperoni, truffle oil, smoked mozzarella',
    tag: 'Chef Pick',
    imageSrc:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Mushroom Bacon',
    description: 'Porcini, crispy bacon, gruyère, caramelized onion',
    tag: 'Limited',
    imageSrc:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: 'Pasta al Tartufo',
    description: 'Hand-rolled tagliatelle, butter, parmigiano, black truffle',
    tag: 'Seasonal',
    imageSrc:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: 'Tiramisu della Casa',
    description: 'Espresso-soaked ladyfingers, mascarpone, cocoa nibs',
    tag: 'Sweet',
    imageSrc:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 220, damping: 28 },
  },
}

const stackVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 180,
      damping: 26,
      delay: 0.4,
    },
  },
}

export function SignatureDishes() {
  return (
    <section id="dishes" className="relative w-full bg-white dark:bg-[#121215] text-foreground dark:text-white py-12 sm:py-16 md:py-24 overflow-hidden scroll-mt-20">
      <div className="container-app relative">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={itemVariants} className="text-eyebrow mb-2 sm:mb-4">
            Signature Dishes
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground dark:text-white text-balance mb-3 sm:mb-4 leading-tight"
          >
            Plates we're{' '}
            <DynamicTextSlider>
              <RevealText
                text="FAMOUS"
                textColor="text-foreground dark:text-white"
                overlayColor="text-brand-500"
                letterImages={dishImages}
                className="font-display"
              />
            </DynamicTextSlider>{' '}
            for
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty"
          >
            Drag, swipe, or tap. Six of the dishes that built our reputation —
            crafted with the same care since day one.
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-5xl"
          variants={stackVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <CardStack
            items={dishes}
            initialIndex={0}
            autoAdvance
            intervalMs={3200}
            pauseOnHover
            showDots
            cardWidth={460}
            cardHeight={300}
          />
        </motion.div>
      </div>
    </section>
  )
}
