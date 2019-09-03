import {WorkoutActions} from "./actions";

const initialWorkouts = [
  {
    id: 1,
    name: 'Stronglifts A',
    description: 'Squats, Overhead Press, Deadlifts'
  },
  {
    id: 2,
    name: 'Stronglifts B',
    description: 'Squats, Bench Press, Barbell Row'
  }
];

function workouts(state = initialWorkouts, action) {
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

export default workouts;
