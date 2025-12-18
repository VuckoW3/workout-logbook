// Ported from web - screen helper
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import SetRow from '../components/ui/SetRow';
import { ExerciseSet, WorkoutExercise } from '../types/workout';

interface ExerciseBlockProps {
  exercise: WorkoutExercise;
  onUpdate: (exercise: WorkoutExercise) => void;
  editable?: boolean;
}

export default function ExerciseBlock({ exercise, onUpdate, editable = false }: ExerciseBlockProps) {
  const [expanded, setExpanded] = useState(editable);

  const updateSet = (setId: string, field: keyof ExerciseSet, value: number | boolean) => {
    const updatedSets = exercise.sets.map((set) => (set.id === setId ? { ...set, [field]: value } : set));
    onUpdate({ ...exercise, sets: updatedSets });
  };

  const addSet = () => {
    const lastSet = exercise.sets[exercise.sets.length - 1];
    const newSet: ExerciseSet = {
      id: `s-${Date.now()}`,
      weight: lastSet?.weight || 0,
      reps: lastSet?.reps || 0,
      completed: false,
    };
    onUpdate({ ...exercise, sets: [...exercise.sets, newSet] });
  };

  const removeSet = (setId: string) => {
    if (exercise.sets.length <= 1) return;
    onUpdate({ ...exercise, sets: exercise.sets.filter((s) => s.id !== setId) });
  };

  const bestSet = exercise.sets.reduce((best, set) => (set.weight > best.weight ? set : best), exercise.sets[0]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setExpanded((prev) => !prev)} style={({ pressed }) => [styles.header, pressed ? styles.pressed : null]}>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {exercise.name}
          </Text>
          <Text style={styles.subtitle}>
            <Text style={styles.subtitleStrong}>{bestSet?.weight}</Text>
            <Text style={styles.subtitleMuted}> kg - </Text>
            <Text style={styles.subtitleStrong}>{exercise.sets.length}</Text>
            <Text style={styles.subtitleMuted}> sets</Text>
          </Text>
        </View>
        <Text style={styles.chevron}>{expanded ? '^' : 'v'}</Text>
      </Pressable>

      {expanded ? (
        <View style={styles.body}>
          <View style={styles.headerRow}>
            <Text style={styles.headerLabel}>Set</Text>
            <Text style={styles.headerLabel}>kg</Text>
            <Text style={styles.headerLabel}>Reps</Text>
            {editable ? <View style={styles.headerSpacer} /> : null}
          </View>

          {exercise.sets.map((set, index) => (
            <SetRow
              key={set.id}
              set={set}
              index={index}
              editable={editable}
              onUpdate={(field, value) => updateSet(set.id, field, value)}
              onRemove={() => removeSet(set.id)}
              canRemove={exercise.sets.length > 1}
            />
          ))}

          {editable ? (
            <Pressable onPress={addSet} style={({ pressed }) => [styles.addSet, pressed ? styles.pressed : null]}>
              <Text style={styles.addSetText}>Add set</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  pressed: {
    opacity: 0.8,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    marginTop: 4,
    color: '#6b7280',
    fontSize: 13,
  },
  subtitleStrong: {
    color: '#111827',
    fontWeight: '600',
  },
  subtitleMuted: {
    color: '#6b7280',
  },
  chevron: {
    fontSize: 16,
    color: '#9ca3af',
    marginLeft: 8,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
  },
  headerSpacer: {
    width: 36,
  },
  addSet: {
    marginTop: 8,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSetText: {
    color: '#111827',
    fontWeight: '600',
  },
});
