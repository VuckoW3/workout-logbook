import { Workout } from '../types/workout';
import { WorkoutTemplate } from '../types/workout';

export type WorkoutParam = { mode: 'active' | 'detail'; workoutId: string };

export type HomeStackParamList = {
  Home: undefined;
  Workout: WorkoutParam;
  Settings: undefined;
  Templates: undefined;
};

export type HistoryStackParamList = {
  History: undefined;
  Workout: WorkoutParam;
};

export type ProgressStackParamList = {
  Progress: undefined;
};

export type WorkoutWithExercises = Workout;
export type TemplateParam = WorkoutTemplate;
