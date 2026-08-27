import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, LogOut, Bell, CircleHelp, MapPin, ChevronRight, CheckCircle2, X, Shield, Sparkles, Phone } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import BouncyButton from '../components/BouncyButton';

export default function ProfileScreen() {
  const { user, updateUser, resetApp } = useAppContext();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [editAddress, setEditAddress] = useState(user?.address || 'Flat 402, Tower B, Green Valley');
  const [editInstructions, setEditInstructions] = useState(user?.instructions || 'Hang pouch on the door handle');
  const [silentDropNotifs, setSilentDropNotifs] = useState(true);

  const handleSaveAddress = () => {
    if (editAddress.trim().length === 0) {
      Alert.alert('Address Required', 'Please enter your complete doorstep delivery address.');
      return;
    }
    updateUser({
      address: editAddress.trim(),
      instructions: editInstructions.trim(),
    });
    setShowAddressModal(false);
    Alert.alert('Address Updated ✅', 'Your 6:00 AM drops will now be delivered to this updated location.');
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out / Reset",
      "Do you want to log out and test the Phone OTP login flow again?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: () => resetApp && resetApp() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.headerTitle}>Account</Text>
        
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name || 'A')[0].toUpperCase()}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Arjun Sharma'}</Text>
            <Text style={styles.userPhone}>{user?.phone || '+91 98765 43210'}</Text>
            <View style={styles.membershipPill}>
              <Sparkles color="#FFC800" size={12} fill="#FFC800" />
              <Text style={styles.membershipText}>{user?.activePlan || '7-Day Pass Active'}</Text>
            </View>
          </View>
        </View>

        {/* Quick Delivery Address Card */}
        <Text style={styles.sectionTitle}>Doorstep Delivery</Text>
        <TouchableOpacity 
          style={styles.addressCard} 
          activeOpacity={0.85}
          onPress={() => {
            setEditAddress(user?.address || '');
            setEditInstructions(user?.instructions || '');
            setShowAddressModal(true);
          }}
        >
          <View style={styles.addressIconCircle}>
            <MapPin color="#111111" size={22} />
          </View>
          <View style={styles.addressInfo}>
            <View style={styles.addressHeaderRow}>
              <Text style={styles.addressLabel}>Active Delivery Address</Text>
              <Text style={styles.changeActionText}>Edit</Text>
            </View>
            <Text style={styles.addressText} numberOfLines={2}>
              {user?.address || 'Set your doorstep delivery address'}
            </Text>
            <Text style={styles.instructionsText}>
              Note: {user?.instructions || 'Hang pouch on door handle (Silent 6 AM Drop)'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.menuGroup}>
          <View style={styles.menuRow}>
            <View style={styles.menuIconContainer}>
              <Bell color="#111111" size={20} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Silent 6 AM Drop Alerts</Text>
              <Text style={styles.menuSubtitle}>Notification when packet is dropped at door</Text>
            </View>
            <Switch 
              value={silentDropNotifs} 
              onValueChange={setSilentDropNotifs} 
              trackColor={{ false: '#E4E4E7', true: '#FFC800' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Help & Support Section */}
        <Text style={styles.sectionTitle}>Support & Safety</Text>
        <View style={styles.menuGroup}>
          <MenuRow 
            icon={<CircleHelp color="#111111" size={20} />} 
            title="How Zing Works & FAQs" 
            subtitle="0% Spoilage & 6 AM delivery explained"
            onPress={() => setShowHelpModal(true)}
          />
          <MenuRow 
            icon={<Shield color="#34C759" size={20} />} 
            title="Clean Nutrition & Lab Quality" 
            subtitle="100% genuine sealed ingredients"
            onPress={() => Alert.alert("🛡️ Lab Tested Quality", "Every Zing vacuum pouch contains 100% genuine raw whey isolate, certified rolled oats, and fresh seeds with zero adulteration.")}
          />
          <MenuRow 
            icon={<LogOut color="#EF4444" size={20} />} 
            title="Log Out / Reset" 
            textColor="#EF4444" 
            isLast={true} 
            onPress={handleLogout} 
          />
        </View>

        {/* Footer Brand */}
        <View style={styles.brandFooter}>
          <Text style={styles.footerZing}>ZING</Text>
          <Text style={styles.footerSub}>DELIVERING MORNING FUEL • ZERO SPOILAGE</Text>
          <Text style={styles.versionText}>Version 1.0.4</Text>
        </View>

      </ScrollView>

      {/* Edit Address Modal */}
      <Modal visible={showAddressModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Delivery Address</Text>
                <Text style={styles.modalSub}>Where our rider should drop your 6 AM stack</Text>
              </View>
              <TouchableOpacity onPress={() => setShowAddressModal(false)}>
                <X color="#000" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>House No, Tower, Society / Street</Text>
              <TextInput
                style={[styles.modalInput, styles.modalTextArea]}
                placeholder="e.g. Flat 402, Tower B, Green Valley Apartments"
                placeholderTextColor="#A1A1AA"
                multiline
                numberOfLines={3}
                value={editAddress}
                onChangeText={setEditAddress}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Drop Instructions (Silent Delivery)</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Hang on door handle, bell mat bajana"
                placeholderTextColor="#A1A1AA"
                value={editInstructions}
                onChangeText={setEditInstructions}
              />
            </View>

            <BouncyButton style={styles.saveBtn} onPress={handleSaveAddress}>
              <Text style={styles.saveBtnText}>Save Address</Text>
            </BouncyButton>

          </View>
        </View>
      </Modal>

      {/* FAQs & Help Modal */}
      <Modal visible={showHelpModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Frequently Asked Questions</Text>
              <TouchableOpacity onPress={() => setShowHelpModal(false)}>
                <X color="#000" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 350 }} showsVerticalScrollIndicator={false}>
              <FaqItem 
                q="Subah 6:00 AM delivery kaise hoti hai?" 
                a="Humare delivery riders raat ko fresh dry stacks pack karte hain aur subah 6 AM sharp aapke darwaze par pouch drop karte hain bina bell bajaye."
              />
              <FaqItem 
                q="Agar main bahar gaya toh kya hoga?" 
                a="Aap Home screen se 'Vacation Mode' on kar sakte hain. Aapka wallet balance save rahega aur ek din aage shift ho jayega."
              />
              <FaqItem 
                q="Pouch mein kya-kya hota hai?" 
                a="Aapke selected goal ke hisab se exact gram raw whey protein, rolled oats, chia seeds aur roasted peanut butter ka dry vacuum pouch."
              />
            </ScrollView>

            <BouncyButton style={styles.saveBtn} onPress={() => setShowHelpModal(false)}>
              <Text style={styles.saveBtnText}>Got it</Text>
            </BouncyButton>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const FaqItem = ({ q, a }) => (
  <View style={styles.faqBox}>
    <Text style={styles.faqQ}>Q: {q}</Text>
    <Text style={styles.faqA}>{a}</Text>
  </View>
);

const MenuRow = ({ icon, title, subtitle, isLast, textColor = "#111111", onPress }) => (
  <TouchableOpacity style={[styles.menuRow, !isLast && styles.menuBorder]} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={[styles.menuTitle, { color: textColor }]}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <ChevronRight color="#C7C7CC" size={18} />
  </TouchableOpacity>
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
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFC800',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
  },
  userPhone: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 2,
    fontWeight: '500',
  },
  membershipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  membershipText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#111111',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#71717A',
    textTransform: 'uppercase',
    marginBottom: 10,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  addressIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  addressInfo: {
    flex: 1,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#71717A',
    textTransform: 'uppercase',
  },
  changeActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#D97706',
  },
  addressText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    lineHeight: 20,
  },
  instructionsText: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 4,
    fontStyle: 'italic',
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    marginBottom: 24,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },
  menuIconContainer: {
    width: 32,
    alignItems: 'center',
  },
  menuTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#71717A',
    marginTop: 2,
  },
  brandFooter: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerZing: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 3,
  },
  footerSub: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A1A1AA',
    letterSpacing: 1,
    marginTop: 4,
  },
  versionText: {
    fontSize: 12,
    color: '#D4D4D8',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
  },
  modalSub: {
    fontSize: 13,
    color: '#71717A',
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#71717A',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: '#F4F4F5',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
  },
  modalTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: '#111111',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  faqBox: {
    backgroundColor: '#F4F4F5',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  faqQ: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 4,
  },
  faqA: {
    fontSize: 13,
    color: '#71717A',
    lineHeight: 18,
  }
});
