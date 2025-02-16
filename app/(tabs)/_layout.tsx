import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { View } from 'react-native';

export default function TabLayout() {
  const { theme } = useTheme();
  const { background, secondary, text } = theme.colors;
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: secondary,
        tabBarStyle: { backgroundColor: background },
        headerStyle: { backgroundColor: background },
        headerTitleStyle: { color: text.primary },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Store',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
