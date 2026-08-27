import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell } from 'lucide-react-native';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../theme/colors';

export default function SubscriptionConfirmedScreen({ navigation }) {
  const { user } = useAppContext();

  const userName = (user?.name || 'ARJUN').toUpperCase();
  const userAddress = user?.address || "Near Gold's Gym, Andheri West";

  const handleShareReferral = async () => {
    try {
      await Share.share({
        message: `Bro, join the 6 AM Zing Club! Get your custom morning nutrition stack delivered silently to your door by 6 AM. Use code ${userName}10 for 10% off: https://zing.fit/invite/${userName}10`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Logo: Zing */}
        <View style={styles.topLogoRow}>
          <ZingLogo size={28} />
        </View>

        {/* Heading */}
        <Text style={styles.title}>SUBSCRIPTION{'\n'}CONFIRMED!</Text>

        {/* 3D Matte Pouch Graphic with dynamic user name */}
        <View style={styles.pouchWrapper}>
          <View style={styles.mattePouch}>
            <View style={styles.pouchZipLine} />
            <Text style={styles.pouchBolt}>⚡</Text>
            <Text style={styles.pouchBrand}>zing</Text>
            <Text style={styles.pouchSmallBolt}>⚡</Text>
            <Text style={styles.pouchCustomName}>{userName}</Text>
          </View>
        </View>

        {/* Dynamic Confirmation Text */}
        <Text style={styles.activeNotice}>
          Your daily morning fuel, <Text style={styles.boldText}>'{userName} KA DAILY STACK'</Text>, is now active. First drop: Tomorrow, 5:45 AM.
        </Text>

        {/* Plan & Address Details Card (Exact Mockup Match) */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plan: </Text>
            <Text style={styles.detailValue}>7 Days | Daily 6 AM Fuel</Text>
          </Text>

          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery: </Text>
            <Text style={styles.detailValue}>{user?.name || 'Arjun Singh'}, {userAddress}</Text>
          </Text>

          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment: </Text>
            <Text style={styles.detailValue}>₹1,499 / week</Text>
          </Text>
        </View>

        {/* Action Button: VIEW MY STREAK */}
        <View style={styles.buttonShadowWrapper}>
          <BouncyButton 
            style={styles.viewStreakBtn} 
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.viewStreakText}>VIEW MY STREAK</Text>
          </BouncyButton>
        </View>

        {/* Referral Box (Exact Mockup Match) */}
        <View style={styles.referralCard}>
          <Dumbbell color="#111111" size={24} style={styles.gymIcon} />
          <Text style={styles.referralText}>
            "Fuel together! Refer a Gym Bro and get 10% off."
          </Text>
          <TouchableOpacity 
            style={styles.sharePillBtn} 
            onPress={handleShareReferral}
            activeOpacity={0.85}
          >
            <Text style={styles.sharePillText}>Share</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 30,
    alignItems: 'center',
  },
  topLogoRow: {
    alignSelf: 'flex-start',
    marginTop: 6,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  pouchWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  mattePouch: {
    width: 170,
    height: 210,
    backgroundColor: '#161618',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#2C2C2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    shadowColor: '#D4FF00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  pouchZipLine: {
    position: 'absolute',
    top: 18,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: '#2C2C2E',
  },
  pouchBolt: {
    fontSize: 24,
    color: '#D4FF00',
    marginBottom: 2,
  },
  pouchBrand: {
    fontSize: 26,
    fontWeight: '900',
    color: '#3A3A3C',
    letterSpacing: -1,
    marginBottom: 12,
  },
  pouchSmallBolt: {
    fontSize: 16,
    color: '#D4FF00',
    marginBottom: 2,
  },
  pouchCustomName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#D4FF00',
    letterSpacing: 1.5,
  },
  activeNotice: {
    fontSize: 13,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 18,
    marginVertical: 14,
    maxWidth: 320,
  },
  boldText: {
    fontWeight: '800',
    color: '#111111',
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 20,
    gap: 8,
  },
  detailRow: {
    fontSize: 13,
    lineHeight: 18,
  },
  detailLabel: {
    fontWeight: '700',
    color: '#71717A',
  },
  detailValue: {
    fontWeight: '800',
    color: '#111111',
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
  viewStreakBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  viewStreakText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  referralCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  gymIcon: {
    marginRight: 10,
  },
  referralText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#111111',
    lineHeight: 16,
  },
  sharePillBtn: {
    backgroundColor: '#D4FF00',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 8,
  },
  sharePillText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#111111',
  },
});
