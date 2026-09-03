// src/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import { scale, verticalScale, moderateScale, SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/responsive';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const iconsSlideAnim = useRef(new Animated.Value(verticalScale(50))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(iconsSlideAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Centered Animated Logo Section */}
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image 
          source={require('../../assets/Logo/logo.png')} 
          style={styles.logoImage} 
          resizeMode="contain" 
        />
      </Animated.View>

      {/* Floating Shopping & Delivery Icons Feature Row */}
      <Animated.View style={[styles.featuresContainer, { opacity: fadeAnim, transform: [{ translateY: iconsSlideAnim }] }]}>
        <View style={styles.iconBadge}>
          <Ionicons name="bag-handle-outline" size={moderateScale(24)} color={COLORS.white} />
          <Text style={styles.iconText}>Mega Deals</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.iconBadge}>
          <MaterialCommunityIcons name="bike-fast" size={moderateScale(26)} color={COLORS.white} />
          <Text style={styles.iconText}>Fast Delivery</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.iconBadge}>
          <Ionicons name="shield-checkmark-outline" size={moderateScale(24)} color={COLORS.white} />
          <Text style={styles.iconText}>Secure Pay</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(160),
    height: scale(160),
    marginBottom: verticalScale(40),
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  featuresContainer: {
    position: 'absolute',
    bottom: verticalScale(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    width: '100%',
  },
  iconBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconText: {
    color: COLORS.white,
    fontSize: moderateScale(12),
    marginTop: verticalScale(6),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: verticalScale(30),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: scale(10),
  },
});