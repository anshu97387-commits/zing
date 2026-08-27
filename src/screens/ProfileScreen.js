import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, LogOut, Bell, CircleHelp, MapPin, SmartphoneNfc } from 'lucide-react-native';

export default function ProfileScreen() {
  
  const handleSimulatePush = () => {
    Alert.alert("🔔 Push Notification Sim", "Rider Rahul is packing your 120g Muscle Stack. Sleep well, see you at 6 AM.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.headerTitle}>Profile</Text>
        
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Anshu</Text>
            <Text style={styles.userPhone}>+91 98765 43210</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Demo Tools</Text>
        <TouchableOpacity style={styles.demoCard} onPress={handleSimulatePush}>
          <SmartphoneNfc color="#000" size={24} />
          <View style={styles.demoText}>
            <Text style={styles.demoTitle}>Simulate 10 PM Push</Text>
            <Text style={styles.demoSub}>Trigger the anticipation notification</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.menuGroup}>
          <MenuRow icon={<MapPin color="#000" size={22} />} title="Delivery Address" subtitle="Sector 14, Gurugram" />
          <MenuRow icon={<Bell color="#000" size={22} />} title="Notifications" subtitle="Push & SMS enabled" />
          <MenuRow icon={<Settings color="#000" size={22} />} title="Settings" subtitle="Account & Privacy" isLast={true} />
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuGroup}>
          <MenuRow icon={<CircleHelp color="#000" size={22} />} title="Help Center" />
          <MenuRow icon={<LogOut color="#FF3B30" size={22} />} title="Log Out" textColor="#FF3B30" isLast={true} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const MenuRow = ({ icon, title, subtitle, isLast, textColor = "#000" }) => (
  <TouchableOpacity style={[styles.menuRow, !isLast && styles.menuBorder]}>
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
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  userPhone: {
    fontSize: 15,
    color: '#8E8E93',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 12,
    marginLeft: 8,
  },
  demoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF0ED',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  demoText: {
    marginLeft: 12,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  demoSub: {
    fontSize: 13,
    color: '#4A4A4A',
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 32,
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
});
