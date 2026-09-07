import React from 'react';
import { CartProvider } from './src/context/CartContext'; // Path apne project ke mutabiq check kar lein
import AppNavigator from './src/navigation/AppNavigator'; // Ya jo bhi aapka main navigator ho

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}