// Ported from web - screen
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, LayoutChangeEvent } from 'react-native';
import Svg, { Polyline, Circle } from 'react-native-svg';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { getExerciseMax, getExerciseTimeline } from '../lib/progress';
import { useWorkouts } from '../store/useWorkouts';

export default function ProgressScreen() {
  const [selectedExercise, setSelectedExercise] = useState('Bench Press');
  const insets = useSafeAreaInsets();
  const { workouts } = useWorkouts();
  const workoutsKey = useMemo(
    () => `${workouts.length}:${workouts[workouts.length - 1]?.date ?? ''}`,
    [workouts],
  );

  const timeline = useMemo(
    () => getExerciseTimeline(workouts, selectedExercise),
    [workoutsKey, selectedExercise],
  );

  const bestMaxKg = useMemo(
    () => getExerciseMax(workouts, selectedExercise),
    [workoutsKey, selectedExercise],
  );

  const progressKg = useMemo(() => {
    if (!timeline.length) return 0;
    const first = timeline[0]?.maxKg ?? 0;
    const last = timeline[timeline.length - 1]?.maxKg ?? 0;
    return last - first;
  }, [timeline]);

  const uniqueExercises = useMemo(() => {
    const names = new Set<string>();
    workouts.forEach((w) => w.exercises.forEach((ex) => names.add(ex.name)));
    return Array.from(names);
  }, [workouts]);

  const stats = [
    { label: 'Best max', value: `${bestMaxKg} kg` },
    { label: 'Progress', value: `${progressKg >= 0 ? '+' : ''}${progressKg} kg` },
    { label: 'Entries', value: `${timeline.length}` },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {uniqueExercises.map((name) => {
            const active = selectedExercise === name;
            return (
              <Pressable
                key={name}
                onPress={() => setSelectedExercise(name)}
                style={({ pressed }) => [
                  styles.chip,
                  active ? styles.chipActive : null,
                  pressed ? styles.chipPressed : null,
                ]}
                hitSlop={6}
              >
                <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selectedExercise}</Text>
          <Text style={styles.cardSubtitle}>Max weight over time</Text>

          <Chart timeline={timeline} />

          {timeline.length > 0 ? (
            <View style={styles.dataContainer}>
              {timeline.map((item) => (
                <View key={item.date} style={styles.row}>
                  <Text style={styles.rowLabel}>{item.date}</Text>
                  <Text style={styles.rowValue}>{item.maxKg} kg</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No data recorded for this exercise</Text>
            </View>
          )}
        </View>

        <View style={styles.summaryGroup}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{stat.label}</Text>
              <Text style={styles.summaryValue}>{stat.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Chart({ timeline }: { timeline: { date: string; maxKg: number }[] }) {
  const [width, setWidth] = useState(0);
  const height = 180;

  if (timeline.length < 2) {
    return (
      <View style={styles.chartPlaceholder}>
        <View style={styles.chartLine} />
      </View>
    );
  }

  const values = timeline.map((p) => p.maxKg);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const padding = Math.max((max - min) * 0.05, 2);
  const domainMax = max + padding;
  const domainMin = min - padding;
  const range = domainMax - domainMin || 1;

  const points = timeline.map((point, index) => {
    const x = width <= 0 ? 0 : (width / (timeline.length - 1)) * index;
    const y = height - ((point.maxKg - domainMin) / range) * height;
    return { x, y };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.chartPlaceholder} onLayout={onLayout}>
      {width > 0 ? (
        <Svg width={width} height={height}>
          <Polyline
            points={polylinePoints}
            fill="none"
            stroke="#2563eb"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, idx) => (
            <Circle key={`${p.x}-${idx}`} cx={p.x} cy={p.y} r={4} fill="#2563eb" />
          ))}
        </Svg>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  screen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
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
  chipsContainer: {
    paddingRight: 10,
    gap: 10,
    paddingBottom: 4,
    marginBottom: 18,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: '#0f172a',
  },
  chipPressed: {
    opacity: 0.9,
  },
  chipText: {
    color: '#111827',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#fff',
  },
  card: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  cardSubtitle: {
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 14,
  },
  chartPlaceholder: {
    height: 200,
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  chartLine: {
    width: '80%',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#cbd5e1',
  },
  dataContainer: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
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
  summaryGroup: {
    gap: 12,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  summaryLabel: {
    color: '#6b7280',
    fontSize: 13,
    marginBottom: 6,
  },
  summaryValue: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
  },
});
