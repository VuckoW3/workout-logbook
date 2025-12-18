// Ported from web - screen
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

import { benchPressProgress, exerciseLibrary } from '../lib/mockData';

export default function ProgressScreen() {
  const [selectedExercise, setSelectedExercise] = useState('Bench Press');

  const data = useMemo(() => {
    return selectedExercise === 'Bench Press' ? benchPressProgress : [];
  }, [selectedExercise]);

  const uniqueExercises = useMemo(
    () => Array.from(new Set(exerciseLibrary.map((ex) => ex.name))).slice(0, 6),
    [],
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
      </View>

      <View style={styles.chips}>
        {uniqueExercises.map((name) => {
          const active = selectedExercise === name;
          return (
            <Pressable
              key={name}
              onPress={() => setSelectedExercise(name)}
              style={[styles.chip, active ? styles.chipActive : null]}
            >
              <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{name}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{selectedExercise}</Text>
        <Text style={styles.cardSubtitle}>Max weight over time</Text>

        {data.length > 0 ? (
          <View style={styles.dataContainer}>
            {data.map((item) => (
              <View key={item.date} style={styles.row}>
                <Text style={styles.rowLabel}>{item.date}</Text>
                <Text style={styles.rowValue}>{item.maxWeight} kg</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No data recorded for this exercise</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  chipActive: {
    backgroundColor: '#111827',
  },
  chipText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#fff',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  cardSubtitle: {
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 12,
  },
  dataContainer: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  rowLabel: {
    color: '#374151',
  },
  rowValue: {
    color: '#111827',
    fontWeight: '700',
  },
  empty: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9ca3af',
  },
});
