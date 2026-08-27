import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, LogOut, Bell, CircleHelp, MapPin, SmartphoneNfc, Bike, X, CheckCircle2, Database } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import BouncyButton from '../components/BouncyButton';

export default function ProfileScreen() {
  const { user, resetApp } = useAppContext();
  const [showRiderSheet, setShowRiderSheet] = useState(false);

  const handleSimulatePush = () => {
    Alert.alert("🔔 Push Notification (10:00 PM)", `Rider Rahul is packing ${user?.name || 'your'}'s 6AM Stack. Sleep well, see you at 6:00 AM!`);
  };

  const handleLogout = () => {
    Alert.alert(
      "Reset / Log Out",
      "Do you want to test the full Phone OTP & Onboarding flow again?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset App", style: "destructive", onPress: () => resetApp && resetApp() }
      ]
    );
  };

  const dummyDeliveries = [
    { id: '1', house: user?.address || 'Flat 402, Tower B, Green Valley', name: user?.name || 'Anshu', stack: '36g Whey + 50g Oats + 5g Chia', addon: '⚡ +5g Creatine', time: '5:45 AM', silent: true },
    { id: '2', house: 'House #81, Sector 14, Gurugram', name: 'Vikram Mehta', stack: '30g Whey + 40g Oats', addon: '🍫 +Dark Choc', time: '5:52 AM', silent: true },
    { id: '3', house: 'Villa 12, Palm Grove Society', name: 'Rohan Sharma', stack: '36g Whey + 50g Oats (Bulking)', addon: 'None', time: '5:58 AM', silent: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.headerTitle}>Profile</Text>
        
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name || 'A')[0].toUpperCase()}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Zing Member'}</Text>
            <Text style={styles.userPhone}>{user?.phone || '+91 98765 43210'}</Text>
            <Text style={styles.userPlanTag}>{user?.activePlan || '7-Day Pass Active'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Startup Operations & Demo Tools</Text>
        
        {/* 6 AM Rider Dispatch Sheet */}
        <TouchableOpacity style={styles.riderSheetCard} onPress={() => setShowRiderSheet(true)}>
          <Bike color="#000" size={24} />
          <View style={styles.demoText}>
            <Text style={styles.demoTitle}>6:00 AM Rider Dispatch Sheet</Text>
            <Text style={styles.demoSub}>View live doorstep drop route for Rider Rahul</Text>
          </View>
        </TouchableOpacity>

        {/* 10 PM Push Simulation */}
        <TouchableOpacity style={styles.demoCard} onPress={handleSimulatePush}>
          <SmartphoneNfc color="#000" size={24} />
          <View style={styles.demoText}>
            <Text style={styles.demoTitle}>Simulate 10 PM Push</Text>
            <Text style={styles.demoSub}>Trigger the night anticipation notification</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Database Status</Text>
        <View style={styles.supabaseStatusCard}>
          <Database color="#34C759" size={20} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.supabaseTitle}>Supabase Live Sync</Text>
            <Text style={styles.supabaseSub}>Connected to jjzihnqpmbedcrxajmit.supabase.co</Text>
          </View>
          <View style={styles.liveDot} />
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.menuGroup}>
          <MenuRow icon={<MapPin color="#000" size={22} />} title="Delivery Address" subtitle={user?.address || "Add address"} />
          <MenuRow icon={<Bell color="#000" size={22} />} title="Notifications" subtitle="Silent Drop alerts enabled" />
          <MenuRow icon={<Settings color="#000" size={22} />} title="Settings" subtitle="Account & Privacy" isLast={true} />
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuGroup}>
          <MenuRow icon={<CircleHelp color="#000" size={22} />} title="Help Center" />
          <MenuRow icon={<LogOut color="#FF3B30" size={22} />} title="Reset / Log Out" textColor="#FF3B30" isLast={true} onPress={handleLogout} />
        </View>

      </ScrollView>

      {/* 6 AM Rider Dispatch Modal */}
      <Modal visible={showRiderSheet} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>🚴 6:00 AM Rider Manifest</Text>
                <Text style={styles.modalSub}>Rider: Rahul V. • Sector 14 Gurugram Route</Text>
              </View>
              <TouchableOpacity onPress={() => setShowRiderSheet(false)}>
                <X color="#000" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
              {dummyDeliveries.map((item, index) => (
                <View key={item.id} style={styles.dispatchCard}>
                  <View style={styles.dispatchHeader}>
                    <Text style={styles.dispatchIndex}>Stop #{index + 1} • {item.time}</Text>
                    <View style={styles.silentBadge}>
                      <Text style={styles.silentText}>🔇 Bell Mat Bajana</Text>
                    </View>
                  </View>

                  <Text style={styles.dispatchName}>{item.name}</Text>
                  <Text style={styles.dispatchAddress}>📍 {item.house}</Text>

                  <View style={styles.stackTag}>
                    <Text style={styles.stackText}>📦 {item.stack}</Text>
                  </View>
                  {item.addon !== 'None' && (
                    <Text style={styles.addonText}>✨ Add-on: {item.addon}</Text>
                  )}
                </View>
              ))}
            </ScrollView>

            <BouncyButton style={styles.closeBtn} onPress={() => setShowRiderSheet(false)}>
              <Text style={styles.closeBtnText}>Close Manifest</Text>
            </BouncyButton>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const MenuRow = ({ icon, title, subtitle, isLast, textColor = "#000", onPress }) => (
  <TouchableOpacity style={[styles.menuRow, !isLast && styles.menuBorder]} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={[styles.menuTitle, { color: textColor }]}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
  </TouchableOpacity>
);

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
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  userPhone: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  userPlanTag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#34C759',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 12,
    marginLeft: 4,
  },
  riderSheetCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  demoCard: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    alignItems: 'center',
  },
  demoText: {
    marginLeft: 12,
    flex: 1,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  demoSub: {
    fontSize: 13,
    color: '#636366',
    marginTop: 2,
  },
  supabaseStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  supabaseTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  supabaseSub: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34C759',
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 28,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
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
    fontSize: 17,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
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
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  modalSub: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
  },
  dispatchCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  dispatchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dispatchIndex: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
  },
  silentBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  silentText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E7D32',
  },
  dispatchName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  dispatchAddress: {
    fontSize: 14,
    color: '#3A3A3C',
    marginBottom: 8,
  },
  stackTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  stackText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  addonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFB800',
    marginTop: 2,
  },
  closeBtn: {
    backgroundColor: '#000',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  closeBtnText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  }
});
