import { Platform } from 'react-native';

export const typography = {
  fonts: {
    regular: Platform.select({
      web: 'Amazon Ember, Arial, sans-serif',
      default: undefined,
    }),
    medium: Platform.select({
      web: 'Amazon Ember Medium, Arial, sans-serif',
      default: undefined,
    }),
    bold: Platform.select({
      web: 'Amazon Ember Bold, Arial, sans-serif',
      default: undefined,
    }),
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
} as const;
