import React from 'react';
import AddExerciseSet from '../AddExerciseSet';
import {render, fireEvent} from 'react-native-testing-library';
import data from '../../../store/data';
import {Picker} from "react-native";
import AddExercise from "../AddExercise";

let renderer, instance = {};
const updater = jest.fn();


describe('<AddExerciseSet />', () => {
  it('Renders correctly', () => {
    renderer = render(<AddExerciseSet updater={updater} toAdd={true}/>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('renders default values with toAdd', () => {
    renderer = render(<AddExerciseSet updater={updater} toAdd={true}/>);
    instance = renderer.getByTestId('add-exercise-set-root');

    expect(renderer.getByTestId('reps-picker').props.selectedValue).toBe('0');
    expect(renderer.getByTestId('weight-picker').props.selectedValue).toBe('100');
    expect(renderer.getByText('+')).toBeTruthy();
  });

  it('renders passed in item with toAdd false', () => {
    const item = {item: {reps: 5, weight: 145}, index: 1};
    renderer = render(<AddExerciseSet item={item} updater={updater} toAdd={false}/>);
    instance = renderer.getByTestId('add-exercise-set-root');

    expect(renderer.getByTestId('reps-picker').props.selectedValue).toBe('5');
    expect(renderer.getByTestId('weight-picker').props.selectedValue).toBe('145');

    fireEvent(renderer.getByText('X'), 'press');
    expect(updater).toHaveBeenCalledTimes(1);
    expect(updater).toHaveBeenLastCalledWith({reps: '5', weight: '145'}, 1, 'REMOVE_SET');
  });

  it('updates set weight and reps and saves', () => {
    renderer = render(<AddExerciseSet updater={updater} toAdd={true}/>);
    instance = renderer.getByTestId('add-exercise-set-root');

    const repsPicker = renderer.getByTestId('reps-picker');
    const weightPicker = renderer.getByTestId('weight-picker');

    fireEvent(repsPicker, 'valueChange', '4');
    expect(repsPicker.props.selectedValue).toBe('4');

    fireEvent(weightPicker, 'valueChange', '160');
    expect(weightPicker.props.selectedValue).toBe('160');

    fireEvent(renderer.getByText('+'), 'press');

    // Should not be called the previous two times on changing reps and weight numbers.
    expect(updater).toHaveBeenCalledTimes(2);
    expect(updater).toHaveBeenLastCalledWith({reps: '4', weight: '160'}, 0, 'ADD_SET');
  });
});

