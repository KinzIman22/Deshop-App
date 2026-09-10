import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function PrivacyPolicyScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { isDarkMode, colors } = useTheme();

  const currentTheme = {
    bg: colors.background,
    card: colors.cardBg,
    cardElevated: colors.inputBg || colors.borderColor,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    border: colors.borderColor,
    accent: '#FF5722',
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: currentTheme.bg }]}>
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBg || currentTheme.card, borderBottomColor: currentTheme.border }]}>
        <TouchableOpacity 
          style={[styles.backBtn, { backgroundColor: currentTheme.cardElevated }]} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color={currentTheme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Privacy & Policies</Text>
        <View style={{ width: 36 }} /> 
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 30 }} showsVerticalScrollIndicator={false}>
        
        {/* Intro Card */}
        <View style={[styles.card, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          <Text style={[styles.cardTitle, { color: currentTheme.text }]}>Our Commitment to You</Text>
          <Text style={[styles.cardText, { color: currentTheme.textSecondary }]}>
            We value your privacy and are committed to protecting your personal information. This policy outlines how we handle your orders, deliveries, payments, and return requests securely.
          </Text>
        </View>

        {/* Cash on Delivery (COD) Policy */}
        <Text style={[styles.sectionHeader, { color: currentTheme.textSecondary }]}>01. Cash on Delivery (COD)</Text>
        <View style={[styles.card, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={16} color={currentTheme.accent} style={styles.bulletIcon} />
            <Text style={[styles.cardText, { color: currentTheme.textSecondary, flex: 1 }]}>
              <Text style={{ fontWeight: '700', color: currentTheme.text }}>Order Verification: </Text>
              For COD orders, our team may call or message you to confirm the pickup or delivery address before dispatching our rider.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={16} color={currentTheme.accent} style={styles.bulletIcon} />
            <Text style={[styles.cardText, { color: currentTheme.textSecondary, flex: 1 }]}>
              <Text style={{ fontWeight: '700', color: currentTheme.text }}>Exact Cash: </Text>
              Customers are requested to keep exact cash ready at the time of delivery to facilitate smooth transactions.
            </Text>
          </View>
        </View>

        {/* Online Delivery & Secure Payments */}
        <Text style={[styles.sectionHeader, { color: currentTheme.textSecondary }]}>02. Online Delivery & Payments</Text>
        <View style={[styles.card, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={16} color={currentTheme.accent} style={styles.bulletIcon} />
            <Text style={[styles.cardText, { color: currentTheme.textSecondary, flex: 1 }]}>
              <Text style={{ fontWeight: '700', color: currentTheme.text }}>Data Security: </Text>
              All online digital transactions are processed securely through encrypted third-party payment gateways. We do not store your credit card or bank credentials.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={16} color={currentTheme.accent} style={styles.bulletIcon} />
            <Text style={[styles.cardText, { color: currentTheme.textSecondary, flex: 1 }]}>
              <Text style={{ fontWeight: '700', color: currentTheme.text }}>Contactless Delivery: </Text>
              You can specify delivery instructions for our riders to drop off items safely at your doorstep.
            </Text>
          </View>
        </View>

        {/* Returns & Re-wash Policy */}
        <Text style={[styles.sectionHeader, { color: currentTheme.textSecondary }]}>03. Returns & Claims Policy</Text>
        <View style={[styles.card, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={16} color={currentTheme.accent} style={styles.bulletIcon} />
            <Text style={[styles.cardText, { color: currentTheme.textSecondary, flex: 1 }]}>
              <Text style={{ fontWeight: '700', color: currentTheme.text }}>Inspection at Delivery: </Text>
              Please inspect your items at the time of delivery. If you find any issues regarding cleaning or folding quality, notify the rider immediately.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={16} color={currentTheme.accent} style={styles.bulletIcon} />
            <Text style={[styles.cardText, { color: currentTheme.textSecondary, flex: 1 }]}>
              <Text style={{ fontWeight: '700', color: currentTheme.text }}>24-Hour Window: </Text>
              Claims for re-wash or discrepancies must be lodged within 24 hours of delivery along with order details and photos if necessary.
            </Text>
          </View>
        </View>

      </ScrollView>
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
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  sectionHeader: { 
    fontSize: 12, 
    fontWeight: '700', 
    textTransform: 'uppercase', 
    letterSpacing: 0.5, 
    marginTop: 20, 
    marginBottom: 8, 
    marginLeft: 4 
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 20,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletIcon: {
    marginTop: 2,
    marginRight: 8,
  },
});