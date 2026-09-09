// src/screens/OrderDetailScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import ThemeContext
import { ThemeContext } from '../context/ThemeContext';

export default function OrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params || {};

  // Access global ThemeContext instead of local state
  const { isDarkMode } = useContext(ThemeContext);

  // Dynamic Theme Colors consistent with HomeScreen, ProfileScreen & other screens
  const theme = {
    bg: isDarkMode ? '#121212' : '#F3F4F6',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#F3F4F6' : '#1F2937',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#2D2D2D' : '#E5E7EB',
    accent: '#F97316',
    statusBg: isDarkMode ? '#064E3B' : '#FEF3C7',
    statusText: isDarkMode ? '#6EE7B7' : '#D97706',
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.bg }]}>
      
      {/* Header Bar with Back Button */}
      <View style={[styles.headerBar, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={theme.text} />
          <Text style={[styles.backText, { color: theme.text }]}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Order Details</Text>
        {/* Empty view to balance the header layout since local theme toggle is removed */}
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {order ? (
          <>
            {/* Order Status Card */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.cardHeaderRow}>
                <View>
                  <Text style={[styles.labelSmall, { color: theme.textSecondary }]}>ORDER NUMBER</Text>
                  <Text style={[styles.orderNumberText, { color: theme.text }]}>{order.orderNo}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: theme.statusBg }]}>
                  <Text style={[styles.statusText, { color: theme.statusText }]}>{order.status}</Text>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <View style={styles.rowDetails}>
                <Ionicons name="calendar-outline" size={16} color={theme.textSecondary} style={{ marginRight: 6 }} />
                <Text style={[styles.textSecondary, { color: theme.textSecondary }]}>Order Date: </Text>
                <Text style={[styles.textBold, { color: theme.text }]}>{order.date}</Text>
              </View>
            </View>

            {/* Items Summary Card */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Items Summary</Text>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              
              <View style={styles.itemView}>
                <Ionicons name="cube-outline" size={18} color={theme.accent} style={{ marginRight: 10 }} />
                <Text style={[styles.itemText, { color: theme.text }]}>{order.items}</Text>
              </View>
            </View>

            {/* Payment & Total Card */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Payment Information</Text>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              
              <View style={styles.totalRow}>
                <Text style={[styles.textSecondary, { color: theme.textSecondary }]}>Total Amount</Text>
                <Text style={[styles.totalAmount, { color: theme.accent }]}>{order.total}</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.noDataContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={theme.textSecondary} style={{ marginBottom: 12 }} />
            <Text style={[styles.noDataText, { color: theme.textSecondary }]}>No order details found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  card: { 
    padding: 16, 
    borderRadius: 12, 
    borderWidth: 1, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  orderNumberText: {
    fontSize: 16,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  rowDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSecondary: {
    fontSize: 13,
  },
  textBold: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  noDataContainer: {
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: { 
    fontSize: 14, 
    textAlign: 'center',
  }
});