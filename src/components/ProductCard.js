import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductCard({ item, onPress, onAddToCart }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>${item.price}</Text>
          
          {/* Yeh wala TouchableOpacity aur onPress hona lazmi hai */}
          <TouchableOpacity 
            style={styles.cartBtn} 
            onPress={(e) => {
              e.stopPropagation(); // Yeh card ki apni detail navigation ko rokay ga
              onAddToCart && onAddToCart();
            }}
          >
            <Ionicons name="cart-outline" size={18} color="#EA580C" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  info: {
    marginTop: 6,
  },
  title: {
    fontSize: 12,
    color: '#1F2937',
    height: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  cartBtn: {
    padding: 6,
    backgroundColor: '#FFEDD5',
    borderRadius: 16,
  },
});