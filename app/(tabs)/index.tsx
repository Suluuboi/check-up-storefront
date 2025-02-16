import React from 'react';
import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { ProductCard } from '../../components/product/ProductCard';
import { Typography } from '../../components/common/Typography';
import { useTheme } from '../../context/ThemeContext';
import { products } from '../../data/products';

export default function Store() {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isSmallScreen = width < theme.breakpoints.md;

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.colors.background }
    ]}>
      <View style={[
        styles.header,
        { 
          backgroundColor: theme.colors.primary,
          padding: theme.spacing.md 
        }
      ]}>
        <Typography
          variant="h2"
          style={{ color: '#ffffff' }}
        >
          Featured Productss
        </Typography>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={isSmallScreen ? 1 : 3}
        key={isSmallScreen ? 'single' : 'triple'}
        contentContainerStyle={[
          styles.content,
          { 
            padding: theme.spacing.md,
            maxWidth: theme.breakpoints.xl,
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
  },
  content: {
    alignSelf: 'center',
    width: '100%',
  },
});