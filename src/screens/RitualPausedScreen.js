import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';
import BottomDock from '../components/BottomDock';
import { Colors } from '../theme/colors';

export default function RitualPausedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Row */}
        <View style={styles.topHeaderRow}>
          <ZingLogo size={28} />

          <View style={styles.floatingWalletCard}>
            <Text style={styles.walletAmount}>₹1,301</Text>
            <Text style={styles.walletLabel}>Total Wallet Balance</Text>
          </View>
        </View>

        {/* Heading */}
        <Text style={styles.headingTitle}>RITUAL PAUSED</Text>

        {/* Selected Plan Details */}
        <View style={styles.planCard}>
          <Text style={styles.planTitle}>Flexi 5-Day Pack</Text>
          <Text style={styles.planSub}>Standard Mix | Delivered by 6 AM</Text>
        </View>

        <Text style={styles.mainInfo}>Your ritual is taking a break.</Text>

        <Text style={styles.subInfo}>Paused until: Mon, Sep 4 (Next Drop)</Text>

        {/* Action Button: RESUME */}
        <BouncyButton style={styles.resumeBtn} onPress={() => navigation.navigate('MyRitual')}>
          <Text style={styles.resumeBtnText}>RESUME RITUAL</Text>
        </BouncyButton>

      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.floatingDock}>
        <BottomDock label="Order Now Stack" onPress={() => {}} />
      </View>
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
    paddingBottom: 120, // space for dock
  },
  topHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  floatingWalletCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.75,
    shadowRadius: 14,
    elevation: 6,
    alignItems: 'center',
    minWidth: 140,
  },
  walletAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  walletLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#71717A',
    marginTop: 2,
  },
  headingTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 24,
  },
  planTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 4,
  },
  planSub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
  },
  mainInfo: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    lineHeight: 30,
    marginBottom: 16,
    paddingRight: 20,
  },
  subInfo: {
    fontSize: 15,
    color: '#111111',
    marginBottom: 30,
  },
  resumeBtn: {
    backgroundColor: '#333333',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  resumeBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  floatingDock: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  }
});
