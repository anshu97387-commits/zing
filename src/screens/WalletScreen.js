import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Flame, Clock } from 'lucide-react-native';
import BouncyButton from '../components/BouncyButton';

import { useAppContext } from '../context/AppContext';

export default function WalletScreen() {
  const { coins } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState('7day');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.headerTitle}>Passes</Text>
        <Text style={styles.headerSub}>Prepay to unlock daily 6 AM doorstep delivery. Zero friction.</Text>
        
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
        <BouncyButton style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay {selectedPlan === '7day' ? '₹1,393' : '₹5,370'} via UPI</Text>
        </BouncyButton>
      </View>
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
    marginBottom: 32,
    lineHeight: 22,
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
    borderRadius: 30, // Zepto Pill shape
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
});
