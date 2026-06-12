import { useState, useEffect } from "react";
import type { CartItem, Product } from "../types";
import { STORAGE_KEYS } from "../constants";

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.unit_price * item.quantity,
    0,
  );

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.product_id === product.product_id);
      if (existing) {
        return prev.map((i) =>
          i.product.product_id === product.product_id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      const newItem: CartItem = {
        cart_id: Date.now(), // Generate a temporary cart_id for local state
        product,
        quantity: 1
      };
      return [...prev, newItem];
    });
  };

  const removeItem = (productId: number) =>
    setItems((prev) => prev.filter((i) => i.product.product_id !== productId));

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) return removeItem(productId);
    setItems((prev) =>
      prev.map((i) => (i.product.product_id === productId ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => setItems([]);

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};
