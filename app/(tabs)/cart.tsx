import React from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { CartItem } from '../../components/cart/CartItem';
import { Card } from '../../components/common/Card';
import { Typography } from '../../components/common/Typography';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../context/ThemeContext';
import { useCartStore } from '../../store/cartStore';

export default function Cart() {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const { items, clearCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isSmallScreen = width < theme.breakpoints.md;

  if (items.length === 0) {
    return (
      <View style={[
        styles.emptyContainer,
        { backgroundColor: theme.colors.background }
      ]}>
        <Typography variant="h2">Your cart is empty</Typography>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.colors.background }
    ]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { 
            padding: theme.spacing.md,
            maxWidth: theme.breakpoints.md,
          }
        ]}
      >
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ScrollView>

      <Card style={[
        styles.footer,
        { 
          margin: theme.spacing.md,
          marginHorizontal: isSmallScreen ? theme.spacing.md : 'auto',
          maxWidth: theme.breakpoints.md,
          width: isSmallScreen ? undefined : '100%',
        }
      ]}>
        <View style={styles.totalRow}>
          <Typography variant="h3">Total:</Typography>
          <Typography variant="price">
            ${total.toFixed(2)}
          </Typography>
        </View>

        <View style={[
          styles.buttonRow,
          { marginTop: theme.spacing.md }
        ]}>
          <Button
            title="Clear Cart"
            onPress={clearCart}
            variant="outline"
            style={{ flex: 1, marginRight: theme.spacing.sm }}
          />
          <Button
            title="Checkout"
            onPress={() => {}}
            style={{ flex: 1, marginLeft: theme.spacing.sm }}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    width: '100%',
  },
  footer: {
    alignSelf: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
  },
});