import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react-native';
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
            <Text style={styles.logoWhite}>Zing</Text>
            <Text style={styles.logoNeon}>Fit</Text>
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
          <BouncyButton 
            style={[styles.continueBtn, !selectedGoal && styles.continueBtnDisabled]} 
            onPress={handleNext}
            disabled={!selectedGoal}
          >
            <Text style={styles.continueText}>Continue</Text>
          </BouncyButton>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    marginBottom: 28,
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
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
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
    backgroundColor: '#141416',
    borderRadius: 18,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  goalPillActive: {
    borderColor: Colors.neon,
    backgroundColor: '#18181A',
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: '#A1A1AA',
    letterSpacing: 1,
  },
  goalLabelActive: {
    color: Colors.neon,
  },
  bottomArea: {
    paddingBottom: 16,
  },
  continueBtn: {
    backgroundColor: '#141416',
    borderWidth: 1.5,
    borderColor: Colors.neon,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.neon,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  continueBtnDisabled: {
    borderColor: '#3F3F46',
    backgroundColor: '#121214',
    shadowOpacity: 0,
  },
  continueText: {
    color: Colors.neon,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});
