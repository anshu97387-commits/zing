import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Zap, LogOut, X } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../theme/colors';
import BouncyButton from '../components/BouncyButton';

export default function ProfileScreen() {
  const { user, updateUser, resetApp } = useAppContext();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [subDetails, setSubDetails] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState(user?.name || 'Arjun Singh');
  const [email, setEmail] = useState('arjun.s@zing.fit');
  const [phone, setPhone] = useState(user?.phone || '+91 9876543210');

  const handleSaveProfile = () => {
    updateUser({ name, phone });
    setShowEditModal(false);
    Alert.alert('Profile Updated', 'Your profile details have been saved.');
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: () => resetApp && resetApp() }
      ]
    );
  };

  const orderHistory = [
    { id: '12345', title: '7 Day Stack - ₹1499' },
    { id: '12344', title: 'Protein Pouch - ₹999' },
    { id: '12343', title: 'Protein Pouch - ₹999' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Brand: Zing */}
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>Zing</Text>
          <View style={styles.logoDot} />
        </View>

        {/* 1. MY PROFILE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MY PROFILE</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <User color="#111111" size={44} />
          </View>

          <Text style={styles.profileName}>Name: {user?.name || 'Arjun Singh'}</Text>
          <Text style={styles.profileMeta}>Email: {email}</Text>
          <Text style={styles.profileMeta}>Phone: {user?.phone || '+91 9876543210'}</Text>

          <TouchableOpacity style={styles.editProfileBtn} onPress={() => setShowEditModal(true)}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* 2. SETTINGS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
        </View>

        <View style={styles.settingsCard}>
          <SettingSwitchRow 
            label="Dark Mode (On)" 
            value={darkMode} 
            onValueChange={setDarkMode} 
          />
          <SettingSwitchRow 
            label="Notifications" 
            value={notifications} 
            onValueChange={setNotifications} 
          />
          <SettingSwitchRow 
            label="Subscription Details" 
            value={subDetails} 
            onValueChange={setSubDetails} 
          />
          <SettingSwitchRow 
            label="Payment Methods" 
            value={paymentMethods} 
            onValueChange={setPaymentMethods} 
          />

          <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
            <LogOut color="#EF4444" size={18} />
          </TouchableOpacity>
        </View>

        {/* 3. ORDER HISTORY */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ORDER HISTORY</Text>
        </View>

        <View style={styles.orderHistoryList}>
          {orderHistory.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderBoltCircle}>
                <Zap color="#111111" size={16} fill={Colors.yellow} />
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>Order #{order.id}</Text>
                <Text style={styles.orderTitle}>{order.title}</Text>
              </View>
            </View>
          ))}
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
              placeholder="Name"
              placeholderTextColor="#A1A1AA"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              placeholderTextColor="#A1A1AA"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Phone"
              placeholderTextColor="#A1A1AA"
              value={phone}
              onChangeText={setPhone}
            />

            <View style={styles.glowButtonWrapper}>
              <BouncyButton style={styles.saveBtn} onPress={handleSaveProfile}>
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </BouncyButton>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const SettingSwitchRow = ({ label, value, onValueChange }) => (
  <View style={styles.settingRow}>
    <Text style={styles.settingLabel}>{label}</Text>
    <Switch 
      value={value} 
      onValueChange={onValueChange} 
      trackColor={{ false: '#E5E5EA', true: Colors.yellow }}
      thumbColor={value ? '#111111' : '#FFFFFF'}
    />
  </View>
);

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
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 1,
  },
  profileCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 4,
  },
  profileMeta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717A',
    marginBottom: 4,
  },
  editProfileBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 10,
  },
  editProfileText: {
    color: '#111111',
    fontSize: 13,
    fontWeight: '800',
  },
  settingsCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },
  logoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
  },
  orderHistoryList: {
    gap: 12,
    marginBottom: 24,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  orderBoltCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 2,
  },
  orderTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
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
  glowButtonWrapper: {
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 8,
  },
  saveBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  }
});
