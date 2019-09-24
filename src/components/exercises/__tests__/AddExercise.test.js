import React from 'react';
import AddExercise from '../AddExercise';
import {render, fireEvent} from 'react-native-testing-library';
import data from '../../../store/data';
import {Picker} from "react-native";
import AddExerciseSet from "../AddExerciseSet";

let renderer, instance = {};
let exercises = Object.keys(data.exercises).map(key => data.exercises[key]);
const theExercise = {key: 'svcmwFlJ', new: true, name: '', instructions: '', sets: []};
const handle = {
  update: jest.fn(),
  save: jest.fn((exercise) => {
    theExercise.sets.push();
  }),
};
const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn()
};

describe('<AddExercise />', () => {
  it('Renders correctly', () => {
    renderer = render(<AddExercise exercises={exercises} handle={handle} navigation={navigation}
                                   theExercise={theExercise} pickerEnabled={false}/>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('Edits name and saves exercise correctly', () => {
    renderer = render(<AddExercise exercises={exercises} handle={handle} navigation={navigation}
                                   theExercise={theExercise} pickerEnabled={false}/>);
    instance = renderer.getByTestId('add-exercise-root');

    // Two pickers confirms that one ExerciseSet component is loaded by the name picker is not.
    expect(instance.findAllByType(Picker).length).toBe(2);

    // See that name change sticks.
    const textInput = renderer.getByPlaceholder('Enter Exercise');
    expect(textInput.props.value).toBe('');
    fireEvent.changeText(textInput, 'My Exercise');
    expect(textInput.props.value).toBe('My Exercise');

    // Exercise not connected to a workout by default so the user will be saving it and going back to exercises list.
    fireEvent(renderer.getByText('Save'), 'press');
    expect(navigation.goBack).toHaveBeenCalled();
    expect(handle.save).toHaveBeenCalledWith({key: 'svcmwFlJ', new: true, name: 'My Exercise', instructions: '', sets: []});
  });

  it('Handles changes to exercise picker', () => {
    renderer = render(<AddExercise exercises={exercises} handle={handle} navigation={navigation}
                                   theExercise={exercises[0]} pickerEnabled={true}/>);
    instance = renderer.getByTestId('add-exercise-root');

    // Squats Warmup is selected by default.
    const picker = renderer.getByTestId('exercise-picker');
    expect(picker.props.selectedValue).toBe('BwEBDwoFBgQ');

    // Six warmup sets + the add exercise option.
    expect(instance.findAllByType(AddExerciseSet).length).toBe(7);

    // Change it to Squats.
    fireEvent(picker, 'valueChange', 'Bw0ECwAKBws');
    expect(picker.props.selectedValue).toBe('Bw0ECwAKBws');

    // Five sets + the add exercise option.
    expect(instance.findAllByType(AddExerciseSet).length).toBe(6);
  });

  it('Renders disabled picker and Add instead of Save', () => {
    // Make workout connected for change in save button.
    exercises[0].connectedWorkout = true;

    renderer = render(<AddExercise exercises={exercises} handle={handle} navigation={navigation}
                                   theExercise={exercises[0]} pickerEnabled={false}/>);
    instance = renderer.getByTestId('add-exercise-root');

    const picker = renderer.getByTestId('exercise-picker');
    expect(picker.props.enabled).toBe(false);

    fireEvent(renderer.getByText('Add'), 'press');
    expect(navigation.goBack).toHaveBeenCalled();
    expect(handle.save).toHaveBeenCalledWith({
      name: "Squats Warmup",
      key: "BwEBDwoFBgQ",
      connectedWorkout: true,
      image: 1,
      instructions: "Do with a barbell",
      sets: [
        {"reps": 5, "weight": 45.0},
        {"reps": 5, "weight": 45.0},
        {"reps": 5, "weight": 95.0},
        {"reps": 5, "weight": 135.0},
        {"reps": 3, "weight": 185.0},
        {"reps": 2, "weight": 205.0}
      ]
    });
  });

});
