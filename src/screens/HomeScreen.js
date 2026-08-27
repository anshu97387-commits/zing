import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Flame, Bike, CheckCircle2, Sparkles, Shield, ChevronRight, Moon } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../theme/colors';
import BouncyButton from '../components/BouncyButton';

export default function HomeScreen({ navigation }) {
  const { user, isPaused, togglePause, coins, purchaseAddon, addons } = useAppContext();
  const [synced, setSynced] = useState(false);

  const STREAK_DAYS = 6;
  const WALLET_BALANCE = '₹2,450';

  const handleManageStreak = () => {
    Alert.alert(
      "🔥 6-Day Morning Streak",
      `1 more day of 6:00 AM delivery unlocks your 8th day free! Keep the momentum going.`,
      [
        { text: "View Details", onPress: () => navigation.navigate('Pass') },
        { text: "Awesome", style: "default" }
      ]
    );
  };

  const handleAddon = (item) => {
    if (coins < item.cost) {
      Alert.alert(
        "Low Zing Coins",
        `You need ${item.cost} coins for ${item.name}. Invite friends to earn more!`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Earn Coins", onPress: () => navigation.navigate('Refer') }
        ]
      );
      return;
    }
    Alert.alert(
      "Add to Tomorrow's Drop",
      `Add ${item.name} for ${item.cost} Zing Coins? Rider Rahul will vacuum pack it in tonight's pouch.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm Add-on", 
          onPress: () => {
            purchaseAddon(item);
            Alert.alert("Added! ⚡", `${item.name} is scheduled for tomorrow's 6:00 AM drop.`);
          }
        }
      ]
    );
  };

  const availableAddons = [
    { id: 'creatine', name: '5g Pure Creatine', cost: 50, icon: '⚡', desc: 'Power & ATP Boost' },
    { id: 'dark_choc', name: 'Dark Choc Chunks', cost: 30, icon: '🍫', desc: 'Antioxidants & Taste' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top App Bar */}
        <View style={styles.topBar}>
          <View style={styles.logoRow}>
            <Text style={styles.logoWhite}>Zing</Text>
            <Text style={styles.logoNeon}>Fit</Text>
          </View>

          <TouchableOpacity style={styles.streakPill} onPress={handleManageStreak}>
            <Flame color={Colors.neon} size={16} fill={Colors.neon} />
            <Text style={styles.streakPillText}>{STREAK_DAYS} Days</Text>
          </TouchableOpacity>
        </View>

        {/* Floating Glow Wallet Balance Card (Mockup 1 Match) */}
        <TouchableOpacity 
          style={styles.floatingWalletCard} 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Pass')}
        >
          <Text style={styles.walletBalanceAmount}>{WALLET_BALANCE}</Text>
          <Text style={styles.walletBalanceLabel}>Wallet Balance</Text>
        </TouchableOpacity>

        {/* Active Subscription Card (Mockup 1 Match) */}
        <View style={[styles.activeSubCard, isPaused && styles.activeSubCardPaused]}>
          <View style={styles.activeSubHeader}>
            <Text style={styles.activeSubTag}>Active Subscription</Text>
            <View style={styles.liveDropDot} />
          </View>

          <Text style={styles.planHeadline}>Current Plan:</Text>
          <Text style={styles.planTitle}>7 Days | Daily 6 AM Fuel</Text>
          
          <Text style={styles.nextDropInfo}>
            {isPaused 
              ? "Status: Drop Paused (Vacation Mode)" 
              : "Next Drop: Tomorrow, 6:00 AM"}
          </Text>

          <BouncyButton style={styles.manageStreakBtn} onPress={handleManageStreak}>
            <Text style={styles.manageStreakText}>MANAGE STREAK</Text>
          </BouncyButton>
        </View>

        {/* Quick Order / Vacation Pause Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.orderNewStackBtn}
            onPress={() => navigation.navigate('Pass')}
          >
            <Text style={styles.orderNewText}>Order New Stack</Text>
            <Zap color={Colors.neon} size={16} fill={Colors.neon} />
          </TouchableOpacity>

          <View style={styles.vacationMiniBox}>
            <Text style={styles.vacationMiniLabel}>Vacation Pause</Text>
            <Switch 
              value={isPaused} 
              onValueChange={togglePause} 
              trackColor={{ false: '#27272A', true: Colors.neon }}
              thumbColor={isPaused ? '#000' : '#FFF'}
            />
          </View>
        </View>

        {/* Matte Black Vacuum Pouch Feature Card (Mockup Match) */}
        <View style={styles.pouchFeatureCard}>
          <View style={styles.pouchTextCol}>
            <View style={styles.fuelBadge}>
              <Text style={styles.fuelBadgeText}>ZERO COOKING • ZERO SPOILAGE</Text>
            </View>
            <Text style={styles.pouchHeadline}>Pre-measured Fresh Dry Stack</Text>
            <Text style={styles.pouchSub}>
              {user?.name ? `${user.name}'s` : "Your"} custom formula in a matte-black vacuum sealed pouch.
            </Text>
          </View>

          <View style={styles.pouchVisualBox}>
            <Text style={styles.pouchEmoji}>⚡</Text>
            <Text style={styles.pouchBrandSmall}>zing</Text>
            <Text style={styles.pouchSubtitleSmall}>MORNING FUEL</Text>
          </View>
        </View>

        {/* Add-ons Section */}
        {!isPaused && (
          <View style={styles.sectionWrap}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Add-ons for Tomorrow</Text>
              <Text style={styles.coinsAmount}>🪙 {coins} Coins</Text>
            </View>

            <View style={styles.addonsRow}>
              {availableAddons.map(addon => {
                const isAdded = addons.find(a => a.id === addon.id);
                return (
                  <TouchableOpacity 
                    key={addon.id} 
                    style={[styles.addonDarkCard, isAdded && styles.addonDarkCardActive]}
                    onPress={() => !isAdded && handleAddon(addon)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.addonEmoji}>{addon.icon}</Text>
                    <Text style={styles.addonName}>{addon.name}</Text>
                    <Text style={styles.addonCost}>{isAdded ? 'Added ✓' : `${addon.cost} Coins`}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Nutrition Formula Breakdown */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>Daily Formula ({user?.goal === 'fat_loss' ? 'Cut' : 'Bulk'})</Text>
          <View style={styles.formulaDarkCard}>
            <FormulaItem name="Raw Whey Isolate" grams={user?.goal === 'fat_loss' ? '30g' : '36g'} />
            <FormulaItem name="Organic Rolled Oats" grams={user?.goal === 'fat_loss' ? '30g' : '50g'} />
            <FormulaItem name="Black Chia Seeds" grams="5g" />
            {user?.goal !== 'fat_loss' && (
              <FormulaItem name="Roasted Peanut Butter" grams="10g" />
            )}
            {addons.map(a => (
              <FormulaItem key={a.id} name={a.name} grams="Added" isAddon={true} />
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const FormulaItem = ({ name, grams, isAddon }) => (
  <View style={styles.formulaItemRow}>
    <Text style={[styles.formulaItemName, isAddon && { color: Colors.neon }]}>{name}</Text>
    <View style={[styles.formulaGramBadge, isAddon && { borderColor: Colors.neon, backgroundColor: 'rgba(212, 255, 0, 0.1)' }]}>
      <Text style={[styles.formulaGramText, isAddon && { color: Colors.neon }]}>{grams}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWhite: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  logoNeon: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.neon,
    letterSpacing: -0.5,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 255, 0, 0.3)',
  },
  streakPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.neon,
    marginLeft: 6,
  },
  floatingWalletCard: {
    alignSelf: 'flex-end',
    backgroundColor: '#1C1C1E',
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderWidth: 1.5,
    borderColor: Colors.neon,
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 22,
    minWidth: 180,
  },
  walletBalanceAmount: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.neon,
    letterSpacing: -0.5,
  },
  walletBalanceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#A1A1AA',
    marginTop: 2,
  },
  activeSubCard: {
    backgroundColor: '#141416',
    borderRadius: 26,
    padding: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 255, 0, 0.35)',
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 20,
  },
  activeSubCardPaused: {
    borderColor: '#3F3F46',
    shadowOpacity: 0,
  },
  activeSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeSubTag: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  liveDropDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neon,
  },
  planHeadline: {
    fontSize: 17,
    fontWeight: '600',
    color: '#D4D4D8',
  },
  planTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
    marginBottom: 8,
  },
  nextDropInfo: {
    fontSize: 14,
    color: Colors.neon,
    fontWeight: '700',
    marginBottom: 20,
  },
  manageStreakBtn: {
    backgroundColor: '#1C1C1E',
    borderWidth: 1.5,
    borderColor: Colors.neon,
    borderRadius: 16,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  manageStreakText: {
    color: Colors.neon,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  orderNewStackBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#18181A',
    borderRadius: 16,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  orderNewText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 6,
  },
  vacationMiniBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181A',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  vacationMiniLabel: {
    color: '#A1A1AA',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 8,
  },
  pouchFeatureCard: {
    flexDirection: 'row',
    backgroundColor: '#121214',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 24,
    alignItems: 'center',
  },
  pouchTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  fuelBadge: {
    backgroundColor: 'rgba(212, 255, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  fuelBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: Colors.neon,
    letterSpacing: 0.5,
  },
  pouchHeadline: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pouchSub: {
    fontSize: 12,
    color: '#8E8E93',
    lineHeight: 16,
  },
  pouchVisualBox: {
    width: 80,
    height: 100,
    backgroundColor: '#000000',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#27272A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  pouchEmoji: {
    fontSize: 24,
    color: Colors.neon,
  },
  pouchBrandSmall: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
  },
  pouchSubtitleSmall: {
    fontSize: 7,
    fontWeight: '800',
    color: Colors.neon,
    letterSpacing: 0.5,
  },
  sectionWrap: {
    marginBottom: 24,
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  coinsAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.neon,
  },
  addonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  addonDarkCard: {
    flex: 1,
    backgroundColor: '#18181A',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  addonDarkCardActive: {
    borderColor: Colors.neon,
    backgroundColor: 'rgba(212, 255, 0, 0.08)',
  },
  addonEmoji: {
    fontSize: 22,
    marginBottom: 6,
  },
  addonName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  addonCost: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.neon,
  },
  formulaDarkCard: {
    backgroundColor: '#141416',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  formulaItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#27272A',
  },
  formulaItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E4E4E7',
  },
  formulaGramBadge: {
    backgroundColor: '#27272A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  formulaGramText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  }
});
