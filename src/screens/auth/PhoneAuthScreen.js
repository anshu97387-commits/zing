import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react-native';
import BouncyButton from '../../components/BouncyButton';
import { supabaseService } from '../../lib/supabaseService';

export default function PhoneAuthScreen({ navigation }) {
  const { updateUser, setAuthenticated } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const formattedPhone = `+91${phoneNumber}`;

  const handleSendOtp = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      // Real Supabase Auth Call
      await supabaseService.sendPhoneOtp(formattedPhone);
      setLoading(false);
      setIsOtpSent(true);

      // Auto-fill fallback for instant local testing
      setTimeout(() => {
        setOtp('6240');
      }, 900);
    } else {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit Indian mobile number.');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 4) {
      setLoading(true);
      await supabaseService.verifyPhoneOtp(formattedPhone, otp);
      setLoading(false);

      updateUser({ phone: `+91 ${phoneNumber}` });
      setAuthenticated(true);
      navigation.navigate('Name');
    } else {
      Alert.alert('Invalid OTP', 'Please enter the 4-digit verification code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <View style={styles.topArea}>
          <Text style={styles.brandLogo}>ZING</Text>
          
          <Text style={styles.title}>
            {isOtpSent ? 'Verify OTP' : 'Enter mobile number'}
          </Text>
          <Text style={styles.subtitle}>
            {isOtpSent 
              ? `We sent a 4-digit code to +91 ${phoneNumber}` 
              : 'Required for silent 6:00 AM morning fuel drop tracking.'}
          </Text>

          {!isOtpSent ? (
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeBox}>
                <Text style={styles.countryCode}>🇮🇳 +91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
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
            <View style={styles.otpContainer}>
              <TextInput
                style={styles.otpInput}
                placeholder="• • • •"
                placeholderTextColor="#A1A1AA"
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
                autoFocus
              />
              <Text style={styles.resendText}>Resend code in {timer}s</Text>
            </View>
          )}

          <View style={styles.securityGlassBadge}>
            <ShieldCheck color="#111111" size={16} />
            <Text style={styles.securityText}>Zero spam guarantee • 100% silent delivery updates</Text>
          </View>
        </View>

        {!isOtpSent ? (
          <BouncyButton 
            style={[styles.btn, (phoneNumber.length !== 10 || loading) && styles.btnDisabled]} 
            onPress={handleSendOtp}
            disabled={phoneNumber.length !== 10 || loading}
          >
            {loading ? (
              <ActivityIndicator color="#111111" />
            ) : (
              <>
                <Text style={styles.btnText}>Get Verification Code</Text>
                <ArrowRight color="#111111" size={20} />
              </>
            )}
          </BouncyButton>
        ) : (
          <BouncyButton 
            style={[styles.btn, (otp.length !== 4 || loading) && styles.btnDisabled]} 
            onPress={handleVerifyOtp}
            disabled={otp.length !== 4 || loading}
          >
            {loading ? (
              <ActivityIndicator color="#111111" />
            ) : (
              <>
                <Text style={styles.btnText}>Verify & Continue</Text>
                <ArrowRight color="#111111" size={20} />
              </>
            )}
          </BouncyButton>
        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  topArea: {
    marginTop: 10,
  },
  brandLogo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#71717A',
    marginTop: 6,
    marginBottom: 28,
    lineHeight: 22,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCodeBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: 1,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  otpContainer: {
    marginBottom: 20,
  },
  otpInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 14,
    borderWidth: 2,
    borderColor: '#FFC800',
    shadowColor: '#FFC800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  resendText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 13,
    color: '#71717A',
    fontWeight: '700',
  },
  securityGlassBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  securityText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#111111',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC800',
    height: 60,
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: '#FFC800',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnDisabled: {
    backgroundColor: '#E4E4E7',
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '900',
    marginRight: 8,
  }
});
