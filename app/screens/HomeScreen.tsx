// Ported from web - screen
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import SectionHeader from '../components/ui/SectionHeader';
import { HomeStackParamList } from '../navigation/types';
import { Workout } from '../types/workout';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'> & {
  lastWorkout?: Workout;
  onStartWorkout: () => void;
  onViewHistory: () => void;
};

export default function HomeScreen({ navigation, lastWorkout, onStartWorkout, onViewHistory }: Props) {
  const formatDate = (dateString: string) => format(parseISO(dateString), 'EEE, MMM d');

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Logbook</Text>
      </View>

      <View style={styles.section}>
        <PrimaryButton onPress={onStartWorkout} style={styles.primaryButton}>
          Start workout
        </PrimaryButton>
      </View>

      {lastWorkout ? (
        <View style={styles.section}>
          <SectionHeader textStyle={styles.sectionHeader}>Last workout</SectionHeader>
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.cardDate}>{formatDate(lastWorkout.date)}</Text>
              {lastWorkout.duration ? <Text style={styles.cardDuration}>{lastWorkout.duration} min</Text> : null}
            </View>
            <View style={styles.cardBody}>
              {lastWorkout.exercises.slice(0, 3).map((exercise) => {
                const topSet = exercise.sets.reduce((best, set) => (set.weight > best.weight ? set : best), exercise.sets[0]);
                return (
                  <View key={exercise.id} style={styles.exerciseRow}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseMeta}>
                      <Text style={styles.exerciseMetaStrong}>{topSet.weight}</Text>
                      <Text style={styles.exerciseMetaMuted}> kg - </Text>
                      <Text style={styles.exerciseMetaStrong}>{exercise.sets.length}</Text>
                    </Text>
                  </View>
                );
              })}
              {lastWorkout.exercises.length > 3 ? (
                <Text style={styles.moreText}>+{lastWorkout.exercises.length - 3} more</Text>
              ) : null}
            </View>
          </View>
        </View>
      ) : null}

      <View style={styles.section}>
        <Pressable
          onPress={onViewHistory}
          style={({ pressed }) => [styles.linkCard, pressed ? styles.pressed : null]}
        >
          <Text style={styles.linkText}>View all history</Text>
          <Text style={styles.linkChevron}>{'>'}</Text>
        </Pressable>
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  section: {
    marginBottom: 16,
  },
  primaryButton: {
    width: '100%',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardDate: {
    color: '#6b7280',
  },
  cardDuration: {
    color: '#6b7280',
  },
  cardBody: {
    gap: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  exerciseName: {
    color: '#111827',
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  exerciseMeta: {
    color: '#6b7280',
  },
  exerciseMetaStrong: {
    color: '#111827',
    fontWeight: '700',
  },
  exerciseMetaMuted: {
    color: '#6b7280',
  },
  moreText: {
    color: '#6b7280',
    fontSize: 13,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  linkText: {
    fontWeight: '600',
    color: '#111827',
  },
  linkChevron: {
    color: '#9ca3af',
    fontSize: 18,
  },
  pressed: {
    opacity: 0.85,
  },
});
