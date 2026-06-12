// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: Category;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  district: string;
  province: string;
  postalCode: string;
}

export interface Order {
  id: number;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// ─── UI ───────────────────────────────────────────────────────────────────────
export type SortOption = 'price_asc' | 'price_desc' | 'newest' | 'rating';

export interface FilterState {
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: SortOption;
  page: number;
}
