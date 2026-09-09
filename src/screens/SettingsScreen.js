import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Modal,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    const rootNav = navigation.getParent() || navigation;
    rootNav.replace('Logout');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]} >
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBg, borderBottomColor: colors.borderColor }]}>
        <TouchableOpacity 
          style={[styles.backBtn, { backgroundColor: colors.borderColor }]} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Settings</Text>
        <View style={{ width: 36 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.cardContainer, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]}>
          
          {/* Edit Profile */}
          <TouchableOpacity 
            style={styles.settingItem} 
            // ProfileScreen.js ke andar jahan Edit Profile ka option ho wahan ye onPress add karein:
onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.leftRow}>
              <Ionicons name="person-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={[styles.itemText, { color: colors.textPrimary }]}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.dividerColor }]} />

          {/* Notifications */}
          <View style={styles.settingItem}>
            <View style={styles.leftRow}>
              <Ionicons name="notifications-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={[styles.itemText, { color: colors.textPrimary }]}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#FF5722' }}
              thumbColor={isNotificationsEnabled ? '#FFFFFF' : '#F3F4F6'}
              onValueChange={() => setIsNotificationsEnabled(prev => !prev)}
              value={isNotificationsEnabled}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.dividerColor }]} />

          {/* Dark Mode */}
          <View style={styles.settingItem}>
            <View style={styles.leftRow}>
              <Ionicons name="moon-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={[styles.itemText, { color: colors.textPrimary }]}>Dark mode</Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#FF5722' }}
              thumbColor={isDarkMode ? '#FFFFFF' : '#F3F4F6'}
              onValueChange={toggleTheme}
              value={isDarkMode}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.dividerColor }]} />

          {/* Support */}
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Services', { serviceType: 'Support' })}>
            <View style={styles.leftRow}>
              <Ionicons name="headset-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={[styles.itemText, { color: colors.textPrimary }]}>Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.dividerColor }]} />

          {/* Log out */}
          <TouchableOpacity style={styles.settingItem} onPress={() => setShowLogoutModal(true)}>
            <View style={styles.leftRow}>
              <Ionicons name="log-out-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={[styles.itemText, { color: colors.textPrimary }]}>Log out</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Custom Logout Modal with Fully Applied Theme */}
      <Modal
        transparent={true}
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBg, borderColor: colors.borderColor, borderWidth: 1 }]}>
            
            <View style={[styles.warningIconContainer, { backgroundColor: isDarkMode ? '#33221E' : '#FFF2EE' }]}>
              <Ionicons name="alert-outline" size={24} color="#FF5722" />
            </View>

            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Log out?</Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>You'll need to sign in again to access your account.</Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={[styles.cancelButton, { backgroundColor: colors.cardBg, borderColor: colors.borderColor }]} 
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={[styles.cancelButtonText, { color: colors.textPrimary }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.confirmLogoutButton} 
                onPress={handleConfirmLogout}
              >
                <Text style={styles.confirmLogoutButtonText}>Log out</Text>
              </TouchableOpacity>
            </View>

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
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  scrollContent: { padding: 16 },
  cardContainer: { borderRadius: 16, borderWidth: 1, overflow: 'hidden', paddingVertical: 4 },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  leftRow: { flexDirection: 'row', alignItems: 'center' },
  itemIcon: { marginRight: 14 },
  itemText: { fontSize: 14, fontWeight: '600' },
  divider: { height: 1, marginLeft: 50 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  warningIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  confirmLogoutButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FF5722',
    alignItems: 'center',
  },
  confirmLogoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});