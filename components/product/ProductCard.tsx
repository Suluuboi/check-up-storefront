import React from 'react';
import { View, Image, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { Card } from '../common/Card';
import { Typography } from '../common/Typography';
import { IconButton } from '../common/IconButton';
import { useTheme } from '../../context/ThemeContext';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../data/products';

type ProductCardProps = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail' | 'description'>;

export function ProductCard({
  id,
  title,
  price,
  thumbnail,
  description,
}: ProductCardProps) {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const addToCart = useCartStore((state) => state.addToCart);
  const isSmallScreen = width < theme.breakpoints.md;

  return (
    <Card
      style={[
        styles.container,
        {
          width: isSmallScreen ? '100%' : (width - theme.spacing.md * 4) / 3,
          margin: theme.spacing.sm,
        },
      ]}
    >
      <Link href={`/product/${id}`} asChild>
        <Pressable>
          <Image
            source={{ uri: thumbnail }}
            style={[
              styles.image,
              { borderRadius: theme.radius.sm },
            ]}
            resizeMode="cover"
          />
          <View style={{ padding: theme.spacing.sm }}>
            <Typography variant="h3" numberOfLines={1}>
              {title}
            </Typography>
            <Typography
              variant="caption"
              style={{ marginTop: theme.spacing.xs }}
              numberOfLines={2}
            >
              {description}
            </Typography>
            <View style={[styles.footer, { marginTop: theme.spacing.md }]}>
              <Typography variant="price">
                ${price.toFixed(2)}
              </Typography>
              <IconButton
                name="add-circle"
                size={28}
                color={theme.colors.secondary}
                onPress={() =>
                  addToCart({ id, title, price, thumbnail, quantity: 1 })
                }
              />
            </View>
          </View>
        </Pressable>
      </Link>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});