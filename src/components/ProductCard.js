import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.soldText}>{item.sold}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price}</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={16} color="#F97316" />
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
    marginBottom: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 8,
  },
  title: {
    fontSize: 12,
    color: '#1F2937',
    height: 32,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 11,
    color: '#4B5563',
    marginLeft: 2,
    fontWeight: '600',
  },
  soldText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F97316', // Orange Theme Price Accent
  },
  cartButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FED7AA',
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
});