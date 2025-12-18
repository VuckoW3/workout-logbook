import { useEffect, useRef, useState } from 'react';

import { workoutHistory } from '../lib/mockData';
import { Workout } from '../types/workout';
import { loadJSON, saveJSON } from './storage';

const WORKOUTS_KEY = 'workouts';

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const hasUpdatedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const stored = await loadJSON<Workout[]>(WORKOUTS_KEY, workoutHistory);
      if (isMounted && !hasUpdatedRef.current) {
        setWorkouts(stored);
      }
      if (isMounted) setHydrated(true);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateWorkouts = async (next: Workout[]) => {
    hasUpdatedRef.current = true;
    setWorkouts(next);
    await saveJSON(WORKOUTS_KEY, next);
  };

  return { workouts, hydrated, setWorkouts: updateWorkouts };
}
