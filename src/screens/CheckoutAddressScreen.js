import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Pakistan Provinces List
const PAKISTAN_PROVINCES = [
  'Punjab', 
  'Sindh', 
  'Khyber Pakhtunkhwa (KP)', 
  'Balochistan', 
  'Islamabad Capital Territory', 
  'Azad Jammu & Kashmir (AJK)', 
  'Gilgit-Baltistan'
];

// All Pakistan Cities combined list for search & drop-down
const ALL_PAKISTAN_CITIES = [
  'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Bahawalpur', 'Sargodha', 'Sialkot', 'Sheikhupura', 'Rahim Yar Khan', 'Gujrat', 'Sahiwal',
  'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpur Khas', 'Jacobabad', 'Shikarpur', 'Tando Adam',
  'Peshawar', 'Abbottabad', 'Mardan', 'Swat', 'Mingora', 'Kohat', 'Nowshera', 'Dera Ismail Khan', 'Charsadda',
  'Quetta', 'Gwadar', 'Turbat', 'Khuzdar', 'Sibi', 'Hub', 'Chaman', 'Loralai',
  'Islamabad',
  'Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli', 'Bhimber',
  'Gilgit', 'Skardu', 'Hunza', 'Diamer', 'Ghizer'
];

export default function CheckoutAddressScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('332 7125227');
  
  // Separate states for Province and City
  const [selectedProvince, setSelectedProvince] = useState('Punjab');
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Selector Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('province'); // 'province' or 'city'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state for warning & steps
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);

  // Delivery Alert Step Animation states
  const [step1Green, setStep1Green] = useState(false);
  const [line1Green, setLine1Green] = useState(false);
  const [step2Green, setStep2Green] = useState(false);
  const [line2Green, setLine2Green] = useState(false);
  const [step3Green, setStep3Green] = useState(false);

  // Filter list data based on type with search query
  const getModalData = () => {
    if (modalType === 'province') {
      return PAKISTAN_PROVINCES.filter(p => 
        p.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      if (!searchQuery.trim()) return ALL_PAKISTAN_CITIES;
      return ALL_PAKISTAN_CITIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  };

  const handleSave = () => {
    if (!fullName.trim() || !address.trim() || !selectedCity.trim()) {
      Alert.alert("Error", "Please fill in all mandatory fields.");
      return;
    }
    setShowWarningModal(true);
  };

  const handleItIsCorrect = () => {
    setShowWarningModal(false);
    setShowAlertsModal(true);

    setStep1Green(false);
    setLine1Green(false);
    setStep2Green(false);
    setLine2Green(false);
    setStep3Green(false);

    setTimeout(() => { setStep1Green(true); }, 500);
    setTimeout(() => { setLine1Green(true); }, 1200);
    setTimeout(() => { setStep2Green(true); }, 1800);
    setTimeout(() => { setLine2Green(true); }, 2400);
    setTimeout(() => { setStep3Green(true); }, 3000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add an address to order</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Safeguard Secure Banner */}
        <View style={styles.secureContainer}>
          <Ionicons name="lock-closed" size={13} color="#16A34A" />
          <Text style={styles.secureText}> All data is safeguarded</Text>
        </View>

        {/* Free Shipping Highlight Banner */}
        <View style={styles.promoBanner}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="checkmark-circle" size={15} color="#16A34A" />
            <Text style={styles.promoText}> Free shipping</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="checkmark-circle" size={15} color="#16A34A" />
            <Text style={styles.promoText}> 30-day price adjustment</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 30 }}>
          
          {/* Country Selector */}
          <View style={styles.countrySelector}>
            <Text style={styles.countryLabel}>Country / Region</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: '700', color: '#1F2937', marginRight: 4 }}>Pakistan</Text>
              <Ionicons name="shield-checkmark" size={16} color="#16A34A" />
            </View>
          </View>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full name <Text style={{ color: '#EA580C' }}>*</Text></Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder="Enter full name"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#9CA3AF"
              />
              {fullName.length > 0 && (
                <TouchableOpacity onPress={() => setFullName('')}>
                  <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number <Text style={{ color: '#EA580C' }}>*</Text></Text>
            <View style={[styles.inputContainer, { paddingHorizontal: 0 }]}>
              <View style={styles.phonePrefix}>
                <Text style={{ fontWeight: '600', color: '#1F2937', fontSize: 13 }}>PK +92</Text>
                <View style={styles.verticalDivider} />
              </View>
              <TextInput 
                style={[styles.input, { paddingLeft: 8 }]}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Province Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Province <Text style={{ color: '#EA580C' }}>*</Text></Text>
            <TouchableOpacity 
              style={styles.dropdownContainer} 
              onPress={() => {
                setModalType('province');
                setSearchQuery('');
                setModalVisible(true);
              }}
            >
              <Text style={{ color: '#1F2937', fontWeight: '600' }}>{selectedProvince}</Text>
              <Ionicons name="chevron-down" size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {/* City Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City <Text style={{ color: '#EA580C' }}>*</Text></Text>
            <TouchableOpacity 
              style={styles.dropdownContainer} 
              onPress={() => {
                setModalType('city');
                setSearchQuery('');
                setModalVisible(true);
              }}
            >
              <Text style={{ color: '#1F2937', fontWeight: '600' }}>{selectedCity || 'Select City'}</Text>
              <Ionicons name="search-outline" size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {/* Building, street */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Building, street, and area etc. <Text style={{ color: '#EA580C' }}>*</Text></Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder="House #15, Street #1, Wapda Town"
                value={address}
                onChangeText={setAddress}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Postal / ZIP Code (Optional) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Postal Code / ZIP (Optional)</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder="e.g., 54000"
                value={postalCode}
                onChangeText={setPostalCode}
                keyboardType="number-pad"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

        </ScrollView>

        {/* Bottom Save Button */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save & Proceed</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* --- SELECTOR MODAL (Province / All Pakistan Cities Selection) --- */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.selectorModalOverlay}>
          <View style={styles.selectorModalContent}>
            
            <View style={styles.selectorHeader}>
              <Text style={styles.selectorTitle}>
                {modalType === 'province' ? 'Select Province' : 'Select City in Pakistan'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color="#1F2937" />
              </TouchableOpacity>
            </View>

            {/* Search Box inside Modal */}
            <View style={styles.searchBox}>
              <Ionicons name="search" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
              <TextInput 
                style={{ flex: 1, fontSize: 13, color: '#1F2937' }}
                placeholder={modalType === 'province' ? "Search province..." : "Search any city in Pakistan..."}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>

            <FlatList 
              data={getModalData()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.listItem}
                  onPress={() => {
                    if (modalType === 'province') {
                      setSelectedProvince(item);
                    } else {
                      setSelectedCity(item);
                    }
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.listItemText, 
                    ((modalType === 'province' && selectedProvince === item) || 
                     (modalType === 'city' && selectedCity === item)) && { color: '#EA580C', fontWeight: '700' }
                  ]}>
                    {item}
                  </Text>
                  {((modalType === 'province' && selectedProvince === item) || 
                    (modalType === 'city' && selectedCity === item)) && (
                    <Ionicons name="checkmark" size={18} color="#EA580C" />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8 }}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', color: '#9CA3AF', marginTop: 20, fontSize: 13 }}>
                  No results found
                </Text>
              }
            />

          </View>
        </View>
      </Modal>

      {/* --- MODAL 1: Address Warning Modal --- */}
      <Modal visible={showWarningModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.warningModalContent}>
            <View style={styles.warningIconBg}>
              <Ionicons name="alert" size={24} color="#D97706" />
            </View>
            
            <Text style={styles.warningTitle}>
              Courier may be unable to deliver if building or house number is missing. Please verify your address.
            </Text>

            <Text style={styles.shippingAddressLabel}>Shipping address preview:</Text>
            <View style={styles.addressPreviewBox}>
              <Text style={styles.addressPreviewText}>
                {address ? address : 'House #12'}, {selectedCity}, {selectedProvince} {postalCode ? `- ${postalCode}` : ''}
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.editMyAddressBtn} 
              onPress={() => setShowWarningModal(false)}
            >
              <Text style={styles.editMyAddressText}>Edit my address</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.isCorrectBtn} 
              onPress={handleItIsCorrect}
            >
              <Text style={styles.isCorrectText}>It is correct</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* --- MODAL 2: Delivery Alerts & Step Animation Modal --- */}
      <Modal visible={showAlertsModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.alertsModalContent}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <Text style={styles.alertsTitle}>Delivery alerts</Text>
              <TouchableOpacity onPress={() => setShowAlertsModal(false)}>
                <Ionicons name="close" size={20} color="#1F2937" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.alertsSubTitle}>Turn on notifications to track real-time parcel movement.</Text>

            {/* Stepper Graphic Progress */}
            <View style={styles.stepperContainer}>
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, step1Green && styles.greenCircle]}>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.stepText}>Processing</Text>
              </View>

              <View style={[styles.stepLine, line1Green && styles.greenLine]} />

              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, step2Green && styles.greenCircle]}>
                  <MaterialCommunityIcons name="truck-delivery" size={15} color={step2Green ? "#FFF" : "#9CA3AF"} />
                </View>
                <Text style={styles.stepText}>Shipped</Text>
              </View>

              <View style={[styles.stepLine, line2Green && styles.greenLine]} />

              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, step3Green && styles.greenCircle]}>
                  <MaterialCommunityIcons name="package-variant-closed" size={15} color={step3Green ? "#FFF" : "#9CA3AF"} />
                </View>
                <Text style={styles.stepText}>Delivered</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.okButton, step3Green && { backgroundColor: '#16A34A' }]} 
              onPress={() => {
                setShowAlertsModal(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.okButtonText}>Continue</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  secureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  secureText: { color: '#16A34A', fontWeight: '600', fontSize: 11 },
  promoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DCFCE7',
  },
  promoText: { fontSize: 11, color: '#166534', fontWeight: '600' },
  countrySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  countryLabel: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 6 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  input: { flex: 1, fontSize: 13, color: '#1E293B' },
  phonePrefix: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 4 },
  verticalDivider: { width: 1, height: 20, backgroundColor: '#CBD5E1', marginLeft: 10 },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  footer: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  saveButton: {
    backgroundColor: '#EA580C',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  
  // Selector Modal Styles
  selectorModalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  selectorModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '65%',
    paddingBottom: 30,
  },
  selectorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  selectorTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  listItemText: { fontSize: 13, color: '#334155' },

  // Warning Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  warningModalContent: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, width: '100%', maxWidth: 330, alignItems: 'center' },
  warningIconBg: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FEF3C7', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  warningTitle: { fontSize: 13, textAlign: 'center', color: '#334155', marginBottom: 14, lineHeight: 18, fontWeight: '500' },
  shippingAddressLabel: { alignSelf: 'flex-start', fontSize: 12, color: '#64748B', marginBottom: 4 },
  addressPreviewBox: { backgroundColor: '#F8FAFC', borderRadius: 8, padding: 10, width: '100%', marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  addressPreviewText: { fontSize: 12, fontWeight: '600', color: '#1E293B' },
  editMyAddressBtn: { backgroundColor: '#EA580C', width: '100%', height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  editMyAddressText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  isCorrectBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', width: '100%', height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
  isCorrectText: { color: '#1E293B', fontWeight: '700', fontSize: 13 },

  // Alerts Modal Styles
  alertsModalContent: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, width: '100%', maxWidth: 330 },
  alertsTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  alertsSubTitle: { fontSize: 12, color: '#64748B', marginBottom: 20 },
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  stepItem: { alignItems: 'center' },
  stepCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  greenCircle: { backgroundColor: '#16A34A' },
  stepText: { fontSize: 11, fontWeight: '600', color: '#475569' },
  stepLine: { flex: 1, height: 2, backgroundColor: '#E2E8F0', marginHorizontal: -10, marginTop: -14 },
  greenLine: { backgroundColor: '#16A34A' },
  okButton: { backgroundColor: '#EA580C', height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  okButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});