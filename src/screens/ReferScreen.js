import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../context/AppContext';
import { Flame, Share2, Award, Copy, Zap } from 'lucide-react-native';
import { Colors } from '../theme/colors';
import BouncyButton from '../components/BouncyButton';

export default function ReferScreen() {
  const { user } = useAppContext();

  const referralCode = `${(user?.name || 'ZING').toUpperCase().replace(/\s+/g, '')}6AM`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Bro, join the 6 AM Zing Club! Get your custom morning nutrition stack delivered silently to your door by 6 AM. Use code ${referralCode} for 100 Zing Coins: https://zing.fit/invite/${referralCode}`,
      });
    } catch (error) {
      console.log('Share error:', error.message);
    }
  };

  const handleCopy = () => {
    Alert.alert('Code Copied! 📋', `Share code ${referralCode} to earn free 6 AM drops.`);
  };

  const leaderboard = [
    { rank: 1, name: 'Rahul Verma', streak: '24 Invites', isCurrent: false, badge: '👑' },
    { rank: 2, name: `${user?.name || 'You'} (You)`, streak: '21 Invites', isCurrent: true, badge: '🔥' },
    { rank: 3, name: 'Aman Sharma', streak: '19 Invites', isCurrent: false, badge: '⚡' },
    { rank: 4, name: 'Karan Dave', streak: '15 Invites', isCurrent: false, badge: '⚡' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Brand Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>Zing</Text>
          <View style={styles.logoDot} />
        </View>

        <Text style={styles.headerTitle}>THE 6 AM CLUB</Text>
        <Text style={styles.headerSub}>
          Invite your gym bros. Earn 100 Zing Coins for each friend who unlocks a 6 AM pass.
        </Text>

        {/* Code Card */}
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>YOUR PERSONAL INVITE CODE</Text>
          
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
              <Copy color="#111111" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.glowButtonWrapper}>
            <BouncyButton style={styles.shareBtn} onPress={handleShare}>
              <Share2 color="#FFFFFF" size={18} />
              <Text style={styles.shareBtnText}>SHARE VIA WHATSAPP</Text>
            </BouncyButton>
          </View>
        </View>

        {/* Leaderboard Section */}
        <View style={styles.sectionHead}>
          <Award color="#111111" size={20} />
          <Text style={styles.sectionTitle}>Sector 14 Leaderboard</Text>
        </View>
        <Text style={styles.sectionSub}>You're so close to #1! One more invite to take the crown.</Text>

        <View style={styles.leaderboardList}>
          {leaderboard.map((item, index) => (
            <View 
              key={item.rank} 
              style={[
                styles.lbRow, 
                item.isCurrent && styles.lbRowCurrent,
              ]}
            >
              <View style={[styles.rankBox, item.isCurrent && styles.rankBoxCurrent]}>
                <Text style={[styles.rankText, item.isCurrent && styles.rankTextCurrent]}>
                  #{item.rank}
                </Text>
              </View>

              <View style={styles.lbInfo}>
                <Text style={[styles.lbName, item.isCurrent && styles.lbNameCurrent]}>
                  {item.name}
                </Text>
                <Text style={styles.lbBadge}>{item.badge}</Text>
              </View>

              <View style={[styles.streakTag, item.isCurrent && styles.streakTagCurrent]}>
                <Flame color="#111111" size={14} fill={Colors.yellow} />
                <Text style={styles.streakText}>
                  {item.streak}
                </Text>
              </View>
            </View>
          ))}
        </View>

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
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
    marginBottom: 24,
    lineHeight: 18,
  },
  codeCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 28,
  },
  codeLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#8E8E93',
    letterSpacing: 1,
    marginBottom: 12,
  },
  codeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 16,
  },
  codeText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 2,
  },
  copyBtn: {
    padding: 4,
  },
  glowButtonWrapper: {
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 8,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
    height: 54,
    borderRadius: 18,
  },
  shareBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111111',
    marginLeft: 8,
  },
  sectionSub: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 16,
  },
  leaderboardList: {
    gap: 12,
  },
  lbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  lbRowCurrent: {
    borderColor: '#111111',
    backgroundColor: '#FFFFFF',
  },
  rankBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankBoxCurrent: {
    backgroundColor: '#111111',
  },
  rankText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#71717A',
  },
  rankTextCurrent: {
    color: '#FFFFFF',
  },
  lbInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lbName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3A3A3C',
  },
  lbNameCurrent: {
    fontWeight: '900',
    color: '#111111',
  },
  lbBadge: {
    fontSize: 14,
    marginLeft: 6,
  },
  streakTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  streakTagCurrent: {
    borderColor: '#111111',
  },
  streakText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111111',
    marginLeft: 4,
  }
});
