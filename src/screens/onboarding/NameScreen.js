import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react-native';
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
          <Text style={styles.brandLogo}>ZING</Text>
          
          <Text style={styles.title}>What should we call you?</Text>
          <Text style={styles.subtitle}>We'll personalize your daily vacuum sealed morning fuel drops.</Text>
          
          <View style={styles.glassInputCard}>
            <TextInput
              style={styles.input}
              placeholder="e.g. Arjun"
              placeholderTextColor="#A1A1AA"
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>

          {name.trim().length > 0 && (
            <View style={styles.identityHookGlass}>
              <View style={styles.sparkleRow}>
                <Sparkles color="#111111" size={14} fill="#FFC800" />
                <Text style={styles.identityTag}>YOUR PERSONAL MORNING STACK</Text>
              </View>
              <Text style={styles.identityText}>
                {name.trim().toUpperCase()}'S 6AM STACK
              </Text>
              <Text style={styles.identitySub}>Custom formulated • Delivered silently at 6:00 AM</Text>
            </View>
          )}
        </View>

        <BouncyButton 
          style={[styles.nextBtn, name.trim().length === 0 && styles.nextBtnDisabled]} 
          onPress={handleNext}
          disabled={name.trim().length === 0}
        >
          <Text style={styles.nextText}>Continue</Text>
          <ArrowRight color="#111111" size={20} />
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
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 22,
  },
  glassInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    fontSize: 22,
    fontWeight: '800',
    paddingVertical: 12,
    color: '#111111',
  },
  identityHookGlass: {
    marginTop: 28,
    backgroundColor: '#FFFDF5',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FFC800',
    shadowColor: '#FFC800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  identityTag: {
    fontSize: 10,
    fontWeight: '900',
    color: '#111111',
    marginLeft: 4,
    letterSpacing: 0.8,
  },
  identityText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
  },
  identitySub: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 4,
    fontWeight: '600',
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
