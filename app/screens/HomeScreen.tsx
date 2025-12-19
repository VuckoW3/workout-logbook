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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Logbook</Text>
      </View>

      <View style={styles.section}>
        <PrimaryButton
          onPress={onStartWorkout}
          style={styles.primaryButton}
          icon={<Text style={styles.primaryButtonIcon}>▶</Text>}
        >
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
  screen: {
    backgroundColor: '#f3f4f6',
  },
  container: {
    paddingTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#f3f4f6',
  },
  header: {
    paddingBottom: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
  },
  section: {
    marginBottom: 20,
  },
  primaryButton: {
    width: '100%',
    height: 64,
    backgroundColor: '#2563eb',
    borderRadius: 18,
    shadowColor: '#2563eb',
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  primaryButtonIcon: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
  sectionHeader: {
    marginBottom: 12,
    color: '#6b7280',
    letterSpacing: 0.3,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardDate: {
    color: '#6b7280',
    fontWeight: '600',
  },
  cardDuration: {
    color: '#6b7280',
    fontWeight: '600',
  },
  cardBody: {
    gap: 10,
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
    fontSize: 15,
  },
  exerciseMeta: {
    color: '#6b7280',
    fontSize: 14,
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
    marginTop: 2,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  linkText: {
    fontWeight: '600',
    color: '#111827',
    fontSize: 15,
  },
  linkChevron: {
    color: '#9ca3af',
    fontSize: 18,
  },
  pressed: {
    opacity: 0.85,
  },
});
