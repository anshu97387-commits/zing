import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle2, BellOff, ArrowRight } from 'lucide-react-native';
import BouncyButton from '../../components/BouncyButton';

export default function AddressScreen() {
  const { updateUser, completeOnboarding } = useAppContext();
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleFinish = () => {
    if (address.trim().length > 0) {
      updateUser({ 
        address: address.trim(), 
        instructions: instructions.trim() || 'Hang pouch on door handle (Silent 6 AM Drop)' 
      });
      completeOnboarding();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <View style={styles.topArea}>
          <Text style={styles.brandLogo}>ZING</Text>
          <Text style={styles.title}>Where to drop your pouch?</Text>
          <Text style={styles.subtitle}>Our delivery rider drops your vacuum pouch at 6:00 AM sharp.</Text>
          
          <View style={styles.trustGlassCard}>
            <View style={styles.bellIconCircle}>
              <BellOff color="#111111" size={20} />
            </View>
            <View style={styles.trustTexts}>
              <Text style={styles.trustTitle}>Silent Delivery • Bell Mat Bajana</Text>
              <Text style={styles.trustSub}>
                100% quiet delivery before sunrise. Your family and neighbors won't be disturbed.
              </Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Complete Doorstep Address</Text>
            <View style={styles.glassInputCard}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="House / Flat No, Tower, Society Name, Street..."
                placeholderTextColor="#A1A1AA"
                multiline
                numberOfLines={3}
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Drop Instructions (Optional)</Text>
            <View style={styles.glassInputCard}>
              <TextInput
                style={styles.input}
                placeholder="e.g. Hang on door handle / gate hook"
                placeholderTextColor="#A1A1AA"
                value={instructions}
                onChangeText={setInstructions}
              />
            </View>
          </View>
        </View>

        <BouncyButton 
          style={[styles.nextBtn, address.trim().length === 0 && styles.nextBtnDisabled]} 
          onPress={handleFinish}
          disabled={address.trim().length === 0}
        >
          <Text style={styles.nextText}>Unlock My Zing App</Text>
          <CheckCircle2 color="#111111" size={20} />
        </BouncyButton>

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
  brandLogo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 2,
    marginBottom: 20,
  },
  topArea: {
    marginTop: 10,
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
    marginBottom: 24,
    lineHeight: 20,
  },
  trustGlassCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFDF5',
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#FFE082',
    alignItems: 'flex-start',
  },
  bellIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  trustTexts: {
    flex: 1,
  },
  trustTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 2,
  },
  trustSub: {
    fontSize: 12,
    color: '#71717A',
    lineHeight: 17,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#71717A',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  glassInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    paddingVertical: 10,
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  nextBtn: {
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
  nextBtnDisabled: {
    backgroundColor: '#E4E4E7',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextText: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '900',
    marginRight: 8,
  }
});
