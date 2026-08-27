import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Flame, Bike, CheckCircle2, Sparkles, Moon } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../theme/colors';
import BouncyButton from '../components/BouncyButton';

export default function HomeScreen({ navigation }) {
  const { user, isPaused, togglePause, coins, purchaseAddon, addons } = useAppContext();

  const STREAK_DAYS = 6;
  const WALLET_BALANCE = '₹2,450';

  const handleManageStreak = () => {
    Alert.alert(
      "🔥 6-Day Morning Streak",
      `Current Plan: 7 Days | Daily 6 AM Fuel.\nComplete 7 days unbroken to unlock your 8th day free!`,
      [
        { text: "View Passes", onPress: () => navigation.navigate('Pass') },
        { text: "Awesome", style: "default" }
      ]
    );
  };

  const handleAddon = (item) => {
    if (coins < item.cost) {
      Alert.alert(
        "Low Zing Coins",
        `You need ${item.cost} coins for ${item.name}. Refer friends to earn more!`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Earn Coins", onPress: () => navigation.navigate('Refer') }
        ]
      );
      return;
    }
    Alert.alert(
      "Add to Tomorrow's Drop",
      `Add ${item.name} for ${item.cost} Zing Coins? Rider Rahul will pack it in tonight's vacuum pouch.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          onPress: () => {
            purchaseAddon(item);
            Alert.alert("Added! ⚡", `${item.name} is scheduled for tomorrow's 6:00 AM drop.`);
          }
        }
      ]
    );
  };

  const availableAddons = [
    { id: 'creatine', name: '5g Pure Creatine', cost: 50, icon: '⚡', desc: 'Power & Strength' },
    { id: 'dark_choc', name: 'Dark Choc Chunks', cost: 30, icon: '🍫', desc: 'Antioxidants & Taste' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header: Zing */}
        <View style={styles.topBar}>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>Zing</Text>
            <View style={styles.logoDot} />
          </View>

          <TouchableOpacity style={styles.streakPill} onPress={handleManageStreak}>
            <Flame color={Colors.yellow} size={15} fill={Colors.yellow} />
            <Text style={styles.streakPillText}>{STREAK_DAYS} Days</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Floating Wallet Balance Card with Yellow Glow (Mockup Match) */}
        <View style={styles.walletGlowWrapper}>
          <TouchableOpacity 
            style={styles.floatingWalletCard} 
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Pass')}
          >
            <Text style={styles.walletAmount}>{WALLET_BALANCE}</Text>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
          </TouchableOpacity>
        </View>

        {/* 2. Active Subscription Card (Mockup Match) */}
        <View style={[styles.activeSubCard, isPaused && styles.activeSubCardPaused]}>
          <Text style={styles.subCardHeader}>Active Subscription</Text>
          
          <Text style={styles.planLabel}>Current Plan:</Text>
          <Text style={styles.planName}>7 Days | Daily 6 AM Fuel</Text>
          
          <Text style={styles.nextDropText}>
            {isPaused 
              ? "Status: Drop Paused (Vacation Mode)" 
              : "Next Drop: Tomorrow, 6:00 AM"}
          </Text>

          <View style={styles.glowButtonWrapper}>
            <BouncyButton style={styles.manageStreakBtn} onPress={handleManageStreak}>
              <Text style={styles.manageStreakText}>MANAGE STREAK</Text>
            </BouncyButton>
          </View>
        </View>

        {/* 3. Center Link: Order New Stack (Mockup Match) */}
        <TouchableOpacity 
          style={styles.orderNewStackLink}
          onPress={() => navigation.navigate('Pass')}
          activeOpacity={0.8}
        >
          <Text style={styles.orderNewStackText}>Order New Stack</Text>
        </TouchableOpacity>

        {/* 4. Vacation Mode Quick Toggle */}
        <View style={styles.vacationCard}>
          <View style={styles.vacationTextCol}>
            <Text style={styles.vacationTitle}>Vacation Mode</Text>
            <Text style={styles.vacationSub}>Pause deliveries without losing subscription days</Text>
          </View>
          <Switch 
            value={isPaused} 
            onValueChange={togglePause} 
            trackColor={{ false: '#E5E5EA', true: Colors.yellow }}
            thumbColor={isPaused ? '#111' : '#FFF'}
          />
        </View>

        {/* 5. Add-ons Section */}
        {!isPaused && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeaderTitle}>Add-ons for Tomorrow</Text>
              <Text style={styles.coinsBadge}>🪙 {coins} Coins</Text>
            </View>

            <View style={styles.addonsGrid}>
              {availableAddons.map(addon => {
                const isAdded = addons.find(a => a.id === addon.id);
                return (
                  <TouchableOpacity 
                    key={addon.id} 
                    style={[styles.addonBox, isAdded && styles.addonBoxActive]}
                    onPress={() => !isAdded && handleAddon(addon)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.addonIcon}>{addon.icon}</Text>
                    <Text style={styles.addonTitle}>{addon.name}</Text>
                    <Text style={styles.addonCost}>{isAdded ? 'Added ✓' : `${addon.cost} Coins`}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

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
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  streakPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111111',
    marginLeft: 6,
  },
  walletGlowWrapper: {
    alignSelf: 'flex-end',
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 8,
    marginBottom: 24,
  },
  floatingWalletCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    minWidth: 175,
  },
  walletAmount: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  walletLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8E8E93',
    marginTop: 2,
  },
  activeSubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },
  activeSubCardPaused: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E5E5EA',
  },
  subCardHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8E8E93',
    marginBottom: 12,
  },
  planLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#71717A',
  },
  planName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    marginTop: 2,
    marginBottom: 6,
  },
  nextDropText: {
    fontSize: 14,
    color: '#111111',
    fontWeight: '700',
    marginBottom: 20,
  },
  glowButtonWrapper: {
    width: '100%',
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 8,
  },
  manageStreakBtn: {
    backgroundColor: '#1C1C1E',
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  manageStreakText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  orderNewStackLink: {
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 16,
  },
  orderNewStackText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  vacationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  vacationTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  vacationTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 2,
  },
  vacationSub: {
    fontSize: 12,
    color: '#8E8E93',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },
  coinsBadge: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111111',
  },
  addonsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  addonBox: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  addonBoxActive: {
    borderColor: '#111111',
    backgroundColor: '#FFFDF5',
  },
  addonIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  addonTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 2,
  },
  addonCost: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717A',
  }
});
