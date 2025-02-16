import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../store/cartStore';

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
};

export default function ProductCard({
  id,
  title,
  price,
  thumbnail,
  description,
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <View style={styles.card}>
      <Link href={`/product/${id}`} asChild>
        <Pressable>
          <Image
            source={{ uri: thumbnail }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
            <View style={styles.footer}>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
              <Pressable
                onPress={() =>
                  addToCart({ id, title, price, thumbnail, quantity: 1 })
                }
                style={styles.addButton}
              >
                <Ionicons name="add" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 192,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0891b2',
  },
  addButton: {
    backgroundColor: '#0891b2',
    padding: 8,
    borderRadius: 9999,
  },
});
