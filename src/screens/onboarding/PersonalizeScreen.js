import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import ZingLogo from '../../components/ZingLogo';
import BottomDock from '../../components/BottomDock';
import BouncyButton from '../../components/BouncyButton';

export default function PersonalizeScreen({ navigation }) {
  const { user, updateUser } = useAppContext();
  const [name, setName] = useState(user?.name || 'ARJUN');

  const handleNext = () => {
    if (name.trim().length > 0) {
      updateUser({ name: name.trim().toUpperCase() });
      navigation.navigate('Address');
    }
  };

  const displayName = name.trim().toUpperCase() || 'ARJUN';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollArea}>
          {/* Top Logo: Zing */}
          <View style={styles.topLogoRow}>
            <ZingLogo size={28} />
          </View>

          {/* Heading */}
          <Text style={styles.title}>PERSONALIZE{'\n'}YOUR STACK</Text>

          {/* Dynamic 3D Matte Pouch Visual (Exact Mockup Match) */}
          <View style={styles.pouchWrapper}>
            <View style={styles.mattePouch}>
              <View style={styles.pouchZipLine} />
              <Text style={styles.pouchBolt}>⚡</Text>
              <Text style={styles.pouchBrand}>zing</Text>
              
              <Text style={styles.pouchSmallBolt}>⚡</Text>
              <Text style={styles.pouchCustomName}>{displayName}</Text>
            </View>
          </View>

          {/* Print Name Input Container (Exact Mockup Match) */}
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Print Name</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={(text) => setName(text.toUpperCase())}
                placeholder="ARJUN"
                placeholderTextColor="#A1A1AA"
                maxLength={10}
                autoCapitalize="characters"
              />
            </View>
            <Text style={styles.inputHelper}>Max 10 characters.</Text>
          </View>

          {/* Action Button: CONFIRM & SAVE */}
          <View style={styles.glowButtonWrapper}>
            <BouncyButton 
              style={[styles.confirmBtn, name.trim().length === 0 && styles.btnDisabled]} 
              onPress={handleNext}
              disabled={name.trim().length === 0}
            >
              <Text style={styles.confirmBtnText}>CONFIRM & SAVE</Text>
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
    marginBottom: 20,
    lineHeight: 32,
  },
  pouchWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  mattePouch: {
    width: 200,
    height: 250,
    backgroundColor: '#161618',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#2C2C2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#D4FF00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
  },
  pouchZipLine: {
    position: 'absolute',
    top: 22,
    left: 18,
    right: 18,
    height: 2.5,
    backgroundColor: '#2C2C2E',
  },
  pouchBolt: {
    fontSize: 28,
    color: '#D4FF00',
    marginBottom: 2,
  },
  pouchBrand: {
    fontSize: 32,
    fontWeight: '900',
    color: '#3A3A3C',
    letterSpacing: -1,
    marginBottom: 16,
  },
  pouchSmallBolt: {
    fontSize: 18,
    color: '#D4FF00',
    marginBottom: 2,
  },
  pouchCustomName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#D4FF00',
    letterSpacing: 1.5,
  },
  inputSection: {
    marginTop: 18,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  inputLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '600',
    marginBottom: 2,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    padding: 0,
  },
  inputHelper: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 6,
    marginLeft: 4,
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
  confirmBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  btnDisabled: {
    backgroundColor: '#8E8E93',
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
