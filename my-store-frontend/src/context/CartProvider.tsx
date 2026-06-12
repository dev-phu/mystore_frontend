import React from 'react';
import { CartContext } from './CartContext';
import { useCart } from '../hooks/useCart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
