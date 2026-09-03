import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    navigation.navigate('OtpVerification', { email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Top Logo - Increased by 20% (96px instead of 80px) */}
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/Logo/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Create Account</Text>
            <Text style={styles.subText}>Join DeShop and explore endless shopping possibilities</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Full Name Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="John Doe"
                  placeholderTextColor="#9CA3AF"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

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

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Create a strong password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Main Action Button */}
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignUp}>
              <Text style={styles.primaryBtnText}>Get Started</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>OR CONNECT WITH</Text>
              <View style={styles.line} />
            </View>

            {/* Social Links */}
            <View style={styles.socialContainer}>
              <TouchableOpacity 
                activeOpacity={0.5} 
                style={styles.socialTouchable} 
                onPress={() => Alert.alert('Google', 'Google sign up clicked')}
              >
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
                  style={styles.socialIconImage} 
                  resizeMode="contain"
                />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                activeOpacity={0.5} 
                style={styles.socialTouchable} 
                onPress={() => Alert.alert('Twitter', 'Twitter sign up clicked')}
              >
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733579.png' }} 
                  style={styles.socialIconImage} 
                  resizeMode="contain"
                />
                <Text style={styles.socialText}>Twitter</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                activeOpacity={0.5} 
                style={styles.socialTouchable} 
                onPress={() => Alert.alert('Facebook', 'Facebook sign up clicked')}
              >
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' }} 
                  style={styles.socialIconImage} 
                  resizeMode="contain"
                />
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Switch to Sign In */}
            <View style={styles.footerContainer}>
              <Text style={styles.noAccountText}>Already have an account? </Text>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
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
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F2937',
    marginLeft: 10,
  },
  eyeIcon: {
    padding: 4,
  },
  primaryBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  socialTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  socialIconImage: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  socialText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
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
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
});