import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';

import { BottomTabBar } from './BottomTabBar';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TemplatesScreen from '../screens/TemplatesScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import { HistoryStackParamList, HomeStackParamList, ProgressStackParamList } from './types';
import { ExerciseDefinition, Workout, WorkoutExercise, WorkoutTemplate } from '../types/workout';
import { useWorkouts } from '../store/useWorkouts';
import { useTemplates } from '../store/useTemplates';
import { useCustomExercises } from '../lib/useCustomExercises';
import { exerciseLibrary } from '../lib/mockData';
import { buildLastExerciseSetsMap, getPrefilledSets } from '../lib/exercisePrefill';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();
const ProgressStack = createNativeStackNavigator<ProgressStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStackNavigator({
  workouts,
  activeWorkout,
  setActiveWorkout,
  setWorkouts,
  lastWorkout,
  templates,
  setTemplates,
  exerciseDefinitions,
  customExercises,
  addCustomExercise,
}: {
  workouts: Workout[];
  activeWorkout: Workout | null;
  setActiveWorkout: (workout: Workout | null) => void;
  setWorkouts: (workouts: Workout[]) => Promise<void> | void;
  lastWorkout?: Workout;
  templates: WorkoutTemplate[];
  setTemplates: (templates: WorkoutTemplate[]) => Promise<void> | void;
  exerciseDefinitions: ExerciseDefinition[];
  customExercises: ExerciseDefinition[];
  addCustomExercise: (name: string, category: string) => ExerciseDefinition;
}) {
  const exercisePrefillMap = useMemo(() => buildLastExerciseSetsMap(workouts), [workouts]);

  const startFromTemplate = (template: WorkoutTemplate, navigation: any) => {
    const exercises: WorkoutExercise[] = template.exerciseIds
      .map((id, index) => {
        const def = exerciseDefinitions.find((ex) => ex.id === id);
        if (!def) return null;
        return {
          id: `ex-${Date.now()}-${index}`,
          name: def.name,
          sets: getPrefilledSets(exercisePrefillMap, def.name),
        };
      })
      .filter(Boolean) as WorkoutExercise[];

    const newWorkout: Workout = {
      id: `w-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      exercises,
      completed: false,
    };
    setActiveWorkout(newWorkout);
    navigation.navigate('Workout', { mode: 'active', workoutId: newWorkout.id });
  };

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            lastWorkout={lastWorkout}
            onStartWorkout={() => {
              const newWorkout: Workout = {
                id: `w-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                exercises: [],
                completed: false,
              };
              setActiveWorkout(newWorkout);
              props.navigation.navigate('Workout', { mode: 'active', workoutId: newWorkout.id });
            }}
            onViewHistory={() => props.navigation.getParent()?.navigate('HistoryTab')}
            onViewTemplates={() => props.navigation.navigate('Templates')}
          />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen name="Templates">
        {(props) => (
          <TemplatesScreen
            {...props}
            templates={templates}
            exercises={exerciseDefinitions}
            customExercises={customExercises}
            onAddCustomExercise={addCustomExercise}
            onSaveTemplate={(template) => {
              const exists = templates.find((t) => t.id === template.id);
              const next = exists
                ? templates.map((t) => (t.id === template.id ? template : t))
                : [template, ...templates];
              void setTemplates(next);
            }}
            onDeleteTemplate={(templateId) => {
              const next = templates.filter((t) => t.id !== templateId);
              void setTemplates(next);
            }}
            onStartFromTemplate={(template) => startFromTemplate(template, props.navigation)}
          />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen name="Workout">
        {(props) => (
          <WorkoutScreen
            {...props}
            activeWorkout={activeWorkout}
            workouts={workouts}
            onUpdateActive={(workout) => setActiveWorkout(workout)}
            onFinishActive={() => {
              if (activeWorkout && activeWorkout.exercises.length > 0) {
                const completed: Workout = {
                  ...activeWorkout,
                  completed: true,
                  duration: Math.floor(Math.random() * 30) + 30,
                };
                void setWorkouts([completed, ...workouts]);
              }
              setActiveWorkout(null);
              props.navigation.navigate('Home');
            }}
            onCancelActive={() => {
              setActiveWorkout(null);
              props.navigation.navigate('Home');
            }}
            customExercises={customExercises}
            onAddCustomExercise={addCustomExercise}
          />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen name="Settings" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
}

function HistoryStackNavigator({
  workouts,
  activeWorkout,
  setActiveWorkout,
  setWorkouts,
}: {
  workouts: Workout[];
  activeWorkout: Workout | null;
  setActiveWorkout: (workout: Workout | null) => void;
  setWorkouts: (workouts: Workout[]) => Promise<void> | void;
}) {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="History">
        {(props) => (
          <HistoryScreen
            {...props}
            workouts={workouts}
            onSelectWorkout={(workout: Workout) =>
              props.navigation.navigate('Workout', { mode: 'detail', workoutId: workout.id })
            }
          />
        )}
      </HistoryStack.Screen>
      <HistoryStack.Screen name="Workout">
        {(props) => (
          <WorkoutScreen
            {...props}
            activeWorkout={activeWorkout}
            workouts={workouts}
            onUpdateActive={(workout) => setActiveWorkout(workout)}
            onFinishActive={() => {
              if (activeWorkout && activeWorkout.exercises.length > 0) {
                const completed: Workout = {
                  ...activeWorkout,
                  completed: true,
                  duration: Math.floor(Math.random() * 30) + 30,
                };
                void setWorkouts([completed, ...workouts]);
              }
              setActiveWorkout(null);
              props.navigation.navigate('History');
            }}
            onCancelActive={() => {
              setActiveWorkout(null);
              props.navigation.navigate('History');
            }}
          />
        )}
      </HistoryStack.Screen>
    </HistoryStack.Navigator>
  );
}

function ProgressStackNavigator() {
  return (
    <ProgressStack.Navigator screenOptions={{ headerShown: false }}>
      <ProgressStack.Screen name="Progress" component={ProgressScreen} />
    </ProgressStack.Navigator>
  );
}

export function AppNavigator() {
  const { workouts, setWorkouts } = useWorkouts();
  const { templates, setTemplates } = useTemplates();
  const { customExercises } = useCustomExercises();
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  const lastWorkout = useMemo(() => workouts[0], [workouts]);
  const exerciseDefinitions = useMemo<ExerciseDefinition[]>(
    () => [...exerciseLibrary, ...customExercises],
    [customExercises],
  );

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName="HomeTab"
    >
      <Tab.Screen name="HomeTab" options={{ title: 'Home' }}>
        {() => (
          <HomeStackNavigator
          workouts={workouts}
          activeWorkout={activeWorkout}
          setActiveWorkout={setActiveWorkout}
          setWorkouts={setWorkouts}
          lastWorkout={lastWorkout}
          templates={templates}
          setTemplates={setTemplates}
          exerciseDefinitions={exerciseDefinitions}
        />
      )}
    </Tab.Screen>
      <Tab.Screen name="HistoryTab" options={{ title: 'History' }}>
        {() => (
          <HistoryStackNavigator
            workouts={workouts}
            activeWorkout={activeWorkout}
            setActiveWorkout={setActiveWorkout}
            setWorkouts={setWorkouts}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="ProgressTab" options={{ title: 'Progress' }}>
        {() => <ProgressStackNavigator />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
