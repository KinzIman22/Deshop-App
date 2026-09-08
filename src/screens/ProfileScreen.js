import React, { useState, useEffect, useContext } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

// Import CartContext (Path adjust kar lijiyega agar folder structure alag ho)
import { CartContext } from '../context/CartContext';

// Import data handler
import { fetchHotSaleProducts } from '../data/hotSaleData';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Access addToCart function from CartContext
  const { addToCart } = useContext(CartContext);

  // State for profile image URI
  const [profileImage, setProfileImage] = useState(null);

  // States for Hot Sale Products
  const [hotSales, setHotSales] = useState([]);
  const [loadingHotSales, setLoadingHotSales] = useState(true);

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
    // Passing product, default color, and quantity as 1 based on your CartContext logic
    addToCart(product, 'Default', 1);
    Alert.alert("Success", `${product.title} has been added to your cart!`);
  };

  const orderStatuses = [
    { id: '1', title: 'Pending', icon: 'time-outline' },
    { id: '2', title: 'Processing', icon: 'cube-outline' },
    { id: '3', title: 'Shipped', icon: 'car-outline' },
    { id: '4', title: 'Review', icon: 'chatbubble-outline' },
    { id: '5', title: 'Preorder', icon: 'hourglass-outline' },
  ];

  const services = [
    { id: '1', title: 'Browsing History', icon: 'folder-outline' },
    { id: '2', title: 'Address', icon: 'location-outline' },
    { id: '3', title: 'Support', icon: 'headset-outline' },
    { id: '4', title: 'About Us', icon: 'alert-circle-outline' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        
        {/* Top Orange Gradient Header Section */}
        <LinearGradient 
          colors={['#FF7E29', '#FF4112']} 
          style={styles.headerContainer}
        >
          <View style={styles.topBarRow}>
            <TouchableOpacity 
              style={styles.settingsBtn}
              onPress={() => Alert.alert("Settings", "Navigate to Settings Screen")}
            >
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.userTopRow}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity style={styles.avatarContainer} onPress={handleImagePicker} activeOpacity={0.9}>
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
              <Text style={styles.userName}>Ahmed Hammad</Text>
              <View style={styles.vipBadge}>
                <Ionicons name="star" size={10} color="#B45309" style={{ marginRight: 3 }} />
                <Text style={styles.vipText}>Vip Center</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsBar}>
            <TouchableOpacity style={styles.statItem} onPress={() => Alert.alert("Wishlist", "Navigate to Wishlist")}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Wishlist</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.statItem} onPress={() => Alert.alert("Coupons", "Navigate to Coupons")}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Coupons</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.statItem} onPress={() => Alert.alert("Points", "Navigate to Points")}>
              <Text style={styles.statNumber}>55</Text>
              <Text style={styles.statLabel}>Points</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* My Orders Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>My Orders</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.orderStatusesRow}>
            {orderStatuses.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.statusItem}
                onPress={() => navigation.navigate('Orders')}
              >
                <View style={styles.iconBox}>
                  <Ionicons name={item.icon} size={22} color="#EF4444" />
                </View>
                <Text style={styles.statusText} numberOfLines={1}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Services</Text>

          <View style={styles.servicesRow}>
            {services.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.serviceItem}
                onPress={() => Alert.alert(item.title, `Opening ${item.title}...`)}
              >
                <View style={styles.iconBox}>
                  <Ionicons name={item.icon} size={22} color="#EF4444" />
                </View>
                <Text style={styles.serviceText} numberOfLines={1}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dynamic Hot Sale Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { textAlign: 'center', marginBottom: 14 }]}>Hot Sale (Top Selling)</Text>

          {loadingHotSales ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#EF4444" />
              <Text style={styles.loaderText}>Loading top sales...</Text>
            </View>
          ) : hotSales.length > 0 ? (
            <View style={styles.hotSaleRow}>
              {hotSales.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.productCard}
                  onPress={() => navigation.navigate('CategoryProducts', { productId: item.id })}
                >
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
                  
                  <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    
                    {/* Cart Button connected to CartContext */}
                    <TouchableOpacity 
                      style={styles.cartButton}
                      onPress={(e) => {
                        e.stopPropagation(); // Prevents card press event from firing
                        handleAddToCart(item);
                      }}
                    >
                      <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
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
    backgroundColor: '#F3F4F6',
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
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
    color: '#1F2937',
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
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusText: {
    fontSize: 10,
    color: '#4B5563',
    textAlign: 'center',
  },
  serviceText: {
    fontSize: 10,
    color: '#4B5563',
    textAlign: 'center',
  },
  hotSaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    color: '#1F2937',
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
    color: '#1F2937',
  },
  cartButton: {
    backgroundColor: '#EF4444',
    padding: 6,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    paddingVertical: 20,
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