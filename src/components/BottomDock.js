import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Zap } from 'lucide-react-native';
import { Colors } from '../theme/colors';

export default function BottomDock({ onPress, label = 'Order New Stack' }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.circleBtn} 
        onPress={onPress} 
        activeOpacity={0.85}
      >
        <Zap color="#D4FF00" size={24} fill="#D4FF00" />
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  circleBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4FF00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: 0.3,
  },
});
