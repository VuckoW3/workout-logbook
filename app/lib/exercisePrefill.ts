import { ExerciseSet, Workout } from '../types/workout';

type ExercisePrefillEntry = { recency: number; sets: ExerciseSet[] };
export type ExercisePrefillMap = Map<string, ExercisePrefillEntry>;

const createSetId = (prefix: string, index: number) => `s-${prefix}-${index}`;

const cloneSets = (sets: ExerciseSet[], idPrefix: string): ExerciseSet[] =>
  sets.map((set, index) => ({
    id: createSetId(idPrefix, index),
    weight: set.weight,
    reps: set.reps,
    completed: false,
  }));

export const buildLastExerciseSetsMap = (workouts: Workout[]): ExercisePrefillMap => {
  const map: ExercisePrefillMap = new Map();

  workouts.forEach((workout) => {
    if (!workout.completed) return;
    const workoutTime = new Date(workout.date).getTime();
    const recency = Number.isNaN(workoutTime) ? 0 : workoutTime;

    workout.exercises.forEach((exercise) => {
      const key = exercise.name.toLowerCase();
      const existing = map.get(key);

      if (existing && existing.recency >= recency) {
        return;
      }

      map.set(key, {
        recency,
        sets: exercise.sets.map((set) => ({ ...set })),
      });
    });
  });

  return map;
};

export const getPrefilledSets = (map: ExercisePrefillMap, exerciseName: string): ExerciseSet[] => {
  const entry = map.get(exerciseName.toLowerCase());
  const idPrefix = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  if (entry && entry.sets.length > 0) {
    return cloneSets(entry.sets, idPrefix);
  }

  return [
    {
      id: createSetId(idPrefix, 0),
      weight: 0,
      reps: 0,
      completed: false,
    },
  ];
};
