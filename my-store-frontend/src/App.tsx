import React from 'react';
import AppRouter from './router/AppRouter';
import { AuthProvider, CartProvider } from './context';

const App: React.FC = () => (
  <AuthProvider>
    <CartProvider>
      <AppRouter />
    </CartProvider>
  </AuthProvider>
);

export default App;
