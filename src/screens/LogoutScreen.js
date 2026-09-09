import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function LogoutScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#33211D' : '#FFEDD5' }]}>
          <Ionicons name="person-outline" size={48} color="#FF5722" />
        </View>
        
        <Text style={[styles.title, { color: colors.textPrimary }]}>You're logged out</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          You'll need to sign in again to access your account and saved items.
        </Text>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.replace('Login')} // Replace taake back na aa sake logout ke baad
        >
          <Text style={styles.loginButtonText}>Log back in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  content: { width: '100%', maxWidth: 320, alignItems: 'center' },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
  loginButton: {
    backgroundColor: '#FF5722',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});