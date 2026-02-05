export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  vegan: boolean;
  organic: boolean;
  ingredients: string;
  sustainability_score: number;
}

export interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
  date: string;
}

export interface Style {
  id: number;
  name: string;
  description: string;
  image: string;
  colorPalette: string[];
  outfitIdeas: string[];
  bookRecommendations: string[];
  recipePairings: string[];
  mood: string;
  season: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export interface WishlistItem {
  productId: number;
  name: string;
  price: number;
  image: string;
}

export interface Customer {
  fullName: string;
  email: string;
  phone?: string;
  address: string;
  deliveryOption?: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  customer: Customer;
  totals: {
    subtotal: number;
    shippingFee: number;
    grandTotal: number;
  };
}