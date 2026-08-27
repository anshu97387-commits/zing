import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../context/AppContext';
import { Flame, Share2, Award, Copy, Sparkles, Users } from 'lucide-react-native';
import BouncyButton from '../components/BouncyButton';

export default function ReferScreen() {
  const { user } = useAppContext();

  const referralCode = `${(user?.name || 'ZING').toUpperCase().replace(/\s+/g, '')}6AM`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Bro, join the 6 AM Zing Club! Get your personalized dry nutrition stack delivered silently to your door by 6 AM. Use my code ${referralCode} to get 100 Zing Coins & free drops: https://zing.fit/invite/${referralCode}`,
      });
    } catch (error) {
      console.log('Share error:', error.message);
    }
  };

  const handleCopy = () => {
    Alert.alert('Code Copied! 📋', `Share code ${referralCode} with your gym bros to get free morning fuel drops.`);
  };

  const leaderboard = [
    { rank: 1, name: 'Rahul Verma', streak: '24 Invites', isCurrent: false, badge: '👑' },
    { rank: 2, name: `${user?.name || 'You'} (You)`, streak: '21 Invites', isCurrent: true, badge: '🔥' },
    { rank: 3, name: 'Aman Sharma', streak: '19 Invites', isCurrent: false, badge: '🥉' },
    { rank: 4, name: 'Karan Dave', streak: '15 Invites', isCurrent: false, badge: '⚡' },
    { rank: 5, name: 'Vikram Batra', streak: '14 Invites', isCurrent: false, badge: '⚡' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerGroup}>
          <View style={styles.clubTag}>
            <Sparkles color="#111111" size={12} fill="#FFC800" />
            <Text style={styles.clubTagText}>THE 6 AM CLUB</Text>
          </View>
          <Text style={styles.headerTitle}>Invite Gym Bros</Text>
          <Text style={styles.headerSub}>
            Give 100 Zing Coins, Get 100 Zing Coins when they unlock their first 6 AM delivery pass.
          </Text>
        </View>

        {/* Glassmorphic Code Card */}
        <View style={styles.codeGlassCard}>
          <Text style={styles.codeLabel}>YOUR EXCLUSIVE CODE</Text>
          
          <View style={styles.codeBoxRow}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyIconBtn} onPress={handleCopy}>
              <Copy color="#111111" size={20} />
            </TouchableOpacity>
          </View>

          <BouncyButton style={styles.shareBtn} onPress={handleShare}>
            <Share2 color="#111111" size={20} />
            <Text style={styles.shareBtnText}>Share via WhatsApp</Text>
          </BouncyButton>
        </View>

        {/* Gamified Leaderboard */}
        <View style={styles.leaderboardSection}>
          <View style={styles.leaderboardHeaderRow}>
            <Award color="#111111" size={22} />
            <Text style={styles.leaderboardTitle}>Sector 14 Leaderboard</Text>
          </View>
          <Text style={styles.leaderboardSub}>
            You are 3 invites away from overtaking #1 and winning a Lifetime Gold Shaker.
          </Text>

          <View style={styles.leaderboardGlassCard}>
            {leaderboard.map((item, index) => (
              <View 
                key={item.rank} 
                style={[
                  styles.lbRow, 
                  item.isCurrent && styles.lbRowCurrent,
                  index !== leaderboard.length - 1 && styles.lbBorder
                ]}
              >
                <View style={[styles.rankBadge, item.isCurrent && styles.rankBadgeCurrent]}>
                  <Text style={[styles.rankText, item.isCurrent && styles.rankTextCurrent]}>
                    #{item.rank}
                  </Text>
                </View>

                <View style={styles.lbNameCol}>
                  <Text style={[styles.lbName, item.isCurrent && styles.lbNameCurrent]}>
                    {item.name}
                  </Text>
                  <Text style={styles.lbBadgeIcon}>{item.badge}</Text>
                </View>

                <View style={[styles.streakTag, item.isCurrent && styles.streakTagCurrent]}>
                  <Flame color={item.isCurrent ? "#111111" : "#71717A"} size={13} fill={item.isCurrent ? "#FFC800" : "transparent"} />
                  <Text style={[styles.lbStreakText, item.isCurrent && styles.lbStreakTextCurrent]}>
                    {item.streak}
                  </Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerGroup: {
    marginBottom: 20,
  },
  clubTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  clubTagText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#111111',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 6,
    lineHeight: 20,
  },
  codeGlassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    marginBottom: 28,
    borderWidth: 1.5,
    borderColor: '#FFE082',
    shadowColor: '#FFC800',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },
  codeLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#71717A',
    letterSpacing: 1,
    marginBottom: 12,
  },
  codeBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFDF5',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FFC800',
    marginBottom: 16,
  },
  codeText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 2,
  },
  copyIconBtn: {
    padding: 6,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC800',
    height: 56,
    borderRadius: 28,
    shadowColor: '#FFC800',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  shareBtnText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 8,
  },
  leaderboardSection: {
    marginBottom: 20,
  },
  leaderboardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
    marginLeft: 8,
    letterSpacing: -0.3,
  },
  leaderboardSub: {
    fontSize: 13,
    color: '#71717A',
    marginBottom: 16,
    lineHeight: 18,
  },
  leaderboardGlassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  lbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  lbRowCurrent: {
    backgroundColor: '#FFFDF5',
    borderWidth: 1.5,
    borderColor: '#FFC800',
  },
  lbBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankBadgeCurrent: {
    backgroundColor: '#111111',
  },
  rankText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#71717A',
  },
  rankTextCurrent: {
    color: '#FFC800',
  },
  lbNameCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lbName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },
  lbNameCurrent: {
    fontWeight: '900',
    color: '#111111',
  },
  lbBadgeIcon: {
    marginLeft: 6,
    fontSize: 14,
  },
  streakTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  streakTagCurrent: {
    backgroundColor: '#FFF8E1',
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  lbStreakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#71717A',
    marginLeft: 4,
  },
  lbStreakTextCurrent: {
    color: '#111111',
    fontWeight: '800',
  }
});
