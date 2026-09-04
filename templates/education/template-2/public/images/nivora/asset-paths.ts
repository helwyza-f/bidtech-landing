/**
 * Nivora Academy asset paths.
 *
 * Setup:
 * Copy the asset folders into:
 *   public/images/nivora/
 *
 * Then import this file into your lib/data or components.
 */

const NIVORA_ASSET_BASE = "/images/nivora";

export const nivoraAssets = {
  brand: {
    logoPrimary: `${NIVORA_ASSET_BASE}/brand/logo-primary.webp`,
    logoMark: `${NIVORA_ASSET_BASE}/brand/logo-mark.webp`,
    logoWhite: `${NIVORA_ASSET_BASE}/brand/logo-white.webp`,
    logoMarkWhite: `${NIVORA_ASSET_BASE}/brand/logo-mark-white.webp`,
    favicon: `${NIVORA_ASSET_BASE}/brand/favicon.webp`,
  },

  hero: {
    learner: `${NIVORA_ASSET_BASE}/hero/hero-learner.webp`,
    gradientOrb: `${NIVORA_ASSET_BASE}/hero/hero-gradient-orb.webp`,
    glassShape: `${NIVORA_ASSET_BASE}/hero/hero-glass-shape.webp`,
    uiCard: `${NIVORA_ASSET_BASE}/hero/hero-ui-card.webp`,
  },

  courses: {
    advancedReactNextjs: `${NIVORA_ASSET_BASE}/courses/advanced-react-nextjs.webp`,
    typescriptModernWeb: `${NIVORA_ASSET_BASE}/courses/typescript-modern-web.webp`,
    frontendPerformance: `${NIVORA_ASSET_BASE}/courses/frontend-performance.webp`,
    designSystemFigma: `${NIVORA_ASSET_BASE}/courses/design-system-figma.webp`,
    uxResearch: `${NIVORA_ASSET_BASE}/courses/ux-research.webp`,
    uiDesignFundamentals: `${NIVORA_ASSET_BASE}/courses/ui-design-fundamentals.webp`,
    sqlDataAnalysis: `${NIVORA_ASSET_BASE}/courses/sql-data-analysis.webp`,
    powerBiVisualization: `${NIVORA_ASSET_BASE}/courses/power-bi-visualization.webp`,
    pythonDataAnalysis: `${NIVORA_ASSET_BASE}/courses/python-data-analysis.webp`,
    aiProductivity: `${NIVORA_ASSET_BASE}/courses/ai-productivity.webp`,
  },

  mentors: {
    rakaPratama: `${NIVORA_ASSET_BASE}/mentors/raka-pratama.webp`,
    nadiaMaharani: `${NIVORA_ASSET_BASE}/mentors/nadia-maharani.webp`,
    adrianWijaya: `${NIVORA_ASSET_BASE}/mentors/adrian-wijaya.webp`,
    mayaLestari: `${NIVORA_ASSET_BASE}/mentors/maya-lestari.webp`,
    kevinAditya: `${NIVORA_ASSET_BASE}/mentors/kevin-aditya.webp`,
    sarahAzizah: `${NIVORA_ASSET_BASE}/mentors/sarah-azizah.webp`,
  },

  intensive: {
    main: `${NIVORA_ASSET_BASE}/intensive/intensive-main.webp`,
    mentoring: `${NIVORA_ASSET_BASE}/intensive/intensive-mentoring.webp`,
    project: `${NIVORA_ASSET_BASE}/intensive/intensive-project.webp`,
    glassForeground: `${NIVORA_ASSET_BASE}/intensive/intensive-glass-foreground.webp`,
  },

  career: {
    portfolioReview: `${NIVORA_ASSET_BASE}/career/portfolio-review.webp`,
    careerConsultation: `${NIVORA_ASSET_BASE}/career/career-consultation.webp`,
    industryInsight: `${NIVORA_ASSET_BASE}/career/industry-insight.webp`,
  },

  events: {
    buildingScalableNextjs: `${NIVORA_ASSET_BASE}/events/building-scalable-nextjs.webp`,
    aiProductDesign: `${NIVORA_ASSET_BASE}/events/ai-product-design.webp`,
    dataStorytelling: `${NIVORA_ASSET_BASE}/events/data-storytelling.webp`,
    designSystemWorkshop: `${NIVORA_ASSET_BASE}/events/design-system-workshop.webp`,
  },

  testimonials: {
    nadiaPutri: `${NIVORA_ASSET_BASE}/testimonials/nadia-putri.webp`,
    kevinPratama: `${NIVORA_ASSET_BASE}/testimonials/kevin-pratama.webp`,
    mayaRahma: `${NIVORA_ASSET_BASE}/testimonials/maya-rahma.webp`,
    dimasArya: `${NIVORA_ASSET_BASE}/testimonials/dimas-arya.webp`,
    raniSafira: `${NIVORA_ASSET_BASE}/testimonials/rani-safira.webp`,
  },

  about: {
    learningCommunity: `${NIVORA_ASSET_BASE}/about/learning-community.webp`,
  },

  seo: {
    ogHome: `${NIVORA_ASSET_BASE}/seo/og-home.webp`,
  },
} as const;
