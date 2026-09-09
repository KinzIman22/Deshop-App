import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Switches states
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log out", 
          style: "destructive",
          onPress: () => {
            // Yahan apni login screen par navigate karne ka code likhein
            // navigation.replace('Login');
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          
          {/* 1. Edit Profile Option (Replaced Address) */}
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => navigation.navigate('EditProfile')} // Apni EditProfile screen ka naam yahan dein
          >
            <View style={styles.leftRow}>
              <Ionicons name="person-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={styles.itemText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* 2. Notifications Toggle */}
          <View style={styles.settingItem}>
            <View style={styles.leftRow}>
              <Ionicons name="notifications-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={styles.itemText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#FF5722' }}
              thumbColor={isNotificationsEnabled ? '#FFFFFF' : '#F3F4F6'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => setIsNotificationsEnabled(previousState => !previousState)}
              value={isNotificationsEnabled}
            />
          </View>

          <View style={styles.divider} />

          {/* 3. Dark Mode Toggle */}
          <View style={styles.settingItem}>
            <View style={styles.leftRow}>
              <Ionicons name="moon-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={styles.itemText}>Dark mode</Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#FF5722' }}
              thumbColor={isDarkModeEnabled ? '#FFFFFF' : '#F3F4F6'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={() => setIsDarkModeEnabled(previousState => !previousState)}
              value={isDarkModeEnabled}
            />
          </View>

          <View style={styles.divider} />

          {/* 4. Support */}
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => navigation.navigate('ServicesScreen', { serviceType: 'Support' })}
          >
            <View style={styles.leftRow}>
              <Ionicons name="headset-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={styles.itemText}>Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* 5. Log out */}
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={handleLogout}
          >
            <View style={styles.leftRow}>
              <Ionicons name="log-out-outline" size={20} color="#FF5722" style={styles.itemIcon} />
              <Text style={styles.itemText}>Log out</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9', // Halki warm background jaisi image mein hai
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FAFAF9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  scrollContent: {
    padding: 16,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    paddingVertical: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 14,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 50, // Icon ke baad se line shuru ho gi
  },
});