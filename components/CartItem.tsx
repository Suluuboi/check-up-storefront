import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../store/cartStore';

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

export default function CartItem({ id, title, price, thumbnail, quantity }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <View style={styles.controls}>
          <Pressable
            onPress={() => updateQuantity(id, Math.max(0, quantity - 1))}
            style={styles.quantityButton}
          >
            <Ionicons name="remove" size={16} color="black" />
          </Pressable>
          <Text style={styles.quantity}>{quantity}</Text>
          <Pressable
            onPress={() => updateQuantity(id, quantity + 1)}
            style={styles.quantityButton}
          >
            <Ionicons name="add" size={16} color="black" />
          </Pressable>
          <Pressable
            onPress={() => removeFromCart(id)}
            style={styles.removeButton}
          >
            <Ionicons name="trash" size={16} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0891b2',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#e5e7eb',
    padding: 8,
    borderRadius: 9999,
  },
  quantity: {
    marginHorizontal: 16,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 'auto',
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 9999,
  },
});
