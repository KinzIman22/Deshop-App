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

// Apni app ke path ke mutabiq ThemeContext import karein (e.g., '../context/ThemeContext')
import { useTheme } from '../context/ThemeContext';

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
  
  // Aapke custom ThemeContext hook se state aur colors nikal liye hain
  const { isDarkMode, colors } = useTheme();

  // Checkout Steps: 'address' | 'payment' | 'review'
  const [checkoutStep, setCheckoutStep] = useState('address');

  // Address States
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('332 7125227');
  const [selectedProvince, setSelectedProvince] = useState('Punjab');
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' or 'CARD'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

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

  // Theme mapping based strictly on your ThemeContext structure
  const currentTheme = {
    bg: colors.background,
    card: colors.cardBg,
    cardElevated: colors.inputBg,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    border: colors.borderColor,
    inputBg: colors.inputBg,
    inputBorder: colors.borderColor,
    accent: '#EA580C', // Primary accent color
    success: '#16A34A',
    promoBg: isDarkMode ? '#064E3B' : '#ECFDF5',
    promoBorder: isDarkMode ? '#065F46' : '#A7F3D0',
    promoText: isDarkMode ? '#6EE7B7' : '#047857',
  };

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

  const handleProceedFromAddress = () => {
    if (!fullName.trim() || !address.trim() || !selectedCity.trim()) {
      Alert.alert("Error", "Please fill in all mandatory address fields.");
      return;
    }
    setCheckoutStep('payment');
  };

  const handleProceedFromPayment = () => {
    if (paymentMethod === 'CARD') {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        Alert.alert("Error", "Please enter valid credit/debit card details.");
        return;
      }
    }
    setCheckoutStep('review');
  };

  const handlePlaceOrder = () => {
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

  const getHeaderTitle = () => {
    if (checkoutStep === 'address') return 'Add an address to order';
    if (checkoutStep === 'payment') return 'Select Payment Method';
    if (checkoutStep === 'review') return 'Order Review';
  };

  const handleBackPress = () => {
    if (checkoutStep === 'review') {
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      setCheckoutStep('address');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: currentTheme.bg }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        {/* Top Header */}
        <View style={[styles.header, { backgroundColor: currentTheme.card, borderBottomColor: currentTheme.border }]}>
          <TouchableOpacity onPress={handleBackPress} style={[styles.backBtn, { backgroundColor: currentTheme.cardElevated }]}>
            <Ionicons name="chevron-back" size={22} color={currentTheme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: currentTheme.text }]}>{getHeaderTitle()}</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Step Indicator Progress Bar */}
        <View style={[styles.stepBarContainer, { backgroundColor: currentTheme.card, borderBottomColor: currentTheme.border }]}>
          <View style={styles.stepIndicatorItem}>
            <View style={[styles.miniDot, { backgroundColor: currentTheme.textSecondary }, checkoutStep === 'address' && { backgroundColor: currentTheme.accent, width: 10, height: 10, borderRadius: 5 }]} />
            <Text style={[styles.miniDotText, { color: currentTheme.textSecondary }, checkoutStep === 'address' && { color: currentTheme.accent }]}>Address</Text>
          </View>
          <View style={[styles.miniLine, { backgroundColor: currentTheme.border }, (checkoutStep === 'payment' || checkoutStep === 'review') && { backgroundColor: currentTheme.accent }]} />
          <View style={styles.stepIndicatorItem}>
            <View style={[styles.miniDot, { backgroundColor: currentTheme.textSecondary }, checkoutStep === 'payment' && { backgroundColor: currentTheme.accent, width: 10, height: 10, borderRadius: 5 }]} />
            <Text style={[styles.miniDotText, { color: currentTheme.textSecondary }, checkoutStep === 'payment' && { color: currentTheme.accent }]}>Payment</Text>
          </View>
          <View style={[styles.miniLine, { backgroundColor: currentTheme.border }, checkoutStep === 'review' && { backgroundColor: currentTheme.accent }]} />
          <View style={styles.stepIndicatorItem}>
            <View style={[styles.miniDot, { backgroundColor: currentTheme.textSecondary }, checkoutStep === 'review' && { backgroundColor: currentTheme.accent, width: 10, height: 10, borderRadius: 5 }]} />
            <Text style={[styles.miniDotText, { color: currentTheme.textSecondary }, checkoutStep === 'review' && { color: currentTheme.accent }]}>Review</Text>
          </View>
        </View>

        {/* Safeguard Secure Banner */}
        <View style={[styles.secureContainer, { backgroundColor: currentTheme.card, borderBottomColor: currentTheme.bg }]}>
          <Ionicons name="lock-closed" size={13} color={currentTheme.success} />
          <Text style={[styles.secureText, { color: currentTheme.success }]}> All data is safeguarded</Text>
        </View>

        {/* Free Shipping Highlight Banner */}
        <View style={[styles.promoBanner, { backgroundColor: currentTheme.promoBg, borderBottomColor: currentTheme.promoBorder }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="checkmark-circle" size={15} color={currentTheme.success} />
            <Text style={[styles.promoText, { color: currentTheme.promoText }]}> Free shipping</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="checkmark-circle" size={15} color={currentTheme.success} />
            <Text style={[styles.promoText, { color: currentTheme.promoText }]}> 30-day price adjustment</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 30 }}>
          
          {/* ================= STEP 1: ADDRESS FORM ================= */}
          {checkoutStep === 'address' && (
            <>
              {/* Country Selector */}
              <View style={[styles.countrySelector, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                <Text style={[styles.countryLabel, { color: currentTheme.textSecondary }]}>Country / Region</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '700', color: currentTheme.text, marginRight: 4 }}>Pakistan</Text>
                  <Ionicons name="shield-checkmark" size={16} color={currentTheme.success} />
                </View>
              </View>

              {/* Full Name */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: currentTheme.text }]}>Full name <Text style={{ color: currentTheme.accent }}>*</Text></Text>
                <View style={[styles.inputContainer, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder }]}>
                  <TextInput 
                    style={[styles.input, { color: currentTheme.text }]}
                    placeholder="Enter full name"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor={currentTheme.textSecondary}
                  />
                  {fullName.length > 0 && (
                    <TouchableOpacity onPress={() => setFullName('')}>
                      <Ionicons name="close-circle" size={18} color={currentTheme.textSecondary} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Phone Number */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: currentTheme.text }]}>Phone number <Text style={{ color: currentTheme.accent }}>*</Text></Text>
                <View style={[styles.inputContainer, { paddingHorizontal: 0, backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder }]}>
                  <View style={styles.phonePrefix}>
                    <Text style={{ fontWeight: '600', color: currentTheme.text, fontSize: 13 }}>PK +92</Text>
                    <View style={[styles.verticalDivider, { backgroundColor: currentTheme.inputBorder }]} />
                  </View>
                  <TextInput 
                    style={[styles.input, { paddingLeft: 8, color: currentTheme.text }]}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    placeholderTextColor={currentTheme.textSecondary}
                  />
                </View>
              </View>

              {/* Province Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: currentTheme.text }]}>Province <Text style={{ color: currentTheme.accent }}>*</Text></Text>
                <TouchableOpacity 
                  style={[styles.dropdownContainer, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder }]} 
                  onPress={() => {
                    setModalType('province');
                    setSearchQuery('');
                    setModalVisible(true);
                  }}
                >
                  <Text style={{ color: currentTheme.text, fontWeight: '600' }}>{selectedProvince}</Text>
                  <Ionicons name="chevron-down" size={18} color={currentTheme.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* City Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: currentTheme.text }]}>City <Text style={{ color: currentTheme.accent }}>*</Text></Text>
                <TouchableOpacity 
                  style={[styles.dropdownContainer, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder }]} 
                  onPress={() => {
                    setModalType('city');
                    setSearchQuery('');
                    setModalVisible(true);
                  }}
                >
                  <Text style={{ color: currentTheme.text, fontWeight: '600' }}>{selectedCity || 'Select City'}</Text>
                  <Ionicons name="search-outline" size={18} color={currentTheme.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Building, street */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: currentTheme.text }]}>Building, street, and area etc. <Text style={{ color: currentTheme.accent }}>*</Text></Text>
                <View style={[styles.inputContainer, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder }]}>
                  <TextInput 
                    style={[styles.input, { color: currentTheme.text }]}
                    placeholder="House #15, Street #1, Wapda Town"
                    value={address}
                    onChangeText={setAddress}
                    placeholderTextColor={currentTheme.textSecondary}
                  />
                </View>
              </View>

              {/* Postal / ZIP Code */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: currentTheme.text }]}>Postal Code / ZIP (Optional)</Text>
                <View style={[styles.inputContainer, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder }]}>
                  <TextInput 
                    style={[styles.input, { color: currentTheme.text }]}
                    placeholder="e.g., 54000"
                    value={postalCode}
                    onChangeText={setPostalCode}
                    keyboardType="number-pad"
                    placeholderTextColor={currentTheme.textSecondary}
                  />
                </View>
              </View>
            </>
          )}

          {/* ================= STEP 2: PAYMENT METHODS ================= */}
          {checkoutStep === 'payment' && (
            <View>
              <Text style={[styles.sectionHeading, { color: currentTheme.text }]}>Choose Payment Option</Text>
              
              <TouchableOpacity 
                style={[
                  styles.paymentOptionCard, 
                  { backgroundColor: currentTheme.card, borderColor: paymentMethod === 'COD' ? currentTheme.accent : currentTheme.border }
                ]}
                onPress={() => setPaymentMethod('COD')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="cash-fast" size={24} color={paymentMethod === 'COD' ? currentTheme.accent : currentTheme.textSecondary} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={[styles.paymentTitle, { color: currentTheme.text }]}>Cash on Delivery (COD)</Text>
                    <Text style={[styles.paymentSubtitle, { color: currentTheme.textSecondary }]}>Pay securely when your order arrives</Text>
                  </View>
                </View>
                <Ionicons 
                  name={paymentMethod === 'COD' ? "radio-button-on" : "radio-button-off"} 
                  size={20} 
                  color={paymentMethod === 'COD' ? currentTheme.accent : currentTheme.textSecondary} 
                />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.paymentOptionCard, 
                  { backgroundColor: currentTheme.card, borderColor: paymentMethod === 'CARD' ? currentTheme.accent : currentTheme.border }
                ]}
                onPress={() => setPaymentMethod('CARD')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="card-outline" size={24} color={paymentMethod === 'CARD' ? currentTheme.accent : currentTheme.textSecondary} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={[styles.paymentTitle, { color: currentTheme.text }]}>Credit / Debit Card</Text>
                    <Text style={[styles.paymentSubtitle, { color: currentTheme.textSecondary }]}>Visa, MasterCard, UnionPay</Text>
                  </View>
                </View>
                <Ionicons 
                  name={paymentMethod === 'CARD' ? "radio-button-on" : "radio-button-off"} 
                  size={20} 
                  color={paymentMethod === 'CARD' ? currentTheme.accent : currentTheme.textSecondary} 
                />
              </TouchableOpacity>

              {paymentMethod === 'CARD' && (
                <View style={[styles.cardFormContainer, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                  <Text style={[styles.label, { color: currentTheme.text }]}>Card Number</Text>
                  <View style={[styles.inputContainer, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder, marginBottom: 12 }]}>
                    <TextInput 
                      style={[styles.input, { color: currentTheme.text }]}
                      placeholder="4111 2222 3333 4444"
                      keyboardType="number-pad"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      placeholderTextColor={currentTheme.textSecondary}
                    />
                    <Ionicons name="card" size={18} color={currentTheme.textSecondary} />
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={[styles.label, { color: currentTheme.text }]}>Expiry Date</Text>
                      <View style={[styles.inputContainer, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder }]}>
                        <TextInput 
                          style={[styles.input, { color: currentTheme.text }]}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChangeText={setCardExpiry}
                          placeholderTextColor={currentTheme.textSecondary}
                        />
                      </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={[styles.label, { color: currentTheme.text }]}>CVV Code</Text>
                      <View style={[styles.inputContainer, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder }]}>
                        <TextInput 
                          style={[styles.input, { color: currentTheme.text }]}
                          placeholder="123"
                          secureTextEntry
                          keyboardType="number-pad"
                          value={cardCvv}
                          onChangeText={setCardCvv}
                          placeholderTextColor={currentTheme.textSecondary}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* ================= STEP 3: ORDER REVIEW ================= */}
          {checkoutStep === 'review' && (
            <View>
              <Text style={[styles.sectionHeading, { color: currentTheme.text }]}>Review Your Order</Text>
              
              <View style={[styles.reviewCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                <Text style={[styles.reviewCardTitle, { color: currentTheme.text }]}>Shipping Details</Text>
                <Text style={[styles.reviewText, { color: currentTheme.textSecondary }]}>Name: <Text style={{ color: currentTheme.text, fontWeight: '600' }}>{fullName}</Text></Text>
                <Text style={[styles.reviewText, { color: currentTheme.textSecondary }]}>Phone: <Text style={{ color: currentTheme.text, fontWeight: '600' }}>+92 {phoneNumber}</Text></Text>
                <Text style={[styles.reviewText, { color: currentTheme.textSecondary }]}>Address: <Text style={{ color: currentTheme.text, fontWeight: '600' }}>{address}, {selectedCity}, {selectedProvince}</Text></Text>
              </View>

              <View style={[styles.reviewCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                <Text style={[styles.reviewCardTitle, { color: currentTheme.text }]}>Payment Information</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <MaterialCommunityIcons 
                    name={paymentMethod === 'COD' ? "cash-fast" : "credit-card"} 
                    size={18} 
                    color={currentTheme.accent} 
                  />
                  <Text style={[styles.reviewText, { color: currentTheme.text, fontWeight: '600', marginLeft: 6, marginBottom: 0 }]}>
                    {paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Credit / Debit Card'}
                  </Text>
                </View>
              </View>

              <View style={[styles.reviewCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                <Text style={[styles.reviewCardTitle, { color: currentTheme.text }]}>Price Details</Text>
                <View style={styles.priceRow}>
                  <Text style={{ color: currentTheme.textSecondary, fontSize: 13 }}>Subtotal</Text>
                  <Text style={{ color: currentTheme.text, fontSize: 13, fontWeight: '600' }}>Rs. 2,499</Text>
                </View>
                <View style={styles.priceRow}>
                  <Text style={{ color: currentTheme.textSecondary, fontSize: 13 }}>Shipping Fee</Text>
                  <Text style={{ color: currentTheme.success, fontSize: 13, fontWeight: '600' }}>FREE</Text>
                </View>
                <View style={[styles.dividerLine, { backgroundColor: currentTheme.border }]} />
                <View style={styles.priceRow}>
                  <Text style={{ color: currentTheme.text, fontSize: 14, fontWeight: '700' }}>Total Amount</Text>
                  <Text style={{ color: currentTheme.accent, fontSize: 15, fontWeight: '700' }}>Rs. 2,499</Text>
                </View>
              </View>
            </View>
          )}

        </ScrollView>

        {/* Bottom Action Footer Button */}
        <View style={[styles.footer, { backgroundColor: currentTheme.card, borderTopColor: currentTheme.border, paddingBottom: Math.max(insets.bottom, 16) }]}>
          {checkoutStep === 'address' && (
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: currentTheme.accent, shadowColor: currentTheme.accent }]} onPress={handleProceedFromAddress}>
              <Text style={styles.saveButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          )}

          {checkoutStep === 'payment' && (
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: currentTheme.accent, shadowColor: currentTheme.accent }]} onPress={handleProceedFromPayment}>
              <Text style={styles.saveButtonText}>Review Order</Text>
            </TouchableOpacity>
          )}

          {checkoutStep === 'review' && (
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: currentTheme.accent, shadowColor: currentTheme.accent }]} onPress={handlePlaceOrder}>
              <Text style={styles.saveButtonText}>Place Order Now</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* --- SELECTOR MODAL --- */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.selectorModalOverlay}>
          <View style={[styles.selectorModalContent, { backgroundColor: currentTheme.card }]}>
            
            <View style={styles.selectorHeader}>
              <Text style={[styles.selectorTitle, { color: currentTheme.text }]}>
                {modalType === 'province' ? 'Select Province' : 'Select City in Pakistan'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={currentTheme.text} />
              </TouchableOpacity>
            </View>

            <View style={[styles.searchBox, { backgroundColor: currentTheme.cardElevated }]}>
              <Ionicons name="search" size={16} color={currentTheme.textSecondary} style={{ marginRight: 8 }} />
              <TextInput 
                style={{ flex: 1, fontSize: 13, color: currentTheme.text }}
                placeholder={modalType === 'province' ? "Search province..." : "Search any city in Pakistan..."}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={currentTheme.textSecondary}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={16} color={currentTheme.textSecondary} />
                </TouchableOpacity>
              )}
            </View>

            <FlatList 
              data={getModalData()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.listItem, { borderBottomColor: currentTheme.border }]}
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
                    { color: currentTheme.textSecondary },
                    ((modalType === 'province' && selectedProvince === item) || 
                     (modalType === 'city' && selectedCity === item)) && { color: currentTheme.accent, fontWeight: '700' }
                  ]}>
                    {item}
                  </Text>
                  {((modalType === 'province' && selectedProvince === item) || 
                    (modalType === 'city' && selectedCity === item)) && (
                    <Ionicons name="checkmark" size={18} color={currentTheme.accent} />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8 }}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', color: currentTheme.textSecondary, marginTop: 20, fontSize: 13 }}>
                  No results found
                </Text>
              }
            />

          </View>
        </View>
      </Modal>

      {/* --- WARNING MODAL --- */}
      <Modal visible={showWarningModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.warningModalContent, { backgroundColor: currentTheme.card }]}>
            <View style={styles.warningIconBg}>
              <Ionicons name="alert" size={24} color="#D97706" />
            </View>
            
            <Text style={[styles.warningTitle, { color: currentTheme.text }]}>
              Courier may be unable to deliver if building or house number is missing. Please verify your address.
            </Text>

            <Text style={[styles.shippingAddressLabel, { color: currentTheme.textSecondary }]}>Shipping address preview:</Text>
            <View style={[styles.addressPreviewBox, { backgroundColor: currentTheme.cardElevated, borderColor: currentTheme.border }]}>
              <Text style={[styles.addressPreviewText, { color: currentTheme.text }]}>
                {address ? address : 'House #12'}, {selectedCity}, {selectedProvince} {postalCode ? `- ${postalCode}` : ''}
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.editMyAddressBtn, { backgroundColor: currentTheme.accent }]} 
              onPress={() => setShowWarningModal(false)}
            >
              <Text style={styles.editMyAddressText}>Edit my address</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.isCorrectBtn, { backgroundColor: currentTheme.card, borderColor: currentTheme.inputBorder }]} 
              onPress={handleItIsCorrect}
            >
              <Text style={[styles.isCorrectText, { color: currentTheme.text }]}>It is correct</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* --- ALERTS & STEP ANIMATION MODAL --- */}
      <Modal visible={showAlertsModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.alertsModalContent, { backgroundColor: currentTheme.card }]}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <Text style={[styles.alertsTitle, { color: currentTheme.text }]}>Order Placed Successfully!</Text>
              <TouchableOpacity onPress={() => setShowAlertsModal(false)}>
                <Ionicons name="close" size={20} color={currentTheme.text} />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.alertsSubTitle, { color: currentTheme.textSecondary }]}>Turn on notifications to track real-time parcel movement.</Text>

            <View style={styles.stepperContainer}>
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, { backgroundColor: currentTheme.border }, step1Green && { backgroundColor: currentTheme.success }]}>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </View>
                <Text style={[styles.stepText, { color: currentTheme.textSecondary }]}>Processing</Text>
              </View>

              <View style={[styles.stepLine, { backgroundColor: currentTheme.border }, line1Green && { backgroundColor: currentTheme.success }]} />

              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, { backgroundColor: currentTheme.border }, step2Green && { backgroundColor: currentTheme.success }]}>
                  <MaterialCommunityIcons name="truck-delivery" size={15} color={step2Green ? "#FFF" : currentTheme.textSecondary} />
                </View>
                <Text style={[styles.stepText, { color: currentTheme.textSecondary }]}>Shipped</Text>
              </View>

              <View style={[styles.stepLine, { backgroundColor: currentTheme.border }, line2Green && { backgroundColor: currentTheme.success }]} />

              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, { backgroundColor: currentTheme.border }, step3Green && { backgroundColor: currentTheme.success }]}>
                  <MaterialCommunityIcons name="package-variant-closed" size={15} color={step3Green ? "#FFF" : currentTheme.textSecondary} />
                </View>
                <Text style={[styles.stepText, { color: currentTheme.textSecondary }]}>Delivered</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.okButton, { backgroundColor: currentTheme.accent }, step3Green && { backgroundColor: currentTheme.success }]} 
              onPress={() => {
                setShowAlertsModal(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.okButtonText}>Done</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

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
  
  stepBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
  },
  stepIndicatorItem: { alignItems: 'center' },
  miniDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 3 },
  miniDotText: { fontSize: 10, fontWeight: '600' },
  miniLine: { flex: 1, height: 2, marginHorizontal: 10, marginBottom: 15 },

  secureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
  },
  secureText: { fontWeight: '600', fontSize: 11 },
  promoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  promoText: { fontSize: 11, fontWeight: '600' },
  countrySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
    alignItems: 'center',
  },
  countryLabel: { fontSize: 13, fontWeight: '500' },
  inputGroup: { marginBottom: 14 },
  sectionHeading: { fontSize: 15, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  input: { flex: 1, fontSize: 13 },
  phonePrefix: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 4 },
  verticalDivider: { width: 1, height: 20, marginLeft: 10 },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  
  paymentOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  paymentTitle: { fontSize: 13, fontWeight: '700' },
  paymentSubtitle: { fontSize: 11, marginTop: 2 },
  cardFormContainer: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 6,
    marginBottom: 14,
  },

  reviewCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  reviewCardTitle: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  reviewText: { fontSize: 12, marginBottom: 4 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  dividerLine: { height: 1, marginVertical: 6 },

  footer: { padding: 16, borderTopWidth: 1 },
  saveButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  
  selectorModalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'flex-end' },
  selectorModalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '65%',
    paddingBottom: 30,
  },
  selectorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  selectorTitle: { fontSize: 15, fontWeight: '700' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  listItemText: { fontSize: 13 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  warningModalContent: { borderRadius: 16, padding: 20, width: '100%', maxWidth: 330, alignItems: 'center' },
  warningIconBg: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FEF3C7', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  warningTitle: { fontSize: 13, textAlign: 'center', marginBottom: 14, lineHeight: 18, fontWeight: '500' },
  shippingAddressLabel: { alignSelf: 'flex-start', fontSize: 12, marginBottom: 4 },
  addressPreviewBox: { borderRadius: 8, padding: 10, width: '100%', marginBottom: 16, borderWidth: 1 },
  addressPreviewText: { fontSize: 12, fontWeight: '600' },
  editMyAddressBtn: { width: '100%', height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  editMyAddressText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  isCorrectBtn: { borderWidth: 1, width: '100%', height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
  isCorrectText: { fontWeight: '700', fontSize: 13 },

  alertsModalContent: { borderRadius: 16, padding: 18, width: '100%', maxWidth: 330 },
  alertsTitle: { fontSize: 16, fontWeight: '700' },
  alertsSubTitle: { fontSize: 12, marginBottom: 20 },
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  stepItem: { alignItems: 'center' },
  stepCircle: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  stepText: { fontSize: 11, fontWeight: '600' },
  stepLine: { flex: 1, height: 2, marginHorizontal: -10, marginTop: -14 },
  okButton: { height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  okButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});