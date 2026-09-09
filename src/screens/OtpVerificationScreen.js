import React, { useState, useRef, useEffect } from 'react';
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

export default function OtpVerificationScreen({ route, navigation }) {
  const email = route?.params?.email || 'name@example.com';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(35);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const inputRefs = useRef([]);

  // Dynamic Theme Colors consistent with LoginScreen, OrderDetailScreen & OrdersScreen
  const theme = {
    bg: isDarkMode ? '#121212' : '#FFFFFF',
    successWrapperBg: isDarkMode ? '#1A1A1A' : '#F9FAFB',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#F3F4F6' : '#111827',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#2D2D2D' : '#E5E7EB',
    accent: '#F97316',
    illustrationBg: isDarkMode ? '#3B2219' : '#FFF7ED',
    otpBoxBg: isDarkMode ? '#252525' : '#F9FAFB',
    otpBoxBorder: isDarkMode ? '#3F3F46' : '#E5E7EB',
    otpBoxFilledBorder: '#F97316',
    otpBoxFilledBg: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    timerText: '#EF4444',
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyAndProceed = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit verification code');
      return;
    }
    setIsVerified(true);
  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(35);
      Alert.alert('Resend', 'A new verification code has been sent to your email.');
    }
  };

  // Success Card Screen (Green Badge with multi-pointed shape & full width button)
  if (isVerified) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
        <View style={[styles.successWrapper, { backgroundColor: theme.successWrapperBg }]}>
          <View style={[styles.successCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            
            {/* Theme Toggle Button inside Success Card header */}
            <TouchableOpacity 
              style={[styles.themeToggleButtonAbsolute, { backgroundColor: isDarkMode ? '#2D2D2D' : '#F1F5F9' }]}
              onPress={() => setIsDarkMode(!isDarkMode)}
            >
              <Ionicons name={isDarkMode ? "sunny" : "moon"} size={18} color={isDarkMode ? "#FBBF24" : "#4B5563"} />
            </TouchableOpacity>

            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark" size={48} color="#FFFFFF" />
            </View>

            <Text style={[styles.successTitle, { color: theme.text }]}>Success!</Text>
            <Text style={[styles.successSubText, { color: theme.textSecondary }]}>You are now logged in</Text>

            <TouchableOpacity 
              style={styles.primaryBtn} 
              onPress={() => navigation.replace('Home')}
            >
              <Text style={styles.primaryBtnText}>Continue</Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    );
  }

  // OTP Input Screen
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Top Bar with Back Button & Theme Toggle */}
          <View style={styles.topBarRow}>
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: isDarkMode ? '#1E1E1E' : 'transparent', borderColor: theme.border }]} 
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.themeToggleButton, { backgroundColor: isDarkMode ? '#2D2D2D' : '#F1F5F9' }]}
              onPress={() => setIsDarkMode(!isDarkMode)}
            >
              <Ionicons name={isDarkMode ? "sunny" : "moon"} size={18} color={isDarkMode ? "#FBBF24" : "#4B5563"} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContainer}>
            <View style={[styles.illustrationBox, { backgroundColor: theme.illustrationBg }]}>
              <Ionicons name="shield-checkmark" size={60} color={theme.accent} />
            </View>
            <Text style={[styles.welcomeText, { color: theme.text }]}>Enter OTP</Text>
            <Text style={[styles.subText, { color: theme.textSecondary }]}>
              Please enter the verification code sent to <Text style={[styles.boldText, { color: theme.text }]}>{email}</Text>
            </Text>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpBox, 
                  { 
                    backgroundColor: theme.otpBoxBg, 
                    borderColor: digit ? theme.otpBoxFilledBorder : theme.otpBoxBorder,
                    color: theme.text 
                  },
                  digit ? { backgroundColor: theme.otpBoxFilledBg } : null
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                placeholderTextColor={theme.textSecondary}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <View style={styles.resendRow}>
            <Text style={[styles.timerText, { color: theme.timerText }]}>
              {timer < 10 ? `00:0${timer}` : `00:${timer}`}
            </Text>
            <View style={styles.resendContainer}>
              <Text style={[styles.noCodeText, { color: theme.textSecondary }]}>Don't receive OTP code? </Text>
              <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
                <Text style={[styles.resendLink, { color: theme.accent }, timer > 0 && styles.disabledLink]}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleVerifyAndProceed}>
            <Text style={styles.primaryBtnText}>Verify & Proceed</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  topBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  themeToggleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeToggleButtonAbsolute: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  illustrationBox: {
    width: 90,
    height: 90,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  otpBox: {
    width: 46,
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noCodeText: {
    fontSize: 13,
  },
  resendLink: {
    fontSize: 13,
    fontWeight: '600',
  },
  disabledLink: {
    color: '#9CA3AF',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  successWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successCard: {
    width: '100%',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
  },
  successIconContainer: {
    width: 88,
    height: 88,
    backgroundColor: '#10B981', // Green badge background
    borderRadius: 28, // Multi-pointed organic badge look
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  successSubText: {
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
});