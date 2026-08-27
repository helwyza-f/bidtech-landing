"use client";

import { InteractiveSelector } from '@/components/ui/interactive-selector'
import { RevealText } from '@/components/ui/reveal-text'
import { DynamicTextSlider } from '@/components/ui/dynamic-text-slider'

const foodImages = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
]

export function MenuShowcase() {
  return (
    <InteractiveSelector
      id="menu"
      heading={
        <>
          Built around what you{' '}
          <DynamicTextSlider>
            <RevealText
              text="CRAVE"
              textColor="text-foreground dark:text-white"
              overlayColor="text-brand-500"
              letterImages={foodImages}
              className="font-display"
            />
          </DynamicTextSlider>
        </>
      }
    />
  )
}
