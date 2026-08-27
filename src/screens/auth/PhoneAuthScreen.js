import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react-native';
import BouncyButton from '../../components/BouncyButton';

export default function PhoneAuthScreen({ navigation }) {
  const { updateUser, setAuthenticated } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setIsOtpSent(true);
      // Demo OTP auto-fill hint
      setTimeout(() => {
        setOtp('6240');
      }, 800);
    } else {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 4) {
      updateUser({ phone: `+91 ${phoneNumber}` });
      setAuthenticated(true);
      navigation.navigate('Name');
    } else {
      Alert.alert('Invalid OTP', 'Please enter the 4-digit OTP.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <View style={styles.topArea}>
          <Text style={styles.brandLogo}>ZING</Text>
          
          <Text style={styles.title}>
            {isOtpSent ? 'Verify OTP' : 'Enter your mobile number'}
          </Text>
          <Text style={styles.subtitle}>
            {isOtpSent 
              ? `We sent a 4-digit code to +91 ${phoneNumber}` 
              : 'Required for 6:00 AM silent delivery updates.'}
          </Text>

          {!isOtpSent ? (
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeBox}>
                <Text style={styles.countryCode}>🇮🇳 +91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="98765 43210"
                placeholderTextColor="#8E8E93"
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
                placeholderTextColor="#8E8E93"
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
                autoFocus
              />
              <Text style={styles.resendText}>Resend code in {timer}s</Text>
            </View>
          )}

          <View style={styles.securityBadge}>
            <ShieldCheck color="#34C759" size={18} />
            <Text style={styles.securityText}>Zero spam. Only daily drop tracking.</Text>
          </View>
        </View>

        {!isOtpSent ? (
          <BouncyButton 
            style={[styles.btn, phoneNumber.length !== 10 && styles.btnDisabled]} 
            onPress={handleSendOtp}
            disabled={phoneNumber.length !== 10}
          >
            <Text style={styles.btnText}>Get OTP</Text>
            <ArrowRight color="#FFF" size={20} />
          </BouncyButton>
        ) : (
          <BouncyButton 
            style={[styles.btn, otp.length !== 4 && styles.btnDisabled]} 
            onPress={handleVerifyOtp}
            disabled={otp.length !== 4}
          >
            <Text style={styles.btnText}>Verify & Continue</Text>
            <ArrowRight color="#FFF" size={20} />
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
    marginTop: 20,
  },
  brandLogo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 2,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 22,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  countryCodeBox: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginRight: 12,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
  otpContainer: {
    marginBottom: 24,
  },
  otpInput: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 12,
  },
  resendText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2FFF5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  securityText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#34C759',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  btnDisabled: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 8,
  }
});
