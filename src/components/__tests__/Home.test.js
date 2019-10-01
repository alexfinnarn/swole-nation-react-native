import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import data from '../../store/data'
import Home from '../Home';
import ActionCard from "../utility/ActionCard";
import {TouchableOpacity} from "react-native";

let renderer, instance ={};
const workouts = Object.keys(data.workouts).map((key) => data.workouts[key]);
let session = data.sessions[Object.keys(data.sessions)[0]];
const handle = {
  nextWorkoutInteraction: jest.fn()
};
const navigation = {
  navigate: jest.fn()
};

beforeEach(() => {
  // renderer = TestRenderer.create(<Home workouts={workouts} navigation={navigation} handle={handle}/>);
  // instance = renderer.root;

  renderer = render(<Home workouts={workouts} navigation={navigation} handle={handle} sessionTeaser={session}/>);
  instance = renderer.getByTestId('home-root');
}, 0);

describe('<Home />', () => {
  it('Renders correctly', () => {
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('Renders four actions cards on load', () => {
    expect(instance.findAllByType(ActionCard).length).toBe(4);
  });

  it('Renders Picker and updates when user makes selection', () => {
    const element = renderer.getByTestId('workout-picker');
    expect(element.props.selectedValue).toBe('DAwJBQEMAA0');

    // Select other workout.
    fireEvent(element, 'valueChange', 'DQkECwYLCQQ');
    expect(element.props.selectedValue).toBe('DQkECwYLCQQ');

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
    expect(navigation.navigate).toHaveBeenCalledWith('Workout', {
      action: 'go',
      title: "Stronglifts B"
    });
    expect(handle.nextWorkoutInteraction).toHaveBeenCalledWith('DAwJBQEMAA0');

    // Sessions.
    fireEvent(navigationButtons[3], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith('WorkoutsList');
  });

  // @todo Write test.
  // it('Loads and displays the session teaser', () => {
  //
  // });
});
