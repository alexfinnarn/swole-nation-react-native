import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import data from "../../../store/data";
import WorkoutExerciseList from "../WorkoutExerciseList";
import ActionCard from "../../utility/ActionCard";
import {TouchableOpacity} from "react-native-web";
import ActionButton from "../../utility/ActionButton";

const strongliftsA = 'DQkECwYLCQQ';
const strongliftsB = 'DAwJBQEMAA0';
const handle = {
  createExercise: jest.fn(),
  setActiveExerciseKey: jest.fn(),
};
const navigation = {
  navigate: jest.fn()
};
let renderer, instance ={};
let exercises = {};

function getExercises(key) {
  return data.workouts[key].exercises.map((name) => {
    const foundKey = Object.keys(data.exercises).find(key => data.exercises[key].name === name);
    return data.exercises[foundKey];
  });
}


beforeEach(() => {
  exercises = getExercises(strongliftsA);
  renderer = render(<WorkoutExerciseList exercises={exercises} navigation={navigation} handle={handle} />);
  instance = renderer.getByTestId('workout-exercise-list-root');
}, 0);

describe('<WorkoutExerciseList />', () => {
  it('Renders correctly', () => {
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('Renders the correct amount of items per workout', () => {
    let actionCards = instance.findAllByType(ActionCard);
    expect(actionCards.length).toBe(6);

    expect(renderer.queryByText('Deadlifts')).toBeNull();
    expect(renderer.queryByText('Bench Press')).not.toBeNull();

    exercises = getExercises(strongliftsB);
    renderer.update(<WorkoutExerciseList exercises={exercises} navigation={navigation} handle={handle} />)

    actionCards = instance.findAllByType(ActionCard);
    expect(actionCards.length).toBe(6);

    expect(renderer.queryByText('Deadlifts')).not.toBeNull();
    expect(renderer.queryByText('Bench Press')).toBeNull();

  });

  it('Goes to correct exercise when Edit is pressed', () => {
    let editButtons = renderer.getAllByText('Edit');

    // Edit Squats Warmup.
    fireEvent(editButtons[0], 'press');
    expect(handle.setActiveExerciseKey).toHaveBeenCalledTimes(1);
    expect(handle.setActiveExerciseKey).toHaveBeenCalledWith('BwEBDwoFBgQ');

    // Edit Barbell Row.
    fireEvent(editButtons[editButtons.length - 1], 'press');
    expect(handle.setActiveExerciseKey).toHaveBeenCalledTimes(2);
    expect(handle.setActiveExerciseKey).toHaveBeenLastCalledWith('BwQKAwYKAgA');
  });
});
