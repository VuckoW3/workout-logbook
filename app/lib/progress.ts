import { Workout } from '../types/workout';

export function getExerciseMax(workouts: Workout[], exerciseName: string): number {
  if (!workouts?.length) return 0;
  let max = 0;
  for (const workout of workouts) {
    const exercise = workout.exercises.find((ex) => ex.name === exerciseName);
    if (exercise) {
      for (const set of exercise.sets) {
        if (set.weight > max) {
          max = set.weight;
        }
      }
    }
  }
  return max;
}

export function getExerciseTimeline(
  workouts: Workout[],
  exerciseName: string,
): { date: string; maxKg: number }[] {
  if (!workouts?.length) return [];

  const byDate: Record<string, number> = {};

  for (const workout of workouts) {
    const exercise = workout.exercises.find((ex) => ex.name === exerciseName);
    if (!exercise) continue;

    const dayMax = exercise.sets.reduce((max, set) => Math.max(max, set.weight), 0);
    if (!(workout.date in byDate) || dayMax > byDate[workout.date]) {
      byDate[workout.date] = dayMax;
    }
  }

  return Object.entries(byDate)
    .map(([date, maxKg]) => ({ date, maxKg }))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}
