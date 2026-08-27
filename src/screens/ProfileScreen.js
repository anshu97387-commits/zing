import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Package, CreditCard, Moon, Bell, HelpCircle, ChevronRight, LogOut, X } from 'lucide-react-native';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../theme/colors';

export default function ProfileScreen({ navigation }) {
  const { user, updateUser, resetApp } = useAppContext();
  const [darkMode, setDarkMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState(user?.name || 'Arjun Singh');
  const [phone, setPhone] = useState(user?.phone || '+91 9876543210');

  const handleSaveProfile = () => {
    updateUser({ name, phone });
    setShowEditModal(false);
    Alert.alert('Profile Saved', 'Your details have been updated.');
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of Zing?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: () => resetApp && resetApp() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Row: Zing Logo + Top Right Floating Wallet Card */}
        <View style={styles.topHeaderRow}>
          <ZingLogo size={28} />

          {/* Floating Wallet Card with Yellow Ambient Glow */}
          <TouchableOpacity 
            style={styles.floatingWalletCard}
            onPress={() => navigation.navigate('WalletTransactions')}
            activeOpacity={0.85}
          >
            <Text style={styles.walletAmount}>₹2,450</Text>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <Text style={styles.headingTitle}>SETTINGS</Text>

        {/* User Profile Card (Exact Mockup Match) */}
        <TouchableOpacity 
          style={styles.profileCard} 
          onPress={() => setShowEditModal(true)}
          activeOpacity={0.85}
        >
          <View style={styles.avatarCircle}>
            <User color="#111111" size={28} />
          </View>
          <View style={styles.profileTextCol}>
            <Text style={styles.profileName}>{user?.name || 'Arjun Singh'}</Text>
            <Text style={styles.profilePhone}>{user?.phone || '+91 9876543210'}</Text>
          </View>
        </TouchableOpacity>

        {/* Settings List (Exact Mockup Match) */}
        <View style={styles.settingsList}>
          {/* 1. Subscription Details */}
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => navigation.navigate('Subscription')}
            activeOpacity={0.7}
          >
            <Package color="#111111" size={18} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Subscription Details</Text>
            <ChevronRight color="#C7C7CC" size={18} />
          </TouchableOpacity>

          {/* 2. Payment Methods */}
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => navigation.navigate('Pass')}
            activeOpacity={0.7}
          >
            <CreditCard color="#111111" size={18} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Payment Methods</Text>
            <ChevronRight color="#C7C7CC" size={18} />
          </TouchableOpacity>

          {/* 3. Dark Mode (Off) with Switch */}
          <View style={styles.settingItem}>
            <Moon color="#111111" size={18} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Dark Mode ({darkMode ? 'On' : 'Off'})</Text>
            <Switch 
              value={darkMode} 
              onValueChange={setDarkMode} 
              trackColor={{ false: '#E5E5EA', true: '#D4FF00' }}
              thumbColor={darkMode ? '#111111' : '#FFFFFF'}
            />
          </View>

          {/* 4. Notifications */}
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => Alert.alert("Notifications", "6:00 AM drop delivery alerts are active.")}
            activeOpacity={0.7}
          >
            <Bell color="#111111" size={18} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Notifications</Text>
            <ChevronRight color="#C7C7CC" size={18} />
          </TouchableOpacity>

          {/* 5. Help & Support */}
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => navigation.navigate('Support')}
            activeOpacity={0.7}
          >
            <HelpCircle color="#111111" size={18} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Help & Support</Text>
            <ChevronRight color="#C7C7CC" size={18} />
          </TouchableOpacity>
        </View>

        {/* Action Button: LOG OUT */}
        <View style={styles.buttonShadowWrapper}>
          <BouncyButton style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutBtnText}>LOG OUT</Text>
          </BouncyButton>
        </View>

      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={showEditModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHead}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <X color="#000" size={24} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalInput}
              placeholder="Full Name"
              placeholderTextColor="#A1A1AA"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Phone Number"
              placeholderTextColor="#A1A1AA"
              value={phone}
              onChangeText={setPhone}
            />

            <BouncyButton style={styles.saveModalBtn} onPress={handleSaveProfile}>
              <Text style={styles.saveModalText}>Save Changes</Text>
            </BouncyButton>
          </View>
        </View>
      </Modal>
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
  headingTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  profileTextCol: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
  },
  settingsList: {
    gap: 10,
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
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
  logoutBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoutBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
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
  modalHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111111',
  },
  modalInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  saveModalBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveModalText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  }
});
