import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../../store/cartStore';
import { products } from '../../data/products';
import { useTheme } from '../../context/ThemeContext';
import { Typography } from '../../components/common/Typography';

const { width } = Dimensions.get('window');

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === Number(id));
  const addToCart = useCartStore((state) => state.addToCart);
  const { theme } = useTheme();

  if (!product) {
    return (
      <View
        style={[styles.centered, { backgroundColor: theme.colors.background }]}
      >
        <Typography style={styles.notFound}>Product not found</Typography>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: product.title,
          headerBackTitle: 'Store',
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        <Pressable style={{ padding: 10 }} onPress={() => router.back}>
          <Text>Back</Text>
        </Pressable>
        <View style={[styles.content]}>
          <Typography variant="h2">{product.title}</Typography>
          <Typography variant="price" style={styles.price}>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography style={styles.description}>
            {product.description}
          </Typography>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
          },
        ]}
      >
        <Pressable
          onPress={() =>
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              quantity: 1,
            })
          }
          style={styles.addButton}
        >
          <Ionicons name="cart" size={24} color="white" />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 18,
    color: '#4b5563',
  },
  imageContainer: {
    height: 384,
  },
  image: {
    width,
    height: 384,
  },
  content: {
    padding: 16,
  },

  price: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  description: {
    marginTop: 16,
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
  },
  addButton: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
});
