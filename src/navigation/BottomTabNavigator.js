import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen'; // Asli Categories Screen import kar li

// Baaki bachi hui tabs ke liye temporary placeholder
const DummyScreen = ({ route }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.text}>{route.name} Screen Coming Soon!</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#F97316', // Orange theme active color
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CategoriesTab') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'CartTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="CategoriesTab" 
        component={CategoriesScreen} // Yahan DummyScreen ki jagah CategoriesScreen laga di
        options={{ title: 'Categories' }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={DummyScreen} 
        options={{ title: 'Cart' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={DummyScreen} 
        options={{ title: 'You' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
});