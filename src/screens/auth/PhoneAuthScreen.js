import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { Colors } from '../../theme/colors';
import BouncyButton from '../../components/BouncyButton';
import { supabaseService } from '../../lib/supabaseService';

export default function PhoneAuthScreen({ navigation }) {
  const { updateUser, setAuthenticated } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const formattedPhone = `+91${phoneNumber}`;

  const handleSendOtp = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      await supabaseService.sendPhoneOtp(formattedPhone);
      setLoading(false);
      setIsOtpSent(true);

      // Auto-fill fallback for instant local testing
      setTimeout(() => {
        setOtp('624089');
      }, 800);
    } else {
      Alert.alert('Invalid Mobile', 'Please enter a valid 10-digit mobile number.');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length >= 4) {
      setLoading(true);
      await supabaseService.verifyPhoneOtp(formattedPhone, otp);
      setLoading(false);

      updateUser({ phone: `+91 ${phoneNumber}` });
      setAuthenticated(true);
      navigation.navigate('Name');
    } else {
      Alert.alert('Invalid OTP', 'Please enter the verification code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <View style={styles.topArea}>
          <View style={styles.logoRow}>
            <Text style={styles.logoWhite}>Zing</Text>
            <Text style={styles.logoNeon}>Fit</Text>
          </View>

          {/* Floating Frosted Box (Mockup Match) */}
          <View style={styles.floatingHeaderCard}>
            <Text style={styles.otpHeaderTitle}>{isOtpSent ? 'Enter OTP' : 'Enter Mobile'}</Text>
          </View>

          <Text style={styles.subtitle}>
            {isOtpSent 
              ? 'We have sent a code to your mobile number' 
              : 'Required for silent 6:00 AM doorstep delivery tracking.'}
          </Text>

          {isOtpSent && (
            <Text style={styles.phoneDisplay}>+91 {phoneNumber}</Text>
          )}

          {!isOtpSent ? (
            <View style={styles.phoneInputRow}>
              <View style={styles.countryCodeBadge}>
                <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
              </View>
              <TextInput
                style={styles.phoneTextInput}
                placeholder="98765 43210"
                placeholderTextColor="#52525B"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoFocus
              />
            </View>
          ) : (
            <View style={styles.otpBoxesRow}>
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const char = otp[index] || '';
                const isFocused = otp.length === index || (index === 5 && otp.length === 6);
                return (
                  <View 
                    key={index} 
                    style={[
                      styles.otpSingleBox, 
                      isFocused && styles.otpSingleBoxActive,
                      char ? styles.otpSingleBoxFilled : null
                    ]}
                  >
                    <Text style={styles.otpBoxChar}>{char || ''}</Text>
                  </View>
                );
              })}
              <TextInput
                style={styles.hiddenInput}
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
                autoFocus
              />
            </View>
          )}
        </View>

        <View style={styles.bottomArea}>
          {!isOtpSent ? (
            <BouncyButton 
              style={[styles.actionBtn, (phoneNumber.length !== 10 || loading) && styles.actionBtnDisabled]} 
              onPress={handleSendOtp}
              disabled={phoneNumber.length !== 10 || loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.neon} />
              ) : (
                <Text style={styles.actionBtnText}>GET CODE</Text>
              )}
            </BouncyButton>
          ) : (
            <BouncyButton 
              style={[styles.actionBtn, (otp.length < 4 || loading) && styles.actionBtnDisabled]} 
              onPress={handleVerifyOtp}
              disabled={otp.length < 4 || loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.neon} />
              ) : (
                <Text style={styles.actionBtnText}>VERIFY CODE</Text>
              )}
            </BouncyButton>
          )}
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  topArea: {
    marginTop: 10,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 36,
  },
  logoWhite: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  logoNeon: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.neon,
  },
  floatingHeaderCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 255, 0, 0.4)',
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
    marginBottom: 16,
  },
  otpHeaderTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 16,
  },
  phoneDisplay: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 28,
  },
  phoneInputRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginTop: 16,
  },
  countryCodeBadge: {
    backgroundColor: '#18181A',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  phoneTextInput: {
    flex: 1,
    backgroundColor: '#18181A',
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 60,
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    position: 'relative',
  },
  otpSingleBox: {
    width: 46,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#141416',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpSingleBoxActive: {
    borderColor: Colors.neon,
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 3,
  },
  otpSingleBoxFilled: {
    borderColor: 'rgba(212, 255, 0, 0.6)',
  },
  otpBoxChar: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
  bottomArea: {
    paddingBottom: 16,
  },
  actionBtn: {
    backgroundColor: '#141416',
    borderWidth: 1.5,
    borderColor: Colors.neon,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  actionBtnDisabled: {
    borderColor: '#3F3F46',
    backgroundColor: '#121214',
    shadowOpacity: 0,
  },
  actionBtnText: {
    color: Colors.neon,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
