import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';
import BottomDock from '../components/BottomDock';
import { Colors } from '../theme/colors';

export default function WalletTransactionsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Row */}
        <View style={styles.topHeaderRow}>
          <ZingLogo size={28} />

          <View style={styles.floatingWalletCard}>
            <Text style={styles.walletAmount}>₹2,450</Text>
            <Text style={styles.walletLabel}>Total Wallet Balance</Text>
          </View>
        </View>

        {/* Heading */}
        <Text style={styles.headingTitle}>ZING WALLET</Text>
        <Text style={styles.subHeading}>Recent Transactions</Text>

        <View style={styles.transactionsList}>
          {/* Transaction 1 */}
          <View style={styles.transactionCard}>
            <View style={styles.txLeft}>
              <Text style={styles.txDate}>Today, 2:49 PM</Text>
              <Text style={styles.txTitle}>Subscription Payment -</Text>
              <Text style={styles.txTitle}>Daily 6 AM Fuel</Text>
            </View>
            <View style={styles.txRight}>
              <Text style={styles.txAmountNegative}>- ₹1,499</Text>
              <ArrowDown color="#FF3B30" size={16} style={styles.txIcon} />
            </View>
          </View>

          {/* Transaction 2 */}
          <View style={styles.transactionCard}>
            <View style={styles.txLeft}>
              <Text style={styles.txDate}>Aug 25, 10:15 AM</Text>
              <Text style={styles.txTitle}>Wallet Top-up - HDFC</Text>
              <Text style={styles.txTitle}>Card 1234</Text>
            </View>
            <View style={styles.txRight}>
              <Text style={styles.txAmountPositive}>+ ₹2,000</Text>
              <ArrowUp color={Colors.yellow} size={16} style={styles.txIcon} />
            </View>
          </View>

          {/* Transaction 3 */}
          <View style={styles.transactionCard}>
            <View style={styles.txLeft}>
              <Text style={styles.txDate}>Aug 20, 9:00 AM</Text>
              <Text style={styles.txTitle}>Subscription Payment -</Text>
              <Text style={styles.txTitle}>Daily 6 AM Fuel</Text>
            </View>
            <View style={styles.txRight}>
              <Text style={styles.txAmountNegative}>- ₹1,499</Text>
              <ArrowDown color="#FF3B30" size={16} style={styles.txIcon} />
            </View>
          </View>
        </View>

        {/* Action Button: TOP UP */}
        <BouncyButton style={styles.topUpBtn}>
          <Text style={styles.topUpBtnText}>TOP UP WALLET</Text>
        </BouncyButton>

        <TouchableOpacity style={styles.viewAllLink}>
          <Text style={styles.viewAllText}>View All Transactions</Text>
        </TouchableOpacity>

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
    marginBottom: 20,
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
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717A',
    marginBottom: 12,
  },
  transactionsList: {
    gap: 12,
    marginBottom: 24,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  txLeft: {
    flex: 1,
    paddingRight: 10,
  },
  txDate: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717A',
    marginBottom: 6,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    lineHeight: 20,
  },
  txRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  txAmountNegative: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111111',
  },
  txAmountPositive: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.yellow,
    textShadowColor: 'rgba(212, 255, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  txIcon: {
    marginTop: 4,
  },
  topUpBtn: {
    backgroundColor: '#333333',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  topUpBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  viewAllLink: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717A',
    textDecorationLine: 'underline',
  },
  floatingDock: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  }
});
