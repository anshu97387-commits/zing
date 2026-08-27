import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

export default function ZingLogo({ size = 26, dark = true }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: size, color: dark ? '#111111' : '#FFFFFF' }]}>
        Zing
      </Text>
      <View style={[styles.boltDot, { width: size * 0.22, height: size * 0.22, borderRadius: size * 0.11 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  boltDot: {
    backgroundColor: '#D4FF00', // Electric Acid Lime / Golden Yellow
    marginLeft: 2,
    marginTop: 4,
  },
});
