import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Flame, ShieldCheck, X, CheckCircle2, ArrowRight, Zap, Sparkles } from 'lucide-react-native';
import BouncyButton from '../components/BouncyButton';
import { useAppContext } from '../context/AppContext';
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

    // Try real native UPI deep link if available on Android
    const upiUrl = `upi://pay?pa=zingnutrition@okaxis&pn=Zing%20Nutrition&am=${planAmount}&cu=INR&tn=Zing%206AM%20Pass`;
    Linking.canOpenURL(upiUrl).then(supported => {
      if (supported) {
        Linking.openURL(upiUrl).catch(() => {});
      }
    });

    setTimeout(async () => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      const planName = selectedPlan === '7day' ? '7-Day Habit Stack' : '30-Day Pro Stack';
      updateUser({
        activePlan: planName,
        planExpiry: selectedPlan === '7day' ? '8 Days Active' : '30 Days Active',
      });
      // Save subscription in Supabase
      await supabaseService.saveUserProfile({
        ...user,
        active_plan: selectedPlan,
        plan_amount: planAmount,
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerGroup}>
          <View style={styles.subTag}>
            <Sparkles color="#111111" size={12} fill="#FFC800" />
            <Text style={styles.subTagText}>PREPAY HABIT PASSES</Text>
          </View>
          <Text style={styles.headerTitle}>Delivery Passes</Text>
          <Text style={styles.headerSub}>
            Zero cooking, zero measuring. Daily fresh vacuum pouch delivered at 6:00 AM.
          </Text>
        </View>

        {/* Active Plan Banner if purchased */}
        {user?.activePlan && (
          <View style={styles.activePlanBanner}>
            <CheckCircle2 color="#34C759" size={24} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.activePlanTitle}>{user.activePlan} (Active)</Text>
              <Text style={styles.activePlanSub}>{user.planExpiry} • Daily 6:00 AM Delivery ON</Text>
            </View>
          </View>
        )}
        
        <View style={styles.plansContainer}>
          {/* 7 Day Plan - Most Popular */}
          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === '7day' && styles.planCardActive]}
            activeOpacity={0.9}
            onPress={() => setSelectedPlan('7day')}
          >
            {selectedPlan === '7day' && (
              <View style={styles.checkIcon}>
                <Check color="#111111" size={14} />
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>7-Day Habit Pass</Text>
              <View style={styles.popularBadge}>
                <Flame color="#111111" size={12} fill="#FFC800" />
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.planPrice}>₹1,393</Text>
              <Text style={styles.perDayText}>₹199 / day</Text>
            </View>
            <Text style={styles.planDesc}>The friction-free starter pass to build a consistent 6 AM morning routine.</Text>
            
            <View style={styles.highlightBox}>
              <Text style={styles.highlightText}>🔥 7-day unbroken streak unlocks your 8th day free.</Text>
            </View>

            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Custom grams dry stack pouch</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Delivered silently at door by 6:00 AM</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>1-Click Vacation pause anytime</Text>
            </View>
          </TouchableOpacity>

          {/* 30 Day Plan - Monday Drop Priority */}
          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === '30day' && styles.planCardActive]}
            activeOpacity={0.9}
            onPress={() => setSelectedPlan('30day')}
          >
            {selectedPlan === '30day' && (
              <View style={styles.checkIcon}>
                <Check color="#111111" size={14} />
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>30-Day Pro Member</Text>
              <View style={styles.proBadge}>
                <Zap color="#111111" size={12} fill="#111111" />
                <Text style={styles.proText}>VIP</Text>
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.planPrice}>₹5,370</Text>
              <Text style={styles.perDayText}>₹179 / day</Text>
            </View>
            <Text style={styles.planDesc}>Maximum savings for dedicated fitness goals. Instant priority dispatch.</Text>
            
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
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>VIP priority dispatch allocation</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Floating Bottom Pay Button */}
      <View style={styles.floatingBottomBar}>
        <BouncyButton style={styles.payButton} onPress={handleStartPayment}>
          <Text style={styles.payButtonText}>Pay ₹{planAmount.toLocaleString('en-IN')} via UPI</Text>
          <ArrowRight color="#111111" size={20} />
        </BouncyButton>
      </View>

      {/* Razorpay UPI Checkout Modal */}
      <Modal visible={showCheckout} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {!paymentSuccess ? (
              <>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={styles.modalTitle}>Razorpay UPI Checkout</Text>
                    <Text style={styles.modalSub}>Paying ₹{planAmount.toLocaleString('en-IN')} to Zing Nutrition Pvt Ltd</Text>
                  </View>
                  <TouchableOpacity onPress={() => !paymentProcessing && setShowCheckout(false)}>
                    <X color="#000" size={24} />
                  </TouchableOpacity>
                </View>

                {paymentProcessing ? (
                  <View style={styles.processingContainer}>
                    <ActivityIndicator size="large" color="#FFC800" />
                    <Text style={styles.processingTitle}>Opening UPI Gateway...</Text>
                    <Text style={styles.processingSub}>Approve payment of ₹{planAmount.toLocaleString('en-IN')} on your UPI app</Text>
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
                          activeOpacity={0.8}
                        >
                          <Text style={styles.upiIcon}>{item.icon}</Text>
                          <Text style={styles.upiName}>{item.name}</Text>
                          <View style={[styles.radioCircle, selectedUpiApp === item.id && styles.radioCircleActive]}>
                            {selectedUpiApp === item.id && <View style={styles.radioDot} />}
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <View style={styles.razorpayBadge}>
                      <ShieldCheck color="#34C759" size={18} />
                      <Text style={styles.razorpayText}>Secured with 256-bit Bank Grade Encryption</Text>
                    </View>

                    <BouncyButton style={styles.confirmPayBtn} onPress={handleConfirmUpi}>
                      <Text style={styles.confirmPayText}>Pay ₹{planAmount.toLocaleString('en-IN')}</Text>
                      <ArrowRight color="#111111" size={20} />
                    </BouncyButton>
                  </>
                )}
              </>
            ) : (
              <View style={styles.successContainer}>
                <View style={styles.successIconCircle}>
                  <Check color="#111111" size={38} />
                </View>
                <Text style={styles.successTitle}>Payment Successful! 🎉</Text>
                <Text style={styles.successSub}>
                  ₹{planAmount.toLocaleString('en-IN')} received. Your {selectedPlan === '7day' ? '7-Day Habit' : '30-Day Pro'} Stack is now active.
                </Text>
                <Text style={styles.successNote}>
                  Rider will drop your first freshly packed nutrition pouch tomorrow at 6:00 AM sharp.
                </Text>

                <BouncyButton 
                  style={styles.doneBtn} 
                  onPress={() => {
                    setShowCheckout(false);
                    setPaymentSuccess(false);
                  }}
                >
                  <Text style={styles.doneBtnText}>Go to Home</Text>
                </BouncyButton>
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
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  headerGroup: {
    marginBottom: 20,
  },
  subTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  subTagText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#111111',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 6,
    lineHeight: 20,
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
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },
  activePlanSub: {
    fontSize: 13,
    color: '#34C759',
    marginTop: 2,
    fontWeight: '700',
  },
  plansContainer: {
    gap: 16,
    marginBottom: 32,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  planCardActive: {
    borderColor: '#FFC800',
    backgroundColor: '#FFFDF5',
    borderWidth: 2,
  },
  checkIcon: {
    position: 'absolute',
    top: 22,
    right: 22,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFC800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  popularText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#111111',
    marginLeft: 4,
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
  },
  proText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFC800',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  perDayText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#71717A',
    marginLeft: 8,
  },
  planDesc: {
    fontSize: 14,
    color: '#71717A',
    marginBottom: 14,
    lineHeight: 19,
  },
  highlightBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  highlightText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },
  highlightBoxGold: {
    backgroundColor: '#FFFDF5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFC800',
  },
  highlightTextGold: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111111',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '900',
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#3A3A3C',
    fontWeight: '600',
  },
  floatingBottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC800',
    borderRadius: 30,
    height: 60,
    shadowColor: '#FFC800',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  payButtonText: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '900',
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
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
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
  },
  modalSub: {
    fontSize: 13,
    color: '#71717A',
    marginTop: 4,
  },
  upiHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#71717A',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  upiList: {
    gap: 10,
    marginBottom: 20,
  },
  upiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  upiRowActive: {
    borderColor: '#FFC800',
    backgroundColor: '#FFFDF5',
  },
  upiIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  upiName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D4D4D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#FFC800',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFC800',
  },
  razorpayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  razorpayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
    marginLeft: 6,
  },
  confirmPayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC800',
    height: 56,
    borderRadius: 28,
  },
  confirmPayText: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '900',
    marginRight: 8,
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
    fontSize: 14,
    color: '#71717A',
    marginTop: 6,
    textAlign: 'center',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successIconCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#FFC800',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 8,
  },
  successSub: {
    fontSize: 15,
    color: '#3A3A3C',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },
  successNote: {
    fontSize: 13,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 28,
  },
  doneBtn: {
    backgroundColor: '#111111',
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
