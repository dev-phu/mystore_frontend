import { useState, useEffect, useCallback } from "react";
import type { CartItem, Product } from "../types";
import { orderService } from "../services/order.service";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export const useCart = () => {
  const { user } = useAuthContext();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCart = useCallback(async () => {
    if (!user || user.role !== "BUYER") {
      setItems([]);
      return;
    }
    try {
      setLoading(true);
      const data = await orderService.getCart();
      setItems(data);
    } catch (err: any) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.unit_price * item.quantity,
    0,
  );

  const addItem = async (product: Product, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    if (user.role !== "BUYER") {
      toast.error("Only buyers can add items to cart");
      return;
    }

    try {
      setLoading(true);
      await orderService.addToCart({
        product_id: product.product_id,
        quantity,
      });
      await fetchCart();
      toast.success(`Added ${product.title} to cart`);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartId: number) => {
    try {
      setLoading(true);
      await orderService.removeFromCart({ cart_id: cartId });
      await fetchCart();
      toast.success("Item removed from cart");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId: number, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(cartId);
    }
    try {
      setLoading(true);
      await orderService.updateCartItem({ cart_id: cartId, quantity });
      await fetchCart();
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => setItems([]);

  return {
    items,
    totalItems,
    totalPrice,
    loading,
    fetchCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};
