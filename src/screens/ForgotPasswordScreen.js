import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    Alert.alert('Success', 'Verification code sent to your email');
    navigation.navigate('OtpVerification', { email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          {/* Top Logo / Icon Box (Replaced Image with Orange Icon Box) */}
          <View style={styles.headerContainer}>
            <View style={styles.illustrationBox}>
              <Ionicons name="key-outline" size={50} color="#F97316" />
            </View>
            <Text style={styles.welcomeText}>Forgot Password</Text>
            <Text style={styles.subText}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="name@example.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Main Action Button */}
            <TouchableOpacity style={styles.primaryBtn} onPress={handleResetPassword}>
              <Text style={styles.primaryBtnText}>Continue</Text>
            </TouchableOpacity>

            {/* Back to Sign In Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.noAccountText}>Remember your password? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    marginBottom: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  illustrationBox: {
    width: 90,
    height: 90,
    backgroundColor: '#FFF7ED', // Light orange tint container matching OTP screen
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F2937',
  },
  primaryBtn: {
    backgroundColor: '#F97316', // Updated to Orange theme
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    color: '#6B7280',
    fontSize: 14,
  },
  linkText: {
    color: '#F97316', // Updated to Orange theme
    fontSize: 14,
    fontWeight: '600',
  },
});