// Ported from web - screen helper
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

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
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
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

          <Pressable onPress={() => setShowAddCustom(true)} style={styles.addCustom}>
            <Text style={styles.addCustomText}>Add custom exercise</Text>
          </Pressable>
        </View>

        {filteredExercises.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No exercises found</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
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
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#6b7280',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
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
  addCustom: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  addCustomText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9ca3af',
  },
});
