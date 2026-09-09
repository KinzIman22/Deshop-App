// src/screens/OrdersScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

// Import ThemeContext
import { ThemeContext } from '../context/ThemeContext';

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useNavigation();

  // Access global ThemeContext instead of local state
  const { isDarkMode } = useContext(ThemeContext);

  // Dynamic Theme Colors consistent with HomeScreen, ProfileScreen & OrderDetailScreen
  const theme = {
    bg: isDarkMode ? '#121212' : '#F3F4F6',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#F3F4F6' : '#1F2937',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#2D2D2D' : '#E5E7EB',
    accent: '#F97316',
    activeTabBg: isDarkMode ? '#3B2219' : '#FFF7ED',
    tabText: isDarkMode ? '#9CA3AF' : '#4B5563',
    activeTabText: '#F97316',
    badgeBg: isDarkMode ? '#3B2219' : '#FFF7ED',
    badgeText: '#F97316',
  };

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
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.bg }]}>
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Orders</Text>
        
        {/* Empty view to balance the header layout */}
        <View style={{ width: 28 }} />
      </View>

      {/* Tabs / Filter Bar */}
      <View style={[styles.tabContainer, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        {tabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton, 
                isActive && { backgroundColor: theme.activeTabBg }
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText, 
                { color: theme.tabText },
                isActive && { color: theme.activeTabText, fontWeight: '700' }
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Orders List for the selected tab */}
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.orderCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => navigation.navigate('OrderDetail', { order: item })}
            activeOpacity={0.8}
          >
            <View style={styles.orderCardHeader}>
              <Text style={[styles.orderNo, { color: theme.text }]}>{item.orderNo}</Text>
              <Text style={[styles.orderDate, { color: theme.textSecondary }]}>{item.date}</Text>
            </View>
            <Text style={[styles.orderItemName, { color: theme.textSecondary }]}>{item.items}</Text>
            <View style={[styles.orderCardFooter, { borderTopColor: theme.border }]}>
              <Text style={[styles.orderTotal, { color: theme.accent }]}>{item.total}</Text>
              <View style={[styles.statusBadge, { backgroundColor: theme.badgeBg }]}>
                <Text style={[styles.statusBadgeText, { color: theme.badgeText }]}>{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={50} color={theme.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No {activeTab.toLowerCase()} orders found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
  },
  backButton: { 
    padding: 4,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    textAlign: 'center',
  },
  tabContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 6, 
    paddingVertical: 8, 
    justifyContent: 'space-around', 
    borderBottomWidth: 1, 
  },
  tabButton: { 
    paddingVertical: 6, 
    paddingHorizontal: 8, 
    borderRadius: 12,
  },
  tabText: { 
    fontSize: 12, 
    fontWeight: '600', 
  },
  listContainer: { 
    padding: 12, 
  },
  orderCard: { 
    borderRadius: 10, 
    padding: 14, 
    marginBottom: 12, 
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  orderCardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 6, 
  },
  orderNo: { 
    fontSize: 14, 
    fontWeight: '700', 
  },
  orderDate: { 
    fontSize: 12, 
  },
  orderItemName: { 
    fontSize: 13, 
    marginBottom: 10, 
  },
  orderCardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    paddingTop: 8, 
  },
  orderTotal: { 
    fontSize: 14, 
    fontWeight: '700', 
  },
  statusBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 6, 
  },
  statusBadgeText: { 
    fontSize: 11, 
    fontWeight: '700', 
  },
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 50, 
  },
  emptyText: { 
    marginTop: 10, 
    fontSize: 14, 
  }
});