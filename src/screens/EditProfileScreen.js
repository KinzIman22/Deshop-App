// src/screens/EditProfileScreen.js
import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

// Import ThemeContext
import { ThemeContext } from '../context/ThemeContext';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Access global ThemeContext
  const { isDarkMode } = useContext(ThemeContext);

  // Dynamic Theme Colors
  const theme = {
    bg: isDarkMode ? '#121212' : '#F3F4F6',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#F9FAFB' : '#1F2937',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#2D2D2D' : '#E5E7EB',
    inputBg: isDarkMode ? '#2A2A2A' : '#FFFFFF',
    accent: '#F97316',
  };

  // Form states
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('Ahmed Hammad');
  const [email, setEmail] = useState('ahmed.hammad@example.com');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [bio, setBio] = useState('Frequent shopper, always hunting for a good deal.');

  // Image Picker Logic (Camera / Gallery)
  const handleImagePicker = () => {
    Alert.alert(
      "Update Profile Picture",
      "Choose an option",
      [
        { text: "Camera", onPress: openCamera },
        { text: "Gallery", onPress: openGallery },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Camera permission is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Gallery permission is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Updated Save Changes to pass name back to Profile Screen
  const handleSaveChanges = () => {
    navigation.navigate('ProfileTab', { 
      updatedName: fullName, 
      updatedEmail: email, 
      updatedPhone: phone,
      updatedImage: profileImage 
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        
        {/* Top Header Gradient */}
        <LinearGradient 
          colors={['#FF7E29', '#FF4112']} 
          style={styles.headerContainer}
        >
          <View style={styles.topBarRow}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Edit profile</Text>
            
            <TouchableOpacity 
              style={styles.headerIconBtn} 
              onPress={() => navigation.navigate('CartTab')}
              activeOpacity={0.8}
            >
              <Ionicons name="bag-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Profile Avatar inside Header */}
          <View style={styles.avatarWrapper}>
            <TouchableOpacity 
              style={[styles.avatarContainer, { backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF', borderColor: isDarkMode ? '#3A3A3A' : '#FFFFFF' }]} 
              onPress={handleImagePicker} 
              activeOpacity={0.9}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <Ionicons name="person" size={40} color="#9CA3AF" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cameraOverlayIcon} onPress={handleImagePicker} activeOpacity={0.8}>
              <Ionicons name="camera" size={12} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <Text style={[styles.photoSubText, { color: theme.textSecondary }]}>Tap the camera to change your photo</Text>

        {/* Form Container */}
        <View style={[styles.formContainer, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
          
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Full name</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
              <Ionicons name="person-outline" size={18} color="#F97316" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { color: theme.text }]}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Email</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
              <Ionicons name="mail-outline" size={18} color="#F97316" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { color: theme.text }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor={theme.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Phone number</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
              <Ionicons name="call-outline" size={18} color="#F97316" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, { color: theme.text }]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                placeholderTextColor={theme.textSecondary}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Bio */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Bio</Text>
            <View style={[styles.textAreaWrapper, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
              <TextInput
                style={[styles.textAreaInput, { color: theme.text }]}
                value={bio}
                onChangeText={setBio}
                placeholder="Write something about yourself..."
                placeholderTextColor={theme.textSecondary}
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity 
            style={[styles.cancelButton, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={[styles.cancelButtonText, { color: theme.text }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveChanges}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#FF7E29', '#FF4112']} style={styles.saveGradient}>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.saveButtonText}>Save changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 35,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
    alignItems: 'center',
  },
  topBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  backButton: {
    padding: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  headerIconBtn: {
    padding: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  avatarWrapper: { position: 'absolute', bottom: -32, alignSelf: 'center' },
  avatarContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    elevation: 4,
  },
  avatarImage: { width: '100%', height: '100%' },
  cameraOverlayIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#EF4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  photoSubText: { textAlign: 'center', fontSize: 12, marginTop: 40, marginBottom: 10 },
  formContainer: {
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 14 },
  textAreaWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 80,
  },
  textAreaInput: { flex: 1, fontSize: 14 },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: { fontSize: 14, fontWeight: '600' },
  saveButton: { flex: 1, marginLeft: 8, borderRadius: 10, overflow: 'hidden' },
  saveGradient: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});