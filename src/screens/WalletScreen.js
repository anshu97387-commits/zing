import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Flame, Clock, ShieldCheck, X, CheckCircle2, ArrowRight } from 'lucide-react-native';
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
    setTimeout(async () => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      updateUser({
        activePlan: selectedPlan === '7day' ? '7-Day Habit Stack' : '30-Day Pro Stack',
        planExpiry: selectedPlan === '7day' ? '8 Days Left' : '30 Days Left',
      });
      // Save subscription in Supabase
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
        
        <Text style={styles.headerTitle}>Passes</Text>
        <Text style={styles.headerSub}>Prepay to unlock daily 6 AM doorstep delivery. Zero friction.</Text>

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
                <Check color="#FFF" size={14} />
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>7-Day Stack</Text>
              <View style={styles.popularBadge}>
                <Flame color="#FFB800" size={12} />
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
            </View>
            <Text style={styles.planPrice}>₹1,393</Text>
            <Text style={styles.planDesc}>₹199 / day. The perfect way to build the habit.</Text>
            
            <View style={styles.highlightBox}>
              <Text style={styles.highlightText}>🔥 7-day streak unlocks your 8th day free.</Text>
            </View>

            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Complete nutrition stack</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Delivered silently by 6:00 AM</Text>
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
                <Check color="#FFF" size={14} />
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>30-Day Pro</Text>
            </View>
            <Text style={styles.planPrice}>₹5,370</Text>
            <Text style={styles.planDesc}>₹179 / day. Serious commitment, serious gains.</Text>
            
            <View style={[styles.highlightBox, { backgroundColor: '#F2F2F7' }]}>
              <Text style={[styles.highlightText, { color: '#000' }]}>⚡ Monday Drop Priority Included</Text>
            </View>

            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Save ₹600 upfront</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>VIP priority support</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Floating Bottom Button */}
      <View style={styles.floatingBottomBar}>
        <BouncyButton style={styles.payButton} onPress={handleStartPayment}>
          <Text style={styles.payButtonText}>Pay ₹{planAmount.toLocaleString('en-IN')} via UPI</Text>
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
                    <Text style={styles.modalSub}>Paying ₹{planAmount.toLocaleString('en-IN')} to Zing Nutrition</Text>
                  </View>
                  <TouchableOpacity onPress={() => !paymentProcessing && setShowCheckout(false)}>
                    <X color="#000" size={24} />
                  </TouchableOpacity>
                </View>

                {paymentProcessing ? (
                  <View style={styles.processingContainer}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text style={styles.processingTitle}>Opening UPI App...</Text>
                    <Text style={styles.processingSub}>Please approve the request on your UPI app</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.upiHeader}>Choose UPI App</Text>
                    <View style={styles.upiList}>
                      {[
                        { id: 'gpay', name: 'Google Pay', icon: '🔵' },
                        { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
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

                    <View style={styles.razorpayBadge}>
                      <ShieldCheck color="#34C759" size={18} />
                      <Text style={styles.razorpayText}>Secured by Razorpay 256-bit Encryption</Text>
                    </View>

                    <BouncyButton style={styles.confirmPayBtn} onPress={handleConfirmUpi}>
                      <Text style={styles.confirmPayText}>Pay Now ₹{planAmount.toLocaleString('en-IN')}</Text>
                      <ArrowRight color="#FFF" size={20} />
                    </BouncyButton>
                  </>
                )}
              </>
            ) : (
              <View style={styles.successContainer}>
                <View style={styles.successIconCircle}>
                  <Check color="#FFF" size={36} />
                </View>
                <Text style={styles.successTitle}>Payment Successful! 🎉</Text>
                <Text style={styles.successSub}>
                  ₹{planAmount.toLocaleString('en-IN')} received. Your {selectedPlan === '7day' ? '7-Day' : '30-Day'} Stack is now active.
                </Text>
                <Text style={styles.successNote}>
                  Rider Rahul will deliver your first fresh stack tomorrow at 6:00 AM sharp.
                </Text>

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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },
  activePlanBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2FFF5',
    padding: 16,
    borderRadius: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#34C759',
  },
  activePlanTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  activePlanSub: {
    fontSize: 13,
    color: '#34C759',
    marginTop: 2,
    fontWeight: '600',
  },
  plansContainer: {
    gap: 16,
    marginBottom: 32,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  planCardActive: {
    borderColor: '#000',
  },
  checkIcon: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 12,
  },
  popularText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFB800',
    marginLeft: 4,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  planDesc: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 16,
  },
  highlightBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  highlightText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFB800',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 16,
    color: '#000',
    marginRight: 10,
    marginTop: -2,
  },
  featureText: {
    fontSize: 15,
    color: '#3A3A3C',
    fontWeight: '500',
  },
  floatingBottomBar: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  payButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
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
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  modalSub: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  upiHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  upiList: {
    gap: 12,
    marginBottom: 20,
  },
  upiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  upiRowActive: {
    borderColor: '#000',
    backgroundColor: '#FFFFFF',
  },
  upiIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  upiName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
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
    borderColor: '#000',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
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
    color: '#34C759',
    marginLeft: 6,
  },
  confirmPayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: 56,
    borderRadius: 28,
  },
  confirmPayText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 8,
  },
  processingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  processingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginTop: 16,
  },
  processingSub: {
    fontSize: 14,
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
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
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
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 28,
  },
  doneBtn: {
    backgroundColor: '#000',
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtnText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
