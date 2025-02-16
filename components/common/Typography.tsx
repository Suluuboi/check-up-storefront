import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'price';

type TypographyProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
};

export function Typography({
  children,
  variant = 'body',
  style,
}: TypographyProps) {
  const { theme } = useTheme();

  const getStyles = () => {
    const baseStyle: TextStyle = {
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fonts.regular,
    };

    switch (variant) {
      case 'h1':
        return {
          ...baseStyle,
          fontSize: theme.typography.sizes.xxxl,
          fontFamily: theme.typography.fonts.bold,
        };
      case 'h2':
        return {
          ...baseStyle,
          fontSize: theme.typography.sizes.xxl,
          fontFamily: theme.typography.fonts.bold,
        };
      case 'h3':
        return {
          ...baseStyle,
          fontSize: theme.typography.sizes.xl,
          fontFamily: theme.typography.fonts.medium,
        };
      case 'caption':
        return {
          ...baseStyle,
          fontSize: theme.typography.sizes.sm,
          color: theme.colors.text.secondary,
        };
      case 'price':
        return {
          ...baseStyle,
          fontSize: theme.typography.sizes.lg,
          fontFamily: theme.typography.fonts.medium,
          color: theme.colors.secondary,
        };
      default:
        return {
          ...baseStyle,
          fontSize: theme.typography.sizes.md,
        };
    }
  };

  return (
    <Text style={[getStyles(), style]}>
      {children}
    </Text>
  );
}