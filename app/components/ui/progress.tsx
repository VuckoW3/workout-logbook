// Ported from web - UI primitive
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface ProgressProps extends ViewProps {
  value?: number;
}

export function Progress({ value = 0, style }: ProgressProps) {
  const ratio = Math.min(Math.max(value, 0), 100);
  return (
    <View style={[styles.track, style]}>
      <View style={[styles.fill, { width: `${ratio}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#111827',
  },
});
