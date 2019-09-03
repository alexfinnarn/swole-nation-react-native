import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainStore from './src/store/main';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "./src/components/Home";
import Workout from "./src/components/Workout";
import WorkoutsListProvider from "./src/components/WorkoutsListProvider";

export default function App() {
  console.log('foo');

  const store = createStore(mainStore);

  const AppNavigator = createStackNavigator(
    {
      Home: {
        screen: Home
      },
      WorkoutsList: {
        screen: WorkoutsListProvider
      },
      Workout: {
        screen: Workout
      },
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
