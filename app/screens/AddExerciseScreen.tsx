// Ported from web - screen helper
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExerciseListItem from '../components/ui/ExerciseListItem';
import { exerciseLibrary } from '../lib/mockData';
import { useCustomExercises } from '../lib/useCustomExercises';
import { ExerciseDefinition } from '../types/workout';
import AddCustomExerciseScreen from './AddCustomExerciseScreen';

interface AddExerciseScreenProps {
  onSelect: (exercise: ExerciseDefinition) => void;
  onClose: () => void;
}

export default function AddExerciseScreen({ onSelect, onClose }: AddExerciseScreenProps) {
  const [query, setQuery] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const { customExercises, addCustomExercise } = useCustomExercises();

  const allExercises = useMemo(() => [...exerciseLibrary, ...customExercises], [customExercises]);

  const filteredExercises = useMemo(() => {
    if (!query.trim()) return allExercises;
    const lower = query.toLowerCase();
    return allExercises.filter(
      (ex) => ex.name.toLowerCase().includes(lower) || ex.category.toLowerCase().includes(lower),
    );
  }, [query, allExercises]);

  const groupedExercises = useMemo(() => {
    const groups: Record<string, ExerciseDefinition[]> = {};
    filteredExercises.forEach((ex) => {
      if (!groups[ex.category]) groups[ex.category] = [];
      groups[ex.category].push(ex);
    });
    return groups;
  }, [filteredExercises]);

  if (showAddCustom) {
    return (
      <AddCustomExerciseScreen
        onSave={addCustomExercise}
        onClose={() => setShowAddCustom(false)}
        onSelect={onSelect}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Search exercises..."
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
              autoFocus
              placeholderTextColor="#9ca3af"
            />
          </View>
          <Pressable onPress={onClose} style={styles.closeButton} hitSlop={8}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => setShowAddCustom(true)} style={styles.addCustomCard} hitSlop={4}>
          <Text style={styles.addCustomLabel}>Add custom exercise</Text>
          <Text style={styles.addCustomChevron}>{'>'}</Text>
        </Pressable>

        <ScrollView
          style={styles.listWrapper}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            {Object.entries(groupedExercises).map(([category, exercises]) => (
              <View key={category}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryLabel}>{category}</Text>
                </View>
                {exercises.map((exercise, index) => (
                  <ExerciseListItem
                    key={exercise.id}
                    name={exercise.name}
                    onPress={() => onSelect(exercise)}
                    showBorder={index < exercises.length - 1}
                  />
                ))}
              </View>
            ))}
          </View>

          {filteredExercises.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No exercises found</Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    backgroundColor: '#f3f4f6',
  },
  searchWrapper: {
    flex: 1,
  },
  searchInput: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    fontSize: 16,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  closeText: {
    fontSize: 18,
    color: '#6b7280',
  },
  addCustomCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  addCustomLabel: {
    fontWeight: '600',
    color: '#111827',
  },
  addCustomChevron: {
    color: '#9ca3af',
    fontSize: 18,
  },
  listWrapper: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  categoryHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f9fafb',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9ca3af',
  },
});
