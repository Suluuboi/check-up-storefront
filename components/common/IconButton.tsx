import React from 'react';
import { Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

type IconButtonProps = {
  name: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export function IconButton({
  name,
  onPress,
  size = 24,
  color,
  style,
  disabled = false,
}: IconButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {
          padding: theme.spacing.sm,
          opacity: pressed || disabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Ionicons
        name={name}
        size={size}
        color={color || theme.colors.text.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});