import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import ZingLogo from '../../components/ZingLogo';
import BottomDock from '../../components/BottomDock';
import BouncyButton from '../../components/BouncyButton';
import { supabaseService } from '../../lib/supabaseService';

export default function PhoneAuthScreen({ navigation }) {
  const { updateUser, setAuthenticated } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState('6');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = async () => {
    setLoading(true);
    await supabaseService.verifyPhoneOtp(`+91${phoneNumber}`, otp);
    setLoading(false);

    updateUser({ phone: `+91 ${phoneNumber}` });
    setAuthenticated(true);
    navigation.navigate('Goal');
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      Alert.alert("Code Resent", "A new 6-digit verification code has been sent.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <View style={styles.topArea}>
          {/* Top Logo: Zing */}
          <View style={styles.topLogoRow}>
            <ZingLogo size={28} />
          </View>

          {/* Heading & Subtitle */}
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>We have sent a code to your mobile number</Text>

          {/* Phone Display */}
          <Text style={styles.phoneDisplay}>+91 {phoneNumber}</Text>

          {/* 6 OTP Boxes (Exact Mockup Match) */}
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
                  {isFocused && !char && <View style={styles.cursorBlink} />}
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

          {/* Action Button: VERIFY CODE with Soft Yellow Glow */}
          <View style={styles.glowButtonWrapper}>
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
          </View>

          {/* Resend Notice */}
          <Text style={styles.resendNotice}>
            Didn't receive the code?{' '}
            <Text style={styles.resendLink} onPress={handleResend}>
              {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
            </Text>
          </Text>
        </View>

        {/* Bottom Dock: ⚡ Order New Stack */}
        <BottomDock onPress={() => {}} />

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
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  topArea: {
    alignItems: 'center',
    width: '100%',
  },
  topLogoRow: {
    alignSelf: 'flex-start',
    marginTop: 6,
    marginBottom: 36,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  phoneDisplay: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: 0.5,
    marginBottom: 28,
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
  cursorBlink: {
    width: 2,
    height: 22,
    backgroundColor: '#111111',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
  glowButtonWrapper: {
    width: '100%',
    shadowColor: '#D4FF00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 16,
  },
  verifyBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
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
    fontSize: 15,
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
    fontWeight: '800',
  },
});
