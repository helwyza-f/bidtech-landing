"use client";

import { motion } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Utensils, Clock, Leaf } from 'lucide-react'

const features = [
  {
    title: 'Chef-Driven Menu',
    description:
      'Every dish is crafted from scratch using traditional techniques and modern twists.',
    icon: <Utensils className="h-6 w-6 text-brand-500" />,
  },
  {
    title: 'Fast Casual',
    description:
      'We believe great food shouldn’t mean a long wait. Get your favorites in under 15 minutes.',
    icon: <Clock className="h-6 w-6 text-brand-500" />,
  },
  {
    title: 'Locally Sourced',
    description:
      'We partner with local farms and artisans to ensure the freshest ingredients every day.',
    icon: <Leaf className="h-6 w-6 text-brand-500" />,
  },
]

export function Features() {
  return (
    <section id="story" className="relative w-full bg-white dark:bg-[#121215] section-padding scroll-mt-20">
      <div className="container-app">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-eyebrow mb-4">Why choose us</p>
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
            Quality without compromise
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            We're stripping away the white tablecloths, but keeping the culinary
            rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="h-full bg-neutral-50 dark:bg-card border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
