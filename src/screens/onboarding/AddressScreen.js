import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Building, Phone, Zap } from 'lucide-react-native';
import { useAppContext } from '../../context/AppContext';
import ZingLogo from '../../components/ZingLogo';
import BottomDock from '../../components/BottomDock';
import BouncyButton from '../../components/BouncyButton';

export default function AddressScreen() {
  const { user, updateUser, completeOnboarding } = useAppContext();
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');

  const handlePinpointLocation = () => {
    Alert.alert(
      "📍 Location Pinpointed",
      "Using GPS Coordinates: 28.4595° N, 77.0266° E (Sector 14). Delivery rider assigned!",
      [
        {
          text: "Auto-Fill Address",
          onPress: () => {
            setStreet('Tower 4, Flat 302, DLF Phase 2');
            setLandmark('Near Gold Gym & Metro Pillar 54');
            setCity('Gurugram');
            setPincode('122002');
          }
        },
        { text: "OK", style: "cancel" }
      ]
    );
  };

  const handleFinish = () => {
    const fullAddress = `${street}${landmark ? ' (' + landmark + ')' : ''}${city ? ', ' + city : ''}${pincode ? ' - ' + pincode : ''}`;
    updateUser({ 
      address: fullAddress.trim() || 'Tower 4, Flat 302, Sector 14', 
      phone: phone.trim() || user?.phone || '+91 9876543210',
      instructions: 'Silent Doorstep Drop (6:00 AM)'
    });
    completeOnboarding();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollArea}>
          {/* Top Logo: Zing */}
          <View style={styles.topLogoRow}>
            <ZingLogo size={28} />
          </View>

          {/* Heading & Subtitle */}
          <Text style={styles.title}>DELIVERY ADDRESS</Text>
          <Text style={styles.subtitle}>Where should we deliver your morning fuel?</Text>

          {/* Mini Interactive Apple Map Preview (Exact Mockup Match) */}
          <View style={styles.mapCard}>
            <View style={styles.mapGridPattern}>
              <View style={styles.mapRoad1} />
              <View style={styles.mapRoad2} />
              <View style={styles.mapRoad3} />
            </View>

            {/* Glowing Center Yellow ⚡ Pin Marker */}
            <View style={styles.pinWrapper}>
              <View style={styles.pinGlowBubble}>
                <Zap color="#111111" size={18} fill="#D4FF00" />
              </View>
            </View>

            {/* Floating Pill: Pinpoint Your Location */}
            <TouchableOpacity 
              style={styles.pinpointBtn} 
              onPress={handlePinpointLocation}
              activeOpacity={0.85}
            >
              <Text style={styles.pinpointText}>Pinpoint Your Location</Text>
            </TouchableOpacity>

            <Text style={styles.appleMapsLabel}>Maps</Text>
          </View>

          {/* 5 Input Fields with Icons (Exact Mockup Match) */}
          <View style={styles.formContainer}>
            {/* 1. Street Address */}
            <View style={styles.inputWrapper}>
              <MapPin color="#8E8E93" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Street Address"
                placeholderTextColor="#A1A1AA"
                value={street}
                onChangeText={setStreet}
              />
            </View>

            {/* 2. Landmark */}
            <View style={styles.inputWrapper}>
              <Building color="#8E8E93" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Add a nearby landmark (e.g., Near Gold's Gym)"
                placeholderTextColor="#A1A1AA"
                value={landmark}
                onChangeText={setLandmark}
              />
            </View>

            {/* 3. City / Town */}
            <View style={styles.inputWrapper}>
              <MapPin color="#8E8E93" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="City / Town"
                placeholderTextColor="#A1A1AA"
                value={city}
                onChangeText={setCity}
              />
            </View>

            {/* 4. Pincode / Zip Code */}
            <View style={styles.inputWrapper}>
              <Text style={styles.pincodeLetterIcon}>P</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Pincode / Zip Code"
                placeholderTextColor="#A1A1AA"
                keyboardType="number-pad"
                maxLength={6}
                value={pincode}
                onChangeText={setPincode}
              />
            </View>

            {/* 5. Phone Number */}
            <View style={styles.inputWrapper}>
              <Phone color="#8E8E93" size={18} style={styles.inputIcon} />
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

          {/* Action Button: SAVE ADDRESS */}
          <View style={styles.glowButtonWrapper}>
            <BouncyButton style={styles.saveBtn} onPress={handleFinish}>
              <Text style={styles.saveBtnText}>SAVE ADDRESS</Text>
            </BouncyButton>
          </View>
        </ScrollView>

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
  scrollArea: {
    paddingBottom: 10,
  },
  topLogoRow: {
    alignSelf: 'flex-start',
    marginTop: 6,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 20,
  },
  mapCard: {
    height: 145,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  mapGridPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F3F4F6',
  },
  mapRoad1: {
    position: 'absolute',
    top: 20,
    left: -20,
    width: 280,
    height: 24,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '25deg' }],
  },
  mapRoad2: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    width: 320,
    height: 20,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '-15deg' }],
  },
  mapRoad3: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 140,
    width: 18,
    backgroundColor: '#FFFFFF',
  },
  pinWrapper: {
    position: 'absolute',
    top: 24,
    alignItems: 'center',
  },
  pinGlowBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D4FF00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4FF00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  pinpointBtn: {
    position: 'absolute',
    bottom: 14,
    backgroundColor: 'rgba(100, 116, 139, 0.75)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  pinpointText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  appleMapsLabel: {
    position: 'absolute',
    bottom: 6,
    left: 10,
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
  },
  formContainer: {
    gap: 10,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  inputIcon: {
    marginRight: 10,
  },
  pincodeLetterIcon: {
    fontSize: 16,
    fontWeight: '800',
    color: '#8E8E93',
    marginRight: 12,
    marginLeft: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  glowButtonWrapper: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
