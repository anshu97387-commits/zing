import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flame, Bike, Zap, PlusCircle, CheckCircle2, Moon, Sparkles } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import BouncyButton from '../components/BouncyButton';

export default function HomeScreen({ navigation }) {
  const { user, isPaused, togglePause, coins, purchaseAddon, addons } = useAppContext();
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const STREAK_DAYS = 6;

  const handleSyncHealth = () => {
    if (synced) return;
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      Alert.alert('🍏 Apple Health Synced', '36g Protein & 380 kcal successfully logged to your Health profile.');
    }, 1200);
  };

  const handleAddon = (item) => {
    if (coins < item.cost) {
      Alert.alert(
        "Low Zing Coins",
        `You need ${item.cost} coins for ${item.name}. Refer friends in the 6 AM Club to earn 100 coins!`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Earn Coins", onPress: () => navigation.navigate('Refer') }
        ]
      );
      return;
    }
    Alert.alert(
      "Add to Tomorrow's Drop?",
      `Add ${item.name} for ${item.cost} Zing Coins? Rider will pack it in your pouch tonight.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm Add-on", 
          onPress: () => {
            purchaseAddon(item);
            Alert.alert("Added! ✨", `${item.name} is scheduled for tomorrow's 6:00 AM drop.`);
          }
        }
      ]
    );
  };

  const availableAddons = [
    { id: 'creatine', name: '5g Pure Creatine', cost: 50, icon: '⚡', desc: 'Strength & Power' },
    { id: 'dark_choc', name: 'Dark Choc Chunks', cost: 30, icon: '🍫', desc: 'Antioxidants & Taste' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header & Streak Ring Glass Card */}
        <View style={styles.headerGlassCard}>
          <View style={styles.headerTextGroup}>
            <View style={styles.tagRow}>
              <View style={styles.livePulse} />
              <Text style={styles.tagText}>MORNING FUEL • 6:00 AM</Text>
            </View>
            <Text style={styles.userName}>{user?.name ? `${user.name}'s Stack` : "Arjun's Stack"}</Text>
            <Text style={styles.userSubtitle}>Vacuum sealed fresh • 0% Spoilage</Text>
          </View>

          <View style={styles.streakBadgeWrapper}>
            <View style={styles.streakGlowCircle}>
              <Flame color="#111111" size={24} fill="#FFC800" />
              <Text style={styles.streakNumber}>{STREAK_DAYS}</Text>
            </View>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
        </View>

        {/* 6 AM Drop Status & Vacation Mode Toggle */}
        <View style={[styles.dropCard, isPaused && styles.dropCardPaused]}>
          <View style={styles.dropTopRow}>
            <View style={[styles.dropIconBox, isPaused && styles.dropIconBoxPaused]}>
              {isPaused ? <Moon color="#71717A" size={22} /> : <Bike color="#111111" size={22} />}
            </View>
            <View style={styles.dropDetails}>
              <Text style={[styles.dropTitle, isPaused && styles.textMuted]}>
                {isPaused ? "Drop Paused (Vacation Mode)" : "Tomorrow's Drop Scheduled"}
              </Text>
              <Text style={styles.dropSub}>
                {isPaused 
                  ? "Wallet balance preserved. No pack will be sent." 
                  : "Silent doorstep drop by 6:00 AM sharp."}
              </Text>
            </View>
          </View>

          {/* Toggle Action */}
          <View style={styles.pauseToggleRow}>
            <View style={styles.pauseInfo}>
              <Text style={[styles.pauseTitle, isPaused && styles.textMuted]}>Vacation Mode</Text>
              <Text style={styles.pauseSub}>Pause without losing subscription days</Text>
            </View>
            <Switch 
              value={isPaused} 
              onValueChange={togglePause} 
              trackColor={{ false: '#E4E4E7', true: '#FFC800' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Monday Drop Scarcity Banner (FOMO) */}
        {!isPaused && (
          <TouchableOpacity 
            style={styles.scarcityCard} 
            activeOpacity={0.9} 
            onPress={() => navigation.navigate('Pass')}
          >
            <View style={styles.scarcityTop}>
              <View style={styles.scarcityBadge}>
                <Zap color="#111111" size={14} fill="#111111" />
                <Text style={styles.scarcityBadgeText}>MONDAY DROP</Text>
              </View>
              <Text style={styles.spotsCount}>47 / 200 Slots Left</Text>
            </View>

            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: '82%' }]} />
            </View>
            <Text style={styles.scarcityDesc}>Pre-pack slots filling fast in your sector. Priority to pass holders.</Text>
          </TouchableOpacity>
        )}

        {/* Enhance Drop with Zing Coins */}
        {!isPaused && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Sparkles color="#FFB800" size={20} />
                <Text style={styles.sectionTitle}>Add-ons for Tomorrow</Text>
              </View>
              <View style={styles.coinBalanceBadge}>
                <Text style={styles.coinsAmount}>🪙 {coins} Coins</Text>
              </View>
            </View>

            <View style={styles.addonsGrid}>
              {availableAddons.map(addon => {
                const isAdded = addons.find(a => a.id === addon.id);
                return (
                  <TouchableOpacity 
                    key={addon.id} 
                    style={[styles.addonCard, isAdded && styles.addonCardActive]}
                    onPress={() => !isAdded && handleAddon(addon)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addonEmoji}>{addon.icon}</Text>
                    <View style={styles.addonTextColumn}>
                      <Text style={styles.addonTitle}>{addon.name}</Text>
                      <Text style={styles.addonSub}>{addon.desc}</Text>
                    </View>
                    <View style={styles.addonActionBox}>
                      {isAdded ? (
                        <CheckCircle2 color="#34C759" size={22} />
                      ) : (
                        <View style={styles.costBadge}>
                          <Text style={styles.costBadgeText}>{addon.cost}c</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Active Daily Formula */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Daily Nutrition Stack ({user?.goal === 'fat_loss' ? 'Fat Loss / Cut' : user?.goal === 'muscle' ? 'Muscle Bulking' : 'Maintain'})
          </Text>

          <View style={styles.formulaGlassCard}>
            <IngredientRow 
              icon="💪" 
              name="Whey Isolate Protein" 
              desc="Fast-acting amino profile"
              gram={user?.goal === 'muscle' ? '36g' : '30g'} 
            />
            <IngredientRow 
              icon="🌾" 
              name="Rolled Oats" 
              desc="Slow burning complex carbs"
              gram={user?.goal === 'fat_loss' ? '30g' : '50g'} 
            />
            <IngredientRow 
              icon="🌱" 
              name="Chia Seeds" 
              desc="Omega-3 & fiber boost"
              gram="5g" 
            />
            {user?.goal !== 'fat_loss' && (
              <IngredientRow 
                icon="🥜" 
                name="Roasted Peanut Butter" 
                desc="Healthy fats & clean calories"
                gram="10g" 
              />
            )}
            {addons.map(addon => (
              <IngredientRow 
                key={addon.id} 
                icon={addon.icon} 
                name={addon.name} 
                desc="Custom add-on included"
                gram="Added" 
                highlight={true}
              />
            ))}

            {/* Apple Health 1-Tap Sync Button */}
            <BouncyButton 
              style={[styles.healthSyncBtn, synced && styles.healthSyncBtnDone]} 
              onPress={handleSyncHealth}
              disabled={syncing || synced}
            >
              <Text style={[styles.healthSyncBtnText, synced && styles.healthSyncBtnTextDone]}>
                {syncing ? "Syncing with Apple Health..." : synced ? "✅ Macros Synced to Apple Health" : "🍏 Sync Macros to Apple Health"}
              </Text>
            </BouncyButton>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const IngredientRow = ({ icon, name, desc, gram, highlight }) => (
  <View style={[styles.ingRow, highlight && styles.ingRowHighlight]}>
    <Text style={styles.ingIcon}>{icon}</Text>
    <View style={styles.ingTextCol}>
      <Text style={styles.ingName}>{name}</Text>
      <Text style={styles.ingDesc}>{desc}</Text>
    </View>
    <View style={styles.gramBadge}>
      <Text style={[styles.gramText, highlight && styles.gramTextHighlight]}>{gram}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerGlassCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  headerTextGroup: {
    flex: 1,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  livePulse: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FFC800',
    marginRight: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#71717A',
    letterSpacing: 1,
  },
  userName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  userSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
    fontWeight: '500',
  },
  streakBadgeWrapper: {
    alignItems: 'center',
  },
  streakGlowCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFDF5',
    borderWidth: 2.5,
    borderColor: '#FFC800',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFC800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  streakNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111111',
    marginTop: -2,
  },
  streakLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717A',
    marginTop: 4,
  },
  dropCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },
  dropCardPaused: {
    backgroundColor: '#F4F4F5',
    borderColor: '#E4E4E7',
  },
  dropTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropIconBoxPaused: {
    backgroundColor: '#E4E4E7',
  },
  dropDetails: {
    marginLeft: 14,
    flex: 1,
  },
  dropTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },
  dropSub: {
    fontSize: 13,
    color: '#71717A',
    marginTop: 2,
    lineHeight: 18,
  },
  textMuted: {
    color: '#71717A',
  },
  pauseToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
    paddingTop: 14,
  },
  pauseInfo: {
    flex: 1,
  },
  pauseTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  pauseSub: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  scarcityCard: {
    backgroundColor: '#111111',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  scarcityTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scarcityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  scarcityBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#111111',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  spotsCount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  progressBarTrack: {
    height: 7,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFC800',
    borderRadius: 4,
  },
  scarcityDesc: {
    fontSize: 12,
    color: '#A1A1AA',
    lineHeight: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111111',
    marginLeft: 4,
    letterSpacing: -0.3,
  },
  coinBalanceBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  coinsAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111111',
  },
  addonsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  addonCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  addonCardActive: {
    borderColor: '#FFC800',
    backgroundColor: '#FFFDF5',
  },
  addonEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  addonTextColumn: {
    marginBottom: 10,
  },
  addonTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
  },
  addonSub: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
  },
  addonActionBox: {
    alignItems: 'flex-start',
  },
  costBadge: {
    backgroundColor: '#111111',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  costBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFC800',
  },
  formulaGlassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  ingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },
  ingRowHighlight: {
    backgroundColor: '#FFFDF5',
    borderRadius: 12,
    paddingHorizontal: 8,
    marginVertical: 4,
  },
  ingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  ingTextCol: {
    flex: 1,
  },
  ingName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },
  ingDesc: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  gramBadge: {
    backgroundColor: '#F4F4F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  gramText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
  },
  gramTextHighlight: {
    color: '#D97706',
  },
  healthSyncBtn: {
    backgroundColor: '#111111',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  healthSyncBtnDone: {
    backgroundColor: '#F2FFF5',
    borderWidth: 1,
    borderColor: '#34C759',
  },
  healthSyncBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  healthSyncBtnTextDone: {
    color: '#34C759',
    fontSize: 15,
    fontWeight: '800',
  }
});
