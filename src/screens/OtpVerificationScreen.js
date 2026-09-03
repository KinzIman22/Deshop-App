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
  
  const inputRefs = useRef([]);

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
      <SafeAreaView style={styles.container}>
        <View style={styles.successWrapper}>
          <View style={styles.successCard}>
            
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark" size={48} color="#FFFFFF" />
            </View>

            <Text style={styles.successTitle}>Success!</Text>
            <Text style={styles.successSubText}>You are now logged in</Text>

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <View style={styles.illustrationBox}>
              <Ionicons name="shield-checkmark" size={60} color="#F97316" />
            </View>
            <Text style={styles.welcomeText}>Enter OTP</Text>
            <Text style={styles.subText}>
              Please enter the verification code sent to <Text style={styles.boldText}>{email}</Text>
            </Text>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <View style={styles.resendRow}>
            <Text style={styles.timerText}>
              {timer < 10 ? `00:0${timer}` : `00:${timer}`}
            </Text>
            <View style={styles.resendContainer}>
              <Text style={styles.noCodeText}>Don't receive OTP code? </Text>
              <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
                <Text style={[styles.resendLink, timer > 0 && styles.disabledLink]}>
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
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
  boldText: {
    color: '#111827',
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
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  otpBoxFilled: {
    borderColor: '#F97316',
    backgroundColor: '#FFFFFF',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  timerText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noCodeText: {
    color: '#6B7280',
    fontSize: 13,
  },
  resendLink: {
    color: '#F97316',
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
    backgroundColor: '#F9FAFB',
  },
  successCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  successIconContainer: {
    width: 88,
    height: 88,
    backgroundColor: '#10B981', // Green badge background
    borderRadius: 28, // Multi-pointed organic badge look (similar to reference image)
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
    color: '#111827',
    marginBottom: 8,
  },
  successSubText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 30,
    textAlign: 'center',
  },
});