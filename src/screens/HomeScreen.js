import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ZingLogo from '../components/ZingLogo';
import BottomDock from '../components/BottomDock';
import BouncyButton from '../components/BouncyButton';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const { user, isPaused, togglePause, coins, purchaseAddon, addons } = useAppContext();

  const handleManageStreak = () => {
    navigation.navigate('DrinkLog');
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
      `Add ${item.name} for ${item.cost} Zing Coins? Rider will vacuum pack it in tonight's pouch.`,
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
        
        {/* Top Header Row: Zing Logo + Top Right Floating Wallet Card (Exact Mockup Match) */}
        <View style={styles.topHeaderRow}>
          <ZingLogo size={28} />

          {/* Floating Wallet Card with Yellow Ambient Glow */}
          <TouchableOpacity 
            style={styles.floatingWalletCard}
            onPress={() => navigation.navigate('Pass')}
            activeOpacity={0.85}
          >
            <Text style={styles.walletAmount}>₹2,450</Text>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
          </TouchableOpacity>
        </View>

        {/* Active Subscription Card (Exact Mockup Match) */}
        <View style={[styles.activeSubCard, isPaused && styles.activeSubCardPaused]}>
          <Text style={styles.subCardHeader}>Active Subscription</Text>
          
          <Text style={styles.planName}>Current Plan: 7 Days{'\n'}| Daily 6 AM Fuel</Text>
          
          <Text style={styles.nextDropText}>
            {isPaused 
              ? "Status: Drop Paused (Vacation Mode)" 
              : "Next Drop: Tomorrow, 6:00 AM"}
          </Text>
        </View>

        {/* Action Button: MANAGE STREAK with Yellow Ambient Glow */}
        <View style={styles.buttonShadowWrapper}>
          <BouncyButton style={styles.manageStreakBtn} onPress={handleManageStreak}>
            <Text style={styles.manageStreakText}>MANAGE STREAK</Text>
          </BouncyButton>
        </View>

        {/* Vacation Mode Toggle */}
        <View style={styles.vacationCard}>
          <View style={styles.vacationTextCol}>
            <Text style={styles.vacationTitle}>Vacation Mode</Text>
            <Text style={styles.vacationSub}>Pause drops without losing subscription days</Text>
          </View>
          <Switch 
            value={isPaused} 
            onValueChange={togglePause} 
            trackColor={{ false: '#E5E5EA', true: '#D4FF00' }}
            thumbColor={isPaused ? '#111' : '#FFF'}
          />
        </View>

        {/* Add-ons for Tomorrow */}
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

        {/* Bottom Dock: ⚡ Order New Stack */}
        <BottomDock onPress={() => navigation.navigate('Pass')} />

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
    paddingBottom: 30,
  },
  topHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  floatingWalletCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    shadowColor: '#D4FF00',
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
  activeSubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 20,
  },
  activeSubCardPaused: {
    backgroundColor: '#F8F9FA',
  },
  subCardHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 12,
  },
  planName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    lineHeight: 28,
    marginBottom: 12,
  },
  nextDropText: {
    fontSize: 13,
    color: '#71717A',
    fontWeight: '700',
  },
  buttonShadowWrapper: {
    width: '100%',
    shadowColor: '#D4FF00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.65,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
  },
  manageStreakBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
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
  vacationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  vacationTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  vacationTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 2,
  },
  vacationSub: {
    fontSize: 12,
    color: '#8E8E93',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontSize: 15,
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
    backgroundColor: '#FFFFFF',
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
