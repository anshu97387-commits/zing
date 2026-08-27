import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Lock } from 'lucide-react-native';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';
import BottomDock from '../components/BottomDock';
import { Colors } from '../theme/colors';

export default function MyRitualScreen({ navigation }) {
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
        <Text style={styles.headingTitle}>MY RITUAL</Text>

        {/* Selected Plan Details */}
        <View style={styles.planCard}>
          <Text style={styles.planTitle}>Flexi 5-Day Pack</Text>
          <Text style={styles.planSub}>Standard Mix | Delivered by 6 AM</Text>
          <Text style={styles.planStatus}>3 / 5 Days Left</Text>
        </View>

        <Text style={styles.sectionHeading}>Your 5-Day Streak</Text>

        {/* Streak Row */}
        <View style={styles.streakRow}>
          {/* Day 1 - Done */}
          <View style={styles.streakDay}>
            <View style={styles.streakCircleDone}>
              <Check color="#111111" size={16} strokeWidth={3} />
            </View>
            <Text style={styles.streakDayLabel}>Mon</Text>
          </View>
          
          {/* Day 2 - Done */}
          <View style={styles.streakDay}>
            <View style={styles.streakCircleDone}>
              <Check color="#111111" size={16} strokeWidth={3} />
            </View>
            <Text style={styles.streakDayLabel}>Tue</Text>
          </View>

          {/* Day 3 - Current */}
          <View style={styles.streakDay}>
            <View style={styles.streakCircleCurrentOuter}>
              <View style={styles.streakCircleCurrentInner} />
            </View>
            <Text style={styles.streakDayLabel}>Wed</Text>
          </View>

          {/* Day 4 - Locked */}
          <View style={styles.streakDay}>
            <View style={styles.streakCircleLocked}>
              <Lock color="#A1A1AA" size={16} strokeWidth={2.5} />
            </View>
            <Text style={styles.streakDayLabelLocked}>Thu</Text>
          </View>

          {/* Day 5 - Locked */}
          <View style={styles.streakDay}>
            <View style={styles.streakCircleLocked}>
              <Lock color="#A1A1AA" size={16} strokeWidth={2.5} />
            </View>
            <Text style={styles.streakDayLabelLocked}>Fri</Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>Order Details</Text>
        
        <View style={styles.orderCard}>
          <Text style={styles.orderLabel}>Order ID</Text>
          <Text style={styles.orderId}>ZING8172645</Text>
          <Text style={styles.orderStatus}>Active</Text>
        </View>

        {/* Action Button: PAUSE */}
        <BouncyButton style={styles.pauseBtn} onPress={() => navigation.navigate('ConfirmPause')}>
          <Text style={styles.pauseBtnText}>PAUSE & RESUME RITUAL</Text>
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
    marginBottom: 30,
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
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
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
    marginBottom: 10,
  },
  planStatus: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.yellow,
    textShadowColor: 'rgba(212, 255, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 16,
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  streakDay: {
    alignItems: 'center',
  },
  streakCircleDone: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  streakCircleCurrentOuter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 255, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  streakCircleCurrentInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.yellow,
    backgroundColor: '#FFFFFF',
  },
  streakCircleLocked: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 10,
  },
  streakDayLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },
  streakDayLabelLocked: {
    fontSize: 13,
    fontWeight: '600',
    color: '#A1A1AA',
  },
  orderCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 24,
  },
  orderLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.yellow,
  },
  pauseBtn: {
    backgroundColor: '#333333',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  pauseBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  floatingDock: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  }
});
