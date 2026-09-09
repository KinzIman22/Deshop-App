// src/screens/ProfileScreen.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

// Import CartContext
import { CartContext } from '../context/CartContext';

// Import ThemeContext
import { ThemeContext } from '../context/ThemeContext';

// Import data handler
import { fetchHotSaleProducts } from '../data/hotSaleData';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

  // Access cart items from CartContext
  const { cart, addToCart } = useContext(CartContext);
  
  // Access global ThemeContext
  const { isDarkMode } = useContext(ThemeContext);

  // Dynamic Theme Colors consistent with OrdersScreen & other screens
  const theme = {
    bg: isDarkMode ? '#121212' : '#F3F4F6',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF', 
    text: isDarkMode ? '#F9FAFB' : '#1F2937',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#2D2D2D' : '#E5E7EB',
    accent: '#F97316',
    activeTabBg: isDarkMode ? '#3B2219' : '#FFF7ED',
    tabText: isDarkMode ? '#9CA3AF' : '#4B5563',
    activeTabText: '#F97316',
    badgeBg: isDarkMode ? '#3B2219' : '#FFF7ED',
    badgeText: '#F97316',
  };

  // State for profile information
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('Ahmed Hammad');

  // Listen to params coming back from EditProfileScreen every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (route.params?.updatedName) setName(route.params.updatedName);
      if (route.params?.updatedImage) setProfileImage(route.params.updatedImage);
    }, [route.params])
  );

  // States for Hot Sale Products
  const [hotSales, setHotSales] = useState([]);
  const [loadingHotSales, setLoadingHotSales] = useState(true);

  // Delivered orders mock count state
  const [deliveredCount, setDeliveredCount] = useState(12);

  useEffect(() => {
    loadHotSalesData();
  }, []);

  const loadHotSalesData = async () => {
    try {
      setLoadingHotSales(true);
      const data = await fetchHotSaleProducts();
      setHotSales(data);
    } catch (error) {
      console.error("Error loading hot sales:", error);
      Alert.alert("Error", "Failed to load hot sale products.");
    } finally {
      setLoadingHotSales(false);
    }
  };

  // Safe navigation helper
  const navigateToRoot = (screenName, params = {}) => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate(screenName, params);
    } else {
      navigation.navigate(screenName, params);
    }
  };

  // Function to handle image selection (Camera or Gallery)
  const handleImagePicker = () => {
    Alert.alert(
      "Update Profile Picture",
      "Choose an option",
      [
        { text: "Camera", onPress: openCamera },
        { text: "Gallery", onPress: openGallery },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Camera permission is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Gallery permission is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Handle adding product directly to global CartContext
  const handleAddToCart = (product) => {
    addToCart(product, 'Default', 1);
    Alert.alert("Success", `${product.title} has been added to your cart!`);
  };

  // Order statuses with badges
  const orderStatuses = [
    { id: '1', title: 'Pending', icon: 'time-outline', badge: '2' },
    { id: '2', title: 'Processing', icon: 'cube-outline', badge: '1' },
    { id: '3', title: 'Shipped', icon: 'car-outline', badge: '3' },
    { id: '4', title: 'Review', icon: 'refresh-outline', badge: '0' },
    { id: '5', title: 'Preorder', icon: 'hourglass-outline', badge: '1' },
  ];

  // Updated Services Section Items pointing to 'Services' screen with serviceType param
  const services = [
    { id: '1', title: 'Browsing History', icon: 'calendar-outline', serviceType: 'BrowsingHistory' },
    { id: '2', title: 'Address', icon: 'location-outline', serviceType: 'Address' },
    { id: '3', title: 'Support', icon: 'headset-outline', serviceType: 'Support' },
    { id: '4', title: 'About Us', icon: 'information-circle-outline', serviceType: 'AboutUs' },
  ];

  // Render function helper for individual product cards (Hot Sale cards explicitly forced to white background)
  const renderProductItem = (item) => (
    <TouchableOpacity 
      key={item.id}
      style={[styles.productCard, { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }]}
      onPress={() => navigateToRoot('CategoryProducts', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={[styles.productTitle, { color: '#1F2937' }]} numberOfLines={2}>{item.title}</Text>
      
      <View style={styles.productFooter}>
        <Text style={[styles.productPrice, { color: '#1F2937' }]}>{item.price}</Text>
        
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={(e) => {
            e.stopPropagation();
            handleAddToCart(item);
          }}
        >
          <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Helper to group hot sales into pairs for 2-column layout without nested FlatLists
  const renderProductGrid = () => {
    const rows = [];
    for (let i = 0; i < hotSales.length; i += 2) {
      const firstItem = hotSales[i];
      const secondItem = hotSales[i + 1];
      rows.push(
        <View key={`row-${i}`} style={styles.columnWrapper}>
          {renderProductItem(firstItem)}
          {secondItem ? renderProductItem(secondItem) : <View style={[styles.productCard, { backgroundColor: 'transparent', borderWidth: 0 }]} />}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        
        {/* Top Orange Gradient Header Section */}
        <LinearGradient 
          colors={['#FF7E29', '#FF4112']} 
          style={styles.headerContainer}
        >
          <View style={styles.topBarRow}>
            <TouchableOpacity 
              style={[styles.settingsBtn, { marginRight: 8 }]}
              onPress={() => navigateToRoot('EditProfile')}
            >
              <Ionicons name="create-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.settingsBtn, { marginLeft: 4 }]}
              onPress={() => navigateToRoot('Settings')}
            >
              <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.userTopRow}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity 
                style={[styles.avatarContainer, { backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF', borderColor: isDarkMode ? '#3A3A3A' : '#FFFFFF' }]} 
                onPress={handleImagePicker} 
                activeOpacity={0.9}
              >
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                ) : (
                  <Ionicons name="person" size={35} color="#9CA3AF" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cameraOverlayIcon} onPress={handleImagePicker} activeOpacity={0.8}>
                <Ionicons name="camera" size={11} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{name}</Text>
              <View style={styles.vipBadge}>
                <Ionicons name="star" size={10} color="#B45309" style={{ marginRight: 3 }} />
                <Text style={styles.vipText}>Vip Center</Text>
              </View>
            </View>
          </View>

          {/* Cart Items & Delivered Orders Count */}
          <View style={styles.statsBar}>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={() => navigation.navigate('CartTab')}
            >
              <Text style={styles.statNumber}>{cart ? cart.length : 0}</Text>
              <Text style={styles.statLabel}>Cart Items</Text>
            </TouchableOpacity>
            
            <View style={styles.statDivider} />
            
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={() => Alert.alert("Delivered Orders", `You have successfully received ${deliveredCount} orders.`)}
            >
              <Text style={styles.statNumber}>{deliveredCount}</Text>
              <Text style={styles.statLabel}>Delivered</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* My Orders Section */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>My Orders</Text>
            <TouchableOpacity onPress={() => navigateToRoot('Orders', { status: 'Pending' })}>
              <Text style={styles.viewAllText}>View All ></Text>
            </TouchableOpacity>
          </View>

          <View style={styles.orderStatusesRow}>
            {orderStatuses.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.statusItem}
                onPress={() => navigateToRoot('Orders', { status: item.title })}
              >
                <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#2A2A2A' : '#FEF2F2' }]}>
                  <Ionicons name={item.icon} size={22} color="#EF4444" />
                  {item.badge !== undefined && (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.statusText, { color: theme.textSecondary }]} numberOfLines={1}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services Section with Navigation */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Services</Text>

          <View style={styles.servicesRow}>
            {services.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.serviceItem}
                onPress={() => navigateToRoot('Services', { serviceType: item.serviceType })}
              >
                <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#2A2A2A' : '#FEF2F2' }]}>
                  <Ionicons name={item.icon} size={22} color="#EF4444" />
                </View>
                <Text style={[styles.serviceText, { color: theme.textSecondary }]} numberOfLines={1}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dynamic Hot Sale Section */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Hot Sale (Top Selling)</Text>
            <TouchableOpacity onPress={() => navigateToRoot('CategoryProducts')}>
              <Text style={styles.viewAllText}>View All ></Text>
            </TouchableOpacity>
          </View>

          {loadingHotSales ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#EF4444" />
              <Text style={styles.loaderText}>Loading top sales...</Text>
            </View>
          ) : hotSales.length > 0 ? (
            <View>{renderProductGrid()}</View>
          ) : (
            <Text style={styles.noDataText}>No products available right now.</Text>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topBarRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
    alignItems: 'center',
  },
  settingsBtn: {
    padding: 4,
  },
  userTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    width: 68,
    height: 68,
    marginRight: 14,
    position: 'relative',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  cameraOverlayIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#EF4444',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfoText: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  vipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#F3F4F6',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  sectionContainer: {
    marginTop: 10,
    marginHorizontal: 12,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  viewAllText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  orderStatusesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  serviceItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  statusText: {
    fontSize: 10,
    textAlign: 'center',
  },
  serviceText: {
    fontSize: 10,
    textAlign: 'center',
  },
  columnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productCard: {
    width: '48%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  productTitle: {
    fontSize: 11,
    height: 30,
    marginBottom: 6,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '700',
  },
  cartButton: {
    backgroundColor: '#EF4444',
    padding: 6,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 6,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    paddingVertical: 15,
  },
});