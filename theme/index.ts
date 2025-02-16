import { lightColors, darkColors } from './colors';
import { spacing, radius } from './spacing';
import { typography } from './typography';
import { breakpoints } from './breakpoints';

export const theme = {
  light: {
    colors: lightColors,
    spacing,
    radius,
    typography,
    breakpoints,
  },
  dark: {
    colors: darkColors,
    spacing,
    radius,
    typography,
    breakpoints,
  },
} as const;

export type Theme = typeof theme.light;
export type ThemeColors = Theme['colors'];
