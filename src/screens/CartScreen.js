import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

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
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.selectAllRow}>
          <View style={styles.checkboxSelected}>
            <Ionicons name="checkmark" size={14} color="#FFF" />
          </View>
          <Text style={styles.headerTitle}>All</Text>
        </View>
        <Text style={styles.cartTitle}>Cart ({cartItems.length})</Text>
        
        {/* Menu Icon & Dropdown Toggle */}
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="menu-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Floating Menu Popover (Manage cart / Share cart) */}
      {menuVisible && (
        <View style={styles.menuPopover}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => openModal('share')}
          >
            <Ionicons name="share-social-outline" size={18} color="#374151" style={{ marginRight: 8 }} />
            <Text style={styles.menuItemText}>Share cart</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => openModal('manage')}
          >
            <Ionicons name="create-outline" size={18} color="#374151" style={{ marginRight: 8 }} />
            <Text style={styles.menuItemText}>Manage cart</Text>
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
        <View style={styles.filterRow}>
          <View style={styles.filterChipActive}>
            <Text style={styles.filterTextActive}>All({cartItems.length})</Text>
          </View>
          <View style={styles.filterChip}>
            <Text style={styles.filterText}>Selected({cartItems.length})</Text>
          </View>
        </View>

        {/* Dynamic Cart Items List */}
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={60} color="#9CA3AF" />
            <Text style={styles.emptyText}>Your cart is empty!</Text>
            <TouchableOpacity style={styles.shopNowBtn} onPress={() => navigation.navigate('HomeTab')}>
              <Text style={styles.shopNowText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          cartItems.map((item, index) => (
            <View key={`${item.id}-${item.selectedColor}-${index}`} style={styles.cartItemContainer}>
              <View style={styles.storeItemRow}>
                <View style={styles.checkboxSelected}>
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                </View>
                <Text style={styles.storeName} numberOfLines={1}>
                  {item.title}
                </Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id, item.selectedColor)}>
                  <Ionicons name="trash-outline" size={18} color="#9CA3AF" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
              </View>

              {/* Product Details inside Cart */}
              <View style={styles.productRow}>
                <Image 
                  source={{ uri: item.image || (item.images ? item.images[0] : 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300') }} 
                  style={styles.productImg} 
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TouchableOpacity style={styles.variantSelectorChip}>
                    <Text style={styles.variantChipText}>{item.selectedColor || 'Standard'}</Text>
                    <Ionicons name="chevron-down" size={12} color="#374151" style={{ marginLeft: 4 }} />
                  </TouchableOpacity>

                  <View style={styles.priceQtyRow}>
                    <View>
                      <Text style={styles.originalPrice}>{item.originalPrice || "Rs.575"}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={styles.currentPrice}>{item.price || item.currentPrice || "Rs.267"}</Text>
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountBadgeTxt}>{item.discount || "-53%"}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Dynamic Qty Counter */}
                    <View style={styles.counterContainer}>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, item.selectedColor, -1)}>
                        <Ionicons name="remove" size={14} color="#9CA3AF" />
                      </TouchableOpacity>
                      <Text style={styles.qtyNum}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, item.selectedColor, 1)}>
                        <Ionicons name="add" size={14} color="#374151" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.promoAppliedText}>after applying promos</Text>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Guarantee Info Box */}
        <View style={styles.guaranteeBox}>
          <Ionicons name="information-circle-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
          <Text style={styles.guaranteeText}>
            Item availability and pricing are not guaranteed until payment is final.
          </Text>
        </View>

        {/* Protection Badges */}
        <View style={styles.badgesContainer}>
          <View style={styles.badgeItem}>
            <View style={styles.badgeIconWrapper}>
              <Ionicons name="shield-checkmark-outline" size={18} color="#166534" />
            </View>
            <Text style={styles.badgeLabel}>Safe Payment Options</Text>
          </View>
          <View style={styles.badgeItem}>
            <View style={styles.badgeIconWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#166534" />
            </View>
            <Text style={styles.badgeLabel}>Secure privacy</Text>
          </View>
          <View style={styles.badgeItem}>
            <View style={styles.badgeIconWrapper}>
              <Ionicons name="cube-outline" size={18} color="#166534" />
            </View>
            <Text style={styles.badgeLabel}>Temu Purchase Protection</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Bottom Bar */}
      <View style={styles.bottomCheckoutBar}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={styles.bottomPrice}>Rs.{totalPrice * 2}</Text>
          <Text style={styles.bottomCurrentPrice}>Rs.{totalPrice}</Text>
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
          <View style={styles.bottomSheetContainer}>
            
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === 'manage' ? 'Manage cart' : 'Share cart'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color="#000" />
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
                    style={styles.modalItemRow}
                    activeOpacity={0.9}
                    onPress={() => toggleSelectItem(key)}
                  >
                    <View style={[styles.modalCheckbox, isChecked ? styles.checkboxCheckedBg : styles.checkboxUncheckedBg]}>
                      {isChecked && <Ionicons name="checkmark" size={14} color="#FFF" />}
                    </View>
                    <Image 
                      source={{ uri: item.image || (item.images ? item.images[0] : 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300') }} 
                      style={styles.modalProductImg} 
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text numberOfLines={1} style={styles.modalItemTitle}>{item.title}</Text>
                      <Text style={styles.modalItemVariant}>{item.selectedColor || 'Standard'} x{item.quantity}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
                        <Text style={styles.modalOriginalPrice}>Rs.575</Text>
                        <Text style={styles.modalCurrentPrice}>{item.price || item.currentPrice || 'Rs.267'}</Text>
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountBadgeTxt}>-53%</Text>
                        </View>
                      </View>
                      <Text style={styles.promoAppliedText}>after applying promos &gt;</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Modal Footer (Select All & Action Button) */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={toggleSelectAll}>
                <View style={[styles.modalCheckbox, allSelected ? styles.checkboxCheckedBg : styles.checkboxUncheckedBg]}>
                  {allSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 13, marginLeft: 6 }}>All</Text>
              </TouchableOpacity>

              {modalType === 'manage' ? (
                <TouchableOpacity style={styles.removeBtn} onPress={handleRemoveSelected}>
                  <Text style={styles.removeBtnText}>Remove</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  headerTitle: { fontSize: 14, fontWeight: 'bold', color: '#111827' },
  cartTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginLeft: 16, flex: 1 },
  menuPopover: {
    position: 'absolute',
    top: 55,
    right: 12,
    backgroundColor: '#FFF',
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
    color: '#374151',
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
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
  filterRow: { flexDirection: 'row', padding: 12, backgroundColor: '#FFF' },
  filterChipActive: {
    backgroundColor: '#000',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  filterTextActive: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  filterChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterText: { color: '#374151', fontSize: 12, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, color: '#4B5563', marginTop: 10, fontWeight: '600' },
  shopNowBtn: { backgroundColor: '#EA580C', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginTop: 15 },
  shopNowText: { color: '#FFF', fontWeight: 'bold' },
  cartItemContainer: {
    backgroundColor: '#FFF',
    marginTop: 8,
    padding: 12,
  },
  storeItemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  storeName: { fontSize: 13, color: '#374151', fontWeight: '500', maxWidth: '75%' },
  productRow: { flexDirection: 'row' },
  productImg: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#E5E7EB' },
  variantSelectorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  variantChipText: { fontSize: 11, color: '#374151', fontWeight: '500' },
  priceQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  originalPrice: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
  currentPrice: { fontSize: 15, fontWeight: 'bold', color: '#111827' },
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
    borderColor: '#D1D5DB',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtyNum: { marginHorizontal: 8, fontSize: 12, fontWeight: 'bold', color: '#111827' },
  promoAppliedText: { fontSize: 10, color: '#6B7280', marginTop: 4 },
  guaranteeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    marginTop: 8,
  },
  guaranteeText: { fontSize: 11, color: '#6B7280', flex: 1 },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
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
  badgeLabel: { fontSize: 10, color: '#374151', textAlign: 'center', fontWeight: '500' },
  bottomCheckoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  bottomPrice: { fontSize: 12, color: '#9CA3AF', textDecorationLine: 'line-through' },
  bottomCurrentPrice: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginRight: 16 },
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
    backgroundColor: '#FFF',
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
    color: '#111827',
  },
  modalItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
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
    borderColor: '#9CA3AF',
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
    color: '#374151',
  },
  modalItemVariant: {
    fontSize: 11,
    color: '#6B7280',
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
    color: '#111827',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  removeBtn: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  removeBtnText: {
    fontWeight: 'bold',
    color: '#111827',
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