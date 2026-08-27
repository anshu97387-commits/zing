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
            <Text style={styles.logoText}>Zing</Text>
            <View style={styles.logoDot} />
          </View>

          <Text style={styles.title}>DELIVERY ADDRESS</Text>
          <Text style={styles.subtitle}>Our delivery rider drops your vacuum pouch silently by 6:00 AM sharp.</Text>

          <View style={styles.inputsStack}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Street Address"
                placeholderTextColor="#A1A1AA"
                value={street}
                onChangeText={setStreet}
                autoFocus
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="City"
                placeholderTextColor="#A1A1AA"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Pincode"
                placeholderTextColor="#A1A1AA"
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
                placeholderTextColor="#A1A1AA"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <View style={styles.glowButtonWrapper}>
            <BouncyButton style={styles.saveBtn} onPress={handleFinish}>
              <Text style={styles.saveBtnText}>Save Address</Text>
            </BouncyButton>
          </View>
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
    marginBottom: 32,
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
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 30,
  },
  inputsStack: {
    gap: 16,
  },
  inputContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 18,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  inputContainerActive: {
    borderColor: '#111111',
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  bottomArea: {
    paddingBottom: 16,
  },
  glowButtonWrapper: {
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 8,
  },
  saveBtn: {
    backgroundColor: '#1C1C1E',
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
