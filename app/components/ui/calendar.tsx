// Ported from web - UI primitive
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface CalendarProps {
  selected?: Date | null;
  onSelect?: (date: Date | null) => void;
}

export function Calendar({ selected, onSelect }: CalendarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      {selected ? <Text style={styles.selection}>{selected.toDateString()}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
  selection: {
    color: '#374151',
  },
});
