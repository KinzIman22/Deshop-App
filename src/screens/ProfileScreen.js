import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const orderStatuses = [
    { id: '1', title: 'To Pay', icon: 'wallet-outline' },
    { id: '2', title: 'To Ship', icon: 'cube-outline' },
    { id: '3', title: 'To Receive', icon: 'car-outline' },
    { id: '4', title: 'To Review', icon: 'star-outline' },
    { id: '5', title: 'Returns & Cancellations', icon: 'refresh-outline' },
  ];

  const miniFeatures = [
    { id: '1', title: 'Flash Deals', icon: 'flash-outline' },
    { id: '2', title: 'Vouchers', icon: 'ticket-outline' },
    { id: '3', title: 'Pay Bills', icon: 'home-outline' },
    { id: '4', title: 'Rewards', icon: 'gift-outline' },
  ];

  const recentlyViewed = [
    { id: '1', discount: '50%', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200', price: 'Rs.149', oldPrice: 'Rs.300' },
    { id: '2', discount: '65%', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200', price: 'Rs.349', oldPrice: 'Rs.1,000' },
    { id: '3', discount: '67%', image: 'https://images.unsplash.com/photo-1583209820515-444458dc8790?w=200', price: 'Rs.199', oldPrice: 'Rs.600' },
  ];

  const utilityGrid = [
    { id: '1', title: 'My Messages', icon: 'mail-outline' },
    { id: '2', title: 'Buy Any 3', icon: 'cart-outline' },
    { id: '3', title: 'Pickup Points', icon: 'location-outline' },
    { id: '4', title: 'Help Center', icon: 'help-circle-outline' },
    { id: '5', title: 'Customer Care', icon: 'headset-outline' },
    { id: '6', title: 'My Reviews', icon: 'star-half-outline' },
    { id: '7', title: 'Save More', icon: 'pricetag-outline' },
    { id: '8', title: 'Settings', icon: 'settings-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.headerContainer}>
          <View style={styles.userTopRow}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarEmoji}>😆</Text>
            </View>
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>kinzu22.</Text>
              <View style={styles.statsRow}>
                <Text style={styles.statText}><Text style={styles.statBold}>13</Text> Wishlist</Text>
                <Text style={styles.statDot}>·</Text>
                <Text style={styles.statText}><Text style={styles.statBold}>0</Text> Vouchers</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsBtn}>
              <Ionicons name="settings-outline" size={22} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo / Rewards Cards Section */}
        <View style={styles.rewardsContainer}>
          <View style={styles.rewardCardCoins}>
            <View>
              <Text style={styles.rewardTitle}>Deshop Coins</Text>
              <Text style={styles.rewardSubtitle}>Collect Coins Save more!</Text>
            </View>
            <TouchableOpacity style={styles.useNowBtn}>
              <Text style={styles.useNowText}>Use Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rewardCardFreebie}>
            <View>
              <Text style={styles.rewardTitle}>Deshop Freebie</Text>
              <Text style={styles.rewardSubtitle}>Invite & Win Special Prizes</Text>
            </View>
            <TouchableOpacity style={styles.playNowBtn}>
              <Text style={styles.playNowText}>Play Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mini Features Icons Bar */}
        <View style={styles.miniFeaturesBar}>
          {miniFeatures.map((item) => (
            <TouchableOpacity key={item.id} style={styles.miniFeatureItem}>
              <View style={styles.iconCircleBox}>
                <Ionicons name={item.icon} size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.miniFeatureText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* My Orders Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>My Orders</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All Orders {'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.orderStatusesRow}>
            {orderStatuses.map((item) => (
              <TouchableOpacity key={item.id} style={styles.statusItem}>
                <View style={styles.iconCircleBox}>
                  <Ionicons name={item.icon} size={22} color="#FFFFFF" />
                </View>
                <Text style={styles.statusText} numberOfLines={2}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recently Viewed Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recently Viewed</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View More {'>'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScroll}>
            {recentlyViewed.map((item) => (
              <View key={item.id} style={styles.recentCard}>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>↓ {item.discount}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.recentImage} />
                <Text style={styles.recentPrice}>{item.price}</Text>
                <Text style={styles.recentOldPrice}>{item.oldPrice}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Deshop Wallet Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Deshop Wallet</Text>
            <Ionicons name="eye-off-outline" size={16} color="#6B7280" />
          </View>
          <View style={styles.walletRow}>
            <View style={styles.walletBox}>
              <Text style={styles.walletLabel}>Deshop Wallet</Text>
              <View style={styles.walletBottom}>
                <Text style={styles.walletAmount}>0</Text>
                <TouchableOpacity style={styles.depositBtn}>
                  <Text style={styles.depositText}>Deposit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.walletBox}>
              <Text style={styles.walletLabel}>Payment Options</Text>
              <Text style={styles.walletAmount}>0</Text>
            </View>
          </View>
        </View>

        {/* Utility Grid Services */}
        <View style={styles.utilityGridContainer}>
          {utilityGrid.map((item) => (
            <TouchableOpacity key={item.id} style={styles.utilityGridItem}>
              <View style={styles.iconCircleBox}>
                <Ionicons name={item.icon} size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.utilityGridText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  userTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  userInfoText: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statText: {
    fontSize: 11,
    color: '#6B7280',
  },
  statBold: {
    fontWeight: '700',
    color: '#1F2937',
  },
  statDot: {
    marginHorizontal: 4,
    color: '#9CA3AF',
  },
  settingsBtn: {
    padding: 6,
  },
  rewardsContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
  },
  rewardCardCoins: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    padding: 10,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#F97316',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardCardFreebie: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    padding: 10,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#F97316',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  rewardSubtitle: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  useNowBtn: {
    backgroundColor: '#F97316',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  useNowText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  playNowBtn: {
    backgroundColor: '#F97316',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  playNowText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  miniFeaturesBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  miniFeatureItem: {
    alignItems: 'center',
  },
  // Common style for all icon containers to have full orange background & white icons
  iconCircleBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F97316',
    borderWidth: 1,
    borderColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  miniFeatureText: {
    fontSize: 11,
    color: '#374151',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  orderStatusesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusText: {
    fontSize: 10,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 4,
  },
  recentScroll: {
    flexDirection: 'row',
  },
  recentCard: {
    width: 100,
    marginRight: 10,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#EF4444',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  recentImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    marginBottom: 6,
  },
  recentPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  recentOldPrice: {
    fontSize: 10,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 10,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'space-between',
  },
  walletLabel: {
    fontSize: 12,
    color: '#4B5563',
  },
  walletBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  walletAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  depositBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  depositText: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '600',
  },
  utilityGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  utilityGridItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  utilityGridText: {
    fontSize: 11,
    color: '#374151',
    marginTop: 6,
    textAlign: 'center',
  },
});