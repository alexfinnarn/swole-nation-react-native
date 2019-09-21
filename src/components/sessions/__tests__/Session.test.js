import React from 'react';
import Session from '../Session';
import {render, fireEvent, act} from 'react-native-testing-library';
import {Image} from 'react-native';
import data from '../../../store/data';
import ActionButton from "../../utility/ActionButton";
import backgroundTimer from '../../../services/backgroundTimer';

const timerStop = jest.spyOn(backgroundTimer, 'stop');
const timerStart = jest.spyOn(backgroundTimer, 'start');

let renderer, instance = {};
const strongliftsA = 'DQkECwYLCQQ';

function getSession() {
  let session = {
    key: 'rQksCwYMCQF',
    duration: 0,
    name: new Date(Date.now()).toLocaleString('en-US'),
    workoutKeys: [data.workouts[strongliftsA].key],
    exercises: data.workouts[strongliftsA].exercises.map((name) => {
      const foundKey = Object.keys(data.exercises).find(key => data.exercises[key].name === name);
      return data.exercises[foundKey];
    })
  };

  // Add completed property. Not added to workout because it only makes sense to record in a session.
  session.exercises.map((exercise) => {
    exercise.sets = exercise.sets.map((set) => {
      set.completed = false;
      return set;
    });
    return exercise;
  });

  return session;
}

const handle = {
  setActiveSessionKey: jest.fn(),
};
const navigation = {
  navigate: jest.fn()
};

beforeEach(() => {
  renderer = render(<Session session={getSession()} navigation={navigation} handle={handle}/>);
  instance = renderer.getByTestId('session-root');
}, 0);

jest.useFakeTimers();

