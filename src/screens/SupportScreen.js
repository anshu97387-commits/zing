import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Mail, ChevronRight } from 'lucide-react-native';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';
import BottomDock from '../components/BottomDock';
import { Colors } from '../theme/colors';

export default function SupportScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Row */}
        <View style={styles.topHeaderRow}>
          <ZingLogo size={28} />

          <View style={styles.floatingWalletCard}>
            <Text style={styles.walletAmount}>₹2,450</Text>
            <Text style={styles.walletLabel}>Total Wallet Balance</Text>
          </View>
        </View>

        {/* Heading */}
        <Text style={styles.headingTitle}>HELP & SUPPORT</Text>
        <Text style={styles.subHeading}>Frequently Asked Questions</Text>

        {/* FAQs */}
        <View style={styles.faqList}>
          <TouchableOpacity style={styles.faqCard} activeOpacity={0.7}>
            <View style={styles.faqLeft}>
              <Text style={styles.faqQuestion}>How do I pause my subscription?</Text>
              <Text style={styles.faqAnswer} numberOfLines={1}>You can pause your daily fuel delivery...</Text>
            </View>
            <ChevronRight color="#C7C7CC" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqCard} activeOpacity={0.7}>
            <View style={styles.faqLeft}>
              <Text style={styles.faqQuestion}>What are the delivery timings?</Text>
              <Text style={styles.faqAnswer} numberOfLines={2}>Deliveries are made between 5:45 AM and 7:00 AM...</Text>
            </View>
            <ChevronRight color="#C7C7CC" size={20} />
          </TouchableOpacity>
        </View>

        {/* Contact Options */}
        <View style={styles.contactList}>
          <TouchableOpacity style={styles.contactCard} activeOpacity={0.7}>
            <MessageSquare color="#111111" size={20} style={styles.contactIcon} />
            <View style={styles.contactLeft}>
              <Text style={styles.contactTitle}>Chat with Us</Text>
              <Text style={styles.contactSub}>Live Chat Support</Text>
            </View>
            <ChevronRight color="#C7C7CC" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} activeOpacity={0.7}>
            <Mail color="#111111" size={20} style={styles.contactIcon} />
            <View style={styles.contactLeft}>
              <Text style={styles.contactTitle}>Email Support</Text>
              <Text style={styles.contactSub}>Send us an Email</Text>
            </View>
            <ChevronRight color="#C7C7CC" size={20} />
          </TouchableOpacity>
        </View>

        {/* Action Button: CALL SUPPORT */}
        <BouncyButton style={styles.callBtn}>
          <Text style={styles.callBtnText}>CALL SUPPORT</Text>
        </BouncyButton>

        <Text style={styles.timingText}>Available 6 AM - 10 PM, Mon-Sun</Text>

      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.floatingDock}>
        <BottomDock label="Order Now Stack" onPress={() => {}} />
      </View>
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
    paddingBottom: 120, // space for dock
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
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.75,
    shadowRadius: 14,
    elevation: 6,
    alignItems: 'center',
    minWidth: 140,
  },
  walletAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  walletLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#71717A',
    marginTop: 2,
  },
  headingTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717A',
    marginBottom: 12,
  },
  faqList: {
    gap: 12,
    marginBottom: 24,
  },
  faqCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  faqLeft: {
    flex: 1,
    paddingRight: 10,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
    lineHeight: 18,
  },
  contactList: {
    gap: 12,
    marginBottom: 30,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  contactIcon: {
    marginRight: 14,
  },
  contactLeft: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
  },
  contactSub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
    marginTop: 2,
  },
  callBtn: {
    backgroundColor: '#333333',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  callBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  timingText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
    textDecorationLine: 'underline',
  },
  floatingDock: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  }
});
