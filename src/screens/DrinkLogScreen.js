import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Flame } from 'lucide-react-native';
import ZingLogo from '../components/ZingLogo';
import BottomDock from '../components/BottomDock';
import BouncyButton from '../components/BouncyButton';
import { Colors } from '../theme/colors';

export default function DrinkLogScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState('Wed');

  const weekDays = [
    { day: 'Mon', active: false },
    { day: 'Tue', active: false },
    { day: 'Wed', active: true, checked: true },
    { day: 'Thu', active: false },
    { day: 'Fri', active: false },
    { day: 'Sat', active: false },
    { day: 'Sun', active: false },
  ];

  const logs = [
    {
      id: '1',
      date: 'Today, Aug 26',
      time: '6:00 AM - Standard Fuel Mix 🥤',
      duration: 'Duration: 5 mins',
    },
    {
      id: '2',
      date: 'Yesterday, Aug 25',
      time: '6:15 AM - Standard Fuel Mix 🥤',
      duration: 'Duration: 5 mins',
    },
    {
      id: '3',
      date: 'Aug 24',
      time: '5:55 AM - Standard Fuel Mix 🥤',
      duration: 'Duration: 4 mins',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Row: Zing Logo + Top Right Floating Wallet Card */}
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

        {/* Weekly Calendar Strip (Exact Mockup Match) */}
        <View style={styles.calendarStrip}>
          {weekDays.map((item) => {
            const isSelected = selectedDay === item.day;
            return (
              <TouchableOpacity
                key={item.day}
                style={[styles.dayCol, isSelected && styles.dayColActive]}
                onPress={() => setSelectedDay(item.day)}
                activeOpacity={0.8}
              >
                <Text style={[styles.dayText, isSelected && styles.dayTextActive]}>
                  {item.day}
                </Text>
                {item.checked && (
                  <Check color="#111111" size={14} strokeWidth={3} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Drink Log Heading & Streak Stat (Exact Mockup Match) */}
        <Text style={styles.headingTitle}>DRINK LOG</Text>
        <Text style={styles.streakSub}>
          🥤 YOUR 30-DAY STREAK: <Text style={styles.streakBold}>19 DAYS 🔥 🥤</Text>
        </Text>

        {/* Log List Cards */}
        <View style={styles.logsList}>
          {logs.map((log) => (
            <TouchableOpacity 
              key={log.id} 
              style={styles.logCard}
              onPress={() => navigation.navigate('DrinkLogDetail')}
              activeOpacity={0.85}
            >
              <Text style={styles.logDate}>{log.date}</Text>
              
              <View style={styles.logMainRow}>
                <View style={styles.checkBubble}>
                  <Check color="#111111" size={14} strokeWidth={3} />
                </View>
                <Text style={styles.logTimeText}>{log.time}</Text>
              </View>

              <Text style={styles.logDuration}>{log.duration}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Button: ADD NEW LOG */}
        <View style={styles.buttonShadowWrapper}>
          <BouncyButton 
            style={styles.addLogBtn} 
            onPress={() => navigation.navigate('DrinkLogDetail')}
          >
            <Text style={styles.addLogText}>ADD NEW LOG</Text>
          </BouncyButton>
        </View>

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
    marginBottom: 20,
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
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  dayCol: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 42,
  },
  dayColActive: {
    backgroundColor: '#E6FF55',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#71717A',
  },
  dayTextActive: {
    color: '#111111',
    fontWeight: '900',
  },
  checkIcon: {
    marginTop: 2,
  },
  headingTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 4,
  },
  streakSub: {
    fontSize: 13,
    color: '#71717A',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 24,
  },
  streakBold: {
    color: '#111111',
    fontWeight: '900',
  },
  logsList: {
    gap: 14,
    marginBottom: 20,
  },
  logCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  logDate: {
    fontSize: 13,
    fontWeight: '700',
    color: '#71717A',
    marginBottom: 8,
  },
  logMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  checkBubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D4FF00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logTimeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
  },
  logDuration: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 28,
  },
  buttonShadowWrapper: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 10,
  },
  addLogBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  addLogText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
