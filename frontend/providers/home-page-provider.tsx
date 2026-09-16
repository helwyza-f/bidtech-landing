"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type UIEvent,
} from "react";

import { useLanguage } from "@/lib/i18n";

export const heroShowcaseSlides = [
  {
    name: "Ayocuci",
    webImage: "/images/web_ayocuci.webp",
    mobileImage: "/images/apk_ayocuci.webp",
    mobileLabel: "Mobile Ayocuci",
    metricLabel: "Conversion",
    metricValue: "98%",
  },
  {
    name: "Stokin",
    webImage: "/images/web_stokin.webp",
    mobileImage: "/images/apk_stokin.webp",
    mobileLabel: "Mobile Stokin",
    metricLabel: "Inventory",
    metricValue: "24/7",
  },
  {
    name: "Satu Rupiah",
    webImage: "/images/web_satuRupiah.webp",
    mobileImage: "/images/apk_satuRupiah.webp",
    mobileLabel: "Mobile Satu Rupiah",
    metricLabel: "Finance",
    metricValue: "100+",
  },
] as const;

type HomePageContextValue = ReturnType<typeof useHomePageState>;

const HomePageContext = createContext<HomePageContextValue | null>(null);

function getClosestSlideIndex(slider: HTMLElement) {
  const slides = Array.from(slider.children) as HTMLElement[];

  return slides.reduce(
    (best, slide, index) =>
      Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) < best.distance
        ? { index, distance: Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft) }
        : best,
    { index: 0, distance: Number.POSITIVE_INFINITY },
  ).index;
}

function scrollSliderToIndex(slider: HTMLElement | null, nextSlide: number) {
  const slides = slider ? (Array.from(slider.children) as HTMLElement[]) : [];
  const target = Math.max(0, Math.min(nextSlide, slides.length - 1));

  if (slider && slides[target]) {
    slider.scrollTo({ left: slides[target].offsetLeft - slider.offsetLeft, behavior: "smooth" });
  }

  return target;
}

function useHomePageState() {
  const { t } = useLanguage();
  const heroTitleLine1Words = t.hero.titleLine1.trim().split(/\s+/);
  const heroTitleMobileFirstLine = heroTitleLine1Words.slice(0, -1).join(" ");
  const heroTitleMobileSecondLine = `${heroTitleLine1Words.at(-1) ?? ""} ${t.hero.titleLine2White}`.trim();

  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const servicesSliderRef = useRef<HTMLDivElement>(null);

  const heroShowcase = heroShowcaseSlides[activeHeroSlide];

  const showHeroSlide = (index: number) => {
    setActiveHeroSlide(index);
  };

  const moveServiceSlide = (nextSlide: number) => {
    setActiveServiceSlide(scrollSliderToIndex(servicesSliderRef.current, nextSlide));
  };

  const handleServiceScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    setActiveServiceSlide(getClosestSlideIndex(event.currentTarget));
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroShowcaseSlides.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  return {
    t,
    activeHeroSlide,
    activeServiceSlide,
    heroShowcase,
    heroTitleMobileFirstLine,
    heroTitleMobileSecondLine,
    servicesSliderRef,
    handleServiceScroll,
    moveServiceSlide,
    showHeroSlide,
  };
}

export function HomePageProvider({ children }: { children: ReactNode }) {
  const value = useHomePageState();

  return <HomePageContext.Provider value={value}>{children}</HomePageContext.Provider>;
}

export function useHomePage() {
  const context = useContext(HomePageContext);

  if (!context) {
    throw new Error("useHomePage must be used inside HomePageProvider");
  }

  return context;
}
