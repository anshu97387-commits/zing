import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';
import { ArrowRight, Check } from 'lucide-react-native';
import BouncyButton from '../../components/BouncyButton';

export default function GoalScreen({ navigation }) {
  const { user, updateUser } = useAppContext();
  const [selectedGoal, setSelectedGoal] = useState('');

  const goals = [
    { id: 'muscle', title: 'Muscle Gain / Bulking', desc: 'High protein & carbs formula' },
    { id: 'maintain', title: 'Maintain / Recomp', desc: 'Balanced nutrition formula' },
    { id: 'fat_loss', title: 'Fat Loss / Cutting', desc: 'Strict calories, zero peanut butter' }
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
          <Text style={styles.title}>What's your goal?</Text>
          <Text style={styles.subtitle}>We'll automatically calculate exact grams for {user.name}'s stack.</Text>
          
          <View style={styles.optionsContainer}>
            {goals.map((g) => (
              <TouchableOpacity
                key={g.id}
                style={[styles.card, selectedGoal === g.id && styles.cardActive]}
                onPress={() => setSelectedGoal(g.id)}
                activeOpacity={0.9}
              >
                {selectedGoal === g.id && (
                  <View style={styles.checkIcon}>
                    <Check color="#FFF" size={14} />
                  </View>
                )}
                <Text style={[styles.cardTitle, selectedGoal === g.id && styles.textActive]}>{g.title}</Text>
                <Text style={[styles.cardDesc, selectedGoal === g.id && styles.textActive]}>{g.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <BouncyButton 
          style={[styles.nextBtn, !selectedGoal && styles.nextBtnDisabled]} 
          onPress={handleNext}
          disabled={!selectedGoal}
        >
          <Text style={styles.nextText}>Next</Text>
          <ArrowRight color="#FFF" size={20} />
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
  topArea: {
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
    marginBottom: 40,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardActive: {
    borderColor: '#000',
    backgroundColor: '#FAFAFA',
  },
  checkIcon: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#8E8E93',
  },
  textActive: {
    color: '#000',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: 60,
    borderRadius: 30, // Zepto pill shape
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  nextBtnDisabled: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 8,
  }
});
