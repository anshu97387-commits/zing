import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { Colors } from '../../theme/colors';
import BouncyButton from '../../components/BouncyButton';

export default function AddressScreen() {
  const { user, updateUser, completeOnboarding } = useAppContext();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleFinish = () => {
    const fullAddress = `${street}${city ? ', ' + city : ''}${pincode ? ' - ' + pincode : ''}`;
    updateUser({ 
      address: fullAddress.trim() || 'Flat 402, Green Valley Apartments', 
      phone: phone.trim() || user?.phone || '+91 9876543210',
      instructions: 'Silent Doorstep Drop (6:00 AM)'
    });
    completeOnboarding();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollInside}>
          <View style={styles.logoRow}>
            <Text style={styles.logoWhite}>Zing</Text>
            <Text style={styles.logoNeon}>Fit</Text>
          </View>

          <Text style={styles.title}>DELIVERY ADDRESS</Text>
          <Text style={styles.subtitle}>Our delivery rider drops your vacuum pouch silently by 6:00 AM sharp.</Text>

          <View style={styles.inputsStack}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Street Address"
                placeholderTextColor="#71717A"
                value={street}
                onChangeText={setStreet}
                autoFocus
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="City"
                placeholderTextColor="#71717A"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Pincode"
                placeholderTextColor="#71717A"
                keyboardType="number-pad"
                maxLength={6}
                value={pincode}
                onChangeText={setPincode}
              />
            </View>

            <View style={[styles.inputContainer, styles.inputContainerActive]}>
              <TextInput
                style={styles.textInput}
                placeholder="Phone Number"
                placeholderTextColor="#71717A"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <BouncyButton style={styles.saveBtn} onPress={handleFinish}>
            <Text style={styles.saveBtnText}>Save Address</Text>
          </BouncyButton>
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
  scrollInside: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
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
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
    marginBottom: 28,
  },
  inputsStack: {
    gap: 14,
  },
  inputContainer: {
    backgroundColor: '#141416',
    borderRadius: 18,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputContainerActive: {
    borderColor: 'rgba(212, 255, 0, 0.6)',
    backgroundColor: '#18181A',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomArea: {
    paddingBottom: 16,
  },
  saveBtn: {
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
  saveBtnText: {
    color: Colors.neon,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
