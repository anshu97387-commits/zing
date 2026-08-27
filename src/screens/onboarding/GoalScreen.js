import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { ArrowRight, Check } from 'lucide-react-native';
import BouncyButton from '../../components/BouncyButton';

export default function GoalScreen({ navigation }) {
  const { user, updateUser } = useAppContext();
  const [selectedGoal, setSelectedGoal] = useState('muscle');

  const goals = [
    { 
      id: 'muscle', 
      title: 'Muscle Gain / Bulking', 
      desc: 'High protein & oats (36g Whey + 50g Oats + PB)', 
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
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollInside}>
          <Text style={styles.brandLogo}>ZING</Text>
          <Text style={styles.title}>What's your goal?</Text>
          <Text style={styles.subtitle}>
            We automatically calculate exact grams for {user?.name ? `${user.name}'s` : 'your'} daily 6 AM stack.
          </Text>
          
          <View style={styles.optionsContainer}>
            {goals.map((g) => (
              <TouchableOpacity
                key={g.id}
                style={[styles.card, selectedGoal === g.id && styles.cardActive]}
                onPress={() => setSelectedGoal(g.id)}
                activeOpacity={0.85}
              >
                <View style={styles.cardLeft}>
                  <Text style={styles.cardEmoji}>{g.icon}</Text>
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardTitle}>{g.title}</Text>
                    <Text style={styles.cardDesc}>{g.desc}</Text>
                  </View>
                </View>

                <View style={[styles.radioCircle, selectedGoal === g.id && styles.radioCircleActive]}>
                  {selectedGoal === g.id && <Check color="#111111" size={13} strokeWidth={3} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <BouncyButton 
            style={[styles.nextBtn, !selectedGoal && styles.nextBtnDisabled]} 
            onPress={handleNext}
            disabled={!selectedGoal}
          >
            <Text style={styles.nextText}>Continue</Text>
            <ArrowRight color="#111111" size={20} />
          </BouncyButton>
        </View>

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
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  scrollInside: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  brandLogo: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardActive: {
    borderColor: '#FFC800',
    backgroundColor: '#FFFDF5',
    borderWidth: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  cardEmoji: {
    fontSize: 24,
    marginRight: 14,
  },
  cardTextCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 12,
    color: '#71717A',
    lineHeight: 16,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    backgroundColor: '#FFC800',
  },
  bottomBar: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC800',
    height: 58,
    borderRadius: 29,
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
