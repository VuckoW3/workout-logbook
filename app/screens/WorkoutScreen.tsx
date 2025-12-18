// Ported from web - screen
import React, { useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import ScreenHeader from '../components/ui/ScreenHeader';
import { exerciseLibrary } from '../lib/mockData';
import ExerciseBlock from './ExerciseBlock';
import AddExerciseScreen from './AddExerciseScreen';
import { ExerciseDefinition, Workout, WorkoutExercise } from '../types/workout';
import { HistoryStackParamList, HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList & HistoryStackParamList, 'Workout'> & {
  activeWorkout: Workout | null;
  workouts: Workout[];
  onUpdateActive: (workout: Workout) => void;
  onFinishActive: () => void;
  onCancelActive: () => void;
};

export default function WorkoutScreen({
  route,
  navigation,
  activeWorkout,
  workouts,
  onUpdateActive,
  onFinishActive,
  onCancelActive,
}: Props) {
  const { mode, workoutId } = route.params;
  const [showAddExercise, setShowAddExercise] = useState(false);

  const workout = useMemo(() => {
    if (mode === 'active') return activeWorkout;
    return workouts.find((w) => w.id === workoutId) || null;
  }, [mode, workoutId, activeWorkout, workouts]);

  const handleAddExercise = (exerciseDef: ExerciseDefinition) => {
    if (!activeWorkout) return;
    const newExercise: WorkoutExercise = {
      id: `ex-${Date.now()}`,
      name: exerciseDef.name,
      sets: [{ id: `s-${Date.now()}`, weight: 0, reps: 0, completed: false }],
    };
    onUpdateActive({ ...activeWorkout, exercises: [...activeWorkout.exercises, newExercise] });
    setShowAddExercise(false);
  };

  const handleUpdateExercise = (updated: WorkoutExercise) => {
    if (!activeWorkout) return;
    onUpdateActive({
      ...activeWorkout,
      exercises: activeWorkout.exercises.map((ex) => (ex.id === updated.id ? updated : ex)),
    });
  };

  if (showAddExercise && mode === 'active' && activeWorkout) {
    return <AddExerciseScreen onSelect={handleAddExercise} onClose={() => setShowAddExercise(false)} />;
  }

  if (!workout) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Workout not found</Text>
        <PrimaryButton onPress={() => navigation.goBack()}>Go back</PrimaryButton>
      </View>
    );
  }

  const isActive = mode === 'active';

  return (
    <View style={styles.container}>
      {isActive ? (
        <View style={styles.activeHeader}>
          <Pressable onPress={onCancelActive} style={styles.iconButton}>
            <Text style={styles.iconText}>X</Text>
          </Pressable>
          <Text style={styles.activeTitle}>Workout</Text>
          <Pressable
            onPress={onFinishActive}
            disabled={workout.exercises.length === 0}
            style={({ pressed }) => [
              styles.finishButton,
              workout.exercises.length === 0 ? styles.finishDisabled : null,
              pressed && workout.exercises.length > 0 ? styles.pressed : null,
            ]}
          >
            <Text style={styles.finishText}>Finish</Text>
          </Pressable>
        </View>
      ) : (
        <ScreenHeader title="Workout" onBack={() => navigation.goBack()} sticky />
      )}

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {workout.exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <ExerciseBlock exercise={exercise} onUpdate={handleUpdateExercise} editable={isActive} />
            {isActive ? (
              <Pressable
                onPress={() =>
                  onUpdateActive({
                    ...workout,
                    exercises: workout.exercises.filter((ex) => ex.id !== exercise.id),
                  })
                }
                style={({ pressed }) => [styles.removeExercise, pressed ? styles.pressed : null]}
              >
                <Text style={styles.removeExerciseText}>Remove</Text>
              </Pressable>
            ) : null}
          </View>
        ))}

        {isActive && workout.exercises.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No exercises added yet</Text>
          </View>
        ) : null}

        {isActive ? (
          <Pressable onPress={() => setShowAddExercise(true)} style={({ pressed }) => [styles.addExercise, pressed ? styles.pressed : null]}>
            <Text style={styles.addExerciseText}>Add exercise</Text>
          </Pressable>
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
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    paddingBottom: 140,
  },
  exerciseCard: {
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  addExercise: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addExerciseText: {
    fontWeight: '600',
    color: '#6b7280',
  },
  removeExercise: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  removeExerciseText: {
    color: '#6b7280',
  },
  activeHeader: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
    color: '#6b7280',
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  finishButton: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishText: {
    color: '#fff',
    fontWeight: '600',
  },
  finishDisabled: {
    backgroundColor: '#e5e7eb',
  },
  pressed: {
    opacity: 0.8,
  },
  emptyState: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    color: '#6b7280',
    marginBottom: 12,
  },
});
