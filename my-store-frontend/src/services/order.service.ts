import apiClient from "./apiClient";
import type { CartItem, Order } from "../types";

export interface AddToCartPayload {
  product_id: number;
  quantity: number;
}

export interface RemoveFromCartPayload {
  cart_id: number;
}

export interface UpdateCartItemPayload {
  cart_id: number;
  quantity: number;
}

export interface CheckoutResponse {
  detail: string;
  order_id: number;
  total_amount: string;
}

export const orderService = {
  // ─── Cart ─────────────────────────────────────────────────────────────
  getCart: () => apiClient.get<CartItem[]>("/cart/").then((r) => r.data),

  addToCart: (payload: AddToCartPayload) =>
    apiClient.post("/cart/", payload).then((r) => r.data),

  updateCartItem: (payload: UpdateCartItemPayload) =>
    apiClient.put("/cart/", payload).then((r) => r.data),

  removeFromCart: (payload: RemoveFromCartPayload) =>
    apiClient.delete("/cart/", { data: payload }).then((r) => r.data),

  // ─── Checkout ─────────────────────────────────────────────────────────
  checkout: () =>
    apiClient.post<CheckoutResponse>("/orders/checkout/").then((r) => r.data),

  // ─── Order History ────────────────────────────────────────────────────
  getOrderHistory: () =>
    apiClient.get<Order[]>("/orders/").then((r) => r.data),

  // Dummy endpoints for admin (if needed later)
  getAllOrders: (page = 1) =>
    apiClient.get(`/admin/orders/?page=${page}`).then((r) => r.data),
  updateStatus: (id: number, status: string) =>
    apiClient.patch(`/admin/orders/${id}/`, { status }).then((r) => r.data),
};
