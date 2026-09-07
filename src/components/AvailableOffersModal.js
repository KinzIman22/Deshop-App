import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function AvailableOffersModal({ visible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Available offers</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Content Scroll */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionHeader}>Service guarantee</Text>

            {/* Free Shipping Box */}
            <View style={styles.offerBox}>
              <Text style={styles.offerTitleGreen}>Free shipping</Text>
              <Text style={styles.offerSubtitle}>On all orders</Text>
              <View style={styles.dottedLine} />

              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Free standard shipping on all orders.</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Get a Rs.280 credit (Standard Shipping) for late delivery.</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Temu has order minimums to place your order. The applicable thresholds are detailed before you submit your order.</Text>
              </View>
            </View>

            {/* Price Adjustment Box */}
            <View style={styles.offerBox}>
              <Text style={styles.offerTitleGreen}>Price adjustment</Text>
              <View style={styles.dottedLine} />

              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  Items purchased from Temu are eligible for our price adjustment policy. Temu will provide the price difference in the currency that the order was paid in if the selling price of the item purchased was reduced within 30 days of payment in the same country or region.
                </Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  Items that are promotional or no longer available may not be eligible for our price adjustment policy. Fees, including but not limited to shipping fees, will be excluded for any price adjustment calculation.
                </Text>
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.85,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  scrollContent: {
    padding: 16,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  offerBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  offerTitleGreen: {
    fontSize: 15,
    fontWeight: '700',
    color: '#16A34A',
  },
  offerSubtitle: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 2,
    marginBottom: 8,
  },
  dottedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BBF7D0',
    marginVertical: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletDot: {
    fontSize: 14,
    color: '#374151',
    marginRight: 6,
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    fontSize: 12.5,
    color: '#374151',
    lineHeight: 18,
  },
});