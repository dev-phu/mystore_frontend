import { createContext, useContext } from "react";
import type { CartItem, Product } from "../types";

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (cartId: number) => Promise<void>;
  updateQuantity: (cartId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
};
