import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';
import BottomDock from '../components/BottomDock';
import { Colors } from '../theme/colors';

export default function ConfirmPlanScreen({ route, navigation }) {
  // Use passed params or fallback
  const planName = route.params?.planName || 'Flexi 5-Day Pack';
  const planPrice = route.params?.price || '1,149';
  const [selectedUpi, setSelectedUpi] = useState(null);

  const handleConfirm = () => {
    navigation.navigate('PaymentSuccess', { planName, price: planPrice });
  };

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
        <Text style={styles.headingTitle}>CONFIRM PLAN</Text>

        {/* Selected Plan Details */}
        <View style={styles.planCard}>
          <Text style={styles.planTitle}>{planName}</Text>
          <Text style={styles.planSub}>Standard Mix | Delivered by 6 AM</Text>
          <Text style={styles.planPrice}>₹{planPrice} / week</Text>
        </View>

        <Text style={styles.sectionHeading}>First Delivery</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoMain}>Monday, Aug 28</Text>
          <Text style={styles.infoSub}>6:00 AM</Text>
          <View style={styles.addressRow}>
            <Text style={styles.addressText} numberOfLines={1}>Arjun Singh, Near Gold's Gym...</Text>
            <TouchableOpacity><Text style={styles.editText}>Edit</Text></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionHeading}>PAYMENT</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoSub}>Payment Method</Text>
          <View style={styles.addressRow}>
            <View style={styles.cardInfo}>
              <View style={styles.hdfcBadge}>
                <Text style={styles.hdfcText}>HDFC</Text>
              </View>
              <Text style={styles.infoMain}>•••• 1234</Text>
            </View>
            <TouchableOpacity><Text style={styles.editText}>Change</Text></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionHeadingSmall}>NEW UPI PAYMENT OPTIONS</Text>
        <Text style={styles.upiHeading}>Pay with UPI</Text>

        <View style={styles.upiGrid}>
          {/* Google Pay */}
          <TouchableOpacity 
            style={[styles.upiCard, selectedUpi === 'gpay' && styles.upiCardActive]}
            onPress={() => setSelectedUpi('gpay')}
          >
            <Text style={styles.upiIcon}>G</Text>
            <Text style={styles.upiName}>Google Pay</Text>
          </TouchableOpacity>
          {/* PhonePe */}
          <TouchableOpacity 
            style={[styles.upiCard, selectedUpi === 'phonepe' && styles.upiCardActive]}
            onPress={() => setSelectedUpi('phonepe')}
          >
            <Text style={styles.upiIcon}>P</Text>
            <Text style={styles.upiName}>PhonePe</Text>
          </TouchableOpacity>
          {/* Paytm */}
          <TouchableOpacity 
            style={[styles.upiCard, selectedUpi === 'paytm' && styles.upiCardActive]}
            onPress={() => setSelectedUpi('paytm')}
          >
            <Text style={styles.upiIcon}>Paytm</Text>
            <Text style={styles.upiName}>Paytm</Text>
          </TouchableOpacity>
          {/* BHIM */}
          <TouchableOpacity 
            style={[styles.upiCard, selectedUpi === 'bhim' && styles.upiCardActive]}
            onPress={() => setSelectedUpi('bhim')}
          >
            <Text style={styles.upiIcon}>BHIM</Text>
            <Text style={styles.upiName}>BHIM UPI</Text>
          </TouchableOpacity>
        </View>

        {/* Action Button: CONFIRM & PAY */}
        <BouncyButton style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmBtnText}>CONFIRM & PAY ₹{planPrice}</Text>
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
  planCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 20,
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
    marginBottom: 12,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111111',
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#71717A',
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 20,
  },
  infoMain: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 4,
  },
  infoSub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
    marginRight: 10,
  },
  editText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
    textDecorationLine: 'underline',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hdfcBadge: {
    backgroundColor: '#004B8D',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  hdfcText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  sectionHeadingSmall: {
    fontSize: 12,
    fontWeight: '700',
    color: '#71717A',
    marginTop: 10,
    marginBottom: 6,
  },
  upiHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 12,
  },
  upiGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  upiCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  upiCardActive: {
    borderColor: '#111111',
    backgroundColor: '#F8F9FA',
  },
  upiIcon: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 6,
  },
  upiName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
  confirmBtn: {
    backgroundColor: '#333333',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  confirmBtnText: {
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
