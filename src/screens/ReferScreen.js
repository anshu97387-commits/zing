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
        message: `Bro, join the 6 AM ZingFit Club! Get your custom morning nutrition stack delivered silently to your door by 6 AM. Use code ${referralCode} for 100 Zing Coins: https://zing.fit/invite/${referralCode}`,
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
          <Text style={styles.logoWhite}>Zing</Text>
          <Text style={styles.logoNeon}>Fit</Text>
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
              <Copy color={Colors.neon} size={20} />
            </TouchableOpacity>
          </View>

          <BouncyButton style={styles.shareBtn} onPress={handleShare}>
            <Share2 color="#000" size={18} />
            <Text style={styles.shareBtnText}>SHARE VIA WHATSAPP</Text>
          </BouncyButton>
        </View>

        {/* Leaderboard Section */}
        <View style={styles.sectionHead}>
          <Award color={Colors.neon} size={20} />
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
                <Flame color={item.isCurrent ? "#000" : Colors.neon} size={14} fill={item.isCurrent ? "#000" : Colors.neon} />
                <Text style={[styles.streakText, item.isCurrent && styles.streakTextCurrent]}>
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
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoWhite: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  logoNeon: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.neon,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
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
    backgroundColor: '#141416',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 255, 0, 0.35)',
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 4,
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
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: Colors.neon,
    marginBottom: 16,
  },
  codeText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  copyBtn: {
    padding: 4,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neon,
    height: 54,
    borderRadius: 27,
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  shareBtnText: {
    color: '#000000',
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
    color: '#FFFFFF',
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
    backgroundColor: '#141416',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  lbRowCurrent: {
    borderColor: Colors.neon,
    backgroundColor: '#18181A',
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  rankBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankBoxCurrent: {
    backgroundColor: Colors.neon,
  },
  rankText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#8E8E93',
  },
  rankTextCurrent: {
    color: '#000000',
  },
  lbInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lbName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#D4D4D8',
  },
  lbNameCurrent: {
    fontWeight: '900',
    color: '#FFFFFF',
  },
  lbBadge: {
    fontSize: 14,
    marginLeft: 6,
  },
  streakTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  streakTagCurrent: {
    backgroundColor: Colors.neon,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.neon,
    marginLeft: 4,
  },
  streakTextCurrent: {
    color: '#000000',
  }
});
