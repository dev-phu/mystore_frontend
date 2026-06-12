import React from "react";
import AppRouter from "./router/AppRouter";
import { AuthProvider, CartProvider } from "./context";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => (
  <AuthProvider>
    <CartProvider>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#ffffff',
            color: '#0f172a',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid #f1f5f9',
          },
          success: {
            iconTheme: {
              primary: '#0f172a',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <AppRouter />
    </CartProvider>
  </AuthProvider>
);

export default App;
