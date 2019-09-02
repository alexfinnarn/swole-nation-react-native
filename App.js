import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "./src/components/Home";
import WorkoutsList from "./src/components/WorkoutsList";

export default function App() {

  const AppNavigator = createStackNavigator(
    {
      Home: {
        screen: Home
      },
      WorkoutsList: {
        screen: WorkoutsList
      }
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
