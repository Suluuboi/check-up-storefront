export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  images: string[];
};

export const products: Product[] = [
  {
    id: 1,
    title: "Premium Leather Wallet",
    price: 59.99,
    thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    description: "Handcrafted genuine leather wallet with multiple card slots and RFID protection. Perfect for everyday use.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
      "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=800",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800"
    ]
  },
  {
    id: 2,
    title: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal clear sound quality.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
      "https://images.unsplash.com/photo-1484704849700-f032a6c91816?w=800"
    ]
  },
  {
    id: 3,
    title: "Smart Fitness Watch",
    price: 149.99,
    thumbnail: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and sleep tracking.",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800"
    ]
  },
  {
    id: 4,
    title: "Minimalist Backpack",
    price: 79.99,
    thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    description: "Stylish and functional backpack with laptop compartment, water-resistant material, and hidden pockets.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800"
    ]
  },
  {
    id: 5,
    title: "Portable Power Bank",
    price: 39.99,
    thumbnail: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17d?w=800",
    description: "20000mAh high-capacity power bank with fast charging capability and dual USB ports.",
    images: [
      "https://images.unsplash.com/photo-1609592424109-dd9892f1b17d?w=800",
      "https://images.unsplash.com/photo-1619489646924-b4fdc402ee05?w=800",
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800"
    ]
  }
];