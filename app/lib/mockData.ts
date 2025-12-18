import { Workout, ExerciseDefinition, ExerciseProgress } from "../types/workout";

export const exerciseLibrary: ExerciseDefinition[] = [
  { id: "1", name: "Bench Press", category: "Chest" },
  { id: "2", name: "Squat", category: "Legs" },
  { id: "3", name: "Deadlift", category: "Back" },
  { id: "4", name: "Overhead Press", category: "Shoulders" },
  { id: "5", name: "Barbell Row", category: "Back" },
  { id: "6", name: "Pull-up", category: "Back" },
  { id: "7", name: "Dumbbell Curl", category: "Arms" },
  { id: "8", name: "Tricep Pushdown", category: "Arms" },
  { id: "9", name: "Leg Press", category: "Legs" },
  { id: "10", name: "Romanian Deadlift", category: "Legs" },
  { id: "11", name: "Lat Pulldown", category: "Back" },
  { id: "12", name: "Incline Bench Press", category: "Chest" },
  { id: "13", name: "Dumbbell Fly", category: "Chest" },
  { id: "14", name: "Leg Curl", category: "Legs" },
  { id: "15", name: "Calf Raise", category: "Legs" },
];

export const workoutHistory: Workout[] = [
  {
    id: "1",
    date: "2024-01-10",
    completed: true,
    duration: 58,
    exercises: [
      {
        id: "e1",
        name: "Bench Press",
        sets: [
          { id: "s1", weight: 80, reps: 8, completed: true },
          { id: "s2", weight: 80, reps: 8, completed: true },
          { id: "s3", weight: 85, reps: 6, completed: true },
        ],
      },
      {
        id: "e2",
        name: "Incline Bench Press",
        sets: [
          { id: "s4", weight: 60, reps: 10, completed: true },
          { id: "s5", weight: 60, reps: 10, completed: true },
          { id: "s6", weight: 65, reps: 8, completed: true },
        ],
      },
    ],
  },
  {
    id: "2",
    date: "2024-01-08",
    completed: true,
    duration: 65,
    exercises: [
      {
        id: "e3",
        name: "Squat",
        sets: [
          { id: "s7", weight: 100, reps: 5, completed: true },
          { id: "s8", weight: 100, reps: 5, completed: true },
          { id: "s9", weight: 105, reps: 4, completed: true },
        ],
      },
      {
        id: "e4",
        name: "Romanian Deadlift",
        sets: [
          { id: "s10", weight: 80, reps: 8, completed: true },
          { id: "s11", weight: 80, reps: 8, completed: true },
        ],
      },
    ],
  },
  {
    id: "3",
    date: "2024-01-05",
    completed: true,
    duration: 52,
    exercises: [
      {
        id: "e5",
        name: "Deadlift",
        sets: [
          { id: "s12", weight: 120, reps: 5, completed: true },
          { id: "s13", weight: 130, reps: 3, completed: true },
        ],
      },
      {
        id: "e6",
        name: "Barbell Row",
        sets: [
          { id: "s14", weight: 70, reps: 8, completed: true },
          { id: "s15", weight: 70, reps: 8, completed: true },
        ],
      },
    ],
  },
];

export const benchPressProgress: ExerciseProgress[] = [
  { date: "2023-11-01", maxWeight: 70, totalVolume: 1680 },
  { date: "2023-11-15", maxWeight: 72.5, totalVolume: 1740 },
  { date: "2023-12-01", maxWeight: 75, totalVolume: 1800 },
  { date: "2023-12-15", maxWeight: 77.5, totalVolume: 1860 },
  { date: "2024-01-01", maxWeight: 80, totalVolume: 1920 },
  { date: "2024-01-10", maxWeight: 85, totalVolume: 2040 },
];
