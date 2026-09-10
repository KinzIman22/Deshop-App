import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  ScrollView 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Apne theme context ka sahi path yahan dein
import { useTheme } from '../context/ThemeContext';

// Dummy Notifications Data
const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    type: 'order', // 'order' | 'promo' | 'system'
    title: 'Order Dispatched!',
    message: 'Your order #PK-ORD-745120 has been handed over to the courier and is on its way.',
    time: '10 mins ago',
    read: false,
    icon: 'rocket-outline',
  },
  {
    id: 'NOTIF-02',
    type: 'promo',
    title: 'Weekend Special Discount 20% Off!',
    message: 'Use code WEEKEND20 on all dry cleaning and laundry packages. Valid till Sunday.',
    time: '2 hours ago',
    read: false,
    icon: 'pricetag-outline',
  },
  {
    id: 'NOTIF-03',
    type: 'order',
    title: 'Order Delivered Successfully',
    message: 'Your order #PK-ORD-512390 has been delivered. Thank you for choosing our service!',
    time: 'Yesterday',
    read: true,
    icon: 'checkmark-circle-outline',
  },
  {
    id: 'NOTIF-04',
    type: 'system',
    title: 'App Update Available',
    message: 'Update to version 2.1.0 for a smoother experience, bug fixes, and new tracking features.',
    time: '3 days ago',
    read: true,
    icon: 'information-circle-outline',
  }
];

export default function NotificationsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors } = useTheme();

  // Notifications List State
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  // Active Filter Tab: 'ALL' | 'ORDERS' | 'PROMOS'
  const [activeTab, setActiveTab] = useState('ALL');

  // Theme mapping strictly based on your ThemeContext structure
  const currentTheme = {
    bg: colors.background,
    card: colors.cardBg,
    cardElevated: colors.inputBg,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    border: colors.borderColor,
    accent: '#EA580C',
    unreadBg: isDarkMode ? '#1F2937' : '#FFF7ED',
  };

  const filteredNotifications = notifications.filter(item => {
    if (activeTab === 'ORDERS') return item.type === 'order';
    if (activeTab === 'PROMOS') return item.type === 'promo';
    return true; // 'ALL'
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(item => item.id === id ? { ...item, read: true } : item));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: currentTheme.bg }]}>
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: currentTheme.card, borderBottomColor: currentTheme.border }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={[styles.backBtn, { backgroundColor: currentTheme.cardElevated }]}
        >
          <Ionicons name="chevron-back" size={22} color={currentTheme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Notifications</Text>
        
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: currentTheme.accent }}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: currentTheme.card, borderBottomColor: currentTheme.border }]}>
        {['ALL', 'ORDERS', 'PROMOS'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabItem, 
              activeTab === tab && { borderBottomColor: currentTheme.accent, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText, 
              { color: currentTheme.textSecondary },
              activeTab === tab && { color: currentTheme.accent, fontWeight: '700' }
            ]}>
              {tab === 'ALL' ? 'All' : tab === 'ORDERS' ? 'Orders' : 'Promotions'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications List */}
      <FlatList 
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.notifCard, 
              { backgroundColor: currentTheme.card, borderColor: currentTheme.border },
              !item.read && { backgroundColor: currentTheme.unreadBg, borderColor: currentTheme.accent }
            ]}
            onPress={() => markAsRead(item.id)}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={[styles.iconCircle, { backgroundColor: currentTheme.cardElevated }]}>
                <Ionicons name={item.icon} size={20} color={currentTheme.accent} />
              </View>
              
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={[styles.notifTitle, { color: currentTheme.text }]}>{item.title}</Text>
                  {!item.read && <View style={[styles.unreadDot, { backgroundColor: currentTheme.accent }]} />}
                </View>
                
                <Text style={[styles.notifMessage, { color: currentTheme.textSecondary }]}>{item.message}</Text>
                <Text style={[styles.notifTime, { color: currentTheme.textSecondary }]}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="bell-off-outline" size={48} color={currentTheme.textSecondary} />
            <Text style={[styles.emptyText, { color: currentTheme.text }]}>No notifications yet</Text>
            <Text style={[styles.emptySubText, { color: currentTheme.textSecondary }]}>We'll notify you when something important arrives.</Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 15, fontWeight: '700' },

  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: { fontSize: 12, fontWeight: '600' },

  notifCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifTitle: { fontSize: 13, fontWeight: '700', flex: 1, marginRight: 8 },
  notifMessage: { fontSize: 12, marginTop: 4, lineHeight: 17 },
  notifTime: { fontSize: 10, marginTop: 8 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  emptySubText: { fontSize: 12, textAlign: 'center', marginTop: 4, paddingHorizontal: 40 },
});