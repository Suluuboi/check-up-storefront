import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { Typography } from '../common/Typography';
import { IconButton } from '../common/IconButton';
import { useTheme } from '../../context/ThemeContext';
import { useCartStore } from '../../store/cartStore';

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

export function CartItem({
  id,
  title,
  price,
  thumbnail,
  quantity,
}: CartItemProps) {
  const { theme } = useTheme();
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <Card style={{ marginBottom: theme.spacing.md }}>
      <View style={styles.container}>
        <Image
          source={{ uri: thumbnail }}
          style={[
            styles.image,
            { borderRadius: theme.radius.sm },
          ]}
          resizeMode="cover"
        />
        <View style={[styles.content, { marginLeft: theme.spacing.md }]}>
          <Typography variant="h3" numberOfLines={1}>
            {title}
          </Typography>
          <Typography
            variant="price"
            style={{ marginTop: theme.spacing.xs }}
          >
            ${price.toFixed(2)}
          </Typography>
          <View style={[styles.controls, { marginTop: theme.spacing.sm }]}>
            <IconButton
              name="remove-circle"
              onPress={() => updateQuantity(id, Math.max(0, quantity - 1))}
              color={theme.colors.text.secondary}
            />
            <Typography style={{ marginHorizontal: theme.spacing.sm }}>
              {quantity}
            </Typography>
            <IconButton
              name="add-circle"
              onPress={() => updateQuantity(id, quantity + 1)}
              color={theme.colors.secondary}
            />
            <IconButton
              name="trash"
              onPress={() => removeFromCart(id)}
              color={theme.colors.error}
              style={{ marginLeft: 'auto' }}
            />
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});