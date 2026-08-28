"use client";

import { useState, useEffect, type ReactNode } from 'react'
import { FaPizzaSlice, FaHamburger, FaIceCream, FaCoffee, FaUtensils } from 'react-icons/fa'
import { cn } from '@/lib/utils'

export interface SelectorOption {
  title: string
  description: string
  image: string
  icon: ReactNode
}

export interface InteractiveSelectorProps {
  id?: string
  eyebrow?: string
  heading?: ReactNode
  subheading?: string
  options?: SelectorOption[]
  className?: string
}

const defaultOptions: SelectorOption[] = [
  {
    title: 'Wood-Fired Pizza',
    description: '48-hour proofed sourdough, San Marzano D.O.P, 90-second bake',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=85',
    icon: <FaPizzaSlice size={22} className="text-white" />,
  },
  {
    title: 'Smash Burgers',
    description: '100% grass-fed Angus, toasted brioche bun, double aged cheddar',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=85',
    icon: <FaHamburger size={22} className="text-white" />,
  },
  {
    title: 'Pasta Bar',
    description: 'Hand-rolled fresh daily, 12-hour braised Bolognese ragù',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1600&q=85',
    icon: <FaUtensils size={22} className="text-white" />,
  },
  {
    title: 'Sweet Endings',
    description: 'Classic espresso tiramisu, pistachio cannoli, artisanal gelato',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1600&q=85',
    icon: <FaIceCream size={22} className="text-white" />,
  },
  {
    title: 'Coffee & Drinks',
    description: 'Single-origin espresso, botanical mocktails, cold-pressed elixirs',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85',
    icon: <FaCoffee size={22} className="text-white" />,
  },
]

export function InteractiveSelector({
  id = 'menu',
  eyebrow = 'Our Menu',
  heading = 'Built around what you crave',
  subheading = 'Five core culinary categories, each crafted with obsessive technique and uncompromising ingredients. Tap to expand.',
  options = defaultOptions,
  className,
}: InteractiveSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i])
      }, 160 * i)
      timers.push(timer)
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [options])

  return (
    <section
      id={id}
      className={cn(
        'relative w-full bg-white dark:bg-[#121215] text-foreground dark:text-white py-12 sm:py-16 md:py-28 overflow-hidden scroll-mt-20',
        className,
      )}
    >
      {/* Background radial atmosphere */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none -z-10"
      />

      <div className="container-app">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-18">
          <p className="text-eyebrow mb-2 sm:mb-4 tracking-widest text-brand-500">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground dark:text-white text-balance mb-3 sm:mb-5 leading-tight">
            {heading}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Grand Expansion Accordion Showcase - Vertical on Mobile, Horizontal on Desktop */}
        <div className="options flex flex-col md:flex-row w-full max-w-7xl mx-auto h-[560px] sm:h-[600px] md:h-[620px] lg:h-[680px] items-stretch gap-2.5 md:gap-4 overflow-hidden rounded-[24px] sm:rounded-[32px] p-2 md:p-3 bg-neutral-100 dark:bg-black/40 shadow-xl backdrop-blur-md">
          {options.map((option, index) => {
            const isActive = activeIndex === index
            return (
              <div
                key={index}
                className="option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-[18px] sm:rounded-[24px] md:rounded-[28px]"
                style={{
                  backgroundImage: `url('${option.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backfaceVisibility: 'hidden',
                  opacity: animatedOptions.includes(index) ? 1 : 0,
                  transform: animatedOptions.includes(index)
                    ? 'translateX(0)'
                    : 'translateX(-50px)',
                  minWidth: isMobile ? undefined : '56px',
                  minHeight: isMobile ? '56px' : undefined,
                  cursor: 'pointer',
                  backgroundColor: '#18181b',
                  boxShadow: isActive
                    ? '0 25px 50px -12px rgba(0,0,0,0.7), 0 0 30px rgba(255,90,31,0.25)'
                    : '0 10px 25px rgba(0,0,0,0.3)',
                  flex: isActive
                    ? (isMobile ? '4.5 1 0%' : '8 1 0%')
                    : (isMobile ? '1 1 0%' : '1.2 1 0%'),
                  zIndex: isActive ? 10 : 1,
                  willChange: 'flex-grow, box-shadow, transform',
                }}
                onClick={() => handleOptionClick(index)}
              >
                {/* Gradient vignette for rich contrast */}
                <div
                  className="shadow absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out"
                  style={{
                    background: isActive
                      ? 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.92) 100%)'
                      : 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)',
                  }}
                />

                {/* Bottom interactive card details */}
                <div className="label absolute left-0 right-0 bottom-2.5 sm:bottom-4 md:bottom-6 flex items-center justify-start z-[2] pointer-events-none px-3 sm:px-4 md:px-7 gap-3 sm:gap-4 w-full">
                  <div
                    className={cn(
                      'icon min-w-[38px] max-w-[38px] h-[38px] sm:min-w-[48px] sm:max-w-[48px] sm:h-[48px] md:min-w-[56px] md:max-w-[56px] md:h-[56px] flex items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-xl shadow-lg transition-all duration-300 shrink-0',
                      isActive
                        ? 'bg-brand-500/90 text-white shadow-glow'
                        : 'bg-black/60 text-white/80',
                    )}
                  >
                    {option.icon}
                  </div>

                  <div className="info text-white overflow-hidden">
                    <div
                      className={cn(
                        'main font-display font-bold text-sm sm:text-xl md:text-3xl text-white transition-all duration-700 ease-in-out truncate',
                        !isActive && !isMobile && 'opacity-0 translate-x-8 md:opacity-0 md:translate-x-8',
                        !isActive && isMobile && 'opacity-90 translate-x-0',
                      )}
                    >
                      {option.title}
                    </div>
                    <div
                      className="sub text-[11px] sm:text-xs md:text-sm text-gray-200 line-clamp-2 transition-all duration-700 ease-in-out mt-0.5 sm:mt-1"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(30px)',
                        display: isActive ? '-webkit-box' : 'none',
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
