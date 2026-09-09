import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList, 
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

// Sahi root-level relative path
import appLogo from '../../assets/Logo/logo.png'; 

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

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

  // 1. About Us Content (Using local real logo & business metrics)
  const renderAboutUs = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Logo & App Info */}
      <View style={styles.logoContainer}>
        <View style={styles.iconBox}>
          <Image 
            source={appLogo} 
            style={styles.realLogoImage} 
          />
        </View>
        <Text style={styles.appName}>DeShop</Text>
        <Text style={styles.taglineText}>Your Trusted Shopping Partner</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>

      {/* Who We Are */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Who We Are</Text>
        <Text style={styles.sectionText}>
          DeShop is your ultimate destination for seamless online shopping. We bring you top-quality products, amazing deals, and a fast, reliable delivery experience right to your doorstep.
        </Text>
      </View>

      {/* Key Metrics & Achievements Grid */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Ionicons name="flash-outline" size={22} color="#FF5722" />
          <Text style={styles.metricValue}>24 - 48 hrs</Text>
          <Text style={styles.metricLabel}>Parcel Delivery</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="trophy-outline" size={22} color="#D97706" />
          <Text style={styles.metricValue}>3+ Years</Text>
          <Text style={styles.metricLabel}>Excellence</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Ionicons name="people-outline" size={22} color="#3B82F6" />
          <Text style={styles.metricValue}>50k+</Text>
          <Text style={styles.metricLabel}>Customer Feedbacks</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="star-outline" size={22} color="#10B981" />
          <Text style={styles.metricValue}>98.5%</Text>
          <Text style={styles.metricLabel}>Satisfaction Rate</Text>
        </View>
      </View>

      {/* Our Mission */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
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
          <View key={item.id} style={styles.addressCard}>
            <View style={styles.cardTopRow}>
              <View style={styles.cardTitleRow}>
                <Ionicons name={item.icon} size={18} color="#FF5722" style={{ marginRight: 8 }} />
                <Text style={styles.addressType}>{item.title}</Text>
                {item.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>
            </View>

            <Text style={styles.addressText}>{item.address}</Text>

            <View style={styles.cardActionsRow}>
              {!item.isDefault && (
                <TouchableOpacity onPress={() => handleSetDefault(item.id)}>
                  <Text style={styles.setDefaultText}>Set as default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => handleRemove(item.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.addButtonDashed}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.addButtonDashedText}>+ Add new address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Address Form Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Address</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Address Title (e.g. Home, Office, Gym)</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="Home"
              placeholderTextColor="#9CA3AF"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={styles.inputLabel}>Complete Address</Text>
            <TextInput 
              style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
              placeholder="House 12, Block C, Street 3, City..."
              placeholderTextColor="#9CA3AF"
              multiline={true}
              value={newAddressText}
              onChangeText={setNewAddressText}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveNewAddress}>
              <Text style={styles.saveButtonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  // 3. Support Content
  const renderSupport = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.headerTitleText}>How can we help you?</Text>
      <Text style={styles.headerSubtitleText}>Choose an option below to connect with our support team.</Text>

      <TouchableOpacity 
        style={styles.card}
        onPress={() => Linking.openURL('https://wa.me/923000000000')}
      >
        <View style={styles.smallIconBox}>
          <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardMainTitle}>WhatsApp Support</Text>
          <Text style={styles.subText}>Chat with our customer care agent instantly.</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.card}
        onPress={() => Linking.openURL('mailto:support@deshop.com')}
      >
        <View style={styles.smallIconBox}>
          <Ionicons name="mail-outline" size={24} color="#EF4444" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardMainTitle}>Email Support</Text>
          <Text style={styles.subText}>Send us your queries via email.</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.card}
        onPress={() => Linking.openURL('tel:+923000000000')}
      >
        <View style={styles.smallIconBox}>
          <Ionicons name="call-outline" size={24} color="#3B82F6" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardMainTitle}>Helpline Call</Text>
          <Text style={styles.subText}>Speak directly with our support staff.</Text>
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
    <FlatList
      data={historyItems}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.scrollContent}
      ListHeaderComponent={
        <View style={styles.historyHeaderRow}>
          <Text style={styles.cardMainTitle}>Recently Viewed Products</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.clearText}>Clear History</Text>
          </TouchableOpacity>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.cardInfo}>
            <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </View>
      )}
    />
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
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
    backgroundColor: '#FFFBF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  realLogoImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  taglineText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  versionText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 6,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    color: '#1F2937',
    marginRight: 8,
  },
  addressText: {
    fontSize: 12,
    color: '#4B5563',
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
    color: '#FF5722',
  },
  removeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
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
  addButtonDashed: {
    borderWidth: 1.5,
    borderColor: '#FF5722',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    backgroundColor: '#FFFBF9',
  },
  addButtonDashedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF5722',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
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
    color: '#1F2937',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 6,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  saveButton: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitleText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  smallIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
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
    color: '#1F2937',
  },
  subText: {
    fontSize: 12,
    color: '#4B5563',
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
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
});