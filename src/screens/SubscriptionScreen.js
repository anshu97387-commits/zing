import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, PauseCircle, Calendar, ChevronRight } from 'lucide-react-native';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';
import { Colors } from '../theme/colors';

export default function SubscriptionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Row: Zing Logo + Top Right Floating Wallet Card */}
        <View style={styles.topHeaderRow}>
          <ZingLogo size={28} />

          <TouchableOpacity 
            style={styles.floatingWalletCard}
            onPress={() => navigation.navigate('WalletTransactions')}
            activeOpacity={0.85}
          >
            <Text style={styles.walletAmount}>₹2,450</Text>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <Text style={styles.headingTitle}>SUBSCRIPTION</Text>

        {/* Active Plan Card */}
        <View style={styles.activePlanCard}>
          <View style={styles.planImagePlaceholder}>
             <View style={styles.fakeImageGlow} />
             {/* Simulating the black pouch and shaker with text */}
             <Text style={styles.fakeImageText}>Zing Fuel</Text>
          </View>
          <View style={styles.planDetailsCol}>
            <Text style={styles.planTitle}>Daily 6 AM Fuel</Text>
            <Text style={styles.planStatus}>Active</Text>
            <Text style={styles.planPrice}>₹1,499 / week</Text>
            <Text style={styles.planRenew}>Auto-renews in 3 days.</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          {/* Day 1 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineNode}>
              <View style={styles.checkCircle}>
                <Check color="#000" size={12} strokeWidth={3} />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineTextCol}>
              <Text style={styles.timelineDate}>Today, Aug 27</Text>
              <Text style={styles.timelineMix}>Standard Mix</Text>
            </View>
          </View>

          {/* Day 2 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineNode}>
              <View style={styles.checkCircle}>
                <Check color="#000" size={12} strokeWidth={3} />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineTextCol}>
              <Text style={styles.timelineDate}>Tomorrow, Aug 28</Text>
              <Text style={styles.timelineMix}>Standard Mix</Text>
            </View>
          </View>

          {/* Day 3 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineNode}>
              <View style={styles.checkCircle}>
                <Check color="#000" size={12} strokeWidth={3} />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineTextCol}>
              <Text style={styles.timelineDate}>Aug 29</Text>
              <Text style={styles.timelineMix}>Standard Mix</Text>
            </View>
          </View>

          {/* Day 4 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineNode}>
              <View style={styles.emptyCircle} />
            </View>
            <View style={styles.timelineTextCol}>
              <Text style={styles.timelineDate}>Aug 30</Text>
              <Text style={styles.timelineMix}>Standard Mix</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <PauseCircle color="#111111" size={20} />
          <Text style={styles.actionBtnText}>Pause Subscription</Text>
          <ChevronRight color="#C7C7CC" size={20} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionBtn} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ChangePlan')}
        >
          <Calendar color="#111111" size={20} />
          <Text style={styles.actionBtnText}>Change Plan</Text>
          <ChevronRight color="#C7C7CC" size={20} />
        </TouchableOpacity>

        {/* Cancel Button */}
        <BouncyButton style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>CANCEL SUBSCRIPTION</Text>
        </BouncyButton>

      </ScrollView>
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
    paddingBottom: 40,
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
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  activePlanCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  planImagePlaceholder: {
    width: 80,
    height: 90,
    backgroundColor: '#111111',
    borderRadius: 12,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fakeImageGlow: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    backgroundColor: Colors.yellow,
    opacity: 0.2,
    borderRadius: 100,
  },
  fakeImageText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  planDetailsCol: {
    flex: 1,
    justifyContent: 'center',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111111',
  },
  planStatus: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.yellow,
    marginTop: 2,
    textShadowColor: 'rgba(212, 255, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
    marginTop: 12,
  },
  planRenew: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
  },
  timelineContainer: {
    paddingLeft: 10,
    marginBottom: 30,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineNode: {
    alignItems: 'center',
    width: 24,
    marginRight: 16,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#111111',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#C7C7CC',
    marginTop: 5,
  },
  timelineLine: {
    width: 2,
    height: 44,
    backgroundColor: '#E5E5EA',
    marginVertical: 4,
  },
  timelineTextCol: {
    paddingTop: 1,
  },
  timelineDate: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },
  timelineMix: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 12,
  },
  actionBtnText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    marginLeft: 12,
  },
  cancelBtn: {
    backgroundColor: '#333333',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  cancelBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
