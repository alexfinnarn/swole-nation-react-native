import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import mainStore from './src/store/main';
import AsyncStorage from '@react-native-community/async-storage';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import SplashScreen from 'react-native-splash-screen';
import WorkoutsListProvider from './src/components/workouts/WorkoutsListProvider';
import WorkoutProvider from './src/components/workouts/WorkoutProvider';
import SessionProvider from './src/components/sessions/SessionProvider';
import AddExerciseProvider from './src/components/exercises/AddExerciseProvider';
import HomeScreenProvider from './src/components/HomeScreenProvider';
import SessionsListProvider from './src/components/sessions/SessionsListProvider';
import ExercisesListProvider from './src/components/exercises/ExercisesListProvider';
import NavigationService from './src/services/NavigationService';
import SettingsProvider from './src/components/SettingsProvider';
import HeaderRight from './src/components/utility/HeaderRight';
import SNwebView from './src/components/utility/SNwebView';

export default function App() {
  const persistConfig = {
    key: 'root',
    keyPrefix: '',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, mainStore);
  const store = createStore(persistedReducer);
  let persistor = persistStore(store);
  // persistor.purge();

  const AppNavigator = createStackNavigator(
    {
      Home: {
        screen: HomeScreenProvider,
        navigationOptions: {
          title: 'Swole Nation',
        },
      },
      Session: {
        screen: SessionProvider,
      },
      SessionsList: {
        screen: SessionsListProvider,
        navigationOptions: {
          title: 'Sessions',
        },
      },
      WorkoutsList: {
        screen: WorkoutsListProvider,
        navigationOptions: {
          title: 'Workouts',
        },
      },
      ExercisesList: {
        screen: ExercisesListProvider,
        navigationOptions: {
          title: 'Exercises',
        },
      },
      Workout: {
        screen: WorkoutProvider,
      },
      AddExercise: {
        screen: AddExerciseProvider,
      },
      Settings: {
        screen: SettingsProvider,
        navigationOptions: {
          title: 'Settings',
        },
      },
      WebView: {
        screen: SNwebView,
        navigationOptions: {
          title: 'User Guide',
        },
      },
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#A0A0A0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: <HeaderRight />,
      },
    },
  );
  const AppContainer = createAppContainer(AppNavigator);

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </PersistGate>
    </Provider>
  );
}
