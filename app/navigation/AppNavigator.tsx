import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';

import { BottomTabBar } from './BottomTabBar';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import { HistoryStackParamList, HomeStackParamList, ProgressStackParamList } from './types';
import { Workout } from '../types/workout';
import { useWorkouts } from '../store/useWorkouts';

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
}: {
  workouts: Workout[];
  activeWorkout: Workout | null;
  setActiveWorkout: (workout: Workout | null) => void;
  setWorkouts: (workouts: Workout[]) => Promise<void> | void;
  lastWorkout?: Workout;
}) {
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
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  const lastWorkout = useMemo(() => workouts[0], [workouts]);

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
