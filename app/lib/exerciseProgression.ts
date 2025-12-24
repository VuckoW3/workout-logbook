import { ExerciseSet } from '../types/workout';
import { ExercisePrefillMap } from './exercisePrefill';

const REP_LOWER_BOUND = 5;
const REP_UPPER_BOUND = 8;
const WEIGHT_STEP = 2.5;

const formatWeight = (value: number) => (Number.isInteger(value) ? `${value}` : value.toFixed(1));

export const getProgressionHints = (
  map: ExercisePrefillMap,
  exerciseName: string,
  currentSets: ExerciseSet[],
): (string | undefined)[] => {
  const entry = map.get(exerciseName.toLowerCase());
  if (!entry) return currentSets.map(() => undefined);

  const previousSets = entry.sets;

  return currentSets.map((_, index) => {
    const prev = previousSets[index];
    if (!prev) return undefined;

    const prevReps = prev.reps ?? 0;
    const prevWeight = prev.weight ?? 0;

    if (prevReps <= 3) return undefined;

    if (prevReps >= REP_UPPER_BOUND) {
      const nextWeight = prevWeight + WEIGHT_STEP;
      return `Suggested: ${formatWeight(nextWeight)} kg × ${REP_LOWER_BOUND}`;
    }

    if (prevReps < REP_UPPER_BOUND) {
      return 'Suggested: +1 rep';
    }

    return undefined;
  });
};
