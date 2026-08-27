import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../context/AppContext';
import { Flame, Bell, MapPin, ChevronRight, Share2, Award } from 'lucide-react-native';

export default function ReferScreen() {
  const { user } = useAppContext();

  const leaderboard = [
    { rank: 1, name: 'Rahul V.', streak: '24', current: false },
    { rank: 2, name: user?.name || 'You', streak: '21', current: true },
    { rank: 3, name: 'Aman S.', streak: '19', current: false },
    { rank: 4, name: 'Karan D.', streak: '15', current: false },
    { rank: 5, name: 'Vikram B.', streak: '14', current: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>The 6 AM Club</Text>
          <Text style={styles.headerSub}>Invite your gym bros. Free stacks for both.</Text>
        </View>

        {/* Code Card */}
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>Your Personal Code</Text>
          <View style={styles.codeRow}>
            <Text style={styles.codeText}>{(user?.name || 'ZING').toUpperCase()}6AM</Text>
            <TouchableOpacity style={styles.shareBtn}>
              <Share2 color="#000" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Leaderboard */}
        <View style={styles.leaderboardSection}>
          <View style={styles.leaderboardHeader}>
            <Award color="#000" size={24} />
            <Text style={styles.leaderboardTitle}>Local Leaderboard</Text>
          </View>
          <Text style={styles.leaderboardSub}>You're so close to #1! One more invite to take the crown.</Text>

          <View style={styles.leaderboardCard}>
            {leaderboard.map((item, index) => (
              <View key={item.rank} style={[styles.leaderboardRow, item.current && styles.leaderboardRowCurrent, index !== leaderboard.length - 1 && styles.leaderboardBorder]}>
                <View style={styles.rankContainer}>
                  <Text style={[styles.rankText, item.current && styles.textCurrent]}>#{item.rank}</Text>
                </View>
                <Text style={[styles.lbName, item.current && styles.textCurrent]}>{item.name}</Text>
                <View style={styles.streakInfo}>
                  <Flame color={item.current ? '#FFB800' : '#8E8E93'} size={14} />
                  <Text style={[styles.lbStreak, item.current && styles.textCurrent]}>{item.streak} Invites</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
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
  },
  codeCard: {
    backgroundColor: '#000',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
  },
  codeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  codeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 2,
  },
  shareBtn: {
    backgroundColor: '#FFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderboardSection: {
    marginBottom: 32,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  leaderboardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginLeft: 10,
  },
  leaderboardSub: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 20,
  },
  leaderboardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  leaderboardRowCurrent: {
    backgroundColor: '#FFF8E1',
  },
  leaderboardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  rankContainer: {
    width: 40,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8E8E93',
  },
  lbName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lbStreak: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8E8E93',
    marginLeft: 6,
  },
  textCurrent: {
    color: '#FFB800',
  }
});
