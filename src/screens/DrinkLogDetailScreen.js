import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Edit3, ArrowLeft } from 'lucide-react-native';
import ZingLogo from '../components/ZingLogo';
import BouncyButton from '../components/BouncyButton';

export default function DrinkLogDetailScreen({ navigation }) {
  const [note, setNote] = useState('Felt great, good energy for the 6 AM session!');
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveLog = () => {
    setIsEditing(false);
    Alert.alert("Log Updated", "Your morning drink notes have been saved.");
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
            onPress={() => navigation.navigate('Pass')}
            activeOpacity={0.85}
          >
            <Text style={styles.walletAmount}>₹2,450</Text>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
          </TouchableOpacity>
        </View>

        {/* Heading & Subtitle */}
        <Text style={styles.headingTitle}>DRINK LOG</Text>
        <Text style={styles.subtitle}>Today, Aug 26 🥤</Text>

        {/* Log Summary Card with Pouch Thumbnail & Green Check (Exact Mockup Match) */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryInfoCol}>
            <Text style={styles.summaryTime}>6:00 AM</Text>
            <Text style={styles.summaryLabel}>Standard</Text>
          </View>

          {/* Pouch + Shaker Graphic */}
          <View style={styles.miniVisual}>
            <View style={styles.miniPouch}>
              <Text style={styles.miniPouchBrand}>Zing</Text>
            </View>
            <View style={styles.miniShaker} />
          </View>

          {/* Big Green/Lime Checkmark */}
          <View style={styles.checkWrapper}>
            <Check color="#65A30D" size={32} strokeWidth={4} />
          </View>
        </View>

        {/* Timeline Breakdown (Exact Mockup Match) */}
        <View style={styles.timelineCard}>
          <TimelineRow time="6:00 AM" label="Start" dotColor="#CBD5E1" />
          <TimelineRow time="6:01 AM" label="Mixing complete 🥤" dotColor="#CBD5E1" isMiddle={true} />
          <TimelineRow time="6:03 AM" label="Intake finished" dotColor="#CBD5E1" />

          <View style={styles.durationRow}>
            <Text style={styles.durationIcon}>⏱️</Text>
            <Text style={styles.durationText}>5 mins</Text>
          </View>
        </View>

        {/* Notes Box with Edit Icon (Exact Mockup Match) */}
        <View style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <Text style={styles.notesTitle}>Notes</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Edit3 color="#71717A" size={16} />
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <TextInput
              style={styles.notesInput}
              value={note}
              onChangeText={setNote}
              multiline
              autoFocus
            />
          ) : (
            <Text style={styles.notesBody}>{note}</Text>
          )}
        </View>

        {/* Action Button: EDIT LOG */}
        <View style={styles.buttonShadowWrapper}>
          <BouncyButton 
            style={styles.editLogBtn} 
            onPress={isEditing ? handleSaveLog : () => setIsEditing(true)}
          >
            <Text style={styles.editLogText}>{isEditing ? 'SAVE NOTE' : 'EDIT LOG'}</Text>
          </BouncyButton>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const TimelineRow = ({ time, label, dotColor, isMiddle }) => (
  <View style={styles.timelineItem}>
    <Text style={styles.timelineTime}>{time}</Text>
    <View style={styles.timelineDotCol}>
      <View style={[styles.timelineDot, { backgroundColor: dotColor }]} />
      {isMiddle && <View style={styles.timelineLine} />}
    </View>
    <Text style={styles.timelineLabel}>{label}</Text>
  </View>
);

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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 20,
  },
  summaryInfoCol: {
    flex: 1,
  },
  summaryTime: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#71717A',
  },
  miniVisual: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 16,
  },
  miniPouch: {
    width: 44,
    height: 54,
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniPouchBrand: {
    fontSize: 9,
    fontWeight: '900',
    color: '#D4FF00',
  },
  miniShaker: {
    width: 18,
    height: 38,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    marginLeft: 4,
  },
  checkWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ECFCCB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 20,
    gap: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineTime: {
    width: 65,
    fontSize: 12,
    fontWeight: '700',
    color: '#71717A',
  },
  timelineDotCol: {
    alignItems: 'center',
    width: 20,
    marginRight: 10,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timelineLine: {
    position: 'absolute',
    top: 8,
    bottom: -14,
    width: 2,
    backgroundColor: '#E2E8F0',
  },
  timelineLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 75,
  },
  durationIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  durationText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#71717A',
  },
  notesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 24,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
  },
  notesBody: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
    lineHeight: 20,
  },
  notesInput: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
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
  editLogBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  editLogText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
