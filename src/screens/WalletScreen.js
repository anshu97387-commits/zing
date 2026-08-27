import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Flame, X, CheckCircle2, ArrowRight } from 'lucide-react-native';
import BouncyButton from '../components/BouncyButton';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../theme/colors';
import { supabaseService } from '../lib/supabaseService';

export default function WalletScreen() {
  const { user, updateUser } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState('7day');
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');

  const planAmount = selectedPlan === '7day' ? 1393 : 5370;

  const handleStartPayment = () => {
    setShowCheckout(true);
  };

  const handleConfirmUpi = () => {
    setPaymentProcessing(true);

    const upiUrl = `upi://pay?pa=zing@okaxis&pn=Zing&am=${planAmount}&cu=INR&tn=Zing%206AM%20Pass`;
    Linking.canOpenURL(upiUrl).then(supported => {
      if (supported) {
        Linking.openURL(upiUrl).catch(() => {});
      }
    });

    setTimeout(async () => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      const planName = selectedPlan === '7day' ? '7 Days | Daily 6 AM Fuel' : '30 Days | Pro Pass';
      updateUser({
        activePlan: planName,
        planExpiry: selectedPlan === '7day' ? '8 Days Left' : '30 Days Left',
      });
      await supabaseService.saveUserProfile({
        ...user,
        active_plan: selectedPlan,
        plan_amount: planAmount,
      });
    }, 1800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Brand: Zing */}
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>Zing</Text>
          <View style={styles.logoDot} />
        </View>

        <Text style={styles.headerTitle}>HABIT PASSES</Text>
        <Text style={styles.headerSub}>
          Zero cooking, zero measuring. Fresh vacuum sealed dry pouch delivered daily at 6:00 AM.
        </Text>

        {/* Active Plan Banner */}
        {user?.activePlan && (
          <View style={styles.activePlanBanner}>
            <CheckCircle2 color="#34C759" size={22} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.activePlanTitle}>{user.activePlan} (Active)</Text>
              <Text style={styles.activePlanSub}>Next Drop: Tomorrow, 6:00 AM sharp</Text>
            </View>
          </View>
        )}
        
        <View style={styles.plansContainer}>
          {/* 7 Day Plan */}
          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === '7day' && styles.planCardActive]}
            activeOpacity={0.9}
            onPress={() => setSelectedPlan('7day')}
          >
            {selectedPlan === '7day' && (
              <View style={styles.checkIcon}>
                <Check color="#000" size={14} strokeWidth={3} />
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>7-Day Habit Pass</Text>
              <View style={styles.popularBadge}>
                <Flame color="#000" size={12} fill="#000" />
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.planPrice}>₹1,393</Text>
              <Text style={styles.perDayText}>₹199 / day</Text>
            </View>
            <Text style={styles.planDesc}>Friction-free starter pass to build a consistent 6 AM nutrition routine.</Text>
            
            <View style={styles.highlightBox}>
              <Text style={styles.highlightText}>🔥 7-day streak unlocks your 8th day free.</Text>
            </View>

            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Custom grams dry stack pouch</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Delivered silently by 6:00 AM</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Vacation Mode pause anytime</Text>
            </View>
          </TouchableOpacity>

          {/* 30 Day Plan */}
          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === '30day' && styles.planCardActive]}
            activeOpacity={0.9}
            onPress={() => setSelectedPlan('30day')}
          >
            {selectedPlan === '30day' && (
              <View style={styles.checkIcon}>
                <Check color="#000" size={14} strokeWidth={3} />
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>30-Day Pro Member</Text>
              <View style={styles.proBadge}>
                <Text style={styles.proText}>VIP PRIORITY</Text>
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.planPrice}>₹5,370</Text>
              <Text style={styles.perDayText}>₹179 / day</Text>
            </View>
            <Text style={styles.planDesc}>Maximum savings for serious goals. Monday Drop priority included.</Text>
            
            <View style={styles.highlightBoxGold}>
              <Text style={styles.highlightTextGold}>⚡ Monday Drop VIP priority + Save ₹600 upfront</Text>
            </View>

            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>30 fresh daily deliveries included</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Free Zing Stainless Shaker Bottle</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Floating Bottom Pay Button with Yellow Glow */}
      <View style={styles.floatingBottomBar}>
        <View style={styles.glowButtonWrapper}>
          <BouncyButton style={styles.payButton} onPress={handleStartPayment}>
            <Text style={styles.payButtonText}>Pay ₹{planAmount.toLocaleString('en-IN')} via UPI</Text>
          </BouncyButton>
        </View>
      </View>

      {/* Razorpay UPI Modal */}
      <Modal visible={showCheckout} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {!paymentSuccess ? (
              <>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={styles.modalTitle}>Razorpay UPI Gateway</Text>
                    <Text style={styles.modalSub}>Paying ₹{planAmount.toLocaleString('en-IN')} to Zing Nutrition</Text>
                  </View>
                  <TouchableOpacity onPress={() => !paymentProcessing && setShowCheckout(false)}>
                    <X color="#000" size={24} />
                  </TouchableOpacity>
                </View>

                {paymentProcessing ? (
                  <View style={styles.processingContainer}>
                    <ActivityIndicator size="large" color="#111111" />
                    <Text style={styles.processingTitle}>Opening UPI App...</Text>
                    <Text style={styles.processingSub}>Approve payment of ₹{planAmount.toLocaleString('en-IN')}</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.upiHeader}>Select UPI App</Text>
                    <View style={styles.upiList}>
                      {[
                        { id: 'gpay', name: 'Google Pay', icon: '🔵' },
                        { id: 'phonepe', name: 'PhonePe UPI', icon: '🟣' },
                        { id: 'paytm', name: 'Paytm UPI', icon: '🔷' },
                        { id: 'bhim', name: 'BHIM / Any UPI ID', icon: '⚡' },
                      ].map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={[styles.upiRow, selectedUpiApp === item.id && styles.upiRowActive]}
                          onPress={() => setSelectedUpiApp(item.id)}
                        >
                          <Text style={styles.upiIcon}>{item.icon}</Text>
                          <Text style={styles.upiName}>{item.name}</Text>
                          <View style={[styles.radioCircle, selectedUpiApp === item.id && styles.radioCircleActive]}>
                            {selectedUpiApp === item.id && <View style={styles.radioDot} />}
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <View style={styles.glowButtonWrapper}>
                      <BouncyButton style={styles.confirmPayBtn} onPress={handleConfirmUpi}>
                        <Text style={styles.confirmPayText}>Pay Now ₹{planAmount.toLocaleString('en-IN')}</Text>
                      </BouncyButton>
                    </View>
                  </>
                )}
              </>
            ) : (
              <View style={styles.successContainer}>
                <View style={styles.successIconCircle}>
                  <Check color="#000" size={38} strokeWidth={3} />
                </View>
                <Text style={styles.successTitle}>Payment Successful! 🎉</Text>
                <Text style={styles.successSub}>
                  ₹{planAmount.toLocaleString('en-IN')} received. Your {selectedPlan === '7day' ? '7-Day Habit' : '30-Day Pro'} Pass is now active.
                </Text>
                <Text style={styles.successNote}>
                  Rider will drop your first vacuum packed stack tomorrow at 6:00 AM sharp.
                </Text>

                <View style={styles.glowButtonWrapper}>
                  <BouncyButton 
                    style={styles.doneBtn} 
                    onPress={() => {
                      setShowCheckout(false);
                      setPaymentSuccess(false);
                    }}
                  >
                    <Text style={styles.doneBtnText}>Back to Dashboard</Text>
                  </BouncyButton>
                </View>
              </View>
            )}

          </View>
        </View>
      </Modal>
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
    paddingTop: 12,
    paddingBottom: 110,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  logoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.yellow,
    marginLeft: 3,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
    marginBottom: 20,
    lineHeight: 18,
  },
  activePlanBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2FFF5',
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#34C759',
  },
  activePlanTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
  },
  activePlanSub: {
    fontSize: 12,
    color: '#34C759',
    marginTop: 2,
    fontWeight: '700',
  },
  plansContainer: {
    gap: 16,
    marginBottom: 32,
  },
  planCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  planCardActive: {
    borderColor: '#111111',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  checkIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 10,
  },
  popularText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000000',
    marginLeft: 3,
  },
  proBadge: {
    backgroundColor: '#111111',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 10,
  },
  proText: {
    fontSize: 9,
    fontWeight: '900',
    color: Colors.yellow,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
  },
  perDayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#71717A',
    marginLeft: 8,
  },
  planDesc: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 12,
    lineHeight: 18,
  },
  highlightBox: {
    backgroundColor: '#FFFDF5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.yellow,
  },
  highlightText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111111',
  },
  highlightBoxGold: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  highlightTextGold: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111111',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureBullet: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '900',
    marginRight: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#3A3A3C',
    fontWeight: '600',
  },
  floatingBottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  glowButtonWrapper: {
    width: '100%',
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 8,
  },
  payButton: {
    backgroundColor: '#1C1C1E',
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111111',
  },
  modalSub: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
  },
  upiHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  upiList: {
    gap: 10,
    marginBottom: 20,
  },
  upiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  upiRowActive: {
    borderColor: '#111111',
    backgroundColor: '#FFFFFF',
  },
  upiIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  upiName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C7C7CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#111111',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#111111',
  },
  confirmPayBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmPayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  processingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  processingTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    marginTop: 16,
  },
  processingSub: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 6,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 6,
  },
  successSub: {
    fontSize: 14,
    color: '#3A3A3C',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 10,
  },
  successNote: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
  },
  doneBtn: {
    backgroundColor: '#1C1C1E',
    width: '100%',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  }
});
