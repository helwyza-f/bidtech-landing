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

export interface SelectedPackage {
  service: string;
  plan: string;
  price: string;
}

interface PlanSelection {
  name: string;
  price: string;
}

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

type LandingPageContextValue = ReturnType<typeof useLandingPageState>;

const LandingPageContext = createContext<LandingPageContextValue | null>(null);

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

function useLandingPageState() {
  const { t } = useLanguage();
  const heroTitleLine1Words = t.hero.titleLine1.trim().split(/\s+/);
  const heroTitleMobileFirstLine = heroTitleLine1Words.slice(0, -1).join(" ");
  const heroTitleMobileSecondLine = `${heroTitleLine1Words.at(-1) ?? ""} ${t.hero.titleLine2White}`.trim();

  const [activeStep, setActiveStep] = useState(0);
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  const [activeSpecializationSlide, setActiveSpecializationSlide] = useState(0);
  const [activePricingTab, setActivePricingTab] = useState(0);
  const [activePricingSlide, setActivePricingSlide] = useState(0);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [activeProductSlide, setActiveProductSlide] = useState(0);
  const [activeHowItWorksPage, setActiveHowItWorksPage] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);

  const servicesSliderRef = useRef<HTMLDivElement>(null);
  const specializationsSliderRef = useRef<HTMLDivElement>(null);
  const pricingSliderRef = useRef<HTMLDivElement>(null);
  const productSliderRef = useRef<HTMLDivElement>(null);
  const howItWorksSliderRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const howItWorksPages = Math.ceil(t.howItWorks.steps.length / 2);
  const heroShowcase = heroShowcaseSlides[activeHeroSlide];

  const selectPackage = (plan: PlanSelection) => {
    const service = t.contact.form.services[activePricingTab] ?? t.contact.form.services[0];

    setSelectedPackage({ service, plan: plan.name, price: plan.price });
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const activatePricingTab = (index: number) => {
    setActivePricingTab(index);
    setActivePricingSlide(0);
    setSelectedPackage(null);
    pricingSliderRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const activateProductTab = (index: number) => {
    setActiveProductTab(index);
    setActiveProductSlide(0);
    productSliderRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const activateStep = (index: number) => {
    setActiveStep(index);
  };

  const showHeroSlide = (index: number) => {
    setActiveHeroSlide(index);
  };

  const movePricingSlide = (nextSlide: number) => {
    setActivePricingSlide(scrollSliderToIndex(pricingSliderRef.current, nextSlide));
  };

  const moveServiceSlide = (nextSlide: number) => {
    setActiveServiceSlide(scrollSliderToIndex(servicesSliderRef.current, nextSlide));
  };

  const moveSpecializationSlide = (nextSlide: number) => {
    setActiveSpecializationSlide(scrollSliderToIndex(specializationsSliderRef.current, nextSlide));
  };

  const moveProductSlide = (nextSlide: number) => {
    scrollSliderToIndex(productSliderRef.current, nextSlide);
  };

  const moveHowItWorksSlide = (nextSlide: number) => {
    scrollSliderToIndex(howItWorksSliderRef.current, nextSlide);
  };

  const handleServiceScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    setActiveServiceSlide(getClosestSlideIndex(event.currentTarget));
  };

  const handleSpecializationScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 640) return;
    setActiveSpecializationSlide(getClosestSlideIndex(event.currentTarget));
  };

  const handleProductScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    setActiveProductSlide(getClosestSlideIndex(event.currentTarget));
  };

  const handleHowItWorksScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 640) return;
    const index = getClosestSlideIndex(event.currentTarget);

    setActiveStep(index);
    setActiveHowItWorksPage(Math.floor(index / 2));
  };

  const handlePricingScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    setActivePricingSlide(getClosestSlideIndex(event.currentTarget));
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
    activeHowItWorksPage,
    activePricingSlide,
    activePricingTab,
    activeProductSlide,
    activeProductTab,
    activeServiceSlide,
    activeSpecializationSlide,
    activeStep,
    heroShowcase,
    heroTitleMobileFirstLine,
    heroTitleMobileSecondLine,
    howItWorksPages,
    howItWorksSliderRef,
    pricingSliderRef,
    productSliderRef,
    selectedPackage,
    servicesSliderRef,
    specializationsSliderRef,
    testimonialsRef,
    activatePricingTab,
    activateProductTab,
    activateStep,
    handleHowItWorksScroll,
    handlePricingScroll,
    handleProductScroll,
    handleServiceScroll,
    handleSpecializationScroll,
    moveHowItWorksSlide,
    movePricingSlide,
    moveProductSlide,
    moveServiceSlide,
    moveSpecializationSlide,
    selectPackage,
    showHeroSlide,
  };
}

export function LandingPageProvider({ children }: { children: ReactNode }) {
  const value = useLandingPageState();

  return <LandingPageContext.Provider value={value}>{children}</LandingPageContext.Provider>;
}

export function useLandingPage() {
  const context = useContext(LandingPageContext);

  if (!context) {
    throw new Error("useLandingPage must be used inside LandingPageProvider");
  }

  return context;
}
