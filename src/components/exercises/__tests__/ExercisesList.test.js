import React from 'react';
import ExercisesList from '../ExercisesList';
import { render, fireEvent } from 'react-native-testing-library';
import data from '../../../store/data';
import ActionCard from "../../utility/ActionCard";
import ActionButton from "../../utility/ActionButton";
import {TouchableOpacity} from "react-native";
import AddExerciseSet from "../AddExerciseSet";

let renderer, instance ={};
let exercises = Object.keys(data.exercises).map(key => data.exercises[key]);
const handle = {
  createExercise: jest.fn(),
  setActiveExerciseKey: jest.fn(),
};
const navigation = {
  navigate: jest.fn()
};

beforeEach(() => {
  renderer = render(<ExercisesList exercises={exercises} navigation={navigation} handle={handle} />);
  instance = renderer.getByTestId('exercises-list-root');
}, 0);

describe('<ExercisesList />', () => {
  it('Renders correctly', () => {
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('Renders all 10 exercise action cards on load', () => {
    const actionCards = instance.findAllByType(ActionCard);
    expect(actionCards.length).toBe(10);
    expect(renderer.getAllByText('Edit').length).toBe(10);

    // First card should have an action button.
    expect(actionCards[0].props.actionComponent.type).toEqual(ActionButton);
  });

  it('Navigates to exercise scree with correct exercise ID', () => {
    const navigationButtons = instance.findAllByType(TouchableOpacity);

    // Navigate to Squats Warmup.
    fireEvent(navigationButtons[0], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith("AddExercise", {
      exerciseKey: "BwEBDwoFBgQ",
      title: "Squats Warmup"
    });

    // Navigate to Deadlifts.
    fireEvent(navigationButtons[9], 'press');
    expect(navigation.navigate).toHaveBeenLastCalledWith("AddExercise", {
      exerciseKey: "DAYCDAQKAw4",
      title: "Deadlifts"
    });

    // Navigate to New Exercise.
    // fireEvent(renderer.getByText('Add Exercise'), 'press');
    // expect(navigation.navigate).toHaveBeenCalledWith("AddExercise");
    // expect(handle.createExercise).toHaveBeenCalled();

  });

  it('Updates FlatList when re-rendered', () => {
    let navigationButtons = instance.findAllByType(TouchableOpacity);

    // Navigate to Squats.
    fireEvent(navigationButtons[0], 'press');
    expect(navigation.navigate).toHaveBeenCalledWith("AddExercise", {
      exerciseKey: "BwEBDwoFBgQ",
      title: "Squats Warmup"
    });

    // Rearrange Deadlifts to take Squats place in array.
    const squats = exercises.shift();
    const deadlifts = exercises.pop();
    exercises.unshift(deadlifts);

    renderer = renderer.update(<ExercisesList exercises={exercises} navigation={navigation} handle={handle} />);
    navigationButtons = instance.findAllByType(TouchableOpacity);

    expect(instance.findAllByType(ActionCard).length).toBe(9);

    // Navigate to Deadlifts.
    fireEvent(navigationButtons[0], 'press');
    expect(navigation.navigate).toHaveBeenLastCalledWith("AddExercise", {
      exerciseKey: "DAYCDAQKAw4",
      title: "Deadlifts"
    });
  });
});
