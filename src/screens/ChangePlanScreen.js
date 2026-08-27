import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';
import BottomDock from '../components/BottomDock';
import { Colors } from '../theme/colors';

export default function ChangePlanScreen({ navigation }) {
  
  const handleSelectPlan = (planName, price) => {
    navigation.navigate('ConfirmPlan', { planName, price });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Row */}
        <View style={styles.topHeaderRow}>
          <ZingLogo size={28} />

          <View style={styles.floatingWalletCard}>
            <Text style={styles.walletAmount}>₹2,450</Text>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
          </View>
        </View>

        {/* Heading */}
        <Text style={styles.headingTitle}>CHANGE PLAN</Text>

        {/* Active Plan */}
        <View style={styles.activePlanCard}>
          <Text style={styles.activePlanTitle}>Daily 6 AM Fuel</Text>
          <Text style={styles.activePlanStatus}>Active</Text>
        </View>

        <Text style={styles.subHeading}>Available Plans</Text>

        {/* Plans List */}
        <View style={styles.plansList}>
          
          {/* Plan 1 */}
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>Daily 7 AM Fuel</Text>
            <Text style={styles.planSub}>Standard Mix | Delivered by 7 AM</Text>
            <View style={styles.planFooterRow}>
              <Text style={styles.planPrice}>₹1,399 / week</Text>
              <BouncyButton style={styles.selectBtn} onPress={() => handleSelectPlan('Daily 7 AM Fuel', '1,399')}>
                <Text style={styles.selectBtnText}>SELECT</Text>
              </BouncyButton>
            </View>
          </View>

          {/* Plan 2 */}
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>Flexi 5-Day Pack</Text>
            <Text style={styles.planSub}>Standard Mix | Delivered by 6 AM</Text>
            <View style={styles.planFooterRow}>
              <Text style={styles.planPrice}>₹1,149 / week</Text>
              <BouncyButton style={styles.selectBtn} onPress={() => handleSelectPlan('Flexi 5-Day Pack', '1,149')}>
                <Text style={styles.selectBtnText}>SELECT</Text>
              </BouncyButton>
            </View>
          </View>

          {/* Plan 3 */}
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>Every Other Day</Text>
            <Text style={styles.planSub}>Standard Mix | Delivered by 6 AM</Text>
            <View style={styles.planFooterRow}>
              <Text style={styles.planPrice}>₹899 / week</Text>
              <BouncyButton style={styles.selectBtn} onPress={() => handleSelectPlan('Every Other Day', '899')}>
                <Text style={styles.selectBtnText}>SELECT</Text>
              </BouncyButton>
            </View>
          </View>

        </View>

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
    minWidth: 130,
  },
  walletAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  walletLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    marginTop: 1,
  },
  headingTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  activePlanCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    marginBottom: 24,
  },
  activePlanTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 4,
  },
  activePlanStatus: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.yellow,
    textShadowColor: 'rgba(212, 255, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717A',
    marginBottom: 12,
  },
  plansList: {
    gap: 16,
  },
  planCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  planTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 4,
  },
  planSub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
    marginBottom: 16,
  },
  planFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111111',
  },
  selectBtn: {
    backgroundColor: '#333333',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  selectBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  floatingDock: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  }
});
