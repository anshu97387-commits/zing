import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { Colors } from '../../theme/colors';
import BouncyButton from '../../components/BouncyButton';
import { supabaseService } from '../../lib/supabaseService';

export default function PhoneAuthScreen({ navigation }) {
  const { updateUser, setAuthenticated } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState('6');
  const [isOtpSent, setIsOtpSent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const formattedPhone = `+91${phoneNumber}`;

  const handleSendOtp = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      await supabaseService.sendPhoneOtp(formattedPhone);
      setLoading(false);
      setIsOtpSent(true);

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
          {/* Top Brand: Zing with Yellow Bolt */}
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>Zing</Text>
            <View style={styles.logoDot} />
          </View>

          {/* Heading */}
          <Text style={styles.title}>{isOtpSent ? 'Enter OTP' : 'Enter Mobile'}</Text>
          <Text style={styles.subtitle}>
            {isOtpSent 
              ? 'We have sent a code to your mobile number' 
              : 'Required for silent 6:00 AM morning stack delivery tracking.'}
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
                placeholderTextColor="#A1A1AA"
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
                const isFocused = otp.length === index || (index === 0 && otp.length === 1);
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

          {/* Action Button with Yellow Glow (Mockup Match) */}
          <View style={styles.glowButtonWrapper}>
            {!isOtpSent ? (
              <BouncyButton 
                style={[styles.verifyBtn, (phoneNumber.length !== 10 || loading) && styles.btnDisabled]} 
                onPress={handleSendOtp}
                disabled={phoneNumber.length !== 10 || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.verifyBtnText}>GET CODE</Text>
                )}
              </BouncyButton>
            ) : (
              <BouncyButton 
                style={[styles.verifyBtn, (otp.length < 1 || loading) && styles.btnDisabled]} 
                onPress={handleVerifyOtp}
                disabled={otp.length < 1 || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.verifyBtnText}>VERIFY CODE</Text>
                )}
              </BouncyButton>
            )}
          </View>

          {isOtpSent && (
            <Text style={styles.resendNotice}>
              Didn't receive the code? <Text style={styles.resendLink}>Resend in {timer}s</Text>
            </Text>
          )}
        </View>

        {/* Floating Bottom Center Bolt & Label (Exact Mockup Match) */}
        <View style={styles.bottomCenterContainer}>
          <TouchableOpacity style={styles.floatingBoltCircle} activeOpacity={0.85}>
            <Text style={styles.boltEmoji}>⚡</Text>
          </TouchableOpacity>
          <Text style={styles.orderNewStackLabel}>Order New Stack</Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  topArea: {
    alignItems: 'center',
    width: '100%',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 44,
  },
  logoText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  logoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.yellow,
    marginLeft: 3,
    marginTop: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    maxWidth: 280,
  },
  phoneDisplay: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: 1,
    marginBottom: 28,
  },
  phoneInputRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginTop: 10,
    marginBottom: 28,
  },
  countryCodeBadge: {
    backgroundColor: '#F2F2F7',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },
  phoneTextInput: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 58,
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: 1,
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
    position: 'relative',
  },
  otpSingleBox: {
    width: 48,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpSingleBoxActive: {
    borderColor: '#111111',
    borderWidth: 2,
  },
  otpSingleBoxFilled: {
    borderColor: '#111111',
  },
  otpBoxChar: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
  glowButtonWrapper: {
    width: '100%',
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 8,
    marginBottom: 16,
  },
  verifyBtn: {
    backgroundColor: '#1C1C1E',
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  btnDisabled: {
    backgroundColor: '#8E8E93',
  },
  verifyBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  resendNotice: {
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
  },
  resendLink: {
    color: '#111111',
    fontWeight: '700',
  },
  bottomCenterContainer: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  floatingBoltCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 6,
    marginBottom: 8,
  },
  boltEmoji: {
    fontSize: 24,
    color: Colors.yellow,
  },
  orderNewStackLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: 0.3,
  }
});
