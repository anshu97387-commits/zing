import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { Colors } from '../../theme/colors';
import BouncyButton from '../../components/BouncyButton';

export default function GoalScreen({ navigation }) {
  const { user, updateUser } = useAppContext();
  const [selectedGoal, setSelectedGoal] = useState('muscle');

  const goals = [
    { id: 'muscle', label: 'BUILD MUSCLE' },
    { id: 'fat_loss', label: 'LOSE FAT' },
    { id: 'endurance', label: 'INCREASE ENDURANCE' },
  ];

  const handleNext = () => {
    if (selectedGoal) {
      updateUser({ goal: selectedGoal });
      navigation.navigate('Address');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.topArea}>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>Zing</Text>
            <View style={styles.logoDot} />
          </View>

          <Text style={styles.title}>YOUR FITNESS GOAL</Text>
          <Text style={styles.subtitle}>
            We automatically calculate exact grams for {user?.name ? `${user.name}'s` : 'your'} 6 AM vacuum stack.
          </Text>

          <View style={styles.optionsList}>
            {goals.map((g) => {
              const isSelected = selectedGoal === g.id;
              return (
                <TouchableOpacity
                  key={g.id}
                  style={[styles.goalPill, isSelected && styles.goalPillActive]}
                  onPress={() => setSelectedGoal(g.id)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.goalLabel, isSelected && styles.goalLabelActive]}>
                    {g.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.bottomArea}>
          <View style={styles.glowButtonWrapper}>
            <BouncyButton 
              style={[styles.continueBtn, !selectedGoal && styles.continueBtnDisabled]} 
              onPress={handleNext}
              disabled={!selectedGoal}
            >
              <Text style={styles.continueText}>Continue</Text>
            </BouncyButton>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  topArea: {
    marginTop: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 26,
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
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 32,
  },
  optionsList: {
    gap: 16,
  },
  goalPill: {
    backgroundColor: '#F8F9FA',
    borderRadius: 18,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  goalPillActive: {
    borderColor: '#111111',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: '#71717A',
    letterSpacing: 1,
  },
  goalLabelActive: {
    color: '#111111',
  },
  bottomArea: {
    paddingBottom: 16,
  },
  glowButtonWrapper: {
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 8,
  },
  continueBtn: {
    backgroundColor: '#1C1C1E',
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnDisabled: {
    backgroundColor: '#C7C7CC',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
