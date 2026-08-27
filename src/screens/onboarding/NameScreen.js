import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react-native';
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
          <Text style={styles.subtitle}>We'll personalize your daily drops.</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#8E8E93"
            value={name}
            onChangeText={setName}
            autoFocus
          />

          {name.trim().length > 0 && (
            <View style={styles.identityHook}>
              <Text style={styles.identityText}>
                {name.trim().toUpperCase()} KA 6AM STACK
              </Text>
              <Text style={styles.identitySub}>Sounds like a plan.</Text>
            </View>
          )}
        </View>

        <BouncyButton 
          style={[styles.nextBtn, name.trim().length === 0 && styles.nextBtnDisabled]} 
          onPress={handleNext}
          disabled={name.trim().length === 0}
        >
          <Text style={styles.nextText}>Next</Text>
          <ArrowRight color="#FFF" size={20} />
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
    color: '#000',
    letterSpacing: 2,
    marginBottom: 24,
  },
  topArea: {
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
    marginBottom: 40,
  },
  input: {
    fontSize: 24,
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingVertical: 12,
    color: '#000',
  },
  identityHook: {
    marginTop: 40,
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  identityText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1,
  },
  identitySub: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
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
