import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, StyleProp, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.text.secondary;
    switch (variant) {
      case 'primary':
        return theme.colors.secondary;
      case 'secondary':
        return theme.colors.primary;
      case 'outline':
        return 'transparent';
      default:
        return theme.colors.secondary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.text.secondary;
    switch (variant) {
      case 'outline':
        return theme.colors.secondary;
      default:
        return 'transparent';
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.text.inverse;
    switch (variant) {
      case 'outline':
        return theme.colors.secondary;
      default:
        return theme.colors.text.inverse;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return theme.spacing.sm;
      case 'lg':
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'lg':
        return 24;
      default:
        return 20;
    }
  };

  const buttonStyles = [
    styles.base,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      padding: getPadding(),
      borderRadius: theme.radius.md,
    },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      color: getTextColor(),
      fontSize: theme.typography.sizes.md,
      fontFamily: theme.typography.fonts.medium,
      marginLeft: icon ? theme.spacing.xs : 0,
    },
    textStyle,
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        buttonStyles,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <Ionicons
            name={icon}
            size={getIconSize()}
            color={getTextColor()}
          />
        )}
        <Text style={textStyles}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
