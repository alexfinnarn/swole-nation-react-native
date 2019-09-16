import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import storage from 'redux-persist/lib/storage';
import mainStore from './src/store/main';
import AsyncStorage from '@react-native-community/async-storage';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WorkoutsListProvider from "./src/components/workouts/WorkoutsListProvider";
import WorkoutProvider from "./src/components/workouts/WorkoutProvider";
import SessionProvider from "./src/components/sessions/SessionProvider";
import AddExerciseProvider from "./src/components/exercises/AddExerciseProvider";
import HomeScreenProvider from "./src/components/HomeScreenProvider";
import SessionsListProvider from "./src/components/sessions/SessionsListProvider";
import ExercisesListProvider from "./src/components/exercises/ExercisesListProvider";
import NavigationService from './NavigationService';
import SettingsProvider from "./src/components/SettingsProvider";

export default function App() {
  const persistConfig = {
    key: 'root',
    keyPrefix: '',
    storage: AsyncStorage,
    // stateReconciler: autoMergeLevel2,
    manualPersist: true,
  };

  const persistedReducer = persistReducer(persistConfig, mainStore);
  const store = createStore(persistedReducer, applyMiddleware(logger));
  let persistor = persistStore(store);

  useEffect(() => {
    persistor.persist();
  }, []);
  // persistor.purge();

  const AppNavigator = createStackNavigator(
    {
      Home: {
        screen: HomeScreenProvider,
        navigationOptions: {
          title: 'Home',
        },
      },
      Session: { screen: SessionProvider },
      SessionsList: { screen: SessionsListProvider },
      WorkoutsList: { screen: WorkoutsListProvider },
      ExercisesList: { screen: ExercisesListProvider },
      Workout: { screen: WorkoutProvider },
      AddExercise: { screen: AddExerciseProvider },
      Settings: { screen: SettingsProvider },
    },
    {
      initialRouteName: 'Home'
    }
  );

  const AppContainer = createAppContainer(AppNavigator);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
      </PersistGate>
    </Provider>
  );
}
