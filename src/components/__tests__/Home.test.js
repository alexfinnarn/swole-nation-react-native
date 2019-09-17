import React from 'react';
import { render } from 'react-native-testing-library';
import data from '../../store/data'
import Home from '../Home';

const workouts = Object.keys(data.workouts).map((key) => data.workouts[key]);
const navigation = jest.fn();
const handle = jest.fn();

describe('<Home />', () => {
  it('First workout key selected in Picker', () => {
    const {getByTestId} = render(<Home workouts={workouts} navigation={navigation} handle={handle}/>);
    const element = getByTestId('workout-picker');
    expect(element.props.selectedValue).toBe('DQkECwYLCQQ');
  });
});
