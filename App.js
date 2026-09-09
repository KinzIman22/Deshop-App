import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { CartProvider } from './src/context/CartContext'; 
import { ThemeProvider, useTheme } from './src/context/ThemeContext'; // ThemeContext import kiya
import AppNavigator from './src/navigation/AppNavigator'; 

// Main component jo theme ke mutabiq background aur status bar handle karega
function MainApp() {
  const { colors, isDarkMode } = useTheme();

  return (
    <View style={[styles.rootContainer, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={colors.background} 
        translucent={false} 
      />
      <AppNavigator />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});