describe('<Session />', () => {
  it('Renders image and exercise list in the action display area and changes them when sets progress forward', () => {
    let image = instance.findAllByType(Image);
    expect(image.length).toBe(1);
    expect(image[0].props.testID).toBe('squats-warmup-image');
    expect(image[0].props.testID).not.toBe('bench-press-image');

    expect(renderer.queryByText('Squats Warmup')).not.toBeNull();
    expect(renderer.queryByText('Bench Press')).toBeNull();

    [...Array(15)].forEach(() => fireEvent(renderer.getByText('Complete'), 'press'));

    image = instance.findAllByType(Image);
    expect(image.length).toBe(1);
    expect(image[0].props.testID).toBe('bench-press-image');
    expect(image[0].props.testID).not.toBe('squats-warmup-image');

    expect(renderer.queryByText('Bench Press')).not.toBeNull();
    expect(renderer.queryByText('Squats Warmup')).toBeNull();
  });

  it('moves set list back and forward when progress buttons are pressed and complete acts different from skip', () => {
    let actionButtons = instance.findAllByType(ActionButton);

    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).toBe('1/6');
    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).not.toBe('2/6');
    expect(renderer.queryByTestId('sets-reps-table-completed').props.children).toBe('false');
    expect(renderer.queryByTestId('sets-reps-table-reps').props.children).toBe('5');
    expect(renderer.queryByTestId('sets-reps-table-weight').props.children).toBe('45 lbs');

    // Previous button is disabled on the first set.
    expect(actionButtons[0].props.disabled).toBeDefined();

    fireEvent(renderer.getByText('Complete'), 'press');

    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).toBe('2/6');
    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).not.toBe('1/6');
    expect(renderer.queryByTestId('sets-reps-table-completed').props.children).toBe('false');

    // Previous button is no longer disabled.
    actionButtons = instance.findAllByType(ActionButton);
    expect(actionButtons[0].props.disabled).toBeUndefined();

    fireEvent(renderer.getByText('Previous'), 'press');

    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).toBe('1/6');
    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).not.toBe('2/6');
    expect(renderer.queryByTestId('sets-reps-table-completed').props.children).toBe('true');

    actionButtons = instance.findAllByType(ActionButton);
    expect(actionButtons[0].props.disabled).toBeDefined();

    [...Array(2)].forEach(() => fireEvent(renderer.getByText('Skip'), 'press'));

    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).toBe('3/6');
    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).not.toBe('2/6');
    expect(renderer.queryByTestId('sets-reps-table-completed').props.children).toBe('false');
    expect(renderer.queryByTestId('sets-reps-table-weight').props.children).toBe('95 lbs');

    fireEvent(renderer.getByText('Previous'), 'press');

    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).toBe('2/6');
    expect(renderer.queryByTestId('sets-reps-table-sets').props.children).not.toBe('3/6');
    expect(renderer.queryByTestId('sets-reps-table-completed').props.children).toBe('false');
    expect(renderer.queryByTestId('sets-reps-table-weight').props.children).toBe('45 lbs');

    [...Array(3)].forEach(() => fireEvent(renderer.getByText('Skip'), 'press'));
    expect(renderer.queryByTestId('sets-reps-table-reps').props.children).toBe('3');
  });

  it('Weight plates string displays correctly as sets move forward', () => {
    // The weight plates string begins with a space to separate it from the rest of the plates.
    expect(renderer.queryByTestId('time-plates-table-plates').props.children).toBe(' None');

    [...Array(2)].forEach(() => fireEvent(renderer.getByText('Skip'), 'press'));
    expect(renderer.queryByTestId('time-plates-table-plates').props.children).toBe(' 1x25');

    fireEvent(renderer.getByText('Skip'), 'press');
    expect(renderer.queryByTestId('time-plates-table-plates').props.children).toBe(' 1x45');

    fireEvent(renderer.getByText('Complete'), 'press');
    expect(renderer.queryByTestId('time-plates-table-plates').props.children).toBe(' 1x45 - 1x25');

    fireEvent(renderer.getByText('Skip'), 'press');
    expect(renderer.queryByTestId('time-plates-table-plates').props.children).toBe(' 1x45 - 1x25 - 1x10');

    fireEvent(renderer.getByText('Complete'), 'press');
    expect(renderer.queryByTestId('time-plates-table-plates').props.children).toBe(' 2x45 - 1x2.5');
  });

  it('Timer progresses and set timer resets when new set and exercise proceed', () => {


    expect(renderer.queryByTestId('time-plates-table-set').props.children).toBe(0);
    expect(renderer.queryByTestId('time-plates-table-session').props.children).toBe(0);

    jest.advanceTimersByTime(4000);

    expect(renderer.queryByTestId('time-plates-table-set').props.children).toBe(3);
    expect(renderer.queryByTestId('time-plates-table-session').props.children).toBe(3);

    fireEvent(renderer.getByText('Complete'), 'press');
    expect(renderer.queryByTestId('time-plates-table-set').props.children).toBe(0);
    expect(renderer.queryByTestId('time-plates-table-session').props.children).toBe(3);

    jest.advanceTimersByTime(2000);

    [...Array(4)].forEach(() => fireEvent(renderer.getByText('Complete'), 'press'));
    expect(renderer.queryByTestId('time-plates-table-set').props.children).toBe(0);
    expect(renderer.queryByTestId('time-plates-table-session').props.children).not.toBe(0);

    // Moves on to next exercise.
    fireEvent(renderer.getByText('Complete'), 'press');
    expect(renderer.queryByTestId('time-plates-table-set').props.children).toBe(0);
    expect(renderer.queryByTestId('time-plates-table-session').props.children).not.toBe(0);
  });

  it('Pause and quit buttons work', () => {
    fireEvent(renderer.getByText('Quit'), 'press');
    // expect(timerStop).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith('Home');

    jest.useFakeTimers();
    expect(renderer.queryByTestId('time-plates-table-set').props.children).toBe(0);
    expect(renderer.queryByTestId('time-plates-table-session').props.children).toBe(0);

    jest.advanceTimersByTime(4000);
    expect(renderer.queryByTestId('time-plates-table-session').props.children).toBe(3);

    fireEvent(renderer.getByText('Pause'), 'press');
    jest.advanceTimersByTime(4000);
    expect(renderer.queryByTestId('time-plates-table-session').props.children).toBe(3);

    fireEvent(renderer.getByText('Pause'), 'press');
    jest.advanceTimersByTime(4000);
    expect(renderer.queryByTestId('time-plates-table-session').props.children).toBe(7);
    expect(timerStop).toHaveBeenCalledTimes(43);
  });
});
