import React from 'react';
import { View, Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Card } from '../../components/common/Card';
import { Typography } from '../../components/common/Typography';
import { Button } from '../../components/common/Button';
import { IconButton } from '../../components/common/IconButton';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const { width } = useWindowDimensions();
  const { theme, themeMode, setThemeMode, isDark } = useTheme();
  const isSmallScreen = width < theme.breakpoints.md;

  const themeOptions: { mode: 'system' | 'light' | 'dark'; icon: keyof typeof Ionicons.glyphMap }[] = [
    { mode: 'system', icon: 'phone-portrait-outline' },
    { mode: 'light', icon: 'sunny' },
    { mode: 'dark', icon: 'moon' },
  ];

  return (
    <ScrollView 
      style={[
        styles.container,
        { backgroundColor: theme.colors.background }
      ]}
    >
      <View style={[
        styles.header,
        { 
          backgroundColor: theme.colors.primary,
          padding: isSmallScreen ? theme.spacing.lg : theme.spacing.xl 
        }
      ]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400' }}
          style={[
            styles.avatar,
            { 
              width: isSmallScreen ? 128 : 160,
              height: isSmallScreen ? 128 : 160,
              borderRadius: theme.radius.round,
            }
          ]}
        />
        <Typography 
          variant="h2" 
          style={[
            styles.name,
            { 
              color: theme.colors.text.inverse,
              marginTop: theme.spacing.md 
            }
          ]}
        >
          John Doe
        </Typography>
        <Typography 
          variant="body"
          style={{ color: theme.colors.text.inverse }}
        >
          john.doe@example.com
        </Typography>
      </View>

      <View style={[
        styles.content,
        { 
          padding: theme.spacing.md,
          maxWidth: theme.breakpoints.md,
        }
      ]}>
        <Card>
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
          />
          <MenuItem
            icon="time-outline"
            title="Order History"
          />
          <MenuItem
            icon="card-outline"
            title="Payment Methods"
          />
          <MenuItem
            icon="settings-outline"
            title="Settings"
            isLast
          />
        </Card>

        <Card style={{ marginTop: theme.spacing.md }}>
          <View style={[styles.themeSection, { padding: theme.spacing.md }]}>
            <Typography variant="h3" style={{ marginBottom: theme.spacing.md }}>
              Theme Settings
            </Typography>
            <View style={styles.themeOptions}>
              {themeOptions.map((option) => (
                <Button
                  key={option.mode}
                  title={option.mode.charAt(0).toUpperCase() + option.mode.slice(1)}
                  variant={themeMode === option.mode ? 'primary' : 'outline'}
                  size="sm"
                  style={{ flex: 1, margin: theme.spacing.xs }}
                  onPress={() => setThemeMode(option.mode)}
                  icon={option.icon}
                />
              ))}
            </View>
            <Typography 
              variant="caption" 
              style={{ marginTop: theme.spacing.sm }}
            >
              Current theme: {themeMode === 'system' 
                ? `System (${isDark ? 'Dark' : 'Light'})` 
                : themeMode.charAt(0).toUpperCase() + themeMode.slice(1)
              }
            </Typography>
          </View>
        </Card>

        <Button
          title="Log Out"
          onPress={() => {}}
          variant="primary"
          style={{ marginTop: theme.spacing.md }}
        />
      </View>
    </ScrollView>
  );
}

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  isLast?: boolean;
};

function MenuItem({ icon, title, isLast = false }: MenuItemProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[
      styles.menuItem,
      !isLast && { 
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
      }
    ]}>
      <IconButton
        name={icon}
        size={24}
        onPress={() => {}}
        color={theme.colors.secondary}
      />
      <Typography style={{ flex: 1, marginLeft: theme.spacing.sm }}>
        {title}
      </Typography>
      <IconButton
        name="chevron-forward"
        size={24}
        onPress={() => {}}
        color={theme.colors.text.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  name: {
    textAlign: 'center',
  },
  content: {
    width: '100%',
    alignSelf: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  themeSection: {
    width: '100%',
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});