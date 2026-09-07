import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutAddressScreen from '../screens/CheckoutAddressScreen';
import WhyChooseScreen from '../screens/WhyChooseScreen'; // ya jo bhi aapne file ka naam rakha ho

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
       <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
       <Stack.Screen name="ItemDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
       <Stack.Screen name="Cart" component={CartScreen} />
       <Stack.Screen 
  name="CheckoutAddress" 
  component={CheckoutAddressScreen} 
  options={{ headerShown: false }} 
/>
<Stack.Screen 
  name="WhyChoose" 
  component={WhyChooseScreen} 
  options={{ headerShown: false }} // Kyunki humne code mein khud custom header banaya hai
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}