import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Linking, 
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext'; // Global Theme Hook

import appLogo from '../../assets/Logo/logo.png'; 

// Global Reusable Button Component for this screen
const GlobalButton = ({ title, onPress, type = 'primary', style, textStyle, icon }) => {
  const isPrimary = type === 'primary';
  const isDanger = type === 'danger';
  const isDashed = type === 'dashed';

  let backgroundColor = '#FF5722';
  let textColor = '#FFFFFF';
  let borderWidth = 0;
  let borderColor = 'transparent';
  let borderStyle = 'solid';

  if (isDanger) {
    backgroundColor = '#EF4444';
  } else if (isDashed) {
    backgroundColor = 'transparent';
    borderWidth = 1.5;
    borderColor = '#FF5722';
    borderStyle = 'dashed';
    textColor = '#FF5722';
  } else if (type === 'outline') {
    backgroundColor = 'transparent';
    borderWidth = 1;
    borderColor = '#FF5722';
    textColor = '#FF5722';
  }

  return (
    <TouchableOpacity 
      style={[
        styles.globalBtn, 
        { backgroundColor, borderWidth, borderColor, borderStyle },
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && <Ionicons name={icon} size={16} color={textColor} style={{ marginRight: 6 }} />}
      <Text style={[styles.globalBtnText, { color: textColor }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

  const { colors } = useTheme(); // Global Theme Colors
  const serviceType = route.params?.serviceType || 'AboutUs';

  const getHeaderTitle = () => {
    switch (serviceType) {
      case 'AboutUs': return 'About Us';
      case 'Address': return 'Address';
      case 'Support': return 'Customer Support';
      case 'BrowsingHistory': return 'Browsing History';
      default: return 'Service Details';
    }
  };

  // 1. About Us Content
  const renderAboutUs = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.logoContainer}>
        <View style={[styles.iconBox, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
          <Image source={appLogo} style={styles.realLogoImage} />
        </View>
        <Text style={[styles.appName, { color: colors.textPrimary }]}>DeShop</Text>
        <Text style={[styles.taglineText, { color: colors.textSecondary }]}>Your Trusted Shopping Partner</Text>
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>Version 1.0.0</Text>
      </View>

      <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Who We Are</Text>
        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
          DeShop is your ultimate destination for seamless online shopping. We bring you top-quality products, amazing deals, and a fast, reliable delivery experience right to your doorstep.
        </Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
          <Ionicons name="flash-outline" size={22} color="#FF5722" />
          <Text style={[styles.metricValue, { color: colors.textPrimary }]}>24 - 48 hrs</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Parcel Delivery</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
          <Ionicons name="trophy-outline" size={22} color="#D97706" />
          <Text style={[styles.metricValue, { color: colors.textPrimary }]}>3+ Years</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Excellence</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
          <Ionicons name="people-outline" size={22} color="#3B82F6" />
          <Text style={[styles.metricValue, { color: colors.textPrimary }]}>50k+</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Customer Feedbacks</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
          <Ionicons name="star-outline" size={22} color="#10B981" />
          <Text style={[styles.metricValue, { color: colors.textPrimary }]}>98.5%</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Satisfaction Rate</Text>
        </View>
      </View>

      <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Our Mission</Text>
        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
          To empower customers with a convenient, secure, and delightful shopping ecosystem built on trust, transparency, lightning-fast delivery, and top-tier customer service.
        </Text>
      </View>
    </ScrollView>
  );

  // 2. Address State & Logic
  const [addresses, setAddresses] = useState([
    { id: '1', title: 'Home', address: 'House 12, Block C, DHA Phase 5, Karachi', isDefault: true, icon: 'home-outline' },
    { id: '2', title: 'Office', address: '3rd Floor, Amber Tower, Shahrah-e-Faisal, Karachi', isDefault: false, icon: 'briefcase-outline' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAddressText, setNewAddressText] = useState('');

  const handleSetDefault = (id) => {
    setAddresses(prev => 
      prev.map(item => ({
        ...item,
        isDefault: item.id === id
      }))
    );
  };

  const handleRemove = (id) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to remove this address?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive",
          onPress: () => setAddresses(prev => prev.filter(item => item.id !== id))
        }
      ]
    );
  };

  const handleSaveNewAddress = () => {
    if (!newTitle.trim() || !newAddressText.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const lowerTitle = newTitle.trim().toLowerCase();
    let iconName = 'location-outline';
    if (lowerTitle.includes('home')) iconName = 'home-outline';
    else if (lowerTitle.includes('office')) iconName = 'briefcase-outline';

    const newEntry = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      address: newAddressText.trim(),
      isDefault: addresses.length === 0,
      icon: iconName,
    };

    setAddresses(prev => [...prev, newEntry]);
    setNewTitle('');
    setNewAddressText('');
    setIsModalVisible(false);
  };

  const renderAddress = () => (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {addresses.map((item) => (
          <View key={item.id} style={[styles.addressCard, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
            <View style={styles.cardTopRow}>
              <View style={styles.cardTitleRow}>
                <Ionicons name={item.icon} size={18} color="#FF5722" style={{ marginRight: 8 }} />
                <Text style={[styles.addressType, { color: colors.textPrimary }]}>{item.title}</Text>
                {item.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>
            </View>

            <Text style={[styles.addressText, { color: colors.textSecondary }]}>{item.address}</Text>

            <View style={styles.cardActionsRow}>
              {!item.isDefault && (
                <TouchableOpacity onPress={() => handleSetDefault(item.id)}>
                  <Text style={[styles.setDefaultText, { color: colors.textPrimary }]}>Set as default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => handleRemove(item.id)}>
                <Text style={[styles.removeText, { color: colors.textSecondary }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Global Button used as Dashed Add Button */}
        <GlobalButton 
          title="+ Add new address"
          type="dashed"
          onPress={() => setIsModalVisible(true)}
          style={{ marginTop: 6 }}
        />
      </ScrollView>

      {/* Add Address Form Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Add New Address</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Address Title (e.g. Home, Office, Gym)</Text>
            <TextInput 
              style={[styles.textInput, { backgroundColor: colors.inputBg, borderColor: colors.borderColor, color: colors.textPrimary }]}
              placeholder="Home"
              placeholderTextColor="#9CA3AF"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Complete Address</Text>
            <TextInput 
              style={[styles.textInput, { height: 80, textAlignVertical: 'top', backgroundColor: colors.inputBg, borderColor: colors.borderColor, color: colors.textPrimary }]}
              placeholder="House 12, Block C, Street 3, City..."
              placeholderTextColor="#9CA3AF"
              multiline={true}
              value={newAddressText}
              onChangeText={setNewAddressText}
            />

            {/* Global Primary Button inside Modal */}
            <GlobalButton 
              title="Save Address"
              type="primary"
              onPress={handleSaveNewAddress}
              style={{ marginTop: 20 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );

  // 3. Support Content
  const renderSupport = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={[styles.headerTitleText, { color: colors.textPrimary }]}>How can we help you?</Text>
      <Text style={[styles.headerSubtitleText, { color: colors.textSecondary }]}>Choose an option below to connect with our support team.</Text>

      <TouchableOpacity 
        style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}
        onPress={() => Linking.openURL('https://wa.me/923000000000')}
      >
        <View style={[styles.smallIconBox, { backgroundColor: colors.inputBg }]}>
          <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardMainTitle, { color: colors.textPrimary }]}>WhatsApp Support</Text>
          <Text style={[styles.subText, { color: colors.textSecondary }]}>Chat with our customer care agent instantly.</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}
        onPress={() => Linking.openURL('mailto:support@deshop.com')}
      >
        <View style={[styles.smallIconBox, { backgroundColor: colors.inputBg }]}>
          <Ionicons name="mail-outline" size={24} color="#EF4444" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardMainTitle, { color: colors.textPrimary }]}>Email Support</Text>
          <Text style={[styles.subText, { color: colors.textSecondary }]}>Send us your queries via email.</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}
        onPress={() => Linking.openURL('tel:+923000000000')}
      >
        <View style={[styles.smallIconBox, { backgroundColor: colors.inputBg }]}>
          <Ionicons name="call-outline" size={24} color="#3B82F6" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardMainTitle, { color: colors.textPrimary }]}>Helpline Call</Text>
          <Text style={[styles.subText, { color: colors.textSecondary }]}>Speak directly with our support staff.</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>
    </ScrollView>
  );

  // 4. Browsing History Content
  const historyItems = [
    { id: '1', title: 'Wireless Bluetooth Earbuds', price: '$29.99', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Smart Fitness Watch', price: '$49.99', image: 'https://via.placeholder.com/150' },
  ];

  const renderBrowsingHistory = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.historyHeaderRow}>
        <Text style={[styles.cardMainTitle, { color: colors.textPrimary }]}>Recently Viewed Products</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.clearText}>Clear History</Text>
        </TouchableOpacity>
      </View>

      {historyItems.map((item) => (
        <View key={item.id} style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.cardInfo}>
            <Text style={[styles.itemTitle, { color: colors.textPrimary }]} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </View>
      ))}
    </ScrollView>
  );

  const renderContent = () => {
    switch (serviceType) {
      case 'AboutUs': return renderAboutUs();
      case 'Address': return renderAddress();
      case 'Support': return renderSupport();
      case 'BrowsingHistory': return renderBrowsingHistory();
      default: return renderAboutUs();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.borderColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.inputBg }]}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{getHeaderTitle()}</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.body}>
        {renderContent()}
      </View>
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  // Global Button Styles
  globalBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  globalBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
  },
  realLogoImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
  },
  taglineText: {
    fontSize: 12,
    marginTop: 2,
  },
  versionText: {
    fontSize: 11,
    marginTop: 2,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 13,
    lineHeight: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  addressCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressType: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 8,
  },
  addressText: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
    marginLeft: 26,
  },
  cardActionsRow: {
    flexDirection: 'row',
    marginLeft: 26,
    gap: 16,
  },
  setDefaultText: {
    fontSize: 12,
    fontWeight: '600',
  },
  removeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  defaultBadge: {
    backgroundColor: '#FDEEDC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D97706',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitleText: {
    fontSize: 12,
    marginBottom: 16,
  },
  smallIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
    marginRight: 8,
  },
  cardMainTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  subText: {
    fontSize: 12,
  },
  historyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
  },
  itemImage: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'contain',
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
});