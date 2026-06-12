// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'BUYER' | 'SELLER';
  is_staff?: boolean;
  is_superuser?: boolean;
  date_joined?: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  product_id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  unit_price: number;
  available_quantity: number;
  seller?: User | number; // สามารถเป็น object User หรือแค่ ID ก็ได้ขึ้นอยู่กับ API
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  cart_id: number;
  product: Product;
  quantity: number;
}

// โครงสร้างตะกร้าโดยรวมที่ Frontend ใช้แสดงผล
export interface Cart {
  items: CartItem[];
  totalItems: number;
  total_amount: number;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  order_item_id: number;
  product: Product;
  quantity: number;
  unit_price: number;
}

export interface Order {
  order_id: number;
  total_amount: number;
  status: string;
  create_at: string;
  items?: OrderItem[];
  buyer?: User | number;
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
  first_name: string;
  last_name: string;
  role: 'BUYER' | 'SELLER';
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
