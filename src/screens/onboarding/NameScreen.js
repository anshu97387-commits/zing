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
            <Text style={styles.logoText}>Zing</Text>
            <View style={styles.logoDot} />
          </View>

          <Text style={styles.title}>FUEL YOUR AMBITION.</Text>
          <Text style={styles.subtitle}>
            You can keep your routine intact and start early every morning.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="What's your name? (e.g. Arjun)"
              placeholderTextColor="#A1A1AA"
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>

          {name.trim().length > 0 && (
            <View style={styles.identityCard}>
              <Text style={styles.identityTag}>DAILY 6 AM PACKET</Text>
              <Text style={styles.identityName}>{name.trim().toUpperCase()}'S STACK</Text>
              <Text style={styles.identitySub}>100% Genuine Raw Whey • Zero Spoilage</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomArea}>
          <View style={styles.glowButtonWrapper}>
            <BouncyButton 
              style={[styles.startBtn, name.trim().length === 0 && styles.startBtnDisabled]} 
              onPress={handleNext}
              disabled={name.trim().length === 0}
            >
              <Text style={styles.startBtnText}>Get Started</Text>
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
  topArea: {
    marginTop: 10,
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
    fontSize: 32,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 32,
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
  textInput: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },
  identityCard: {
    marginTop: 24,
    backgroundColor: '#FFFDF5',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.yellow,
  },
  identityTag: {
    fontSize: 10,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 1,
    marginBottom: 4,
  },
  identityName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111111',
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
  glowButtonWrapper: {
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 8,
  },
  startBtn: {
    backgroundColor: '#1C1C1E',
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnDisabled: {
    backgroundColor: '#C7C7CC',
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
