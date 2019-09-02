import { combineReducers } from 'redux';
import Workouts from './workouts';

export default function MainStore() {
  return combineReducers(Workouts)
}

