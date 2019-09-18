import React from 'react';
import { render } from 'react-native-testing-library';
import data from '../../store/data'
import Home from '../Home';

const workouts = Object.keys(data.workouts).map((key) => data.workouts[key]);
const navigation = jest.fn();
const handle = jest.fn();

describe('<Home />', () => {
  // it('Loads and displays the session teaser', () => {
  //
  // });

  it('Renders Picker and updates when user makes selection', () => {
    const {getByTestId} = render(<Home workouts={workouts} navigation={navigation} handle={handle}/>);
    const element = getByTestId('workout-picker');
    expect(element.props.selectedValue).toBe('DQkECwYLCQQ');

    // @todo add selection for other workout.
  });

  // it('Navigates correctly to all four navigation routes', () => {
  //
  // });
});
