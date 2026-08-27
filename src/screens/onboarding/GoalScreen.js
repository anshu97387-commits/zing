import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { ArrowRight, Check, Dumbbell, Scale, Flame } from 'lucide-react-native';
import BouncyButton from '../../components/BouncyButton';

export default function GoalScreen({ navigation }) {
  const { user, updateUser } = useAppContext();
  const [selectedGoal, setSelectedGoal] = useState('muscle');

  const goals = [
    { 
      id: 'muscle', 
      title: 'Muscle Gain / Bulking', 
      desc: 'High protein & oats formula (36g Whey + 50g Oats + PB)', 
      icon: '💪' 
    },
    { 
      id: 'maintain', 
      title: 'Maintain / Recomp', 
      desc: 'Balanced clean energy (30g Whey + 40g Oats + Seeds)', 
      icon: '⚡' 
    },
    { 
      id: 'fat_loss', 
      title: 'Fat Loss / Strict Cut', 
      desc: 'Strict macros, zero added fats (30g Whey + 30g Oats)', 
      icon: '🔥' 
    }
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
          <Text style={styles.brandLogo}>ZING</Text>
          <Text style={styles.title}>What's your goal?</Text>
          <Text style={styles.subtitle}>
            We automatically calculate the exact grams for {user.name || 'your'}'s daily 6 AM stack.
          </Text>
          
          <View style={styles.optionsContainer}>
            {goals.map((g) => (
              <TouchableOpacity
                key={g.id}
                style={[styles.card, selectedGoal === g.id && styles.cardActive]}
                onPress={() => setSelectedGoal(g.id)}
                activeOpacity={0.85}
              >
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardEmoji}>{g.icon}</Text>
                  {selectedGoal === g.id && (
                    <View style={styles.checkIcon}>
                      <Check color="#111111" size={14} />
                    </View>
                  )}
                </View>
                <Text style={styles.cardTitle}>{g.title}</Text>
                <Text style={styles.cardDesc}>{g.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <BouncyButton 
          style={[styles.nextBtn, !selectedGoal && styles.nextBtnDisabled]} 
          onPress={handleNext}
          disabled={!selectedGoal}
        >
          <Text style={styles.nextText}>Continue</Text>
          <ArrowRight color="#111111" size={20} />
        </BouncyButton>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  brandLogo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 2,
    marginBottom: 20,
  },
  topArea: {
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#71717A',
    marginTop: 8,
    marginBottom: 28,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardActive: {
    borderColor: '#FFC800',
    backgroundColor: '#FFFDF5',
    borderWidth: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardEmoji: {
    fontSize: 24,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFC800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#71717A',
    lineHeight: 18,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC800',
    height: 60,
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: '#FFC800',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  nextBtnDisabled: {
    backgroundColor: '#E4E4E7',
  },
  nextText: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '900',
    marginRight: 8,
  }
});
