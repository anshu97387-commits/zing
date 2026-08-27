import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import ZingLogo from '../../components/ZingLogo';
import BottomDock from '../../components/BottomDock';
import BouncyButton from '../../components/BouncyButton';

export default function GoalScreen({ navigation }) {
  const { updateUser } = useAppContext();
  const [selectedGoal, setSelectedGoal] = useState('muscle');

  const goals = [
    { id: 'muscle', label: 'BUILD MUSCLE', icon: '💪' },
    { id: 'fat_loss', label: 'LOSE FAT', icon: '🔥' },
    { id: 'endurance', label: 'INCREASE ENDURANCE', icon: '👟' },
  ];

  const handleNext = () => {
    if (selectedGoal) {
      updateUser({ goal: selectedGoal });
      navigation.navigate('Personalize');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.topArea}>
          {/* Top Logo: Zing */}
          <View style={styles.topLogoRow}>
            <ZingLogo size={28} />
          </View>

          {/* Heading & Subtitle */}
          <Text style={styles.title}>YOUR FITNESS GOAL</Text>
          <Text style={styles.subtitle}>
            Select your primary objective to tailor your stack.
          </Text>

          {/* Goal Options List (Exact Mockup Match) */}
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
                  <Text style={styles.goalIcon}>{g.icon}</Text>
                  <Text style={[styles.goalLabel, isSelected && styles.goalLabelActive]}>
                    {g.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Action Button & Bottom Dock */}
        <View style={styles.bottomArea}>
          <View style={styles.glowButtonWrapper}>
            <BouncyButton 
              style={[styles.continueBtn, !selectedGoal && styles.continueBtnDisabled]} 
              onPress={handleNext}
              disabled={!selectedGoal}
            >
              <Text style={styles.continueText}>CONTINUE</Text>
            </BouncyButton>
          </View>

          <BottomDock onPress={() => {}} />
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
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  topArea: {
    width: '100%',
  },
  topLogoRow: {
    alignSelf: 'flex-start',
    marginTop: 6,
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 30,
  },
  optionsList: {
    gap: 14,
  },
  goalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    height: 64,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    paddingHorizontal: 16,
  },
  goalPillActive: {
    backgroundColor: '#E5E5EA',
    borderColor: '#111111',
    borderWidth: 1.5,
  },
  goalIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  goalLabel: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 1,
  },
  goalLabelActive: {
    color: '#111111',
  },
  bottomArea: {
    width: '100%',
  },
  glowButtonWrapper: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 6,
  },
  continueBtn: {
    backgroundColor: '#1C1C1E',
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  continueBtnDisabled: {
    backgroundColor: '#C7C7CC',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
