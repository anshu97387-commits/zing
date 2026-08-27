import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ZingLogo from '../../components/ZingLogo';
import BottomDock from '../../components/BottomDock';
import BouncyButton from '../../components/BouncyButton';
import { Colors } from '../../theme/colors';

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Top Logo: Zing */}
        <View style={styles.topLogoRow}>
          <ZingLogo size={28} />
        </View>

        {/* Center Visual: Matte Pouch + Stainless Shaker Bottle */}
        <View style={styles.visualContainer}>
          <View style={styles.mattePouch}>
            <View style={styles.pouchZipLine} />
            <Text style={styles.pouchBolt}>⚡</Text>
            <Text style={styles.pouchBrand}>zing</Text>
            <Text style={styles.pouchSubtitle}>DELIVERING MORNING FUEL</Text>
          </View>

          <View style={styles.shakerBottle}>
            <View style={styles.shakerCap} />
            <View style={styles.shakerBody}>
              <Text style={styles.shakerBrand}>zing</Text>
            </View>
          </View>
        </View>

        {/* Hero Copy */}
        <View style={styles.heroTextSection}>
          <Text style={styles.headline}>FUEL YOUR AMBITION.</Text>
          <Text style={styles.subheadline}>
            Your daily personalized nutrition stack, delivered fresh every morning.
          </Text>

          {/* Action Button: GET STARTED */}
          <View style={styles.buttonShadowWrapper}>
            <BouncyButton 
              style={styles.getStartedBtn} 
              onPress={() => navigation.navigate('PhoneAuth')}
            >
              <Text style={styles.getStartedText}>GET STARTED</Text>
            </BouncyButton>
          </View>

          {/* Secondary Link: Already have an account? Log In */}
          <TouchableOpacity 
            style={styles.loginLinkWrap} 
            onPress={() => navigation.navigate('PhoneAuth')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginLinkBold}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Dock: ⚡ Order New Stack */}
        <BottomDock onPress={() => navigation.navigate('PhoneAuth')} />

      </View>
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
  topLogoRow: {
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  visualContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 220,
    marginVertical: 10,
  },
  mattePouch: {
    width: 150,
    height: 190,
    backgroundColor: '#161618',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#2C2C2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    transform: [{ rotate: '-4deg' }],
  },
  pouchZipLine: {
    position: 'absolute',
    top: 18,
    left: 14,
    right: 14,
    height: 2,
    backgroundColor: '#2C2C2E',
  },
  pouchBolt: {
    fontSize: 26,
    color: '#D4FF00',
    marginBottom: 4,
  },
  pouchBrand: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  pouchSubtitle: {
    fontSize: 7,
    fontWeight: '800',
    color: '#8E8E93',
    letterSpacing: 0.8,
    marginTop: 18,
  },
  shakerBottle: {
    width: 65,
    height: 140,
    marginLeft: -15,
    marginBottom: 4,
    alignItems: 'center',
  },
  shakerCap: {
    width: 48,
    height: 32,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  shakerBody: {
    width: 58,
    height: 110,
    backgroundColor: '#D1D5DB',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9CA3AF',
  },
  shakerBrand: {
    fontSize: 13,
    fontWeight: '900',
    color: '#111111',
    transform: [{ rotate: '-90deg' }],
    letterSpacing: 1,
  },
  heroTextSection: {
    alignItems: 'center',
    width: '100%',
  },
  headline: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 8,
  },
  subheadline: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 290,
    marginBottom: 24,
  },
  buttonShadowWrapper: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 16,
  },
  getStartedBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  loginLinkWrap: {
    paddingVertical: 6,
  },
  loginLinkText: {
    fontSize: 13,
    color: '#71717A',
  },
  loginLinkBold: {
    color: '#111111',
    fontWeight: '800',
  },
});
