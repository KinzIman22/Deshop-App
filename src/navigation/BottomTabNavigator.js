import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen'; 
import ProfileScreen from '../screens/ProfileScreen'; // <-- 1. Asli Profile Screen import kar li

import { Ionicons } from '@expo/vector-icons';

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
        component={CategoriesScreen} 
        options={{ title: 'Categories' }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={CartScreen} 
        options={{ title: 'Cart' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} // <-- 2. DummyScreen ki jagah ProfileScreen laga di
        options={{ title: 'You' }}
      />
    </Tab.Navigator>
  );
}