// Color palette
export const colors = {
  primary: '#053f5c',      // Dark teal/blue
  secondary: '#a5dded',    // Light blue
  white: '#ffffff',        // White
} as const;

export const colorPalette = {
  dark: colors.primary,
  light: colors.secondary,
  neutral: colors.white,
} as const;

export type ColorKey = keyof typeof colors;
