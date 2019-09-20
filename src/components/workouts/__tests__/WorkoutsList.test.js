import React from 'react';
import WorkoutsList from '../WorkoutsList';
import { render, fireEvent } from 'react-native-testing-library';
import data from '../../../store/data';
import ActionCard from "../../utility/ActionCard";
import ActionButton from "../../utility/ActionButton";
import {TouchableOpacity} from "react-native";
import shortId from "shortid";

let renderer, instance ={};
let workouts = Object.keys(data.workouts).map(key => data.workouts[key]);
const handle = {
  createWorkout: jest.fn(),
  deleteWorkout: jest.fn(),
  setActiveWorkoutKey: jest.fn(),
};
const navigation = {
  navigate: jest.fn()
};

beforeEach(() => {
  renderer = render(<WorkoutsList workouts={workouts} navigation={navigation} handle={handle} thing={shortId.generate()}/>);
  instance = renderer.getByTestId('workouts-list-root');
}, 0);

describe('<WorkoutsList />', () => {
  it('Should render two workouts in the list initially and three when workout added', () => {
    let actionCards = instance.findAllByType(ActionCard);
    expect(actionCards.length).toBe(2);
    expect(renderer.getAllByText('Edit').length).toBe(2);

    workouts.push({key: 'DWYVDAQWAw4', name: 'Workout C', description: 'blah', exercises: []});
    renderer.update(<WorkoutsList workouts={workouts} navigation={navigation} handle={handle} thing={shortId.generate()}/>);
    instance = renderer.getByTestId('workouts-list-root');

    actionCards = instance.findAllByType(ActionCard);
    expect(actionCards.length).toBe(3);
    expect(renderer.getAllByText('Edit').length).toBe(3);
  });

  it('Should navigate to the Workout screen when edit button pressed', () => {
    // Expect navigate to Stronglifts A workout.
    fireEvent(renderer.getAllByText('Edit')[0], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith('Workout', {action: 'edit', workoutKey: 'DQkECwYLCQQ'});
    expect(handle.setActiveWorkoutKey).toHaveBeenCalledTimes(1);
    expect(handle.setActiveWorkoutKey).toHaveBeenCalledWith('DQkECwYLCQQ');


    // Expect navigate to Stronglifts B workout.
    fireEvent(renderer.getAllByText('Edit')[1], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith('Workout', {action: 'edit', workoutKey: 'DAwJBQEMAA0'});
    expect(handle.setActiveWorkoutKey).toHaveBeenCalledTimes(2);
    expect(handle.setActiveWorkoutKey).toHaveBeenCalledWith('DAwJBQEMAA0');
  });

  it('Should delete a workout and remove it from the list', () => {
    expect(renderer.queryByText('Stronglifts A')).not.toBeNull();
    fireEvent(renderer.getAllByText('X')[0], 'press');
    expect(handle.deleteWorkout).toHaveBeenCalledTimes(1);
    expect(handle.deleteWorkout).toHaveBeenCalledWith('DQkECwYLCQQ');

    workouts.shift();
    renderer.update(<WorkoutsList workouts={workouts} navigation={navigation} handle={handle} thing={shortId.generate()}/>);
    expect(renderer.queryByText('Stronglifts A')).toBeNull();

  });
});
