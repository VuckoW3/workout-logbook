export interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
}

export interface Workout {
  id: string;
  date: string;
  exercises: WorkoutExercise[];
  duration?: number; // in minutes
  completed: boolean;
}

export interface ExerciseDefinition {
  id: string;
  name: string;
  category: string;
}

export interface ExerciseProgress {
  date: string;
  maxWeight: number;
  totalVolume: number;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  exerciseIds: string[];
}
