import { combineReducers } from 'redux';
import { WorkoutActions } from "./actions";
import workouts from "./workouts";

function exercises(state = [], action) {
  switch (action.type) {
    case WorkoutActions.UPDATE_WORKOUT:
      return state.map((workout, index) => {
        if (workout.name === action.workout.name) {
          return Object.assign({}, action.workout)
        }
        return workout;
      });
    default:
      return state;
  }
}

const mainStore = combineReducers({workouts, exercises});

export default mainStore;
