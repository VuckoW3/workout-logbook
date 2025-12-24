// Ported from web - screen
import React, { useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import PrimaryButton from '../components/ui/PrimaryButton';
import ScreenHeader from '../components/ui/ScreenHeader';
import { buildLastExerciseSetsMap, getPrefilledSets } from '../lib/exercisePrefill';
import { getProgressionHints } from '../lib/exerciseProgression';
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
  const insets = useSafeAreaInsets();

  const workout = useMemo(() => {
    if (mode === 'active') return activeWorkout;
    return workouts.find((w) => w.id === workoutId) || null;
  }, [mode, workoutId, activeWorkout, workouts]);

  const exercisePrefillMap = useMemo(() => buildLastExerciseSetsMap(workouts), [workouts]);

  const handleAddExercise = (exerciseDef: ExerciseDefinition) => {
    if (!activeWorkout) return;
    const newExercise: WorkoutExercise = {
      id: `ex-${Date.now()}`,
      name: exerciseDef.name,
      sets: getPrefilledSets(exercisePrefillMap, exerciseDef.name),
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

  const contentBottomPadding = insets.bottom + (isActive ? 150 : 60);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {isActive ? (
          <View style={styles.activeHeader}>
            <Pressable onPress={onCancelActive} style={styles.iconButton} hitSlop={10}>
              <Text style={styles.iconText}>X</Text>
            </Pressable>
            <Text style={styles.activeTitle}>Workout</Text>
            <Pressable
              onPress={onFinishActive}
              disabled={workout.exercises.length === 0}
              hitSlop={10}
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

        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: contentBottomPadding }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {workout.exercises.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <ExerciseBlock
                exercise={exercise}
                onUpdate={handleUpdateExercise}
                editable={isActive}
                progressionHints={getProgressionHints(exercisePrefillMap, exercise.name, exercise.sets)}
                onRemove={
                  isActive
                    ? () =>
                        onUpdateActive({
                          ...workout,
                          exercises: workout.exercises.filter((ex) => ex.id !== exercise.id),
                        })
                    : undefined
                }
              />
            </View>
          ))}

          {isActive && workout.exercises.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No exercises added yet</Text>
            </View>
          ) : null}

          {isActive ? (
            <Pressable
              onPress={() => setShowAddExercise(true)}
              style={({ pressed }) => [styles.addExercise, pressed ? styles.pressed : null]}
              hitSlop={8}
            >
              <Text style={styles.addExerciseText}>Add exercise</Text>
            </Pressable>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
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
  activeHeader: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    minHeight: 64,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 22,
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
