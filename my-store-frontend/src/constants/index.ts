// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDERS: "/orders",
  PROFILE: "/profile",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ADMIN: {
    DASHBOARD: "/admin",
    PRODUCTS: "/admin/products",
    ORDERS: "/admin/orders",
  },
  SELLER_ORDERS: "/seller/orders",
} as const;

// ─── Pagination ───────────────────────────────────────────────────────────────
export const PAGE_SIZE = 12;

// ─── Local Storage Keys ───────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  CART: "cart",
} as const;

// ─── Sort Options ─────────────────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
] as const;

// ─── Order Status Labels ──────────────────────────────────────────────────────
export const ORDER_STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
