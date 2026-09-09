import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // States for Manage / Share menu and modals
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('manage'); // 'manage' or 'share'

  // Dynamic selected item IDs tracking (storing unique keys or indices)
  const [selectedModalItems, setSelectedModalItems] = useState({});

  // Open modal and initialize all items as selected by default
  const openModal = (type) => {
    setModalType(type);
    const initialSelected = {};
    cartItems.forEach((item, index) => {
      initialSelected[`${item.id}-${item.selectedColor}-${index}`] = true;
    });
    setSelectedModalItems(initialSelected);
    setMenuVisible(false);
    setModalVisible(true);
  };

  // Toggle single item selection inside modal
  const toggleSelectItem = (key) => {
    setSelectedModalItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if all items are currently selected
  const allSelected = cartItems.length > 0 && cartItems.every((item, index) => {
    const key = `${item.id}-${item.selectedColor}-${index}`;
    return selectedModalItems[key];
  });

  // Toggle select all
  const toggleSelectAll = () => {
    const newState = !allSelected;
    const updated = {};
    cartItems.forEach((item, index) => {
      const key = `${item.id}-${item.selectedColor}-${index}`;
      updated[key] = newState;
    });
    setSelectedModalItems(updated);
  };

  // Handle Remove selected items from cart
  const handleRemoveSelected = () => {
    cartItems.forEach((item, index) => {
      const key = `${item.id}-${item.selectedColor}-${index}`;
      if (selectedModalItems[key]) {
        removeFromCart(item.id, item.selectedColor);
      }
    });
    setModalVisible(false);
  };

  // Total Price Calculation
  const totalPrice = cartItems.reduce((sum, item) => {
    const cleanPrice = Number(String(item.price || item.currentPrice || '0').replace(/[^0-9]/g, ''));
    return sum + (cleanPrice * item.quantity);
  }, 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.borderColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.selectAllRow}>
          <View style={styles.checkboxSelected}>
            <Ionicons name="checkmark" size={14} color="#FFF" />
          </View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>All</Text>
        </View>
        <Text style={[styles.cartTitle, { color: colors.textPrimary }]}>Cart ({cartItems.length})</Text>
        
        {/* Menu Icon & Dropdown Toggle */}
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="menu-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Floating Menu Popover (Manage cart / Share cart) */}
      {menuVisible && (
        <View style={[styles.menuPopover, { backgroundColor: colors.cardBg, borderColor: colors.borderColor, borderWidth: 1 }]}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => openModal('share')}
          >
            <Ionicons name="share-social-outline" size={18} color={colors.textSecondary} style={{ marginRight: 8 }} />
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>Share cart</Text>
          </TouchableOpacity>
          <View style={[styles.menuDivider, { backgroundColor: colors.dividerColor }]} />
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => openModal('manage')}
          >
            <Ionicons name="create-outline" size={18} color={colors.textSecondary} style={{ marginRight: 8 }} />
            <Text style={[styles.menuItemText, { color: colors.textPrimary }]}>Manage cart</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Free Shipping Banner */}
        <View style={styles.freeShippingBanner}>
          <Ionicons name="checkmark-circle" size={16} color="#166534" style={{ marginRight: 6 }} />
          <Text style={styles.freeShippingText}>Free shipping and free returns</Text>
          <Text style={styles.limitedTimeText}>Limited-time</Text>
        </View>

        {/* Filter Tags */}
        <View style={[styles.filterRow, { backgroundColor: colors.headerBg }]}>
          <View style={styles.filterChipActive}>
            <Text style={styles.filterTextActive}>All({cartItems.length})</Text>
          </View>
          <View style={[styles.filterChip, { backgroundColor: colors.inputBg }]}>
            <Text style={[styles.filterText, { color: colors.textSecondary }]}>Selected({cartItems.length})</Text>
          </View>
        </View>

        {/* Dynamic Cart Items List */}
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={60} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Your cart is empty!</Text>
            <TouchableOpacity style={styles.shopNowBtn} onPress={() => navigation.navigate('HomeTab')}>
              <Text style={styles.shopNowText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          cartItems.map((item, index) => (
            <View key={`${item.id}-${item.selectedColor}-${index}`} style={[styles.cartItemContainer, { backgroundColor: colors.cardBg }]}>
              <View style={styles.storeItemRow}>
                <View style={styles.checkboxSelected}>
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                </View>
                <Text style={[styles.storeName, { color: colors.textPrimary }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id, item.selectedColor)}>
                  <Ionicons name="trash-outline" size={18} color={colors.textSecondary} style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
              </View>

              {/* Product Details inside Cart */}
              <View style={styles.productRow}>
                <Image 
                  source={{ uri: item.image || (item.images ? item.images[0] : 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300') }} 
                  style={styles.productImg} 
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TouchableOpacity style={[styles.variantSelectorChip, { backgroundColor: colors.inputBg }]}>
                    <Text style={[styles.variantChipText, { color: colors.textSecondary }]}>{item.selectedColor || 'Standard'}</Text>
                    <Ionicons name="chevron-down" size={12} color={colors.textSecondary} style={{ marginLeft: 4 }} />
                  </TouchableOpacity>

                  <View style={styles.priceQtyRow}>
                    <View>
                      <Text style={styles.originalPrice}>{item.originalPrice || "Rs.575"}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={[styles.currentPrice, { color: colors.textPrimary }]}>{item.price || item.currentPrice || "Rs.267"}</Text>
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountBadgeTxt}>{item.discount || "-53%"}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Dynamic Qty Counter */}
                    <View style={[styles.counterContainer, { borderColor: colors.borderColor }]}>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, item.selectedColor, -1)}>
                        <Ionicons name="remove" size={14} color={colors.textSecondary} />
                      </TouchableOpacity>
                      <Text style={[styles.qtyNum, { color: colors.textPrimary }]}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, item.selectedColor, 1)}>
                        <Ionicons name="add" size={14} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={[styles.promoAppliedText, { color: colors.textSecondary }]}>after applying promos</Text>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Guarantee Info Box */}
        <View style={[styles.guaranteeBox, { backgroundColor: colors.cardBg }]}>
          <Ionicons name="information-circle-outline" size={14} color={colors.textSecondary} style={{ marginRight: 4 }} />
          <Text style={[styles.guaranteeText, { color: colors.textSecondary }]}>
            Item availability and pricing are not guaranteed until payment is final.
          </Text>
        </View>

        {/* Protection Badges */}
        <View style={[styles.badgesContainer, { backgroundColor: colors.cardBg }]}>
          <View style={styles.badgeItem}>
            <View style={styles.badgeIconWrapper}>
              <Ionicons name="shield-checkmark-outline" size={18} color="#166534" />
            </View>
            <Text style={[styles.badgeLabel, { color: colors.textPrimary }]}>Safe Payment Options</Text>
          </View>
          <View style={styles.badgeItem}>
            <View style={styles.badgeIconWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#166534" />
            </View>
            <Text style={[styles.badgeLabel, { color: colors.textPrimary }]}>Secure privacy</Text>
          </View>
          <View style={styles.badgeItem}>
            <View style={styles.badgeIconWrapper}>
              <Ionicons name="cube-outline" size={18} color="#166534" />
            </View>
            <Text style={[styles.badgeLabel, { color: colors.textPrimary }]}>Temu Purchase Protection</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Bottom Bar */}
      <View style={[styles.bottomCheckoutBar, { backgroundColor: colors.headerBg, borderTopColor: colors.borderColor }]}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={styles.bottomPrice}>Rs.{totalPrice * 2}</Text>
          <Text style={[styles.bottomCurrentPrice, { color: colors.textPrimary }]}>Rs.{totalPrice}</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={() => navigation.navigate('CheckoutAddress')}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal for Manage / Share Cart */}
      {modalVisible && (
        <View style={styles.modalOverlay}>
          <View style={[styles.bottomSheetContainer, { backgroundColor: colors.cardBg }]}>
            
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                {modalType === 'manage' ? 'Manage cart' : 'Share cart'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Cart Item Preview inside Modal with Checkboxes */}
            <ScrollView style={{ maxHeight: 250 }} showsVerticalScrollIndicator={false}>
              {cartItems.map((item, index) => {
                const key = `${item.id}-${item.selectedColor}-${index}`;
                const isChecked = selectedModalItems[key];
                return (
                  <TouchableOpacity 
                    key={`modal-${index}`} 
                    style={[styles.modalItemRow, { backgroundColor: colors.inputNameBg || colors.inputBg }]}
                    activeOpacity={0.9}
                    onPress={() => toggleSelectItem(key)}
                  >
                    <View style={[styles.modalCheckbox, isChecked ? styles.checkboxCheckedBg : [styles.checkboxUncheckedBg, { borderColor: colors.textSecondary }]]}>
                      {isChecked && <Ionicons name="checkmark" size={14} color="#FFF" />}
                    </View>
                    <Image 
                      source={{ uri: item.image || (item.images ? item.images[0] : 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300') }} 
                      style={styles.modalProductImg} 
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text numberOfLines={1} style={[styles.modalItemTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                      <Text style={[styles.modalItemVariant, { color: colors.textSecondary }]}>{item.selectedColor || 'Standard'} x{item.quantity}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
                        <Text style={styles.modalOriginalPrice}>Rs.575</Text>
                        <Text style={[styles.modalCurrentPrice, { color: colors.textPrimary }]}>{item.price || item.currentPrice || 'Rs.267'}</Text>
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountBadgeTxt}>-53%</Text>
                        </View>
                      </View>
                      <Text style={[styles.promoAppliedText, { color: colors.textSecondary }]}>after applying promos &gt;</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Modal Footer (Select All & Action Button) */}
            <View style={[styles.modalFooter, { borderTopColor: colors.borderColor }]}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={toggleSelectAll}>
                <View style={[styles.modalCheckbox, allSelected ? styles.checkboxCheckedBg : [styles.checkboxUncheckedBg, { borderColor: colors.textSecondary }]]}>
                  {allSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
                </View>
                <Text style={[{ fontWeight: 'bold', fontSize: 13, marginLeft: 6 }, { color: colors.textPrimary }]}>All</Text>
              </TouchableOpacity>

              {modalType === 'manage' ? (
                <TouchableOpacity style={[styles.removeBtn, { borderColor: colors.borderColor }]} onPress={handleRemoveSelected}>
                  <Text style={[styles.removeBtnText, { color: colors.textPrimary }]}>Remove</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.shareNowBtn} onPress={() => {
                  alert('Cart shared successfully!');
                  setModalVisible(false);
                }}>
                  <Text style={styles.shareNowBtnText}>
                    Share now ({Object.values(selectedModalItems).filter(Boolean).length})
                  </Text>
                </TouchableOpacity>
              )}
            </View>

          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  selectAllRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 16 },
  checkboxSelected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  headerTitle: { fontSize: 14, fontWeight: 'bold' },
  cartTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 16, flex: 1 },
  menuPopover: {
    position: 'absolute',
    top: 55,
    right: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
    width: 150,
    paddingVertical: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
  },
  freeShippingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 10,
    paddingHorizontal: 16,
  },
  freeShippingText: { flex: 1, color: '#166534', fontSize: 12, fontWeight: '500' },
  limitedTimeText: { color: '#166534', fontSize: 11, fontWeight: 'bold' },
  filterRow: { flexDirection: 'row', padding: 12 },
  filterChipActive: {
    backgroundColor: '#000',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  filterTextActive: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterText: { fontSize: 12, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, marginTop: 10, fontWeight: '600' },
  shopNowBtn: { backgroundColor: '#EA580C', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginTop: 15 },
  shopNowText: { color: '#FFF', fontWeight: 'bold' },
  cartItemContainer: {
    marginTop: 8,
    padding: 12,
  },
  storeItemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  storeName: { fontSize: 13, fontWeight: '500', maxWidth: '75%' },
  productRow: { flexDirection: 'row' },
  productImg: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#E5E7EB' },
  variantSelectorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  variantChipText: { fontSize: 11, fontWeight: '500' },
  priceQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  originalPrice: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
  currentPrice: { fontSize: 15, fontWeight: 'bold' },
  discountBadge: {
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginLeft: 4,
  },
  discountBadgeTxt: { fontSize: 9, color: '#C2410C', fontWeight: 'bold' },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtyNum: { marginHorizontal: 8, fontSize: 12, fontWeight: 'bold' },
  promoAppliedText: { fontSize: 10, marginTop: 4 },
  guaranteeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 8,
  },
  guaranteeText: { fontSize: 11, flex: 1 },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  badgeItem: { alignItems: 'center', maxWidth: '30%' },
  badgeIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  badgeLabel: { fontSize: 10, textAlign: 'center', fontWeight: '500' },
  bottomCheckoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  bottomPrice: { fontSize: 12, color: '#9CA3AF', textDecorationLine: 'line-through' },
  bottomCurrentPrice: { fontSize: 16, fontWeight: 'bold', marginRight: 16 },
  checkoutButton: {
    flex: 1,
    backgroundColor: '#EA580C',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  checkoutButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxCheckedBg: {
    backgroundColor: '#000',
  },
  checkboxUncheckedBg: {
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  modalProductImg: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  modalItemTitle: {
    fontSize: 12,
  },
  modalItemVariant: {
    fontSize: 11,
    marginTop: 2,
  },
  modalOriginalPrice: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  modalCurrentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 12,
  },
  removeBtn: {
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  removeBtnText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  shareNowBtn: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  shareNowBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});