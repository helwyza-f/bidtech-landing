const ASSET_BASE = "/images/nivora";

export const nivoraAssets = {
  brand: {
    logoPrimary: `${ASSET_BASE}/brand/logo-primary.webp`,
    logoMark: `${ASSET_BASE}/brand/logo-mark.webp`,
    logoWhite: `${ASSET_BASE}/brand/logo-white.webp`,
    logoMarkWhite: `${ASSET_BASE}/brand/logo-mark-white.webp`,
  },

  hero: {
    learner: `${ASSET_BASE}/hero/hero-learner.webp`,
    gradientOrb: `${ASSET_BASE}/hero/hero-gradient-orb.webp`,
    glassShape: `${ASSET_BASE}/hero/hero-glass-shape.webp`,
    uiCard: `${ASSET_BASE}/hero/hero-ui-card.webp`,
  },
} as const;