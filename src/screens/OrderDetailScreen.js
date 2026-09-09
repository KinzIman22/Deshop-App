// src/screens/OrderDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { order } = route.params || {};

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Order Details</Text>
      {order ? (
        <View style={styles.card}>
          <Text style={styles.text}>Order No: {order.orderNo}</Text>
          <Text style={styles.text}>Status: {order.status}</Text>
          <Text style={styles.text}>Date: {order.date}</Text>
          <Text style={styles.text}>Items: {order.items}</Text>
          <Text style={styles.text}>Total: {order.total}</Text>
        </View>
      ) : (
        <Text style={styles.text}>No order details found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20, color: '#1F2937' },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  text: { fontSize: 14, color: '#4B5563', marginBottom: 8 }
});