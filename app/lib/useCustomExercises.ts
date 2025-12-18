// Ported from web - screen helper
import { useEffect, useState } from 'react';

import { ExerciseDefinition } from '../types/workout';
import { loadJSON, saveJSON } from '../store/storage';

export const MUSCLE_GROUPS = [
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Core',
  'Custom',
];

const STORAGE_KEY = 'custom-exercises';

export const useCustomExercises = () => {
  const [customExercises, setCustomExercises] = useState<ExerciseDefinition[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const stored = await loadJSON<ExerciseDefinition[]>(STORAGE_KEY, []);
      if (isMounted) {
        setCustomExercises(stored);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const addCustomExercise = (name: string, category: string): ExerciseDefinition => {
    const newExercise: ExerciseDefinition = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category: category || 'Custom',
    };
    const next = [...customExercises, newExercise];
    setCustomExercises(next);
    void saveJSON(STORAGE_KEY, next);
    return newExercise;
  };

  return { customExercises, addCustomExercise };
};
