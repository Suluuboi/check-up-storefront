import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import { ProductCard } from '../../components/product/ProductCard';
import { Typography } from '../../components/common/Typography';
import { useTheme } from '../../context/ThemeContext';
import { products, Product } from '../../data/products';
import { Ionicons } from '@expo/vector-icons';

const featuredImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
  'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
];

const categories = [
  { id: 1, name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: 2, name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
  { id: 3, name: 'Watches', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800' },
  { id: 4, name: 'Backpacks', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800' },
  { id: 5, name: 'Power Banks', image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b17d?w=800' },
];

export default function Store() {
  const { width, height } = useWindowDimensions();
  const { theme } = useTheme();
  const isSmallScreen = width < theme.breakpoints.md;
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    },
    [products]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % featuredImages.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, featuredImages.length]);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width]
  );

  const numColumns = isSmallScreen ? 1 : 3;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Search Bar */}
      <View style={[styles.searchBarContainer, { backgroundColor: theme.colors.surface, padding: theme.spacing.sm }]}>
        <TextInput
          style={[styles.searchBarInput, { color: theme.colors.text.primary }]}
          placeholder="Search for products..."
          placeholderTextColor={theme.colors.text.secondary}
          value={searchText}
          onChangeText={handleSearch}
        />
        <Pressable style={styles.searchBarButton} onPress={() => handleSearch(searchText)}>
          <Ionicons name="search" size={24} color={theme.colors.text.primary} />
        </Pressable>
      </View>

      {/* Hero Section */}
      <View style={[styles.heroSection, { height: height * 0.3 }]}>
        <FlatList
          ref={flatListRef}
          data={featuredImages}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={[styles.featuredImage, { width, height: height * 0.3 }]} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}
          getItemLayout={getItemLayout}
        />
      </View>

      {/* Categories Section */}
      <View style={[styles.categoriesSection, { marginTop: -30 }]}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Pressable style={styles.categoryItem}>
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
              <Typography style={styles.categoryText}>{item.name}</Typography>
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
        />
      </View>

      {/* Product Listing */}
      <View style={[styles.productListContainer, {
            padding: theme.spacing.md,
            maxWidth: theme.breakpoints.xl,
            alignSelf: 'center', // This line centers the product listing
          }]}>
        {filteredProducts.map((item) => (
          <View key={item.id.toString()} style={{ width: `${100 / numColumns}%`, padding: theme.spacing.sm }}>
            <ProductCard {...item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  searchBarButton: {
    padding: 8,
  },
  heroSection: {
    overflow: 'hidden',
  },
  featuredImage: {
    resizeMode: 'cover',
  },
  categoriesSection: {
    //height: 100,
    justifyContent: 'center',
  },
  categoryItem: {
    width: 100,
    height: 120,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: "100%",
    height: "80%",
    resizeMode: 'cover',
  },
  categoryText: {
    textAlign: 'center',
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // This line centers the content horizontally
  },
});
