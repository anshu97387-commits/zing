import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Zap, LogOut, X, CheckCircle2 } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import { Colors } from '../theme/colors';
import BouncyButton from '../components/BouncyButton';

export default function ProfileScreen() {
  const { user, updateUser, resetApp } = useAppContext();
  const [darkMode, setDarkMode] = useState(true);
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
    { id: '12345', title: '7 Day Stack - ₹1499', status: 'Delivered 6:00 AM' },
    { id: '12344', title: 'Protein Pouch - ₹999', status: 'Delivered 6:00 AM' },
    { id: '12343', title: 'Protein Pouch - ₹999', status: 'Delivered 6:00 AM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Brand Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.logoWhite}>Zing</Text>
          <Text style={styles.logoNeon}>Fit</Text>
        </View>

        {/* 1. MY PROFILE SECTION (Mockup Match) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MY PROFILE</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <User color="#FFFFFF" size={48} />
          </View>

          <Text style={styles.profileName}>Name: {user?.name || 'Arjun Singh'}</Text>
          <Text style={styles.profileMeta}>Email: {email}</Text>
          <Text style={styles.profileMeta}>Phone: {user?.phone || '+91 9876543210'}</Text>

          <TouchableOpacity style={styles.editProfileBtn} onPress={() => setShowEditModal(true)}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* 2. SETTINGS SECTION (Mockup Match) */}
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

        {/* 3. ORDER HISTORY SECTION (Mockup Match) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ORDER HISTORY</Text>
        </View>

        <View style={styles.orderHistoryList}>
          {orderHistory.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderBoltCircle}>
                <Zap color={Colors.neon} size={18} fill={Colors.neon} />
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
                <X color="#FFF" size={24} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalInput}
              placeholder="Name"
              placeholderTextColor="#71717A"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              placeholderTextColor="#71717A"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Phone"
              placeholderTextColor="#71717A"
              value={phone}
              onChangeText={setPhone}
            />

            <BouncyButton style={styles.saveBtn} onPress={handleSaveProfile}>
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </BouncyButton>
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
      trackColor={{ false: '#27272A', true: Colors.neon }}
      thumbColor={value ? '#000' : '#FFF'}
    />
  </View>
);

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
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  profileCard: {
    backgroundColor: '#141416',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#27272A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileMeta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A1A1AA',
    marginBottom: 4,
  },
  editProfileBtn: {
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: Colors.neon,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 12,
  },
  editProfileText: {
    color: Colors.neon,
    fontSize: 13,
    fontWeight: '800',
  },
  settingsCard: {
    backgroundColor: '#141416',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#27272A',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
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
    backgroundColor: '#141416',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  orderBoltCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 255, 0, 0.3)',
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  orderTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#A1A1AA',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#141416',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    color: '#FFFFFF',
  },
  modalInput: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveBtn: {
    backgroundColor: '#1C1C1E',
    borderWidth: 1.5,
    borderColor: Colors.neon,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: Colors.neon,
    fontSize: 16,
    fontWeight: '900',
  }
});
