import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Modal 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme, colors } = useTheme();

  // States
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const currentTheme = {
    bg: colors.background,
    card: colors.cardBg,
    cardElevated: colors.inputBg || colors.borderColor,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    border: colors.borderColor,
    accent: '#FF5722',
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    const rootNav = navigation.getParent() || navigation;
    rootNav.replace('Logout');
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
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Settings</Text>
        <View style={{ width: 36 }} /> 
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 30 }} showsVerticalScrollIndicator={false}>
        
        {/* SECTION 1: PREFERENCES */}
        <Text style={[styles.sectionHeader, { color: currentTheme.textSecondary }]}>Preferences</Text>
        <View style={[styles.cardGroup, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          
          {/* Dark Mode Toggle */}
          <View style={[styles.rowItem, { borderBottomColor: currentTheme.border }]}>
            <View style={styles.rowLabelContainer}>
              <View style={[styles.iconBox, { backgroundColor: currentTheme.cardElevated }]}>
                <Ionicons name="moon-outline" size={18} color={currentTheme.accent} />
              </View>
              <Text style={[styles.rowText, { color: currentTheme.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#D1D5DB', true: currentTheme.accent }}
              thumbColor={isDarkMode ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          {/* Sound Effect Toggle */}
          <View style={styles.rowItem}>
            <View style={styles.rowLabelContainer}>
              <View style={[styles.iconBox, { backgroundColor: currentTheme.cardElevated }]}>
                <Ionicons name="volume-high-outline" size={18} color={currentTheme.accent} />
              </View>
              <Text style={[styles.rowText, { color: currentTheme.text }]}>App Sound Effects</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#D1D5DB', true: currentTheme.accent }}
              thumbColor={soundEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

        </View>

        {/* SECTION 2: NOTIFICATIONS & ACTIVITY */}
        <Text style={[styles.sectionHeader, { color: currentTheme.textSecondary }]}>Notifications & Activity</Text>
        <View style={[styles.cardGroup, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          
          {/* Direct Link to Notifications Screen */}
          <TouchableOpacity 
            style={[styles.rowItem, { borderBottomColor: currentTheme.border }]}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLabelContainer}>
              <View style={[styles.iconBox, { backgroundColor: currentTheme.cardElevated }]}>
                <Ionicons name="notifications-outline" size={18} color={currentTheme.accent} />
              </View>
              <Text style={[styles.rowText, { color: currentTheme.text }]}>View All Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={currentTheme.textSecondary} />
          </TouchableOpacity>

          {/* Notifications Toggle */}
          <View style={styles.rowItem}>
            <View style={styles.rowLabelContainer}>
              <View style={[styles.iconBox, { backgroundColor: currentTheme.cardElevated }]}>
                <Ionicons name="notifications-circle-outline" size={18} color={currentTheme.accent} />
              </View>
              <Text style={[styles.rowText, { color: currentTheme.text }]}>Notifications Alert</Text>
            </View>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={() => setIsNotificationsEnabled(prev => !prev)}
              trackColor={{ false: '#D1D5DB', true: currentTheme.accent }}
              thumbColor={isNotificationsEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

        </View>

        {/* SECTION 3: ACCOUNT & SUPPORT */}
        <Text style={[styles.sectionHeader, { color: currentTheme.textSecondary }]}>Account & Support</Text>
        <View style={[styles.cardGroup, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          
          {/* Edit Profile */}
          <TouchableOpacity 
            style={[styles.rowItem, { borderBottomColor: currentTheme.border }]} 
            onPress={() => navigation.navigate('EditProfile')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLabelContainer}>
              <View style={[styles.iconBox, { backgroundColor: currentTheme.cardElevated }]}>
                <Ionicons name="person-outline" size={18} color={currentTheme.accent} />
              </View>
              <Text style={[styles.rowText, { color: currentTheme.text }]}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={currentTheme.textSecondary} />
          </TouchableOpacity>

          {/* Support */}
          <TouchableOpacity 
            style={[styles.rowItem, { borderBottomColor: currentTheme.border }]} 
            onPress={() => navigation.navigate('Services', { serviceType: 'Support' })}
            activeOpacity={0.7}
          >
            <View style={styles.rowLabelContainer}>
              <View style={[styles.iconBox, { backgroundColor: currentTheme.cardElevated }]}>
                <Ionicons name="headset-outline" size={18} color={currentTheme.accent} />
              </View>
              <Text style={[styles.rowText, { color: currentTheme.text }]}>Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={currentTheme.textSecondary} />
          </TouchableOpacity>

          {/* Privacy Policy */}
          {/* Privacy Policy */}
          <TouchableOpacity 
            style={[styles.rowItem, { borderBottomColor: currentTheme.border }]} 
            onPress={() => navigation.navigate('PrivacyPolicy')} // Yeh line add karni hai
            activeOpacity={0.7}
          >
            <View style={styles.rowLabelContainer}>
              <View style={[styles.iconBox, { backgroundColor: currentTheme.cardElevated }]}>
                <Ionicons name="document-text-outline" size={18} color={currentTheme.accent} />
              </View>
              <Text style={[styles.rowText, { color: currentTheme.text }]}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={currentTheme.textSecondary} />
          </TouchableOpacity>

          {/* Log out */}
          <TouchableOpacity 
            style={styles.rowItem} 
            onPress={() => setShowLogoutModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.rowLabelContainer}>
              <View style={[styles.iconBox, { backgroundColor: currentTheme.cardElevated }]}>
                <Ionicons name="log-out-outline" size={18} color={currentTheme.accent} />
              </View>
              <Text style={[styles.rowText, { color: currentTheme.text }]}>Log out</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={currentTheme.textSecondary} />
          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* Custom Logout Modal */}
      <Modal
        transparent={true}
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: currentTheme.card, borderColor: currentTheme.border, borderWidth: 1 }]}>
            
            <View style={[styles.warningIconContainer, { backgroundColor: isDarkMode ? '#33221E' : '#FFF2EE' }]}>
              <Ionicons name="alert-outline" size={24} color={currentTheme.accent} />
            </View>

            <Text style={[styles.modalTitle, { color: currentTheme.text }]}>Log out?</Text>
            <Text style={[styles.modalSubtitle, { color: currentTheme.textSecondary }]}>You'll need to sign in again to access your account.</Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity 
                style={[styles.cancelButton, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]} 
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={[styles.cancelButtonText, { color: currentTheme.text }]}>Cancel</Text>
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

  sectionHeader: { 
    fontSize: 12, 
    fontWeight: '700', 
    textTransform: 'uppercase', 
    letterSpacing: 0.5, 
    marginTop: 16, 
    marginBottom: 8, 
    marginLeft: 4 
  },
  cardGroup: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rowLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowText: { fontSize: 13, fontWeight: '600' },

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