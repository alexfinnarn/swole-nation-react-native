import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainStore from './src/store/main';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WorkoutsListProvider from "./src/components/workouts/WorkoutsListProvider";
import WorkoutProvider from "./src/components/workouts/WorkoutProvider";
import SessionProvider from "./src/components/sessions/SessionProvider";
import AddExerciseProvider from "./src/components/exercises/AddExerciseProvider";
import HomeScreenProvider from "./src/components/HomeScreenProvider";
import SessionsListProvider from "./src/components/sessions/SessionsListProvider";
import ExercisesListProvider from "./src/components/exercises/ExercisesListProvider";

export default function App() {
  const store = createStore(mainStore);

  const AppNavigator = createStackNavigator(
    {
      Home: { screen: HomeScreenProvider },
      Session: { screen: SessionProvider },
      SessionsList: { screen: SessionsListProvider },
      WorkoutsList: { screen: WorkoutsListProvider },
      ExercisesList: { screen: ExercisesListProvider },
      Workout: { screen: WorkoutProvider },
      AddExercise: { screen: AddExerciseProvider },
    },
    {
      initialRouteName: 'Home'
    }
  );

  const AppContainer = createAppContainer(AppNavigator);

  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  );
}
