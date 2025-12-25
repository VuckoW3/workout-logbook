import { useEffect, useRef, useState } from 'react';

import { loadJSON, saveJSON } from './storage';
import { WorkoutTemplate } from '../types/workout';

const TEMPLATES_KEY = 'workout-templates';

export function useTemplates() {
  const [templates, setTemplatesState] = useState<WorkoutTemplate[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const hasUpdatedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const stored = await loadJSON<WorkoutTemplate[]>(TEMPLATES_KEY, []);
      if (isMounted && !hasUpdatedRef.current) {
        setTemplatesState(stored);
      }
      if (isMounted) setHydrated(true);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const setTemplates = async (next: WorkoutTemplate[]) => {
    hasUpdatedRef.current = true;
    setTemplatesState(next);
    await saveJSON(TEMPLATES_KEY, next);
  };

  return { templates, hydrated, setTemplates };
}
