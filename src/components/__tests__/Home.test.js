import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import data from '../../store/data'
import Home from '../Home';
import ActionCard from "../utility/ActionCard";
import {TouchableOpacity} from "react-native";
// import * as navigation from '../../../NavigationService';
// jest.mock('../../../NavigationService');


const workouts = Object.keys(data.workouts).map((key) => data.workouts[key]);

const handle = {
  nextWorkoutInteraction: jest.fn()
};

const navigation = {
  navigate: jest.fn()
};

let renderer, instance ={};

beforeEach(() => {
  // renderer = TestRenderer.create(<Home workouts={workouts} navigation={navigation} handle={handle}/>);
  // instance = renderer.root;

  renderer = render(<Home workouts={workouts} navigation={navigation} handle={handle}/>);
  instance = renderer.getByTestId('home-root');
}, 0);

describe('<Home />', () => {
  it('Renders four actions cards on load', () => {
    expect(instance.findAllByType(ActionCard).length).toBe(4);
  });

  it('Renders Picker and updates when user makes selection', () => {
    const element = renderer.getByTestId('workout-picker');
    expect(element.props.selectedValue).toBe('DQkECwYLCQQ');

    // Select other workout.
    fireEvent(element, 'valueChange', 'DAwJBQEMAA0');
    expect(element.props.selectedValue).toBe('DAwJBQEMAA0');

  });

  it('Navigates correctly to all four navigation routes', () => {
    const navigationButtons = instance.findAllByType(TouchableOpacity);

    // Sessions.
    fireEvent(navigationButtons[0], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith('SessionsList');

    // Sessions.
    fireEvent(navigationButtons[1], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith('SessionsList');

    // Sessions.
    fireEvent(navigationButtons[2], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith('Workout', {action: 'go'});
    expect(handle.nextWorkoutInteraction).toHaveBeenCalledWith('DQkECwYLCQQ');

    // Sessions.
    fireEvent(navigationButtons[3], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith('WorkoutsList');
  });

  // @todo Write test.
  // it('Loads and displays the session teaser', () => {
  //
  // });
});
