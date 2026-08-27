import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import ZingLogo from '../components/ZingLogo';
import BottomDock from '../components/BottomDock';
import { Colors } from '../theme/colors';

export default function PaymentSuccessScreen({ route, navigation }) {
  const planPrice = route.params?.price || '1,149';
  const planName = route.params?.planName || 'Flexi 5-Day Pack';

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Row */}
      <View style={styles.topHeaderRow}>
        <ZingLogo size={28} />
        <View style={styles.floatingWalletCard}>
          <Text style={styles.walletAmount}>₹1,301</Text>
          <Text style={styles.walletLabel}>Total Wallet Balance</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconCircleOuter}>
          <View style={styles.iconCircleInner}>
            <Check color="#111111" size={48} strokeWidth={4} />
          </View>
        </View>

        <Text style={styles.title}>Payment Successful!</Text>
        
        <Text style={styles.subtitle}>
          You have successfully paid ₹{planPrice} for the {planName}.
        </Text>

        <Text style={styles.balanceText}>
          Your new total balance is ₹1,301
        </Text>

        <Text style={styles.txIdText}>
          Transaction ID: ZING8172645
        </Text>
      </View>

      {/* Floating Action Button */}
      <View style={styles.floatingDock}>
        <BottomDock label="Order Now Stack" onPress={() => navigation.navigate('MyRitual')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 10,
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  iconCircleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(212, 255, 0, 0.2)', // Light yellow transparent
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  iconCircleInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 20,
  },
  txIdText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  floatingDock: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  }
});
