import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainStore from './src/store/main';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "./src/components/Home";
import WorkoutsListProvider from "./src/components/workouts/WorkoutsListProvider";
import WorkoutProvider from "./src/components/workouts/WorkoutProvider";
import SessionProvider from "./src/components/sessions/SessionProvider";
import AddExerciseProvider from "./src/components/exercises/AddExerciseProvider";

export default function App() {
  const store = createStore(mainStore);

  const AppNavigator = createStackNavigator(
    {
      Home: { screen: Home },
      Session: { screen: SessionProvider },
      WorkoutsList: { screen: WorkoutsListProvider },
      Workout: { screen: WorkoutProvider },
      AddExercise: { screen: AddExerciseProvider },
    },
    {
      initialRouteName: 'AddExercise'
    }
  );

  const AppContainer = createAppContainer(AppNavigator);

  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  );
}
