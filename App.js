import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { CartProvider } from './src/context/CartContext'; 
import AppNavigator from './src/navigation/AppNavigator'; 

export default function App() {
  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});