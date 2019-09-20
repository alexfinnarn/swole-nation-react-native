import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import data from '../../../store/data';
import ActionCard from "../../utility/ActionCard";
import shortId from "shortid";
import Workout from "../Workout";
import {Text} from "react-native";



let renderer, instance ={};
let workouts = Object.keys(data.workouts).map(key => data.workouts[key]);
const transformers =  Object.keys(data.transformers).map((key) => data.transformers[key]);
const handle = {
  update: jest.fn(),
};
const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn()
};

jest.mock('../../exercises/WorkoutExerciseListProvider', ({workout: workouts[0], navigation}, Text) => <Text>{workout} - {navigation}</Text>);

beforeEach(() => {
  renderer = render(<Workout workout={workouts[0]} navigation={navigation} handle={handle} transformers={transformers}/>);
  instance = renderer.getByTestId('workout-root');
}, 0);

describe('<Workout />', () => {
  test.only('Displays the name and description of workout and updates text inputs correctly', () => {
    console.log(renderer);
  });

  it('Selects a Transformer', () => {

  });

  it('Displays one WorkoutsExerciseList', () => {

  });

  it('Displays "Add" or "Go" button based on "go" navigation parameter', () => {

  });

  it('Add exercise button navigates to AddExercise screen', () => {

  });
});
