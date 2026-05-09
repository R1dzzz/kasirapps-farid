export interface Category {
  id: string;
  name: string;
  name_id: string;
  slug: string;
  icon: string;
  product_count: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category?: Category;
  price: number;
  rating: number;
  stock: number;
  description: string;
  description_id: string;
  specs: Record<string, string>;
  sold_count: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  order_number: string;
  items: TransactionItem[];
  total_amount: number;
  shipping_info: ShippingInfo;
  payment_method: 'transfer' | 'credit_card' | 'cod';
  status: 'processing' | 'completed' | 'cancelled';
  created_at: string;
}

export interface TransactionItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
}

export type Language = 'id' | 'en';
export type Theme = 'light' | 'dark';

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popular';
