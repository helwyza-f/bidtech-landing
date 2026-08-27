export const motionConfig = {
  duration: {
    fast: 0.25,
    normal: 0.5,
    slow: 0.8,
    reveal: 1,
  },

  ease: {
    default: [0.22, 1, 0.36, 1],
  },

  stagger: {
    fast: 0.06,
    normal: 0.1,
    slow: 0.15,
  },
} as const;