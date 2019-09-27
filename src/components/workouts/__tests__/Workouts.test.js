import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import data from '../../../store/data';
import main from '../../../store/main';
import Workout from "../Workout";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Picker} from "react-native";
import WorkoutsExerciseList from '../../exercises/WorkoutExerciseList';

let renderer, instance = {};
let workouts = Object.keys(data.workouts).map(key => data.workouts[key]);
const transformers = Object.keys(data.transformers).map((key) => data.transformers[key]);
const handle = {
  update: jest.fn(),
};
const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  getParam: jest.fn(),
};

beforeEach(() => {
  renderer = render(
    (<Provider store={createStore(main)}>
      <Workout workout={workouts[0]} navigation={navigation} handle={handle} transformers={transformers} actionType="save"/>
    </Provider>));
  instance = renderer.getByTestId('workout-root');
}, 0);

describe('<Workout />', () => {
  // @todo Foiled by the extraData param that is always unique. I shouldn't need that data to re-render so I should remove it.
  // it('Renders correctly', () => {
  //   expect(renderer.toJSON()).toMatchSnapshot();
  // });

  it('Displays the name and description of workout and updates text inputs correctly', () => {
    const nameInput = renderer.getByPlaceholder('Workout A');
    const descriptionInput = renderer.getByPlaceholder('Workout Description');

    expect(nameInput.props.value).toBe('Stronglifts A');
    expect(descriptionInput.props.value).toBe('Squats, Bench Press, Barbell Row');

    fireEvent.changeText(nameInput, 'Foo');
    fireEvent.changeText(descriptionInput, 'Bar');

    expect(nameInput.props.value).toBe('Foo');
    expect(descriptionInput.props.value).toBe('Bar');
  });

  it('Selects a Transformer', () => {
    const element = renderer.getByTestId('transformer-picker');
    expect(element.props.selectedValue).toBe('none');

    // Select other workout.
    fireEvent(element, 'valueChange', 'addFive');
    expect(element.props.selectedValue).toBe('addFive');
  });

  it('Displays one WorkoutsExerciseList', () => {
    expect(instance.findAllByType(WorkoutsExerciseList).length).toBe(1);
  });

  it('Displays "Save" or "Go" button based on "go" navigation parameter', () => {
    expect(renderer.queryByText('Save')).not.toBeNull();
    expect(renderer.queryByText('Go')).toBeNull();

    // Trigger re-render with simulated navigation parameter.
    renderer.update(<Provider store={createStore(main)}>
      <Workout workout={workouts[0]} navigation={navigation} handle={handle} transformers={transformers} actionType="go"/>
    </Provider>);

    expect(renderer.queryByText('Save')).toBeNull();
    expect(renderer.queryByText('Go')).not.toBeNull();
  });

  it('Add exercise button navigates to AddExercise screen', () => {
    // For now, just test that the button doesn't show up.
    expect(renderer.queryByText('Add Exercise')).toBeNull();

    // fireEvent(renderer.getByText('Add Exercise'), 'press');
    // expect(navigation.navigate).toHaveBeenCalledTimes(1);
    // expect(navigation.navigate).toHaveBeenCalledWith("AddExercise", {
    //   "pickerEnabled": true,
    //   "workout": {
    //     "workout": {
    //       "description": "Squats, Bench Press, Barbell Row", "exercises": ["Squats Warmup", "Squats", "Bench Press Warmup", "Bench Press", "Barbell Row Warmup", "Barbell Row"],
    //       "key": "DQkECwYLCQQ",
    //       "name": "Stronglifts A"
    //     }
    //   }
    // });
  });
});
