import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, Flame, Bike, Zap, Apple, PlusCircle } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';

export default function HomeScreen() {
  const { user, isPaused, togglePause, coins, purchaseAddon, addons } = useAppContext();
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const STREAK_DAYS = 6;

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
    }, 1500);
  };

  const handleAddon = (item) => {
    if (coins < item.cost) {
      Alert.alert("Not enough Zing Coins", `You need ${item.cost} coins for ${item.name}. Refill by referring a friend!`);
      return;
    }
    Alert.alert(
      "Confirm Add-on",
      `Add ${item.name} to tomorrow's drop for ${item.cost} Coins?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => purchaseAddon(item) }
      ]
    );
  };

  const availableAddons = [
    { id: 'creatine', name: '5g Creatine', cost: 50, icon: '⚡' },
    { id: 'dark_choc', name: 'Dark Choc Chunks', cost: 30, icon: '🍫' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header - Streak Ring Focus */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Good evening,</Text>
            <Text style={styles.userName}>{user?.name || 'Anshu'}</Text>
          </View>
          
          <View style={styles.streakRingContainer}>
            <View style={styles.streakRing}>
              <Flame color="#FFB800" size={24} />
              <Text style={styles.streakNumber}>{STREAK_DAYS}</Text>
            </View>
            <Text style={styles.streakLabel}>Days Streak</Text>
          </View>
        </View>

        {/* Drop Alert Notification & Pause */}
        <View style={[styles.dropAlertCard, isPaused && styles.dropAlertPaused]}>
          <View style={styles.dropAlertTop}>
            <View style={[styles.dropAlertIcon, isPaused && { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
              <Bike color={isPaused ? "#000" : "#FFF"} size={20} />
            </View>
            <View style={styles.dropAlertTexts}>
              <Text style={[styles.dropAlertTitle, isPaused && { color: '#000' }]}>
                {isPaused ? "Tomorrow's Drop Paused" : "Tomorrow's Drop Scheduled"}
              </Text>
              <Text style={[styles.dropAlertSub, isPaused && { color: '#4A4A4A' }]}>
                {isPaused ? "Wallet balance saved." : "Rider Rahul will deliver silently by 6:00 AM."}
              </Text>
            </View>
          </View>
          
          {/* Pause Toggle */}
          <View style={styles.pauseRow}>
            <Text style={[styles.pauseText, isPaused && { color: '#000' }]}>Vacation Mode (Pause)</Text>
            <Switch 
              value={isPaused} 
              onValueChange={togglePause} 
              trackColor={{ false: '#3A3A3C', true: '#34C759' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Monday Drop FOMO */}
        {!isPaused && (
          <View style={styles.mondayDropCard}>
            <View style={styles.mondayDropHeader}>
              <View style={styles.mondayDropTitleRow}>
                <Zap color="#FFB800" size={18} fill="#FFB800" />
                <Text style={styles.mondayDropTitle}>Monday Drop</Text>
              </View>
              <Text style={styles.mondayDropSpots}>47/200 Spots</Text>
            </View>
            
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '85%' }]} />
            </View>
            <Text style={styles.mondayDropSub}>Secure your spot before it sells out.</Text>
          </View>
        )}

        {/* Zing Coins Add-ons */}
        {!isPaused && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Enhance Tomorrow's Drop</Text>
              <Text style={styles.coinsBalance}>🪙 {coins}</Text>
            </View>
            <View style={styles.addonsContainer}>
              {availableAddons.map(addon => {
                const isAdded = addons.find(a => a.id === addon.id);
                return (
                  <TouchableOpacity 
                    key={addon.id} 
                    style={[styles.addonCard, isAdded && styles.addonCardActive]}
                    onPress={() => !isAdded && handleAddon(addon)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addonIcon}>{addon.icon}</Text>
                    <View style={styles.addonInfo}>
                      <Text style={styles.addonName}>{addon.name}</Text>
                      <Text style={styles.addonCost}>{isAdded ? 'Added' : `${addon.cost} Coins`}</Text>
                    </View>
                    {!isAdded && <PlusCircle color="#000" size={20} />}
                    {isAdded && <CheckCircle color="#34C759" size={20} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* Daily Ingredients Quick View */}
        <Text style={styles.sectionTitle}>Your Formula ({user?.goal === 'fat_loss' ? 'Cutting' : user?.goal === 'muscle' ? 'Bulking' : 'Recomp'})</Text>
        <View style={styles.ingredientsCard}>
          <IngredientRow icon="💪" name="Whey Protein" gram={user?.goal === 'muscle' ? '36g' : '30g'} />
          <IngredientRow icon="🌾" name="Rolled Oats" gram={user?.goal === 'fat_loss' ? '30g' : '50g'} />
          <IngredientRow icon="🌱" name="Chia Seeds" gram="5g" />
          {user?.goal !== 'fat_loss' && (
            <IngredientRow icon="🥜" name="Peanut Butter" gram="10g" />
          )}
          {addons.map(addon => (
            <IngredientRow key={addon.id} icon={addon.icon} name={addon.name} gram="Added" />
          ))}

          {/* Apple Health Sync Button */}
          <TouchableOpacity 
            style={[styles.healthSyncBtn, synced && styles.healthSyncSuccess]} 
            onPress={handleSync}
            disabled={syncing || synced}
          >
            {synced ? (
              <Text style={styles.healthSyncTextSuccess}>✅ Macros Synced</Text>
            ) : (
              <>
                <Text style={styles.healthSyncText}>{syncing ? 'Syncing...' : 'Sync to Apple Health'}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const IngredientRow = ({ icon, name, gram }) => (
  <View style={styles.ingredientRow}>
    <View style={styles.ingLeft}>
      <Text style={styles.ingName}>{icon}  {name}</Text>
    </View>
    <Text style={styles.ingGram}>{gram}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 4,
  },
  userName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  streakRingContainer: {
    alignItems: 'center',
  },
  streakRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#FFB800',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  streakNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFB800',
  },
  streakLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
  },
  dropAlertCard: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dropAlertPaused: {
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowOpacity: 0,
    elevation: 0,
  },
  dropAlertTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropAlertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropAlertTexts: {
    marginLeft: 12,
    flex: 1,
  },
  dropAlertTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 2,
  },
  dropAlertSub: {
    fontSize: 13,
    color: '#A1A1AA',
  },
  pauseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
  },
  pauseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  coinsBalance: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  addonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  addonCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  addonCardActive: {
    borderColor: '#34C759',
    backgroundColor: '#F2FFF5',
  },
  addonIcon: {
    fontSize: 20,
  },
  addonInfo: {
    marginLeft: 10,
    flex: 1,
  },
  addonName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  addonCost: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
  },
  mondayDropCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFF8E1',
  },
  mondayDropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mondayDropTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mondayDropTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFB800',
    marginLeft: 6,
  },
  mondayDropSpots: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFB800',
    borderRadius: 4,
  },
  mondayDropSub: {
    fontSize: 13,
    color: '#8E8E93',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  ingredientsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  ingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  ingGram: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  healthSyncBtn: {
    marginTop: 16,
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  healthSyncSuccess: {
    backgroundColor: '#F2FFF5',
  },
  healthSyncText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  healthSyncTextSuccess: {
    color: '#34C759',
    fontSize: 15,
    fontWeight: '600',
  }
});
