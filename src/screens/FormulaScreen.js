import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calculator, ChevronDown, Check } from 'lucide-react-native';

export default function FormulaScreen() {
  const [weight, setWeight] = useState('70');
  const [goal, setGoal] = useState('muscle'); // muscle, maintain, fat_loss
  const [glasses, setGlasses] = useState(2);
  const [liquid, setLiquid] = useState('water'); // milk, water, almond

  const [results, setResults] = useState(null);

  useEffect(() => {
    calculate();
  }, [weight, goal, glasses, liquid]);

  const calculate = () => {
    const w = parseInt(weight) || 70;
    
    let totalProtein, totalCarbs, totalCal;
    if (goal === 'muscle') {
      totalProtein = Math.round(w * 1.8);
      totalCarbs = Math.round(w * 3.5);
      totalCal = Math.round(w * 35);
    } else if (goal === 'maintain') {
      totalProtein = Math.round(w * 1.5);
      totalCarbs = Math.round(w * 2.5);
      totalCal = Math.round(w * 30);
    } else {
      totalProtein = Math.round(w * 2.0);
      totalCarbs = Math.round(w * 1.5);
      totalCal = Math.round(w * 25);
    }

    const wheyPer = Math.round((totalProtein * 0.5) / glasses);
    const oatsPer = Math.round((totalCarbs * 0.35) / glasses);
    const chiaPer = 5;
    const pbPer = goal === 'fat_loss' ? 0 : (goal === 'muscle' ? 10 : 8);
    const liquidMl = liquid === 'milk' ? 200 : liquid === 'water' ? 300 : 250;

    const wheyG = Math.max(20, Math.min(wheyPer, 40));
    const oatsG = Math.max(20, Math.min(oatsPer, 60));
    const chiaG = chiaPer;
    const pbG = goal === 'fat_loss' ? 0 : (goal === 'muscle' ? 12 : 10);

    const proteinGlass = Math.round(wheyG * 0.8 + oatsG * 0.13 + chiaG * 0.17 + (liquid === 'milk' ? 6.4 : 0));
    const carbsGlass = Math.round(oatsG * 0.66 + chiaG * 0.42 + wheyG * 0.05);
    const fatGlass = Math.round(chiaG * 0.31 + pbG * 0.5 + (liquid === 'milk' ? 4 : 0));
    const calGlass = Math.round(proteinGlass * 4 + carbsGlass * 4 + fatGlass * 9);

    const totalSolid = wheyG + oatsG + chiaG + pbG;

    let tip = '';
    if (goal === 'muscle') {
      tip = `Bulking tip: Oats pehle blend karo 10 sec, phir baaki daalke blend karo — smooth texture milega. Din mein ${glasses} baar ye glass + solid khana = solid lean gains.`;
    } else if (goal === 'maintain') {
      tip = `Recomp tip: Workout se 30 min pehle ek glass, baaki din normal khana. Chia seeds raat ko bhi dal sakte ho — chia pudding bana lo.`;
    } else {
      tip = `Cutting tip: Peanut butter skip kiya hai — calories tight rakho. Ice daalke blend karo, thick shake milega aur zyada full feel hoga.`;
    }

    setResults({
      wheyG, oatsG, chiaG, pbG, liquidMl,
      proteinGlass, carbsGlass, calGlass, totalSolid, tip
    });
  };

  const SelectGroup = ({ options, selected, onSelect }) => (
    <View style={styles.selectGroup}>
      {options.map((opt) => (
        <TouchableOpacity 
          key={opt.value} 
          style={[styles.selectOption, selected === opt.value && styles.selectOptionActive]}
          onPress={() => onSelect(opt.value)}
        >
          <Text style={[styles.selectText, selected === opt.value && styles.selectTextActive]}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.headerTitle}>Ek Glass Ka Formula</Text>
        <Text style={styles.headerSub}>Apna weight aur goal daal — exact grams milenge</Text>
        
        <View style={styles.card}>
          <Text style={styles.inputLabel}>Tumhara weight (kg)</Text>
          <TextInput 
            style={styles.textInput}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            maxLength={3}
          />

          <Text style={styles.inputLabel}>Goal</Text>
          <SelectGroup 
            options={[
              { label: 'Bulking', value: 'muscle' },
              { label: 'Maintain', value: 'maintain' },
              { label: 'Fat Loss', value: 'fat_loss' }
            ]}
            selected={goal}
            onSelect={setGoal}
          />

          <Text style={styles.inputLabel}>Glass kitne baar peete ho?</Text>
          <SelectGroup 
            options={[
              { label: '1 Baar', value: 1 },
              { label: '2 Baar', value: 2 },
              { label: '3 Baar', value: 3 }
            ]}
            selected={glasses}
            onSelect={setGlasses}
          />

          <Text style={styles.inputLabel}>Liquid</Text>
          <SelectGroup 
            options={[
              { label: 'Water', value: 'water' },
              { label: 'Milk', value: 'milk' },
              { label: 'Almond', value: 'almond' }
            ]}
            selected={liquid}
            onSelect={setLiquid}
          />
        </View>

        {results && (
          <>
            <Text style={styles.sectionTitle}>Ek glass mein daaloge</Text>
            
            <View style={styles.card}>
              <IngredientRow icon="💪" name="Whey Protein" note={`~${Math.round(results.wheyG * 0.8)}g protein`} gram={`${results.wheyG}g`} />
              <IngredientRow icon="🌾" name="Oats (rolled)" note="complex carbs + fibre" gram={`${results.oatsG}g`} />
              <IngredientRow icon="🌱" name="Chia Seeds" note="omega-3 + gel texture" gram={`${results.chiaG}g`} />
              {results.pbG > 0 && (
                <IngredientRow icon="🥜" name="Peanut Butter" note="healthy fat + flavour" gram={`${results.pbG}g`} />
              )}
              <IngredientRow 
                icon="💧" 
                name={liquid === 'milk' ? 'Milk' : liquid === 'water' ? 'Water/Ice' : 'Almond Milk'} 
                note="ml — blending ke liye" 
                gram={`${results.liquidMl}ml`} 
                isLast 
              />
              
              <View style={styles.totalBar}>
                <Text style={styles.totalLabel}>Total dry ingredients</Text>
                <Text style={styles.totalVal}>{results.totalSolid}g dry + {results.liquidMl}ml</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Ek glass ke macros</Text>
            <View style={styles.macroGrid}>
              <View style={styles.macroCard}>
                <Text style={styles.macroVal}>{results.proteinGlass}g</Text>
                <Text style={styles.macroLbl}>Protein</Text>
              </View>
              <View style={styles.macroCard}>
                <Text style={styles.macroVal}>{results.carbsGlass}g</Text>
                <Text style={styles.macroLbl}>Carbs</Text>
              </View>
              <View style={styles.macroCard}>
                <Text style={styles.macroVal}>{results.calGlass}</Text>
                <Text style={styles.macroLbl}>Kcal</Text>
              </View>
            </View>

            <View style={styles.tipCard}>
              <Text style={styles.tipText}>{results.tip}</Text>
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const IngredientRow = ({ icon, name, note, gram, isLast }) => (
  <View style={[styles.ingredientRow, !isLast && styles.ingredientBorder]}>
    <View style={styles.ingLeft}>
      <Text style={styles.ingName}>{icon} {name}</Text>
      <Text style={styles.ingNote}>{note}</Text>
    </View>
    <Text style={styles.ingGram}>{gram}</Text>
  </View>
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
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 6,
    marginBottom: 24,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textInput: {
    height: 50,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 20,
  },
  selectGroup: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  selectOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  selectOptionActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  selectText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  selectTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  ingredientBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  ingLeft: {
    flex: 1,
  },
  ingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  ingNote: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  ingGram: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  totalBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  totalVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  macroCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  macroVal: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  macroLbl: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 4,
  },
  tipCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#3A3A3C',
  }
});
