import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle2, BellOff } from 'lucide-react-native';
import BouncyButton from '../../components/BouncyButton';

export default function AddressScreen() {
  const { updateUser, completeOnboarding } = useAppContext();
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleFinish = () => {
    if (address.trim().length > 0) {
      updateUser({ address: address.trim(), instructions: instructions.trim() });
      completeOnboarding();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <View style={styles.topArea}>
          <Text style={styles.title}>Where to drop it?</Text>
          
          <View style={styles.trustBadge}>
            <BellOff color="#34C759" size={20} />
            <View style={styles.trustTexts}>
              <Text style={styles.trustTitle}>Bell nahi bajayega</Text>
              <Text style={styles.trustSub}>100% silent delivery by 6:00 AM. Your neighbors (and dogs) won't wake up.</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Complete Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="House No, Society, Sector..."
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={3}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Delivery Instructions (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., Hang it on the door handle"
              placeholderTextColor="#8E8E93"
              value={instructions}
              onChangeText={setInstructions}
            />
          </View>
        </View>

        <BouncyButton 
          style={[styles.nextBtn, address.trim().length === 0 && styles.nextBtnDisabled]} 
          onPress={handleFinish}
          disabled={address.trim().length === 0}
        >
          <Text style={styles.nextText}>Unlock My App</Text>
          <CheckCircle2 color="#FFF" size={20} />
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
  topArea: {
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  trustBadge: {
    flexDirection: 'row',
    backgroundColor: '#F2FFF5',
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  trustTexts: {
    marginLeft: 12,
    flex: 1,
  },
  trustTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#34C759',
    marginBottom: 4,
  },
  trustSub: {
    fontSize: 13,
    color: '#4A4A4A',
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: 60,
    borderRadius: 30, // Zepto pill shape
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  nextBtnDisabled: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 8,
  }
});
