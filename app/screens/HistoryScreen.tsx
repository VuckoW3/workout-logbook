// Ported from web - screen
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HistoryStackParamList } from '../navigation/types';
import { Workout } from '../types/workout';

type Props = NativeStackScreenProps<HistoryStackParamList, 'History'> & {
  workouts: Workout[];
  onSelectWorkout: (workout: Workout) => void;
};

export default function HistoryScreen({ workouts, onSelectWorkout }: Props) {
  const formatDate = (dateString: string) => format(parseISO(dateString), 'EEE, MMM d');

  const getWorkoutSummary = (workout: Workout) => {
    const exerciseCount = workout.exercises.length;
    const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    return `${exerciseCount} exercise${exerciseCount !== 1 ? 's' : ''} - ${totalSets} sets`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>

      <View style={styles.list}>
        {workouts.map((workout) => (
          <Pressable
            key={workout.id}
            onPress={() => onSelectWorkout(workout)}
            style={({ pressed }) => [styles.item, pressed ? styles.pressed : null]}
          >
            <View style={styles.itemTop}>
              <Text style={styles.itemTitle}>{formatDate(workout.date)}</Text>
              {workout.duration ? <Text style={styles.itemDuration}>{workout.duration} min</Text> : null}
            </View>
            <Text style={styles.itemSubtitle}>{getWorkoutSummary(workout)}</Text>
            <Text numberOfLines={1} style={styles.itemSubtitle}>
              {workout.exercises.map((ex) => ex.name).join(', ')}
            </Text>
          </Pressable>
        ))}
      </View>

      {workouts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No workouts recorded yet</Text>
        </View>
      ) : null}
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
  list: {
    gap: 12,
  },
  item: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
  },
  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontWeight: '600',
    color: '#111827',
  },
  itemDuration: {
    color: '#6b7280',
    fontSize: 13,
  },
  itemSubtitle: {
    color: '#6b7280',
    fontSize: 13,
  },
  empty: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9ca3af',
  },
  pressed: {
    opacity: 0.85,
  },
});
