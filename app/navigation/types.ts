import { Workout } from '../types/workout';

export type WorkoutParam = { mode: 'active' | 'detail'; workoutId: string };

export type HomeStackParamList = {
  Home: undefined;
  Workout: WorkoutParam;
  Settings: undefined;
};

export type HistoryStackParamList = {
  History: undefined;
  Workout: WorkoutParam;
};

export type ProgressStackParamList = {
  Progress: undefined;
};

export type WorkoutWithExercises = Workout;
