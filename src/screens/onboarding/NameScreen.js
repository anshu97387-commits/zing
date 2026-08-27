import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { Colors } from '../../theme/colors';
import BouncyButton from '../../components/BouncyButton';

export default function NameScreen({ navigation }) {
  const { updateUser } = useAppContext();
  const [name, setName] = useState('');

  const handleNext = () => {
    if (name.trim().length > 0) {
      updateUser({ name: name.trim() });
      navigation.navigate('Goal');
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

          <Text style={styles.title}>FUEL YOUR AMBITION.</Text>
          <Text style={styles.subtitle}>
            Keep your nutrition routine intact with daily 6:00 AM vacuum sealed doorstep drops.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="What's your name? (e.g. Arjun)"
              placeholderTextColor="#71717A"
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>

          {name.trim().length > 0 && (
            <View style={styles.identityCard}>
              <Text style={styles.identityTag}>DAILY 6 AM PACKET</Text>
              <Text style={styles.identityName}>{name.trim().toUpperCase()}'S STACK</Text>
              <Text style={styles.identitySub}>100% Genuine • Zero Cooking • Delivered at 6 AM</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomArea}>
          <BouncyButton 
            style={[styles.startBtn, name.trim().length === 0 && styles.startBtnDisabled]} 
            onPress={handleNext}
            disabled={name.trim().length === 0}
          >
            <Text style={styles.startBtnText}>Get Started</Text>
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
  topArea: {
    marginTop: 10,
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
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 28,
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
  textInput: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  identityCard: {
    marginTop: 24,
    backgroundColor: '#141416',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.neon,
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  identityTag: {
    fontSize: 10,
    fontWeight: '900',
    color: Colors.neon,
    letterSpacing: 1,
    marginBottom: 4,
  },
  identityName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  identitySub: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  bottomArea: {
    paddingBottom: 16,
  },
  startBtn: {
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
  startBtnDisabled: {
    borderColor: '#3F3F46',
    backgroundColor: '#121214',
    shadowOpacity: 0,
  },
  startBtnText: {
    color: Colors.neon,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
