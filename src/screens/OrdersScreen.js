// src/screens/OrdersScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useNavigation();

  // Sabhi possible order statuses
  const tabs = ['Pending', 'Processing', 'Shipped', 'Review', 'Preorder'];

  // Agar Profile screen se koi specific status pass kiya gaya ho toh wahi active ho, warna default 'Pending' ho
  const initialTab = route.params?.status || 'Pending';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Yeh ensure karega ke agar route params change hon toh tab bhi update ho jaye
  useEffect(() => {
    if (route.params?.status) {
      setActiveTab(route.params.status);
    }
  }, [route.params?.status]);

  // Mock orders data including all statuses
  const orders = [
    { id: '1', orderNo: 'ORD-9842', status: 'Pending', date: 'Sep 08, 2026', total: '969.99 EGP', items: 'Mi Box S Xiaomi Original' },
    { id: '2', orderNo: 'ORD-9835', status: 'Processing', date: 'Sep 06, 2026', total: '450.00 EGP', items: 'Wireless Bluetooth Headphones' },
    { id: '3', orderNo: 'ORD-9810', status: 'Shipped', date: 'Sep 04, 2026', total: '320.00 EGP', items: 'Smart Fitness Band' },
    { id: '4', orderNo: 'ORD-9790', status: 'Review', date: 'Sep 01, 2026', total: '510.00 EGP', items: 'Full HD 1080p Webcam' },
    { id: '5', orderNo: 'ORD-9750', status: 'Preorder', date: 'Aug 28, 2026', total: '750.00 EGP', items: 'Portable Waterproof Speaker' },
  ];

  const filteredOrders = orders.filter(order => order.status === activeTab);

  // Back navigation function
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('ProfileTab');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.emptySpacer} />
      </View>

      {/* Tabs / Filter Bar */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List for the selected tab */}
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetail', { order: item })}
            activeOpacity={0.8}
          >
            <View style={styles.orderCardHeader}>
              <Text style={styles.orderNo}>{item.orderNo}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <Text style={styles.orderItemName}>{item.items}</Text>
            <View style={styles.orderCardFooter}>
              <Text style={styles.orderTotal}>{item.total}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={50} color="#9CA3AF" />
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} orders found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E7EB' 
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', textAlign: 'center' },
  emptySpacer: { width: 24, height: 24 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', paddingHorizontal: 6, paddingVertical: 8, justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tabButton: { paddingVertical: 6, paddingHorizontal: 8, borderRadius: 12 },
  activeTabButton: { backgroundColor: '#FEF2F2' },
  tabText: { fontSize: 12, color: '#4B5563', fontWeight: '600' },
  activeTabText: { color: '#EF4444' },
  listContainer: { padding: 12 },
  orderCard: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  orderCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  orderNo: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  orderDate: { fontSize: 12, color: '#9CA3AF' },
  orderItemName: { fontSize: 13, color: '#4B5563', marginBottom: 10 },
  orderCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 8 },
  orderTotal: { fontSize: 14, fontWeight: '700', color: '#EF4444' },
  statusBadge: { backgroundColor: '#FEF2F2', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusBadgeText: { fontSize: 11, fontWeight: '700', color: '#EF4444' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  emptyText: { marginTop: 10, fontSize: 14, color: '#9CA3AF' }
});